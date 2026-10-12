import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  FileText, 
  Briefcase, 
  FileCheck, 
  Landmark, 
  Globe, 
  ArrowRight,
  Sparkles,
  Code2,
  User
} from 'lucide-react';

import { JourneySteps } from './JourneySection';

// 3D Image Assets matching the screenshot
import studentJourneyImg from '../../assets/images/student_journey_3d_1788699191385.jpg';
import portfolioMockupImg from '../../assets/images/portfolio_mockup_3d_1788540187292.jpg';
import resumeSearchImg from '../../assets/images/resume_search_3d_1788699221492.jpg';
import megaphoneRoseImg from '../../assets/images/megaphone_rose_3d_1788699247484.jpg';
import globeArrowImg from '../../assets/images/globe_arrow_3d_1788699272839.jpg';
import backpackImg from '../../assets/images/backpack_illustration_1788459993181.jpg';

export const FindOpportunitySection: React.FC = () => {
  return (
    <section className="w-full bg-white pt-1 sm:pt-3 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1360px] mx-auto">
        {/* Top Header */}
        <div className="text-center mx-auto mb-4 sm:mb-5">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight font-display">
            Built For Candidates. <span className="text-blue-600">Discovered By Employers.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl mx-auto leading-relaxed">
            Create your custom portfolio, generate ATS-proof resumes, autofill application forms with our Chrome extension, and let hiring teams discover you directly.
          </p>

          {/* 6 Journey Steps */}
          <JourneySteps className="mt-4 sm:mt-5 mb-0.5" />
        </div>

        {/* Bento Grid: Left Hero Card + Right Opportunity Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-stretch mt-2.5 sm:mt-4">
          {/* Left Hero Card (Your Career Journey Starts Here) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#EEF4FE] via-[#E8F1FD] to-[#DFECFD] border border-blue-100/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 flex flex-col justify-between shadow-xs relative overflow-hidden isolate">
            {/* Top Left Badge */}
            <div className="flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 bg-white/90 text-blue-600 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-blue-100 shadow-2xs">
                <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                CAREER SUITE
              </span>
            </div>

            {/* Center: Character Illustration with floating badge pills */}
            <div className="relative my-2 sm:my-4 flex items-center justify-center min-h-[160px] sm:min-h-[220px]">
              {/* Floating Chip 1: Build Portfolio (Top Left) */}
              <div className="absolute top-1 left-0 sm:left-2 z-10 bg-white/95 border border-slate-100 shadow-sm rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-0.5 sm:py-1 flex items-center gap-1 sm:gap-1.5">
                <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Globe className="w-2.5 h-2.5" />
                </div>
                <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-800">Portfolio</span>
              </div>

              {/* Floating Chip 2: Resume (Top Right) */}
              <div className="absolute top-2 sm:top-3 right-0 sm:right-2 z-10 bg-white/95 border border-slate-100 shadow-sm rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-0.5 sm:py-1 flex items-center gap-1 sm:gap-1.5">
                <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <FileText className="w-2.5 h-2.5" />
                </div>
                <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-800">ATS Resume</span>
              </div>

              {/* Floating Chip: Autofill Extension (Bottom Right) */}
              <div className="absolute bottom-2 sm:bottom-4 right-1 sm:right-3 z-10 bg-white/95 border border-slate-100 shadow-sm rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-0.5 sm:py-1 flex items-center gap-1 sm:gap-1.5">
                <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5" />
                </div>
                <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-800">1-Click Fill</span>
              </div>

              {/* 3D Student Image */}
              <img
                src={studentJourneyImg}
                alt="Career Journey"
                className="w-38 sm:w-54 h-auto object-contain mix-blend-multiply select-none pointer-events-none relative z-0"
              />
            </div>

            {/* Bottom Content & CTA */}
            <div className="z-10 mt-auto">
              <h3 className="font-extrabold text-lg sm:text-2xl text-slate-900 leading-tight mb-1 sm:mb-2 font-display">
                Four Pillars. One Platform.
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-2.5 sm:mb-4">
                Everything required to showcase your talent, pass ATS filters, speed through job forms, and get recruited.
              </p>
              <div className="flex items-center gap-2">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md shadow-blue-500/20 transition-all hover:gap-3 cursor-pointer group"
                >
                  Create Portfolio
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <div className="flex items-center gap-1 text-blue-400">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The 4 Core Feature Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 h-full">
            {/* Card 1: Portfolio Website */}
            <Link
              to="/portfolio"
              className="bg-[#FFFDF4] border border-amber-100/90 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group isolate"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                  <Globe className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                    FEATURE 1
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">Shareable /p/:handle</span>
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-amber-700 transition-colors mb-1 font-display">
                  Portfolio Website
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Design personal portfolio websites with live responsive preview, curated project showcases, GitHub sync, and custom sharable handles.
                </p>
              </div>
              <div className="flex items-end justify-between mt-4 pt-2">
                <span className="text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Launch Builder <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <img
                  src={portfolioMockupImg}
                  alt="Portfolio Website"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>

            {/* Card 2: ATS Resume Builder */}
            <Link
              to="/resume-builder"
              className="bg-[#FFF4F5] border border-rose-100/90 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group isolate"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
                  <FileCheck className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-rose-800 bg-rose-100/80 px-2 py-0.5 rounded-full">
                    FEATURE 2
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">ATS Optimized</span>
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-rose-700 transition-colors mb-1 font-display">
                  Resume Builder
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Build ATS-proof resumes with real-time scoring, multiple professional templates, custom typography, and instant PDF download.
                </p>
              </div>
              <div className="flex items-end justify-between mt-4 pt-2">
                <span className="text-xs font-bold text-rose-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Build Resume <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <img
                  src={megaphoneRoseImg}
                  alt="ATS Resume Builder"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>

            {/* Card 3: Employer Search User Profiles */}
            <Link
              to="/search-profiles"
              className="bg-[#F1F7FF] border border-blue-100/90 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group isolate"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <Briefcase className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded-full">
                    FEATURE 3
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">No Dashboard Needed</span>
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-blue-700 transition-colors mb-1 font-display">
                  Employer Talent Search
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Employers can search candidate profiles by skills, experience, and notice period, with 1-click access to live portfolios and resumes.
                </p>
              </div>
              <div className="flex items-end justify-between mt-4 pt-2">
                <span className="text-xs font-bold text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Search Profiles <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <img
                  src={resumeSearchImg}
                  alt="Employer Candidate Search"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>

            {/* Card 4: Chrome Autofill Extension */}
            <Link
              to="/autofill-extension"
              className="bg-[#F5F4FF] border border-indigo-100/90 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group isolate"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                  <Sparkles className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                    FEATURE 4
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">Greenhouse • Workday • Lever</span>
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-indigo-700 transition-colors mb-1 font-display">
                  1-Click Form Autofill
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Autofill complex job application forms across all major ATS portals in seconds using your Glitread resume and portfolio data.
                </p>
              </div>
              <div className="flex items-end justify-between mt-4 pt-2">
                <span className="text-xs font-bold text-indigo-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Try Extension Demo <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <img
                  src={backpackImg}
                  alt="Chrome Extension Autofill"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
