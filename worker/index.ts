export interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
  DB?: any; // Cloudflare D1 Database binding
}

export interface ProjectItem {
  id: string;
  category: 'websites-app' | 'automation' | 'video' | 'design' | string;
  categoryLabel: string;
  title: string;
  description: string;
  fullDetails?: string;
  clientType?: string;
  highlights: string[];
  tags: string[];
  gradient?: string;
  imageUrl?: string;
  galleryImages?: string[];
  videoUrl?: string;
  videoAspectRatio?: 'vertical' | 'horizontal';
  liveUrl?: string;
  githubUrl?: string;
  createdAt?: string;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
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

// In-memory fallback
let memoryProjects: ProjectItem[] = [...DEFAULT_PROJECTS];
let isTableInitialized = false;

async function ensureTable(db: any) {
  if (!db || isTableInitialized) return;
  try {
    await db.prepare(`
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
        gallery_images TEXT,
        video_url TEXT,
        live_url TEXT,
        github_url TEXT,
        created_at TEXT
      )
    `).run();

    try {
      await db.prepare("ALTER TABLE projects ADD COLUMN gallery_images TEXT").run();
    } catch (_) {}

    try {
      await db.prepare("ALTER TABLE projects ADD COLUMN video_aspect_ratio TEXT").run();
    } catch (_) {}

    try {
      await db.prepare("UPDATE projects SET category = 'websites-app', category_label = 'Websites & App' WHERE category = 'websites'").run();
      await db.prepare("UPDATE projects SET category = 'websites-app', category_label = 'Websites & App' WHERE category = 'applications' AND id = 'madrasha-management-software'").run();
      await db.prepare("UPDATE projects SET category = 'automation', category_label = 'Automation' WHERE category = 'applications'").run();
    } catch (_) {}

    // Check if empty, seed default real projects if first time
    const countRes = await db.prepare("SELECT count(*) as count FROM projects").first();
    if (countRes && Number(countRes.count) === 0) {
      for (const p of DEFAULT_PROJECTS) {
        await db.prepare(`
          INSERT INTO projects (id, category, category_label, title, description, full_details, client_type, highlights, tags, gradient, image_url, gallery_images, video_url, live_url, github_url, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
          JSON.stringify(p.galleryImages || []),
          p.videoUrl || '',
          p.liveUrl || '',
          p.githubUrl || '',
          new Date().toISOString()
        ).run();
      }
    }
    isTableInitialized = true;
  } catch (e: any) {
    console.error("D1 ensureTable error:", e);
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
    // 2.5 API: Contact Message Dispatch & Archival
    // ─────────────────────────────────────────────────────────────
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const body: any = await request.json();
        const name = (body.name || '').trim();
        const email = (body.email || '').trim();
        const service = (body.service || 'General Inquiry').trim();
        const message = (body.message || '').trim();

        if (!name || !email || !message) {
          return new Response(JSON.stringify({ error: 'Name, email, and message are required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Archive to Cloudflare D1
        if (env.DB) {
          try {
            await env.DB.prepare(`
              CREATE TABLE IF NOT EXISTS contact_messages (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                service TEXT,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
              )
            `).run();

            const msgId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
            await env.DB.prepare(
              "INSERT INTO contact_messages (id, name, email, service, message, created_at) VALUES (?, ?, ?, ?, ?, ?)"
            ).bind(msgId, name, email, service, message, new Date().toISOString()).run();
          } catch (d1Err) {
            console.error("D1 contact save error:", d1Err);
          }
        }

        // Forward to pabelminhajahmed@gmail.com via FormSubmit.co
        try {
          await fetch("https://formsubmit.co/ajax/pabelminhajahmed@gmail.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              service,
              message,
              _subject: `Portfolio Inquiry from ${name} (${service})`,
              _replyto: email,
            }),
          });
        } catch (emailErr) {
          console.error("Email dispatch error:", emailErr);
        }

        return new Response(JSON.stringify({ success: true, message: 'Message sent successfully' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
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

            const categoryLabels: Record<string, string> = {
              'websites-app': 'Websites & App',
              websites: 'Websites & App',
              applications: 'Websites & App',
              automation: 'Automation',
              video: 'Video Editing',
              design: 'Graphic Design',
            };

            const formatted: ProjectItem[] = (results.results || []).map((row: any) => {
              let cat = row.category;
              let catLabel = row.category_label || categoryLabels[cat] || 'Showcase';
              if (cat === 'websites' || cat === 'websites-app') {
                cat = 'websites-app';
                catLabel = 'Websites & App';
              } else if (cat === 'applications') {
                const isAuto = (row.title || '').toLowerCase().includes('ai') || (row.title || '').toLowerCase().includes('agent') || (row.title || '').toLowerCase().includes('bot') || (row.title || '').toLowerCase().includes('monitor');
                cat = isAuto ? 'automation' : 'websites-app';
                catLabel = isAuto ? 'Automation' : 'Websites & App';
              } else if (cat === 'automation') {
                catLabel = 'Automation';
              } else if (cat === 'video') {
                catLabel = 'Video Editing';
              } else if (cat === 'design') {
                catLabel = 'Graphic Design';
              }

              return {
                id: row.id,
                category: cat,
                categoryLabel: catLabel,
                title: row.title,
                description: row.description,
                fullDetails: row.full_details,
                clientType: row.client_type,
                highlights: JSON.parse(row.highlights || '[]'),
                tags: JSON.parse(row.tags || '[]'),
                gradient: row.gradient,
                imageUrl: row.image_url,
                galleryImages: JSON.parse(row.gallery_images || '[]'),
                videoUrl: row.video_url,
                videoAspectRatio: row.video_aspect_ratio || (cat === 'video' ? 'vertical' : 'horizontal'),
                liveUrl: row.live_url,
                githubUrl: row.github_url,
                createdAt: row.created_at,
              };
            });

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
            category = 'websites-app',
            description,
            fullDetails,
            clientType,
            highlights = [],
            tags = [],
            imageUrl,
            galleryImages = [],
            videoUrl,
            videoAspectRatio,
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
            'websites-app': 'Websites & App',
            websites: 'Websites & App',
            applications: 'Websites & App',
            automation: 'Automation',
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
            galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
            videoUrl: videoUrl || '',
            videoAspectRatio: videoAspectRatio || (category === 'video' ? 'vertical' : 'horizontal'),
            liveUrl: liveUrl || '',
            githubUrl: githubUrl || '',
            createdAt: new Date().toISOString(),
          };

          if (env.DB) {
            try {
              await ensureTable(env.DB);
              await env.DB.prepare(`
                INSERT INTO projects (id, category, category_label, title, description, full_details, client_type, highlights, tags, gradient, image_url, gallery_images, video_url, video_aspect_ratio, live_url, github_url, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                JSON.stringify(newProject.galleryImages),
                newProject.videoUrl,
                newProject.videoAspectRatio,
                newProject.liveUrl,
                newProject.githubUrl,
                newProject.createdAt
              ).run();
            } catch (d1Err: any) {
              console.error("D1 insert error:", d1Err);
            }
          }
          memoryProjects.unshift(newProject);

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

      // PUT update project (Protected)
      if (request.method === 'PUT') {
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
            id,
            title,
            category = 'websites-app',
            description,
            fullDetails,
            clientType,
            highlights = [],
            tags = [],
            imageUrl,
            galleryImages = [],
            videoUrl,
            videoAspectRatio,
            liveUrl,
            githubUrl,
            gradient,
          } = body;

          if (!id || !title || !description) {
            return new Response(
              JSON.stringify({ error: 'ID, title and description are required' }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          const categoryLabels: Record<string, string> = {
            'websites-app': 'Websites & App',
            websites: 'Websites & App',
            applications: 'Websites & App',
            automation: 'Automation',
            video: 'Video Editing',
            design: 'Graphic Design',
          };

          const catLabel = categoryLabels[category] || 'Showcase';
          const cleanHighlights = Array.isArray(highlights) ? highlights : (typeof highlights === 'string' ? highlights.split('\n').filter(Boolean) : []);
          const cleanTags = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []);
          const cleanGallery = Array.isArray(galleryImages) ? galleryImages : [];
          const cleanAspectRatio = videoAspectRatio || (category === 'video' ? 'vertical' : 'horizontal');

          if (env.DB) {
            try {
              await ensureTable(env.DB);
              await env.DB.prepare(`
                UPDATE projects 
                SET category = ?, category_label = ?, title = ?, description = ?, full_details = ?, client_type = ?, highlights = ?, tags = ?, gradient = ?, image_url = ?, gallery_images = ?, video_url = ?, video_aspect_ratio = ?, live_url = ?, github_url = ?
                WHERE id = ?
              `).bind(
                category,
                catLabel,
                title,
                description,
                fullDetails || description,
                clientType || 'Direct Client Showcase',
                JSON.stringify(cleanHighlights),
                JSON.stringify(cleanTags),
                gradient || 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                imageUrl || '/images/banner.jpg',
                JSON.stringify(cleanGallery),
                videoUrl || '',
                cleanAspectRatio,
                liveUrl || '',
                githubUrl || '',
                id
              ).run();
            } catch (d1Err: any) {
              console.error("D1 update error:", d1Err);
            }
          }

          // Update in-memory fallback
          const index = memoryProjects.findIndex((p) => p.id === id);
          const updatedProject: ProjectItem = {
            id,
            category,
            categoryLabel: catLabel,
            title,
            description,
            fullDetails: fullDetails || description,
            clientType: clientType || 'Direct Client Showcase',
            highlights: cleanHighlights,
            tags: cleanTags,
            gradient: gradient || 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            imageUrl: imageUrl || '/images/banner.jpg',
            galleryImages: cleanGallery,
            videoUrl: videoUrl || '',
            liveUrl: liveUrl || '',
            githubUrl: githubUrl || '',
            createdAt: index !== -1 ? memoryProjects[index].createdAt : new Date().toISOString(),
          };

          if (index !== -1) {
            memoryProjects[index] = updatedProject;
          } else {
            memoryProjects.unshift(updatedProject);
          }

          return new Response(JSON.stringify({ success: true, project: updatedProject }), {
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
          try {
            await ensureTable(env.DB);
            await env.DB.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();
          } catch (d1Err: any) {
            console.error("D1 delete error:", d1Err);
          }
        }
        memoryProjects = memoryProjects.filter((p) => p.id !== id);

        return new Response(JSON.stringify({ success: true, message: 'Project removed' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 4. Fallback: Serve Static Assets
    // ─────────────────────────────────────────────────────────────
    try {
      return await env.ASSETS.fetch(request);
    } catch {
      return new Response("Not found", { status: 404 });
    }
  },
};
