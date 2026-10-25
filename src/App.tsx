import { useState } from "react";
import SplashBanner from "./components/SplashBanner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillsMarquee from "./components/SkillsMarquee";
import Journey from "./components/Journey";
import FeaturedProjects from "./components/FeaturedProjects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SocialIcons from "./components/SocialIcons";
import GlobalParticleSculpture from "./components/GlobalParticleSculpture";
import WhatsAppWidget from "./components/WhatsAppWidget";
import "./App.css";

const App = () => {
  const isNoSplash =
    typeof window !== "undefined" &&
    (window.location.search.includes("nosplash=1") ||
      window.location.search.includes("view="));
  const [showSplash, setShowSplash] = useState(!isNoSplash);

  return (
    <>
      {/* ── Global 3D Dynamic Organic Point Cloud Sculpture (Loads only AFTER splash completes) ── */}
      {!showSplash && <GlobalParticleSculpture />}

      {showSplash && (
        <SplashBanner onComplete={() => setShowSplash(false)} />
      )}

      {/* Main portfolio content blueprint */}
      <main className={`main-content ${showSplash ? "hidden" : "visible"}`} style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
        <Hero />
        <About />
        <SkillsMarquee />
        <Journey />
        <FeaturedProjects />
        <Contact />
        <Footer />
        <SocialIcons />
        <WhatsAppWidget />
      </main>
    </>
  );
};

export default App;
