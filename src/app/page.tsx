import AwardsTeaser from "@/components/AwardsTeaser";
import BairroParque from "@/components/BairroParque";
import BlogTeaser from "@/components/BlogTeaser";
import CtaBand from "@/components/CtaBand";
import Hero from "@/components/Hero";
import Numbers from "@/components/Numbers";
import PhaseShowcase from "@/components/PhaseShowcase";
import PortfolioStrip from "@/components/PortfolioStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <PhaseShowcase />
      <BairroParque />
      <Numbers />
      <PortfolioStrip />
      <AwardsTeaser />
      <BlogTeaser />
      <CtaBand />
    </>
  );
}
