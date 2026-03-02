import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const WhyItMattersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const paragraphs = [
    "We go to one of the most academically rigorous schools in the state. That's something to be proud of — but it shouldn't come at the cost of your well-being.",
    "Northern Highlands students are driven, talented, and resilient. But even the most resilient people need systems that support them, not ones that push them to the edge.",
    <>This campaign isn't about lowering standards. It's about raising the bar for <em>how</em> we treat students. It's about building a school culture where success and mental health aren't opposites — they're partners.</>,
  ];

  return (
    <section className="py-28 bg-section-alt overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="container mx-auto px-6 relative" ref={ref}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
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
              Why This Matters Here
            </motion.span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-4">
              This is about <span className="text-gradient">Northern Highlands</span>.
            </h2>
          </motion.div>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="relative mt-14 p-10 rounded-2xl bg-card border border-border shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <Quote className="w-10 h-10 text-primary/20 absolute -top-4 left-6" />
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground font-semibold text-xl sm:text-2xl text-center italic leading-relaxed">
              "You deserve a school that sees you as a person first, and a student second."
            </p>
            <p className="text-primary font-medium text-sm mt-4 text-center">— Ellie Shrier</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMattersSection;
