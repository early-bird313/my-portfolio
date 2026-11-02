import { useState, useEffect } from "react";
import "./styles/Navbar.css";
import { config } from "../config";

const navLinks = [
  { id: "about", label: "ABOUT" },
  { id: "journey", label: "JOURNEY" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      const heroEl = document.getElementById("hero");
      if (heroEl && window.scrollY < heroEl.offsetHeight * 0.45) {
        setActiveSection("");
        return;
      }

      let current = "";
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = link.id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="main-navbar">
      <div className="navbar-left">
        <a href="#hero" className="navbar-logo" onClick={() => { setActiveSection(""); setMobileOpen(false); }}>
          <span className="logo-initials">MP</span>
          <span className="logo-dot">.</span>
        </a>
      </div>

      <div className="navbar-center">
        <a href="mailto:pabelminhajahmed@gmail.com" className="navbar-email">
          pabelminhajahmed@gmail.com
        </a>
      </div>

      <nav className={`navbar-right ${mobileOpen ? "open" : ""}`}>
        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`nav-item ${activeSection === link.id ? "active-nav-pill" : ""}`}
                onClick={() => {
                  setActiveSection(link.id);
                  setMobileOpen(false);
                }}
              >
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Drawer 3 Social Icons at the Bottom */}
        <div className="mobile-drawer-socials">
          <a
            href={config.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-social-icon"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-social-icon"
            title="GitHub"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a
            href={config.social.facebook || "https://www.facebook.com/aiwithminhaj"}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-social-icon"
            title="Facebook"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </nav>

      {/* Mobile Hamburger Toggle */}
      <button
        className={`mobile-toggle-btn ${mobileOpen ? "active" : ""}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle Navigation"
      >
        <span className="bar" />
        <span className="bar" />
      </button>
    </header>
  );
};

export default Navbar;
