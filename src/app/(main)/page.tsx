import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import HeroSection from "@/components/home/HeroSection";
import ImpactStats from "@/components/home/ImpactStats";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection></HeroSection>
      <FeaturedEvents></FeaturedEvents>
      <CategoriesSection></CategoriesSection>
      <ImpactStats></ImpactStats>
    </main>
  );
}
