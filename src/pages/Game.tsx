import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Flame, Clock, Trophy, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useGameScore } from "@/hooks/useGameScore";
import confetti from "canvas-confetti";

const GAME_DURATION = 30;

type Phase = "ready" | "playing" | "done";

const Game = () => {
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [taps, setTaps] = useState(0);
  const [lastTap, setLastTap] = useState<"healthy" | "burnout" | null>(null);
  const { submitScore } = useGameScore();
  const submitted = useRef(false);

  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) {
      setPhase("done");
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);

  useEffect(() => {
    if (phase === "done" && !submitted.current) {
      submitted.current = true;
      submitScore(score);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#e53e3e", "#fff", "#000"],
      });
    }
  }, [phase, score, submitScore]);

  const startGame = () => {
    setPhase("playing");
    setScore(0);
    setTaps(0);
    setTimeLeft(GAME_DURATION);
    submitted.current = false;
  };

  const handleTap = useCallback(
    (type: "healthy" | "burnout") => {
      if (phase !== "playing") return;
      setTaps((p) => p + 1);
      setLastTap(type);
      if (type === "healthy") setScore((p) => p + 1);
    },
    [phase]
  );

  const progress = ((GAME_DURATION - timeLeft) / GAME_DURATION) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground mb-1"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            Balance Over Burnout
          </motion.h1>
          <p className="text-muted-foreground text-sm font-medium">
            Speed Round ⚡
          </p>
        </div>

        <AnimatePresence mode="wait">
          {phase === "ready" && (
            <motion.div
              key="ready"
              className="text-center space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="p-6 rounded-2xl border bg-card space-y-4">
                <Sparkles className="w-10 h-10 text-primary mx-auto" />
                <h2 className="text-lg font-heading font-bold text-foreground">
                  How to Play
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Tap <strong className="text-success">Healthy Choice</strong>{" "}
                  to score points. Avoid{" "}
                  <strong className="text-destructive">Burnout Choice</strong>!
                  <br />
                  You have <strong>30 seconds</strong>. Go fast!
                </p>
              </div>
              <motion.button
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={startGame}
              >
                Start Game 🚀
              </motion.button>
            </motion.div>
          )}

          {phase === "playing" && (
            <motion.div
              key="playing"
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Timer & Score Bar */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-foreground font-heading font-bold">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className={timeLeft <= 5 ? "text-destructive" : ""}>
                    {timeLeft}s
                  </span>
                </div>
                <div className="flex items-center gap-2 text-foreground font-heading font-bold">
                  <Trophy className="w-4 h-4 text-warm" />
                  <motion.span
                    key={score}
                    initial={{ scale: 1.4, color: "hsl(var(--success))" }}
                    animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                    transition={{ duration: 0.3 }}
                  >
                    {score}
                  </motion.span>
                </div>
              </div>

              <Progress value={progress} className="h-3 rounded-full" />

              {/* Tap feedback */}
              <div className="h-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {lastTap && (
                    <motion.span
                      key={taps}
                      className={`text-sm font-bold ${
                        lastTap === "healthy"
                          ? "text-success"
                          : "text-destructive"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {lastTap === "healthy" ? "+1 🌿" : "+0 💀"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  className="py-12 rounded-2xl bg-success text-success-foreground font-heading font-bold text-lg border-2 border-success/30 active:bg-success/80"
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleTap("healthy")}
                >
                  <Heart className="w-8 h-8 mx-auto mb-2" />
                  Healthy Choice
                </motion.button>
                <motion.button
                  className="py-12 rounded-2xl bg-destructive text-destructive-foreground font-heading font-bold text-lg border-2 border-destructive/30 active:bg-destructive/80"
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleTap("burnout")}
                >
                  <Flame className="w-8 h-8 mx-auto mb-2" />
                  Burnout Choice
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === "done" && (
            <motion.div
              key="done"
              className="text-center space-y-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="p-8 rounded-2xl border bg-card space-y-4">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Trophy className="w-14 h-14 text-warm mx-auto" />
                </motion.div>
                <h2 className="text-2xl font-heading font-extrabold text-foreground">
                  Game Over!
                </h2>
                <p className="text-4xl font-heading font-black text-primary">
                  {score} points
                </p>
                <p className="text-muted-foreground text-sm">
                  {taps} total taps • {Math.round((score / Math.max(taps, 1)) * 100)}% healthy choices
                </p>
              </div>

              <div className="p-4 rounded-xl bg-muted/50 border">
                <p className="text-foreground font-heading font-semibold text-sm">
                  Thanks for supporting the campaign! 🎉
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  Your score has been added to the live counter.
                </p>
              </div>

              <motion.button
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={startGame}
              >
                Play Again 🔄
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Game;
