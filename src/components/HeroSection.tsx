import { Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-hero-gradient opacity-80" />

      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        {/* Video Placeholder */}
        <div className="mx-auto mb-12 max-w-3xl animate-fade-up">
          <div className="relative aspect-video rounded-2xl bg-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center cursor-pointer group hover:bg-foreground/15 transition-colors">
            <div className="w-20 h-20 rounded-full bg-primary-foreground/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-primary-foreground ml-1" />
            </div>
            <span className="absolute bottom-4 text-primary-foreground/70 text-sm font-medium">
              Watch the Campaign Video
            </span>
          </div>
        </div>

        {/* Candidate Info */}
        <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <p className="text-primary-foreground/80 font-medium text-sm tracking-[0.2em] uppercase mb-4">
            Merit and Mindset Party
          </p>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-primary-foreground mb-6 leading-tight">
            Ellie Shrier
          </h1>
          <p className="text-2xl sm:text-4xl font-bold text-primary-foreground/90 mb-6">
            Balance Over Burnout
          </p>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/75 leading-relaxed">
            A campaign built on trust, mental health, and real change for 
            Northern Highlands students. Because you deserve a school 
            that works <em>with</em> you — not against you.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1s" }}>
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-primary-foreground/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
