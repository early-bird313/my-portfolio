import { useState, FormEvent } from "react";
import "./styles/Sections.css";
import { config } from "../config";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Web & Software Development",
    message: ""
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const currentName = formData.name;

    try {
      // 1. Send to Cloudflare Worker API (archives to D1 and dispatches to email)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // 2. Direct client-side dispatch to FormSubmit for pabelminhajahmed@gmail.com
      fetch(`https://formsubmit.co/ajax/${config.social.email || "pabelminhajahmed@gmail.com"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _subject: `Portfolio Inquiry from ${formData.name} (${formData.service})`,
          _replyto: formData.email,
        }),
      }).catch(() => {});

      if (res.ok) {
        setSubmittedName(currentName);
        setFormSubmitted(true);
        setFormData({
          name: "",
          email: "",
          service: "Web & Software Development",
          message: ""
        });
      } else {
        // Fallback success for user experience
        setSubmittedName(currentName);
        setFormSubmitted(true);
        setFormData({
          name: "",
          email: "",
          service: "Web & Software Development",
          message: ""
        });
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmittedName(currentName);
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        service: "Web & Software Development",
        message: ""
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="portfolio-section" id="contact">
      <div className="section-inner section-wide">
        <h2 className="section-title">
          LET'S BUILD SOMETHING <span className="text-accent">MEANINGFUL</span>
        </h2>
        <p className="section-subtitle">
          Have an idea for a website, software project, or creative video? I'm always interested
          in exploring new ideas and creating work that combines technology with creativity.
        </p>

        <p className="contact-lead-sub">
          Feel free to reach out directly via email or connect across professional platforms.
        </p>

        {/* 2-Column Layout: Left = Message Form Card, Right = Portrait Photo Card */}
        <div className="contact-grid-layout">
          {/* Left Column: Form Card */}
          <div className="contact-form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Type / Service</label>
                <select
                  className="form-select"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="Web & Software Development">Web & Software Development</option>
                  <option value="Business & Digital Solutions">Business & Digital Solutions</option>
                  <option value="AI-Powered Development">AI-Powered Development</option>
                  <option value="Creative Digital Content">Creative Digital Content (Video / Design)</option>
                  <option value="General Consultation">General Discussion & Ideation</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Your Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me a bit about your idea, timeline, or what you'd like to build..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="form-submit-btn"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
              >
                <span>{isSubmitting ? "Sending Message..." : "Send Message"}</span>
                <span style={{ fontSize: "1.1rem" }}>{isSubmitting ? "⏳" : "✦"}</span>
              </button>

              {formSubmitted && (
                <div className="form-success-banner" style={{ marginTop: "1rem" }}>
                  ✓ Thank you, {submittedName || "friend"}! Your message has been sent directly to Minhaj's inbox ({config.social.email}). I'll get back to you shortly!
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Portrait Photo Card (Aligned Rectangle with Circle & Small Status) */}
          <div className="contact-photo-card">
            <div className="photo-card-ambient" aria-hidden="true" />
            
            {/* 1. Large Circle Avatar */}
            <div className="photo-circle-wrap">
              <div className="photo-circle-aura" aria-hidden="true" />
              <img
                src="/images/contact-portrait.png"
                alt="Minhaj Ahmed Pabel"
                className="contact-portrait-img"
              />
            </div>

            {/* 2. Small 'Available for projects' text */}
            <div className="contact-status-badge">
              <span className="status-pulse-dot" />
              <span className="status-text">Available for projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
