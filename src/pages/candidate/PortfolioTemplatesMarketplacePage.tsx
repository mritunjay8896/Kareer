import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Folder, 
  ArrowRight, 
  Sun, 
  Moon, 
  Check, 
  RotateCcw, 
  Eye, 
  Sparkles, 
  Code2, 
  Palette, 
  GraduationCap, 
  User, 
  Briefcase, 
  ExternalLink, 
  X, 
  Monitor, 
  Smartphone,
  CheckCircle2,
  Layers,
  Globe,
  SlidersHorizontal
} from 'lucide-react';

export interface PortfolioTemplate {
  id: string;
  name: string;
  category: 'Developer' | 'Designer' | 'Student' | 'Creative' | 'Professional' | 'Personal';
  layoutStyle: 'light' | 'dark';
  colorTheme: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'slate';
  palette: string[];
  personName: string;
  role: string;
  tagline: string;
  avatar: string;
  ctaText: string;
  secondaryCtaText?: string;
  badges: string[];
  sections: string[];
  accentColor: string;
  previewBg: string;
}

export const PORTFOLIO_TEMPLATES: PortfolioTemplate[] = [
  {
    id: 'modern',
    name: 'Modern',
    category: 'Developer',
    layoutStyle: 'light',
    colorTheme: 'blue',
    palette: ['#2563EB', '#06B6D4', '#10B981', '#94A3B8'],
    personName: 'Alex Johnson',
    role: 'Full Stack Developer',
    tagline: 'I build modern web applications with clean code and great user experiences.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    ctaText: 'View My Work',
    secondaryCtaText: 'Contact Me',
    badges: ['React', 'TypeScript', 'Node.js'],
    sections: ['About Me', 'Skills', 'Projects', 'Contact'],
    accentColor: '#2563EB',
    previewBg: 'bg-white',
  },
  {
    id: 'dark-pro',
    name: 'Dark Pro',
    category: 'Developer',
    layoutStyle: 'dark',
    colorTheme: 'blue',
    palette: ['#1E293B', '#10B981', '#38BDF8', '#94A3B8'],
    personName: 'Alex Carter',
    role: 'Web Developer',
    tagline: 'Turning ideas into interactive web experiences.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    ctaText: 'View Projects',
    secondaryCtaText: 'Contact Me',
    badges: ['Next.js', 'PostgreSQL', 'Tailwind'],
    sections: ['About Me', 'Skills', 'Projects', 'Experience', 'Contact'],
    accentColor: '#38BDF8',
    previewBg: 'bg-slate-900',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'Designer',
    layoutStyle: 'light',
    colorTheme: 'orange',
    palette: ['#0F172A', '#F97316', '#FDBA74', '#F1F5F9'],
    personName: 'Taylor Smith',
    role: 'Creative Designer',
    tagline: 'Designing clean and meaningful experiences for the web.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    ctaText: 'View Portfolio',
    badges: ['UI/UX', 'Art Direction', 'Branding'],
    sections: ['About Me', 'Projects', 'Contact'],
    accentColor: '#0F172A',
    previewBg: 'bg-stone-50',
  },
  {
    id: 'creative',
    name: 'Creative',
    category: 'Creative',
    layoutStyle: 'light',
    colorTheme: 'pink',
    palette: ['#2563EB', '#EF4444', '#F97316', '#14B8A6'],
    personName: 'Priya Sharma',
    role: 'Graphic Designer & Illustrator',
    tagline: 'Bringing ideas to life through design and creativity.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    ctaText: 'View My Work',
    badges: ['Illustration', 'Visual Design', 'Motion'],
    sections: ['About Me', 'Skills', 'Projects', 'Contact'],
    accentColor: '#EC4899',
    previewBg: 'bg-gradient-to-br from-pink-50 via-white to-purple-50',
  },
  {
    id: 'professional',
    name: 'Professional',
    category: 'Professional',
    layoutStyle: 'light',
    colorTheme: 'blue',
    palette: ['#1D4ED8', '#4338CA', '#7C3AED', '#0F172A'],
    personName: 'Rohan Mehta',
    role: 'Software Engineer',
    tagline: 'Building scalable solutions with modern technologies.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    ctaText: 'View Projects',
    secondaryCtaText: 'Contact',
    badges: ['Java', 'Spring Boot', 'Cloud Architecture'],
    sections: ['About Me', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'],
    accentColor: '#1D4ED8',
    previewBg: 'bg-slate-50',
  },
  {
    id: 'clean',
    name: 'Clean',
    category: 'Designer',
    layoutStyle: 'light',
    colorTheme: 'green',
    palette: ['#059669', '#10B981', '#3B82F6', '#94A3B8'],
    personName: 'Sneha Kapoor',
    role: 'UI/UX Designer & Frontend Developer',
    tagline: 'Creating elegant and user-friendly digital experiences.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    ctaText: 'View Work',
    badges: ['Figma', 'React', 'Design Systems'],
    sections: ['About Me', 'Skills', 'Projects', 'Contact'],
    accentColor: '#059669',
    previewBg: 'bg-emerald-50/40',
  },
  {
    id: 'bold',
    name: 'Bold',
    category: 'Professional',
    layoutStyle: 'dark',
    colorTheme: 'green',
    palette: ['#064E3B', '#10B981', '#F59E0B'],
    personName: 'Arjun Patel',
    role: 'Product Designer Based in India',
    tagline: 'I design digital products that solve real problems.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80',
    ctaText: 'View Projects',
    badges: ['Product Strategy', 'Mobile UX', 'Design Ops'],
    sections: ['About Me', 'Projects', 'Experience', 'Contact'],
    accentColor: '#10B981',
    previewBg: 'bg-[#0a1914]',
  },
  {
    id: 'personal',
    name: 'Personal',
    category: 'Personal',
    layoutStyle: 'light',
    colorTheme: 'pink',
    palette: ['#EC4899', '#A855F7', '#94A3B8'],
    personName: 'Isabella Roy',
    role: 'Content Creator',
    tagline: 'Creating content that inspires and connects.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    ctaText: 'Watch My Work',
    badges: ['Storytelling', 'Video Production', 'Community'],
    sections: ['About Me', 'Projects', 'Contact'],
    accentColor: '#EC4899',
    previewBg: 'bg-rose-50/50',
  },
  {
    id: 'student',
    name: 'Student',
    category: 'Student',
    layoutStyle: 'light',
    colorTheme: 'blue',
    palette: ['#2563EB', '#0EA5E9', '#6366F1', '#94A3B8'],
    personName: 'Ananya Sen',
    role: 'Computer Science Undergrad',
    tagline: 'Aspiring software developer with a focus on web systems and algorithms.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    ctaText: 'View Projects',
    secondaryCtaText: 'Download Resume',
    badges: ['C++', 'Python', 'Web Dev', 'IIT Delhi'],
    sections: ['About Me', 'Education', 'Projects', 'Skills', 'Contact'],
    accentColor: '#2563EB',
    previewBg: 'bg-sky-50/40',
  },
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    category: 'Developer',
    layoutStyle: 'dark',
    colorTheme: 'slate',
    palette: ['#06B6D4', '#3B82F6', '#10B981', '#1E293B'],
    personName: 'Vikram Malhotra',
    role: 'Distributed Systems & Backend Engineer',
    tagline: 'Engineering high-throughput microservices and cloud infrastructures.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    ctaText: 'Explore Code',
    secondaryCtaText: 'GitHub',
    badges: ['Go', 'Kubernetes', 'Kafka', 'PostgreSQL'],
    sections: ['About Me', 'Skills', 'Projects', 'Experience', 'Contact'],
    accentColor: '#06B6D4',
    previewBg: 'bg-slate-950',
  },
  {
    id: 'ui-ux-designer',
    name: 'UI/UX Designer',
    category: 'Designer',
    layoutStyle: 'light',
    colorTheme: 'purple',
    palette: ['#8B5CF6', '#EC4899', '#6366F1', '#F1F5F9'],
    personName: 'Maya Lin',
    role: 'Product & Interaction Designer',
    tagline: 'Crafting delight through human-centered interfaces and intuitive design systems.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
    ctaText: 'Case Studies',
    secondaryCtaText: 'Figma Library',
    badges: ['Figma', 'Prototyping', 'User Research'],
    sections: ['About Me', 'Projects', 'Skills', 'Contact'],
    accentColor: '#8B5CF6',
    previewBg: 'bg-purple-50/40',
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    category: 'Professional',
    layoutStyle: 'light',
    colorTheme: 'green',
    palette: ['#0D9488', '#10B981', '#F59E0B', '#1E293B'],
    personName: 'Karan Joshi',
    role: 'BI & Data Analytics Specialist',
    tagline: 'Translating complex datasets into actionable business intelligence.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    ctaText: 'View Dashboards',
    secondaryCtaText: 'Insights',
    badges: ['SQL', 'Power BI', 'Python', 'Tableau'],
    sections: ['About Me', 'Skills', 'Projects', 'Experience', 'Contact'],
    accentColor: '#0D9488',
    previewBg: 'bg-teal-50/40',
  },
];

export const PortfolioTemplatesMarketplacePage: React.FC = () => {
  const navigate = useNavigate();

  // Active Category Filter
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Sidebar Filters
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedLayout, setSelectedLayout] = useState<'all' | 'light' | 'dark'>('all');
  const [selectedSections, setSelectedSections] = useState<string[]>([
    'About Me',
    'Skills',
    'Projects',
    'Contact',
  ]);

  // Modal Preview State
  const [previewTemplate, setPreviewTemplate] = useState<PortfolioTemplate | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Filter Categories
  const categories = [
    { id: 'All', label: 'All Templates', icon: Layers },
    { id: 'Developer', label: 'Developer', icon: Code2 },
    { id: 'Designer', label: 'Designer', icon: Palette },
    { id: 'Student', label: 'Student', icon: GraduationCap },
    { id: 'Creative', label: 'Creative', icon: Sparkles },
    { id: 'Personal', label: 'Personal', icon: User },
    { id: 'Professional', label: 'Professional', icon: Briefcase },
  ];

  // Color Swatches
  const colorSwatches = [
    { id: 'blue', color: '#2563EB', label: 'Blue' },
    { id: 'purple', color: '#8B5CF6', label: 'Purple' },
    { id: 'green', color: '#10B981', label: 'Green' },
    { id: 'orange', color: '#F59E0B', label: 'Orange' },
    { id: 'pink', color: '#EC4899', label: 'Pink' },
    { id: 'slate', color: '#64748B', label: 'Slate' },
  ];

  // Available Sections for Checkbox List
  const availableSections = [
    'About Me',
    'Skills',
    'Projects',
    'Experience',
    'Education',
    'Contact',
  ];

  // Toggle Section Filter
  const toggleSection = (section: string) => {
    setSelectedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedColor('all');
    setSelectedLayout('all');
    setSelectedSections(['About Me', 'Skills', 'Projects', 'Contact']);
  };

  // Filtered Templates
  const filteredTemplates = useMemo(() => {
    return PORTFOLIO_TEMPLATES.filter((tpl) => {
      // Category Match
      if (selectedCategory !== 'All' && tpl.category !== selectedCategory) {
        return false;
      }

      // Color Match
      if (selectedColor !== 'all' && tpl.colorTheme !== selectedColor) {
        return false;
      }

      // Layout Style Match
      if (selectedLayout !== 'all' && tpl.layoutStyle !== selectedLayout) {
        return false;
      }

      // Sections Match: If user has strict selections, check if template contains at least one selected section
      if (selectedSections.length > 0) {
        const hasMatchingSection = selectedSections.some((s) => tpl.sections.includes(s));
        if (!hasMatchingSection) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedColor, selectedLayout, selectedSections]);

  // Navigate to Builder with preloaded template
  const handleUseTemplate = (templateId: string) => {
    navigate(`/portfolio-builder?template=${templateId}`);
  };

  return (
    <div className="w-full bg-[#FAFCFF] min-h-screen text-slate-900 font-sans pb-16">
      
      {/* =========================================================================
          1. HERO HEADER SECTION (Matching Screenshot)
          ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 pb-8 sm:pb-12 bg-white border-b border-slate-100 overflow-hidden">
        {/* Soft background ambient gradient lights */}
        <div className="absolute top-0 right-1/3 w-[550px] h-[350px] bg-blue-50/80 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Heading, Subtitle, CTA */}
            <div className="lg:col-span-6 space-y-4 text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-bold shadow-2xs">
                <Folder className="w-3.5 h-3.5 fill-blue-600/20 text-blue-600" />
                <span>Portfolio Website</span>
              </div>

              {/* Large Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-900 tracking-tight leading-[1.12] font-display">
                Choose Your Template, <br />
                <span className="text-[#1565ED]">Build Your Portfolio</span>
              </h1>

              {/* Minimal Subtitle */}
              <p className="text-sm sm:text-base text-slate-500 max-w-lg font-normal leading-relaxed">
                Pick from professionally designed templates and create your personal portfolio website in minutes.
              </p>

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleUseTemplate('modern')}
                  className="inline-flex items-center gap-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <span>Create Your Portfolio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: 3D Layered Cards Showcase Graphic matching screenshot */}
            <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[560px] h-[250px] sm:h-[300px] flex items-center justify-center">
                
                {/* Left Card: Tilted Light Card */}
                <div className="absolute -left-2 sm:left-2 top-8 w-44 sm:w-56 bg-white rounded-xl shadow-lg border border-slate-200/90 p-3 transform -rotate-12 hover:-rotate-6 transition-transform duration-300 pointer-events-none select-none z-10 opacity-90 hidden sm:block">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200" />
                    <div className="text-[9px] font-bold text-slate-800">Your Name</div>
                  </div>
                  <div className="text-[11px] font-extrabold text-slate-900 leading-tight">
                    Hi, I'm Alex Designer
                  </div>
                  <div className="text-[8px] text-slate-400 mt-0.5">
                    I build modern web apps
                  </div>
                  <div className="mt-2 w-16 h-4 bg-slate-900 rounded text-[7px] text-white font-bold flex items-center justify-center">
                    Contact Work
                  </div>
                </div>

                {/* Center Hero Card: Dark Pro Mockup matching screenshot */}
                <div className="relative w-72 sm:w-96 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-3.5 sm:p-4 text-left z-20 transform hover:scale-[1.02] transition-transform">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800 text-[9px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-bold text-white ml-2">Name</span>
                    </div>
                    <div className="flex items-center gap-2 text-[8px] sm:text-[9px]">
                      <span className="text-white font-bold">Home</span>
                      <span>About</span>
                      <span>Projects</span>
                      <span>Contact</span>
                    </div>
                  </div>

                  {/* Body with Alex Carter */}
                  <div className="grid grid-cols-12 gap-2 items-center py-1">
                    <div className="col-span-7 space-y-1">
                      <div className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                        Hi, I'm Alex Carter
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-blue-400">
                        Full Stack Developer
                      </div>
                      <p className="text-[8px] sm:text-[9px] text-slate-400 leading-snug line-clamp-2">
                        I build modern web applications with clean code and great user experiences.
                      </p>
                      <div className="flex items-center gap-1.5 pt-1.5">
                        <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[8px]">
                          View My Work
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[8px]">
                          Contact Me
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[8px] text-slate-400 pt-1">
                        <span>in</span>
                        <span>•</span>
                        <span>git</span>
                        <span>•</span>
                        <span>𝕏</span>
                      </div>
                    </div>

                    <div className="col-span-5 flex justify-end">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
                        alt="Alex Carter"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-blue-500/80 shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Card: Tilted Creative Card */}
                <div className="absolute -right-2 sm:right-2 top-4 w-44 sm:w-56 bg-white rounded-xl shadow-lg border border-slate-200/90 p-3 transform rotate-12 hover:rotate-6 transition-transform duration-300 pointer-events-none select-none z-10 opacity-90 hidden sm:block">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  </div>
                  <div className="text-[11px] font-extrabold text-slate-900 leading-tight">
                    UI Designer & Creator
                  </div>
                  <div className="text-[8px] text-slate-400 mt-1">
                    Design portfolio showcase
                  </div>
                  <div className="mt-2 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded border border-blue-100 flex items-center justify-center text-[8px] text-blue-600 font-bold">
                    Project Gallery
                  </div>
                </div>

                {/* Sparkle & doodle accents */}
                <div className="absolute top-2 left-1/4 text-blue-400 text-xs pointer-events-none">
                  ✦
                </div>
                <div className="absolute bottom-4 right-1/4 text-indigo-400 text-xs pointer-events-none">
                  ✦
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CATEGORY PILLS BAR (Matching Screenshot)
          ========================================================================= */}
      <section className="w-full bg-white border-b border-slate-200/80 py-3.5 px-4 sm:px-6 lg:px-8 sticky top-[64px] z-30 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="max-w-[1360px] mx-auto flex items-center justify-center sm:justify-start gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1565ED] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100/80 text-slate-600 border border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. MAIN CONTENT: SIDEBAR + TEMPLATE GRID (Matching Screenshot)
          ========================================================================= */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          
          {/* ---------------------------------------------------------------------
              LEFT COLUMN: CUSTOMIZE YOUR PORTFOLIO SIDEBAR (Matching Screenshot)
             --------------------------------------------------------------------- */}
          <aside className="w-full lg:w-64 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs text-left shrink-0 lg:sticky lg:top-28">
            <h3 className="font-extrabold text-sm text-slate-900 pb-3 border-b border-slate-100">
              Customize Your Portfolio
            </h3>

            {/* Filter Group 1: Color Theme */}
            <div className="pt-4 space-y-2.5">
              <label className="block text-xs font-bold text-slate-700">
                Color Theme
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {colorSwatches.map((swatch) => {
                  const isSelected = selectedColor === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setSelectedColor(isSelected ? 'all' : swatch.id)}
                      className={`w-6 h-6 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                        isSelected ? 'scale-110 ring-2 ring-blue-500 ring-offset-2' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: swatch.color }}
                      title={swatch.label}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Group 2: Layout Style */}
            <div className="pt-5 space-y-2.5">
              <label className="block text-xs font-bold text-slate-700">
                Layout Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLayout(selectedLayout === 'light' ? 'all' : 'light')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedLayout === 'light'
                      ? 'bg-blue-50/80 border-blue-500 text-blue-700 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLayout(selectedLayout === 'dark' ? 'all' : 'dark')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedLayout === 'dark'
                      ? 'bg-blue-50/80 border-blue-500 text-blue-700 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            {/* Filter Group 3: Sections Checkboxes */}
            <div className="pt-5 space-y-2.5">
              <label className="block text-xs font-bold text-slate-700">
                Sections
              </label>
              <div className="space-y-2">
                {availableSections.map((sec) => {
                  const isChecked = selectedSections.includes(sec);
                  return (
                    <label
                      key={sec}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSection(sec)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                      />
                      <span>{sec}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter Reset Button */}
            <div className="pt-6 border-t border-slate-100 mt-6">
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full py-2 px-3 rounded-xl border border-blue-200/90 text-blue-600 hover:bg-blue-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </aside>

          {/* ---------------------------------------------------------------------
              RIGHT COLUMN: TEMPLATE CARDS GALLERY (Matching Screenshot)
             --------------------------------------------------------------------- */}
          <div className="flex-1 w-full space-y-4">
            
            {/* Gallery Header info */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <div>
                Showing <strong className="text-slate-900 font-bold">{filteredTemplates.length}</strong> portfolio templates
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-blue-600 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Free & Custom Hostable</span>
              </div>
            </div>

            {/* Templates Grid: 4 columns matching screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredTemplates.map((template) => {
                const isDark = template.layoutStyle === 'dark';

                return (
                  <div
                    key={template.id}
                    className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Top Website Preview Window Mockup */}
                    <div 
                      className={`relative p-3 border-b border-slate-100 cursor-pointer overflow-hidden ${
                        isDark ? 'bg-slate-900 text-white' : template.previewBg
                      }`}
                      onClick={() => setPreviewTemplate(template)}
                    >
                      {/* Browser Mockup Dot Bar */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/30 text-[8px]">
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[8px] text-slate-400">
                          <span>Home</span>
                          <span>About</span>
                          <span>Projects</span>
                        </div>
                      </div>

                      {/* Mockup Card Hero Content */}
                      <div className="flex items-start justify-between gap-2 min-h-[96px] text-left">
                        <div className="space-y-1 min-w-0">
                          <div className={`text-[11px] font-extrabold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {template.personName}
                          </div>
                          <div className="text-[9.5px] font-bold text-blue-500 truncate">
                            {template.role}
                          </div>
                          <p className={`text-[8px] line-clamp-2 leading-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {template.tagline}
                          </p>

                          {/* Mini simulated button */}
                          <div className="pt-1.5 flex items-center gap-1">
                            <span 
                              className="px-2 py-0.5 rounded text-[7.5px] font-bold text-white shadow-2xs"
                              style={{ backgroundColor: template.accentColor }}
                            >
                              {template.ctaText}
                            </span>
                          </div>
                        </div>

                        {/* Avatar */}
                        <img
                          src={template.avatar}
                          alt={template.personName}
                          className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-200/60 shadow-2xs mt-0.5 group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Hover Overlay with Quick Preview Icon */}
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewTemplate(template);
                          }}
                          className="px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-bold shadow-md hover:bg-slate-50 flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600" />
                          <span>Preview</span>
                        </button>
                      </div>
                    </div>

                    {/* Bottom Info & Action Bar */}
                    <div className="p-3 text-left space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-xs sm:text-[13px] text-slate-900 font-display">
                          {template.name}
                        </h4>

                        {/* Color Theme Dot Indicators */}
                        <div className="flex items-center gap-1">
                          {template.palette.map((hex, i) => (
                            <span
                              key={i}
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Buttons Row: Preview & Use Template */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => setPreviewTemplate(template)}
                          className="flex-1 py-1.5 px-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition-colors cursor-pointer text-center"
                        >
                          Preview
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUseTemplate(template.id)}
                          className="flex-1 py-1.5 px-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white rounded-lg text-[11px] font-bold shadow-2xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
                        >
                          <span>Use</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Zero results fallback */}
            {filteredTemplates.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">No templates match your filters</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing some of your sidebar filter options or click below to view all templates.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* =========================================================================
          4. INTERACTIVE MODAL PREVIEW (When clicking "Preview")
          ========================================================================= */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-5xl w-full border border-slate-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-left">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <span>{previewTemplate.name} Template Preview</span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                      {previewTemplate.category}
                    </span>
                  </h3>
                </div>
              </div>

              {/* Center Device Toggles */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                    previewDevice === 'desktop' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                    previewDevice === 'mobile' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
              </div>

              {/* Right Modal Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUseTemplate(previewTemplate.id)}
                  className="px-4 py-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Canvas */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/70 flex items-center justify-center">
              <div 
                className={`transition-all duration-300 w-full rounded-2xl shadow-lg border border-slate-200 overflow-hidden ${
                  previewDevice === 'mobile' ? 'max-w-sm' : 'max-w-4xl'
                } ${previewTemplate.layoutStyle === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}
              >
                {/* Mockup Navbar */}
                <div className={`p-4 border-b flex items-center justify-between ${
                  previewTemplate.layoutStyle === 'dark' ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-white'
                }`}>
                  <div className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: previewTemplate.accentColor }}
                    />
                    <span>{previewTemplate.personName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                    <span className="text-blue-500">Home</span>
                    <span>Projects</span>
                    <span>Skills</span>
                    <span>Contact</span>
                  </div>
                </div>

                {/* Hero Showcase inside Modal */}
                <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3 text-left">
                    <div 
                      className="inline-block px-2.5 py-1 rounded text-xs font-bold"
                      style={{ 
                        backgroundColor: `${previewTemplate.accentColor}20`,
                        color: previewTemplate.accentColor 
                      }}
                    >
                      {previewTemplate.role}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                      Hi, I'm {previewTemplate.personName}
                    </h2>

                    <p className={`text-xs sm:text-sm leading-relaxed max-w-lg ${
                      previewTemplate.layoutStyle === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {previewTemplate.tagline}
                    </p>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {previewTemplate.badges.map((b) => (
                        <span
                          key={b}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                            previewTemplate.layoutStyle === 'dark'
                              ? 'bg-slate-800 text-slate-300'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2.5 pt-3">
                      <button 
                        type="button"
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer"
                        style={{ backgroundColor: previewTemplate.accentColor }}
                      >
                        {previewTemplate.ctaText}
                      </button>
                      {previewTemplate.secondaryCtaText && (
                        <button 
                          type="button"
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                            previewTemplate.layoutStyle === 'dark'
                              ? 'border-slate-700 text-slate-300'
                              : 'border-slate-200 text-slate-700'
                          }`}
                        >
                          {previewTemplate.secondaryCtaText}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-4 flex justify-center">
                    <img
                      src={previewTemplate.avatar}
                      alt={previewTemplate.personName}
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 shadow-xl"
                      style={{ borderColor: previewTemplate.accentColor }}
                    />
                  </div>
                </div>

                {/* Simulated Projects Section inside Modal */}
                <div className={`p-6 border-t text-left ${
                  previewTemplate.layoutStyle === 'dark' ? 'border-slate-800 bg-slate-950/40' : 'border-slate-100 bg-slate-50/50'
                }`}>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Featured Projects
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className={`p-3 rounded-xl border ${
                      previewTemplate.layoutStyle === 'dark' ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
                    }`}>
                      <h4 className="font-bold text-xs">E-Commerce Microservices</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Full-stack web application with payment integration.</p>
                    </div>
                    <div className={`p-3 rounded-xl border ${
                      previewTemplate.layoutStyle === 'dark' ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
                    }`}>
                      <h4 className="font-bold text-xs">AI Chat & Analytics SaaS</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Real-time collaboration dashboard with vector search.</p>
                    </div>
                    <div className={`p-3 rounded-xl border ${
                      previewTemplate.layoutStyle === 'dark' ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
                    }`}>
                      <h4 className="font-bold text-xs">Mobile Health Tracker</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Cross-platform React Native fitness dashboard.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                You can customize all text, colors, projects, and avatar once opened in the builder.
              </span>
              <button
                type="button"
                onClick={() => handleUseTemplate(previewTemplate.id)}
                className="px-5 py-2.5 bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Customize This Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
