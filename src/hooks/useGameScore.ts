import { useState, useEffect, useCallback } from "react";

const CHANNEL_NAME = "campaign-game-score";
const STORAGE_KEY = "campaign-game-data";

export interface GameData {
  totalPlayers: number;
  totalScore: number;
}

function getStoredData(): GameData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { totalPlayers: 0, totalScore: 0 };
}

function setStoredData(data: GameData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useGameScore() {
  const [data, setData] = useState<GameData>(getStoredData);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (e) => {
      const incoming = e.data as GameData;
      setData(incoming);
    };

    // Also listen to storage for cross-origin fallback
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setData(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      channel.close();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const submitScore = useCallback((score: number) => {
    const current = getStoredData();
    const updated: GameData = {
      totalPlayers: current.totalPlayers + 1,
      totalScore: current.totalScore + score,
    };
    setStoredData(updated);
    setData(updated);

    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage(updated);
      channel.close();
    } catch {}
  }, []);

  const refreshData = useCallback(() => {
    setData(getStoredData());
  }, []);

  return { data, submitScore, refreshData };
}
