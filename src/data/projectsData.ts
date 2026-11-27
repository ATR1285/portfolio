/**
 * Verified Project Data
 * Based on authentic repositories from github.com/ATR1285
 * Strictly verified details with zero fabricated performance statistics.
 */

export interface ProjectStage {
  step: string;
  name: string;
  detail: string;
}

export interface ProjectItem {
  id: string;
  num: string;
  category: 'FINANCIAL ANALYTICS' | 'BUSINESS INTELLIGENCE' | 'MACHINE LEARNING' | 'GENERATIVE & AGENTIC AI';
  title: string;
  shortDesc: string;
  problem: string;
  approach: string;
  implementation: string;
  outcome: string;
  tags: string[];
  repoUrl: string;
  isVerifiedRepo: boolean;
  architectureType: 'credit' | 'churn' | 'pricing' | 'agent';
  stages: ProjectStage[];
}

export const projectsData: ProjectItem[] = [
  {
    id: 'credit-bridge',
    num: '01',
    category: 'FINANCIAL ANALYTICS',
    title: 'CreditBridge',
    shortDesc: 'End-to-end credit-risk assessment and borrower solvency decisioning platform.',
    problem: 'Fragmented borrower financial statements obscure true insolvency probability, leading to slow risk assessments and uncalibrated loan underwriting decisions.',
    approach: 'Engineered a multi-stage quantitative evaluation pipeline combining automated financial ratio extraction (DSCR, leverage, liquidity) with auditable risk tier classification.',
    implementation: 'Built reproducible Python scoring modules with rule-based financial validation, debt-service coverage ratio (DSCR) calculations, and structured capital-at-risk telemetry reporting.',
    outcome: 'Verified GitHub repository with executable financial diagnostic modules and standardized solvency scorecard outputs.',
    tags: ['Python', 'Financial Analytics', 'Risk Scoring', 'DSCR Diagnostics'],
    repoUrl: 'https://github.com/ATR1285/Credit-Bridge',
    isVerifiedRepo: true,
    architectureType: 'credit',
    stages: [
      { step: '01', name: 'Statement Ingestion', detail: 'Parsing balance sheets, income statements, and cash-flow data into normalized schemas.' },
      { step: '02', name: 'Solvency Diagnostics', detail: 'Calculating debt-service coverage (DSCR), current ratios, and operational cash flow margins.' },
      { step: '03', name: 'Risk Tier Classifier', detail: 'Mapping multi-factor solvency metrics against defined underwriting risk matrices.' },
      { step: '04', name: 'Scorecard Synthesis', detail: 'Generating executive capital-at-risk summaries with auditable diagnostic flags.' },
    ],
  },
  {
    id: 'churn-intelligence',
    num: '02',
    category: 'BUSINESS INTELLIGENCE',
    title: 'Customer Churn Retention Intelligence System',
    shortDesc: 'Predictive cohort retention framework with early-warning decay signals and intervention playbooks.',
    problem: 'Customer churn indicators typically arrive after cancellation occurs, forfeiting proactive recovery opportunities and customer lifetime value (LTV).',
    approach: 'Developed an integrated analytics framework combining RFM behavioral segmentation, historical cohort decay modeling, and interactive Power BI decision dashboards.',
    implementation: 'Engineered DAX-powered semantic data models in Power BI, cohort retention migration matrices, and predictive feature tables for identifying disengagement patterns.',
    outcome: 'Verified GitHub repository containing analytical data models, DAX measures, cohort decay visualizations, and executive retention playbooks.',
    tags: ['Power BI', 'DAX Modeling', 'Cohort Analysis', 'LTV Retention'],
    repoUrl: 'https://github.com/ATR1285/Customer-Churn-Analytics-Retention-Intelligence-System',
    isVerifiedRepo: true,
    architectureType: 'churn',
    stages: [
      { step: '01', name: 'Telemetry Aggregation', detail: 'Consolidating billing history, support interactions, and usage recency into unified profiles.' },
      { step: '02', name: 'Cohort Stratification', detail: 'Grouping accounts by acquisition vintage and tracking period-over-period decay curves.' },
      { step: '03', name: 'Decay Pattern Detection', detail: 'Identifying usage frequency drops and high-friction operational milestones.' },
      { step: '04', name: 'Playbook Activation', detail: 'Delivering prioritized intervention rosters via executive Power BI dashboards.' },
    ],
  },
  {
    id: 'optiprice-ai',
    num: '03',
    category: 'MACHINE LEARNING',
    title: 'OptiPrice AI',
    shortDesc: 'Reinforcement learning dynamic pricing engine using tabular Q-learning to map discrete demand states to revenue-optimal price tiers.',
    problem: 'Static pricing rules fail to adapt in real time to fluctuating customer demand and transaction intensity, forfeiting revenue during high-demand surges or losing volume during price friction.',
    approach: 'Modeled dynamic price discovery as a discrete Markov Decision Process (MDP) using Q-learning. Quantized historical customer purchase volume into 5 demand states and trained an agent to select optimal price actions (0–4) that maximize cumulative transaction reward.',
    implementation: 'Engineered in Python with Pandas, NumPy, and Scikit-learn on Google Colab. Implemented demand quantization (pd.qcut), 5x5 state-action Q-table matrix, epsilon-greedy exploration (ε = 0.1–0.2), temporal-difference learning (α = 0.1, γ = 0.9), and real currency price mapping (₹100–₹500).',
    outcome: 'Verified GitHub repository with executable Google Colab notebook (price_predicition_), demand vs. predicted price scatter diagnostics, and actual vs. predicted price level convergence curves.',
    tags: ['Python', 'Reinforcement Learning', 'Q-Learning', 'Dynamic Pricing', 'E-commerce'],
    repoUrl: 'https://github.com/ATR1285/OptiPrice-AI',
    isVerifiedRepo: true,
    architectureType: 'pricing',
    stages: [
      { step: '01', name: 'Demand State Quantization', detail: 'Binning e-commerce purchase transaction events into discrete demand states (0 to 4) using quantiles.' },
      { step: '02', name: 'Q-Table Initialization', detail: 'Constructing the 5x5 State-Action matrix with learning rate α=0.1, discount γ=0.9, and exploration ε=0.1.' },
      { step: '03', name: 'Epsilon-Greedy Policy Training', detail: 'Balancing exploratory price trials with revenue exploitation across iterative transaction episodes.' },
      { step: '04', name: 'Price Action Recommendation', detail: 'Extracting argmax_a Q(s,a) to map demand states to real currency price levels (₹100–₹500).' },
    ],
  },
  {
    id: 'ai-payment-agent',
    num: '04',
    category: 'GENERATIVE & AGENTIC AI',
    title: 'AI Payment & Receivables Agent',
    shortDesc: 'Automated agentic workflow for past-due account prioritization and ledger reconciliation.',
    problem: 'Manual receivables follow-up is labor-intensive, error-prone, and inefficient at prioritizing delinquent accounts by recovery likelihood.',
    approach: 'Architected an automated agent workflow combining aging-bracket prioritization, intelligent communication dispatch, and ledger status synchronization.',
    implementation: 'Developed automation agent logic with API integrations, structured status parsing, rule-based escalation triggers, and accounting reconciliation hooks.',
    outcome: 'Verified GitHub repository demonstrating automated payment reconciliation logic, aging triggers, and agentic workflows.',
    tags: ['FastAPI', 'Automation Agents', 'Ledger Reconciliation', 'Fintech'],
    repoUrl: 'https://github.com/ATR1285/AI-AGENT----PAYMENT-',
    isVerifiedRepo: true,
    architectureType: 'agent',
    stages: [
      { step: '01', name: 'Aging Ledger Ingestion', detail: 'Extracting accounts receivable balances and sorting into 30/60/90+ day aging buckets.' },
      { step: '02', name: 'Priority Ranking', detail: 'Scoring delinquency severity based on historical payment behavior and exposure value.' },
      { step: '03', name: 'Dispatch & Escalation', detail: 'Triggering contextual reminder sequences with rule-based compliance gates.' },
      { step: '04', name: 'Ledger Reconciliation', detail: 'Updating payment statuses and emitting settlement audit trails to accounting.' },
    ],
  },
];
