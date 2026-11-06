import AmenitiesScroll from "@/components/home/AmenitiesScroll";
import HeroWindow from "@/components/home/HeroWindow";
import Journal from "@/components/home/Journal";
import Manifesto from "@/components/home/Manifesto";
import PortfolioIndex from "@/components/home/PortfolioIndex";
import ProjectsRail from "@/components/home/ProjectsRail";
import Recognition from "@/components/home/Recognition";
import SearchBand from "@/components/home/SearchBand";
import Trajectory from "@/components/home/Trajectory";

/*
  Narrative: open the window (hero) → who we are (manifesto) → where you can live (projects)
  → what living there feels like (amenities) → find yours (search) → how we got here (trajectory)
  → proof (portfolio, recognition) → keep learning (journal) → talk to us (footer).
*/
export default function Home() {
  return (
    <>
      <HeroWindow />
      <Manifesto />
      <ProjectsRail />
      <AmenitiesScroll />
      <SearchBand />
      <Trajectory />
      <PortfolioIndex />
      <Recognition />
      <Journal />
    </>
  );
}
