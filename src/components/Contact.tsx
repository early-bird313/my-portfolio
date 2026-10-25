import { useState, FormEvent } from "react";
import "./styles/Sections.css";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Web & Software Development",
    message: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        service: "Web & Software Development",
        message: ""
      });
      setFormSubmitted(false);
    }, 4500);
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

              <button type="submit" className="form-submit-btn">
                <span>Send Message</span>
                <span style={{ fontSize: "1.1rem" }}>✦</span>
              </button>

              {formSubmitted && (
                <div className="form-success-banner">
                  ✓ Thank you, {formData.name || "friend"}! Your message has been received. I'll get back to you shortly!
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Portrait Photo Card (Aligned Rectangle, Only User Pic) */}
          <div className="contact-photo-card">
            <div className="photo-card-ambient" aria-hidden="true" />
            <img
              src="/images/contact-portrait.png"
              alt="Minhaj Ahmed Pabel"
              className="contact-portrait-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
