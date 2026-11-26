import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function About() {
  return (
    <section className="about-section section" id="about" data-section="about">
      {/* 01 / CAREER OBJECTIVE */}
      <div className="system-panel objective-panel" id="objective" data-section="objective">
        <div className="panel-header">
          <span className="section-label">01 / CAREER OBJECTIVE</span>
          <span className="system-tag status-active">OBJECTIVE_STATUS: ACTIVE</span>
        </div>
        <h2 className="objective-heading">
          Designing <em>reproducible intelligence</em> for high-stakes decisions.
        </h2>
        <p className="objective-lead">
          To build reliable data pipelines, predictive models, and executive analytics platforms that transform raw enterprise datasets into clear, automated decision workflows.
        </p>
      </div>

      {/* 02 / ABOUT */}
      <div className="system-panel about-panel" id="about-details">
        <div className="panel-header">
          <span className="section-label">02 / ABOUT</span>
          <span className="system-tag">PROFILE: RICHARD A T</span>
        </div>
        
        <div className="about-inner">
          <h2 className="about-heading">
            Built to bridge<br />data <em>and decisions.</em>
          </h2>

          <div className="about-layout">
            <div className="about-profile-card">
              <img className="about-avatar-lg about-photo" src={`${import.meta.env.BASE_URL}richard.webp`} width={110} height={110} alt="Richard A T" />
              <p className="about-name">Richard A T</p>
              <p className="about-role">Computer Technology · Data & AI</p>
              <div className="about-tags">
                <span>GenAI & Agentic AI</span>
                <span>Data Analytics</span>
                <span>Machine Learning</span>
                <span>Business Intelligence</span>
              </div>
            </div>

            <div className="about-text">
              <p>
                I'm Richard A T — a data and AI professional who turns messy, fragmented datasets into reliable systems that drive real business outcomes. From credit-risk models to dynamic pricing engines and executive dashboards, I build work that's verifiable, understandable, and immediately useful.
              </p>
              <p>
                My background in Computer Technology spans analytics, machine learning, and business intelligence — moving fluently from raw SQL pipelines all the way to stakeholder-ready visual intelligence and AI automation agents.
              </p>

              <div className="about-values">
                <div className="about-value">
                  <strong>RIGOUR</strong>
                  <span>Every insight is reproducible and fully traceable to source data.</span>
                </div>
                <div className="about-value">
                  <strong>CLARITY</strong>
                  <span>Complex models translated into plain, actionable language.</span>
                </div>
                <div className="about-value">
                  <strong>IMPACT</strong>
                  <span>Analysis that makes the next best move obvious.</span>
                </div>
              </div>

              <a className="button primary about-cta" href="#contact">
                START A CONVERSATION <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
