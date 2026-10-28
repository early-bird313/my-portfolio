export interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
  DB?: any; // Cloudflare D1 Database binding
}

export interface ProjectItem {
  id: string;
  category: 'websites' | 'applications' | 'video' | 'design';
  categoryLabel: string;
  title: string;
  description: string;
  fullDetails?: string;
  clientType?: string;
  highlights: string[];
  tags: string[];
  gradient?: string;
  imageUrl?: string;
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  createdAt?: string;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "ai-news-monitor",
    category: "applications",
    categoryLabel: "Applications",
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
    category: "applications",
    categoryLabel: "Applications",
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
    category: "applications",
    categoryLabel: "Applications",
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
    category: "websites",
    categoryLabel: "Websites",
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
    category: "websites",
    categoryLabel: "Websites",
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
  },
  {
    id: "cinematic-tech-promo",
    category: "video",
    categoryLabel: "Video Editing",
    title: "Cinematic Product Promo & Motion Design",
    description: "High-retention commercial video edit featuring custom motion graphics, sound design, rhythm-synced visual pacing, and cinematic HDR color grading.",
    fullDetails: "A commercial film crafted for high-tier tech hardware. Features precision beat cuts synced to custom music pacing, 3D kinetic typography, spatial sound design, and Hollywood-grade color grading.",
    clientType: "Hardware Tech Brand",
    highlights: [
      "Precision cut-to-beat synchronization for maximum engagement",
      "Custom After Effects 3D kinetic title animation & HUD overlays",
      "Layered spatial sound design with custom foley and sub-bass impacts",
      "Rec.709 & HDR wide-gamut cinematic color grade master"
    ],
    tags: ["Premiere Pro", "After Effects", "Sound Design", "Motion Graphics", "4K HDR"],
    gradient: "linear-gradient(135deg, #1c0a00 0%, #451a03 100%)",
    imageUrl: "/images/banner.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "social-media-reels-series",
    category: "video",
    categoryLabel: "Video Editing",
    title: "High-Retention Social Media Reels & Shorts",
    description: "Fast-paced, hook-driven vertical video series engineered specifically for viral engagement across modern algorithmic feeds.",
    fullDetails: "A strategic viral video campaign engineered specifically for modern vertical discovery algorithms. Utilizes 3-second hook retention techniques, dynamic motion zooms, auto-timed subtitles, and high-energy sound accents.",
    clientType: "Digital Media Network",
    highlights: [
      "First 3-second retention hooks engineered to eliminate feed swipe-aways",
      "Custom dynamic subtitle animations with highlight keyword accents",
      "Pacing optimized for vertical 9:16 mobile viewing environments",
      "Multi-track audio mastering for crisp voice clarity over music"
    ],
    tags: ["Short-form Video", "Color Grading", "Retention Editing", "Viral Hooks"],
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)",
    imageUrl: "/images/banner.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "brand-identity-system",
    category: "design",
    categoryLabel: "Graphic Design",
    title: "Complete Brand Identity & Guidelines System",
    description: "End-to-end branding ecosystem including mathematical geometric logo mark, color hierarchy, brand typography, and social media presentation kits.",
    fullDetails: "A cohesive brand identity ecosystem constructed from mathematical grid foundations. Encompasses geometric logo construction, high-contrast color palette hierarchies, custom typographic pairing, and marketing collateral templates.",
    clientType: "AI Innovation Startup",
    highlights: [
      "Geometric logo mark constructed on golden ratio circular grids",
      "Comprehensive digital & print brand guideline manual (60+ pages)",
      "Multi-channel social media asset kit with modular Figma components",
      "Accessible color contrast ratios conforming to WCAG AAA standards"
    ],
    tags: ["Figma", "Photoshop", "Brand System", "Typography", "Illustrator"],
    gradient: "linear-gradient(135deg, #170338 0%, #2e1065 100%)",
    imageUrl: "/images/banner.jpg"
  },
  {
    id: "high-converting-uiux",
    category: "design",
    categoryLabel: "Graphic Design",
    title: "High-Converting Web & SaaS UI/UX Concept",
    description: "Clean, human-centered web application interface design focusing on frictionless onboarding, visual hierarchy, and conversion architecture.",
    fullDetails: "A human-centered web application interface designed to eliminate cognitive friction. Features modular design components, clear visual hierarchies, ergonomic touch targets, and frictionless conversion paths.",
    clientType: "SaaS Enterprise Product",
    highlights: [
      "End-to-end Figma prototype with interactive user flow states",
      "Design token system integrated directly into front-end CSS variables",
      "Frictionless onboarding flow driving verified user retention",
      "Fully responsive wireframes across desktop, tablet, and mobile"
    ],
    tags: ["UI/UX Design", "Wireframing", "Prototyping", "Design System"],
    gradient: "linear-gradient(135deg, #021a19 0%, #042f2e 100%)",
    imageUrl: "/images/banner.jpg"
  }
];

// In-memory fallback if D1 is not bound yet
let memoryProjects: ProjectItem[] = [...DEFAULT_PROJECTS];

async function ensureTable(db: any) {
  if (!db) return;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      category_label TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      full_details TEXT,
      client_type TEXT,
      highlights TEXT,
      tags TEXT,
      gradient TEXT,
      image_url TEXT,
      video_url TEXT,
      live_url TEXT,
      github_url TEXT,
      created_at TEXT
    );
  `);

  // Check if empty, seed if so
  const countRes = await db.prepare("SELECT count(*) as count FROM projects").first();
  if (countRes && countRes.count === 0) {
    for (const p of DEFAULT_PROJECTS) {
      await db.prepare(`
        INSERT INTO projects (id, category, category_label, title, description, full_details, client_type, highlights, tags, gradient, image_url, video_url, live_url, github_url, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        p.id,
        p.category,
        p.categoryLabel,
        p.title,
        p.description,
        p.fullDetails || '',
        p.clientType || '',
        JSON.stringify(p.highlights || []),
        JSON.stringify(p.tags || []),
        p.gradient || 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        p.imageUrl || '',
        p.videoUrl || '',
        p.liveUrl || '',
        p.githubUrl || '',
        new Date().toISOString()
      ).run();
    }
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS headers helper
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-key',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // ─────────────────────────────────────────────────────────────
    // 1. API: Health & Status
    // ─────────────────────────────────────────────────────────────
    if (url.pathname === '/api/status') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          d1Enabled: !!env.DB,
          time: new Date().toISOString(),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ─────────────────────────────────────────────────────────────
    // 2. API: Auth Verification
    // ─────────────────────────────────────────────────────────────
    if (url.pathname === '/api/auth' && request.method === 'POST') {
      try {
        const body: any = await request.json();
        const secret = body.password || '';
        if (secret.trim() === 'pabel2026') {
          return new Response(
            JSON.stringify({ success: true, message: 'Clearance Granted' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid Clearance Key' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (e: any) {
        return new Response(
          JSON.stringify({ error: e.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 3. API: Projects (GET, POST, DELETE)
    // ─────────────────────────────────────────────────────────────
    if (url.pathname === '/api/projects') {
      // GET all projects
      if (request.method === 'GET') {
        const category = url.searchParams.get('category');

        if (env.DB) {
          try {
            await ensureTable(env.DB);
            let query = "SELECT * FROM projects ORDER BY rowid DESC";
            let results;
            if (category && category !== 'all') {
              results = await env.DB.prepare("SELECT * FROM projects WHERE category = ? ORDER BY rowid DESC").bind(category).all();
            } else {
              results = await env.DB.prepare(query).all();
            }

            const formatted: ProjectItem[] = (results.results || []).map((row: any) => ({
              id: row.id,
              category: row.category,
              categoryLabel: row.category_label,
              title: row.title,
              description: row.description,
              fullDetails: row.full_details,
              clientType: row.client_type,
              highlights: JSON.parse(row.highlights || '[]'),
              tags: JSON.parse(row.tags || '[]'),
              gradient: row.gradient,
              imageUrl: row.image_url,
              videoUrl: row.video_url,
              liveUrl: row.live_url,
              githubUrl: row.github_url,
              createdAt: row.created_at,
            }));

            return new Response(JSON.stringify(formatted), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          } catch (err: any) {
            console.error('D1 query error:', err);
          }
        }

        // In-memory / Fallback
        let list = memoryProjects;
        if (category && category !== 'all') {
          list = list.filter((p) => p.category === category);
        }
        return new Response(JSON.stringify(list), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // POST create new project (Protected)
      if (request.method === 'POST') {
        const auth = request.headers.get('Authorization') || request.headers.get('x-admin-key');
        if (!auth || !auth.includes('pabel2026')) {
          return new Response(JSON.stringify({ error: 'Unauthorized clearance key' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        try {
          const body: any = await request.json();
          const {
            title,
            category = 'websites',
            description,
            fullDetails,
            clientType,
            highlights = [],
            tags = [],
            imageUrl,
            videoUrl,
            liveUrl,
            githubUrl,
            gradient,
          } = body;

          if (!title || !description) {
            return new Response(
              JSON.stringify({ error: 'Title and description are required' }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          const categoryLabels: Record<string, string> = {
            websites: 'Websites',
            applications: 'Applications',
            video: 'Video Editing',
            design: 'Graphic Design',
          };

          const newProject: ProjectItem = {
            id: `proj-${Date.now()}`,
            category,
            categoryLabel: categoryLabels[category] || 'Showcase',
            title,
            description,
            fullDetails: fullDetails || description,
            clientType: clientType || 'Direct Client Showcase',
            highlights: Array.isArray(highlights) ? highlights : (typeof highlights === 'string' ? highlights.split('\n').filter(Boolean) : []),
            tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []),
            gradient: gradient || 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            imageUrl: imageUrl || '/images/banner.jpg',
            videoUrl: videoUrl || '',
            liveUrl: liveUrl || '',
            githubUrl: githubUrl || '',
            createdAt: new Date().toISOString(),
          };

          if (env.DB) {
            await ensureTable(env.DB);
            await env.DB.prepare(`
              INSERT INTO projects (id, category, category_label, title, description, full_details, client_type, highlights, tags, gradient, image_url, video_url, live_url, github_url, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(
              newProject.id,
              newProject.category,
              newProject.categoryLabel,
              newProject.title,
              newProject.description,
              newProject.fullDetails,
              newProject.clientType,
              JSON.stringify(newProject.highlights),
              JSON.stringify(newProject.tags),
              newProject.gradient,
              newProject.imageUrl,
              newProject.videoUrl,
              newProject.liveUrl,
              newProject.githubUrl,
              newProject.createdAt
            ).run();
          } else {
            memoryProjects.unshift(newProject);
          }

          return new Response(JSON.stringify({ success: true, project: newProject }), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (e: any) {
          return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }

      // DELETE project (Protected)
      if (request.method === 'DELETE') {
        const auth = request.headers.get('Authorization') || request.headers.get('x-admin-key');
        if (!auth || !auth.includes('pabel2026')) {
          return new Response(JSON.stringify({ error: 'Unauthorized clearance key' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const id = url.searchParams.get('id');
        if (!id) {
          return new Response(JSON.stringify({ error: 'Project ID required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        if (env.DB) {
          await ensureTable(env.DB);
          await env.DB.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();
        } else {
          memoryProjects = memoryProjects.filter((p) => p.id !== id);
        }

        return new Response(JSON.stringify({ success: true, message: 'Project removed' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 4. Fallback: Serve Static Assets
    // ─────────────────────────────────────────────────────────────
    return env.ASSETS.fetch(request);
  },
};
