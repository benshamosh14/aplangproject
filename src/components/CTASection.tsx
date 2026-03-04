import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Animated background shapes */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary-foreground/5 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary-foreground/5 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-6 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 text-primary-foreground/60 text-sm font-medium tracking-widest uppercase px-4 py-2 rounded-full border border-primary-foreground/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Your vote matters
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl sm:text-7xl font-extrabold text-primary-foreground mb-8 leading-[0.95]"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Balance Over<br />Burnout.
        </motion.h2>

        <motion.div
          className="max-w-2xl mx-auto space-y-4 mb-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            This isn't just about policies — it's about trust. It's about believing
            that students deserve better and having the courage to ask for it.
          </p>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            When you vote, choose the party that puts your well-being first.
            Choose the party that listens. Choose the party that believes in you.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <motion.p
            className="text-3xl sm:text-5xl font-extrabold text-primary-foreground"
            whileHover={{ scale: 1.02 }}
          >
            Choose Merit & Mindset.
          </motion.p>
          <p className="text-primary-foreground/60 text-lg">
            The future of Northern Highlands starts with us — calm, balanced, and human.
          </p>
        </motion.div>

        {/* Decorative */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="w-16 h-px bg-primary-foreground/20" />
          <span className="text-primary-foreground/40 text-2xl">✦</span>
          <div className="w-16 h-px bg-primary-foreground/20" />
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
