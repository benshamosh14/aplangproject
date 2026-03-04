import { Play, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideo = () => {
    if (!videoRef.current || hasStarted) return;
    videoRef.current.currentTime = 0;
    void videoRef.current.play();
    setHasStarted(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-hero-gradient opacity-85" />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary-foreground/5 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl"
        animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        {/* Candidate Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-10"
        >
          <motion.p
            className="text-primary-foreground/80 font-medium text-sm tracking-[0.25em] uppercase mb-4"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Merit and Mindset Party
          </motion.p>

          <motion.h1
            className="text-5xl sm:text-8xl font-extrabold text-primary-foreground mb-5 leading-[0.95]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ellie Shrier
          </motion.h1>

          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="text-xl sm:text-3xl font-bold text-primary-foreground/95 px-6 py-2 rounded-full border-2 border-primary-foreground/30 backdrop-blur-sm bg-primary-foreground/5">
              Balance Over Burnout
            </span>
          </motion.div>

          <motion.p
            className="max-w-xl mx-auto text-base sm:text-lg text-primary-foreground/70 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            A campaign built on trust, mental health, and real change for
            Northern Highlands students.
          </motion.p>
        </motion.div>

        {/* Campaign Video */}
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-primary-foreground/20 shadow-2xl shadow-black/30">
            <video
              ref={videoRef}
              src="/campaign-video.mp4"
              className="w-full h-full object-contain bg-black"
              playsInline
              controls
              controlsList="nodownload"
              preload="metadata"
              onPlay={() => setHasStarted(true)}
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                if (Number.isFinite(video.duration) && video.duration > 0) {
                  video.currentTime = Math.max(video.duration - 0.05, 0);
                }
              }}
            />

            {/* Initial play overlay - only shown before first play */}
            {!hasStarted && (
              <div
                className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer"
                onClick={startVideo}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-primary-foreground/20 backdrop-blur-md flex items-center justify-center"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255,255,255,0.3)",
                      "0 0 0 20px rgba(255,255,255,0)",
                      "0 0 0 0 rgba(255,255,255,0.3)",
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </motion.div>
                <span className="absolute bottom-4 text-primary-foreground/70 text-sm font-medium">
                  Watch the Campaign Video
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="text-primary-foreground/50 text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5 text-primary-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
