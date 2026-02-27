import { Brain, Clock, Battery, AlertTriangle } from "lucide-react";

const stats = [
  {
    icon: Clock,
    stat: "7+ hours",
    label: "Average school day — and it doesn't stop there",
  },
  {
    icon: Brain,
    stat: "No off switch",
    label: "Homework, tests, and stress follow you home",
  },
  {
    icon: Battery,
    stat: "Burnout",
    label: "Students running on empty, semester after semester",
  },
  {
    icon: AlertTriangle,
    stat: "Lost trust",
    label: "Unclear policies create frustration, not fairness",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-section-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground mb-2">{item.stat}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
