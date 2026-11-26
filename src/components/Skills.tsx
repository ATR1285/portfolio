import React from 'react';

const skillCategories = [
  {
    category: 'DATA & ANALYTICS',
    skills: ['SQL', 'Python', 'Power BI', 'Tableau', 'Data Analytics', 'Data Pipelines'],
  },
  {
    category: 'AI & MACHINE LEARNING',
    skills: ['GenAI', 'Agentic AI', 'scikit-learn', 'XGBoost', 'Predictive Modeling', 'Risk Analytics'],
  },
  {
    category: 'DEVELOPMENT & INFRASTRUCTURE',
    skills: ['FastAPI', 'REST APIs', 'Docker', 'Git', 'Software Engineering', 'Automation'],
  },
];

export default function Skills() {
  return (
    <>
      {/* 03 / SKILLS */}
      <section className="capabilities section" id="capabilities" data-section="capabilities">
        <div className="system-panel">
          <div className="panel-header">
            <span className="section-label">03 / SKILLS</span>
            <span className="system-tag">TECHNOLOGY NETWORK</span>
          </div>

          <h2 className="section-title">
            From the query<br />to the <em>outcome.</em>
          </h2>

          <div className="skill-network-grid">
            {skillCategories.map((cat) => (
              <div className="skill-category-card" key={cat.category}>
                <h3 className="category-title">{cat.category}</h3>
                <div className="skill-node-list">
                  {cat.skills.map((skill) => (
                    <div className="skill-node" key={skill}>
                      <span className="node-dot" />
                      <span className="node-text">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 / EXPERIENCE */}
      <section className="section" id="experience" data-section="experience">
        <div className="system-panel">
          <div className="panel-header">
            <span className="section-label">04 / EXPERIENCE</span>
            <span className="system-tag">SYSTEM EVENT LOG</span>
          </div>

          <h2 className="section-title">
            Analytics &amp;<br /><em>Machine Learning.</em>
          </h2>

          <div className="timeline-card">
            <div className="timeline-meta">
              <span className="timeline-year">[2023 – PRESENT]</span>
              <span className="timeline-status">PROJECTS &amp; INDEPENDENT PRACTICE</span>
            </div>
            <h3 className="timeline-role">Data Analyst &amp; ML Practitioner</h3>
            <p className="timeline-desc">
              Specialising in credit-risk modeling, dynamic pricing algorithms, customer retention intelligence, and GenAI automation agents. Designed and deployed end-to-end analytics platforms on GitHub.
            </p>
          </div>
        </div>
      </section>

      {/* 06 / EDUCATION */}
      <section className="section" id="education" data-section="education">
        <div className="system-panel">
          <div className="panel-header">
            <span className="section-label">06 / EDUCATION</span>
            <span className="system-tag">QUALIFICATIONS</span>
          </div>

          <h2 className="section-title">
            Foundation &amp;<br /><em>Qualifications.</em>
          </h2>

          <div className="timeline-card education-card">
            <div className="timeline-meta">
              <span className="timeline-year">[SPECIALISATION]</span>
              <span className="timeline-status">ANALYTICS &amp; ML DISCIPLINES</span>
            </div>
            <h3 className="timeline-role">Computer Technology / Data &amp; AI</h3>
            <p className="timeline-desc">
              Comprehensive training in data structures, predictive modeling, statistics, SQL database architecture, machine learning algorithms, and software engineering principles.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
