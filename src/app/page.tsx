import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome/welcome";
import HeroSection from "~/components/Landing/HeroSection";
import { FeaturesSection } from "~/components/Landing/features-section";
import { TestimonialsSection } from "~/components/Landing/testimonials-section";
import { CallToAction } from "~/components/Landing/call-to-action";


export default function Home() {
  return (
    <div className="relative h-full">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToAction />
    </div>
  );
}
