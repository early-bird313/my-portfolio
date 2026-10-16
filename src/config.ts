/**
 * ===================================================================
 *  PORTFOLIO CONFIGURATION — Edit this single file to customize
 *  everything on the website: name, bio, links, images, and more.
 * ===================================================================
 */

export const config = {
  /* ── Branding ──────────────────────────────────────────────── */
  logo: "GT",                              // Top-left logo text (your initials)

  /* ── Hero / Splash Banner ──────────────────────────────────── */
  headline: "Creative",                    // Line 1 of the big headline
  headlineAccent: "AI Engineer.",          // Line 2 — rendered in accent color
  subtitle:
    "Building stunning web apps with autonomous AI agents.",
  ctaPrimary: "View My Work",
  ctaSecondary: "Contact Me",

  /* ── Banner Image ──────────────────────────────────────────── */
  bannerImage: "/images/banner.jpg",
  profileImage: "/images/banner.jpg",

  /* ── Navigation ────────────────────────────────────────────── */
  nav: [
    { label: "Home",      href: "#home" },
    { label: "Portfolio",  href: "#portfolio" },
    { label: "Services",   href: "#services" },
    { label: "About",      href: "#about" },
    { label: "Contact",    href: "#contact" },
  ],

  /* ── Social Links ──────────────────────────────────────────── */
  social: {
    github:   "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
    email:    "pabelminhajahmed@gmail.com",
  },

  /* ── Splash Timer (seconds) ────────────────────────────────── */
  splashDuration: 5,

  /* ── Theme Colors (also mirrored in index.css as CSS vars) ── */
  colors: {
    accent:    "#ccff00",
    accentDim: "#b4f000",
    bg:        "#0a0a0c",
    bgLight:   "#121215",
    text:      "#ffffff",
    textMuted: "#888888",
  },
} as const;
