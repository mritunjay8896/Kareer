export interface CandidateProfileItem {
  id: string;
  name: string;
  handle: string; // for /p/:handle
  role: string;
  headline: string;
  avatar: string;
  location: string;
  experienceYears: number;
  experienceLabel: string;
  noticePeriod: string;
  expectedSalary: string;
  workMode: 'Remote' | 'Hybrid' | 'Onsite';
  verifiedPortfolio: boolean;
  atsScore: number;
  bio: string;
  skills: string[];
  education: {
    degree: string;
    field: string;
    institution: string;
    year: string;
  };
  experience: {
    role: string;
    company: string;
    period: string;
    summary: string;
  }[];
  featuredProjects: {
    title: string;
    description: string;
    tags: string[];
    demoUrl?: string;
    githubUrl?: string;
  }[];
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export const MOCK_CANDIDATES: CandidateProfileItem[] = [
  {
    id: 'cand-1',
    name: 'Aarav Sharma',
    handle: 'aarav-sharma',
    role: 'Full Stack Engineer',
    headline: 'Full Stack Developer | React, Node.js, TypeScript & PostgreSQL',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    location: 'Bangalore, India',
    experienceYears: 3,
    experienceLabel: '3 Years Exp',
    noticePeriod: 'Immediate',
    expectedSalary: '₹18 - ₹24 LPA',
    workMode: 'Remote',
    verifiedPortfolio: true,
    atsScore: 96,
    bio: 'Passionate software craftsman building distributed web apps, high-throughput APIs, and polished user interfaces. Open-source contributor and competitive programmer.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Next.js', 'REST APIs'],
    education: {
      degree: 'B.Tech in Computer Science',
      field: 'Computer Science & Engineering',
      institution: 'R.V. College of Engineering, Bangalore',
      year: '2023',
    },
    experience: [
      {
        role: 'Full Stack Developer',
        company: 'CloudNova Systems',
        period: '2023 - Present',
        summary: 'Architected real-time dashboard microservices serving 120k monthly active users, reduced query latency by 45%.',
      },
      {
        role: 'Frontend Engineering Intern',
        company: 'FinTrack Labs',
        period: '2022 - 2023',
        summary: 'Built responsive client portal and interactive payment widgets with 99.8% test coverage.',
      },
    ],
    featuredProjects: [
      {
        title: 'DevPulse Analytics',
        description: 'Developer productivity analytics engine analyzing commit history and issue resolution velocity.',
        tags: ['React', 'TypeScript', 'GraphQL', 'Tailwind'],
        githubUrl: 'https://github.com/aaravsharma/devpulse',
        demoUrl: 'https://devpulse.demo',
      },
      {
        title: 'TaskFlow Distributed Queue',
        description: 'Lightweight job scheduling and distributed task queue in Node.js and Redis.',
        tags: ['Node.js', 'Redis', 'PostgreSQL'],
        githubUrl: 'https://github.com/aaravsharma/taskflow',
      },
    ],
    email: 'aarav.sharma.dev@gmail.com',
    phone: '+91 98765 43210',
    github: 'https://github.com/aaravsharma',
    linkedin: 'https://linkedin.com/in/aarav-sharma-tech',
  },
  {
    id: 'cand-2',
    name: 'Priya Patel',
    handle: 'priya-patel',
    role: 'Frontend & UI/UX Engineer',
    headline: 'Senior Frontend Engineer & Design Systems Specialist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    location: 'Mumbai / Remote',
    experienceYears: 4,
    experienceLabel: '4 Years Exp',
    noticePeriod: '15 Days',
    expectedSalary: '₹22 - ₹28 LPA',
    workMode: 'Remote',
    verifiedPortfolio: true,
    atsScore: 98,
    bio: 'Bridging the gap between pixel-perfect aesthetics and robust frontend architectures. Obsessed with web accessibility (WCAG AA) and sub-second page loads.',
    skills: ['React', 'Next.js', 'Figma', 'Tailwind CSS', 'TypeScript', 'Storybook', 'Framer Motion', 'Web Vitals'],
    education: {
      degree: 'B.Des in Interaction Design',
      field: 'UI/UX & Interactive Media',
      institution: 'National Institute of Design (NID)',
      year: '2022',
    },
    experience: [
      {
        role: 'Lead UI/UX Engineer',
        company: 'HyperDesign Studios',
        period: '2023 - Present',
        summary: 'Spearheaded design system unification across 4 SaaS products, accelerating design-to-production velocity by 3x.',
      },
      {
        role: 'Frontend Engineer',
        company: 'Zeta Health',
        period: '2021 - 2023',
        summary: 'Engineered telehealth booking web application with 100/100 Lighthouse performance metrics.',
      },
    ],
    featuredProjects: [
      {
        title: 'Aura Design System',
        description: 'Accessible, token-driven component library with zero-runtime CSS and dark mode support.',
        tags: ['React', 'TypeScript', 'Storybook', 'Tailwind'],
        githubUrl: 'https://github.com/priyapatel/aura-ui',
        demoUrl: 'https://aura-ui.demo',
      },
      {
        title: 'Minimalist Journal App',
        description: 'Local-first offline markdown workspace with end-to-end client encryption.',
        tags: ['Next.js', 'PWA', 'IndexedDB'],
        demoUrl: 'https://journal-aura.demo',
      },
    ],
    email: 'priya.patel.design@gmail.com',
    phone: '+91 91234 56789',
    github: 'https://github.com/priyapatel',
    linkedin: 'https://linkedin.com/in/priya-patel-design',
  },
  {
    id: 'cand-3',
    name: 'Rohan Mehta',
    handle: 'rohan-mehta',
    role: 'Backend & Cloud Engineer',
    headline: 'Backend Architect | Go, Python, Kubernetes & AWS Cloud',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    location: 'Hyderabad, India',
    experienceYears: 2,
    experienceLabel: '2 Years Exp',
    noticePeriod: 'Immediate',
    expectedSalary: '₹14 - ₹20 LPA',
    workMode: 'Hybrid',
    verifiedPortfolio: true,
    atsScore: 94,
    bio: 'Backend systems engineer focused on cloud infrastructure automation, microservices resilience, and database query optimization.',
    skills: ['Python', 'Golang', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Redis', 'Kafka'],
    education: {
      degree: 'B.Tech in Information Technology',
      field: 'Computer Engineering',
      institution: 'IIIT Hyderabad',
      year: '2023',
    },
    experience: [
      {
        role: 'Backend Engineer',
        company: 'ScaleGrid Infrastructure',
        period: '2023 - Present',
        summary: 'Built automated failover mechanisms across distributed database clusters handling 50k transactions/sec.',
      },
    ],
    featuredProjects: [
      {
        title: 'KubeWatch Canary',
        description: 'Lightweight Kubernetes operator for automated zero-downtime canary rollouts.',
        tags: ['Golang', 'Kubernetes', 'Helm'],
        githubUrl: 'https://github.com/rohanmehta/kubewatch',
      },
      {
        title: 'CacheForge',
        description: 'High-performance distributed in-memory key-value cache engine in Go.',
        tags: ['Go', 'Concurrency', 'Protobuf'],
        githubUrl: 'https://github.com/rohanmehta/cacheforge',
      },
    ],
    email: 'rohan.mehta.cloud@gmail.com',
    phone: '+91 97890 12345',
    github: 'https://github.com/rohanmehta',
    linkedin: 'https://linkedin.com/in/rohan-mehta-cloud',
  },
  {
    id: 'cand-4',
    name: 'Ananya Iyer',
    handle: 'ananya-iyer',
    role: 'AI / ML Engineer',
    headline: 'Machine Learning Specialist | PyTorch, LLMs, LangChain & Python',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    location: 'Chennai / Remote',
    experienceYears: 1,
    experienceLabel: '1 Year Exp (Fresher+)',
    noticePeriod: 'Immediate',
    expectedSalary: '₹12 - ₹18 LPA',
    workMode: 'Remote',
    verifiedPortfolio: true,
    atsScore: 95,
    bio: 'Building practical generative AI applications, retrieval-augmented generation (RAG) pipelines, and multimodal document processing engines.',
    skills: ['Python', 'PyTorch', 'LangChain', 'OpenAI API', 'Hugging Face', 'FastAPI', 'Vector DBs', 'SQL'],
    education: {
      degree: 'M.Tech in Artificial Intelligence',
      field: 'Data Science & Machine Learning',
      institution: 'IIT Madras',
      year: '2024',
    },
    experience: [
      {
        role: 'AI Research & Engineering Fellow',
        company: 'CognitiveCore AI',
        period: '2024 - Present',
        summary: 'Developed multi-agent RAG system for legal document extraction, reducing analysis time by 70%.',
      },
    ],
    featuredProjects: [
      {
        title: 'DocuChat RAG Assistant',
        description: 'Multi-format PDF, DOCX and spreadsheet semantic Q&A system using embeddings and Pinecone.',
        tags: ['Python', 'FastAPI', 'LangChain', 'Pinecone'],
        githubUrl: 'https://github.com/ananyaiyer/docuchat',
      },
    ],
    email: 'ananya.iyer.ai@gmail.com',
    phone: '+91 94567 89012',
    github: 'https://github.com/ananyaiyer',
    linkedin: 'https://linkedin.com/in/ananya-iyer-ai',
  },
  {
    id: 'cand-5',
    name: 'Vikram Singh',
    handle: 'vikram-singh',
    role: 'Mobile App Developer',
    headline: 'Cross-Platform Mobile Engineer | Flutter, React Native, iOS & Android',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    location: 'Delhi NCR, India',
    experienceYears: 3,
    experienceLabel: '3 Years Exp',
    noticePeriod: '30 Days',
    expectedSalary: '₹16 - ₹22 LPA',
    workMode: 'Hybrid',
    verifiedPortfolio: true,
    atsScore: 92,
    bio: 'Published 6+ apps on App Store and Google Play with over 400k collective downloads. Passionate about offline sync, slick 60fps animations, and native bridges.',
    skills: ['Flutter', 'React Native', 'Dart', 'Swift', 'Kotlin', 'Firebase', 'GraphQL', 'Mobile CI/CD'],
    education: {
      degree: 'B.Tech in Computer Science',
      field: 'Software Engineering',
      institution: 'Delhi Technological University (DTU)',
      year: '2023',
    },
    experience: [
      {
        role: 'Mobile Engineer',
        company: 'SwiftPay Mobile',
        period: '2023 - Present',
        summary: 'Led the revamp of UPI checkout flow, boosting successful conversion rate by 18%.',
      },
    ],
    featuredProjects: [
      {
        title: 'FitPulse Workout Tracker',
        description: 'Cross-platform fitness companion with HealthKit integration and custom haptic feedback.',
        tags: ['Flutter', 'Dart', 'Firebase'],
        demoUrl: 'https://fitpulse.app',
      },
    ],
    email: 'vikram.singh.mobile@gmail.com',
    phone: '+91 93456 78901',
    github: 'https://github.com/vikramsingh',
    linkedin: 'https://linkedin.com/in/vikram-singh-app',
  },
  {
    id: 'cand-6',
    name: 'Sneha Kulkarni',
    handle: 'sneha-kulkarni',
    role: 'DevOps & SRE Engineer',
    headline: 'DevOps & Site Reliability Engineer | Terraform, CI/CD, Kubernetes',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    location: 'Pune, India',
    experienceYears: 2,
    experienceLabel: '2 Years Exp',
    noticePeriod: 'Immediate',
    expectedSalary: '₹15 - ₹20 LPA',
    workMode: 'Remote',
    verifiedPortfolio: true,
    atsScore: 97,
    bio: 'Automation enthusiast crafting declarative infrastructure as code, zero-trust cloud architectures, and bulletproof deployment pipelines.',
    skills: ['Terraform', 'Kubernetes', 'Docker', 'GitHub Actions', 'AWS', 'Prometheus', 'Grafana', 'Linux'],
    education: {
      degree: 'B.Tech in Electronics & Telecommunication',
      field: 'Networks & Systems',
      institution: 'COEP Technological University, Pune',
      year: '2023',
    },
    experience: [
      {
        role: 'DevOps Engineer',
        company: 'NexusCloud Systems',
        period: '2023 - Present',
        summary: 'Automated multiregion disaster recovery with Terraform and streamlined release pipelines from 45m to 7m.',
      },
    ],
    featuredProjects: [
      {
        title: 'GitOps Pipeline Blueprint',
        description: 'Production-ready reusable GitHub Actions workflow library for microservices deploying to EKS.',
        tags: ['Terraform', 'Kubernetes', 'ArgoCD'],
        githubUrl: 'https://github.com/snehakulkarni/gitops-blueprint',
      },
    ],
    email: 'sneha.kulkarni.ops@gmail.com',
    phone: '+91 92345 67890',
    github: 'https://github.com/snehakulkarni',
    linkedin: 'https://linkedin.com/in/sneha-kulkarni-ops',
  },
];
