import { Hero } from "@/components/Hero";
import { HomeContent } from "@/components/HomeContent";
import { Footer } from "@/components/Footer";
import { HiringBanner } from "@/components/HiringBanner";

export default function Home() {
  return (
    <main>
      <HiringBanner />
      <Hero />
      <HomeContent />
      <Footer />
    </main>
  );
}
