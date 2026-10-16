import { useEffect, useRef, useState } from "react";
import "./styles/Sections.css";

const About = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="portfolio-section" id="about" ref={sectionRef}>
      <div className="section-inner section-wide">
        <h2 className={`section-title ${inView ? "animate-reveal-up" : ""}`}>
          ABOUT <span className="text-accent">ME</span>
        </h2>

        {/* 2-Column Unboxed Layout: Left = Editorial Bio, Right = 3D Sculpture Zone */}
        <div className="about-grid">
          {/* Left: Clean, unboxed editorial typography pushed far left */}
          <div className={`about-bio-wrap ${inView ? "about-animated" : ""}`}>
            <p className="about-paragraph lead-p">
              I am a <strong className="text-highlight">creative, technology-driven engineer</strong> passionate about solving real-world challenges and transforming ambitious ideas into <strong className="text-highlight">practical digital solutions</strong>.
            </p>

            <p className="about-paragraph">
              I combine deep software engineering fundamentals with cutting-edge AI models and creative lateral thinking to build scalable software, dynamic web interfaces, and automated agent workflows that address real business needs.
            </p>

            <p className="about-paragraph">
              Bridging technical execution with thoughtful product intuition, my goal is to deliver solutions that create measurable value, accelerate workflows, and build lasting professional partnerships.
            </p>

            <div className="about-quote-modern">
              <span className="quote-accent-bar" />
              <div className="quote-content-wrap">
                <p className="quote-text">
                  “I'm always learning, experimenting, and building better ways to solve problems through technology.”
                </p>
                <span className="quote-author">— Minhaj Ahmed Pabel</span>
              </div>
            </div>
          </div>

          {/* Right: Open spatial anchor pushed far right for the 3D sculpture */}
          <div className="about-sculpture-anchor" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default About;
