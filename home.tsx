import HeroSection from "~/components/Landing/HeroSection";
import { FeaturesSection } from "~/components/Landing/features-section";
import { speechesSection } from "@/components/Landing/speeches";
import { CallToAction } from "~/components/Landing/call-to-action";

export default function Home() {
  return (
    <div className="relative h-full">
      <HeroSection />
      <FeaturesSection />
      <speechesSection />
      <CallToAction />
    </div>
  );
}
