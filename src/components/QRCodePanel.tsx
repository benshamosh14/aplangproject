import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";

const QRCodePanel = ({ gameUrl }: { gameUrl: string }) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl border bg-card shadow-xl max-w-[180px]"
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="p-2 bg-background rounded-xl">
          <QRCodeSVG
            value={gameUrl}
            size={120}
            bgColor="hsl(0,0%,100%)"
            fgColor="hsl(0,0%,0%)"
            level="M"
          />
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center text-primary">
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-xs font-heading font-bold">Scan to Play</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
            Support the Campaign
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default QRCodePanel;
