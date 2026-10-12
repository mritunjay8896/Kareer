import { FullRegistrationData } from './types';

export const SKILL_CATEGORIES = [
  'Programming',
  'Frontend',
  'Backend',
  'Database',
  'Cloud',
  'DevOps',
  'Testing',
  'Design',
  'Business',
  'Marketing',
  'Other'
] as const;

export const POPULAR_SKILLS_BY_CATEGORY: Record<string, string[]> = {
  Programming: ['Python', 'Java', 'C++', 'C#', 'TypeScript', 'JavaScript', 'Go', 'Rust', 'PHP', 'Kotlin', 'Swift'],
  Frontend: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'HTML5', 'CSS3', 'Redux', 'Sass', 'Webpack', 'Vite'],
  Backend: ['Node.js', 'Express', 'Django', 'FastAPI', 'Spring Boot', 'ASP.NET', 'Ruby on Rails', 'GraphQL', 'REST APIs', 'gRPC'],
  Database: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase Firestore', 'SQLite', 'Oracle', 'Cassandra', 'Prisma', 'Supabase'],
  Cloud: ['AWS', 'Google Cloud Platform (GCP)', 'Microsoft Azure', 'Cloudflare', 'Vercel', 'Netlify', 'DigitalOcean'],
  DevOps: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Jenkins', 'Terraform', 'Linux', 'Nginx', 'Prometheus'],
  Testing: ['Jest', 'Playwright', 'Cypress', 'Selenium', 'Mocha', 'Postman', 'JUnit', 'PyTest'],
  Design: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping', 'Adobe XD', 'Adobe Photoshop', 'Illustrator'],
  Business: ['Agile / Scrum', 'Product Management', 'Data Analysis', 'Jira', 'Business Intelligence', 'Tableau', 'Power BI'],
  Marketing: ['SEO', 'Content Strategy', 'Social Media Marketing', 'Google Analytics', 'Email Marketing', 'Copywriting'],
  Other: ['Git & GitHub', 'Data Structures & Algorithms', 'Problem Solving', 'Communication', 'Team Leadership']
};

export const COMMON_ROLES = [
  'Software Developer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile App Developer',
  'Data Analyst',
  'Data Scientist',
  'Machine Learning Engineer',
  'Business Analyst',
  'QA / Test Engineer',
  'DevOps Engineer',
  'Cloud Architect',
  'Product Manager',
  'UI/UX Designer',
  'Cybersecurity Analyst',
  'HR Specialist',
  'Marketing Associate',
  'Financial Analyst'
];

export const COMMON_LOCATIONS = [
  'Bangalore',
  'Delhi NCR',
  'Mumbai',
  'Hyderabad',
  'Pune',
  'Gurgaon',
  'Noida',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Remote (All India)'
];

export const COMMON_INDUSTRIES = [
  'IT / Software',
  'FinTech',
  'EdTech',
  'E-commerce & Retail',
  'Healthcare & HealthTech',
  'Banking & Financial Services',
  'Consulting & Services',
  'Artificial Intelligence & ML',
  'Gaming & Entertainment',
  'Logistics & Supply Chain',
  'Automotive & EV',
  'Telecommunications'
];

export const INITIAL_REGISTRATION_DATA: FullRegistrationData = {
  account: {
    email: '',
    password: '',
    confirmPassword: ''
  },
  candidateType: 'fresher',
  personal: {
    fullName: '',
    photoUrl: '',
    headline: '',
    phone: '',
    dob: '',
    gender: '',
    city: '',
    state: '',
    country: 'India',
    about: ''
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  links: {
    linkedin: '',
    github: '',
    website: '',
    behance: '',
    dribbble: '',
    twitter: '',
    youtube: '',
    instagram: '',
    stackoverflow: '',
    leetcode: '',
    kaggle: '',
    medium: ''
  },
  careerPreferences: {
    lookingFor: ['Full-time Job'],
    desiredRoles: [],
    workMode: ['Hybrid', 'Remote'],
    locations: ['Bangalore'],
    industries: ['IT / Software'],
    expectedSalary: '₹6 - ₹10 LPA',
    expectedStipend: '₹20,000 - ₹30,000/month',
    availability: 'Immediately'
  },
  portfolio: {
    username: '',
    visibility: 'Public',
    template: 'Modern',
    enabledSections: [
      'About',
      'Skills',
      'Experience',
      'Education',
      'Projects',
      'Certifications',
      'Achievements',
      'Contact'
    ]
  },
  profileCompletion: 0
};
