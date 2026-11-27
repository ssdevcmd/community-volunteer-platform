import CategoriesSection from "@/components/home/CategoriesSection";
import CTASection from "@/components/home/CTASection";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import ImpactStats from "@/components/home/ImpactStats";

export default function Home() {
  return (
    <main>
      <HeroSection></HeroSection>
      <FeaturedEvents></FeaturedEvents>
      <CategoriesSection></CategoriesSection>
      <HowItWorks></HowItWorks>
      <ImpactStats></ImpactStats>
      <CTASection></CTASection>
    </main>
  );
}
