import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Printer, 
  Copy, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  Github, 
  Eye, 
  Check, 
  RefreshCw,
  Zap,
  Target,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sliders,
  Layers,
  FileType,
  Columns
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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

export const AtsResumeBuilderPage: React.FC = () => {
  const { candidateProfile } = useAuth();

  // Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    fullName: candidateProfile?.fullName || 'Ananya Sharma',
    headline: candidateProfile?.headline || 'Senior Full Stack Software Engineer',
    email: candidateProfile?.email || 'ananya.sharma@example.com',
    phone: candidateProfile?.phone || '+91 98765 43210',
    location: candidateProfile?.location || 'Bengaluru, India',
    linkedin: 'linkedin.com/in/ananyasharma-dev',
    github: 'github.com/ananya-sharma',
    portfolio: 'ananyasharma.dev',
    summary: 'Results-driven Senior Full Stack Engineer with 4+ years of experience architecting high-scalability web applications using React, TypeScript, Node.js, and cloud microservices. Proven track record of optimizing frontend rendering performance by 42% and driving 99.9% platform uptime for over 1.2M active users.'
  });

  // Target Job Description Matcher
  const [targetJobDescription, setTargetJobDescription] = useState('');
  const [showJdMatcher, setShowJdMatcher] = useState(false);

  // Template & Style Config
  const [template, setTemplate] = useState<'harvard' | 'tech' | 'minimal' | 'executive'>('harvard');
  const [fontFamily, setFontFamily] = useState<'inter' | 'garamond' | 'times' | 'arial'>('inter');
  const [accentColor, setAccentColor] = useState<string>('#1e40af'); // Default Navy
  const [spacingDensity, setSpacingDensity] = useState<'compact' | 'normal' | 'spacious'>('normal');
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'ats-check'>('personal');

  // Work Experiences
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'TechCorp Solutions India',
      position: 'Senior Software Engineer',
      location: 'Bengaluru, KA',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      bullets: [
        'Spearheaded the redesign of core checkout flow using React & Redux Toolkit, increasing conversion rate by 18% across 500K monthly orders.',
        'Architected serverless RESTful APIs on AWS Lambda and Node.js, reducing latency by 35% and infrastructure cost by $12,000 annually.',
        'Mentored 6 junior developers in TypeScript best practices, automated CI/CD pipeline integration, and unit testing with Jest.'
      ]
    },
    {
      id: '2',
      company: 'Innovate Labs Pvt Ltd',
      position: 'Full Stack Web Developer',
      location: 'Hyderabad, TS',
      startDate: '2021-06',
      endDate: '2022-12',
      current: false,
      bullets: [
        'Developed interactive real-time analytics dashboard servicing 100K+ concurrent requests using WebSocket and Redis caching.',
        'Optimized PostgreSQL database queries and indexing strategies, improving API response time from 450ms to 85ms.',
        'Collaborated with cross-functional UX/UI design team to ensure 100% WCAG AA accessibility compliance across mobile and web.'
      ]
    }
  ]);

  // Educations
  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      institution: 'National Institute of Technology (NIT), Surathkal',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science & Engineering',
      graduationYear: '2021',
      grade: '8.8 / 10 CGPA'
    }
  ]);

  // Skills
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([
    'React.js', 'TypeScript', 'Node.js', 'Express.js', 'Next.js', 'PostgreSQL', 'MongoDB', 'AWS (Lambda, S3, EC2)', 'Docker', 'GraphQL', 'REST APIs', 'Tailwind CSS', 'Redux', 'Git'
  ]);
  const [newSkill, setNewSkill] = useState('');

  // Projects
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'CloudPulse - Infrastructure Performance Monitor',
      techStack: 'React, TypeScript, Golang, Docker, TimescaleDB',
      link: 'github.com/ananya-sharma/cloudpulse',
      description: 'Engineered an open-source real-time microservice monitoring tool with custom metrics visualization and automated Slack webhooks.'
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

  const [copied, setCopied] = useState(false);

  // MS Word-Style Page Distribution Logic: Multi-page allocator that dynamically pushes overflowing sections to Page 2, Page 3, etc.
  const pagesData = useMemo(() => {
    // A4 layout capacity points per page:
    // Compact: 135 points
    // Normal: 112 points (standard single A4 capacity for concise resume)
    // Spacious: 85 points (breathes easily into multiple pages)
    const pageBudget = spacingDensity === 'compact' ? 135 : spacingDensity === 'spacious' ? 85 : 112;

    interface PageSlot {
      pageNumber: number;
      experiences: Experience[];
      skills: string[];
      educations: Education[];
      projects: Project[];
      certifications: Certification[];
    }

    const pages: PageSlot[] = [];
    let currentIdx = 0;

    const createPage = (num: number): PageSlot => ({
      pageNumber: num,
      experiences: [],
      skills: [],
      educations: [],
      projects: [],
      certifications: []
    });

    let activePage = createPage(1);
    let usedBudget = 14; // Header cost on Page 1

    if (personalInfo.summary) {
      // Dynamic summary budget based on character count and explicit line breaks
      const explicitLines = personalInfo.summary.split('\n').length;
      const charLines = Math.ceil(personalInfo.summary.length / 68);
      const totalSummaryLines = Math.max(1, explicitLines, charLines);
      const summaryCost = 8 + (totalSummaryLines * 3.8);
      usedBudget += summaryCost;
    }

    // 1. Experiences
    for (const exp of experiences) {
      const expCost = 10 + (exp.bullets.length * 3);
      if (usedBudget + expCost > pageBudget && (activePage.experiences.length > 0 || currentIdx > 0)) {
        pages.push(activePage);
        currentIdx++;
        activePage = createPage(currentIdx + 1);
        usedBudget = 8; // Running header cost on subsequent pages
      }
      activePage.experiences.push(exp);
      usedBudget += expCost;
    }

    // 2. Technical Skills
    if (technicalSkills.length > 0) {
      const skillsCost = 6 + Math.ceil(technicalSkills.length / 5) * 2;
      if (usedBudget + skillsCost > pageBudget && (activePage.experiences.length > 0 || currentIdx > 0)) {
        pages.push(activePage);
        currentIdx++;
        activePage = createPage(currentIdx + 1);
        usedBudget = 8;
      }
      activePage.skills = technicalSkills;
      usedBudget += skillsCost;
    }

    // 3. Education
    if (educations.length > 0) {
      const eduCost = 6 + (educations.length * 6);
      if (usedBudget + eduCost > pageBudget && (activePage.experiences.length > 0 || activePage.skills.length > 0 || currentIdx > 0)) {
        pages.push(activePage);
        currentIdx++;
        activePage = createPage(currentIdx + 1);
        usedBudget = 8;
      }
      activePage.educations = educations;
      usedBudget += eduCost;
    }

    // 4. Projects
    if (projects.length > 0) {
      const projCost = 6 + (projects.length * 8);
      if (usedBudget + projCost > pageBudget && (activePage.experiences.length > 0 || activePage.skills.length > 0 || activePage.educations.length > 0 || currentIdx > 0)) {
        pages.push(activePage);
        currentIdx++;
        activePage = createPage(currentIdx + 1);
        usedBudget = 8;
      }
      activePage.projects = projects;
      usedBudget += projCost;
    }

    // 5. Certifications
    if (certifications.length > 0) {
      const certCost = 5 + (certifications.length * 3);
      if (usedBudget + certCost > pageBudget && (activePage.experiences.length > 0 || activePage.skills.length > 0 || activePage.educations.length > 0 || activePage.projects.length > 0 || currentIdx > 0)) {
        pages.push(activePage);
        currentIdx++;
        activePage = createPage(currentIdx + 1);
        usedBudget = 8;
      }
      activePage.certifications = certifications;
      usedBudget += certCost;
    }

    pages.push(activePage);
    return pages;
  }, [personalInfo, experiences, technicalSkills, educations, projects, certifications, spacingDensity]);

  const calculatedPages = pagesData.length;

  // ATS Optimization Analysis Logic
  const atsScoreDetails = useMemo(() => {
    let score = 0;
    const feedback: { pass: boolean; label: string; tip: string }[] = [];

    // 1. Personal Info Completeness (20 pts)
    const hasContact = personalInfo.fullName && personalInfo.email && personalInfo.phone && personalInfo.location;
    if (hasContact) {
      score += 20;
      feedback.push({ pass: true, label: 'Contact Details Included', tip: 'Full name, email, phone, and location are verified.' });
    } else {
      feedback.push({ pass: false, label: 'Incomplete Contact Details', tip: 'Ensure name, email, phone, and location are filled out.' });
    }

    // 2. Summary Length & Impact (15 pts)
    if (personalInfo.summary.length >= 100) {
      score += 15;
      feedback.push({ pass: true, label: 'Strong Summary Section', tip: 'Summary provides clear career focus and core tech stack.' });
    } else {
      feedback.push({ pass: false, label: 'Summary Too Brief', tip: 'Aim for at least 2-3 sentences highlighting experience and impact.' });
    }

    // 3. Experience Bullet Points & Action Verbs (25 pts)
    const totalBullets = experiences.reduce((acc, exp) => acc + exp.bullets.length, 0);
    const actionVerbs = ['spearheaded', 'architected', 'developed', 'optimized', 'engineered', 'increased', 'reduced', 'mentored', 'led', 'designed', 'built'];
    const textAll = experiences.flatMap(e => e.bullets).join(' ').toLowerCase();
    const hasActionVerbs = actionVerbs.some(verb => textAll.includes(verb));

    if (totalBullets >= 4 && hasActionVerbs) {
      score += 25;
      feedback.push({ pass: true, label: 'Strong Action Verbs & Achievements', tip: 'Contains power action verbs (Spearheaded, Architected, Optimized).' });
    } else {
      score += 10;
      feedback.push({ pass: false, label: 'Needs Action Verbs', tip: 'Start bullet points with strong action verbs like Led, Designed, Improved.' });
    }

    // 4. Measurable Numbers & Metrics (20 pts)
    const hasMetrics = /\d+%|\$\d+|\d+K|\d+\+/i.test(textAll) || /\d+/.test(personalInfo.summary);
    if (hasMetrics) {
      score += 20;
      feedback.push({ pass: true, label: 'Quantifiable Results Found', tip: 'Includes metrics like percentages (%), dollar amounts ($), or volume numbers.' });
    } else {
      feedback.push({ pass: false, label: 'Missing Metrics & Numbers', tip: 'Add quantifiable metrics (e.g., "Increased sales by 25%", "Managed 100K users").' });
    }

    // 5. Skills Count (10 pts)
    if (technicalSkills.length >= 6) {
      score += 10;
      feedback.push({ pass: true, label: 'Rich Technical Skills Section', tip: '6+ relevant industry skills listed for parsing.' });
    } else {
      feedback.push({ pass: false, label: 'Low Skill Keyword Count', tip: 'Add at least 6-10 relevant technical tools and frameworks.' });
    }

    // 6. Education Section (10 pts)
    if (educations.length > 0 && educations[0].degree && educations[0].institution) {
      score += 10;
      feedback.push({ pass: true, label: 'Standard Education Section', tip: 'Degree and institution properly specified.' });
    } else {
      feedback.push({ pass: false, label: 'Missing Education Details', tip: 'Add degree, major, and college name.' });
    }

    return { score, feedback };
  }, [personalInfo, experiences, educations, technicalSkills]);

  // Target JD Keyword Gap Analysis
  const jdKeywordAnalysis = useMemo(() => {
    if (!targetJobDescription.trim()) return null;

    const commonTechTerms = [
      'react', 'typescript', 'javascript', 'node.js', 'express', 'next.js', 'python', 'java', 'c++', 
      'aws', 'docker', 'kubernetes', 'postgresql', 'mongodb', 'graphql', 'rest api', 'ci/cd', 
      'redux', 'git', 'system design', 'agile', 'microservices', 'unit testing', 'jest', 'tailwind'
    ];

    const jdLower = targetJobDescription.toLowerCase();
    const resumeFullText = (
      personalInfo.summary + ' ' + 
      technicalSkills.join(' ') + ' ' + 
      experiences.flatMap(e => e.bullets).join(' ')
    ).toLowerCase();

    const matched: string[] = [];
    const missing: string[] = [];

    commonTechTerms.forEach(term => {
      if (jdLower.includes(term)) {
        if (resumeFullText.includes(term)) {
          matched.push(term);
        } else {
          missing.push(term);
        }
      }
    });

    const matchPercentage = matched.length + missing.length > 0 
      ? Math.round((matched.length / (matched.length + missing.length)) * 100) 
      : 0;

    return { matched, missing, matchPercentage };
  }, [targetJobDescription, personalInfo, technicalSkills, experiences]);

  // Handlers for dynamic sections
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: 'New Company',
      position: 'Software Developer',
      location: 'Location',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      bullets: ['Developed high quality software solutions.', 'Collaborated with cross-functional teams.']
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addExpBullet = (expId: string) => {
    setExperiences(experiences.map(e => {
      if (e.id === expId) {
        return { ...e, bullets: [...e.bullets, 'Achieved key objective using modern technical tools.'] };
      }
      return e;
    }));
  };

  const updateExpBullet = (expId: string, index: number, value: string) => {
    setExperiences(experiences.map(e => {
      if (e.id === expId) {
        const newBullets = [...e.bullets];
        newBullets[index] = value;
        return { ...e, bullets: newBullets };
      }
      return e;
    }));
  };

  const removeExpBullet = (expId: string, index: number) => {
    setExperiences(experiences.map(e => {
      if (e.id === expId) {
        return { ...e, bullets: e.bullets.filter((_, i) => i !== index) };
      }
      return e;
    }));
  };

  const addEducation = () => {
    setEducations([...educations, {
      id: Date.now().toString(),
      institution: 'University Name',
      degree: 'Degree / Diploma',
      fieldOfStudy: 'Field of Study',
      graduationYear: '2023',
      grade: '8.5 CGPA'
    }]);
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter(e => e.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim() && !technicalSkills.includes(newSkill.trim())) {
      setTechnicalSkills([...technicalSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setTechnicalSkills(technicalSkills.filter(s => s !== skill));
  };

  const addProject = () => {
    setProjects([...projects, {
      id: Date.now().toString(),
      title: 'Project Title',
      techStack: 'React, Node.js',
      link: 'github.com/username/project',
      description: 'Key feature highlights and outcomes delivered.'
    }]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const plainText = `
${personalInfo.fullName.toUpperCase()}
${personalInfo.headline}
Email: ${personalInfo.email} | Phone: ${personalInfo.phone} | Location: ${personalInfo.location}
LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github} | Portfolio: ${personalInfo.portfolio}

PROFESSIONAL SUMMARY
${personalInfo.summary}

WORK EXPERIENCE
${experiences.map(e => `
${e.position.toUpperCase()} - ${e.company} (${e.location})
${e.startDate} – ${e.current ? 'Present' : e.endDate}
${e.bullets.map(b => `• ${b}`).join('\n')}
`).join('\n')}

TECHNICAL SKILLS
${technicalSkills.join(', ')}

EDUCATION
${educations.map(e => `${e.degree} in ${e.fieldOfStudy} - ${e.institution} (${e.graduationYear}) - Grade: ${e.grade}`).join('\n')}

PROJECTS
${projects.map(p => `${p.title} (${p.techStack}): ${p.description} [${p.link}]`).join('\n')}
`.trim();

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAiEnhanceSummary = () => {
    setPersonalInfo(prev => ({
      ...prev,
      summary: `High-performing ${prev.headline} with expertise in building resilient, high-throughput Web applications. Demonstrated leadership in full-lifecycle SDLC, CI/CD orchestration, and API performance optimization resulting in measurable business metrics and enhanced user retention.`
    }));
  };

  const handleAddMissingSkill = (skillName: string) => {
    if (!technicalSkills.includes(skillName)) {
      setTechnicalSkills([...technicalSkills, skillName]);
    }
  };

  // Font class resolver
  const getFontClass = () => {
    switch (fontFamily) {
      case 'garamond': return 'font-serif';
      case 'times': return 'font-serif';
      case 'arial': return 'font-sans';
      default: return 'font-sans';
    }
  };

  // Density styling classes
  const getDensityClass = () => {
    switch (spacingDensity) {
      case 'compact':
        return {
          wrapper: 'p-6 sm:p-8 space-y-3',
          header: 'pb-2.5 mb-2.5',
          title: 'text-xl sm:text-2xl',
          sectionHeader: 'text-[11px] pb-0.5 mb-1',
          sectionBody: 'space-y-1.5',
          bodyText: 'text-[11px] leading-tight',
          bulletList: 'text-[11px] space-y-0.5 mt-0.5 pl-3.5',
        };
      case 'spacious':
        return {
          wrapper: 'p-8 sm:p-12 space-y-5',
          header: 'pb-5 mb-5',
          title: 'text-2xl sm:text-3xl',
          sectionHeader: 'text-xs pb-1 mb-2.5',
          sectionBody: 'space-y-4',
          bodyText: 'text-xs leading-relaxed',
          bulletList: 'text-xs space-y-1.5 mt-1.5 pl-4',
        };
      case 'normal':
      default:
        return {
          wrapper: 'p-8 sm:p-10 space-y-4',
          header: 'pb-4 mb-4',
          title: 'text-2xl sm:text-3xl',
          sectionHeader: 'text-xs pb-0.5 mb-2',
          sectionBody: 'space-y-3',
          bodyText: 'text-xs leading-snug',
          bulletList: 'text-xs space-y-1 mt-1 pl-4',
        };
    }
  };

  const density = getDensityClass();

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 pb-20 pt-3 px-2 sm:px-4 lg:px-6 w-full">
      {/* Print Specific CSS Styles */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm 12mm 10mm 12mm;
          }
          body * {
            visibility: hidden;
          }
          #printable-resume, #printable-resume * {
            visibility: visible;
          }
          #printable-resume {
            position: relative !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: transparent !important;
          }
          .a4-page-sheet {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: auto !important;
            background: white !important;
            page-break-after: always !important;
            break-after: page !important;
          }
          .a4-page-sheet:last-child {
            page-break-after: auto !important;
            break-after: auto !important;
          }
          .resume-section {
            break-inside: avoid-page !important;
            page-break-inside: avoid !important;
          }
          .resume-item {
            break-inside: avoid-page !important;
            page-break-inside: avoid !important;
          }
          .word-page-break {
            display: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Header Banner */}
      <div className="w-full mb-4 no-print">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                AI ATS Resume Builder & Analyzer
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Create 100% ATS-compliant single column resumes. Automatically accommodates single or 2-page formats without breaking sections.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${calculatedPages === 1 ? 'bg-emerald-500' : 'bg-blue-500'}`} />
              <span>{calculatedPages} {calculatedPages === 1 ? 'Page (Single A4)' : 'Pages (Accommodated)'}</span>
            </div>

            <button
              onClick={() => setShowJdMatcher(!showJdMatcher)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                showJdMatcher ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-amber-600" />
              <span>Target JD Matcher</span>
            </button>

            <button
              onClick={handleCopyText}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied Text!' : 'Copy Plain Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Download PDF / Print</span>
            </button>
          </div>
        </div>

        {/* Target JD Matcher Panel (Expandable) */}
        {showJdMatcher && (
          <div className="mt-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-600" />
                Paste Target Job Description (JD Keyword Matcher)
              </h3>
              {jdKeywordAnalysis && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                  {jdKeywordAnalysis.matchPercentage}% Keyword Match
                </span>
              )}
            </div>
            
            <textarea
              value={targetJobDescription}
              onChange={(e) => setTargetJobDescription(e.target.value)}
              placeholder="Paste job description here (e.g., 'Looking for Senior React, TypeScript, Node.js developer with Docker, AWS Lambda, GraphQL experience...')"
              className="w-full h-24 p-3 bg-white border border-amber-200 rounded-xl text-xs font-mono text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
            />

            {jdKeywordAnalysis && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                  <span className="font-bold text-emerald-900 block mb-1">
                    ✓ Matched Keywords ({jdKeywordAnalysis.matched.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {jdKeywordAnalysis.matched.map(kw => (
                      <span key={kw} className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                        {kw}
                      </span>
                    ))}
                    {jdKeywordAnalysis.matched.length === 0 && <span className="text-slate-400 italic">No direct keyword matches found.</span>}
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
                  <span className="font-bold text-rose-900 block mb-1">
                    ! Missing Keywords in Resume ({jdKeywordAnalysis.missing.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {jdKeywordAnalysis.missing.map(kw => (
                      <button
                        key={kw}
                        onClick={() => handleAddMissingSkill(kw)}
                        className="px-2 py-0.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                        title="Click to add to skills"
                      >
                        + {kw}
                      </button>
                    ))}
                    {jdKeywordAnalysis.missing.length === 0 && <span className="text-slate-500 italic">Great job! All detected JD keywords are in your resume.</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Workspace Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Side: Form Editor & Controls (5 Cols on LG) */}
        <div className="lg:col-span-5 space-y-4 no-print">
          
          {/* Template & Styling Control Bar */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-blue-600" /> Style & Page Setup
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                calculatedPages === 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {calculatedPages} {calculatedPages === 1 ? 'Page (A4 Standard)' : 'Pages (Auto Split)'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Template</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="harvard">Harvard Classic</option>
                  <option value="tech">Silicon Valley Tech</option>
                  <option value="minimal">Minimalist Clean</option>
                  <option value="executive">Executive Senior</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="inter">Inter (Modern)</option>
                  <option value="garamond">Garamond (Serif)</option>
                  <option value="times">Times New Roman</option>
                  <option value="arial">Arial (Standard)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Spacing Density</label>
                <select
                  value={spacingDensity}
                  onChange={(e) => setSpacingDensity(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="compact">Compact (Fit 1 Page)</option>
                  <option value="normal">Standard (Default)</option>
                  <option value="spacious">Spacious (2 Pages)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Accent Theme</label>
                <div className="flex items-center gap-2">
                  {[
                    { label: 'Navy', color: '#1e40af' },
                    { label: 'Slate', color: '#334155' },
                    { label: 'Emerald', color: '#047857' },
                    { label: 'Indigo', color: '#4338ca' },
                    { label: 'Charcoal', color: '#0f172a' }
                  ].map((item) => (
                    <button
                      key={item.color}
                      onClick={() => setAccentColor(item.color)}
                      className={`w-6 h-6 rounded-full transition-transform cursor-pointer border ${
                        accentColor === item.color ? 'scale-125 ring-2 ring-offset-2 ring-blue-500 border-white' : 'border-slate-300 hover:scale-110'
                      }`}
                      style={{ backgroundColor: item.color }}
                      title={item.label}
                    />
                  ))}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-medium block">
                  {calculatedPages > 1 
                    ? 'Content spans across 2 pages seamlessly'
                    : 'All content currently fits in single A4 page'}
                </span>
              </div>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-1.5 shadow-xs flex items-center gap-1 overflow-x-auto">
            {[
              { key: 'personal', label: 'Contact', icon: User },
              { key: 'experience', label: 'Work History', icon: Briefcase },
              { key: 'skills', label: 'Skills', icon: Code },
              { key: 'education', label: 'Education', icon: GraduationCap },
              { key: 'projects', label: 'Projects', icon: Layers },
              { key: 'ats-check', label: `ATS Score (${atsScoreDetails.score}%)`, icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content 1: Personal Info */}
          {activeTab === 'personal' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Personal Information & Links</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Role Title</label>
                  <input
                    type="text"
                    value={personalInfo.headline}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, headline: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Location</label>
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={personalInfo.linkedin}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">GitHub Profile</label>
                  <input
                    type="text"
                    value={personalInfo.github}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Portfolio Link</label>
                  <input
                    type="text"
                    value={personalInfo.portfolio}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, portfolio: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">Professional Summary</label>
                  <button
                    type="button"
                    onClick={handleAiEnhanceSummary}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" /> Auto-Enhance with AI
                  </button>
                </div>
                <textarea
                  value={personalInfo.summary}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                  rows={4}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed outline-none focus:border-blue-600"
                />
              </div>
            </div>
          )}

          {/* Tab Content 2: Experience */}
          {activeTab === 'experience' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Work Experience</h3>
                <button
                  type="button"
                  onClick={addExperience}
                  className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-blue-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Role
                </button>
              </div>

              {experiences.map((exp, expIdx) => (
                <div key={exp.id} className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3 relative">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-xs font-extrabold text-blue-900">Position #{expIdx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Company Name</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Job Title</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">End Date</label>
                      <input
                        type="text"
                        value={exp.current ? 'Present' : exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.current}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div>
                    <div className="flex items-center justify-between my-2">
                      <label className="text-[10px] font-extrabold uppercase text-slate-500">
                        Impact Accomplishment Bullet Points
                      </label>
                      <button
                        type="button"
                        onClick={() => addExpBullet(exp.id)}
                        className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add Bullet
                      </button>
                    </div>

                    <div className="space-y-2">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-1.5">
                          <span className="text-slate-400 text-xs mt-1">•</span>
                          <textarea
                            value={bullet}
                            onChange={(e) => updateExpBullet(exp.id, bIdx, e.target.value)}
                            rows={2}
                            className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeExpBullet(exp.id, bIdx)}
                            className="text-slate-300 hover:text-rose-500 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content 3: Skills */}
          {activeTab === 'skills' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Technical & Core Skills</h3>
              
              {/* Skill Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="e.g., Python, Kubernetes, System Design..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-blue-600"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Add
                </button>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {technicalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold border border-slate-200/80 flex items-center gap-1.5"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Popular Industry Quick Add Chips */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-2">
                  Quick Add Industry High-Demand Skills:
                </span>
                <div className="flex flex-wrap gap-1">
                  {['Docker', 'System Design', 'Microservices', 'GraphQL', 'AWS Lambda', 'Jest', 'CI/CD', 'Redis', 'Kafka', 'Agile Methodology'].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleAddMissingSkill(s)}
                      disabled={technicalSkills.includes(s)}
                      className="px-2 py-0.5 bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-40 disabled:hover:bg-blue-50 rounded text-[10px] font-bold border border-blue-200 cursor-pointer"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 4: Education */}
          {activeTab === 'education' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Education Details</h3>
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-blue-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add College
                </button>
              </div>

              {educations.map((edu, idx) => (
                <div key={edu.id} className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                    <span className="text-xs font-bold text-slate-800">Education #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Institution Name</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => setEducations(educations.map(x => x.id === edu.id ? { ...x, institution: e.target.value } : x))}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => setEducations(educations.map(x => x.id === edu.id ? { ...x, degree: e.target.value } : x))}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Field of Study</label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => setEducations(educations.map(x => x.id === edu.id ? { ...x, fieldOfStudy: e.target.value } : x))}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Graduation Year</label>
                      <input
                        type="text"
                        value={edu.graduationYear}
                        onChange={(e) => setEducations(educations.map(x => x.id === edu.id ? { ...x, graduationYear: e.target.value } : x))}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">CGPA / Grade</label>
                      <input
                        type="text"
                        value={edu.grade}
                        onChange={(e) => setEducations(educations.map(x => x.id === edu.id ? { ...x, grade: e.target.value } : x))}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content 5: Projects */}
          {activeTab === 'projects' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Key Projects</h3>
                <button
                  type="button"
                  onClick={addProject}
                  className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-blue-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              {projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                    <span className="text-xs font-bold text-slate-800">Project #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeProject(proj.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => setProjects(projects.map(p => p.id === proj.id ? { ...p, title: e.target.value } : p))}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Tech Stack</label>
                      <input
                        type="text"
                        value={proj.techStack}
                        onChange={(e) => setProjects(projects.map(p => p.id === proj.id ? { ...p, techStack: e.target.value } : p))}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Live / GitHub Link</label>
                      <input
                        type="text"
                        value={proj.link}
                        onChange={(e) => setProjects(projects.map(p => p.id === proj.id ? { ...p, link: e.target.value } : p))}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Description</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => setProjects(projects.map(p => p.id === proj.id ? { ...p, description: e.target.value } : p))}
                        rows={2}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content 6: Realtime ATS Score & Checklist */}
          {activeTab === 'ats-check' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Real-time ATS Compatibility Check</h3>
                  <p className="text-[11px] text-slate-500">Bypass Taleo, Workday, Greenhouse, and Lever filters</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-blue-600 font-display">{atsScoreDetails.score}%</span>
                  <span className="block text-[10px] font-bold text-emerald-600 uppercase">Top Grade</span>
                </div>
              </div>

              {/* Score Progress Bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${atsScoreDetails.score}%` }}
                />
              </div>

              {/* Checklist Breakdown */}
              <div className="space-y-2 pt-2">
                {atsScoreDetails.feedback.map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                    item.pass ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-amber-50/70 border-amber-200 text-amber-950'
                  }`}>
                    {item.pass ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-extrabold block">{item.label}</span>
                      <span className="text-[11px] opacity-80">{item.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Side: High Fidelity A4 Live Printable Resume Preview (7 Cols on LG) */}
        <div className="lg:col-span-7">
          <div className="sticky top-20">
            
            {/* Live Preview Label & Actions */}
            <div className="flex items-center justify-between mb-2 px-1 no-print">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-600" /> Live ATS Preview (A4 Standard)
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Single Column • Parse Rate: 99%</span>
            </div>

            {/* Printable Resume Document Container: Rendered as MS Word Physical A4 Paper Sheets */}
            <div id="printable-resume" className="w-full space-y-5">
              {pagesData.map((page, pageIdx) => (
                <div key={page.pageNumber} className="w-full space-y-4">
                  {/* MS Word Visual Page Break Bar between consecutive pages */}
                  {pageIdx > 0 && (
                    <div className="word-page-break my-4 flex items-center justify-center gap-3 select-none no-print">
                      <div className="h-px bg-slate-300 flex-1 shadow-xs" />
                      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-900 px-3.5 py-1 rounded-full text-xs font-bold shadow-xs">
                        <Columns className="w-3.5 h-3.5 text-blue-600" />
                        <span>MS Word Page Break — Overflow Pushed to Page {page.pageNumber}</span>
                      </div>
                      <div className="h-px bg-slate-300 flex-1 shadow-xs" />
                    </div>
                  )}

                  {/* Physical A4 Sheet */}
                  <div 
                    className={`a4-page-sheet bg-white border border-slate-300 rounded-sm shadow-xl w-full min-h-[920px] text-slate-900 transition-all flex flex-col ${density.wrapper} ${getFontClass()}`}
                    style={{ color: '#0f172a' }}
                  >
                    <div className="space-y-3.5">
                      {/* Top Header on Page 1 */}
                      {pageIdx === 0 && (
                        <div className={`border-b-2 text-center resume-section ${density.header}`} style={{ borderColor: accentColor }}>
                          <h1 className={`font-extrabold uppercase tracking-tight ${density.title}`} style={{ color: accentColor }}>
                            {personalInfo.fullName || 'YOUR FULL NAME'}
                          </h1>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mt-0.5">
                            {personalInfo.headline || 'PROFESSIONAL TITLE'}
                          </p>

                          {/* Contact Line */}
                          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-medium text-slate-700 mt-2">
                            {personalInfo.location && <span>{personalInfo.location}</span>}
                            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                            {personalInfo.email && <span>• {personalInfo.email}</span>}
                            {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                            {personalInfo.github && <span>• {personalInfo.github}</span>}
                            {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
                          </div>
                        </div>
                      )}

                      {/* Running Header on Page 2+ */}
                      {pageIdx > 0 && (
                        <div className="border-b pb-2 mb-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600" style={{ borderColor: accentColor }}>
                          <span style={{ color: accentColor }}>{personalInfo.fullName || 'Candidate'} — ATS Resume (Continued)</span>
                          <span className="text-slate-400 font-mono text-[10px]">Page {page.pageNumber} of {pagesData.length}</span>
                        </div>
                      )}

                      {/* Summary Section (Page 1 only) */}
                      {pageIdx === 0 && personalInfo.summary && (
                        <div className="resume-section">
                          <h2 className={`font-extrabold uppercase tracking-wider border-b ${density.sectionHeader}`} style={{ color: accentColor, borderColor: accentColor }}>
                            PROFESSIONAL SUMMARY
                          </h2>
                          <p className={`text-slate-800 text-left leading-relaxed break-words [overflow-wrap:anywhere] whitespace-pre-line ${density.bodyText}`}>
                            {personalInfo.summary}
                          </p>
                        </div>
                      )}

                      {/* Work Experience Section */}
                      {page.experiences.length > 0 && (
                        <div className="resume-section">
                          <h2 className={`font-extrabold uppercase tracking-wider border-b ${density.sectionHeader}`} style={{ color: accentColor, borderColor: accentColor }}>
                            {pageIdx > 0 ? 'WORK EXPERIENCE (CONTINUED)' : 'WORK EXPERIENCE'}
                          </h2>
                          <div className={density.sectionBody}>
                            {page.experiences.map((exp) => (
                              <div key={exp.id} className="resume-item">
                                <div className="flex items-start justify-between text-xs">
                                  <div>
                                    <span className="font-extrabold text-slate-900">{exp.position}</span>
                                    <span className="font-semibold text-slate-700"> — {exp.company}</span>
                                  </div>
                                  <div className="text-[11px] font-semibold text-slate-600 text-right">
                                    <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                    {exp.location && <span className="block text-[10px] text-slate-500">{exp.location}</span>}
                                  </div>
                                </div>

                                <ul className={`list-disc list-outside text-slate-800 break-words [overflow-wrap:anywhere] ${density.bulletList}`}>
                                  {exp.bullets.map((b, i) => (
                                    <li key={i} className="break-words [overflow-wrap:anywhere]">
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technical Skills Section */}
                      {page.skills.length > 0 && (
                        <div className="resume-section">
                          <h2 className={`font-extrabold uppercase tracking-wider border-b ${density.sectionHeader}`} style={{ color: accentColor, borderColor: accentColor }}>
                            TECHNICAL & CORE SKILLS
                          </h2>
                          <p className={`text-slate-800 font-medium break-words [overflow-wrap:anywhere] ${density.bodyText}`}>
                            {page.skills.join(' • ')}
                          </p>
                        </div>
                      )}

                      {/* Education Section */}
                      {page.educations.length > 0 && (
                        <div className="resume-section">
                          <h2 className={`font-extrabold uppercase tracking-wider border-b ${density.sectionHeader}`} style={{ color: accentColor, borderColor: accentColor }}>
                            EDUCATION
                          </h2>
                          <div className={density.sectionBody}>
                            {page.educations.map((edu) => (
                              <div key={edu.id} className="resume-item flex items-start justify-between text-xs">
                                <div>
                                  <span className="font-bold text-slate-900 break-words">{edu.degree} in {edu.fieldOfStudy}</span>
                                  <span className="block text-slate-700 break-words">{edu.institution}</span>
                                </div>
                                <div className="text-[11px] font-semibold text-slate-600 text-right shrink-0">
                                  <span>{edu.graduationYear}</span>
                                  {edu.grade && <span className="block text-[10px] text-slate-500">{edu.grade}</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Projects Section */}
                      {page.projects.length > 0 && (
                        <div className="resume-section">
                          <h2 className={`font-extrabold uppercase tracking-wider border-b ${density.sectionHeader}`} style={{ color: accentColor, borderColor: accentColor }}>
                            KEY PROJECTS
                          </h2>
                          <div className={density.sectionBody}>
                            {page.projects.map((proj) => (
                              <div key={proj.id} className="resume-item text-xs">
                                <div className="flex items-center justify-between font-bold text-slate-900 flex-wrap gap-1">
                                  <span className="break-words">{proj.title} <span className="font-normal text-slate-600">({proj.techStack})</span></span>
                                  {proj.link && <span className="text-[10px] font-mono text-slate-500 break-all">{proj.link}</span>}
                                </div>
                                <p className={`text-slate-700 mt-0.5 break-words [overflow-wrap:anywhere] ${density.bodyText}`}>{proj.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Certifications Section */}
                      {page.certifications.length > 0 && (
                        <div className="resume-section">
                          <h2 className={`font-extrabold uppercase tracking-wider border-b ${density.sectionHeader}`} style={{ color: accentColor, borderColor: accentColor }}>
                            CERTIFICATIONS
                          </h2>
                          <div className="space-y-1">
                            {page.certifications.map((cert) => (
                              <div key={cert.id} className="resume-item flex justify-between text-xs text-slate-800 font-medium">
                                <span>• {cert.title} — {cert.issuer}</span>
                                <span className="text-slate-500 text-[11px]">{cert.year}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
