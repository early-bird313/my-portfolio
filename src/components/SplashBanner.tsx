import { useEffect, useRef, useState } from "react";
import "./SplashBanner.css";

interface SplashBannerProps {
  onComplete: () => void;
}

const SplashBanner = ({ onComplete }: SplashBannerProps) => {
  const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");
  const [percent, setPercent] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Precision 1.8s progress timer (guaranteed 2 to 3 seconds total splash wait time)
  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("visible"), 30);

    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds for smooth 0% -> 100% counter

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setPercent(progress);

      if (elapsed < duration) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setPercent(100);
        setIsLoaded(true);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      clearTimeout(enterTimer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // When loading reaches 100%, show "WELCOME" briefly (300ms) then auto-transition
  useEffect(() => {
    if (isLoaded) {
      const exitTimer = setTimeout(() => {
        setPhase("exit");
      }, 300);

      return () => clearTimeout(exitTimer);
    }
  }, [isLoaded]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && phase === "exit") {
      onComplete();
    }
  };

  const handleSkip = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setPercent(100);
    setIsLoaded(true);
    setTimeout(() => {
      setPhase("exit");
    }, 100);
  };

  const handlePillMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pillRef.current) return;
    const rect = pillRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pillRef.current.style.setProperty("--mouse-x", `${x}px`);
    pillRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      className={`splash-banner splash-${phase}`}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* ── Atmospheric Ambient Lighting ── */}
      <div className="splash-bg">
        <div className="splash-ambient-glow" />
        <div className="splash-rays" />
        <div className="splash-noise" />
      </div>

      {/* ── Full Desktop Background Image with Soft Gradient Blend ── */}
      <div className="splash-desktop-bg">
        <img
          src="/images/desktop-banner.jpg"
          alt="Creative AI Engineer Desktop Hero"
          className={`splash-desktop-img ${imgLoaded ? "loaded" : ""}`}
          onLoad={() => setImgLoaded(true)}
        />
        <div className="splash-desktop-gradient" />
      </div>

      {/* ── Fullscreen Hero Stage (Left-Aligned, Safe from Portrait) ── */}
      <main className="splash-hero">
        <div className="hero-content">
          <h1 className="hero-title splash-ideas-title">
            <div className="title-mask line-1-mask">
              <span className="title-text line-1">CREATIVE THINKER</span>
            </div>
            <div className="title-mask line-2-mask">
              <span className="title-text line-2">
                <span className="shimmer-text">& PROBLEM SOLVER</span>
                <span className="title-period">.</span>
              </span>
            </div>
          </h1>
        </div>
      </main>

      {/* ── Bottom Center: Sleek 6-7s Loading & Welcome Capsule Pill ── */}
      <footer className="splash-footer">
        {/* Subtle Background Marquee Ticker */}
        <div className="footer-marquee">
          <div className="marquee-track">
            <span>AI ENGINEER • FULL-STACK DEVELOPER • CREATIVE TECH • AUTONOMOUS AGENTS • </span>
            <span>AI ENGINEER • FULL-STACK DEVELOPER • CREATIVE TECH • AUTONOMOUS AGENTS • </span>
          </div>
        </div>

        {/* The Capsule Pill */}
        <div
          ref={pillRef}
          className={`loading-capsule-pill ${isLoaded ? "pill-welcome" : ""}`}
          onMouseMove={handlePillMouseMove}
          onClick={handleSkip}
          role="button"
          tabIndex={0}
          title={isLoaded ? "Entering Portfolio..." : "Click to Skip"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleSkip();
          }}
        >
          <div className="pill-ambient-light" />

          <div className="pill-content">
            {!isLoaded ? (
              <div className="pill-state-loading">
                <span className="pill-label">LOADING</span>
                <span className="pill-counter">{percent}%</span>
                <span className="pill-cursor">█</span>
              </div>
            ) : (
              <div className="pill-state-welcome">
                <span className="welcome-symbol">✦</span>
                <span className="welcome-title">WELCOME</span>
                <span className="welcome-symbol">✦</span>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SplashBanner;
