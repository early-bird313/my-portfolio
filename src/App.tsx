import { useState, useEffect } from "react";
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
import { SecretAdminModal } from "./components/SecretAdminModal";
import { AdminStudioModal } from "./components/AdminStudioModal";
import "./App.css";

const App = () => {
  const isNoSplash =
    typeof window !== "undefined" &&
    (window.location.search.includes("nosplash=1") ||
      window.location.search.includes("view="));
  const [showSplash, setShowSplash] = useState(!isNoSplash);

  // Stealth Admin Controls (Hotkey: Ctrl + Shift + A)
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [isAdminStudioOpen, setIsAdminStudioOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Shift+A or Cmd+Shift+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        setIsSecretModalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
        <FeaturedProjects refreshTrigger={refreshTrigger} />
        <Contact />
        <Footer />
        <SocialIcons />
        <WhatsAppWidget />
      </main>

      {/* ── Stealth Admin Secret Hotkey Access (Ctrl+Shift+A) ── */}
      <SecretAdminModal
        isOpen={isSecretModalOpen}
        onClose={() => setIsSecretModalOpen(false)}
        onSuccess={() => {
          setIsSecretModalOpen(false);
          setIsAdminStudioOpen(true);
        }}
      />

      {/* ── Admin Studio / CMS Modal ── */}
      <AdminStudioModal
        isOpen={isAdminStudioOpen}
        onClose={() => setIsAdminStudioOpen(false)}
        onProjectsUpdated={() => setRefreshTrigger((prev) => prev + 1)}
      />
    </>
  );
};

export default App;
