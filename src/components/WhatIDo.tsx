import React from "react";
import "./styles/Sections.css";

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

const servicesData: ServiceItem[] = [
  {
    icon: "💻",
    title: "Web & Software Development",
    description: "Build websites, applications, and digital tools tailored to specific needs and business goals.",
    features: [
      "Custom responsive websites & portals",
      "Interactive web apps with modern frameworks",
      "Scalable backend architectures & clean code",
      "Performance optimization & SEO best practices"
    ]
  },
  {
    icon: "⚡",
    title: "Business & Digital Solutions",
    description: "Explore practical ways to improve business processes, solve operational problems, and make everyday tasks more efficient with technology.",
    features: [
      "Workflow & process automation",
      "Digital operations streamlining",
      "Custom tool integration & data flows",
      "Practical problem-solving for real ROI"
    ]
  },
  {
    icon: "🤖",
    title: "AI-Powered Development",
    description: "Use AI tools to support development, explore ideas, speed up workflows, and build solutions more effectively—guided by my own technical knowledge and judgment.",
    features: [
      "AI & LLM API integrations",
      "Agentic engineering & autonomous assistance",
      "Rapid prototyping with intelligent toolsets",
      "Human-in-the-loop precision & quality control"
    ]
  },
  {
    icon: "🎨",
    title: "Creative Digital Content",
    description: "Apply video editing and graphic design skills to create engaging visual content that communicates ideas and supports digital branding.",
    features: [
      "High-retention video editing & motion graphics",
      "Brand identity & marketing collateral",
      "Visual storytelling for products & services",
      "Engaging multimedia across social channels"
    ]
  }
];

const WhatIDo = () => {
  return (
    <section className="portfolio-section" id="services">
      <div className="section-inner">
        <div className="section-tag">03 / Capabilities</div>
        <h2 className="section-title">
          WHAT <span className="text-accent">I DO</span>
        </h2>
        <p className="section-subtitle">
          Versatile skillsets uniting engineering discipline, intelligent automation, and visual craft.
        </p>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div className="service-card" key={index}>
              <div>
                <div className="service-icon-box">
                  <span style={{ fontSize: "1.5rem" }}>{service.icon}</span>
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
              </div>

              <ul className="service-features-list">
                {service.features.map((feature, fIndex) => (
                  <li className="service-feature-item" key={fIndex}>
                    <span className="service-feature-bullet">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
