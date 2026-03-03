import { useState, useEffect, useCallback, useRef } from "react";
import { questions } from "@/data/questions";

const CHANNEL_NAME = "kahoot-game";
const STORAGE_KEY = "kahoot-game-state";

export type GamePhase = "lobby" | "question" | "reveal" | "leaderboard" | "ended";

export interface Player {
  id: string;
  name: string;
  score: number;
  lastAnswer: "A" | "B" | null;
  lastCorrect: boolean;
  streak: number;
}

export interface GameState {
  phase: GamePhase;
  currentQuestionIndex: number;
  players: Player[];
  timeLeft: number;
  questionStartedAt: number;
}

function getDefaultState(): GameState {
  return {
    phase: "lobby",
    currentQuestionIndex: 0,
    players: [],
    timeLeft: 15,
    questionStartedAt: 0,
  };
}

function getStoredState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return getDefaultState();
}

function storeState(state: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function broadcast(state: GameState) {
  try {
    const ch = new BroadcastChannel(CHANNEL_NAME);
    ch.postMessage(state);
    ch.close();
  } catch {}
}

export function useKahootGame() {
  const [state, setState] = useState<GameState>(getStoredState);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync across tabs
  useEffect(() => {
    const ch = new BroadcastChannel(CHANNEL_NAME);
    ch.onmessage = (e) => setState(e.data as GameState);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) setState(JSON.parse(e.newValue));
    };
    window.addEventListener("storage", onStorage);
    return () => {
      ch.close();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (state.phase !== "question") return;

    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 1) {
          const next = { ...prev, phase: "reveal" as GamePhase, timeLeft: 0 };
          storeState(next);
          broadcast(next);
          return next;
        }
        const next = { ...prev, timeLeft: prev.timeLeft - 1 };
        storeState(next);
        broadcast(next);
        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.phase, state.currentQuestionIndex]);

  const update = useCallback((updater: (s: GameState) => GameState) => {
    setState((prev) => {
      const next = updater(prev);
      storeState(next);
      broadcast(next);
      return next;
    });
  }, []);

  const startGame = useCallback(() => {
    update((s) => ({
      ...s,
      phase: "question",
      currentQuestionIndex: 0,
      timeLeft: 15,
      questionStartedAt: Date.now(),
      players: s.players.map((p) => ({ ...p, score: 0, lastAnswer: null, lastCorrect: false, streak: 0 })),
    }));
  }, [update]);

  const nextQuestion = useCallback(() => {
    update((s) => {
      const nextIdx = s.currentQuestionIndex + 1;
      if (nextIdx >= questions.length) {
        return { ...s, phase: "ended" };
      }
      return {
        ...s,
        phase: "question",
        currentQuestionIndex: nextIdx,
        timeLeft: 15,
        questionStartedAt: Date.now(),
        players: s.players.map((p) => ({ ...p, lastAnswer: null, lastCorrect: false })),
      };
    });
  }, [update]);

  const showLeaderboard = useCallback(() => {
    update((s) => ({ ...s, phase: "leaderboard" }));
  }, [update]);

  const endGame = useCallback(() => {
    update(() => getDefaultState());
  }, [update]);

  const joinGame = useCallback((name: string): string => {
    const id = Math.random().toString(36).slice(2, 8);
    update((s) => ({
      ...s,
      players: [...s.players, { id, name, score: 0, lastAnswer: null, lastCorrect: false, streak: 0 }],
    }));
    return id;
  }, [update]);

  const submitAnswer = useCallback((playerId: string, answer: "A" | "B") => {
    update((s) => {
      const q = questions[s.currentQuestionIndex];
      if (!q) return s;
      const isCorrect = answer === q.correct;
      return {
        ...s,
        players: s.players.map((p) => {
          if (p.id !== playerId) return p;
          if (p.lastAnswer !== null) return p; // already answered
          const newStreak = isCorrect ? p.streak + 1 : 0;
          const timeBonus = Math.max(0, Math.floor(s.timeLeft * 10)); // faster = more points
          const points = isCorrect ? 100 + timeBonus + newStreak * 20 : 0;
          return {
            ...p,
            lastAnswer: answer,
            lastCorrect: isCorrect,
            streak: newStreak,
            score: p.score + points,
          };
        }),
      };
    });
  }, [update]);

  const refresh = useCallback(() => {
    setState(getStoredState());
  }, []);

  return {
    state,
    startGame,
    nextQuestion,
    showLeaderboard,
    endGame,
    joinGame,
    submitAnswer,
    refresh,
    totalQuestions: questions.length,
  };
}
