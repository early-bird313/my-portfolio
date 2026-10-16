import React from "react";
import "./styles/Sections.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-copy">
          Designed & Engineered by <span>Minhaj Ahmed Pabel</span> • 2026. All rights reserved.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
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
