import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
        <motion.h2
          className="text-3xl sm:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Balance Over Burnout.
        </motion.h2>

        <motion.p
          className="max-w-2xl mx-auto text-lg text-primary-foreground/80 leading-relaxed mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          This isn't just about policies — it's about trust. It's about believing
          that students deserve better and having the courage to ask for it.
        </motion.p>
        <motion.p
          className="max-w-2xl mx-auto text-lg text-primary-foreground/80 leading-relaxed mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          When you vote, choose the party that puts your well-being first.
          Choose the party that listens. Choose the party that believes in you.
        </motion.p>

        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <motion.p
            className="text-2xl sm:text-4xl font-bold text-primary-foreground"
            whileHover={{ scale: 1.03 }}
          >
            Choose the Merit and Mindset Party.
          </motion.p>
          <p className="text-primary-foreground/70 text-lg">
            The future of Northern Highlands starts with us — calm, balanced, and human.
          </p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="w-12 h-px bg-primary-foreground/30" />
          <span className="text-primary-foreground/50 text-2xl">✦</span>
          <div className="w-12 h-px bg-primary-foreground/30" />
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
