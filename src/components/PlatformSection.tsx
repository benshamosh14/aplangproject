import { Heart, Handshake, Settings, Calendar, Bus, Scale } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    color: "bg-primary/10 text-primary",
    title: "Mental Health & Workload Balance",
    emoji: "🧠",
    policies: [
      {
        name: "Shortened Class Periods",
        desc: "From 57 to 52 minutes — giving students breathing room every single day.",
        why: "Five minutes per class adds up. That's time back for you to reset, refocus, and actually learn.",
      },
      {
        name: "Daily Decompression Period",
        desc: "A dedicated study and decompress block built into every schedule.",
        why: "Students need a moment in the day that belongs to them — not to a test or a deadline.",
      },
      {
        name: "Grade-Level Scheduling",
        desc: "Organized scheduling that reduces chaos and conflicts across grade levels.",
        why: "Less scheduling stress means more energy for the things that actually matter.",
      },
    ],
  },
  {
    icon: Handshake,
    color: "bg-warm/10 text-warm",
    title: "Trust, Fairness & Transparency",
    emoji: "🤝",
    policies: [
      {
        name: "Clear AI Guidelines",
        desc: "Consistent, school-wide policies on AI use that students and teachers both understand.",
        why: "No more guessing games. Clear rules build trust and let students focus on learning.",
      },
      {
        name: "Student Responsibility & Autonomy",
        desc: "Treat students as capable individuals who can manage their own academic choices.",
        why: "Trust isn't given — but it should be earned fairly, not assumed away.",
      },
      {
        name: "Rebuilding Student-Teacher Trust",
        desc: "Open communication channels between students and faculty on policy decisions.",
        why: "When students feel heard, the whole school culture improves.",
      },
    ],
  },
  {
    icon: Settings,
    color: "bg-success/10 text-success",
    title: "Smarter Systems",
    emoji: "⚙️",
    policies: [
      {
        name: "Shared Digital Test Calendar",
        desc: "A unified calendar so students can see all upcoming assessments in one place.",
        why: "No more three tests on the same day by surprise. Plan ahead, stress less.",
      },
      {
        name: "Late Bus for Academics & Clubs",
        desc: "Extended transportation so students can stay after school without worrying about rides.",
        why: "Access shouldn't depend on who can pick you up. Everyone deserves the same opportunities.",
      },
      {
        name: "Equity & Reduced Stress",
        desc: "Policies designed to level the playing field and reduce unnecessary pressure.",
        why: "A system that works for everyone — not just those who can keep up with an impossible pace.",
      },
    ],
  },
];

const PlatformSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-[0.15em] uppercase mb-3">
            The Platform
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-6">
            Real policies. Real change.
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            These aren't empty promises. Every policy here is designed to make 
            your day better — starting now.
          </p>
        </div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              {/* Pillar Header */}
              <div className="p-8 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${pillar.color} flex items-center justify-center`}>
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {pillar.emoji} {pillar.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Policies */}
              <div className="divide-y divide-border">
                {pillar.policies.map((policy, j) => (
                  <div key={j} className="p-8 hover:bg-muted/50 transition-colors">
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {policy.name}
                    </h4>
                    <p className="text-muted-foreground mb-3">{policy.desc}</p>
                    <p className="text-sm text-primary font-medium italic">
                      Why it matters: {policy.why}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
