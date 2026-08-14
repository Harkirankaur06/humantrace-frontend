import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import AboutHero from "@/components/about/AboutHero";
import Mission from "@/components/about/Mission";
import Workflow from "@/components/about/Workflow";
import TechStack from "@/components/about/TechStack";
import Performance from "@/components/about/Performance";
import ProjectInfo from "@/components/about/ProjectInfo";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24">

        <AboutHero />

        <Mission />

        <Workflow />

        <TechStack />

        <Performance />

        <ProjectInfo />

      </main>

      <Footer />
    </>
  );
}