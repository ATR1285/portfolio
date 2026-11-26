import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  { 
    title: 'Credit Bridge', 
    type: 'Financial Analytics', 
    text: 'Credit-risk assessment and decisioning platform with solvency scoring, DSCR diagnostics, and financial-health signals.', 
    tags: ['Python', 'Risk analytics', 'Decisioning'], 
    url: 'https://github.com/ATR1285/Credit-Bridge' 
  },
  { 
    title: 'OptiPrice AI', 
    type: 'Machine Learning', 
    text: 'Dynamic pricing engine that models demand, price elasticity, and competitor signals to recommend optimal prices.', 
    tags: ['ML', 'Forecasting', 'Revenue'], 
    url: 'https://github.com/ATR1285/OptiPrice-AI' 
  },
  { 
    title: 'Customer Churn Intelligence', 
    type: 'Business Analytics', 
    text: 'Retention framework that surfaces churn drivers through LTV cohorts, predictive classification, and intervention playbooks.', 
    tags: ['Power BI', 'Cohorts', 'Classification'], 
    url: 'https://github.com/ATR1285/Customer-Churn-Analytics-Retention-Intelligence-System' 
  },
  { 
    title: 'AI Payment Agent', 
    type: 'Fintech & GenAI', 
    text: 'Automated receivables agent for prioritising past-due accounts, routing reminders, and reconciling payment ledgers.', 
    tags: ['GenAI', 'Automation', 'Fintech'], 
    url: 'https://github.com/ATR1285/AI-AGENT----PAYMENT-' 
  },
];

export default function Projects() {
  return (
    <>
      <section className="work section" id="work" data-section="work">
        <div className="section-head">
          <div>
            <p className="section-label">02 / SELECTED WORK</p>
            <h2>Proof in the <em>projects.</em></h2>
          </div>
          <a className="text-link" href="https://github.com/ATR1285" target="_blank" rel="noreferrer">
            View all repositories <ArrowUpRight size={16}/>
          </a>
        </div>
        <div className="project-grid">
          {projects.map((p, i) => (
            <div className="card project-card" key={p.title} data-num={String(i + 1).padStart(2, '0')}>
              <div className="card-details">
                <div>
                  <p className="card-type">{p.type}</p>
                  <h3 className="text-title">{p.title}</h3>
                  <p className="text-body">{p.text}</p>
                </div>
                <div className="card-tags">
                  {p.tags.map(t => <b key={t}>{t}</b>)}
                </div>
              </div>
              <a className="card-button" href={p.url} target="_blank" rel="noreferrer">
                View Repository <ArrowUpRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="numbers" data-section="work">
        <div><strong>20<span>+</span></strong><p>Repositories<br/>and experiments</p></div>
        <div><strong>4</strong><p>Core disciplines:<br/>data, BI, ML, engineering</p></div>
        <div><strong>1</strong><p>Focus: creating<br/>useful intelligence</p></div>
      </section>
    </>
  );
}
