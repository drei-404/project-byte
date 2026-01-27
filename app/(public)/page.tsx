import Footer from "@/app/(public)/page-sections/footer";
import Hero from "@/app/(public)/page-sections/hero";
import LatestNews from "@/app/(public)/page-sections/latest-news";
import ProgramBlueprint from "@/app/(public)/page-sections/program-blueprint/program-blueprint";

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
