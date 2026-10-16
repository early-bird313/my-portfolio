import { useState, useEffect } from "react";
import "./styles/Sections.css";

export interface ProjectItem {
  id: string;
  category: "websites" | "applications" | "video" | "design";
  categoryLabel: string;
  title: string;
  description: string;
  fullDetails: string;
  clientType: string;
  highlights: string[];
  tags: string[];
  gradient: string;
}

export const projectsData: ProjectItem[] = [
  // Websites
  {
    id: "p1",
    category: "websites",
    categoryLabel: "Websites",
    title: "Modern Corporate Web Platform",
    description: "High-performance marketing & corporate website with dark mode, interactive service showcases, and seamless lead capture.",
    fullDetails: "An enterprise-grade corporate platform engineered with sub-second page loads, dark/light theme persistence, interactive 3D particle accents, and localized lead capture pipelines. Built with zero-hydration layout shift and fully optimized for top-tier search engine visibility.",
    clientType: "Fintech & Corporate Consultancy",
    highlights: [
      "Sub-second First Contentful Paint with Next.js static asset optimization",
      "Dynamic interactive pricing calculator & automated consultation booking",
      "TailwindCSS custom design token system with full dark-mode fidelity",
      "Achieved 99/100 Google Lighthouse score across Performance & SEO"
    ],
    tags: ["React", "TypeScript", "TailwindCSS", "SEO", "Next.js"],
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)"
  },
  {
    id: "p2",
    category: "websites",
    categoryLabel: "Websites",
    title: "E-Commerce & Digital Storefront",
    description: "Custom digital commerce experience with dynamic catalog filtering, instant cart management, and payment gateway integration.",
    fullDetails: "A modern digital commerce experience designed for high conversion and effortless product discovery. Features real-time multi-facet filtering, optimistic cart state updates, encrypted Stripe checkout, and automated customer receipt dispatch.",
    clientType: "Direct-to-Consumer Brand",
    highlights: [
      "Instant faceted search and attribute filtering with zero latency",
      "Optimistic UI cart additions with persistent local state",
      "Secure Stripe API checkout with webhook-based order processing",
      "Mobile-first responsive architecture designed for one-thumb checkout"
    ],
    tags: ["Next.js", "REST APIs", "Modern UI", "Stripe", "Tailwind"],
    gradient: "linear-gradient(135deg, #022c22 0%, #064e3b 100%)"
  },

  // Applications
  {
    id: "p3",
    category: "applications",
    categoryLabel: "Applications",
    title: "AI-Powered Automation Dashboard",
    description: "Operational management tool integrating intelligent workflows, task queues, and real-time client analytics.",
    fullDetails: "An autonomous agent operations hub that allows teams to configure multi-step LLM workflows, monitor real-time background task execution, inspect token expenditures, and visualize telemetry through reactive WebSocket data feeds.",
    clientType: "AI Automation Agency",
    highlights: [
      "Real-time agent queue telemetry powered by persistent WebSockets",
      "Multi-agent prompt orchestration pipeline with fallback routing",
      "Custom analytics widgets tracking inference latency and cost per token",
      "Role-based access control with audited operational task logs"
    ],
    tags: ["Autonomous Agents", "Node.js", "PostgreSQL", "Tailwind", "WebSockets"],
    gradient: "linear-gradient(135deg, #170725 0%, #311042 100%)"
  },
  {
    id: "p4",
    category: "applications",
    categoryLabel: "Applications",
    title: "Client Workspace & Workflow Tool",
    description: "Custom internal management portal built to streamline client communications, project milestones, and asset sharing.",
    fullDetails: "A centralized client portal and internal asset sharing hub created to replace disjointed email chains. Features interactive Kanban milestone tracking, encrypted file uploads, asynchronous review commenting, and milestone sign-off workflows.",
    clientType: "Digital Creative Studio",
    highlights: [
      "Interactive Kanban boards with drag-and-drop state transitions",
      "Secure direct-to-cloud asset storage with presigned URLs",
      "Threaded review comments with inline design timestamp pinning",
      "Instant notification dispatch via webhook & email automations"
    ],
    tags: ["React", "State Management", "Workflow Engine", "Node.js"],
    gradient: "linear-gradient(135deg, #0c0a09 0%, #1c1917 100%)"
  },

  // Video Editing
  {
    id: "p5",
    category: "video",
    categoryLabel: "Video Editing",
    title: "Cinematic Product Promo & Motion",
    description: "High-retention commercial video edit featuring custom motion graphics, sound design, and rhythm-synced visual pacing.",
    fullDetails: "A flagship promotional film crafted to introduce high-tier tech hardware. Features precision rhythm cuts synced to custom music pacing, 3D kinetic typography, spatial sound design, and Hollywood-grade color grading tailored for 4K digital showcases.",
    clientType: "Hardware Tech Brand",
    highlights: [
      "Precision cut-to-beat synchronization for maximum commercial engagement",
      "Custom After Effects 3D kinetic title animation & HUD overlays",
      "Layered spatial sound design with custom foley and sub-bass impacts",
      "Rec.709 & HDR wide-gamut cinematic color grade master"
    ],
    tags: ["Premiere Pro", "After Effects", "Sound Design", "Motion Graphics", "4K HDR"],
    gradient: "linear-gradient(135deg, #1c0a00 0%, #451a03 100%)"
  },
  {
    id: "p6",
    category: "video",
    categoryLabel: "Video Editing",
    title: "Social Media Brand Narrative Reels",
    description: "Fast-paced, hook-driven short-form video series crafted for high engagement across modern digital platforms.",
    fullDetails: "A strategic viral video campaign engineered specifically for modern vertical discovery algorithms. Utilizes 3-second hook retention techniques, dynamic motion zooms, auto-timed subtitles, and high-energy sound accents to generate millions of organic impressions.",
    clientType: "Digital Media Network",
    highlights: [
      "First 3-second retention hooks engineered to reduce feed drop-offs",
      "Custom dynamic subtitle animations with highlight keyword accents",
      "Pacing optimized for vertical 9:16 mobile viewing environments",
      "Generated over 1.2M+ organic views across campaign release"
    ],
    tags: ["Short-form Video", "Color Grading", "Retention Editing", "Viral Hooks"],
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)"
  },

  // Graphic Design
  {
    id: "p7",
    category: "design",
    categoryLabel: "Graphic Design",
    title: "Complete Brand Identity & Guidelines",
    description: "End-to-end branding system including logo design, color hierarchy, brand typography, and social media presentation kits.",
    fullDetails: "A cohesive brand identity ecosystem constructed from mathematical grid foundations. Encompasses geometric logo construction, high-contrast color palette hierarchies, custom typographic pairing, marketing collateral templates, and comprehensive brand guidelines.",
    clientType: "AI Innovation Startup",
    highlights: [
      "Geometric logo mark constructed on golden ratio circular grids",
      "Comprehensive digital & print brand guideline manual (60+ pages)",
      "Multi-channel social media asset kit with modular Figma components",
      "Accessible color contrast ratios conforming to WCAG AAA standards"
    ],
    tags: ["Figma", "Photoshop", "Brand System", "Typography", "Illustrator"],
    gradient: "linear-gradient(135deg, #170338 0%, #2e1065 100%)"
  },
  {
    id: "p8",
    category: "design",
    categoryLabel: "Graphic Design",
    title: "High-Converting UI/UX Concept",
    description: "Clean, user-centric interface design for web applications focusing on effortless navigation and conversion architecture.",
    fullDetails: "A human-centered web application interface designed to eliminate cognitive friction. Features modular design components, clear visual hierarchies, ergonomic touch targets, and frictionless conversion paths validated through user behavioral testing.",
    clientType: "SaaS Enterprise Product",
    highlights: [
      "End-to-end Figma prototype with interactive user flow states",
      "Design token system integrated directly into front-end CSS variables",
      "Frictionless onboarding flow driving a +42% conversion improvement",
      "Fully responsive wireframes across desktop, tablet, and mobile"
    ],
    tags: ["UI/UX Design", "Wireframing", "Prototyping", "Design System"],
    gradient: "linear-gradient(135deg, #021a19 0%, #042f2e 100%)"
  }
];

// Helper to render high quality vector dummy mockups for each project
export const renderProjectThumbnailMockup = (projectId: string) => {
  switch (projectId) {
    case "p1":
      // Corporate Web Platform Mockup
      return (
        <svg viewBox="0 0 360 200" className="dummy-mockup-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="336" height="176" rx="8" fill="#0b0f19" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          {/* Browser Window Header */}
          <path d="M12 20C12 15.5817 15.5817 12 20 12H340C344.418 12 348 15.5817 348 20V34H12V20Z" fill="#151d2f" />
          <circle cx="26" cy="23" r="3.5" fill="#ef4444" opacity="0.8" />
          <circle cx="37" cy="23" r="3.5" fill="#eab308" opacity="0.8" />
          <circle cx="48" cy="23" r="3.5" fill="#22c55e" opacity="0.8" />
          <rect x="72" y="18" width="160" height="10" rx="5" fill="#0b0f19" opacity="0.6" />
          {/* Hero Section */}
          <rect x="28" y="50" width="130" height="14" rx="4" fill="#ffffff" opacity="0.9" />
          <rect x="28" y="70" width="100" height="8" rx="3" fill="#64748b" />
          <rect x="28" y="86" width="60" height="14" rx="4" fill="#ccff00" />
          {/* Glass Card with Chart */}
          <rect x="175" y="48" width="160" height="88" rx="6" fill="#151d2f" stroke="rgba(255,255,255,0.08)" />
          <path d="M190 115L220 95L250 102L280 72L318 64" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="318" cy="64" r="3.5" fill="#ccff00" />
          <rect x="190" y="58" width="45" height="6" rx="3" fill="#64748b" />
          {/* Bottom 3 Cards */}
          <rect x="28" y="112" width="40" height="40" rx="5" fill="#151d2f" />
          <rect x="76" y="112" width="40" height="40" rx="5" fill="#151d2f" />
          <rect x="124" y="112" width="40" height="40" rx="5" fill="#151d2f" />
          <rect x="28" y="162" width="140" height="12" rx="3" fill="#1e293b" opacity="0.5" />
          <rect x="175" y="146" width="160" height="28" rx="4" fill="#1e293b" opacity="0.5" />
        </svg>
      );

    case "p2":
      // E-Commerce Storefront Mockup
      return (
        <svg viewBox="0 0 360 200" className="dummy-mockup-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="336" height="176" rx="8" fill="#041f18" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          {/* Nav Bar */}
          <rect x="12" y="12" width="336" height="24" rx="6" fill="#063228" />
          <rect x="28" y="19" width="50" height="10" rx="3" fill="#ccff00" opacity="0.9" />
          <rect x="90" y="19" width="130" height="10" rx="5" fill="#041f18" />
          <circle cx="330" cy="24" r="5" fill="#ccff00" />
          {/* Banner Promo */}
          <rect x="26" y="46" width="308" height="34" rx="6" fill="linear-gradient(90deg, #064e3b, #042f2e)" stroke="rgba(204,255,0,0.25)" />
          <rect x="42" y="58" width="120" height="10" rx="3" fill="#ffffff" />
          <rect x="270" y="55" width="50" height="16" rx="4" fill="#ccff00" />
          {/* 3 Product Cards */}
          <rect x="26" y="90" width="94" height="88" rx="6" fill="#063228" stroke="rgba(255,255,255,0.06)" />
          <rect x="36" y="98" width="74" height="42" rx="4" fill="#0b4638" />
          <rect x="36" y="146" width="50" height="8" rx="3" fill="#ffffff" />
          <rect x="36" y="158" width="32" height="10" rx="2" fill="#ccff00" />

          <rect x="133" y="90" width="94" height="88" rx="6" fill="#063228" stroke="rgba(255,255,255,0.06)" />
          <rect x="143" y="98" width="74" height="42" rx="4" fill="#0b4638" />
          <rect x="143" y="146" width="50" height="8" rx="3" fill="#ffffff" />
          <rect x="143" y="158" width="32" height="10" rx="2" fill="#ccff00" />

          <rect x="240" y="90" width="94" height="88" rx="6" fill="#063228" stroke="rgba(255,255,255,0.06)" />
          <rect x="250" y="98" width="74" height="42" rx="4" fill="#0b4638" />
          <rect x="250" y="146" width="50" height="8" rx="3" fill="#ffffff" />
          <rect x="250" y="158" width="32" height="10" rx="2" fill="#ccff00" />
        </svg>
      );

    case "p3":
      // AI Automation Dashboard Mockup
      return (
        <svg viewBox="0 0 360 200" className="dummy-mockup-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="336" height="176" rx="8" fill="#12061e" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          {/* Sidebar */}
          <rect x="12" y="12" width="46" height="176" fill="#1d0c2e" />
          <circle cx="35" cy="32" r="7" fill="#ccff00" />
          <rect x="25" y="55" width="20" height="4" rx="2" fill="#a855f7" />
          <rect x="25" y="72" width="20" height="4" rx="2" fill="#64748b" />
          <rect x="25" y="89" width="20" height="4" rx="2" fill="#64748b" />
          <rect x="25" y="106" width="20" height="4" rx="2" fill="#64748b" />
          {/* Top Metric Cards */}
          <rect x="68" y="24" width="78" height="40" rx="5" fill="#200d34" stroke="rgba(168,85,247,0.25)" />
          <rect x="76" y="32" width="35" height="6" rx="2" fill="#94a3b8" />
          <rect x="76" y="44" width="45" height="12" rx="3" fill="#ccff00" />

          <rect x="154" y="24" width="78" height="40" rx="5" fill="#200d34" stroke="rgba(168,85,247,0.25)" />
          <rect x="162" y="32" width="35" height="6" rx="2" fill="#94a3b8" />
          <rect x="162" y="44" width="45" height="12" rx="3" fill="#c084fc" />

          <rect x="240" y="24" width="94" height="40" rx="5" fill="#200d34" stroke="rgba(168,85,247,0.25)" />
          <rect x="248" y="32" width="45" height="6" rx="2" fill="#94a3b8" />
          <rect x="248" y="44" width="55" height="12" rx="3" fill="#38bdf8" />
          {/* Agent Flow Graph */}
          <rect x="68" y="74" width="266" height="102" rx="6" fill="#1b0a29" stroke="rgba(255,255,255,0.08)" />
          <path d="M85 145C125 110 150 160 195 105C235 60 270 130 315 90" stroke="#c084fc" strokeWidth="2.5" fill="none" />
          <path d="M85 160C130 130 160 170 210 130C250 95 280 145 315 115" stroke="#ccff00" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          <circle cx="195" cy="105" r="4" fill="#ccff00" />
          <circle cx="315" cy="90" r="4" fill="#a855f7" />
        </svg>
      );

    case "p4":
      // Client Workspace & Workflow Tool Mockup
      return (
        <svg viewBox="0 0 360 200" className="dummy-mockup-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="336" height="176" rx="8" fill="#111113" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          {/* Header */}
          <rect x="26" y="24" width="100" height="12" rx="3" fill="#ffffff" opacity="0.9" />
          <rect x="265" y="22" width="70" height="16" rx="4" fill="#ccff00" />
          {/* 3 Kanban Columns */}
          <rect x="26" y="50" width="94" height="126" rx="6" fill="#1a1a1e" />
          <rect x="36" y="58" width="45" height="8" rx="2" fill="#a1a1aa" />
          <rect x="34" y="74" width="78" height="38" rx="4" fill="#26262c" stroke="rgba(255,255,255,0.06)" />
          <rect x="42" y="82" width="50" height="6" rx="2" fill="#ffffff" />
          <circle cx="46" cy="98" r="4" fill="#ccff00" />
          <rect x="34" y="118" width="78" height="46" rx="4" fill="#26262c" stroke="rgba(255,255,255,0.06)" />

          <rect x="133" y="50" width="94" height="126" rx="6" fill="#1a1a1e" />
          <rect x="143" y="58" width="55" height="8" rx="2" fill="#ccff00" />
          <rect x="141" y="74" width="78" height="48" rx="4" fill="#26262c" stroke="rgba(204,255,0,0.3)" />
          <rect x="149" y="82" width="55" height="6" rx="2" fill="#ffffff" />
          <rect x="149" y="93" width="35" height="5" rx="2" fill="#a1a1aa" />
          <circle cx="153" cy="108" r="4" fill="#38bdf8" />

          <rect x="240" y="50" width="94" height="126" rx="6" fill="#1a1a1e" />
          <rect x="250" y="58" width="40" height="8" rx="2" fill="#22c55e" />
          <rect x="248" y="74" width="78" height="42" rx="4" fill="#26262c" stroke="rgba(255,255,255,0.06)" />
        </svg>
      );

    case "p5":
      // Cinematic Product Promo (Video NLE Editor) Mockup
      return (
        <svg viewBox="0 0 360 200" className="dummy-mockup-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="336" height="176" rx="8" fill="#140700" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          {/* Video Preview Monitor */}
          <rect x="24" y="24" width="180" height="96" rx="5" fill="#000000" stroke="rgba(249,115,22,0.3)" />
          <circle cx="114" cy="72" r="26" fill="radial-gradient(circle, #ea580c, #7c2d12)" />
          <polygon points="110,64 122,72 110,80" fill="#ffffff" />
          <rect x="32" y="32" width="46" height="10" rx="2" fill="#ea580c" opacity="0.9" />
          {/* Audio Meters & Scopes */}
          <rect x="216" y="24" width="118" height="96" rx="5" fill="#1f0c02" stroke="rgba(255,255,255,0.06)" />
          <path d="M226 72L245 45L265 85L285 55L305 78L324 50" stroke="#f97316" strokeWidth="2" fill="none" />
          <rect x="226" y="100" width="98" height="10" rx="2" fill="#2a1205" />
          {/* Timeline Tracks */}
          <rect x="24" y="128" width="310" height="50" rx="5" fill="#1a0a01" stroke="rgba(255,255,255,0.08)" />
          {/* Video Track 1 */}
          <rect x="32" y="134" width="110" height="12" rx="3" fill="#ea580c" />
          <rect x="146" y="134" width="80" height="12" rx="3" fill="#f97316" opacity="0.8" />
          <rect x="230" y="134" width="94" height="12" rx="3" fill="#ea580c" />
          {/* Audio Wave Tracks */}
          <rect x="32" y="152" width="140" height="10" rx="2" fill="#166534" />
          <rect x="176" y="152" width="148" height="10" rx="2" fill="#15803d" />
          {/* Playhead Red Cursor */}
          <line x1="160" y1="126" x2="160" y2="180" stroke="#ef4444" strokeWidth="2" />
          <polygon points="156,126 164,126 160,132" fill="#ef4444" />
        </svg>
      );

    case "p6":
      // Social Media Narrative Reels (Mobile Frame) Mockup
      return (
        <svg viewBox="0 0 360 200" className="dummy-mockup-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="336" height="176" rx="8" fill="#0d0b26" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          {/* Centered Phone Screen */}
          <rect x="130" y="20" width="100" height="160" rx="12" fill="#000000" stroke="#6366f1" strokeWidth="2" />
          <rect x="162" y="26" width="36" height="4" rx="2" fill="#312e81" />
          {/* Phone Video Content */}
          <circle cx="180" cy="90" r="22" fill="#4f46e5" opacity="0.5" />
          <polygon points="176,84 186,90 176,96" fill="#ccff00" />
          <rect x="140" y="145" width="60" height="6" rx="2" fill="#ffffff" />
          <rect x="140" y="154" width="45" height="5" rx="2" fill="#818cf8" />
          {/* Phone Scrubber */}
          <rect x="140" y="165" width="80" height="2" fill="#475569" />
          <rect x="140" y="165" width="52" height="2" fill="#ccff00" />
          {/* Floating Metric Callouts */}
          <rect x="28" y="55" width="86" height="36" rx="6" fill="#1e1b4b" stroke="rgba(99,102,241,0.4)" />
          <rect x="36" y="65" width="68" height="6" rx="2" fill="#a5b4fc" />
          <rect x="36" y="75" width="45" height="8" rx="2" fill="#ccff00" />

          <rect x="246" y="85" width="86" height="36" rx="6" fill="#1e1b4b" stroke="rgba(99,102,241,0.4)" />
          <rect x="254" y="95" width="60" height="6" rx="2" fill="#a5b4fc" />
          <rect x="254" y="105" width="40" height="8" rx="2" fill="#38bdf8" />
        </svg>
      );

    case "p7":
      // Brand Identity & Guidelines Mockup
      return (
        <svg viewBox="0 0 360 200" className="dummy-mockup-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="336" height="176" rx="8" fill="#130424" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          {/* Grid Construction & Monogram */}
          <circle cx="95" cy="98" r="44" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="95" cy="98" r="28" stroke="#ccff00" strokeWidth="1.5" />
          <circle cx="95" cy="98" r="12" stroke="#38bdf8" strokeWidth="1" />
          <line x1="45" y1="98" x2="145" y2="98" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="95" y1="48" x2="95" y2="148" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          {/* Monogram Brand Letter */}
          <path d="M82 118V78L95 95L108 78V118" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right: Color Swatches & Typography Specimen */}
          <rect x="175" y="32" width="155" height="65" rx="6" fill="#200738" stroke="rgba(255,255,255,0.06)" />
          <circle cx="198" cy="54" r="10" fill="#ccff00" />
          <circle cx="226" cy="54" r="10" fill="#7c3aed" />
          <circle cx="254" cy="54" r="10" fill="#38bdf8" />
          <circle cx="282" cy="54" r="10" fill="#ffffff" />
          <circle cx="310" cy="54" r="10" fill="#090514" stroke="#475569" />
          <rect x="194" y="74" width="118" height="10" rx="2" fill="#a855f7" opacity="0.7" />

          <rect x="175" y="106" width="155" height="66" rx="6" fill="#200738" stroke="rgba(255,255,255,0.06)" />
          <rect x="190" y="120" width="70" height="14" rx="3" fill="#ffffff" />
          <rect x="190" y="142" width="120" height="8" rx="2" fill="#a1a1aa" />
          <rect x="190" y="154" width="85" height="6" rx="2" fill="#64748b" />
        </svg>
      );

    case "p8":
      // High-Converting UI/UX Concept Mockup
      return (
        <svg viewBox="0 0 360 200" className="dummy-mockup-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="336" height="176" rx="8" fill="#031f1c" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          {/* UI Screen 1: Mobile Wireframe */}
          <rect x="28" y="30" width="86" height="140" rx="8" fill="#06322e" stroke="rgba(45,212,191,0.3)" />
          <rect x="38" y="42" width="45" height="8" rx="2" fill="#ffffff" />
          <rect x="38" y="56" width="66" height="26" rx="4" fill="#0c4a44" />
          <rect x="38" y="88" width="66" height="10" rx="2" fill="#0c4a44" />
          <rect x="38" y="104" width="66" height="10" rx="2" fill="#0c4a44" />
          <rect x="38" y="132" width="66" height="18" rx="4" fill="#ccff00" />
          {/* Flow Connection Arrow */}
          <path d="M120 100H155M155 100L148 94M155 100L148 106" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="3 3" />
          {/* UI Screen 2: Desktop Modal Checkout */}
          <rect x="165" y="30" width="168" height="140" rx="8" fill="#06322e" stroke="rgba(45,212,191,0.3)" />
          <rect x="180" y="44" width="85" height="10" rx="2" fill="#ffffff" />
          <rect x="180" y="60" width="138" height="8" rx="2" fill="#5eead4" opacity="0.6" />
          {/* Form fields */}
          <rect x="180" y="78" width="138" height="16" rx="3" fill="#03211e" stroke="rgba(255,255,255,0.1)" />
          <rect x="180" y="102" width="138" height="16" rx="3" fill="#03211e" stroke="rgba(255,255,255,0.1)" />
          <rect x="180" y="128" width="80" height="20" rx="4" fill="#ccff00" />
          <rect x="270" y="128" width="48" height="20" rx="4" fill="#0c4a44" />
        </svg>
      );

    default:
      return null;
  }
};

type CategoryFilter = "all" | "websites" | "applications" | "video" | "design";

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((item) => item.category === activeFilter);

  // Duplicate filtered projects to ensure a continuous infinite seamless loop from left to right
  const loopMultiplier = Math.max(2, Math.ceil(10 / filteredProjects.length));
  const slidingList: ProjectItem[] = [];
  for (let i = 0; i < loopMultiplier; i++) {
    slidingList.push(...filteredProjects);
  }

  return (
    <section className="portfolio-section projects-slider-section" id="projects">
      <div className="section-inner section-wide">
        {/* Middle-aligned Title (No 04 / Showcase, No Subtitle) */}
        <div className="projects-header-center">
          <h2 className="section-title projects-title-centered">
            FEATURED <span className="text-accent">PROJECTS</span>
          </h2>
        </div>

        {/* Category Filters (Clean labels without Roman numerals) */}
        <div className="projects-filter-bar projects-filter-centered">
          <button
            className={`filter-tab-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Works ({projectsData.length})
          </button>
          <button
            className={`filter-tab-btn ${activeFilter === "websites" ? "active" : ""}`}
            onClick={() => setActiveFilter("websites")}
          >
            Websites
          </button>
          <button
            className={`filter-tab-btn ${activeFilter === "applications" ? "active" : ""}`}
            onClick={() => setActiveFilter("applications")}
          >
            Applications
          </button>
          <button
            className={`filter-tab-btn ${activeFilter === "video" ? "active" : ""}`}
            onClick={() => setActiveFilter("video")}
          >
            Video Editing
          </button>
          <button
            className={`filter-tab-btn ${activeFilter === "design" ? "active" : ""}`}
            onClick={() => setActiveFilter("design")}
          >
            Graphic Design
          </button>
        </div>
      </div>

      {/* Automatic Continuous Left-to-Right Slider Track */}
      <div className="projects-slider-wrapper">
        <div className="slider-fade-edge fade-left" />
        <div className="slider-fade-edge fade-right" />

        <div className="projects-slider-track" key={activeFilter}>
          {slidingList.map((project, idx) => (
            <div
              className="project-item-card slider-card clickable-card"
              key={`${project.id}-${idx}`}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              title={`Click to view details for ${project.title}`}
            >
              {/* Dummy Realistic Mockup Thumbnail */}
              <div
                className="project-thumbnail"
                style={{ background: project.gradient }}
              >
                <div className="project-category-badge">
                  {project.categoryLabel}
                </div>
                <div className="card-click-pill">
                  <span>View Details ↗</span>
                </div>
                <div className="dummy-mockup-container">
                  {renderProjectThumbnailMockup(project.id)}
                </div>
              </div>

              {/* Card Body: Only Title and Tech Tags */}
              <div className="project-info-body">
                <h3 className="project-title">{project.title}</h3>

                <div className="project-tech-tags">
                  {project.tags.map((tag, tagIdx) => (
                    <span className="tech-tag" key={tagIdx}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal ("oi project e click korle bistarito ashbe") */}
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="project-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project modal"
            >
              ✕
            </button>

            {/* Modal Thumbnail Banner */}
            <div
              className="modal-thumbnail-banner"
              style={{ background: selectedProject.gradient }}
            >
              <div className="modal-category-badge">
                {selectedProject.categoryLabel}
              </div>
              <div className="modal-mockup-wrap">
                {renderProjectThumbnailMockup(selectedProject.id)}
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="modal-content-body">
              <div className="modal-meta-row">
                <span className="modal-client-tag">
                  ✦ Client / Industry: <strong>{selectedProject.clientType}</strong>
                </span>
                <span className="modal-status-badge">Completed & Verified</span>
              </div>

              <h2 className="modal-project-title">{selectedProject.title}</h2>
              <p className="modal-project-desc">{selectedProject.fullDetails}</p>

              <div className="modal-section-heading">KEY HIGHLIGHTS & ARCHITECTURE</div>
              <ul className="modal-highlights-list">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="modal-highlight-item">
                    <span className="highlight-bullet">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="modal-section-heading">TECHNOLOGIES & STACK</div>
              <div className="modal-tech-tags">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="tech-tag modal-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="modal-footer-actions">
                <a
                  href="#contact"
                  className="modal-primary-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  <span>Discuss Similar Project</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <button
                  type="button"
                  className="modal-secondary-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProjects;
