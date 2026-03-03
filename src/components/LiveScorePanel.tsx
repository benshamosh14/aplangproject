import { motion, AnimatePresence } from "framer-motion";
import { Users, Zap } from "lucide-react";
import { useGameScore } from "@/hooks/useGameScore";
import { useEffect } from "react";

const LiveScorePanel = () => {
  const { data, refreshData } = useGameScore();

  // Poll localStorage every 2s as backup for same-tab updates
  useEffect(() => {
    const interval = setInterval(refreshData, 2000);
    return () => clearInterval(interval);
  }, [refreshData]);

  if (data.totalPlayers === 0) return null;

  return (
    <motion.div
      className="fixed top-20 right-6 z-50 p-4 rounded-2xl border bg-card/90 backdrop-blur-sm shadow-lg"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5 }}
    >
      <p className="text-[10px] font-heading font-bold text-primary uppercase tracking-widest mb-2">
        Live Score
      </p>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <AnimatePresence mode="wait">
            <motion.span
              key={data.totalPlayers}
              className="text-sm font-heading font-bold text-foreground"
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
            >
              {data.totalPlayers} player{data.totalPlayers !== 1 ? "s" : ""}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-warm" />
          <AnimatePresence mode="wait">
            <motion.span
              key={data.totalScore}
              className="text-sm font-heading font-bold text-foreground"
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
            >
              {data.totalScore} pts
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveScorePanel;
