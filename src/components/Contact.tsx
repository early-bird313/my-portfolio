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

        {/* 2-Column Layout: Left = Message Form under text, Right = 3D Particle Sculpture Anchor */}
        <div className="contact-grid-layout">
          {/* Left Column: Direct Lead Text + Form */}
          <div className="contact-content-col">
            <p className="contact-lead-sub">
              Feel free to reach out directly via email or connect across professional platforms.
            </p>

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
          </div>

          {/* Right Column: Personal Trust & Direct Connect Card with Photo */}
          <div className="contact-profile-card">
            <div className="profile-card-ambient" aria-hidden="true" />
            
            <div className="profile-avatar-wrap">
              <div className="profile-avatar-aura" aria-hidden="true" />
              <img
                src="/images/contact-portrait.png"
                alt="Minhaj Ahmed Pabel"
                className="profile-portrait-img"
              />
            </div>

            <div className="profile-status-badge">
              <span className="status-pulse-dot" />
              <span className="status-text">Available for Projects & Collaboration</span>
            </div>

            <div className="profile-details-wrap">
              <h3 className="profile-name">Minhaj Ahmed Pabel</h3>
              <p className="profile-role">
                AI Solutions <span className="role-sep">•</span> Web Development <span className="role-sep">•</span> Creative Design
              </p>
              
              <p className="profile-bio-snippet">
                Turning complex business challenges into sleek, automated digital products. Let's discuss your vision and build something impactful together.
              </p>

              {/* Trust Badges */}
              <div className="profile-trust-points">
                <div className="trust-point-item">
                  <span className="trust-icon">✦</span>
                  <div className="trust-point-text">
                    <strong>Direct 1-on-1 Collaboration</strong>
                    <span>Transparent communication from start to launch</span>
                  </div>
                </div>

                <div className="trust-point-item">
                  <span className="trust-icon">✦</span>
                  <div className="trust-point-text">
                    <strong>Fast 24-Hour Response</strong>
                    <span>Prompt replies to queries, quotes & project scopes</span>
                  </div>
                </div>

                <div className="trust-point-item">
                  <span className="trust-icon">✦</span>
                  <div className="trust-point-text">
                    <strong>50+ Real-World Challenges Solved</strong>
                    <span>Proven experience delivering practical client results</span>
                  </div>
                </div>
              </div>

              {/* Direct Connect Action */}
              <div className="profile-direct-connect">
                <span className="direct-label">Or email directly:</span>
                <a href="mailto:pabelminhajahmed@gmail.com" className="profile-direct-mail-btn">
                  <span>pabelminhajahmed@gmail.com</span>
                  <span className="mail-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
