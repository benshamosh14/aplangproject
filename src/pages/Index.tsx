import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import PlatformSection from "@/components/PlatformSection";
import WhyItMattersSection from "@/components/WhyItMattersSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="problem">
        <ProblemSection />
      </div>
      <div id="platform">
        <PlatformSection />
      </div>
      <div id="why">
        <WhyItMattersSection />
      </div>
      <CTASection />
    </main>
  );
};

export default Index;
