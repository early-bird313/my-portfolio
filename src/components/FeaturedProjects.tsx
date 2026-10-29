import { useState, useEffect } from "react";
import "./styles/Sections.css";

export interface ProjectItem {
  id: string;
  category: "websites-app" | "automation" | "video" | "design" | string;
  categoryLabel: string;
  title: string;
  description: string;
  fullDetails: string;
  clientType: string;
  highlights: string[];
  tags: string[];
  gradient: string;
  imageUrl?: string;
  galleryImages?: string[];
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "ai-news-monitor",
    category: "automation",
    categoryLabel: "Automation",
    title: "AI News Monitoring & Daily Digest System",
    description: "Autonomous AI intelligence platform powered by Google Gemini AI. Features continuous RSS crawling, strict deduplication, bilingual (Bangla & English) summarization, and scheduled broadcast digests to Telegram & Gmail.",
    fullDetails: "An automated real-time AI news monitoring engine. Continually fetches publications from ArXiv, TechCrunch, OpenAI, and Hacker News, deduplicates similar stories, scores impact (1-10) using Gemini AI, and sends scheduled morning, afternoon, and night digests to Telegram bot subscribers and email newsletters. Features an ultra-clean live dashboard.",
    clientType: "AI Intelligence Agency",
    highlights: [
      "Strict TF-IDF & heuristic duplicate detection across 7+ top-tier sources",
      "Automated bilingual 3-line summaries generated with Google Gemini AI",
      "Automated scheduled broadcast dispatch via Telegram Bot & Gmail SMTP",
      "High-performance FastAPI async backend with SQLite persistence"
    ],
    tags: ["Python", "FastAPI", "Gemini AI", "Telegram Bot", "SQLite", "React"],
    gradient: "linear-gradient(135deg, #091e3a 0%, #032b43 100%)",
    imageUrl: "/images/banner.jpg",
    liveUrl: "http://localhost:8005",
    githubUrl: "https://github.com/early-bird313"
  },
  {
    id: "whatsapp-ai-agent",
    category: "automation",
    categoryLabel: "Automation",
    title: "Autonomous WhatsApp AI Agent",
    description: "24/7 intelligent conversational agent connected directly to WhatsApp via the Baileys WebSocket protocol. Handles contextual queries, dynamic intent recognition, and multi-turn conversations.",
    fullDetails: "An autonomous multi-turn customer communication bot connected to WhatsApp. Integrates persistent conversation history, context-aware prompt memory, automated customer lead intake, and fast WebSocket response pipelines.",
    clientType: "Enterprise Automation Client",
    highlights: [
      "Direct Baileys WebSocket connection with auto-reconnect QR pairing",
      "Multi-turn context-aware memory retention across chat sessions",
      "Automated business FAQ and lead qualification logic",
      "Real-time operational logging and user session management"
    ],
    tags: ["Node.js", "Baileys API", "TypeScript", "LLMs", "WebSockets"],
    gradient: "linear-gradient(135deg, #042f2e 0%, #064e3b 100%)",
    imageUrl: "/images/banner.jpg",
    githubUrl: "https://github.com/early-bird313"
  },
  {
    id: "madrasha-management-software",
    category: "websites-app",
    categoryLabel: "Websites & App",
    title: "Madrasha & School Management Platform",
    description: "Comprehensive institutional administration system covering student enrollment, dynamic fee calculation, automated receipts, teacher attendance, and exam grading.",
    fullDetails: "A cloud-enabled educational administration platform designed to replace manual paperwork. Streamlines admissions tracking, fee calculations with auto-generated printable invoices, academic attendance registers, and gradebook management with role-based administrative portals.",
    clientType: "Educational Institution",
    highlights: [
      "Role-based access control for Admins, Teachers, and Accounts staff",
      "Automated student fee invoicing with printable PDF receipt generators",
      "Real-time student and teacher attendance tracking dashboard",
      "Comprehensive examination grading and merit report generation"
    ],
    tags: ["Next.js", "React", "Supabase", "PostgreSQL", "Tailwind CSS"],
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    imageUrl: "/images/banner.jpg",
    githubUrl: "https://github.com/early-bird313"
  },
  {
    id: "clothing-ecommerce-store",
    category: "websites-app",
    categoryLabel: "Websites & App",
    title: "Modern Lifestyle & Apparel E-Commerce",
    description: "High-performance digital fashion storefront with instantaneous product facet filtering, persistent drawer cart state, and responsive checkout flows.",
    fullDetails: "A fast modern fashion and apparel storefront built for effortless mobile and desktop conversion. Features multi-attribute filtering, instant optimistic cart drawer updates, and fluid micro-animations.",
    clientType: "Lifestyle Fashion Brand",
    highlights: [
      "Instant faceted search and category filtering with zero layout shift",
      "Optimistic UI cart additions with drawer state persistence",
      "Mobile-first responsive design tailored for one-thumb browsing",
      "Ultra-fast sub-second load times with modern asset bundling"
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Cart Engine"],
    gradient: "linear-gradient(135deg, #170725 0%, #311042 100%)",
    imageUrl: "/images/banner.jpg",
    githubUrl: "https://github.com/early-bird313"
  },
  {
    id: "3d-interactive-showcase",
    category: "websites-app",
    categoryLabel: "Websites & App",
    title: "Interactive 3D WebGL Web Experience",
    description: "Immersive 60fps 3D product showcase utilizing WebGL, Three.js shaders, and interactive camera parallax. Features real-time physics lighting and orbital controls.",
    fullDetails: "A high-fidelity interactive 3D WebGL application engineered for next-generation digital product reveals. Integrates custom GLSL shaders, camera parallax, physics-based rotation, and silky-smooth frame rates.",
    clientType: "Creative Tech Showcase",
    highlights: [
      "60fps WebGL rendering pipeline with custom Three.js orbital physics",
      "Interactive grab-and-spin product visualizer with realistic lighting",
      "Responsive canvas scaling adapted to retina and mobile screens",
      "Fluid scroll-driven camera waypoint transformations"
    ],
    tags: ["Three.js", "WebGL", "TypeScript", "Canvas 3D", "Tailwind"],
    gradient: "linear-gradient(135deg, #0b1528 0%, #0d2847 100%)",
    imageUrl: "/images/banner.jpg",
    githubUrl: "https://github.com/early-bird313"
  }
];

export const renderProjectThumbnailMockup = (
  _projectId: string,
  imageUrl?: string,
  isModal: boolean = false,
  isVideo: boolean = false
) => {
  if (imageUrl) {
    if (isModal) {
      return (
        <div className="modal-mockup-inner">
          <img
            src={imageUrl}
            alt="Project Preview"
            className="modal-mockup-img"
          />
        </div>
      );
    }
    return (
      <div className="card-mockup-inner">
        <img
          src={imageUrl}
          alt="Project Preview"
          className="card-mockup-img"
        />
        {isVideo && (
          <div className="card-center-play-badge">
            <div className="card-play-disc">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span style={{ fontSize: "32px", opacity: 0.8 }}>⚡</span>
    </div>
  );
};

type CategoryFilter = "all" | "websites-app" | "automation" | "video" | "design";

interface FeaturedProjectsProps {
  refreshTrigger?: number;
}

const normalizeCategory = (item: ProjectItem): ProjectItem => {
  let cat = item.category;
  let label = item.categoryLabel;
  if (cat === "websites" || cat === "websites-app") {
    cat = "websites-app";
    label = "Websites & App";
  } else if (cat === "applications") {
    const isAuto =
      (item.title || "").toLowerCase().includes("ai") ||
      (item.title || "").toLowerCase().includes("agent") ||
      (item.title || "").toLowerCase().includes("bot") ||
      (item.title || "").toLowerCase().includes("monitor");
    cat = isAuto ? "automation" : "websites-app";
    label = isAuto ? "Automation" : "Websites & App";
  } else if (cat === "automation") {
    label = "Automation";
  } else if (cat === "video") {
    label = "Video Editing";
  } else if (cat === "design") {
    label = "Graphic Design";
  }
  return { ...item, category: cat, categoryLabel: label };
};

export const getEmbedVideoInfo = (
  rawUrl?: string
): {
  type: "youtube" | "vimeo" | "drive" | "direct";
  embedUrl: string;
  isVertical?: boolean;
} | null => {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  const isVertical =
    trimmed.includes("/shorts/") ||
    trimmed.includes("tiktok.com") ||
    trimmed.includes("/reel/");

  // YouTube (standard, youtu.be, shorts, embed)
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`,
      isVertical,
    };
  }

  // Vimeo
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0&portrait=0`,
      isVertical,
    };
  }

  // Google Drive preview
  const driveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return {
      type: "drive",
      embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
      isVertical,
    };
  }

  // Direct MP4 / WebM / OGG
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(trimmed)) {
    return {
      type: "direct",
      embedUrl: trimmed,
      isVertical,
    };
  }

  // Fallback: if already an embeddable link
  if (trimmed.includes("youtube.com/embed/") || trimmed.includes("player.vimeo.com/video/")) {
    return {
      type: "direct",
      embedUrl: trimmed,
      isVertical,
    };
  }

  return null;
};

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ refreshTrigger }) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [items, setItems] = useState<ProjectItem[]>(projectsData);

  useEffect(() => {
    setIsPlayingVideo(false);
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Fallback");
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data.map(normalizeCategory));
        }
      })
      .catch(() => {});
  }, [refreshTrigger]);

  const filteredProjects =
    activeFilter === "all"
      ? items
      : items.filter((item) => {
          if (activeFilter === "websites-app") {
            return (
              item.category === "websites-app" ||
              item.category === "websites" ||
              (item.category === "applications" &&
                !item.title.toLowerCase().includes("ai") &&
                !item.title.toLowerCase().includes("agent") &&
                !item.title.toLowerCase().includes("bot") &&
                !item.title.toLowerCase().includes("monitor"))
            );
          }
          if (activeFilter === "automation") {
            return (
              item.category === "automation" ||
              (item.category === "applications" &&
                (item.title.toLowerCase().includes("ai") ||
                  item.title.toLowerCase().includes("agent") ||
                  item.title.toLowerCase().includes("bot") ||
                  item.title.toLowerCase().includes("monitor")))
            );
          }
          return item.category === activeFilter;
        });

  // Duplicate filtered projects to ensure a continuous infinite seamless loop from left to right
  const loopMultiplier = Math.max(2, Math.ceil(10 / Math.max(1, filteredProjects.length)));
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
            All Works ({items.length})
          </button>
          <button
            className={`filter-tab-btn ${activeFilter === "websites-app" ? "active" : ""}`}
            onClick={() => setActiveFilter("websites-app")}
          >
            Websites & App
          </button>
          <button
            className={`filter-tab-btn ${activeFilter === "automation" ? "active" : ""}`}
            onClick={() => setActiveFilter("automation")}
          >
            Automation
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

        {filteredProjects.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "rgba(255, 255, 255, 0.45)",
              fontFamily: "var(--font-mono, monospace)",
              width: "100%",
              letterSpacing: "0.05em",
            }}
          >
            <p style={{ fontSize: "14px", margin: 0 }}>
              No projects yet.
            </p>
          </div>
        ) : (
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
                  {project.imageUrl && (
                    <div
                      className="card-thumbnail-bg-blur"
                      style={{ backgroundImage: `url(${project.imageUrl})` }}
                    />
                  )}
                  <div className="project-category-badge">
                    {project.categoryLabel}
                  </div>
                  <div className="card-click-pill">
                    <span>View Details ↗</span>
                  </div>
                  {project.videoUrl && (
                    <div className="card-video-pill">
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Video Reel</span>
                    </div>
                  )}
                  <div className="dummy-mockup-container">
                    {renderProjectThumbnailMockup(
                      project.id,
                      project.imageUrl,
                      false,
                      Boolean(project.videoUrl || project.category === "video")
                    )}
                  </div>
                </div>

                {/* Card Body: Only Title and Tech Tags */}
                <div className="project-info-body">
                  <h3 className="project-title">{project.title}</h3>

                  {project.tags && project.tags.length > 0 && (
                    <div className="project-tech-tags">
                      {project.tags.map((tag, tagIdx) => (
                        <span className="tech-tag" key={tagIdx}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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

            {/* Modal Thumbnail / Dynamic Video Banner */}
            {(() => {
              const embedInfo = selectedProject.videoUrl
                ? getEmbedVideoInfo(selectedProject.videoUrl)
                : null;

              return (
                <div
                  className={`modal-thumbnail-banner ${
                    isPlayingVideo && embedInfo ? "is-playing-video" : ""
                  } ${embedInfo?.isVertical ? "is-vertical-video" : ""}`}
                  style={{ background: selectedProject.gradient }}
                >
                  {selectedProject.imageUrl && (!isPlayingVideo || !embedInfo) && (
                    <div
                      className="modal-banner-bg-blur"
                      style={{
                        backgroundImage: `url(${selectedProject.imageUrl})`,
                      }}
                    />
                  )}
                  <div className="modal-category-badge">
                    {selectedProject.categoryLabel}
                  </div>

                  {isPlayingVideo && embedInfo ? (
                    <div
                      className={`modal-video-frame-container ${
                        embedInfo.isVertical ? "is-vertical-video" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="modal-video-close-btn"
                        onClick={() => setIsPlayingVideo(false)}
                        title="Close Video and return to thumbnail"
                      >
                        ✕ Close Video
                      </button>
                      {embedInfo.type === "direct" &&
                      /\.(mp4|webm|ogg)/i.test(embedInfo.embedUrl) ? (
                        <video
                          src={embedInfo.embedUrl}
                          controls
                          autoPlay
                          playsInline
                          className="modal-video-player-element"
                        />
                      ) : (
                        <iframe
                          src={embedInfo.embedUrl}
                          title={selectedProject.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="modal-video-iframe"
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      className={`modal-mockup-wrap ${
                        selectedProject.videoUrl ? "clickable-video-mockup" : ""
                      }`}
                      onClick={() => {
                        if (selectedProject.videoUrl) {
                          setIsPlayingVideo(true);
                        }
                      }}
                      role={selectedProject.videoUrl ? "button" : undefined}
                      tabIndex={selectedProject.videoUrl ? 0 : undefined}
                      title={
                        selectedProject.videoUrl
                          ? "Click thumbnail to play video"
                          : undefined
                      }
                    >
                      {renderProjectThumbnailMockup(
                        selectedProject.id,
                        selectedProject.imageUrl,
                        true
                      )}

                      {selectedProject.videoUrl && (
                        <div className="modal-video-play-overlay">
                          <div className="modal-video-play-disc">
                            <svg
                              viewBox="0 0 24 24"
                              width="32"
                              height="32"
                              fill="currentColor"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <span className="modal-video-play-text">
                            Click Thumbnail to Play Video
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Modal Content Body */}
            {/* Modal Content Body */}
            <div className="modal-content-body">
              <div className="modal-meta-row">
                <span className="modal-client-tag">
                  ✦ Client / Industry: <strong>{selectedProject.clientType || "Direct Showcase"}</strong>
                </span>
                {selectedProject.category === "automation" && (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#ccff00",
                      fontFamily: "var(--font-mono, monospace)",
                      fontWeight: 700,
                      letterSpacing: "1px",
                    }}
                  >
                    ⚡ AI & WORKFLOW AUTOMATION
                  </span>
                )}
              </div>

              {selectedProject.category === "automation" ? (
                <>
                  {/* প্রজেক্টের নাম */}
                  <h2 className="modal-project-title" style={{ marginBottom: "12px" }}>
                    {selectedProject.title}
                  </h2>

                  {/* সংক্ষিপ্ত বিবরণ (যদি থাকে) */}
                  {selectedProject.description && selectedProject.description !== selectedProject.fullDetails && (
                    <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", marginBottom: "22px" }}>
                      {selectedProject.description}
                    </p>
                  )}

                  {/* The Problem & Solution */}
                  <div className="modal-section-heading" style={{ color: "#ccff00", display: "flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>
                    <span>🎯 THE PROBLEM & SOLUTION</span>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(204, 255, 0, 0.04)",
                      border: "1px solid rgba(204, 255, 0, 0.2)",
                      borderLeft: "4px solid #ccff00",
                      borderRadius: "8px",
                      padding: "16px 20px",
                      marginBottom: "24px",
                      color: "#e2e8f0",
                      fontSize: "14px",
                      lineHeight: "1.75",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {selectedProject.fullDetails || selectedProject.description}
                  </div>

                  {/* Key Highlights */}
                  {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                    <>
                      <div className="modal-section-heading" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span>⚡ KEY HIGHLIGHTS</span>
                      </div>
                      <ul className="modal-highlights-list" style={{ marginBottom: "24px" }}>
                        {selectedProject.highlights.map((h, i) => (
                          <li key={i} className="modal-highlight-item">
                            <span className="highlight-bullet">⚡</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* টেক স্ট্যাক */}
                  {selectedProject.tags && selectedProject.tags.length > 0 && (
                    <>
                      <div className="modal-section-heading" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span>🛠️ TECH STACK & TOOLS</span>
                      </div>
                      <div className="modal-tech-tags" style={{ marginBottom: "28px" }}>
                        {selectedProject.tags.map((tag, i) => (
                          <span key={i} className="tech-tag modal-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <h2 className="modal-project-title">{selectedProject.title}</h2>
                  <p className="modal-project-desc">{selectedProject.fullDetails}</p>

                  {/* Multiple Website Photos / Screenshots (Top to Bottom Showcase) */}
                  {selectedProject.galleryImages && selectedProject.galleryImages.length > 0 && (
                    <div style={{ marginTop: "24px", marginBottom: "28px" }}>
                      <div
                        className="modal-section-heading"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          color: "#ccff00",
                        }}
                      >
                        <span>WEBSITE PREVIEW & SCREENSHOTS</span>
                        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                          {selectedProject.galleryImages.length} {selectedProject.galleryImages.length === 1 ? "Image" : "Images"}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "18px",
                          marginTop: "12px",
                        }}
                      >
                        {selectedProject.galleryImages.map((imgSrc, imgIdx) => (
                          <div
                            key={imgIdx}
                            style={{
                              borderRadius: "12px",
                              overflow: "hidden",
                              border: "1px solid rgba(255, 255, 255, 0.12)",
                              backgroundColor: "#07080a",
                              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                padding: "6px 12px",
                                backgroundColor: "rgba(10, 10, 15, 0.85)",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                                fontSize: "11px",
                                color: "#888899",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ff5f56", display: "inline-block" }} />
                              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ffbd2e", display: "inline-block" }} />
                              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#27c93f", display: "inline-block" }} />
                              <span style={{ marginLeft: "8px", fontFamily: "var(--font-mono, monospace)" }}>Screenshot #{imgIdx + 1}</span>
                            </div>
                            <img
                              src={imgSrc}
                              alt={`${selectedProject.title} view ${imgIdx + 1}`}
                              style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                objectFit: "cover",
                              }}
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
                </>
              )}

              <div className="modal-footer-actions" style={{ flexWrap: "wrap", gap: "10px" }}>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-primary-btn"
                    style={{ background: "#ccff00", color: "#000000" }}
                  >
                    <span>Visit Live Demo</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                )}

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-secondary-btn"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                  >
                    <span>Source Code</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                )}

                {selectedProject.videoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlayingVideo(true);
                      const dialog = document.querySelector(".project-modal-dialog");
                      if (dialog) dialog.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="modal-secondary-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#000",
                      backgroundColor: "var(--accent, #ccff00)",
                      borderColor: "var(--accent, #ccff00)",
                      fontWeight: 700,
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>{isPlayingVideo ? "Playing Video 🎬" : "Play Video Reel ▶"}</span>
                  </button>
                )}

                <a
                  href="#contact"
                  className="modal-secondary-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  <span>Discuss Similar Project</span>
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
