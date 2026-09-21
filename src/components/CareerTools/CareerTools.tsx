import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  FileCheck2, 
  Globe, 
  FileText, 
  CheckSquare, 
  Compass, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp, 
  Zap,
  Code2,
  Share2,
  Link
} from 'lucide-react';
import { ResumeCheckerModal } from './ResumeCheckerModal';
import collegeProffesionalImg from '../../image1/college_proffesional.png';
import portfolioImg from '../../image1/portfolio.png';

interface CareerToolsProps {
  onSelectTool: (toolName: string) => void;
}

export const CareerTools: React.FC<CareerToolsProps> = ({ onSelectTool }) => {
  const [resumeCheckerOpen, setResumeCheckerOpen] = useState(false);

  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-200/80 relative" id="career-tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Supercharge Your Job Search with Career Tools
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Automated tools designed to bypass ATS filters, create portfolio websites, and crack tech interviews.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: ATS Resume Builder (Large 2x2 or 2 col) */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => onSelectTool('ATS Resume Builder')}
            className="md:col-span-2 bg-[#eff5ff] text-slate-900 rounded-3xl border border-blue-200/60 shadow-md hover:shadow-xl transition-all flex flex-row relative overflow-hidden group cursor-pointer"
          >
            {/* Background Light Glow */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

            {/* Left Content Column */}
            <div className="p-4 sm:p-8 flex-1 flex flex-col justify-between z-10 min-w-0">
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-100/80 border border-blue-200 text-blue-600 flex items-center justify-center font-bold shadow-2xs">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                </div>

                <h3 className="text-base sm:text-2xl font-extrabold font-display leading-tight mb-1 sm:mb-2 text-slate-900">
                  ATS Resume Builder
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed max-w-md">
                  Generate single-page, ATS-optimized resumes used by candidates placed at Google, Microsoft, and Swiggy.
                </p>
              </div>

              <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                <button
                  onClick={() => onSelectTool('ATS Resume Builder')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] sm:text-xs py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-lg sm:rounded-xl shadow-md transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  Create Resume Now <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <span className="text-[10px] sm:text-xs text-slate-500 font-semibold">Over 1,200,000+ Downloads</span>
              </div>
            </div>

            {/* Right Image Column - Seamless background, no inner border line */}
            <div className="w-28 xs:w-36 sm:w-48 md:w-56 lg:w-64 shrink-0 relative self-stretch overflow-hidden bg-[#eff5ff] flex items-center justify-center">
              <img 
                src={collegeProffesionalImg} 
                alt="Professional Resume Builder Illustration" 
                className="w-full h-full object-cover object-top mix-blend-multiply group-hover:scale-105 transition-all duration-500"
              />
            </div>
          </motion.div>

          {/* Card 2: AI Resume Checker (Score gauge: 92/100) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border border-blue-200/80 text-slate-900 rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group cursor-pointer"
            onClick={() => setResumeCheckerOpen(true)}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-2xs">
                    <FileCheck2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase border border-blue-200/80">
                    Instant Scan
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display leading-snug mb-1 text-slate-900">
                  AI Resume Checker
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-3 sm:mb-4">
                  Upload your CV to get a real-time score against job descriptions.
                </p>
              </div>

              {/* Score Badge Graphic - Centered in Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-5 border border-blue-100/90 shadow-2xs text-center my-auto flex flex-col items-center justify-center">
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Average Candidate Match</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 my-1 sm:my-1.5">92 / 100</p>
                <span className="text-[9px] sm:text-[10px] text-emerald-700 font-semibold block">Top 3% Application Probability</span>
              </div>
            </div>

            <button className="mt-4 sm:mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] sm:text-xs py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer">
              Scan Resume Score Free <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </motion.div>

          {/* Card 3: Portfolio Builder */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => onSelectTool('Portfolio Builder')}
            className="bg-slate-50 border border-slate-200/90 rounded-3xl p-4 sm:p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group overflow-hidden cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[9px] sm:text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase flex items-center gap-1">
                  <Share2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" /> Custom Link
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 leading-snug mb-1">
                Shareable Portfolio Builder
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-3 sm:mb-4">
                Convert your GitHub projects & resume into a shareable custom portfolio link for recruiters.
              </p>

              {/* Illustration Image Preview with Shareable Link overlay */}
              <div className="w-full h-36 sm:h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative mb-3 sm:mb-4 bg-slate-100">
                <img 
                  src={portfolioImg} 
                  alt="Portfolio Builder Illustration" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Live Shareable Link Pill */}
                <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 backdrop-blur-md p-1.5 sm:p-2 rounded-xl border border-slate-700/80 text-white flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Link className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-mono text-emerald-300 truncate font-semibold">
                      alex.careerpulse.me
                    </span>
                  </div>
                  <span className="flex items-center gap-0.5 sm:gap-1 shrink-0 bg-emerald-500/20 text-emerald-300 px-1.5 sm:px-2 py-0.5 rounded-md text-[8.5px] sm:text-[9px] font-bold uppercase border border-emerald-500/30">
                    <Share2 className="w-2 h-2 sm:w-2.5 sm:h-2.5" /> Shareable
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTool('Portfolio Builder')}
              className="mt-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] sm:text-xs py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              Get Custom Shareable Link →
            </button>
          </motion.div>

          {/* Card 4: Mock Tests Series */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-slate-50 border border-slate-200/90 rounded-3xl p-4 sm:p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 sm:mb-4">
                <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 leading-snug mb-1">
                Mock Tests & Quiz
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-3 sm:mb-4">
                Practice SSC, Banking, Railway, TCS NQT, and Amazon coding tests with timer simulators.
              </p>

              <div className="bg-amber-50 rounded-xl p-2.5 sm:p-3 border border-amber-200 text-[11px] sm:text-xs flex justify-between items-center">
                <span className="font-bold text-amber-900 text-[11px] sm:text-xs">1,500+ Practice Tests</span>
                <span className="text-[9px] sm:text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 sm:px-2 py-0.5 rounded">All Free</span>
              </div>
            </div>

            <button
              onClick={() => onSelectTool('Mock Tests')}
              className="mt-4 sm:mt-6 w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-[11px] sm:text-xs py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              Start Free Practice Test →
            </button>
          </motion.div>

          {/* Card 5: Career Roadmaps (Large 2 col) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="md:col-span-2 bg-gradient-to-br from-indigo-50/90 via-sky-50/60 to-purple-50/70 border border-indigo-200/80 text-slate-900 rounded-3xl p-4 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-2xs">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-[10px] sm:text-xs bg-indigo-100 text-indigo-800 font-extrabold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-indigo-200">
                  Step-by-step Guides
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl font-extrabold font-display leading-tight mb-1 sm:mb-2 text-slate-900">
                Career Switch & Learning Roadmaps
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed max-w-md mb-3 sm:mb-4">
                Step-by-step career blueprints for non-tech freshers to transition into software engineering, data science, and product design.
              </p>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 text-center">
                <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[8.5px] sm:text-[10px] text-slate-500 uppercase font-bold block truncate">BPO to SDET</span>
                  <p className="text-[10.5px] sm:text-xs font-extrabold text-amber-700 mt-0.5 sm:mt-1">₹14.5 LPA Avg</p>
                </div>
                <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[8.5px] sm:text-[10px] text-slate-500 uppercase font-bold block truncate">Mech to Data</span>
                  <p className="text-[10.5px] sm:text-xs font-extrabold text-emerald-700 mt-0.5 sm:mt-1">₹11 LPA Avg</p>
                </div>
                <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[8.5px] sm:text-[10px] text-slate-500 uppercase font-bold block truncate">Support to React</span>
                  <p className="text-[10.5px] sm:text-xs font-extrabold text-blue-700 mt-0.5 sm:mt-1">₹18 LPA Avg</p>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <button
                onClick={() => onSelectTool('Career Roadmaps')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] sm:text-xs py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-lg sm:rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Explore Roadmaps <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <span className="text-[10px] sm:text-xs text-indigo-900 font-bold">Updated for 2026 Hiring</span>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Resume Checker Interactive Modal */}
      <ResumeCheckerModal
        isOpen={resumeCheckerOpen}
        onClose={() => setResumeCheckerOpen(false)}
      />
    </section>
  );
};
