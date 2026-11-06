import AmenitiesScroll from "@/components/home/AmenitiesScroll";
import HeroWindow from "@/components/home/HeroWindow";
import Journal from "@/components/home/Journal";
import Manifesto from "@/components/home/Manifesto";
import PortfolioIndex from "@/components/home/PortfolioIndex";
import Recognition from "@/components/home/Recognition";
import Showroom from "@/components/home/Showroom";

/*
  Narrative: open the window (hero) → who we are (manifesto) → where you can live (showroom)
  → what living there feels like (amenities) → proof (delivered keys, recognition)
  → keep learning (journal) → talk to us (footer).
*/
export default function Home() {
  return (
    <>
      <HeroWindow />
      <Manifesto />
      <Showroom />
      <AmenitiesScroll />
      <PortfolioIndex />
      <Recognition />
      <Journal />
    </>
  );
}
