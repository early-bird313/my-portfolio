import "./styles/Sections.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-copy">
          Designed & Engineered by <span>Minhaj Ahmed Pabel</span> • 2026. All rights reserved.
        </div>

        <div className="footer-links-group" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div className="footer-socials" style={{ display: "flex", gap: "1.2rem" }}>
            <a href="https://github.com/early-bird313" target="_blank" rel="noopener noreferrer" style={{ color: "#a1a1aa", fontSize: "0.85rem", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#ccff00")} onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}>GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "#a1a1aa", fontSize: "0.85rem", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#ccff00")} onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}>LinkedIn</a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" style={{ color: "#a1a1aa", fontSize: "0.85rem", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#ccff00")} onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}>Behance</a>
          </div>

          <a href="#hero" className="footer-back-top">
            <span>Back to top</span>
            <span>↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
