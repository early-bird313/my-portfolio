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
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "websites-app" as "websites-app" | "automation" | "video" | "design" | string,
    clientType: "",
    description: "",
    fullDetails: "",
    highlights: "",
    tags: "",
    imageUrl: "",
    galleryImages: [] as string[],
    videoUrl: "",
    liveUrl: "",
    githubUrl: "",
  });

  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const [galleryInputMode, setGalleryInputMode] = useState<"upload" | "url">("upload");
  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const compressImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        return reject(new Error("Please select a valid image file (.png, .jpg, .webp, .svg)"));
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 1280;
            const MAX_HEIGHT = 720;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width = Math.round((width * MAX_HEIGHT) / height);
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL("image/webp", 0.82));
            } else {
              resolve(src);
            }
          } catch {
            resolve(src);
          }
        };
        img.onerror = () => reject(new Error("Failed to process image"));
        img.src = src;
      };
      reader.onerror = () => reject(new Error("File read error"));
      reader.readAsDataURL(file);
    });
  };

  const handleImageFileChange = async (file: File) => {
    setIsProcessingImage(true);
    setFormError("");
    try {
      const compressed = await compressImageFile(file);
      setFormData((prev) => ({ ...prev, imageUrl: compressed }));
    } catch (err: any) {
      setFormError(err.message || "Failed to process image.");
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleMultipleGalleryUpload = async (files: FileList | File[]) => {
    setIsProcessingImage(true);
    setFormError("");
    try {
      const fileArray = Array.from(files);
      const results: string[] = [];
      for (const f of fileArray) {
        const compressed = await compressImageFile(f);
        results.push(compressed);
      }
      setFormData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...results],
      }));
    } catch (err: any) {
      setFormError(err.message || "Failed to process gallery photos.");
    } finally {
      setIsProcessingImage(false);
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const addGalleryUrl = () => {
    if (!galleryUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, galleryUrlInput.trim()],
    }));
    setGalleryUrlInput("");
  };

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

  const handleStartEdit = (p: ProjectItem) => {
    setEditingProjectId(p.id);
    setFormData({
      title: p.title || "",
      category: (p.category === "websites" ? "websites-app" : p.category) as any,
      clientType: p.clientType || "",
      description: p.description || "",
      fullDetails: p.fullDetails || p.description || "",
      highlights: Array.isArray(p.highlights) ? p.highlights.join("\n") : "",
      tags: Array.isArray(p.tags) ? p.tags.join(", ") : "",
      imageUrl: p.imageUrl || "",
      galleryImages: Array.isArray(p.galleryImages) ? p.galleryImages : [],
      videoUrl: p.videoUrl || "",
      liveUrl: p.liveUrl || "",
      githubUrl: p.githubUrl || "",
    });
    setFormError("");
    setFormSuccess("");
    setActiveTab("add");
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setFormData({
      title: "",
      category: "websites-app",
      clientType: "",
      description: "",
      fullDetails: "",
      highlights: "",
      tags: "",
      imageUrl: "",
      galleryImages: [],
      videoUrl: "",
      liveUrl: "",
      githubUrl: "",
    });
    setFormError("");
    setFormSuccess("");
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

    const isEdit = Boolean(editingProjectId);
    const payload = {
      ...(isEdit ? { id: editingProjectId } : {}),
      title: formData.title,
      category: formData.category,
      clientType: formData.clientType || "Direct Client",
      description: formData.description,
      fullDetails: formData.fullDetails || formData.description,
      highlights: formData.highlights.split("\n").map((h) => h.trim()).filter(Boolean),
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      imageUrl: formData.imageUrl || "/images/banner.jpg",
      galleryImages: formData.category === "automation" ? [] : formData.galleryImages,
      videoUrl: formData.videoUrl || "",
      liveUrl: formData.liveUrl || "",
      githubUrl: formData.githubUrl || "",
    };

    try {
      const res = await fetch("/api/projects", {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": "pabel2026",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormSuccess(isEdit ? "Project updated successfully into live showcase!" : "Project published successfully into live showcase!");
        setEditingProjectId(null);
        setFormData({
          title: "",
          category: "websites-app",
          clientType: "",
          description: "",
          fullDetails: "",
          highlights: "",
          tags: "",
          imageUrl: "",
          galleryImages: [],
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
        setFormError(data.error || (isEdit ? "Failed to update project." : "Failed to publish project."));
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

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        data = { error: `Server returned HTTP ${res.status}` };
      }

      if (res.ok && data.success) {
        loadProjects();
        onProjectsUpdated();
      } else {
        alert(data.error || "Failed to delete project.");
      }
    } catch (err: any) {
      alert(err?.message || "Failed to connect to server.");
    }
  };

  if (!isOpen) return null;

  const filtered =
    filterCat === "all"
      ? projects
      : projects.filter((p) => {
          if (filterCat === "websites-app") {
            return (
              p.category === "websites-app" ||
              p.category === "websites" ||
              (p.category === "applications" &&
                !p.title.toLowerCase().includes("ai") &&
                !p.title.toLowerCase().includes("agent") &&
                !p.title.toLowerCase().includes("bot") &&
                !p.title.toLowerCase().includes("monitor"))
            );
          }
          if (filterCat === "automation") {
            return (
              p.category === "automation" ||
              (p.category === "applications" &&
                (p.title.toLowerCase().includes("ai") ||
                  p.title.toLowerCase().includes("agent") ||
                  p.title.toLowerCase().includes("bot") ||
                  p.title.toLowerCase().includes("monitor")))
            );
          }
          return p.category === filterCat;
        });

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
            {editingProjectId ? "[✏️] Edit Project" : "[+] Add Project"}
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

        {/* TAB 1: ADD / EDIT */}
        {activeTab === "add" && (
          <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {editingProjectId && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  backgroundColor: "rgba(204, 255, 0, 0.1)",
                  border: `1px solid ${config.colors.accent}`,
                  borderRadius: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "16px" }}>✏️</span>
                  <div>
                    <div style={{ fontSize: "11px", color: config.colors.accent, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>
                      Edit Mode Active
                    </div>
                    <div style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>
                      Editing: {formData.title || "Selected Project"}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#161822",
                    border: "1px solid #333",
                    color: "#ccc",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  ✕ Cancel & New Project
                </button>
              </div>
            )}
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
                  { id: "websites-app", label: "🌐 Websites & App" },
                  { id: "automation", label: "⚡ Automation" },
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

            {formData.category === "automation" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  backgroundColor: "rgba(204, 255, 0, 0.08)",
                  border: "1px solid rgba(204, 255, 0, 0.3)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: config.colors.accent,
                }}
              >
                <span style={{ fontSize: "16px" }}>⚡</span>
                <span>
                  <strong>Automation Architecture Mode:</strong> শুধুমাত্র থাম্বনেইল থাকবে এবং প্রজেক্টের যাবতীয় বিবরণ টেক্সটের মাধ্যমে (The Problem & Solution, Highlights, Tech Stack) সুন্দরভাবে উপস্থাপিত হবে।
                </span>
              </div>
            )}

            {/* Title & Client Type */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: formData.category === "automation" ? config.colors.accent : "#888899", textTransform: "uppercase", marginBottom: "6px", fontWeight: formData.category === "automation" ? 700 : 500 }}>
                  {formData.category === "automation" ? "Project Title (প্রজেক্টের নাম) *" : "Project Title *"}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={formData.category === "automation" ? "যেমন: Autonomous WhatsApp AI Agent বা Gemini AI News Monitor" : "e.g. Modern Lifestyle & Apparel E-Commerce"}
                  required
                  style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#888899", textTransform: "uppercase", marginBottom: "6px" }}>
                  {formData.category === "automation" ? "Use Case / Industry (ব্যবহার ক্ষেত্র)" : "Client / Industry Type"}
                </label>
                <input
                  type="text"
                  value={formData.clientType}
                  onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                  placeholder={formData.category === "automation" ? "যেমন: AI Support Automation, Workflow Intelligence" : "e.g. AI Startup, Fintech, Brand"}
                  style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Description / Subtitle */}
            <div>
              <label style={{ display: "block", fontSize: "11px", color: formData.category === "video" ? config.colors.accent : "#888899", textTransform: "uppercase", marginBottom: "6px", fontWeight: formData.category === "video" ? 700 : 500 }}>
                {formData.category === "automation"
                  ? "Short Card Summary (সংক্ষিপ্ত বিবরণ) *"
                  : formData.category === "video"
                  ? "Subtitle / Card Summary (কার্ডের সাবটাইটেল / বিবরণ) *"
                  : "Short Card Summary *"}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                placeholder={
                  formData.category === "video"
                    ? "ভিডিওর সাবটাইটেল বা সংক্ষিপ্ত বিবরণ যা কার্ডের টাইটেলের নিচে দেখাবে এবং ফাঁকা জায়গা ফিলাপ করবে..."
                    : "2-line executive summary displayed on the card..."
                }
                required
                style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: `1px solid ${formData.category === "video" ? "rgba(204, 255, 0, 0.35)" : "#222533"}`, borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box", resize: "vertical" }}
              />
            </div>

            {/* The Problem & Solution / Full Details & Highlights */}
            {formData.category === "video" ? (
              <div>
                <label style={{ display: "block", fontSize: "11px", color: config.colors.accent, textTransform: "uppercase", marginBottom: "6px", fontWeight: 700 }}>
                  🎬 Video Details & Context (ভিডিওর বিস্তারিত বিবরণ)
                </label>
                <textarea
                  value={formData.fullDetails}
                  onChange={(e) => setFormData({ ...formData, fullDetails: e.target.value })}
                  rows={4}
                  placeholder="ভিডিওটির বিষয়বস্তু, এডিটিং স্টাইল, বা ক্লায়েন্ট ডেসক্রিপশন লিখুন..."
                  style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box", resize: "vertical" }}
                />
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: formData.category === "automation" ? "1fr" : "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: formData.category === "automation" ? config.colors.accent : "#888899", textTransform: "uppercase", marginBottom: "6px", fontWeight: formData.category === "automation" ? 700 : 500 }}>
                    {formData.category === "automation" ? "🎯 The Problem & Solution (সমস্যা ও সমাধান) *" : "Full Case Study / Architecture"}
                  </label>
                  <textarea
                    value={formData.fullDetails}
                    onChange={(e) => setFormData({ ...formData, fullDetails: e.target.value })}
                    rows={formData.category === "automation" ? 5 : 4}
                    placeholder={
                      formData.category === "automation"
                        ? "Explain what manual bottleneck existed, and how this AI automation solved it...\n\nExample:\nProblem: Handling repetitive customer inquiries manually took 4-5 hours every day.\nSolution: Developed an autonomous agent powered by Gemini AI & WebSockets that contextually answers queries 24/7."
                        : "Explain how it was built, challenges solved, results achieved..."
                    }
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: `1px solid ${formData.category === "automation" ? "rgba(204, 255, 0, 0.35)" : "#222533"}`, borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box", resize: "vertical" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: formData.category === "automation" ? config.colors.accent : "#888899", textTransform: "uppercase", marginBottom: "6px", fontWeight: formData.category === "automation" ? 700 : 500 }}>
                    {formData.category === "automation" ? "⚡ Key Highlights (মূল বৈশিষ্ট্যসমূহ - One per line) *" : "Key Highlights (One per line)"}
                  </label>
                  <textarea
                    value={formData.highlights}
                    onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                    rows={formData.category === "automation" ? 5 : 4}
                    placeholder={
                      formData.category === "automation"
                        ? "24/7 autonomous WhatsApp message answering\nTF-IDF deduplication algorithm\nAutomated daily email & Telegram broadcast"
                        : "Sub-second speed\n100% automated deduplication\nCustom motion graphics"
                    }
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box", resize: "vertical" }}
                  />
                </div>
              </div>
            )}

            {/* Tags / Tech Stack (Hidden for video) */}
            {formData.category !== "video" && (
              <div>
                <label style={{ display: "block", fontSize: "11px", color: formData.category === "automation" ? config.colors.accent : "#888899", textTransform: "uppercase", marginBottom: "6px", fontWeight: formData.category === "automation" ? 700 : 500 }}>
                  {formData.category === "automation" ? "🛠️ Tech Stack (টেক স্ট্যাক - Comma separated) *" : "Tags & Tech Stack (Comma separated)"}
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder={formData.category === "automation" ? "Python, FastAPI, Gemini AI, LangChain, n8n, WebSockets, Telegram Bot" : "Python, FastAPI, Gemini AI, Premiere Pro, Photoshop, Next.js"}
                  style={{ width: "100%", padding: "10px 14px", backgroundColor: "#07080a", border: "1px solid #222533", borderRadius: "8px", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
                />
              </div>
            )}

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
                <label style={{ display: "block", fontSize: "11px", color: formData.category === "video" ? config.colors.accent : "#888899", textTransform: "uppercase", marginBottom: "6px", fontWeight: formData.category === "video" ? 700 : 500 }}>
                  {formData.category === "video" ? "🎬 Video Link (YouTube / Vimeo / Drive) *" : "Video Link (YouTube / Drive)"}
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... বা https://vimeo.com/..."
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    backgroundColor: "#07080a",
                    border: formData.category === "video" ? `1px solid ${config.colors.accent}60` : "1px solid #222533",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                    boxSizing: "border-box"
                  }}
                />
                {formData.category === "video" && (
                  <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#94a3b8" }}>
                    💡 সাইটে কোনো ভারী ভিডিও ফাইল আপলোড করতে হবে না। ইউটিউব বা ভিমিও লিংক বসিয়ে নিচে কভার থাম্বনেইল দিন — সাইটে থাম্বনেইলে ক্লিক করলেই সরাসরি ভিডিও চালু হবে!
                  </p>
                )}
              </div>
            </div>

            {/* Image / Thumbnail Section */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "11px", color: (formData.category === "automation" || formData.category === "video") ? config.colors.accent : "#888899", textTransform: "uppercase", fontWeight: (formData.category === "automation" || formData.category === "video") ? 700 : 500 }}>
                  {formData.category === "automation"
                    ? "Project Thumbnail / Flow Banner (থাম্বনেইল / ব্যানার) *"
                    : formData.category === "video"
                    ? "Video Cover Thumbnail (ভিডিও কভার ছবি) *"
                    : "Project Thumbnail / Image"}
                </label>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    type="button"
                    onClick={() => setImageInputMode("upload")}
                    style={{
                      fontSize: "11px",
                      padding: "3px 10px",
                      borderRadius: "6px",
                      backgroundColor: imageInputMode === "upload" ? "#222533" : "transparent",
                      color: imageInputMode === "upload" ? config.colors.accent : "#888",
                      border: "1px solid #222533",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    📁 Upload from Computer
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputMode("url")}
                    style={{
                      fontSize: "11px",
                      padding: "3px 10px",
                      borderRadius: "6px",
                      backgroundColor: imageInputMode === "url" ? "#222533" : "transparent",
                      color: imageInputMode === "url" ? config.colors.accent : "#888",
                      border: "1px solid #222533",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    🔗 Image Link / URL
                  </button>
                </div>
              </div>

              {imageInputMode === "upload" ? (
                <div>
                  {!formData.imageUrl ? (
                    <label
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px 16px",
                        backgroundColor: "#07080a",
                        border: "2px dashed #2a2e40",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderColor = config.colors.accent;
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderColor = "#2a2e40";
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderColor = "#2a2e40";
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleImageFileChange(e.dataTransfer.files[0]);
                        }
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageFileChange(e.target.files[0]);
                          }
                        }}
                      />
                      <span style={{ fontSize: "28px", marginBottom: "6px" }}>🖼️</span>
                      <span style={{ fontSize: "13px", color: "#ffffff", fontWeight: 600 }}>
                        {isProcessingImage ? "Optimizing image..." : "Click or Drag & Drop image file"}
                      </span>
                      <span style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
                        Supports PNG, JPG, WebP, SVG (Auto-optimized for instant loading)
                      </span>
                    </label>
                  ) : (
                    <div
                      style={{
                        position: "relative",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid #2a2e40",
                        backgroundColor: "#0a0a0f",
                      }}
                    >
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        style={{
                          width: "100%",
                          maxHeight: "150px",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: "" })}
                          style={{
                            padding: "4px 10px",
                            backgroundColor: "rgba(0,0,0,0.85)",
                            color: "#ff5555",
                            border: "1px solid rgba(255,85,85,0.4)",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          ✕ Remove Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/images/banner.jpg or https://images.unsplash.com/..."
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      backgroundColor: "#07080a",
                      border: "1px solid #222533",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "13px",
                      boxSizing: "border-box",
                    }}
                  />
                  {formData.imageUrl && (
                    <div style={{ marginTop: "8px", borderRadius: "8px", overflow: "hidden", maxHeight: "120px", border: "1px solid #222533" }}>
                      <img
                        src={formData.imageUrl}
                        alt="URL Preview"
                        style={{ width: "100%", maxHeight: "120px", objectFit: "cover", display: "block" }}
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Gallery Images / Website Screenshots (Top-to-Bottom Showcase, hidden for Automation) */}
            {formData.category !== "automation" && (
              <div style={{ marginTop: "16px", padding: "14px", backgroundColor: "#0b0c10", borderRadius: "10px", border: "1px solid #1f2230" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#ccff00", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.5px" }}>
                    Website Screenshots / Gallery Photos
                  </label>
                  <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#888899" }}>
                    Add multiple screenshots to show in detail modal from top to bottom
                  </p>
                </div>
                <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", backgroundColor: "#1a1c26", color: "#aaa" }}>
                  {formData.galleryImages.length} {formData.galleryImages.length === 1 ? "Photo" : "Photos"}
                </span>
              </div>

              {/* Mode Switcher */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                <button
                  type="button"
                  onClick={() => setGalleryInputMode("upload")}
                  style={{
                    fontSize: "11px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    backgroundColor: galleryInputMode === "upload" ? "#222533" : "transparent",
                    color: galleryInputMode === "upload" ? config.colors.accent : "#888",
                    border: "1px solid #222533",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  📁 Upload Photos from PC (Multiple)
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryInputMode("url")}
                  style={{
                    fontSize: "11px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    backgroundColor: galleryInputMode === "url" ? "#222533" : "transparent",
                    color: galleryInputMode === "url" ? config.colors.accent : "#888",
                    border: "1px solid #222533",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  🔗 Add by URL
                </button>
              </div>

              {galleryInputMode === "upload" ? (
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px",
                    backgroundColor: "#07080a",
                    border: "2px dashed #2a2e40",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = config.colors.accent;
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = "#2a2e40";
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = "#2a2e40";
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      handleMultipleGalleryUpload(e.dataTransfer.files);
                    }
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleMultipleGalleryUpload(e.target.files);
                      }
                    }}
                  />
                  <span style={{ fontSize: "22px", marginBottom: "4px" }}>📸</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>
                    {isProcessingImage ? "Optimizing photos..." : "+ Choose One or Multiple Photos from PC"}
                  </span>
                  <span style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>
                    Select several images at once to display from top to bottom
                  </span>
                </label>
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="url"
                    value={galleryUrlInput}
                    onChange={(e) => setGalleryUrlInput(e.target.value)}
                    placeholder="https://... image link"
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      backgroundColor: "#07080a",
                      border: "1px solid #222533",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={addGalleryUrl}
                    style={{
                      padding: "8px 14px",
                      backgroundColor: "#222533",
                      color: config.colors.accent,
                      border: "1px solid #2e3347",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    + Add Link
                  </button>
                </div>
              )}

              {/* Preview Stack of Added Gallery Images */}
              {formData.galleryImages.length > 0 && (
                <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", color: "#888899" }}>Added Screenshots Preview:</span>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, galleryImages: [] }))}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ff5555",
                        fontSize: "11px",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Clear All ({formData.galleryImages.length})
                    </button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "8px" }}>
                    {formData.galleryImages.map((imgSrc, imgIdx) => (
                      <div
                        key={imgIdx}
                        style={{
                          position: "relative",
                          borderRadius: "6px",
                          overflow: "hidden",
                          border: "1px solid #2a2e40",
                          backgroundColor: "#07080a",
                          aspectRatio: "16 / 10",
                        }}
                      >
                        <img
                          src={imgSrc}
                          alt={`Screenshot ${imgIdx + 1}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "4px",
                            left: "4px",
                            backgroundColor: "rgba(0,0,0,0.75)",
                            color: "#fff",
                            fontSize: "10px",
                            padding: "1px 5px",
                            borderRadius: "4px",
                            fontFamily: "var(--font-mono, monospace)",
                          }}
                        >
                          #{imgIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(imgIdx)}
                          title="Remove this photo"
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(255, 60, 60, 0.9)",
                            color: "#fff",
                            border: "none",
                            fontSize: "11px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            )}

            {/* Submit */}
            <div style={{ marginTop: "14px" }}>
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
                {editingProjectId
                  ? isSubmitting
                    ? "Updating Project in Cloudflare..."
                    : "Save Changes / Update Project"
                  : isSubmitting
                  ? "Publishing to Cloudflare..."
                  : "Publish to Portfolio Showcase"}
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
                { id: "websites-app", label: "Websites & App" },
                { id: "automation", label: "Automation" },
                { id: "video", label: "Video Editing" },
                { id: "design", label: "Graphic Design" },
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
                          {p.category === "websites-app" || p.category === "websites"
                            ? "Websites & App"
                            : p.category === "automation"
                            ? "Automation"
                            : p.category === "video"
                            ? "Video Editing"
                            : p.category === "design"
                            ? "Graphic Design"
                            : p.categoryLabel || p.category}
                        </span>
                        <span style={{ fontSize: "11px", color: "#555" }}>•</span>
                        <span style={{ fontSize: "12px", color: "#888" }}>{p.clientType || "Client"}</span>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>
                        {p.title}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
                        onClick={() => handleStartEdit(p)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "rgba(204, 255, 0, 0.12)",
                          border: `1px solid ${config.colors.accent}`,
                          color: config.colors.accent,
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "11px",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                        title={`Edit ${p.title}`}
                      >
                        ✏️ Edit
                      </button>
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
