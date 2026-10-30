import "./styles/Sections.css";
import { config } from "../config";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-copy">
          Designed & Engineered by <span>Minhaj Ahmed Pabel</span> • 2026. All rights reserved.
        </div>

        <div className="footer-links-group" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div className="footer-socials" style={{ display: "flex", gap: "1.2rem" }}>
            <a href={config.social.github} target="_blank" rel="noopener noreferrer" style={{ color: "#a1a1aa", fontSize: "0.85rem", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#ccff00")} onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}>GitHub</a>
            <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#a1a1aa", fontSize: "0.85rem", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#ccff00")} onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}>LinkedIn</a>
            <a href={config.social.facebook || "https://facebook.com"} target="_blank" rel="noopener noreferrer" style={{ color: "#a1a1aa", fontSize: "0.85rem", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#ccff00")} onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}>Facebook</a>
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
