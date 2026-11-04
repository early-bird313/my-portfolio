import { MouseEvent } from "react";
import "./styles/Sections.css";

const Hero = () => {
  const handleJumpToProjects = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsEl = document.getElementById("projects");
    if (projectsEl) {
      const navbarOffset = 70;
      const targetY = projectsEl.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });

      // Subtle gentle focus pulse on filter bar once scrolled
      setTimeout(() => {
        const filterBar = document.querySelector(".projects-filter-bar");
        if (filterBar) {
          (filterBar as HTMLElement).style.transition = "transform 0.35s ease, filter 0.35s ease";
          (filterBar as HTMLElement).style.transform = "scale(1.02)";
          setTimeout(() => {
            (filterBar as HTMLElement).style.transform = "scale(1)";
          }, 380);
        }
      }, 650);
    }
  };

  return (
    <section className="hero-prototype-section" id="hero">
      <div className="hero-content-wrap">
        {/* Main Display Headline */}
        <h1 className="hero-main-title">
          <span>I TURN IDEAS INTO </span>
          <br />
          <span className="gradient-text">DIGITAL SOLUTIONS.</span>
        </h1>

        {/* Lead Subtitle */}
        <p className="hero-lead-desc">
          Worked with <strong>50+ local and international clients</strong>, turning ideas into
          creative solutions and building lasting professional relationships.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <a
            href="#projects"
            className="btn-jump-projects"
            onClick={handleJumpToProjects}
            title="Jump directly to live projects"
          >
            <span className="btn-jump-lightning">⚡</span>
            <span className="btn-jump-text">Jump Directly to Projects</span>
            <svg
              className="btn-bounce-arrow"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 13l5 5 5-5M12 4v14" />
            </svg>
          </a>
          <a href="#contact" className="btn-secondary-outline">
            <span>Let's Build Together</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Stats Row — 50+ Clients & 100% Drive */}
        <div className="hero-stats-row">
          <div className="stat-box">
            <div className="stat-number">50+</div>
            <div className="stat-label">Clients Worldwide</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-box">
            <div className="stat-number">100%</div>
            <div className="stat-label">Problem-Solving Drive</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
