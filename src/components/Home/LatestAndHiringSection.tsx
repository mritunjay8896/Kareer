import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Briefcase, 
  Sparkles, 
  Building2 
} from 'lucide-react';
import officeChairImg from '../../assets/images/office_chair_hiring_1788460006422.jpg';

export const LatestAndHiringSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Jobs' | 'Internships' | 'Challenges'>('Jobs');
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white py-5 sm:py-8 px-2.5 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-stretch">
        
        {/* Left Card: Latest Opportunities (approx 58-60% width) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 flex flex-col justify-between shadow-2xs">
          <div>
            {/* Header with Title, Pill Filters, and View All link */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h3 className="text-lg sm:text-[22px] font-extrabold text-slate-900 tracking-tight font-display">
                  Latest Opportunities
                </h3>
                {/* Pill filters right next to title */}
                <div className="flex items-center gap-1 bg-slate-50/75 p-0.5 sm:p-1 rounded-full border border-slate-100">
                  {(['Jobs', 'Internships', 'Challenges'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10.5px] sm:text-xs font-semibold transition-all cursor-pointer ${
                        activeTab === tab
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to={activeTab === 'Jobs' ? '/jobs' : activeTab === 'Internships' ? '/internships' : '/challenges'}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer ml-auto sm:ml-0"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Clean Empty State matching screenshot */}
            <div className="py-5 sm:py-10 text-center flex flex-col items-center justify-center">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-slate-100/90 flex items-center justify-center mb-2.5 sm:mb-3 text-slate-400">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.7]" />
              </div>
              <h4 className="text-xs sm:text-base font-bold text-slate-800 mb-0.5 sm:mb-1">
                No opportunities available right now.
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 max-w-sm leading-relaxed">
                Check back soon. We're working on bringing amazing opportunities for you!
              </p>
            </div>
          </div>
        </div>

        {/* Right Card: Are You Hiring? (approx 40-42% width) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#F5F8FF] via-[#EFF5FF] to-[#E9F1FE] border border-blue-100/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden flex flex-col justify-between shadow-2xs isolate">
          
          {/* Subtle Decorative Stars / Sparkles */}
          <div className="absolute top-4 right-20 text-amber-300 opacity-60 text-xs">✦</div>
          <div className="absolute top-12 right-6 text-blue-300 opacity-50 text-sm">✦</div>
          <div className="absolute bottom-6 right-36 text-blue-200 opacity-60 text-xs">✦</div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center h-full">
            {/* Left text column */}
            <div className="sm:col-span-7 space-y-2 sm:space-y-2.5 z-10 relative">
              <span className="inline-flex items-center text-[9px] sm:text-xs font-bold text-amber-700 bg-amber-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-amber-200/70 sm:hidden">
                FOR EMPLOYERS
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight font-display">
                Are You Hiring?
              </h3>
              <p className="text-[11.5px] sm:text-xs text-slate-600 leading-relaxed font-normal max-w-xs sm:max-w-none">
                Connect with talented students and freshers. Post jobs, find candidates and build your dream team.
              </p>
              <div className="pt-1.5 sm:pt-2">
                <Link
                  to="/employers"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs sm:text-sm px-4 py-2 sm:py-2.5 rounded-xl shadow-md shadow-amber-500/20 transition-all group cursor-pointer w-full sm:w-auto"
                >
                  <span>Start Student Talent</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Graphic: Background watermark on mobile, side illustration on desktop */}
            <div className="absolute -right-2 -bottom-1 sm:relative sm:right-auto sm:bottom-auto sm:col-span-5 flex items-center justify-center sm:justify-end z-0 sm:z-10 pointer-events-none sm:pointer-events-auto">
              <div className="w-32 h-28 sm:w-44 sm:h-36 relative flex items-center justify-center">
                <img
                  src={officeChairImg}
                  alt="Executive hiring armchair and briefcase"
                  className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-sm opacity-20 sm:opacity-100 sm:hover:scale-105 transition-transform select-none"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

