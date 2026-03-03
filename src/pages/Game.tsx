import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Flame, Clock, Trophy, CheckCircle, XCircle, Sparkles } from "lucide-react";
import { useKahootGame } from "@/hooks/useKahootGame";
import { questions } from "@/data/questions";
import confetti from "canvas-confetti";

const Game = () => {
  const { state, joinGame, submitAnswer, refresh } = useKahootGame();
  const [playerId, setPlayerId] = useState<string | null>(() => localStorage.getItem("kahoot-player-id"));
  const [playerName, setPlayerName] = useState("");
  const [joined, setJoined] = useState(!!playerId);

  const currentQ = questions[state.currentQuestionIndex];
  const player = state.players.find((p) => p.id === playerId);

  // Poll for state updates
  useEffect(() => {
    const interval = setInterval(refresh, 1000);
    return () => clearInterval(interval);
  }, [refresh]);

  // Confetti on game end
  useEffect(() => {
    if (state.phase === "ended" && player) {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#e53e3e", "#fff", "#000"] });
    }
  }, [state.phase, player]);

  const handleJoin = () => {
    if (!playerName.trim()) return;
    const id = joinGame(playerName.trim());
    setPlayerId(id);
    localStorage.setItem("kahoot-player-id", id);
    setJoined(true);
  };

  const handleAnswer = (answer: "A" | "B") => {
    if (!playerId) return;
    submitAnswer(playerId, answer);
  };

  // ── JOIN SCREEN ──
  if (!joined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div className="w-full max-w-sm space-y-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
            <h1 className="text-2xl font-heading font-extrabold text-foreground">Join the Game</h1>
            <p className="text-muted-foreground text-sm mt-1">Balance Over Burnout</p>
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            className="w-full px-4 py-3 rounded-xl border bg-card text-foreground font-medium text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            maxLength={20}
            autoFocus
          />
          <motion.button
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-lg disabled:opacity-40"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleJoin}
            disabled={!playerName.trim()}
          >
            Join Game 🎮
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div className="w-full max-w-md mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <AnimatePresence mode="wait">

          {/* ── LOBBY / WAITING ── */}
          {state.phase === "lobby" && (
            <motion.div key="wait" className="text-center space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="p-8 rounded-2xl border bg-card space-y-4">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Sparkles className="w-12 h-12 text-primary mx-auto" />
                </motion.div>
                <h2 className="text-xl font-heading font-bold text-foreground">You're in!</h2>
                <p className="text-muted-foreground">Waiting for the host to start the game…</p>
                <p className="text-sm text-muted-foreground">{state.players.length} player{state.players.length !== 1 ? "s" : ""} joined</p>
              </div>
            </motion.div>
          )}

          {/* ── QUESTION ── */}
          {state.phase === "question" && currentQ && (
            <motion.div key={`q-${state.currentQuestionIndex}`} className="space-y-6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              {/* Timer */}
              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-heading font-bold text-muted-foreground">
                  Q{state.currentQuestionIndex + 1}/{questions.length}
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className={`text-xl font-heading font-extrabold ${state.timeLeft <= 5 ? "text-destructive" : "text-foreground"}`}>
                    {state.timeLeft}s
                  </span>
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: `${(state.timeLeft / 15) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <h3 className="text-lg font-heading font-bold text-foreground text-center leading-snug">
                {currentQ.scenario}
              </h3>

              {player?.lastAnswer ? (
                <motion.div
                  className="p-8 rounded-2xl border bg-card text-center"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  <CheckCircle className="w-10 h-10 text-success mx-auto mb-2" />
                  <p className="font-heading font-bold text-foreground">Answer locked in!</p>
                  <p className="text-muted-foreground text-sm mt-1">Waiting for results…</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <motion.button
                    className="py-10 rounded-2xl bg-success text-success-foreground font-heading font-bold text-lg active:bg-success/80"
                    whileTap={{ scale: 0.93 }}
                    onClick={() => handleAnswer("A")}
                  >
                    <Heart className="w-8 h-8 mx-auto mb-2" />
                    A: {currentQ.optionA}
                  </motion.button>
                  <motion.button
                    className="py-10 rounded-2xl bg-destructive text-destructive-foreground font-heading font-bold text-lg active:bg-destructive/80"
                    whileTap={{ scale: 0.93 }}
                    onClick={() => handleAnswer("B")}
                  >
                    <Flame className="w-8 h-8 mx-auto mb-2" />
                    B: {currentQ.optionB}
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* ── REVEAL ── */}
          {state.phase === "reveal" && currentQ && player && (
            <motion.div key="reveal" className="text-center space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className={`p-8 rounded-2xl border ${player.lastCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"}`}>
                {player.lastCorrect ? (
                  <>
                    <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                    <h3 className="text-2xl font-heading font-extrabold text-foreground">Correct! 🎉</h3>
                    {player.streak >= 2 && <p className="text-sm text-muted-foreground mt-1">🔥 {player.streak} streak!</p>}
                  </>
                ) : (
                  <>
                    <XCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
                    <h3 className="text-2xl font-heading font-extrabold text-foreground">
                      {player.lastAnswer ? "Not quite!" : "Time's up!"}
                    </h3>
                  </>
                )}
                <p className="text-muted-foreground text-sm mt-3">{currentQ.explanation}</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5 text-warm" />
                <span className="text-lg font-heading font-bold text-foreground">Your score: {player.score}</span>
              </div>
            </motion.div>
          )}

          {/* ── LEADERBOARD ── */}
          {state.phase === "leaderboard" && (
            <motion.div key="lb" className="text-center space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Trophy className="w-10 h-10 text-warm mx-auto" />
              <h2 className="text-2xl font-heading font-extrabold text-foreground">Leaderboard</h2>
              <div className="space-y-2">
                {[...state.players].sort((a, b) => b.score - a.score).map((p, i) => (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between p-3 rounded-xl border ${p.id === playerId ? "bg-primary/10 border-primary/30" : "bg-card"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</span>
                      <span className="font-heading font-bold text-foreground text-sm">{p.name}</span>
                    </div>
                    <span className="font-heading font-bold text-foreground">{p.score}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-xs">Waiting for next question…</p>
            </motion.div>
          )}

          {/* ── ENDED ── */}
          {state.phase === "ended" && (
            <motion.div key="ended" className="text-center space-y-6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <Trophy className="w-14 h-14 text-warm mx-auto" />
              <h2 className="text-2xl font-heading font-extrabold text-foreground">Game Over!</h2>
              {player && (
                <div className="p-6 rounded-2xl border bg-card">
                  <p className="text-3xl font-heading font-black text-primary">{player.score} pts</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    #{[...state.players].sort((a, b) => b.score - a.score).findIndex((p) => p.id === playerId) + 1} of {state.players.length}
                  </p>
                </div>
              )}
              <p className="text-muted-foreground text-sm">Thanks for supporting the campaign! 🎉</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Game;
