import { useEffect, useRef, useState } from "react";
import "./styles/Sections.css";

interface TimelineEntry {
  year: string;
  step: string;
  title: string;
  description: string;
  isCurrent?: boolean;
  tags: string[];
}

const timelineData: TimelineEntry[] = [
  {
    year: "2026",
    step: "01",
    title: "AI Automation & Agentic Engineering",
    description: "Exploring intelligent systems and AI-powered solutions.",
    isCurrent: true,
    tags: ["Agentic AI", "Autonomous Workflows", "Prompt Engineering", "LLM Integration"]
  },
  {
    year: "2025",
    step: "02",
    title: "Traditional Software Development",
    description: "Building a foundation in programming and software development.",
    tags: ["Full-Stack", "TypeScript", "React", "Node.js", "Clean Code"]
  },
  {
    year: "2024",
    step: "03",
    title: "Real-World Problem Solving",
    description: "Gaining professional experience in client handling, communication, and solving real-world challenges.",
    tags: ["Client Handling", "Communication", "Real-World Challenges", "50+ Clients"]
  },
  {
    year: "2023",
    step: "04",
    title: "Freelance Graphic Design",
    description: "Developing visual creativity and digital design skills.",
    tags: ["Visual Creativity", "Digital Design", "UI/UX Thinking", "Brand Identity"]
  },
  {
    year: "2022",
    step: "05",
    title: "Basic Computer Skills",
    description: "Building a foundation in computer fundamentals and digital tools.",
    tags: ["Computing Fundamentals", "Digital Tools", "Exploration", "Core Foundations"]
  }
];

const Journey = () => {
  const isYearParam = typeof window !== "undefined" && window.location.search.includes("year=");
  const initialYear = isYearParam ? parseInt(window.location.search.split("year=")[1]?.split("&")[0] || "0", 10) : 0;
  const [activeIndex, setActiveIndex] = useState(initialYear);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScroll;
      const progress = Math.max(0, Math.min(0.999, rawProgress));

      const count = timelineData.length;
      const idx = Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
      setActiveIndex(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToYear = (idx: number) => {
    const clampedIdx = Math.max(0, Math.min(timelineData.length - 1, idx));
    setActiveIndex(clampedIdx);
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const totalScroll = rect.height - window.innerHeight;
    if (totalScroll > 0) {
      const stepSize = totalScroll / timelineData.length;
      const targetScrollY = window.scrollY + rect.top + (clampedIdx + 0.15) * stepSize;
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  };

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    touchStartX.current = null;
    touchStartY.current = null;

    // Detect horizontal swipe on card
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && activeIndex < timelineData.length - 1) {
        scrollToYear(activeIndex + 1);
      } else if (deltaX < 0 && activeIndex > 0) {
        scrollToYear(activeIndex - 1);
      }
    }
  };

  const currentItem = timelineData[activeIndex];

  return (
    <section className="portfolio-section journey-scroll-section" id="journey" ref={sectionRef}>
      <div className="section-inner section-wide journey-inner-sticky">
        {/* Right-aligned Title */}
        <div className="journey-header-wrap">
          <h2 className="section-title journey-title-right">
            MY <span className="text-accent">JOURNEY</span>
          </h2>
        </div>

        {/* 2-Column Split: Left = 3D Particle Sculpture Anchor, Right = Sequential Single-Year Spotlight */}
        <div className="journey-grid-layout">
          {/* Left: Open spatial anchor for 3D sculpture to glide into */}
          <div className="journey-sculpture-anchor" aria-hidden="true" />

          {/* Right: Vertical Timeline Stepper + Active Card */}
          <div className="journey-spotlight-side">
            <div className="journey-vertical-layout">
              {/* Vertical timeline going downwards on the side */}
              <div className="journey-vertical-track">
                <div className="vertical-spine-line">
                  <div
                    className="vertical-spine-progress"
                    style={{ height: `${(activeIndex / (timelineData.length - 1)) * 100}%` }}
                  />
                </div>

                <div className="vertical-nodes-list">
                  {timelineData.map((item, index) => (
                    <button
                      key={item.year}
                      type="button"
                      className={`vertical-node-btn ${index === activeIndex ? "active" : ""} ${index < activeIndex ? "completed" : ""}`}
                      onClick={() => scrollToYear(index)}
                      title={`Phase ${item.step}: ${item.year}`}
                    >
                      <span className="vertical-node-dot">
                        {index === activeIndex && <span className="node-pulse-ring" />}
                      </span>
                      <span className="vertical-node-year">{item.year}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Year Spotlight Card — Replaced and animated downwards on scroll */}
              <div
                className="journey-card-container"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="journey-spotlight-card" key={currentItem.year}>
                  <div className="spotlight-top-bar">
                    <div className="spotlight-year-wrap">
                      <span className="spotlight-year-number">{currentItem.year}</span>
                      {currentItem.isCurrent && (
                        <span className="spotlight-current-pill">✦ Current Focus</span>
                      )}
                    </div>
                    <div className="spotlight-step-tag">Phase {currentItem.step} of 05</div>
                  </div>

                  <h3 className="spotlight-title">{currentItem.title}</h3>
                  <p className="spotlight-desc">{currentItem.description}</p>

                  {/* Subtle Scroll Hint */}
                  <div className="spotlight-scroll-indicator">
                    <span className="indicator-pulse" />
                    {activeIndex < timelineData.length - 1 ? (
                      <button
                        type="button"
                        className="indicator-text-btn"
                        onClick={() => scrollToYear(activeIndex + 1)}
                      >
                        Scroll down to explore {timelineData[activeIndex + 1].year} ↓
                      </button>
                    ) : (
                      <span className="indicator-text">
                        Scroll to explore Featured Projects ↓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
