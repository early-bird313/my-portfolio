import React, { PropsWithChildren } from "react";
import CharacterModel from "./CharacterModel";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <section className="landing-section" id="home">
      {/* ── Atmospheric Floating Orbs (Matching Reference) ── */}
      <div className="landing-orb-1" />
      <div className="landing-orb-2" />

      <div className="landing-container">
        {/* ── Left Hero Headline: Hi, I'm Minhaj Ahmed Pabel ── */}
        <div className="landing-intro">
          <span className="landing-tag">Hi, I'm</span>
          <h1 className="landing-name">
            <span className="name-row">MINHAJ AHMED</span>
            <span className="name-row highlight-pabel">PABEL</span>
          </h1>
        </div>

        {/* ── Center: Interactive 3D Cartoon Character Model ── */}
        <div className="landing-center-visual">
          <CharacterModel />
          {children}
        </div>

        {/* ── Right Hero Headline: Creative AI Engineer ── */}
        <div className="landing-info">
          <span className="landing-tag">An</span>
          <h2 className="landing-role">
            <span className="role-row role-creative">CREATIVE</span>
            <span className="role-row role-engineer">AI ENGINEER</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Landing;
