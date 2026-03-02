import { Brain, Clock, Battery, AlertTriangle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  {
    icon: Clock,
    stat: "7+",
    suffix: " hours",
    label: "Average school day — and it doesn't stop there",
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Brain,
    stat: "0",
    suffix: "",
    displayText: "No off switch",
    label: "Homework, tests, and stress follow you home",
    gradient: "from-warm/20 to-warm/5",
    iconColor: "text-warm",
  },
  {
    icon: Battery,
    stat: "100",
    suffix: "%",
    displayText: "Burnout",
    label: "Students running on empty, semester after semester",
    gradient: "from-destructive/20 to-destructive/5",
    iconColor: "text-destructive",
  },
  {
    icon: AlertTriangle,
    stat: "0",
    suffix: "",
    displayText: "Lost trust",
    label: "Unclear policies create frustration, not fairness",
    gradient: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
];

const AnimatedCounter = ({ value, suffix, displayText }: { value: string; suffix: string; displayText?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });
  const numValue = parseInt(value);

  useEffect(() => {
    if (!inView || displayText) return;
    const duration = 1500;
    const steps = 30;
    const increment = numValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numValue) {
        setCount(numValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, numValue, displayText]);

  return (
    <p ref={ref} className="text-3xl font-extrabold text-foreground mb-2">
      {displayText || `${count}${suffix}`}
    </p>
  );
};

const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-28 bg-section-alt overflow-hidden relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="container mx-auto px-6 relative" ref={ref}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            The Reality
          </motion.span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-6">
            Students are struggling.
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            The workload never stops. The pressure never lifts. School doesn't
            end when the bell rings — it follows you home, into your weekends,
            and into your sleep.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`bg-gradient-to-b ${item.gradient} rounded-2xl p-8 text-center border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-default backdrop-blur-sm`}
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-card flex items-center justify-center mx-auto mb-5 shadow-sm border border-border/50`}
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
              >
                <item.icon className={`w-7 h-7 ${item.iconColor}`} />
              </motion.div>
              <AnimatedCounter value={item.stat} suffix={item.suffix} displayText={item.displayText} />
              <p className="text-sm text-muted-foreground leading-relaxed">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
