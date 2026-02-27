const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-primary-foreground mb-6 leading-tight">
          Balance Over Burnout.
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 leading-relaxed mb-4">
          This isn't just about policies — it's about trust. It's about believing 
          that students deserve better and having the courage to ask for it.
        </p>
        <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 leading-relaxed mb-10">
          When you vote, choose the party that puts your well-being first. 
          Choose the party that listens. Choose the party that believes in you.
        </p>

        <div className="space-y-4">
          <p className="text-2xl sm:text-3xl font-bold text-primary-foreground">
            Choose the Merit and Mindset Party.
          </p>
          <p className="text-primary-foreground/70 text-lg">
            The future of Northern Highlands starts with us — calm, balanced, and human.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
