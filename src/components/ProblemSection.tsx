import { Brain, Clock, Battery, AlertTriangle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  {
    icon: Clock,
    stat: "7+",
    suffix: " hours",
    label: "Average school day — and it doesn't stop there",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Brain,
    stat: "0",
    suffix: " off switch",
    displayText: "No off switch",
    label: "Homework, tests, and stress follow you home",
    color: "bg-warm/10 text-warm",
  },
  {
    icon: Battery,
    stat: "100",
    suffix: "%",
    displayText: "Burnout",
    label: "Students running on empty, semester after semester",
    color: "bg-destructive/10 text-destructive",
  },
  {
    icon: AlertTriangle,
    stat: "0",
    suffix: "",
    displayText: "Lost trust",
    label: "Unclear policies create frustration, not fairness",
    color: "bg-accent/10 text-accent",
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
    <p ref={ref} className="text-3xl font-bold text-foreground mb-2">
      {displayText || `${count}${suffix}`}
    </p>
  );
};

const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-28 bg-section-alt overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-semibold text-sm tracking-[0.15em] uppercase mb-3">
            The Reality
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-6">
            Students are struggling.
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            The workload never stops. The pressure never lifts. School doesn't
            end when the bell rings — it follows you home, into your weekends,
            and into your sleep. There's no off switch, and everyone feels it.
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
              className="bg-card rounded-2xl p-8 text-center border border-border shadow-sm hover:shadow-xl transition-all duration-300 group cursor-default"
            >
              <motion.div
                className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-5`}
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
              >
                <item.icon className="w-7 h-7" />
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
