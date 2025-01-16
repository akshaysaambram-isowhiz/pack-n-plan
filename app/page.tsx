import { AnimatedHero } from "@/components/animated-hero";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <AnimatedHero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
