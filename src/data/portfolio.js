export const personal = {
  name: 'Aditya Mishra',
  title: 'Software Engineer',
  subtitle: 'Backend Systems & AI-Driven Automation',
  location: 'Pune, India',
  email: 'adityamishra2710@gmail.com',
  github: 'https://github.com/aditya403',
  githubUsername: 'aditya403',
  linkedin: 'https://linkedin.com/in/adityamishra2710',
  leetcode: 'https://leetcode.com/audacious_enemy',
  leetcodeUsername: 'audacious_enemy',
  summary:
    'Software Engineer with 4+ years of experience designing and shipping backend systems and AI-driven automation for enterprise infrastructure. I build distributed workflow orchestration, NLP-powered intake agents, and governance frameworks on a Java/Spring foundation — paired with Python, Groovy, and ServiceNow integrations — delivering 7,000+ engineering hours in annual savings. Q3 2024 Star Award recipient at FIS.',
  stats: {
    years: '4+',
    hoursSaved: '7,000+',
    automations: '8+',
  },
};

export const skills = [
  {
    category: 'Languages',
    color: '#00ff88',
    items: ['Java', 'Python', 'Groovy', 'Shell', 'SQL', 'Regex'],
  },
  {
    category: 'Backend',
    color: '#00d4ff',
    items: ['Spring Boot', 'Spring Security', 'REST APIs', 'Multithreading', 'Elasticsearch'],
  },
  {
    category: 'AI / ML',
    color: '#ffaa00',
    items: ['LLM Agents', 'NLP Parsing', 'Prompt Engineering', 'AI Monitoring'],
  },
  {
    category: 'Cloud & DevOps',
    color: '#00d4ff',
    items: ['AWS', 'Docker', 'Git', 'GitHub', 'CI/CD', 'Linux'],
  },
  {
    category: 'Platforms',
    color: '#ff3366',
    items: ['ServiceNow', 'Resolve.io'],
  },
  {
    category: 'Concepts',
    color: '#00ff88',
    items: ['System Design', 'Workflow Orchestration', 'Observability', 'Compliance'],
  },
];

// Connections for the force-directed skill network graph
export const skillConnections = [
  ['Java', 'Spring Boot'],
  ['Java', 'Multithreading'],
  ['Spring Boot', 'REST APIs'],
  ['Spring Boot', 'Spring Security'],
  ['Spring Security', 'REST APIs'],
  ['Python', 'LLM Agents'],
  ['Python', 'NLP Parsing'],
  ['LLM Agents', 'NLP Parsing'],
  ['LLM Agents', 'Prompt Engineering'],
  ['NLP Parsing', 'AI Monitoring'],
  ['Groovy', 'ServiceNow'],
  ['Shell', 'Linux'],
  ['Shell', 'CI/CD'],
  ['SQL', 'Elasticsearch'],
  ['Docker', 'AWS'],
  ['Docker', 'CI/CD'],
  ['Git', 'GitHub'],
  ['Git', 'CI/CD'],
  ['ServiceNow', 'Resolve.io'],
  ['REST APIs', 'ServiceNow'],
  ['System Design', 'Workflow Orchestration'],
  ['Workflow Orchestration', 'Observability'],
  ['Observability', 'Compliance'],
  ['Regex', 'NLP Parsing'],
];

export const experience = [
  {
    role: 'Software Engineer 2',
    company: 'FIS',
    period: 'Jun 2025 – Present',
    location: 'Pune, India',
    techStack: ['Java', 'Python', 'Groovy', 'LLM Agents', 'NLP', 'ServiceNow', 'Resolve.io'],
    highlights: [
      'Leading a next-generation enterprise automation initiative projected to deliver 4,200+ engineering hours in annual efficiency gains upon production rollout.',
      'Built Intelligent Intake Orchestration using NLP-driven AI agents that parse unstructured emails and design documents to auto-extract infrastructure requirements — eliminating manual ServiceNow form entry.',
      'Engineered an AI agent that parses manually executed Phase 1 LB VIP scripts, monitors runs in real time, and detects operational failure patterns — converting a manual workflow into a semi-autonomous monitored process.',
      'Architected a two-phase Load Balancer VIP Decommissioning framework with staged disable/decommission flows and auto-generated primary/secondary scripts, reducing change risk on production VIPs.',
      'Delivered Firewall Decommissioning Validation Automation, a cron-driven governance platform that reconciles ServiceNow change records against firewall state — saving 1,200+ hours annually while enforcing compliance.',
      'Standardized auditing and observability frameworks (execution time, success/failure metrics, validation checkpoints, exception traces) across every deployed automation.',
    ],
  },
  {
    role: 'Software Engineer 1',
    company: 'FIS',
    period: 'Jul 2023 – Jun 2025',
    location: 'Pune, India',
    techStack: ['Groovy', 'Shell', 'ServiceNow', 'GitHub'],
    highlights: [
      'Architected Firewall Decommissioning Automation orchestrating 500+ end-to-end workflows — dataset processing, request validation, script generation, ServiceNow ticket lifecycle, and execution verification — delivering 3,500+ hours in annual savings.',
      'Awarded the Q3 2024 Star Award for technical leadership and enterprise-scale impact.',
      'Built SSL Certificate Discovery, Renewal & Load Balancer Mapping Automation that ingests VIP inputs, traces every load balancer where certificates are deployed, generates renewal scripts, and uploads finalized outputs to ServiceNow — saving 1,500+ hours annually.',
      'Partnered with network, platform, and operations teams to scale automation adoption across multiple enterprise environments, replacing error-prone manual processes with deterministic systems.',
    ],
  },
  {
    role: 'IT Trainee',
    company: 'FIS',
    period: 'Jun 2022 – Jul 2023',
    location: 'Pune, India',
    techStack: ['Python', 'Groovy', 'Shell', 'Resolve.io', 'ServiceNow'],
    highlights: [
      'Designed and shipped Router Configuration Scrubbing Automation that retrieved router configurations, sanitized sensitive data, transformed outputs into operational artifacts, and uploaded them directly to ServiceNow — generating 900+ hours in annual savings.',
      'Expanded scope from backend engineering into enterprise automation, workflow orchestration, and operational tooling across the Python, Groovy, and Shell ecosystems.',
    ],
  },
  {
    role: 'Engineering Trainee',
    company: 'Simform',
    period: 'Jan 2022 – Feb 2022',
    location: 'Ahmedabad, India',
    techStack: ['Java', 'Spring Boot', 'Multithreading', 'Spring Security', 'Elasticsearch'],
    highlights: [
      'Completed intensive backend engineering training in Java multithreading, RESTful APIs (Spring Boot), Spring Security, and Elasticsearch.',
    ],
  },
];

// Headline work shipped at FIS — surfaced as project rows
export const workProjects = [
  {
    name: 'Intelligent Intake Orchestration',
    period: '2025 → ongoing',
    blurb: 'NLP-driven AI agents that parse unstructured emails and design documents to auto-extract infrastructure requirements — eliminates manual ServiceNow form entry.',
    metric: '4,200+ hrs / yr',
    metricSub: 'projected',
    tech: ['Java', 'LLM Agents', 'NLP', 'ServiceNow'],
    state: 'shipping',
  },
  {
    name: 'Firewall Decommissioning Automation',
    period: '2023 – 2024',
    blurb: 'End-to-end orchestration across 500+ workflows — dataset processing, request validation, script generation, ServiceNow ticket lifecycle, and execution verification. Q3 2024 Star Award.',
    metric: '3,500+ hrs / yr',
    metricSub: 'in production',
    tech: ['Groovy', 'Shell', 'ServiceNow', 'GitHub'],
    state: 'live',
  },
  {
    name: 'SSL Certificate Discovery & Renewal',
    period: '2024',
    blurb: 'Ingests VIP inputs, traces every load balancer where certificates are deployed, generates renewal and deployment scripts, and uploads finalized outputs to ServiceNow.',
    metric: '1,500+ hrs / yr',
    metricSub: 'in production',
    tech: ['Groovy', 'Shell', 'ServiceNow'],
    state: 'live',
  },
  {
    name: 'Firewall Decom Validation Platform',
    period: '2025',
    blurb: 'Cron-driven governance platform that reconciles ServiceNow change records against firewall state — enforcing post-change compliance.',
    metric: '1,200+ hrs / yr',
    metricSub: 'in production',
    tech: ['Java', 'Groovy', 'Shell', 'ServiceNow'],
    state: 'live',
  },
  {
    name: 'Two-Phase LB VIP Decommissioning',
    period: '2025',
    blurb: 'Staged disable/decommission flows with auto-generated primary/secondary scripts — reducing change risk on production VIPs.',
    metric: 'production VIPs',
    metricSub: 'risk ↓',
    tech: ['Java', 'Groovy', 'ServiceNow'],
    state: 'live',
  },
  {
    name: 'Router Config Scrubbing Automation',
    period: '2022 – 2023',
    blurb: 'Retrieved router configurations, sanitized sensitive data, transformed outputs into operational artifacts, and uploaded directly to ServiceNow.',
    metric: '900+ hrs / yr',
    metricSub: 'in production',
    tech: ['Python', 'Shell', 'ServiceNow'],
    state: 'live',
  },
];

export const education = [
  {
    degree: 'Bachelor of Technology (B.Tech) in Information Technology',
    institution: 'KIIT, Kalinga Institute of Industrial Technology',
    period: '2018 – 2022',
  },
];

export const interests = [
  'Physics & Mathematics',
  'Quantum Physics',
  'Spirituality',
  'Reading',
  'Squash',
  'Swimming',
];
