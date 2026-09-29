import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Plus, 
  Trash2, 
  Check, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Link2, 
  Eye, 
  ArrowRight, 
  PenSquare, 
  ChevronRight, 
  Rocket, 
  Lightbulb, 
  Trophy, 
  Sliders, 
  X, 
  Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import boyWorkingHeroImg from '../../image1/boy_working_hero.png';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
  grade: string;
}

interface Project {
  id: string;
  title: string;
  techStack: string;
  link: string;
  description: string;
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
}

export const AtsResumeBuilderPage: React.FC = () => {
  const { candidateProfile } = useAuth();
  const formSectionRef = useRef<HTMLDivElement>(null);

  // Active Stepper (1 to 5)
  const [activeStep, setActiveStep] = useState<number>(1);

  // Active Section Modal for "Add Your Content"
  const [activeModal, setActiveModal] = useState<
    'experience' | 'education' | 'projects' | 'skills' | 'certifications' | 'achievements' | 'templates' | 'preview' | null
  >(null);

  // Personal Information & Links
  const [personalInfo, setPersonalInfo] = useState({
    fullName: candidateProfile?.fullName || 'ANANYA SHARMA',
    headline: candidateProfile?.headline || 'SENIOR FULL STACK SOFTWARE ENGINEER',
    email: candidateProfile?.email || 'ananya@email.com',
    phone: candidateProfile?.phone || '+91 98765 43210',
    location: candidateProfile?.location || 'Bengaluru, India',
    linkedin: 'https://linkedin.com/in/ananyasharma',
    portfolio: 'https://yourportfolio.com',
    summary: 'Results-driven Senior Full Stack Engineer with 4+ years of experience architecting high-scalability web applications using React, TypeScript, Node.js, and cloud microservices. Proven track record of optimizing frontend rendering performance by 42% and driving 99.9% platform uptime for over 1.2M active users.'
  });

  // Work Experiences
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'TechCorp Solutions India',
      position: 'Senior Software Engineer',
      location: 'Bengaluru, India',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      bullets: [
        'Led development of scalable web applications using React, Node.js and AWS.',
        'Improved application performance by 42% and reduced load time by 60%.',
        'Collaborated with cross-functional teams to deliver 10+ major features.'
      ]
    }
  ]);

  // Educations
  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      institution: 'Visvesvaraya Technological University',
      degree: 'B.E. Computer Science Engineering',
      fieldOfStudy: 'Computer Science',
      graduationYear: '2019 – 2023',
      grade: 'First Class'
    }
  ]);

  // Skills
  const [skills, setSkills] = useState<string[]>([
    'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'AWS', 'Docker', 'MySQL', 'HTML', 'CSS'
  ]);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Projects
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'CloudPulse Monitoring Engine',
      techStack: 'React, TypeScript, Go, Docker, AWS',
      link: 'https://github.com/ananya/cloudpulse',
      description: 'Engineered a real-time microservice monitoring tool with latency visualization and automated incident alerting.'
    }
  ]);

  // Certifications
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: '1',
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      year: '2023'
    }
  ]);

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'National Hackathon Winner 2023',
      description: 'Ranked 1st among 450+ engineering teams for building an AI-assisted healthcare diagnosis dashboard.',
      year: '2023'
    }
  ]);

  // Print / Download Handler
  const handleDownloadPdf = () => {
    window.print();
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Stepper Items
  const steps = [
    { num: 1, label: 'Personal Info' },
    { num: 2, label: 'Education' },
    { num: 3, label: 'Skills' },
    { num: 4, label: 'Projects' },
    { num: 5, label: 'Preview' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-20 pt-4 px-4 sm:px-6 lg:px-8 w-full max-w-[1400px] mx-auto">
      {/* Print Specific CSS */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 15mm 12mm 15mm;
          }
          body * {
            visibility: hidden;
          }
          #resume-preview-sheet, #resume-preview-sheet * {
            visibility: visible;
          }
          #resume-preview-sheet {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Hero Banner Section */}
      <div className="w-full mb-5 no-print">
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#EFF6FF] via-[#E8F1FC] to-[#F0F7FF] border border-blue-100 px-5 py-4 sm:px-8 sm:py-5 lg:px-8 lg:py-4 overflow-hidden shadow-2xs">
          
          {/* Floating Decorative Elements */}
          {/* Floating Document Icon */}
          <div className="hidden sm:flex absolute top-3 left-[46%] -translate-x-1/2 w-8 h-10 bg-white/95 rounded-lg shadow-sm border border-blue-200/70 items-center justify-center p-1.5 backdrop-blur-xs">
            <div className="w-full h-full flex flex-col justify-between">
              <div className="w-3.5 h-0.5 bg-blue-500 rounded-full" />
              <div className="space-y-0.5">
                <div className="w-full h-0.5 bg-blue-200 rounded-full" />
                <div className="w-3/4 h-0.5 bg-blue-200 rounded-full" />
                <div className="w-1/2 h-0.5 bg-blue-200 rounded-full" />
              </div>
            </div>
          </div>

          {/* Floating Green Bar Chart Card */}
          <div className="hidden md:flex absolute top-3 right-[28%] w-8 h-8 bg-white/95 rounded-lg shadow-sm border border-emerald-200 items-center justify-center p-1.5 backdrop-blur-xs">
            <div className="flex items-end gap-0.5 h-4">
              <div className="w-1 h-1.5 bg-emerald-400 rounded-xs" />
              <div className="w-1 h-2.5 bg-emerald-500 rounded-xs" />
              <div className="w-1 h-3.5 bg-emerald-600 rounded-xs" />
            </div>
          </div>

          {/* Floating Plan Build Grow Arrow & Star */}
          <div className="hidden lg:flex flex-col items-center absolute top-2.5 right-[6%] select-none">
            <div className="text-[11px] font-bold text-blue-700 tracking-tight leading-tight italic font-mono flex items-center gap-1">
              <span>Plan</span>
              <span className="text-blue-500">•</span>
              <span>Build</span>
              <span className="text-blue-500">•</span>
              <span>Grow</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-blue-500 text-xs font-bold">⤷</span>
              <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-500 flex items-center justify-center shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-2 z-10">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-blue-700 text-[11px] font-semibold shadow-2xs">
                <span>Build Your Professional Profile</span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-900 tracking-tight leading-tight">
                Create Your ATS-Friendly <br className="hidden sm:inline" />
                <span className="text-blue-600">Resume in Minutes.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
                Stand out with a professional resume that gets noticed by recruiters.
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-2.5 pt-1 flex-wrap">
                <button
                  onClick={scrollToForm}
                  className="px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Build My Resume</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>

                <button
                  onClick={() => setActiveModal('templates')}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
                >
                  <span>View Templates</span>
                </button>
              </div>
            </div>

            {/* Right Character Illustration */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <img
                src={boyWorkingHeroImg}
                alt="Student building resume with glitread"
                className="h-[170px] sm:h-[195px] lg:h-[210px] w-auto object-contain drop-shadow-md select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout (Two Columns) */}
      <div ref={formSectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: Stepper + Form Cards + Preview & Download  */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 space-y-6 no-print">
          
          {/* Stepper Bar */}
          <div className="flex items-center justify-between px-2 sm:px-4 py-2 border-b border-slate-200/80 overflow-x-auto select-none">
            {steps.map((s) => {
              const isActive = activeStep === s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => {
                    setActiveStep(s.num);
                    if (s.num === 2) setActiveModal('education');
                    if (s.num === 3) setActiveModal('skills');
                    if (s.num === 4) setActiveModal('projects');
                    if (s.num === 5) setActiveModal('preview');
                  }}
                  className={`flex items-center gap-2 pb-2 text-xs sm:text-sm font-semibold transition-all relative cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'border border-slate-300 text-slate-500 bg-white'
                    }`}
                  >
                    {s.num}
                  </span>
                  <span>{s.label}</span>

                  {/* Active Underline Indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Card 1: Personal Information & Links */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-sm sm:text-base text-slate-900">
                  Personal Information & Links
                </h2>
              </div>

              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                2 Pages (Auto Split)
              </span>
            </div>

            {/* Input Grid (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Target Role Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Target Role Title *</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={personalInfo.headline}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, headline: e.target.value })}
                    placeholder="e.g. Software Engineer"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* LinkedIn Profile */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">LinkedIn Profile</label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={personalInfo.linkedin}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/yourname"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Portfolio Link */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Portfolio Link</label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={personalInfo.portfolio}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, portfolio: e.target.value })}
                    placeholder="https://yourportfolio.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Add Your Content */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <PenSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-sm sm:text-base text-slate-900">Add Your Content</h2>
                <p className="text-xs text-slate-500">Fill in your details to build a professional resume.</p>
              </div>
            </div>

            {/* 6 Section Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {/* 1. Work Experience */}
              <button
                onClick={() => setActiveModal('experience')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Briefcase className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800">Work Experience</h3>
                    <p className="text-[11px] text-slate-500">Add your past and current roles</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* 2. Education */}
              <button
                onClick={() => setActiveModal('education')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/30 transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800">Education</h3>
                    <p className="text-[11px] text-slate-500">Add your degree and institution</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* 3. Projects */}
              <button
                onClick={() => setActiveModal('projects')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Code className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800">Projects</h3>
                    <p className="text-[11px] text-slate-500">Showcase your key projects</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* 4. Skills */}
              <button
                onClick={() => setActiveModal('skills')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Sliders className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800">Skills</h3>
                    <p className="text-[11px] text-slate-500">Highlight your technical & soft skills</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* 5. Certifications */}
              <button
                onClick={() => setActiveModal('certifications')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800">Certifications</h3>
                    <p className="text-[11px] text-slate-500">Add your certifications</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* 6. Achievements */}
              <button
                onClick={() => setActiveModal('achievements')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/30 transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Trophy className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800">Achievements</h3>
                    <p className="text-[11px] text-slate-500">Show your awards & recognitions</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

          {/* Card 3: 3. Preview & Download */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">3. Preview & Download</h3>
                <p className="text-xs text-slate-500">Check your resume preview and download it in your preferred format.</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={() => setActiveModal('preview')}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>Preview</span>
              </button>

              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Live Resume Preview + Tips + Download CTA   */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 space-y-4 sticky top-20">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between px-1 no-print">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">Live Resume Preview</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Single Column | Parse Rate: 99%</span>
          </div>

          {/* Printable Document Sheet Preview */}
          <div
            id="resume-preview-sheet"
            className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs font-sans space-y-4 text-slate-800 transition-all"
          >
            {/* Top Resume Header */}
            <div className="flex items-start gap-3.5 pb-2">
              {/* Circular Avatar */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/70">
                <GraduationCap className="w-7 h-7 text-blue-600" />
              </div>

              {/* Name & Contact Info */}
              <div className="space-y-0.5 min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-black text-blue-700 uppercase tracking-wide truncate">
                  {personalInfo.fullName || 'ANANYA SHARMA'}
                </h1>
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {personalInfo.headline || 'SENIOR FULL STACK SOFTWARE ENGINEER'}
                </p>

                {/* Contact Links Row */}
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap text-[10px] text-slate-600 pt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-blue-600" />
                    <span>{personalInfo.email}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-blue-600" />
                    <span>{personalInfo.phone}</span>
                  </span>
                  {personalInfo.linkedin && (
                    <span className="flex items-center gap-1 text-blue-600 font-medium">
                      <Link2 className="w-3 h-3" />
                      <span>LinkedIn</span>
                    </span>
                  )}
                  {personalInfo.portfolio && (
                    <span className="flex items-center gap-1 text-blue-600 font-medium">
                      <Globe className="w-3 h-3" />
                      <span>Portfolio</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 1. PROFESSIONAL SUMMARY */}
            <div className="space-y-1">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100 pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-[11px] text-slate-700 leading-relaxed pt-0.5">
                {personalInfo.summary}
              </p>
            </div>

            {/* 2. WORK EXPERIENCE */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100 pb-1">
                WORK EXPERIENCE
              </h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1 pt-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-900">
                      {exp.position} – <span className="font-medium text-slate-700">{exp.company}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-700 space-y-0.5 list-disc list-inside pl-0.5">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-snug">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 3. EDUCATION */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100 pb-1">
                EDUCATION
              </h2>
              {educations.map((edu) => (
                <div key={edu.id} className="space-y-0.5 pt-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{edu.graduationYear}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-600">
                    <span>{edu.institution}</span>
                    <span className="text-slate-500">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 4. SKILLS */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100 pb-1">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-[10px] font-semibold border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Tips Box */}
          <div className="bg-[#F0F7FF] border border-blue-100 rounded-2xl p-4 text-xs space-y-2 no-print">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              <span>Quick Tips</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-700 pl-1">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Use action verbs (Built, Developed, Created, etc.)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Keep your resume 1-2 pages</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Highlight relevant skills</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tailor it to the job you want</span>
              </li>
            </ul>
          </div>

          {/* Download Resume as PDF CTA Banner */}
          <div className="bg-[#EFF6FF]/70 border border-blue-100 rounded-2xl p-4 flex items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">Download your resume as PDF</div>
                <div className="text-[11px] text-slate-500">Get a professional, ATS-friendly resume.</div>
              </div>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm shadow-blue-500/20 flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION MODALS (Allows Editing Details for Each Section) */}
      {/* ======================================================== */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 capitalize">
                {activeModal === 'experience' && 'Edit Work Experience'}
                {activeModal === 'education' && 'Edit Education'}
                {activeModal === 'projects' && 'Edit Key Projects'}
                {activeModal === 'skills' && 'Manage Skills'}
                {activeModal === 'certifications' && 'Edit Certifications'}
                {activeModal === 'achievements' && 'Edit Achievements'}
                {activeModal === 'templates' && 'Select Resume Template'}
                {activeModal === 'preview' && 'Full Resume Preview'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Based on Active Section */}
            {activeModal === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newSkillInput.trim()) {
                        e.preventDefault();
                        if (!skills.includes(newSkillInput.trim())) {
                          setSkills([...skills, newSkillInput.trim()]);
                        }
                        setNewSkillInput('');
                      }
                    }}
                    placeholder="Type skill & press Enter (e.g. Next.js, Redux)"
                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
                        setSkills([...skills, newSkillInput.trim()]);
                        setNewSkillInput('');
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      {skill}
                      <button
                        onClick={() => setSkills(skills.filter((s) => s !== skill))}
                        className="hover:text-rose-600 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeModal === 'experience' && (
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={exp.id} className="p-3 border border-slate-200 rounded-xl space-y-3 bg-slate-50/50">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].company = e.target.value;
                            setExperiences(updated);
                          }}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Job Title</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].position = e.target.value;
                            setExperiences(updated);
                          }}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="text-xs">
                      <label className="font-bold text-slate-700 block mb-1">Key Achievements (Bullet Points)</label>
                      <textarea
                        rows={3}
                        value={exp.bullets.join('\n')}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].bullets = e.target.value.split('\n');
                          setExperiences(updated);
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeModal === 'education' && (
              <div className="space-y-4">
                {educations.map((edu, idx) => (
                  <div key={edu.id} className="p-3 border border-slate-200 rounded-xl space-y-3 bg-slate-50/50">
                    <div className="text-xs space-y-1">
                      <label className="font-bold text-slate-700">Institution / University</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...educations];
                          updated[idx].institution = e.target.value;
                          setEducations(updated);
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = [...educations];
                            updated[idx].degree = e.target.value;
                            setEducations(updated);
                          }}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Year</label>
                        <input
                          type="text"
                          value={edu.graduationYear}
                          onChange={(e) => {
                            const updated = [...educations];
                            updated[idx].graduationYear = e.target.value;
                            setEducations(updated);
                          }}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeModal === 'projects' && (
              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div key={proj.id} className="p-3 border border-slate-200 rounded-xl space-y-2 bg-slate-50/50 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[idx].title = e.target.value;
                          setProjects(updated);
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tech Stack</label>
                      <input
                        type="text"
                        value={proj.techStack}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[idx].techStack = e.target.value;
                          setProjects(updated);
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[idx].description = e.target.value;
                          setProjects(updated);
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeModal === 'certifications' && (
              <div className="space-y-3">
                {certifications.map((cert, idx) => (
                  <div key={cert.id} className="p-3 border border-slate-200 rounded-xl space-y-2 bg-slate-50/50 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Certificate Title</label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => {
                          const updated = [...certifications];
                          updated[idx].title = e.target.value;
                          setCertifications(updated);
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Issuer</label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => {
                            const updated = [...certifications];
                            updated[idx].issuer = e.target.value;
                            setCertifications(updated);
                          }}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Year</label>
                        <input
                          type="text"
                          value={cert.year}
                          onChange={(e) => {
                            const updated = [...certifications];
                            updated[idx].year = e.target.value;
                            setCertifications(updated);
                          }}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeModal === 'achievements' && (
              <div className="space-y-3">
                {achievements.map((ach, idx) => (
                  <div key={ach.id} className="p-3 border border-slate-200 rounded-xl space-y-2 bg-slate-50/50 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Award / Recognition Title</label>
                      <input
                        type="text"
                        value={ach.title}
                        onChange={(e) => {
                          const updated = [...achievements];
                          updated[idx].title = e.target.value;
                          setAchievements(updated);
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Summary</label>
                      <textarea
                        rows={2}
                        value={ach.description}
                        onChange={(e) => {
                          const updated = [...achievements];
                          updated[idx].description = e.target.value;
                          setAchievements(updated);
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeModal === 'templates' && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                {['Single Column ATS (Standard)', 'Tech & Engineering', 'Executive Clean', 'Academic & Research'].map((t, i) => (
                  <div
                    key={t}
                    onClick={() => setActiveModal(null)}
                    className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
                      i === 0 ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold' : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <div className="w-full h-20 bg-white border border-slate-200 rounded-lg mb-2 shadow-2xs flex flex-col p-2 space-y-1">
                      <div className="w-1/2 h-1.5 bg-blue-600 rounded-full" />
                      <div className="w-full h-1 bg-slate-200 rounded-full" />
                      <div className="w-3/4 h-1 bg-slate-200 rounded-full" />
                    </div>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            )}

            {activeModal === 'preview' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-600">
                  Your resume is formatted with 99% ATS parseability rate using clean standard semantic headers.
                </p>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={handleDownloadPdf}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Now</span>
                  </button>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
