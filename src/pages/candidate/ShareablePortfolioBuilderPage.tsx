import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Share2, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Mail, 
  Phone, 
  MapPin, 
  Plus, 
  Trash2, 
  Code, 
  Eye, 
  Check, 
  Smartphone, 
  Monitor, 
  Palette, 
  FolderGit2, 
  Zap, 
  Download, 
  QrCode, 
  Briefcase, 
  GraduationCap, 
  Send, 
  MessageSquare, 
  Star,
  CheckCircle2,
  Sliders,
  Layers,
  ArrowRight,
  User,
  FileText,
  Award,
  Menu,
  X,
  Lock,
  Search,
  ExternalLink as LinkIcon,
  ChevronRight,
  TrendingUp,
  Sparkle,
  Moon,
  Trophy
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Interfaces for Portfolio Data
export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  image: string;
  category: string;
}

export interface PortfolioSkill {
  name: string;
  iconName: string;
  level: string; // e.g. "Advanced", "Intermediate"
  percentage: number;
  color: string;
}

export interface PortfolioExperience {
  id: string;
  company: string;
  logo: string;
  title: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface PortfolioEducation {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  logo: string;
  startYear: string;
  endYear: string;
  grade: string;
  location: string;
  description: string;
}

export interface PortfolioCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  logo: string;
}

export interface PortfolioAchievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  category: string;
}

export interface PortfolioThemeConfig {
  id: 'indigo-purple' | 'sky-blue' | 'emerald' | 'violet' | 'minimal-slate';
  name: string;
  pageBg: string;
  primaryAccent: string;
  primaryGradient: string;
  secondaryPill: string;
  cardBg: string;
  textColor: string;
}

export const ShareablePortfolioBuilderPage: React.FC = () => {
  const { candidateProfile } = useAuth();

  // Mode: 'editor' (Dashboard + Preview) or 'public' (Pure Standalone Portfolio View)
  const [viewMode, setViewMode] = useState<'editor' | 'public'>('editor');
  
  // Mobile Nav Drawer for Public Portfolio
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Custom Portfolio Slug / Handle
  const [handle, setHandle] = useState('aman-kumar');
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState<'basic' | 'about' | 'skills' | 'experience' | 'education' | 'projects' | 'certs' | 'resume' | 'theme' | 'privacy'>('basic');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Contact Form State in Portfolio
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Theme Settings
  const [activeThemeId, setActiveThemeId] = useState<'indigo-purple' | 'sky-blue' | 'emerald' | 'violet' | 'minimal-slate'>('indigo-purple');

  // Theme definitions
  const themes: Record<string, PortfolioThemeConfig> = {
    'indigo-purple': {
      id: 'indigo-purple',
      name: 'Default Indigo & Purple',
      pageBg: 'bg-[#f4f7fc]',
      primaryAccent: 'text-indigo-600',
      primaryGradient: 'bg-gradient-to-r from-indigo-600 to-purple-600',
      secondaryPill: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      cardBg: 'bg-white',
      textColor: 'text-slate-900',
    },
    'sky-blue': {
      id: 'sky-blue',
      name: 'Sky Blue Ocean',
      pageBg: 'bg-[#f0f8ff]',
      primaryAccent: 'text-blue-600',
      primaryGradient: 'bg-gradient-to-r from-blue-600 to-cyan-600',
      secondaryPill: 'bg-blue-50 text-blue-700 border-blue-100',
      cardBg: 'bg-white',
      textColor: 'text-slate-900',
    },
    'emerald': {
      id: 'emerald',
      name: 'Emerald Mint',
      pageBg: 'bg-[#f0fdf4]',
      primaryAccent: 'text-emerald-600',
      primaryGradient: 'bg-gradient-to-r from-emerald-600 to-teal-600',
      secondaryPill: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      cardBg: 'bg-white',
      textColor: 'text-slate-900',
    },
    'violet': {
      id: 'violet',
      name: 'Royal Violet',
      pageBg: 'bg-[#faf5ff]',
      primaryAccent: 'text-purple-600',
      primaryGradient: 'bg-gradient-to-r from-purple-600 to-pink-600',
      secondaryPill: 'bg-purple-50 text-purple-700 border-purple-100',
      cardBg: 'bg-white',
      textColor: 'text-slate-900',
    },
    'minimal-slate': {
      id: 'minimal-slate',
      name: 'Executive Slate',
      pageBg: 'bg-[#f8fafc]',
      primaryAccent: 'text-slate-800',
      primaryGradient: 'bg-slate-900',
      secondaryPill: 'bg-slate-100 text-slate-800 border-slate-200',
      cardBg: 'bg-white',
      textColor: 'text-slate-900',
    }
  };

  const currentTheme = themes[activeThemeId] || themes['indigo-purple'];

  // User Privacy Settings
  const [privacy, setPrivacy] = useState<'public' | 'unlisted' | 'private'>('public');

  // User Profile Data State (Pre-filled inspired by reference image)
  const [profile, setProfile] = useState({
    fullName: candidateProfile?.fullName || 'Aman Sharma',
    title: candidateProfile?.headline || 'Full Stack Developer',
    subtitle: 'I build modern, responsive and user-friendly web applications that solve real world problems and deliver great user experiences.',
    location: candidateProfile?.location || 'Bangalore, India',
    email: candidateProfile?.email || 'aman.sharma@example.com',
    phone: '+91 98765 43210',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
    aboutBio: "I'm a passionate Full Stack Developer with experience in building web applications using modern technologies. I love turning ideas into real products.",
    aboutImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    experienceYears: '2+',
    projectsCount: '10+',
    availableForFreelance: true,
    resumeName: 'Aman_Sharma_FullStack_Resume.pdf',
    resumeUrl: '#',
    skillsProgressText: 'Building scalable and efficient web applications',
    skillsProgressPercent: 90,
  });

  // Social Links
  const [socials, setSocials] = useState({
    github: 'https://github.com/aman-sharma',
    linkedin: 'https://linkedin.com/in/aman-sharma',
    twitter: 'https://twitter.com/aman_codes',
    instagram: 'https://instagram.com/aman.dev',
    email: 'mailto:aman.sharma@example.com',
  });

  // Skills List matching reference image
  const [skills, setSkills] = useState<PortfolioSkill[]>([
    { name: 'HTML', iconName: 'html', level: 'Advanced', percentage: 95, color: '#e34f26' },
    { name: 'CSS', iconName: 'css', level: 'Advanced', percentage: 90, color: '#1572b6' },
    { name: 'JavaScript', iconName: 'js', level: 'Expert', percentage: 92, color: '#f7df1e' },
    { name: 'React', iconName: 'react', level: 'Expert', percentage: 90, color: '#61dafb' },
    { name: 'Node.js', iconName: 'node', level: 'Intermediate', percentage: 85, color: '#339933' },
    { name: 'Express.js', iconName: 'express', level: 'Intermediate', percentage: 80, color: '#000000' },
    { name: 'MongoDB', iconName: 'mongo', level: 'Intermediate', percentage: 85, color: '#47a248' },
    { name: 'Git', iconName: 'git', level: 'Advanced', percentage: 90, color: '#f05032' },
  ]);

  // Experience List
  const [experiences, setExperiences] = useState<PortfolioExperience[]>([
    {
      id: 'exp-1',
      company: 'TechNova Solutions',
      logo: 'TN',
      title: 'Full Stack Developer',
      employmentType: 'Full-time',
      startDate: 'Jan 2024',
      endDate: 'Present',
      location: 'Bangalore, India',
      description: 'Developing scalable web applications using MERN stack.',
      responsibilities: [
        'Developed and maintained scalable web applications using MERN stack.',
        'Collaborated with cross-functional teams to deliver high-quality products.',
        'Optimized performance and improved application speed by 35%.'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB']
    },
    {
      id: 'exp-2',
      company: 'WebCraft Technologies',
      logo: 'W',
      title: 'Frontend Developer Intern',
      employmentType: 'Internship',
      startDate: 'Jun 2023',
      endDate: 'Dec 2023',
      location: 'Bangalore, India',
      description: 'Built responsive UI components using React and Tailwind CSS.',
      responsibilities: [
        'Built responsive UI components using React and Tailwind CSS.',
        'Integrated REST APIs and worked on frontend performance.',
        'Learnt version control using Git and collaborated on GitHub.'
      ],
      technologies: ['React', 'Tailwind CSS', 'REST API']
    },
    {
      id: 'exp-3',
      company: 'Code Acme Pvt. Ltd.',
      logo: 'CA',
      title: 'Web Development Intern',
      employmentType: 'Internship',
      startDate: 'Jan 2023',
      endDate: 'May 2023',
      location: 'Bangalore, India',
      description: 'Assisted in developing and testing web applications.',
      responsibilities: [
        'Assisted in developing and testing web applications.',
        'Worked on bug fixes and improving UI/UX.',
        'Gained hands-on experience with HTML, CSS, and JavaScript.'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript']
    }
  ]);

  // Education List
  const [education, setEducation] = useState<PortfolioEducation[]>([
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Science',
      fieldOfStudy: 'Computer Science',
      institution: 'Indian Institute of Technology',
      logo: '🏛️',
      startYear: '2021',
      endYear: '2025',
      grade: 'COPA: 8.6/10',
      location: 'Bangalore, India',
      description: 'Coursework in Data Structures, Algorithms, DBMS, and Web Development.'
    },
    {
      id: 'edu-2',
      degree: 'Higher Secondary (12th)',
      fieldOfStudy: 'Science (PCM)',
      institution: 'Central Board of Secondary Education',
      logo: '🏫',
      startYear: '2019',
      endYear: '2021',
      grade: 'Percentage: 92%',
      location: 'India',
      description: 'Completed Higher Secondary with distinction in Physics, Chemistry, and Mathematics.'
    },
    {
      id: 'edu-3',
      degree: 'Secondary (10th)',
      fieldOfStudy: 'General Subjects',
      institution: 'Central Board of Secondary Education',
      logo: '🏫',
      startYear: '2018',
      endYear: '2019',
      grade: 'Percentage: 94%',
      location: 'India',
      description: 'Completed Secondary Education with top marks.'
    }
  ]);

  // Projects List
  const [projects, setProjects] = useState<PortfolioProject[]>([
    {
      id: 'proj-1',
      title: 'E-Commerce Website',
      description: 'A full-stack e-commerce application with cart, checkout and payments.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      githubUrl: 'https://github.com/aman-sharma/ecommerce',
      demoUrl: 'https://ecommerce-demo.me',
      featured: true,
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
      category: 'MERN Stack'
    },
    {
      id: 'proj-2',
      title: 'Task Management App',
      description: 'Organize tasks, set priorities and track progress in real-time.',
      tags: ['React', 'Node.js', 'Tailwind'],
      githubUrl: 'https://github.com/aman-sharma/taskmanager',
      demoUrl: 'https://taskmanager-demo.me',
      featured: true,
      image: 'https://images.unsplash.com/photo-1540350152520-345f1507da72?auto=format&fit=crop&q=80&w=800',
      category: 'MERN Stack'
    },
    {
      id: 'proj-3',
      title: 'Chat Application',
      description: 'Real-time chat application with authentication.',
      tags: ['Socket.IO', 'React', 'Node.js'],
      githubUrl: 'https://github.com/aman-sharma/chatapp',
      demoUrl: 'https://chatapp-demo.me',
      featured: false,
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800',
      category: 'Socket.IO'
    },
    {
      id: 'proj-4',
      title: 'Portfolio Website',
      description: 'My personal portfolio built with React and Tailwind CSS.',
      tags: ['React', 'Tailwind CSS'],
      githubUrl: 'https://github.com/aman-sharma/portfolio',
      demoUrl: 'https://portfolio-demo.me',
      featured: false,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      category: 'React'
    }
  ]);

  // Certifications List
  const [certifications, setCertifications] = useState<PortfolioCertification[]>([
    {
      id: 'cert-1',
      name: 'Meta Front-End Developer',
      issuer: 'Meta',
      issueDate: 'Jan 2024',
      credentialId: 'META-FE-2024',
      credentialUrl: 'https://coursera.org/verify',
      logo: '♾️'
    },
    {
      id: 'cert-2',
      name: 'MongoDB Developer Associate',
      issuer: 'MongoDB',
      issueDate: 'Oct 2023',
      credentialId: 'MDB-DEV-2023',
      credentialUrl: 'https://mongodb.com/verify',
      logo: '🍃'
    },
    {
      id: 'cert-3',
      name: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      issueDate: 'Jun 2023',
      credentialId: 'FCC-RWD-2023',
      credentialUrl: 'https://freecodecamp.org/verify',
      logo: '🔥'
    }
  ]);

  // Public URL calculation
  const publicUrl = `https://careerpulse.me/p/${handle || 'user'}`;

  // Copy link handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Profile Completion Calculation
  const calculateProfileStrength = () => {
    let points = 0;
    if (profile.fullName) points += 15;
    if (profile.title) points += 15;
    if (profile.aboutBio) points += 15;
    if (skills.length >= 4) points += 15;
    if (projects.length >= 2) points += 20;
    if (experiences.length >= 1) points += 10;
    if (socials.github && socials.linkedin) points += 10;
    return Math.min(100, points);
  };

  const profileStrength = calculateProfileStrength();

  // Contact submit handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', message: '' });
      setContactSubmitted(false);
    }, 4000);
  };

  // RENDER PURE PUBLIC PORTFOLIO WEBSITE
  const renderPublicPortfolio = () => (
    <div className={`min-h-screen bg-[#f8fafc] font-sans text-slate-800 antialiased transition-colors duration-300 pb-16`}>
      
      {/* 1. FLOATING NAV BAR */}
      <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full px-6 py-2.5 shadow-xs flex items-center justify-between">
          
          {/* Left: Avatar + Name + Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              AS
            </div>
            <div>
              <h1 className="text-xs font-bold text-slate-900 leading-none">
                {profile.fullName}
              </h1>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                {profile.title}
              </p>
            </div>
          </div>

          {/* Center: Nav Items (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
            <a href="#home" className="text-blue-600 font-bold flex flex-col items-center">
              <span>Home</span>
              <span className="w-4 h-0.5 bg-blue-600 rounded-full mt-0.5" />
            </a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
            <a href="#education" className="hover:text-blue-600 transition-colors">Education</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                document.documentElement.classList.toggle('dark');
              }}
              className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              <Moon className="w-4 h-4" />
            </button>
            
            <a
              href={profile.resumeUrl}
              download
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <span>Download CV</span>
              <Download className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white rounded-2xl border border-slate-200 p-4 shadow-xl flex flex-col gap-3 text-xs font-bold text-slate-700">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">About</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Projects</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Experience</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2">Contact</a>
            <a
              href={profile.resumeUrl}
              download
              className="mt-2 py-2.5 bg-blue-600 text-white rounded-xl text-center text-xs font-bold shadow-xs"
            >
              Download CV
            </a>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main id="home" className="max-w-6xl mx-auto px-4 mt-6 space-y-10">
        
        {/* 2. HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 sm:py-10">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Hello, I'm</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                {profile.fullName}
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-600 tracking-tight">
                {profile.title}
              </h2>
            </div>

            {/* Introduction Paragraph */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
              {profile.subtitle}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <a
                href="#projects"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                className="px-6 py-2.5 bg-white text-slate-800 border border-slate-200 font-bold rounded-full text-xs shadow-2xs hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Contact Me</span>
                <Mail className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>

            {/* Connect Socials */}
            <div className="pt-4 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 block">Connect with me</span>
              <div className="flex items-center gap-2">
                {socials.github && (
                  <a href={socials.github} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {socials.twitter && (
                  <a href={socials.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {socials.instagram && (
                  <a href={socials.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                <a href={`mailto:${profile.email}`} className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column Profile Headshot & Floating Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6 lg:py-0">
            
            {/* Soft backdrop circle with ring */}
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-blue-100/60 absolute -z-10 blur-xl" />
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-dashed border-blue-200 absolute -z-10" />

            {/* Profile Frame */}
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-64 h-64 sm:w-72 sm:h-72 rounded-full object-cover shadow-xl border-4 border-white"
              />

              {/* Floating Badge 1: Top Left - Available for freelance */}
              <div className="absolute top-2 -left-6 sm:-left-8 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-md flex items-center gap-2 text-[11px] font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for freelance</span>
              </div>

              {/* Floating Badge 2: Top Right - 10+ Projects Completed */}
              <div className="absolute top-6 -right-6 sm:-right-8 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-md flex items-center gap-2 text-[11px] font-bold text-slate-800">
                <span className="p-1 rounded-full bg-orange-100 text-orange-600 text-xs">🚀</span>
                <div>
                  <span className="font-extrabold text-slate-900 block leading-none">10+</span>
                  <span className="text-[9px] text-slate-500 font-normal">Projects Completed</span>
                </div>
              </div>

              {/* Floating Badge 3: Bottom Left - 2+ Years Experience */}
              <div className="absolute bottom-6 -left-8 sm:-left-10 bg-white px-3.5 py-2 rounded-2xl border border-slate-100 shadow-md flex items-center gap-2.5 text-xs">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 block leading-tight">{profile.experienceYears}</span>
                  <span className="text-[10px] text-slate-500 font-normal">Years Experience</span>
                </div>
              </div>

              {/* Floating Badge 4: Bottom Right - Open to Opportunities */}
              <div className="absolute bottom-4 -right-6 sm:-right-8 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-md flex items-center gap-2 text-[11px] font-bold text-slate-800">
                <span className="p-1 rounded-full bg-emerald-100 text-emerald-600 text-xs">👤</span>
                <span className="text-[11px]">Open to Opportunities</span>
              </div>
            </div>

          </div>

        </section>

        {/* 3. ABOUT & SKILLS CARD SECTION */}
        <section id="about" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: About Me */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">About Me</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {profile.aboutBio}
              </p>

              {/* Bullet Checklist */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-1.5 text-blue-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-slate-800 text-[11px]">Problem Solver</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-slate-800 text-[11px]">Clean Code Advocate</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-slate-800 text-[11px]">Fast Learner</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-slate-800 text-[11px]">Team Player</span>
                </div>
              </div>

              <div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-slate-200 rounded-full text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Illustration / Image */}
              <div className="pt-2">
                <img
                  src={profile.aboutImage}
                  alt="Developer working"
                  className="w-full h-36 object-cover rounded-2xl border border-slate-100 shadow-2xs"
                />
              </div>
            </div>

            {/* Right: My Skills */}
            <div id="skills" className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <Code className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">My Skills</h3>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {skills.map((s, idx) => (
                  <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-3 space-y-2 shadow-2xs hover:shadow-xs transition-shadow">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-[10px] text-blue-600">
                        {s.name.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="text-[10px] font-bold text-blue-600">{s.percentage}%</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block leading-tight">{s.name}</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${s.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer text */}
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
                <span className="font-bold text-slate-700">Others:</span> Tailwind CSS • Firebase • MySQL • REST API • GitHub
              </div>

            </div>

          </div>
        </section>

        {/* 4 & 5. EXPERIENCE AND EDUCATION (SIDE BY SIDE 2-COLUMN SECTION) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left: Work Experience Card */}
          <section id="experience" className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Experience</h3>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100 before:border-dashed">
              {experiences.map((exp, idx) => (
                <div key={exp.id} className="relative space-y-1.5">
                  <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center ring-4 ring-white">
                    {exp.company.charAt(0)}
                  </span>
                  
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{exp.company}</h4>
                      <p className="text-[11px] font-bold text-blue-600">{exp.title}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold text-slate-500 block">{exp.startDate} – {exp.endDate}</span>
                      <span className="text-[10px] text-slate-400 block">{exp.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-1 pl-3 list-disc text-[11px] text-slate-600">
                    {exp.responsibilities?.map((r, ri) => (
                      <li key={ri}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center border-t border-slate-100">
              <a href="#contact" className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
                <span>View Full Experience</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          {/* Right: Education Card */}
          <section id="education" className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Education</h3>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100 before:border-dashed">
              {education.map((edu) => (
                <div key={edu.id} className="relative space-y-1.5">
                  <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center ring-4 ring-white">
                    🏛️
                  </span>
                  
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{edu.degree}</h4>
                      <p className="text-[11px] text-slate-600 font-medium">{edu.institution}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                        {edu.grade}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold text-slate-500 block">{edu.startYear} – {edu.endYear}</span>
                      <span className="text-[10px] text-slate-400 block">{edu.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center border-t border-slate-100">
              <a href="#contact" className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
                <span>View Full Education</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

        </div>

        {/* 6. PROJECTS GALLERY */}
        <section id="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">My Projects</h3>
            </div>
            <a href="#projects" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  {/* Image Header */}
                  <div className="relative h-36 bg-slate-100 overflow-hidden">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-blue-600 text-white text-[9px] font-bold shadow-2xs">
                      {proj.category}
                    </span>
                  </div>

                  <div className="p-3.5 space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {proj.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                      {proj.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Tech icons & link */}
                <div className="p-3.5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <span>⚛️</span>
                    <span>🍃</span>
                  </div>
                  {proj.demoUrl && (
                    <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 p-1">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. CERTIFICATIONS & ACHIEVEMENTS (SIDE BY SIDE 2-COLUMN SECTION) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Certifications Card */}
          <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Certifications</h3>
              </div>
              <a href="#contact" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sm shrink-0">
                      {cert.logo}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{cert.name}</h4>
                      <p className="text-[10px] text-slate-500">{cert.issuer}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{cert.issueDate}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements Card */}
          <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Trophy className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Achievements</h3>
              </div>
              <a href="#contact" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-sm shrink-0">
                    🥇
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Winner - Hackindia 2024</h4>
                    <p className="text-[10px] text-slate-500">National Level Hackathon</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Feb 2024</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm shrink-0">
                    🟢
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">5 Star - Problem Solver</h4>
                    <p className="text-[10px] text-slate-500">HackerRank</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Dec 2023</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center text-sm shrink-0">
                    🐙
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Open Source Contributor</h4>
                    <p className="text-[10px] text-slate-500">GitHub</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Ongoing</span>
              </div>
            </div>
          </section>

        </div>

        {/* 8. RESUME DOWNLOAD CTA BANNER */}
        <section className="bg-blue-50/80 border border-blue-100 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-7 h-7" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-900">Want to know more about me?</h3>
              <p className="text-xs text-slate-600 max-w-md">
                Download my resume for a complete overview of my skills, experience and education.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={profile.resumeUrl}
              download
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-white text-blue-600 border border-blue-200 font-bold rounded-xl text-xs shadow-2xs hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Resume</span>
            </a>
          </div>
        </section>

        {/* 9. CONTACT SECTION */}
        <section id="contact" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Send className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Let's Connect</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Info Side */}
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Have a project in mind or want to talk about opportunities? Feel free to reach out.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="font-bold">Email:</span>
                  <a href={`mailto:${profile.email}`} className="text-slate-600 hover:underline">{profile.email}</a>
                </div>

                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="font-bold">Phone:</span>
                  <span className="text-slate-600">{profile.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="font-bold">Location:</span>
                  <span className="text-slate-600">{profile.location}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-700">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span className="font-bold">LinkedIn:</span>
                  <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-600 hover:underline truncate">linkedin.com/in/aman-sharma</a>
                </div>

                <div className="flex items-center gap-2 text-slate-700">
                  <Github className="w-4 h-4 text-blue-600" />
                  <span className="font-bold">GitHub:</span>
                  <a href={socials.github} target="_blank" rel="noreferrer" className="text-slate-600 hover:underline truncate">github.com/aman-sharma</a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-5">
              {contactSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-xs font-bold text-emerald-900">Message Sent Successfully!</h4>
                  <p className="text-[11px] text-emerald-700">Thank you for reaching out. I will respond to your email shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter subject"
                      value={contactForm.subject || ''}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Message</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Write your message..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Right Graphic Illustration */}
            <div className="hidden lg:flex lg:col-span-3 items-center justify-center pt-4">
              <div className="relative w-full h-48 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center justify-center">
                <div className="w-16 h-12 bg-blue-600 rounded-lg text-white flex items-center justify-center text-2xl shadow-md">
                  ✉️
                </div>
                <div className="absolute top-4 right-4 text-blue-500 text-xl animate-bounce">
                  ✈️
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* 10. FOOTER */}
      <footer className="mt-16 border-t border-slate-200 pt-10 max-w-6xl mx-auto px-4 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                AS
              </div>
              <h4 className="text-xs font-bold text-slate-900">{profile.fullName}</h4>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">{profile.title}</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">Building digital products that make a difference.</p>
          </div>

          <div>
            <h5 className="text-xs font-bold text-slate-900 mb-3">Quick Links</h5>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li><a href="#home" className="hover:text-blue-600">Home</a></li>
              <li><a href="#about" className="hover:text-blue-600">About</a></li>
              <li><a href="#projects" className="hover:text-blue-600">Projects</a></li>
              <li><a href="#experience" className="hover:text-blue-600">Experience</a></li>
              <li><a href="#education" className="hover:text-blue-600">Education</a></li>
              <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-slate-900 mb-3">Connect</h5>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li><a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-1.5"><Github className="w-3.5 h-3.5" /> GitHub</a></li>
              <li><a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</a></li>
              <li><a href={socials.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-1.5"><Twitter className="w-3.5 h-3.5" /> Twitter</a></li>
              <li><a href={socials.instagram} target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-1.5"><Instagram className="w-3.5 h-3.5" /> Instagram</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-slate-900 mb-2">Let's Stay in Touch</h5>
            <p className="text-[11px] text-slate-500 mb-2">Subscribe to get updates about my projects and articles.</p>
            <div className="flex items-center gap-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-600"
              />
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 cursor-pointer shrink-0">
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 font-normal">
          <span>© 2026 {profile.fullName}. All rights reserved.</span>
          <span>Made with ❤️ and lots of ☕</span>
        </div>
      </footer>

    </div>
  );

  // RENDER EDITOR / DASHBOARD MODE
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-6 pt-1.5">
      
      {/* Top Controls Header Bar */}
      <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-3 lg:px-4 mb-2">
        <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 sm:px-4 sm:py-2 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Globe className="w-3.5 h-3.5" />
              </span>
              <h1 className="text-base sm:text-lg font-black text-slate-900 font-display leading-tight">
                Shareable Portfolio Builder
              </h1>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Build & publish your personal portfolio website with custom URL handle, live themes & recruiter analytics.
            </p>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
            
            {/* View Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('editor')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                  viewMode === 'editor' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3 h-3" /> Editor
              </button>
              <button
                onClick={() => setViewMode('public')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                  viewMode === 'public' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3 h-3" /> Public View
              </button>
            </div>

            {/* Custom URL Input Pill */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-mono">
              <span className="text-slate-400 font-sans text-[10px] font-bold">URL:</span>
              <span className="text-slate-900 font-bold text-xs">careerpulse.me/p/</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                className="w-24 bg-white border border-slate-300 rounded px-1.5 py-0.5 text-xs font-bold text-indigo-600 outline-none"
              />
            </div>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            <button
              onClick={() => setShowShareModal(true)}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-200"
              title="Share Modal"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setShowQrModal(true)}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-200"
              title="Show QR Code"
            >
              <QrCode className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* If Public View toggle is active, show the standalone view */}
      {viewMode === 'public' ? (
        <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-3 lg:px-4">
          <div className="mb-3 bg-indigo-900 text-white p-2.5 rounded-xl flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Viewing Public Shareable Portfolio View
            </span>
            <button
              onClick={() => setViewMode('editor')}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg cursor-pointer text-xs"
            >
              Return to Dashboard Editor
            </button>
          </div>
          {renderPublicPortfolio()}
        </div>
      ) : (
        
        /* EDITOR SPLIT LAYOUT: Controls (5 cols) vs Live Canvas Preview (7 cols) */
        <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-3 lg:px-4 grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3">
          
          {/* Left Column: Profile Controls & Completion Bar (5 cols) */}
          <div className="lg:col-span-5 space-y-2 sm:space-y-2.5">
            
            {/* Profile Completion Strength Meter */}
            <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-3 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Portfolio Completion Strength
                </span>
                <span className="text-emerald-700 font-mono">{profileStrength}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${profileStrength}%` }} />
              </div>
            </div>

            {/* Editor Navigation Tabs */}
            <div className="bg-white border border-slate-200 rounded-xl p-1 shadow-2xs flex items-center gap-1 overflow-x-auto">
              {[
                { key: 'basic', label: 'Basic Info', icon: User },
                { key: 'about', label: 'About', icon: FileText },
                { key: 'skills', label: 'Skills', icon: Code },
                { key: 'experience', label: 'Experience', icon: Briefcase },
                { key: 'projects', label: 'Projects', icon: FolderGit2 },
                { key: 'theme', label: 'Themes', icon: Palette },
                { key: 'privacy', label: 'Privacy', icon: Lock },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeEditorTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveEditorTab(tab.key as any)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT EDITORS */}
            
            {/* Tab 1: Basic Info */}
            {activeEditorTab === 'basic' && (
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs space-y-2.5">
                <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-wider mb-0.5">Header & Contact Details</h3>
                
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-0.5">Full Name</label>
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-0.5">Professional Designation Title</label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-0.5">Hero Subtitle Tagline</label>
                    <textarea
                      value={profile.subtitle}
                      onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
                      rows={2}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-0.5">Headshot Profile Photo Image URL</label>
                    <input
                      type="text"
                      value={profile.avatarUrl}
                      onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-0.5">Location</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:border-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-0.5">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700">
                      <input
                        type="checkbox"
                        checked={profile.availableForFreelance}
                        onChange={(e) => setProfile({ ...profile, availableForFreelance: e.target.checked })}
                        className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Show "Available for Freelance" Badge</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: About Me */}
            {activeEditorTab === 'about' && (
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs space-y-2">
                <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-wider mb-0.5">Biography & Work Illustration</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-0.5">About Bio Paragraph</label>
                  <textarea
                    value={profile.aboutBio}
                    onChange={(e) => setProfile({ ...profile, aboutBio: e.target.value })}
                    rows={4}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-0.5">About Image URL</label>
                  <input
                    type="text"
                    value={profile.aboutImage}
                    onChange={(e) => setProfile({ ...profile, aboutImage: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
                  />
                </div>
              </div>
            )}

            {/* Tab: Skills */}
            {activeEditorTab === 'skills' && (
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Technical Skills ({skills.length})</h3>
                  <button
                    onClick={() => {
                      const newSkillName = prompt('Enter skill name:');
                      if (newSkillName) {
                        setSkills([...skills, { name: newSkillName, iconName: 'code', level: 'Intermediate', percentage: 80, color: '#4f46e5' }]);
                      }
                    }}
                    className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold rounded-md"
                  >
                    + Add Skill
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1">
                  {skills.map((s, idx) => (
                    <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-1">
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-800 block truncate">{s.name}</span>
                        <span className="text-[10px] text-slate-500">{s.level} • {s.percentage}%</span>
                      </div>
                      <button
                        onClick={() => setSkills(skills.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-red-500 p-0.5 text-xs font-bold"
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Experience */}
            {activeEditorTab === 'experience' && (
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Work Experience ({experiences.length})</h3>
                </div>
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {experiences.map((exp, idx) => (
                    <div key={exp.id || idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{exp.title}</span>
                        <span className="text-[10px] font-mono text-slate-500">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <div className="text-[11px] text-indigo-600 font-semibold">{exp.company} • {exp.location}</div>
                      <p className="text-[11px] text-slate-600 leading-tight">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Projects */}
            {activeEditorTab === 'projects' && (
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Portfolio Projects ({projects.length})</h3>
                </div>
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-indigo-50 text-indigo-700 font-bold rounded">{proj.category}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {proj.tags.map((t, i) => (
                          <span key={i} className="text-[9.5px] bg-white border border-slate-200 px-1.5 py-0.2 rounded text-slate-600">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Themes */}
            {activeEditorTab === 'theme' && (
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs space-y-2.5">
                <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Select Portfolio Color Palette</h3>
                
                <div className="grid grid-cols-1 gap-2">
                  {Object.values(themes).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveThemeId(t.id as any)}
                      className={`p-2.5 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                        activeThemeId === t.id
                          ? 'bg-indigo-50/50 border-indigo-600 ring-2 ring-indigo-500/20'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{t.name}</span>
                        <span className="text-[10px] text-slate-500">Light theme with custom accent pills</span>
                      </div>
                      <div className={`w-7 h-7 rounded-full ${t.primaryGradient} shadow-xs border border-white`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Privacy Settings */}
            {activeEditorTab === 'privacy' && (
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs space-y-2.5">
                <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Public Visibility & SEO</h3>
                
                <div className="space-y-1.5">
                  {[
                    { key: 'public', title: 'Public (Recommended)', desc: 'Anyone with the link can view, and search engines can index.' },
                    { key: 'unlisted', title: 'Unlisted Link Only', desc: 'Anyone with the direct URL link can view, hidden from search engines.' },
                    { key: 'private', title: 'Private Mode', desc: 'Only visible to you while logged in.' }
                  ].map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setPrivacy(p.key as any)}
                      className={`p-2.5 rounded-lg border text-left w-full cursor-pointer transition-all ${
                        privacy === p.key
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-900'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold block">{p.title}</span>
                      <span className="text-[10px] opacity-80">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Live Embedded Preview (7 cols) */}
          <div className="lg:col-span-7">
            <div className="sticky top-2 space-y-2">
              
              {/* Canvas Bar */}
              <div className="bg-slate-900 text-white py-1.5 px-3 rounded-xl shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold font-mono text-slate-200">Live Preview Canvas</span>
                </div>

                <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                      previewDevice === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3 h-3" /> Desktop
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                      previewDevice === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" /> Mobile
                  </button>
                </div>
              </div>

              {/* Live Render Canvas Container */}
              <div className={`transition-all mx-auto ${previewDevice === 'mobile' ? 'max-w-sm border-8 border-slate-900 rounded-3xl overflow-hidden' : 'w-full rounded-xl overflow-hidden border border-slate-200 shadow-md'}`}>
                {renderPublicPortfolio()}
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">Share Portfolio Profile</h3>
              <button onClick={() => setShowShareModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Send your personal portfolio link to recruiters, colleagues, or share directly on social networks.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between font-mono text-xs">
              <span className="truncate font-bold text-indigo-600">{publicUrl}</span>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer shrink-0 ml-2"
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out my personal portfolio website: ${publicUrl}`)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                Share on WhatsApp
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Portfolio QR Code</h3>
            <div className="w-48 h-48 mx-auto bg-slate-50 rounded-2xl border-2 border-slate-900 p-4 flex flex-col items-center justify-center shadow-inner">
              <QrCode className="w-28 h-28 text-slate-900" />
              <span className="text-[10px] font-mono text-slate-600 mt-2 font-bold">Scan to open portfolio</span>
            </div>
            <p className="text-xs text-slate-500 font-mono font-bold text-indigo-600">{publicUrl}</p>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
