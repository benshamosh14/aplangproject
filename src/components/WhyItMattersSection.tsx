import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const WhyItMattersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-28 bg-section-alt overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-semibold text-sm tracking-[0.15em] uppercase mb-3">
              Why This Matters Here
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-8">
              This is about <span className="text-gradient">Northern Highlands</span>.
            </h2>
          </motion.div>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-left">
            {[
              "We go to one of the most academically rigorous schools in the state. That's something to be proud of — but it shouldn't come at the cost of your well-being.",
              "Northern Highlands students are driven, talented, and resilient. But even the most resilient people need systems that support them, not ones that push them to the edge.",
              <>This campaign isn't about lowering standards. It's about raising the bar for <em>how</em> we treat students. It's about building a school culture where success and mental health aren't opposites — they're partners.</>,
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              className="relative mt-10 p-8 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1 }}
            >
              <Quote className="w-8 h-8 text-primary/30 absolute -top-3 -left-2" />
              <p className="text-foreground font-semibold text-xl text-center italic">
                "You deserve a school that sees you as a person first, and a student second."
              </p>
              <p className="text-primary font-medium text-sm mt-3 text-center">— Ellie Shrier</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMattersSection;
