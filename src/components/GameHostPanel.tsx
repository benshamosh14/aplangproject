import { motion, AnimatePresence } from "framer-motion";
import { useKahootGame } from "@/hooks/useKahootGame";
import { questions } from "@/data/questions";
import { Users, Play, SkipForward, Trophy, XCircle, CheckCircle, Clock, Award, RotateCcw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const GameHostPanel = () => {
  const { state, startGame, nextQuestion, showLeaderboard, endGame, totalQuestions } = useKahootGame();
  const gameUrl = `${window.location.origin}/game`;
  const currentQ = questions[state.currentQuestionIndex];
  const sortedPlayers = [...state.players].sort((a, b) => b.score - a.score);
  const answeredCount = state.players.filter((p) => p.lastAnswer !== null).length;

  return (
    <section id="game" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative z-10 container mx-auto px-6">

        <AnimatePresence mode="wait">
          {/* ── LOBBY ── */}
          {state.phase === "lobby" && (
            <motion.div key="lobby" className="text-center space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div>
                <p className="text-primary-foreground/60 text-sm font-medium tracking-widest uppercase mb-3">Interactive Game</p>
                <h2 className="text-4xl sm:text-6xl font-extrabold text-primary-foreground leading-tight">
                  Balance Over Burnout
                </h2>
                <p className="text-primary-foreground/70 text-lg mt-3">Scan the QR code to join on your phone!</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <div className="p-4 bg-primary-foreground rounded-2xl shadow-xl">
                  <QRCodeSVG value={gameUrl} size={180} bgColor="#ffffff" fgColor="#000000" level="M" />
                </div>
                <div className="text-left space-y-3">
                  <div className="flex items-center gap-3 text-primary-foreground">
                    <Users className="w-6 h-6" />
                    <span className="text-2xl font-heading font-bold">{state.players.length} player{state.players.length !== 1 ? "s" : ""} joined</span>
                  </div>
                  {state.players.length > 0 && (
                    <div className="flex flex-wrap gap-2 max-w-xs">
                      {state.players.map((p) => (
                        <motion.span
                          key={p.id}
                          className="px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          {p.name}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <motion.button
                className="px-10 py-4 rounded-xl bg-primary-foreground text-foreground font-heading font-bold text-lg disabled:opacity-40"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={startGame}
                disabled={state.players.length === 0}
              >
                <Play className="w-5 h-5 inline mr-2 -mt-0.5" />
                Start Game
              </motion.button>
            </motion.div>
          )}

          {/* ── QUESTION ── */}
          {state.phase === "question" && currentQ && (
            <motion.div key={`q-${state.currentQuestionIndex}`} className="max-w-4xl mx-auto space-y-8" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between">
                <span className="text-primary-foreground/60 text-sm font-heading font-bold tracking-widest uppercase">
                  Question {state.currentQuestionIndex + 1} / {totalQuestions}
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-foreground/70" />
                  <motion.span
                    className={`text-2xl font-heading font-extrabold ${state.timeLeft <= 5 ? "text-warm" : "text-primary-foreground"}`}
                    key={state.timeLeft}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                  >
                    {state.timeLeft}s
                  </motion.span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-primary-foreground/20 overflow-hidden">
                <motion.div
                  className="h-full bg-primary-foreground/70 rounded-full"
                  initial={{ width: "100%" }}
                  animate={{ width: `${(state.timeLeft / 15) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <h3 className="text-3xl sm:text-5xl font-extrabold text-primary-foreground text-center leading-tight">
                {currentQ.scenario}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 rounded-2xl bg-success/90 text-success-foreground text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <p className="text-xl font-heading font-bold">A: {currentQ.optionA}</p>
                </div>
                <div className="p-8 rounded-2xl bg-destructive/90 text-destructive-foreground text-center">
                  <XCircle className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <p className="text-xl font-heading font-bold">B: {currentQ.optionB}</p>
                </div>
              </div>

              <div className="text-center text-primary-foreground/60 text-sm font-medium">
                {answeredCount} / {state.players.length} answered
              </div>
            </motion.div>
          )}

          {/* ── REVEAL ── */}
          {state.phase === "reveal" && currentQ && (
            <motion.div key="reveal" className="max-w-3xl mx-auto text-center space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-primary-foreground/60 text-sm font-heading font-bold tracking-widest uppercase">
                Answer Revealed
              </p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground">
                {currentQ.scenario}
              </h3>

              <motion.div
                className="p-8 rounded-2xl bg-success text-success-foreground mx-auto max-w-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <CheckCircle className="w-10 h-10 mx-auto mb-3" />
                <p className="text-2xl font-heading font-bold mb-2">
                  {currentQ.correct === "A" ? currentQ.optionA : currentQ.optionB}
                </p>
                <p className="text-success-foreground/80 text-sm">{currentQ.explanation}</p>
              </motion.div>

              <div className="flex justify-center gap-4">
                <motion.button
                  className="px-8 py-3 rounded-xl bg-primary-foreground/20 text-primary-foreground font-heading font-bold border border-primary-foreground/30"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={showLeaderboard}
                >
                  <Trophy className="w-4 h-4 inline mr-2 -mt-0.5" />
                  Leaderboard
                </motion.button>
                <motion.button
                  className="px-8 py-3 rounded-xl bg-primary-foreground text-foreground font-heading font-bold"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={nextQuestion}
                >
                  <SkipForward className="w-4 h-4 inline mr-2 -mt-0.5" />
                  {state.currentQuestionIndex + 1 < totalQuestions ? "Next Question" : "Finish"}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── LEADERBOARD ── */}
          {state.phase === "leaderboard" && (
            <motion.div key="lb" className="max-w-xl mx-auto text-center space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div>
                <Trophy className="w-12 h-12 text-warm mx-auto mb-3" />
                <h2 className="text-4xl font-extrabold text-primary-foreground">Leaderboard</h2>
              </div>

              <div className="space-y-3">
                {sortedPlayers.map((p, i) => (
                  <motion.div
                    key={p.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-sm ${
                        i === 0 ? "bg-warm text-warm-foreground" : i === 1 ? "bg-primary-foreground/30 text-primary-foreground" : "bg-primary-foreground/15 text-primary-foreground/70"
                      }`}>
                        {i + 1}
                      </span>
                      <span className="text-primary-foreground font-heading font-bold">{p.name}</span>
                      {p.streak >= 3 && <span className="text-xs">🔥{p.streak}</span>}
                    </div>
                    <span className="text-primary-foreground font-heading font-extrabold text-lg">{p.score}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="px-8 py-3 rounded-xl bg-primary-foreground text-foreground font-heading font-bold"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={nextQuestion}
              >
                <SkipForward className="w-4 h-4 inline mr-2 -mt-0.5" />
                {state.currentQuestionIndex + 1 < totalQuestions ? "Next Question" : "Finish Game"}
              </motion.button>
            </motion.div>
          )}

          {/* ── ENDED ── */}
          {state.phase === "ended" && (
            <motion.div key="ended" className="max-w-xl mx-auto text-center space-y-8" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <Award className="w-16 h-16 text-warm mx-auto" />
              <h2 className="text-4xl sm:text-6xl font-extrabold text-primary-foreground">Game Over!</h2>

              {sortedPlayers.length > 0 && (
                <div className="space-y-3">
                  {sortedPlayers.slice(0, 5).map((p, i) => (
                    <motion.div
                      key={p.id}
                      className={`flex items-center justify-between p-5 rounded-xl border ${
                        i === 0
                          ? "bg-warm/20 border-warm/40"
                          : "bg-primary-foreground/10 border-primary-foreground/20"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</span>
                        <span className="text-primary-foreground font-heading font-bold text-lg">{p.name}</span>
                      </div>
                      <span className="text-primary-foreground font-heading font-extrabold text-xl">{p.score} pts</span>
                    </motion.div>
                  ))}
                </div>
              )}

              <motion.button
                className="px-10 py-4 rounded-xl bg-primary-foreground text-foreground font-heading font-bold text-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={endGame}
              >
                <RotateCcw className="w-5 h-5 inline mr-2 -mt-0.5" />
                New Game
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GameHostPanel;
