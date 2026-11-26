export interface VoiceScript {
  id: string;
  title: string;
  script: string;
  version: string;
}

export const voiceScripts: Record<string, VoiceScript> = {
  hero: {
    id: "hero",
    title: "Home",
    version: "v1",
    script: "Hi, I'm Richard A T — a Data Analyst and Machine Learning practitioner. I specialize in turning complex, fragmented enterprise datasets into clear, actionable decisions through predictive models and executive dashboards."
  },
  objective: {
    id: "objective",
    title: "Career Objective",
    version: "v1",
    script: "My career objective is to build reliable, reproducible data pipelines, decisioning frameworks, and intelligent automation systems that deliver verifiable business value and automate high-stakes decision workflows."
  },
  about: {
    id: "about",
    title: "About",
    version: "v1",
    script: "I bridge technical data engineering with executive business intelligence. My approach focuses on rigour, clarity, and impact — ensuring every model insight is fully traceable back to the raw underlying data."
  },
  capabilities: {
    id: "capabilities",
    title: "Skills & Toolkit",
    version: "v1",
    script: "My technical toolkit spans SQL, Python, Power BI, Tableau, scikit-learn, XGBoost, FastAPI, Docker, and REST API architectures, covering the full lifecycle from database query to stakeholder outcome."
  },
  experience: {
    id: "experience",
    title: "Experience",
    version: "v1",
    script: "My professional focus covers financial analytics, customer retention intelligence, dynamic pricing engines, and AI-driven receivables automation across independent practice and real-world projects."
  },
  work: {
    id: "work",
    title: "Selected Projects",
    version: "v1",
    script: "Selected projects include Credit Bridge for solvency diagnostics, OptiPrice AI for dynamic pricing, Customer Churn Intelligence for retention playbooks, and an automated AI Payment Agent for past-due account reconciliation."
  },
  education: {
    id: "education",
    title: "Education",
    version: "v1",
    script: "My educational foundation combines specialized computer science, statistical data analysis, machine learning algorithms, and modern software engineering principles."
  },
  contact: {
    id: "contact",
    title: "Contact",
    version: "v1",
    script: "I am open to global remote and hybrid opportunities. If you have a data challenge worth solving, feel free to reach out via email, LinkedIn, or GitHub to start a conversation."
  }
};
