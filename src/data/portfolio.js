export const personal = {
  name: 'Aditya Mishra',
  title: 'Network Automation Engineer',
  subtitle: 'Network Operations & Infra Automation',
  location: 'Pune, India',
  email: 'adityamishra2710@gmail.com',
  github: 'https://github.com/aditya403',
  githubUsername: 'aditya403',
  linkedin: 'https://linkedin.com/in/adityamishra2710',
  leetcode: 'https://leetcode.com/audacious_enemy',
  leetcodeUsername: 'audacious_enemy',
  summary:
    'Network Automation Engineer with 3+ years of experience building high-impact automation for enterprise network operations. Specialized in firewall and load balancer decommissioning, SSL certificate renewals, and validation workflows. Strong background in Groovy-based automation, ServiceNow integrations, and shell scripting. Proven track record of delivering automation solutions that save 900–1200+ engineering hours annually per system.',
  stats: {
    years: '3+',
    hoursSaved: '3100+',
    automations: '6+',
  },
};

export const skills = [
  {
    category: 'Languages',
    color: '#00ff88',
    items: ['Groovy', 'Shell Scripting', 'Python', 'Java'],
  },
  {
    category: 'Automation',
    color: '#00d4ff',
    items: ['Network Automation', 'Firewall Decommissioning', 'SSL Renewals', 'Validation Frameworks'],
  },
  {
    category: 'Platforms',
    color: '#ffaa00',
    items: ['ServiceNow', 'Resolve.io'],
  },
  {
    category: 'Dev Tools',
    color: '#ff3366',
    items: ['Git', 'GitHub'],
  },
  {
    category: 'Cloud & Containers',
    color: '#00d4ff',
    items: ['AWS (Basics)', 'Docker'],
  },
  {
    category: 'Other',
    color: '#00ff88',
    items: ['Regex', 'Networking Fundamentals', 'REST APIs', 'Agile / ITSM'],
  },
];

// Connections for the force-directed skill network graph
export const skillConnections = [
  ['Groovy', 'ServiceNow'],
  ['Groovy', 'Network Automation'],
  ['Groovy', 'Firewall Decommissioning'],
  ['Shell Scripting', 'Network Automation'],
  ['Shell Scripting', 'SSL Renewals'],
  ['Python', 'REST APIs'],
  ['Python', 'Docker'],
  ['Java', 'Groovy'],
  ['Network Automation', 'Firewall Decommissioning'],
  ['Network Automation', 'SSL Renewals'],
  ['Network Automation', 'Validation Frameworks'],
  ['Firewall Decommissioning', 'Validation Frameworks'],
  ['SSL Renewals', 'Validation Frameworks'],
  ['ServiceNow', 'Network Automation'],
  ['ServiceNow', 'Resolve.io'],
  ['Git', 'GitHub'],
  ['Git', 'Groovy'],
  ['AWS (Basics)', 'Docker'],
  ['Docker', 'Shell Scripting'],
  ['Regex', 'Validation Frameworks'],
  ['Regex', 'Shell Scripting'],
  ['Networking Fundamentals', 'Network Automation'],
  ['Networking Fundamentals', 'Firewall Decommissioning'],
  ['REST APIs', 'ServiceNow'],
  ['Agile / ITSM', 'ServiceNow'],
];

export const experience = [
  {
    role: 'Network Engineer II',
    company: 'FIS',
    period: 'Jun 2025 – Present',
    location: 'India · Hybrid',
    techStack: ['Groovy', 'Shell Scripting', 'ServiceNow', 'Resolve.io', 'GitHub'],
    highlights: [
      'Architected and delivered enterprise-grade network automation solutions covering firewall decommissioning, certificate lifecycle management, and operational validation, significantly reducing manual intervention across critical infrastructure workflows.',
      'Designed and implemented a fully automated firewall decommissioning system that consistently saves 1200+ engineering hours annually while improving execution accuracy and auditability.',
      'Built a robust SSL certificate renewal automation framework, eliminating repetitive manual tasks and delivering 950+ hours of yearly operational savings.',
      'Developed comprehensive firewall decommissioning validation automations, ensuring correctness, compliance, and post-change confidence while saving an additional 950+ hours annually.',
      'Integrated automation pipelines seamlessly with ServiceNow, enabling structured request intake, controlled execution, real-time status updates, and traceable outcomes.',
      'Currently leading development of a next-generation automation initiative projected to deliver 1200+ hours of annual efficiency gains upon production rollout.',
    ],
  },
  {
    role: 'Network Engineer I',
    company: 'FIS',
    period: 'Jul 2023 – Jun 2025',
    location: 'Pune, MH · Remote',
    techStack: ['Groovy', 'Shell Scripting', 'ServiceNow', 'GitHub'],
    highlights: [
      'Developed, maintained, and enhanced network automation scripts supporting large-scale firewall and load balancer operations in a production enterprise environment.',
      'Played a key role in building and stabilizing decommissioning workflows, improving execution reliability and reducing operational risk.',
      'Collaborated closely with network, platform, and operations teams to scale automation adoption across multiple environments.',
      'Consistently reduced manual toil and turnaround time by replacing error-prone processes with deterministic automation.',
    ],
  },
  {
    role: 'IT Trainee',
    company: 'FIS',
    period: 'Jun 2022 – Jul 2023',
    location: 'Pune, MH · Remote',
    techStack: ['Groovy', 'Shell Scripting', 'ServiceNow'],
    highlights: [
      'Supported enterprise network operations while gradually transitioning into automation-focused responsibilities.',
      'Built foundational automation scripts and assisted senior engineers in deploying solutions to production systems.',
      'Developed a strong understanding of enterprise network workflows, change management, and operational best practices.',
    ],
  },
  {
    role: 'Engineering Trainee',
    company: 'Simform',
    period: 'Jan 2022 – Feb 2022',
    location: 'Ahmedabad, GJ',
    techStack: ['Java', 'Spring Boot', 'Multithreading', 'Spring Security', 'Elasticsearch'],
    highlights: [
      'Received intensive training in backend engineering fundamentals, including Java multithreading and RESTful service design using Spring Boot.',
      'Worked hands-on with Spring Security and Elasticsearch as part of structured engineering assignments.',
    ],
  },
];

export const education = [
  {
    degree: 'Bachelor of Technology (B.Tech) in Information Technology',
    institution: 'KIIT, Kalinga Institute of Industrial Technology',
    period: '2018 – 2022',
  },
  {
    degree: 'Intermediate (Science)',
    institution: 'SSVM, Ranchi',
    period: '2002 – 2017',
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
