import FeaturedEvents from "@/components/home/FeaturedEvents";
import HeroSection from "@/components/home/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection></HeroSection>
      <FeaturedEvents></FeaturedEvents>
    </main>
  );
}
