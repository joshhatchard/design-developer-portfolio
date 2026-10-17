import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeScrollRestorer from "./components/HomeScrollRestorer";
import WorkShowcase from "./components/WorkShowcase";
import CaseStudies from "./components/CaseStudies";
import Creative from "./components/Creative";
import About from "./components/About";
import CallToAction from "./components/CallToAction";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HomeScrollRestorer />
        <Hero />
        <WorkShowcase>
          <CaseStudies />
          <Creative />
          <About><CallToAction /></About>
        </WorkShowcase>
      </main>
    </>
  );
}
