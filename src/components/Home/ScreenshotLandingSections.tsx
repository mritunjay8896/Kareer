import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jobForAllImg from '../../image1/jobforall.png';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Check, 
  CheckCircle2, 
  Search, 
  User, 
  Briefcase, 
  FileText, 
  Star, 
  Globe, 
  Zap, 
  Laptop, 
  ShieldCheck, 
  Lock, 
  RefreshCw, 
  Layers, 
  SlidersHorizontal, 
  ChevronRight, 
  Plus, 
  Minus, 
  ExternalLink, 
  MapPin, 
  Clock, 
  X,
  Users
} from 'lucide-react';

/* =========================================================================
   1. HERO SECTION
   ========================================================================= */
export const ScreenshotHero: React.FC<{ onOpenDemo: () => void }> = ({ onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<'jobseekers' | 'employers'>('jobseekers');

  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 bg-white overflow-hidden">
      {/* Soft background ambient gradient glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/3 left-1/2 w-[600px] h-[400px] bg-indigo-50/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle dual-audience switch tab */}
        <div className="flex items-center justify-start pb-4">
          <div className="inline-flex p-1 rounded-xl bg-slate-100/80 border border-slate-200/70 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('jobseekers')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'jobseekers'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Candidates & Job Seekers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('employers')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'employers'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>For Employers</span>
              <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">2 Lakh+ Pool</span>
            </button>
          </div>
        </div>

        {activeTab === 'jobseekers' ? (
          /* ==========================================================
             EXACT SCREENSHOT PHOTOCOPY: CANDIDATE & PORTFOLIO HERO
             ========================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Heading, Subhead, CTAs */}
            <div className="lg:col-span-6 space-y-5 text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-semibold shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>Your Career. Simplified.</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.08] font-display">
                Build Your Portfolio, Resume <br className="hidden sm:inline" />
                & <span className="text-[#1565ED]">Get Hired — Faster.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-[17px] text-slate-500 max-w-xl font-normal leading-relaxed">
                Create a professional portfolio website, ATS-ready resume, and use our Chrome extension for 1-click job applications. Plus, discover top talent with our employer search tools — all in one platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#1565ED] font-bold text-sm px-5 py-3.5 rounded-xl border border-blue-200/90 shadow-2xs transition-all cursor-pointer"
                >
                  <div className="w-4 h-4 rounded-full border border-blue-600 flex items-center justify-center">
                    <Play className="w-2 h-2 fill-blue-600 text-blue-600 ml-0.5" />
                  </div>
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Trust Checkmarks */}
              <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Free plan available</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Setup in minutes</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Graphic Mockup matching screenshot exactly */}
            <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[560px]">
                
                {/* Outer Browser Window Frame */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-4 sm:p-5 relative overflow-hidden">
                  {/* Browser Traffic Light Dots */}
                  <div className="flex items-center gap-1.5 pb-4 mb-4 border-b border-slate-100">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-mono text-slate-400 ml-2">glitread.com/dashboard</span>
                  </div>

                  <div className="grid grid-cols-12 gap-3.5 items-stretch">
                    
                    {/* Left Mockup Card: Candidate Mini Profile with Sidebar */}
                    <div className="col-span-5 bg-[#F8FAFC] border border-slate-200/70 rounded-xl p-3 flex flex-col justify-between text-left">
                      <div>
                        {/* Avatar & Name */}
                        <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200/60">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&h=128&q=80"
                            alt="Alex Carter"
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">Alex Carter</h4>
                            <p className="text-[10px] text-slate-500 truncate">Software Engineer</p>
                          </div>
                        </div>

                        {/* Navigation Items in mockup */}
                        <div className="space-y-1.5 mt-2.5">
                          <Link 
                            to="/portfolio" 
                            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-[11px]"
                          >
                            <Globe className="w-3 h-3 text-blue-600" />
                            <span>Portfolio</span>
                          </Link>

                          <Link 
                            to="/resume-builder" 
                            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 font-semibold text-[11px] transition-colors"
                          >
                            <FileText className="w-3 h-3 text-slate-400" />
                            <span>Resume</span>
                          </Link>

                          <Link 
                            to="/autofill-extension" 
                            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 font-semibold text-[11px] transition-colors"
                          >
                            <Zap className="w-3 h-3 text-slate-400" />
                            <span>Apply with 1 Click</span>
                          </Link>

                          <Link 
                            to="/search-profiles" 
                            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 font-semibold text-[11px] transition-colors"
                          >
                            <Search className="w-3 h-3 text-slate-400" />
                            <span>Find Candidates</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Right Mockup Card: Resume Preview Document */}
                    <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs relative text-left">
                      {/* Top ATS Optimized Badge */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                        <span className="text-[11px] font-bold text-slate-800">Resume</span>
                        <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          ATS Optimized
                        </span>
                      </div>

                      {/* Resume Skeleton Lines */}
                      <div className="space-y-2 py-1">
                        <div className="h-2 w-3/4 bg-slate-200/80 rounded" />
                        <div className="h-1.5 w-full bg-slate-100 rounded" />
                        <div className="h-1.5 w-5/6 bg-slate-100 rounded" />
                        
                        <div className="pt-1.5 space-y-1">
                          <div className="h-2 w-1/2 bg-blue-100 rounded" />
                          <div className="h-1.5 w-full bg-slate-100 rounded" />
                          <div className="h-1.5 w-4/5 bg-slate-100 rounded" />
                        </div>

                        <div className="pt-1.5 space-y-1">
                          <div className="h-2 w-2/5 bg-slate-200/80 rounded" />
                          <div className="h-1.5 w-full bg-slate-100 rounded" />
                        </div>
                      </div>

                      {/* Floating 1-Click Apply Pointer Card */}
                      <Link
                        to="/autofill-extension"
                        className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 bg-white border-2 border-blue-500 rounded-xl shadow-lg shadow-blue-500/15 p-2 sm:p-2.5 flex items-center gap-2 hover:scale-105 transition-transform z-20 group"
                      >
                        <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                          ⚡
                        </div>
                        <div className="text-left">
                          <span className="block text-[11px] font-extrabold text-blue-600 leading-tight">
                            1-Click Apply
                          </span>
                          <span className="block text-[8px] font-mono text-slate-400">
                            Greenhouse • Workday
                          </span>
                        </div>
                        <div className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] group-hover:translate-x-0.5 transition-transform">
                          →
                        </div>
                      </Link>
                    </div>

                  </div>

                  {/* Floating Chrome Extension Badge at Bottom */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 rounded-xl px-3 py-2 border border-slate-200/60">
                    <div className="flex items-center gap-2 text-left">
                      <div className="w-6 h-6 rounded-full bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-xs">
                        🌐
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-900 leading-tight">
                          Chrome Extension
                        </span>
                        <span className="block text-[10px] text-slate-500 leading-none">
                          Auto-fill • Apply • Save Time
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/autofill-extension"
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-white border border-blue-200 px-2.5 py-1 rounded-lg shadow-2xs hover:bg-blue-50 transition-colors"
                    >
                      Install Free
                    </Link>
                  </div>

                </div>

              </div>
            </div>

          </div>
        ) : (
          /* ==========================================================
             EMPLOYER HERO VIEW: ZERO UNEMPLOYED INDIA + ORIGINAL ILLUSTRATION
             ========================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Employer Message */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-600 uppercase">
                  Zero Unemployed India
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] font-display">
                Hire From Us. <br />
                <span className="text-[#1565ED]">Get Hired Fast.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                Connect with 2 lakh+ freshers and experienced professionals across technology, operations, and business roles.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href="#talent-pool"
                  className="bg-[#1565ED] hover:bg-[#0E56D6] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Hire Talent Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  to="/search-profiles"
                  className="bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Search 50k+ Profiles</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>2 Lakh+ Talent Pool</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Freshers &amp; Experienced</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Pre-screened &amp; Verified</span>
                </div>
              </div>
            </div>

            {/* Right Column: Preserved Four-Professional Illustration */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[480px] lg:max-w-[520px] flex items-center justify-center lg:justify-end">
                <div className="absolute inset-0 m-auto w-[110%] h-[110%] -left-[5%] -top-[5%] rounded-full bg-blue-100/60 blur-3xl pointer-events-none -z-0" />
                <img
                  src={jobForAllImg}
                  alt="Young professionals ready to build careers"
                  className="relative z-10 w-full h-auto object-contain max-h-[400px] sm:max-h-[440px] lg:max-h-[480px] select-none transition-transform duration-300 block"
                  loading="eager"
                />
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

/* =========================================================================
   2. METRICS / STATS STRIP
   ========================================================================= */
export const ScreenshotMetrics: React.FC = () => {
  const metrics = [
    {
      value: '50,000+',
      label: 'Active Job Seekers',
      icon: User,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      value: '8,000+',
      label: 'Hiring Employers',
      icon: Briefcase,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      value: '200,000+',
      label: 'Applications Submitted',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      value: '4.8/5',
      label: 'User Satisfaction',
      icon: Star,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
  ];

  return (
    <section className="w-full bg-white py-6 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
      <div className="max-w-[1340px] mx-auto bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 items-center">
          {metrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.label} 
                className={`flex items-center gap-3.5 ${
                  index !== 0 ? 'md:border-l md:border-slate-100 md:pl-6' : ''
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                    {item.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   3. HOW IT WORKS SECTION (4 Steps)
   ========================================================================= */
export const ScreenshotHowItWorks: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Create Your Profile',
      desc: 'Build your portfolio, resume and add your skills.',
      icon: Laptop,
    },
    {
      num: '2',
      title: 'Apply with 1 Click',
      desc: 'Use our Chrome extension to auto-fill and apply to jobs.',
      icon: Zap,
    },
    {
      num: '3',
      title: 'Get Discovered',
      desc: 'Let employers find you through our candidate search.',
      icon: Search,
    },
    {
      num: '4',
      title: 'Land Your Dream Job',
      desc: 'More visibility. More opportunities. Faster.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto text-center">
        
        {/* Section Pill */}
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-bold tracking-wide uppercase mb-3">
          <span>Get Started in 4 Simple Steps</span>
        </div>

        {/* Headline & Subtitle */}
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display mb-2">
          How It Works
        </h2>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12 sm:mb-16">
          Everything you need to build your career, from creating your online presence to getting hired — in just a few steps.
        </p>

        {/* 4 Connected Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 text-left shadow-2xs hover:shadow-md transition-all relative flex flex-col justify-between group"
              >
                {/* Arrow connector between steps on desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}

                <div>
                  {/* Top Step Number Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 mb-1.5 font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

/* =========================================================================
   4. PORTFOLIO & RESUME BUILDER SHOWCASE SECTION
   ========================================================================= */
export const ScreenshotPortfolioResume: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFCFF] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
      <div className="max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Copy, Checkpoints, CTAs */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <span>Create • Customize • Stand Out</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.12] font-display">
              Portfolio & Resume Builder
            </h2>

            <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
              Build a personal portfolio website and a professional, ATS-friendly resume in minutes. Showcase your skills, projects and experience with beautiful templates.
            </p>

            {/* Checkpoints with blue checkmark icons */}
            <div className="space-y-3 pt-2">
              {[
                'Modern, responsive templates',
                'ATS-optimized resume formats',
                'Easy drag & drop editor',
                'Host with custom domain (optional)',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <div className="w-4.5 h-4.5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
              >
                <span>Explore Portfolio Builder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/resume-builder"
                className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                View Templates
              </Link>
            </div>
          </div>

          {/* Right Column: Overlapping Mockup (Portfolio Window + ATS Resume Sheet) */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[640px]">
              
              {/* Main Laptop Portfolio Screen */}
              <div className="bg-slate-900 rounded-2xl p-2 sm:p-2.5 shadow-2xl border border-slate-800">
                <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
                  {/* Portfolio Window Topbar */}
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="text-[10px] text-slate-400 font-mono ml-2">glitread.com/p/john-doe</span>
                  </div>

                  {/* Portfolio Body Preview */}
                  <div className="p-4 sm:p-5 grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-7 text-left space-y-2">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        Full Stack Developer
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                        Hi, I'm John Doe <br />
                        <span className="text-slate-600 text-xs sm:text-sm font-normal">
                          I build modern web experiences.
                        </span>
                      </h4>
                      <Link
                        to="/portfolio"
                        className="inline-block px-3 py-1.5 bg-blue-600 text-white font-bold text-[10px] rounded-lg shadow-2xs"
                      >
                        View My Projects
                      </Link>
                    </div>

                    <div className="col-span-5 flex justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
                        alt="John Doe"
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Featured Projects Mini Row */}
                  <div className="px-4 pb-4 text-left">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Featured Projects
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-14 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">
                        E-Commerce App
                      </div>
                      <div className="h-14 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                        SaaS Dashboard
                      </div>
                      <div className="h-14 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-[10px] font-bold text-purple-700">
                        AI Code Assist
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlapping ATS Resume Sheet (Top Right / Hanging) */}
              <div className="absolute -right-3 sm:-right-6 -bottom-6 sm:-bottom-8 w-[240px] sm:w-[280px] bg-white border border-slate-200/90 rounded-2xl shadow-xl p-3.5 text-left z-20">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">John Doe</div>
                  <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-2.5 h-2.5" /> ATS Ready
                  </span>
                </div>
                
                <div className="space-y-1.5 text-[9px] text-slate-500">
                  <div className="font-bold text-slate-700 text-[10px]">Experience</div>
                  <div className="h-1.5 bg-slate-100 rounded w-full" />
                  <div className="h-1.5 bg-slate-100 rounded w-5/6" />
                  <div className="font-bold text-slate-700 text-[10px] pt-1">Skills</div>
                  <div className="flex gap-1 flex-wrap">
                    <span className="bg-slate-100 px-1 py-0.5 rounded text-[8px]">React</span>
                    <span className="bg-slate-100 px-1 py-0.5 rounded text-[8px]">Node.js</span>
                    <span className="bg-slate-100 px-1 py-0.5 rounded text-[8px]">TypeScript</span>
                  </div>
                </div>
              </div>

              {/* Floating Pill: Professional Templates */}
              <div className="absolute -left-2 sm:-left-4 top-1/2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-md flex items-center gap-2 text-xs font-bold text-slate-800 z-20">
                <span className="text-amber-500">💡</span>
                <span>Professional Templates</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   5. TWO-COLUMN FEATURE ROW: ATS Resume Score + Chrome Extension Autofill
   ========================================================================= */
export const ScreenshotAtsAndExtension: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        
        {/* =========================================
            LEFT COLUMN: ATS RESUME SCORE
           ========================================= */}
        <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all text-left">
          <div className="space-y-4">
            {/* Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <span>Get Hired Faster</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              ATS Resume Score
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Make your resume stand out with AI-powered analysis. Get instant feedback and improve your chances of getting interview calls.
            </p>

            {/* Score Ring Card */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-5 my-4">
              <div className="flex items-center gap-5">
                {/* Score Circular Badge */}
                <div className="relative w-20 h-20 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center shrink-0 bg-white shadow-2xs">
                  <span className="text-2xl font-black text-slate-900 leading-none">92</span>
                  <span className="text-[10px] text-slate-400 font-semibold">of 100</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">Excellent!</h4>
                  <p className="text-xs text-slate-500 leading-snug">
                    Your resume is well optimized for ATS systems.
                  </p>
                </div>
              </div>

              {/* 4 Metric Progress Rows */}
              <div className="space-y-2.5 mt-5 pt-4 border-t border-slate-200/70 text-xs">
                {[
                  { name: 'Keywords Match', score: '98%' },
                  { name: 'Formatting', score: '95%' },
                  { name: 'Skills & Experience', score: '92%' },
                  { name: 'Readability', score: '90%' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/resume-builder"
              className="inline-flex items-center gap-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <span>Optimise My Resume</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* =========================================
            RIGHT COLUMN: CHROME EXTENSION AUTOFILL
           ========================================= */}
        <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all text-left">
          <div className="space-y-4">
            {/* Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <span>Save Time</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              Chrome Extension Autofill
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Apply to jobs in seconds with our Chrome extension. Auto-fill your profile, resume and cover letter on supported job portals.
            </p>

            {/* Browser Mockup Simulation */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 sm:p-5 my-4">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/70">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] font-bold text-slate-700">Job Application</span>
                <span className="text-[10px] text-blue-600 font-bold">1-Click Mode</span>
              </div>

              {/* Form simulated fields */}
              <div className="space-y-2.5 py-1">
                <div className="h-7 rounded-lg bg-white border border-blue-200 px-3 flex items-center justify-between text-xs text-slate-700">
                  <span className="text-slate-400">Full Name</span>
                  <span className="font-bold text-slate-900">Aman Sharma</span>
                </div>
                <div className="h-7 rounded-lg bg-white border border-blue-200 px-3 flex items-center justify-between text-xs text-slate-700">
                  <span className="text-slate-400">Email Address</span>
                  <span className="font-bold text-slate-900">aman.dev@gmail.com</span>
                </div>
                <div className="h-7 rounded-lg bg-white border border-blue-200 px-3 flex items-center justify-between text-xs text-slate-700">
                  <span className="text-slate-400">Portfolio URL</span>
                  <span className="font-bold text-blue-600">glitread.com/p/aman</span>
                </div>
              </div>

              <Link
                to="/autofill-extension"
                className="mt-3.5 w-full py-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Auto-fill & Apply</span>
              </Link>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-semibold pt-1">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                <span>Auto-fill forms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                <span>Save profiles</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                <span>Apply in 1 click</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                <span>Works on top job portals</span>
              </div>
            </div>
          </div>

          {/* Chrome Web Store Rating Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-base">🌐</span>
              <div className="text-left">
                <div className="text-[11px] font-bold text-slate-900">Available on Chrome Web Store</div>
                <div className="text-[10px] text-amber-500 font-bold">★★★★★ 4.9/5 Rating</div>
              </div>
            </div>

            <Link
              to="/autofill-extension"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Get Extension →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

/* =========================================================================
   6. EMPLOYER CANDIDATE SEARCH SECTION
   ========================================================================= */
export const ScreenshotEmployerSearch: React.FC = () => {
  const candidates = [
    {
      id: '1',
      name: 'Priya Sharma',
      role: 'Software Engineer',
      exp: '3+ Yrs',
      location: 'Bengaluru',
      skills: ['React', 'JavaScript', 'Node.js'],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
      handle: 'priya-sharma',
    },
    {
      id: '2',
      name: 'Rahul Verma',
      role: 'Full Stack Developer',
      exp: '2+ Yrs',
      location: 'Hyderabad',
      skills: ['React', 'Python', 'MySQL'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      handle: 'rahul-verma',
    },
    {
      id: '3',
      name: 'Sneha Iyer',
      role: 'Data Analyst',
      exp: '1+ Yrs',
      location: 'Chennai',
      skills: ['SQL', 'PowerBI', 'Excel'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
      handle: 'sneha-iyer',
    },
    {
      id: '4',
      name: 'Amit Kumar',
      role: 'Product Designer',
      exp: '4+ Yrs',
      location: 'Pune',
      skills: ['Figma', 'UI/UX', 'Adobe XD'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
      handle: 'amit-kumar',
    },
  ];

  return (
    <section className="w-full bg-[#FAFCFF] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
      <div className="max-w-[1340px] mx-auto text-left">
        
        {/* Top Header Row with More Filters link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <span>Find Top Talent</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Employer Candidate Search
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Discover verified talent with powerful search and filtering tools. Find the right candidates for your team, faster.
            </p>
          </div>

          <Link
            to="/search-profiles"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>More Filters</span>
          </Link>
        </div>

        {/* Search Bar Controls Row */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-2xs mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
            
            {/* Input field */}
            <div className="sm:col-span-5 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by skills, role, or keyword..."
                className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Dropdown 1: Skills */}
            <div className="sm:col-span-2">
              <select className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 font-semibold focus:outline-none">
                <option>Skills ⌄</option>
                <option>React</option>
                <option>Node.js</option>
                <option>Python</option>
                <option>Figma</option>
              </select>
            </div>

            {/* Dropdown 2: Experience */}
            <div className="sm:col-span-2">
              <select className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 font-semibold focus:outline-none">
                <option>Experience ⌄</option>
                <option>Fresher (0 Yrs)</option>
                <option>1-2 Years</option>
                <option>3-5 Years</option>
                <option>5+ Years</option>
              </select>
            </div>

            {/* Dropdown 3: Location */}
            <div className="sm:col-span-2">
              <select className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 font-semibold focus:outline-none">
                <option>Location ⌄</option>
                <option>Bengaluru</option>
                <option>Hyderabad</option>
                <option>Pune</option>
                <option>Remote</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="sm:col-span-1">
              <Link
                to="/search-profiles"
                className="w-full py-2.5 bg-[#1565ED] hover:bg-[#0E56D6] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </Link>
            </div>

          </div>
        </div>

        {/* 4 Candidate Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {candidates.map((cand) => (
            <div 
              key={cand.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
            >
              <div>
                {/* Header: Avatar, Name, Role */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                      {cand.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">{cand.role}</p>
                  </div>
                </div>

                {/* Experience & Location meta pills */}
                <div className="flex items-center gap-3 py-2.5 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-slate-400" />
                    {cand.exp}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {cand.location}
                  </span>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 pb-4">
                  {cand.skills.map((s) => (
                    <span 
                      key={s} 
                      className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Profile Action */}
              <Link
                to={`/p/${cand.handle}`}
                className="w-full py-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/* =========================================================================
   7. TESTIMONIALS SECTION (What Our Users Say)
   ========================================================================= */
export const ScreenshotTestimonials: React.FC = () => {
  const testimonials = [
    {
      id: '1',
      name: 'Priya S.',
      role: 'Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
      quote: '"Glitread made my job search so much easier! The ATS resume builder really helped me get interviews. Highly recommend!"',
    },
    {
      id: '2',
      name: 'Rahul V.',
      role: 'Full Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      quote: '"The Chrome extension is a game changer. I\'ve applied to 20+ jobs in just a few clicks!"',
    },
    {
      id: '3',
      name: 'Neha T.',
      role: 'Talent Acquisition Manager',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
      quote: '"As a hiring manager, the candidate search tool saves me hours. The profiles are detailed and high quality."',
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto text-center">
        
        {/* Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
          <span>Trusted by Thousands</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display mb-2">
          What Our Users Say
        </h2>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mb-12">
          Join thousands of job seekers and employers who trust Glitread to build their careers and teams.
        </p>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonials.map((t) => (
            <div 
              key={t.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                {t.quote}
              </p>

              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                  </div>
                </div>

                <div className="text-amber-400 text-xs mt-2.5">
                  ★★★★★
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        </div>

      </div>
    </section>
  );
};

/* =========================================================================
   8. PRICING SECTION (Flexible Pricing for Every Career Stage)
   ========================================================================= */
export const ScreenshotPricing: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFCFF] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
      <div className="max-w-[1340px] mx-auto text-center">
        
        {/* Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
          <span>Simple & Transparent</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display mb-2">
          Flexible Pricing for Every Career Stage
        </h2>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mb-12 sm:mb-16">
          Choose a plan that fits your goals. Start for free, upgrade when you need more.
        </p>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Card 1: Free */}
          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-2xs hover:shadow-md transition-all">
            <div>
              <h3 className="font-black text-lg text-slate-900">Free</h3>
              <p className="text-xs text-slate-500 mt-0.5">Perfect for getting started</p>

              <div className="my-5">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">$0</span>
                <span className="text-xs text-slate-500 font-semibold"> / month</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Portfolio website (basic)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Resume builder (basic)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Apply with 1 click (limited)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Access to candidate search (limited)</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/register"
                className="w-full py-2.5 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 font-bold text-xs flex items-center justify-center transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Card 2: Pro (Featured) */}
          <div className="bg-white border-2 border-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-lg shadow-blue-500/10 relative">
            {/* Top Badge: Most Popular */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-xs">
              Most Popular
            </div>

            <div>
              <h3 className="font-black text-lg text-slate-900">Pro</h3>
              <p className="text-xs text-slate-500 mt-0.5">For serious job seekers</p>

              <div className="my-5">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">$5</span>
                <span className="text-xs text-slate-500 font-semibold"> / month</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 font-medium pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>All Free features</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Advanced portfolio templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>ATS resume optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Unlimited job applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Full candidate search access</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/register"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-blue-500/20 transition-all"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>

          {/* Card 3: Business */}
          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-2xs hover:shadow-md transition-all">
            <div>
              <h3 className="font-black text-lg text-slate-900">Business</h3>
              <p className="text-xs text-slate-500 mt-0.5">For teams & recruiters</p>

              <div className="my-5">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">$29</span>
                <span className="text-xs text-slate-500 font-semibold"> / month</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Everything in Pro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Bulk candidate search</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Team collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Custom branding</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/search-profiles"
                className="w-full py-2.5 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 font-bold text-xs flex items-center justify-center transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

/* =========================================================================
   9. SECURITY & PRIVACY SECTION
   ========================================================================= */
export const ScreenshotSecurityPrivacy: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Security points */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <span>Your Data, Our Priority</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Security & Privacy
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
              Your data is safe with us. We follow industry best practices to ensure your information is protected at every step.
            </p>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">SSL Encryption</h4>
                  <p className="text-[11px] text-slate-500">Secure data transfer</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">No Data Sharing</h4>
                  <p className="text-[11px] text-slate-500">Your data stays yours</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">GDPR Compliant</h4>
                  <p className="text-[11px] text-slate-500">Privacy by design</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Regular Audits</h4>
                  <p className="text-[11px] text-slate-500">Continuous monitoring</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Circular Shield Graphic matching screenshot */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[340px] flex items-center justify-center">
              
              {/* Outer circular background rings */}
              <div className="w-64 h-64 rounded-full border-2 border-dashed border-blue-200 flex items-center justify-center relative">
                <div className="w-48 h-48 rounded-full bg-blue-50/70 border border-blue-200/80 flex items-center justify-center shadow-inner">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Lock className="w-10 h-10" />
                  </div>
                </div>

                {/* Connected Checklist Floating Card */}
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-xl p-3 shadow-lg text-left space-y-1.5 text-[11px] font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-blue-600 stroke-[3]" />
                    <span>Portfolio Website</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-blue-600 stroke-[3]" />
                    <span>ATS Resume Builder</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-blue-600 stroke-[3]" />
                    <span>1 Click Job Apply</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-blue-600 stroke-[3]" />
                    <span>Candidate Search</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   10. FAQ ACCORDION SECTION (Got Questions? We've Got Answers.)
   ========================================================================= */
export const ScreenshotFaq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How do I create and share my personal portfolio website?',
      a: 'Visit the Portfolio Website builder, configure your bio, work experience, projects and skills, and click Publish. You immediately get a public, shareable handle like glitread.com/p/your-name with custom themes and responsive desktop/mobile view.',
    },
    {
      q: 'What makes the Glitread ATS Resume Builder special?',
      a: 'Our builder provides real-time scoring against major applicant tracking systems (Greenhouse, Lever, Workday), automatic keyword optimization, clean modern ATS templates, and 1-click PDF download.',
    },
    {
      q: 'How can employers search candidate profiles without a dashboard?',
      a: 'Employers can open Search Profiles directly, filter candidates by specific technical skills, years of experience, notice period, and location, and directly view verified portfolios and ATS resumes without mandatory account registration.',
    },
    {
      q: 'How does the Chrome AutoFill Extension work on job boards?',
      a: 'When you are filling out an application on supported portals like Greenhouse, Lever, or Workday, pressing Alt + Shift + F automatically maps your Glitread resume information into the form fields in one second.',
    },
    {
      q: 'Is my autofill data and profile information secure?',
      a: 'Yes. All data is encrypted in transit and at rest using SSL and GDPR-compliant cloud infrastructure. You have full control over what information is public or stored locally.',
    },
  ];

  return (
    <section className="w-full bg-[#FAFCFF] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
      <div className="max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Heading & Subtitle */}
        <div className="lg:col-span-5 space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            Got Questions? <br />
            We've Got Answers.
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
            Find quick answers to the most common questions about Glitread.
          </p>
        </div>

        {/* Right Column: Accordion Rows matching screenshot */}
        <div className="lg:col-span-7 space-y-3 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={faq.q}
                className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div className="w-5 h-5 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

/* =========================================================================
   11. BOTTOM CTA BANNER (Ready to Get Started?)
   ========================================================================= */
export const ScreenshotBottomBanner: React.FC<{ onOpenDemo: () => void }> = ({ onOpenDemo }) => {
  return (
    <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-blue-100/60 border border-blue-200/70 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xs">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span>Ready to Get Started?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Build Your Career with Glitread
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              Create your portfolio, optimize your resume, apply to jobs, and get discovered — all in one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={onOpenDemo}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#1565ED] font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-blue-200 shadow-2xs transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right Graphic: Student + Checklist Card */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative flex items-center gap-4">
              {/* Student Avatar / Illustration */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&h=300&q=80"
                  alt="Student with laptop"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Checklist Card */}
              <div className="bg-white/95 border border-blue-100 rounded-2xl p-3.5 shadow-md text-left space-y-1.5 text-xs font-semibold text-slate-800 shrink-0">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Portfolio Website</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>ATS Resume Builder</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>1-Click Job Apply</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span>Candidate Search</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

/* =========================================================================
   12. FOOTER (Matching Screenshot Exactly)
   ========================================================================= */
export const ScreenshotFooter: React.FC = () => {
  return (
    <footer className="w-full bg-white text-slate-600 pt-12 pb-8 border-t border-slate-200/90 text-left">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-slate-100">
          
          {/* Brand Column */}
          <div className="space-y-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/glitread-logo.svg"
                alt="glitread logo"
                className="w-7 h-7 object-contain shrink-0"
              />
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none font-display">
                glitread
              </span>
            </Link>
            <p className="text-xs text-slate-500 font-medium">
              Build. Showcase. Get Discovered.
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs">Product</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  Portfolio Website
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="hover:text-blue-600 transition-colors">
                  ATS Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/autofill-extension" className="hover:text-blue-600 transition-colors">
                  Chrome Extension
                </Link>
              </li>
              <li>
                <Link to="/search-profiles" className="hover:text-blue-600 transition-colors">
                  Search Candidates
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="hover:text-blue-600 transition-colors">
                  Career Guides
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs">Company</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs">Follow Us</h4>
            <div className="flex items-center gap-3 text-slate-500 text-sm">
              <a href="#" className="hover:text-blue-600 transition-colors" title="LinkedIn">in</a>
              <a href="#" className="hover:text-blue-600 transition-colors" title="X (Twitter)">𝕏</a>
              <a href="#" className="hover:text-blue-600 transition-colors" title="YouTube">▶</a>
              <a href="#" className="hover:text-blue-600 transition-colors" title="Instagram">📷</a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © 2026 Glitread. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-slate-600 transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
