export const personal = {
  name: 'Aditya Mishra',
  title: 'Network Platform Automation Engineer',
  subtitle: 'Ansible · ServiceNow · Multi-vendor Network Automation',
  location: 'Pune, India',
  phone: '+91 96687 64761',
  email: 'adityamishra2710@gmail.com',
  github: 'https://github.com/aditya403',
  githubUsername: 'aditya403',
  linkedin: 'https://linkedin.com/in/adityamishra2710',
  leetcode: 'https://leetcode.com/audacious_enemy',
  leetcodeUsername: 'audacious_enemy',
  summary:
    'Software Engineer II with 4+ years of experience designing and delivering enterprise network automation across firewall, load balancer, SSL certificate, router configuration, validation, and decommissioning workflows. I take automation from SME requirements and HLD/LLD through development, testing, deployment, and production support — saving 13,000+ engineering hours annually.',
  stats: {
    years: '4+',
    hoursSaved: '13,000+',
    automations: '6+',
  },
};

export const skills = [
  {
    category: 'Network Automation',
    color: '#00ff88',
    items: ['Firewall Decommissioning', 'Firewall Validation', 'LB VIP Decommissioning', 'Backend Server Decommissioning', 'SSL Certificate Renewal', 'Router Configuration Automation'],
  },
  {
    category: 'Platforms',
    color: '#00d4ff',
    items: ['Ansible', 'Resolve.io', 'ServiceNow', 'Git', 'REST APIs', 'YAML', 'JSON'],
  },
  {
    category: 'Programming',
    color: '#ffaa00',
    items: ['Python', 'Groovy', 'Java', 'Shell Scripting', 'JavaScript', 'jQuery', 'ExtJS', 'CSS'],
  },
  {
    category: 'Network Operations',
    color: '#ff3366',
    items: ['Juniper SRX', 'Cisco ASA', 'Citrix NetScaler', 'F5 Load Balancers', 'ACLs', 'NAT', 'SSL Lifecycle'],
  },
  {
    category: 'Data & AI',
    color: '#8b5cf6',
    items: ['SQL Server', 'PostgreSQL', 'LangChain', 'LangGraph', 'MCP', 'RAG', 'Tool Integration', 'Prompt Engineering'],
  },
  {
    category: 'Engineering',
    color: '#00ff88',
    items: ['Requirements Gathering', 'HLD / LLD Design', 'Workflow Architecture', 'Testing', 'Production Deployment', 'SME Collaboration', 'Operational Risk Reduction'],
  },
];

export const skillConnections = [];

export const experience = [
  {
    role: 'Software Engineer II',
    company: 'FIS',
    period: '2025 – Present',
    location: 'Pune, India',
    techStack: ['Resolve.io', 'Ansible', 'ServiceNow', 'Python', 'Groovy', 'JavaScript'],
    highlights: [
      'Lead end-to-end design and delivery of enterprise network automation across firewall decommissioning, firewall validation, load balancer VIP decommissioning, backend server decommissioning, SSL certificate renewal, and router configuration workflows — collectively saving 13,000+ engineering hours annually.',
      'Design HLD/LLD automation architecture with network SMEs, platform teams, and operations stakeholders: gather requirements, validate feasibility, define execution logic, document workflows, and align implementation with operational controls.',
      'Built firewall decommissioning automation for Juniper SRX and Cisco ASA firewalls, saving approximately 3,500–4,000 engineering hours annually through automated rule/object cleanup, validation, execution sequencing, and controlled change workflows.',
      'Developed firewall decommissioning validation automation, saving 2,000+ engineering hours annually through post-change verification, compliance checks, execution status validation, and exception reporting.',
      'Built load balancer VIP decommissioning and validation workflows for Citrix NetScaler and F5, saving 2,000+ engineering hours annually with automated intake, dependency checks, execution, validation, traceability, and reporting.',
      'Automated load balancer SSL certificate renewal workflows, saving 2,000+ engineering hours annually by streamlining certificate lifecycle activities, validation, renewal execution, and operational reporting.',
      'Migrated major enterprise automation workflows from Resolve.io to Ansible using reusable roles/modules, inventory handling, YAML configuration, and repeatable execution patterns.',
      'Integrated ServiceNow with automation workflows for structured intake, approval-aware processing, execution tracking, real-time status updates, and traceable operational outcomes.',
      'Developed operator-focused interfaces with JavaScript, jQuery, and ExtJS to simplify complex network workflows for operations teams.',
    ],
  },
  {
    role: 'Software Engineer I – Network Automation, Workflow Engineering',
    company: 'FIS',
    period: 'Jul 2023 – Jun 2025',
    location: 'Pune, India',
    techStack: ['Resolve.io', 'ServiceNow', 'Python', 'Groovy', 'Shell', 'Git'],
    highlights: [
      'Developed, maintained, and enhanced enterprise automation for Juniper and Cisco firewall workflows, NetScaler and F5 load balancer operations, SSL certificate renewal, router configuration, and decommissioning use cases.',
      'Collaborated with network SMEs and operations teams to convert manual change procedures into deterministic workflows with defined inputs, validations, execution steps, rollback considerations, and reporting outputs.',
      'Improved execution reliability and reduced operational risk by standardizing repetitive network tasks, automating validation checks, and replacing manual command-driven activities with controlled workflow automation.',
      'Built practical expertise across firewall policies, object groups, ACLs, NAT, load balancer VIPs, backend server dependencies, SSL certificate lifecycle, router configuration, and enterprise change management.',
    ],
  },
  {
    role: 'IT Trainee',
    company: 'FIS',
    period: 'Jun 2022 – Jul 2023',
    location: 'Pune, India',
    techStack: ['Python', 'Groovy', 'Shell', 'Resolve.io', 'ServiceNow'],
    highlights: [
      'Supported enterprise network operations, automation scripts, production deployments, workflow enhancements, and operational controls.',
    ],
  },
];

export const workProjects = [
  {
    name: 'Firewall Decommissioning Automation',
    period: '2023 → ongoing',
    blurb: 'Controlled Juniper SRX and Cisco ASA workflows that automate rule and object cleanup, validation, execution sequencing, and change management.',
    metric: '3,500–4,000 hrs / yr',
    metricSub: 'in production',
    tech: ['Ansible', 'Resolve.io', 'ServiceNow', 'Python'],
    state: 'live',
  },
  {
    name: 'Firewall Decommissioning Validation',
    period: '2025 → ongoing',
    blurb: 'Post-change verification and compliance automation with execution status validation and exception reporting for safer production changes.',
    metric: '2,000+ hrs / yr',
    metricSub: 'in production',
    tech: ['Ansible', 'ServiceNow', 'Python'],
    state: 'live',
  },
  {
    name: 'Load Balancer VIP Decommissioning',
    period: '2024 → ongoing',
    blurb: 'End-to-end VIP decommissioning and validation for Citrix NetScaler and F5, covering intake, dependencies, execution, traceability, and reporting.',
    metric: '2,000+ hrs / yr',
    metricSub: 'in production',
    tech: ['Ansible', 'ServiceNow', 'F5', 'NetScaler'],
    state: 'live',
  },
  {
    name: 'SSL Certificate Renewal Automation',
    period: '2023 → ongoing',
    blurb: 'Certificate lifecycle automation that streamlines validation, renewal execution, load balancer operations, and operational reporting.',
    metric: '2,000+ hrs / yr',
    metricSub: 'in production',
    tech: ['Resolve.io', 'ServiceNow', 'Python', 'Groovy'],
    state: 'live',
  },
  {
    name: 'Resolve.io → Ansible Migration',
    period: '2025',
    blurb: 'Migrated major enterprise workflows to reusable Ansible roles and modules with inventory handling, YAML configuration, and repeatable execution patterns.',
    metric: 'enterprise scale',
    metricSub: 'migration',
    tech: ['Ansible', 'YAML', 'Resolve.io'],
    state: 'shipping',
  },
  {
    name: 'Router Configuration Automation',
    period: '2022 – 2023',
    blurb: 'Production support and automation for router configuration handling, operational artifacts, workflow enhancements, and controlled deployments.',
    metric: 'network ops',
    metricSub: 'supported',
    tech: ['Python', 'Groovy', 'Shell', 'ServiceNow'],
    state: 'live',
  },
];

export const education = [
  {
    degree: 'B.Tech in Information Technology',
    institution: 'KIIT, Bhubaneswar',
    period: '2018 – 2022',
  },
];

export const interests = [
  'Network Automation',
  'Workflow Design',
  'AI / AIOps',
  'Reading',
  'Physics & Mathematics',
  'Squash',
  'Swimming',
];
