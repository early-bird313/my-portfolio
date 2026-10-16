import { useState, useEffect } from "react";
import "./styles/Navbar.css";

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
