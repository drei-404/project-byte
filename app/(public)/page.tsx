import Footer from "@/components/sections/public/footer";
import Hero from "@/components/sections/public/hero";
import LatestNews from "@/components/sections/public/latest-news";
import ProgramBlueprint from "@/components/sections/public/program-blueprint/program-blueprint";

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
