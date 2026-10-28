import React, { useState, useEffect } from "react";
import { config } from "../config";
import { ProjectItem } from "./FeaturedProjects";

interface AdminStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectsUpdated: () => void;
}

export const AdminStudioModal: React.FC<AdminStudioModalProps> = ({
  isOpen,
  onClose,
  onProjectsUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<"add" | "manage">("add");
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterCat, setFilterCat] = useState<string>("all");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "websites" as "websites" | "applications" | "video" | "design",
    clientType: "",
    description: "",
    fullDetails: "",
    highlights: "",
    tags: "",
    imageUrl: "",
    videoUrl: "",
    liveUrl: "",
    githubUrl: "",
  });

  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadProjects();
    }
  }, [isOpen]);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setFormError("Title and description are required.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");
    setFormSuccess("");

    const payload = {
      title: formData.title,
      category: formData.category,
      clientType: formData.clientType || "Direct Client",
      description: formData.description,
      fullDetails: formData.fullDetails || formData.description,
      highlights: formData.highlights.split("\n").map((h) => h.trim()).filter(Boolean),
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      imageUrl: formData.imageUrl || "/images/banner.jpg",
      videoUrl: formData.videoUrl || "",
      liveUrl: formData.liveUrl || "",
      githubUrl: formData.githubUrl || "",
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": "pabel2026",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormSuccess("Project published successfully into live showcase!");
        setFormData({
          title: "",
          category: "websites",
          clientType: "",
          description: "",
          fullDetails: "",
          highlights: "",
          tags: "",
          imageUrl: "",
          videoUrl: "",
          liveUrl: "",
          githubUrl: "",
        });
        loadProjects();
        onProjectsUpdated();
        setTimeout(() => {
          setFormSuccess("");
          setActiveTab("manage");
        }, 1200);
      } else {
        setFormError(data.error || "Failed to publish project.");
      }
    } catch (err: any) {
      setFormError("Server transmission error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove "${title}" from the portfolio?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-key": "pabel2026" },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        loadProjects();
        onProjectsUpdated();
      } else {
        alert(data.error || "Failed to delete.");
      }
    } catch (err) {
      alert("Failed to connect to server.");
    }
  };

  if (!isOpen) return null;

  const filtered =
    filterCat === "all" ? projects : projects.filter((p) => p.category === filterCat);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        backdropFilter: "blur(12px)",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "840px",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "#0d0e14",
          border: `1px solid ${config.colors.accent}40`,
          borderRadius: "18px",
          padding: "28px",
          boxShadow: `0 0 60px rgba(204, 255, 0, 0.12)`,
          color: "#ffffff",
          fontFamily: "'Space Grotesk', sans-serif",
          boxSizing: "border-box",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "22px" }}>⚡</span>
            <div>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#ffffff" }}>
                Portfolio Showcase Studio
              </h2>
              <span style={{ fontSize: "11px", color: config.colors.accent, letterSpacing: "1px", textTransform: "uppercase" }}>
                Cloudflare Edge CMS Active
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: "6px 12px",
              backgroundColor: "#161822",
              border: "1px solid #2a2d3d",
              borderRadius: "8px",
              color: "#aaa",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px", borderBottom: "1px solid #202230", paddingBottom: "14px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("add")}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              backgroundColor: activeTab === "add" ? config.colors.accent : "transparent",
              color: activeTab === "add" ? "#000000" : "#888899",
              border: `1px solid ${activeTab === "add" ? config.colors.accent : "#202230"}`,
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            [+] Add Project
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("manage")}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              backgroundColor: activeTab === "manage" ? config.colors.accent : "transparent",
              color: activeTab === "manage" ? "#000000" : "#888899",
              border: `1px solid ${activeTab === "manage" ? config.colors.accent : "#202230"}`,
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Manage Works ({projects.length})
          </button>
        </div>

        {/* TAB 1: ADD */}
        {activeTab === "add" && (
          <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {formSuccess && (
              <div style={{ padding: "10px 14px", backgroundColor: "rgba(34, 197, 94, 0.15)", border: "1px solid rgba(34, 197, 94, 0.4)", borderRadius: "8px", color: "#4ade80", fontSize: "13px" }}>
                ✓ {formSuccess}
              </div>
            )}
            {formError && (
              <div style={{ padding: "10px 14px", backgroundColor: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.4)", borderRadius: "8px", color: "#f87171", fontSize: "13px" }}>
                ⚠️ {formError}
              </div>
            )}

            {/* Category Selector */}
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "#888899", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "1px" }}>
                Select Category *
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                {[
                  { id: "websites", label: "🌐 Websites" },
                  { id: "applications", label: "🤖 Applications" },
                  { id: "video", label: "🎬 Video Editing" },
                  { id: "design", label: "🎨 Graphic Design" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: c.id as any })}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      backgroundColor: formData.category === c.id ? "rgba(204, 255, 0, 0.15)" : "#07080a",
                      border: `1px solid ${formData.category === c.id ? config.colors.accent : "#222533"}`,
                      color: formData.category === c.id ? config.colors.accent : "#aaa",
                      fontSize: "12px",
                      fontWeight: formData.category === c.id ? 700 : 500,
                      cursor: "pointer",
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Client Type */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#888899", textTransform: "uppercase", marginBottom: "6px" }}>
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI News Monitoring Bot or Modern Brand Identity"
                  required
                  style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#888899", textTransform: "uppercase", marginBottom: "6px" }}>
                  Client / Industry Type
                </label>
                <input
                  type="text"
                  value={formData.clientType}
                  onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                  placeholder="e.g. AI Startup, Fintech, Brand"
                  style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "#888899", textTransform: "uppercase", marginBottom: "6px" }}>
                Short Card Summary *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                placeholder="2-line executive summary displayed on the card..."
                required
                style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box", resize: "vertical" }}
              />
            </div>

            {/* Full Details & Highlights */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#888899", textTransform: "uppercase", marginBottom: "6px" }}>
                  Full Case Study / Architecture
                </label>
                <textarea
                  value={formData.fullDetails}
                  onChange={(e) => setFormData({ ...formData, fullDetails: e.target.value })}
                  rows={4}
                  placeholder="Explain how it was built, challenges solved, results achieved..."
                  style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box", resize: "vertical" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#888899", textTransform: "uppercase", marginBottom: "6px" }}>
                  Key Highlights (One per line)
                </label>
                <textarea
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  rows={4}
                  placeholder="Sub-second speed&#10;100% automated deduplication&#10;Custom motion graphics"
                  style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box", resize: "vertical" }}
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "#888899", textTransform: "uppercase", marginBottom: "6px" }}>
                Tags & Tech Stack (Comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Python, FastAPI, Gemini AI, Premiere Pro, Photoshop, Next.js"
                style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
              />
            </div>

            {/* Links: Live, GitHub, Video */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#888899", textTransform: "uppercase", marginBottom: "6px" }}>
                  Live Demo Link
                </label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://..."
                  style={{ width: "100%", padding: "8px 12px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "12px", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#888899", textTransform: "uppercase", marginBottom: "6px" }}>
                  GitHub Repo Link
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  style={{ width: "100%", padding: "8px 12px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "12px", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#888899", textTransform: "uppercase", marginBottom: "6px" }}>
                  Video Link (YouTube / Drive)
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                  style={{ width: "100%", padding: "8px 12px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "12px", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Image / Thumbnail URL */}
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "#888899", textTransform: "uppercase", marginBottom: "6px" }}>
                Image / Thumbnail URL
              </label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="/images/banner.jpg or https://images.unsplash.com/..."
                style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
              />
            </div>

            {/* Submit */}
            <div style={{ marginTop: "10px" }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: config.colors.accent,
                  color: "#000000",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  boxShadow: `0 0 20px rgba(204, 255, 0, 0.3)`,
                }}
              >
                {isSubmitting ? "Publishing to Cloudflare..." : "Publish to Portfolio Showcase"}
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: MANAGE */}
        {activeTab === "manage" && (
          <div>
            {/* Filter buttons */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
              {[
                { id: "all", label: `All (${projects.length})` },
                { id: "websites", label: "Websites" },
                { id: "applications", label: "Applications" },
                { id: "video", label: "Video" },
                { id: "design", label: "Design" },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setFilterCat(b.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    backgroundColor: filterCat === b.id ? "rgba(204, 255, 0, 0.15)" : "#07080a",
                    border: `1px solid ${filterCat === b.id ? config.colors.accent : "#222533"}`,
                    color: filterCat === b.id ? config.colors.accent : "#888899",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div style={{ padding: "40px", textAlign: "center", color: "#666", fontSize: "12px" }}>
                Loading projects...
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center", color: "#666", fontSize: "12px" }}>
                No projects in this category.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      backgroundColor: "#08090d",
                      border: "1px solid #1f2230",
                      borderRadius: "10px",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "10px", color: config.colors.accent, textTransform: "uppercase", letterSpacing: "1px" }}>
                          {p.category}
                        </span>
                        <span style={{ fontSize: "11px", color: "#555" }}>•</span>
                        <span style={{ fontSize: "12px", color: "#888" }}>{p.clientType || "Client"}</span>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>
                        {p.title}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: config.colors.accent, fontSize: "12px", textDecoration: "none" }}
                          title="Live link"
                        >
                          🔗
                        </a>
                      )}
                      {p.videoUrl && (
                        <a
                          href={p.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#fbbf24", fontSize: "12px", textDecoration: "none" }}
                          title="Video link"
                        >
                          🎬
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.title)}
                        style={{
                          padding: "6px 10px",
                          backgroundColor: "rgba(239, 68, 68, 0.15)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          color: "#f87171",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "11px",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
