const WhyItMattersSection = () => {
  return (
    <section className="py-24 bg-section-alt">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-semibold text-sm tracking-[0.15em] uppercase mb-3">
            Why This Matters Here
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-8">
            This is about <span className="text-gradient">Northern Highlands</span>.
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-left">
            <p>
              We go to one of the most academically rigorous schools in the state. 
              That's something to be proud of — but it shouldn't come at the cost 
              of your well-being.
            </p>
            <p>
              Northern Highlands students are driven, talented, and resilient. But 
              even the most resilient people need systems that support them, not 
              ones that push them to the edge.
            </p>
            <p>
              This campaign isn't about lowering standards. It's about raising the 
              bar for <em>how</em> we treat students. It's about building a school 
              culture where success and mental health aren't opposites — they're 
              partners.
            </p>
            <p className="text-foreground font-semibold">
              You deserve a school that sees you as a person first, and a student second.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMattersSection;
