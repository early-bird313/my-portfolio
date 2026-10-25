import "./styles/SkillsMarquee.css";

const row1Skills = [
  { text: "AI AUTOMATION", variant: "accent", badge: "2026 Focus" },
  { text: "WEB DEVELOPMENT", variant: "solid" },
  { text: "GRAPHIC DESIGN", variant: "outline" },
  { text: "VIDEO EDITING", variant: "accent" },
  { text: "AUTONOMOUS AGENTS", variant: "solid", badge: "Agentic AI" },
  { text: "DIGITAL SOLUTIONS", variant: "outline" },
];

const row2Skills = [
  { text: "FULL-STACK ENGINEERING", variant: "solid" },
  { text: "PROBLEM SOLVING", variant: "accent", badge: "Core Focus" },
  { text: "INTELLIGENT WORKFLOWS", variant: "outline" },
  { text: "CREATIVE VISUALS", variant: "solid" },
  { text: "CLIENT SUCCESS", variant: "accent", badge: "50+ Clients" },
  { text: "MODERN TECH STACK", variant: "outline" },
];

const SkillsMarquee = () => {
  return (
    <div className="skills-marquee-section" aria-label="Specialized Skills and Capabilities">
      <div className="skills-marquee-glow" aria-hidden="true" />

      <div className="skills-marquee-container">
        {/* Row 1: Sliding Left */}
        <div className="marquee-row marquee-row-left">
          {/* Duplicate row twice for flawless continuous loop */}
          <div className="marquee-inner">
            {[...row1Skills, ...row1Skills].map((item, idx) => (
              <span key={`r1-${idx}`} className={`marquee-item ${item.variant}`}>
                <span>{item.text}</span>
                {item.badge && <span className="marquee-pill">{item.badge}</span>}
                <span className="marquee-star">✦</span>
              </span>
            ))}
          </div>
          <div className="marquee-inner" aria-hidden="true">
            {[...row1Skills, ...row1Skills].map((item, idx) => (
              <span key={`r1-dup-${idx}`} className={`marquee-item ${item.variant}`}>
                <span>{item.text}</span>
                {item.badge && <span className="marquee-pill">{item.badge}</span>}
                <span className="marquee-star">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Sliding Right */}
        <div className="marquee-row marquee-row-right">
          <div className="marquee-inner">
            {[...row2Skills, ...row2Skills].map((item, idx) => (
              <span key={`r2-${idx}`} className={`marquee-item ${item.variant}`}>
                <span>{item.text}</span>
                {item.badge && <span className="marquee-pill">{item.badge}</span>}
                <span className="marquee-star">✦</span>
              </span>
            ))}
          </div>
          <div className="marquee-inner" aria-hidden="true">
            {[...row2Skills, ...row2Skills].map((item, idx) => (
              <span key={`r2-dup-${idx}`} className={`marquee-item ${item.variant}`}>
                <span>{item.text}</span>
                {item.badge && <span className="marquee-pill">{item.badge}</span>}
                <span className="marquee-star">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsMarquee;
