import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import LatestNews from "@/components/sections/latest-news";
import ProgramBlueprint from "@/components/sections/program-blueprint/program-blueprint";

export default function Home() {
  return (
    <>
      <Hero />
      <ProgramBlueprint />
      <LatestNews />
      <Footer />
    </>
  );
}
