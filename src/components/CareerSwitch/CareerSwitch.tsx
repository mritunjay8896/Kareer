import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Star,
  Compass
} from 'lucide-react';
import { CAREER_SWITCH_PATHS } from '../../data/mockData';
import { CareerSwitchPath } from '../../types';

interface CareerSwitchProps {
  onExplorePath: (path: CareerSwitchPath) => void;
}

// Cute Bee Icon SVG with wings
const BeeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <div className={`inline-block ${className}`}>
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full drop-shadow-xs">
      {/* Wings */}
      <ellipse cx="11" cy="9" rx="4.5" ry="6.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" transform="rotate(-20 11 9)" />
      <ellipse cx="19" cy="9" rx="4.5" ry="6.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" transform="rotate(20 19 9)" />
      {/* Body */}
      <ellipse cx="15" cy="18" rx="8" ry="6.5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
      {/* Stripes */}
      <path d="M12 12 C 12 18, 12 18, 12 24" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 12 C 17 18, 17 18, 17 24" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
      {/* Head & Eye */}
      <circle cx="21" cy="17" r="3" fill="#1e293b" />
      <circle cx="22" cy="16" r="0.8" fill="#ffffff" />
      {/* Stinger */}
      <path d="M7 18 L4 18" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
);

// Curved Bee Path Line Connector
const BeeConnector: React.FC<{ type: 'from-right-to-left' | 'from-left-to-right' }> = ({ type }) => (
  <div className="relative h-20 sm:h-24 -my-6 sm:-my-8 flex items-center justify-center pointer-events-none z-10">
    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 60" fill="none" preserveAspectRatio="none">
      {type === 'from-right-to-left' ? (
        <path
          d="M 258 0 C 285 15, 180 30, 150 30 C 120 30, 15 45, 42 60"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      ) : (
        <path
          d="M 42 0 C 15 15, 120 30, 150 30 C 180 30, 285 45, 258 60"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      )}
    </svg>
    {/* Bee flying on the curved path */}
    <div className="absolute left-[50%] top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <BeeIcon className="w-6 h-6 sm:w-7 sm:h-7" />
    </div>
  </div>
);

// Trophy & Podium Illustration
const TrophyIllustration = () => (
  <div className="flex flex-col items-center justify-center p-1">
    <svg viewBox="0 0 120 100" fill="none" className="w-24 h-20 sm:w-32 sm:h-28">
      {/* Stars/Sparkles */}
      <path d="M20 25 L22 20 L27 18 L22 16 L20 11 L18 16 L13 18 L18 20 Z" fill="#fbbf24" />
      <path d="M100 20 L101 16 L105 15 L101 14 L100 10 L99 14 L95 15 L99 16 Z" fill="#fbbf24" />
      {/* Leaves on sides */}
      <path d="M15 80 C 10 70, 20 65, 25 75 C 20 70, 30 65, 30 80 Z" fill="#34d399" />
      <path d="M105 80 C 110 70, 100 65, 95 75 C 100 70, 90 65, 90 80 Z" fill="#34d399" />
      {/* Podium Steps */}
      <rect x="25" y="80" width="70" height="12" rx="3" fill="#cbd5e1" />
      <rect x="35" y="68" width="50" height="12" rx="3" fill="#e2e8f0" />
      {/* Trophy Base */}
      <rect x="52" y="60" width="16" height="8" rx="1" fill="#d97706" />
      <rect x="57" y="52" width="6" height="8" fill="#f59e0b" />
      {/* Cup Body */}
      <path d="M45 28 C 45 48, 75 48, 75 28 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
      <ellipse cx="60" cy="28" rx="15" ry="4" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
      {/* Handles */}
      <path d="M45 32 C 38 32, 38 42, 47 43" stroke="#d97706" strokeWidth="2" fill="none" />
      <path d="M75 32 C 82 32, 82 42, 73 43" stroke="#d97706" strokeWidth="2" fill="none" />
    </svg>
  </div>
);

export const CareerSwitch: React.FC<CareerSwitchProps> = ({ onExplorePath }) => {
  const [selectedPathId, setSelectedPathId] = useState<string>(CAREER_SWITCH_PATHS[0].id);

  const activePath = CAREER_SWITCH_PATHS.find(p => p.id === selectedPathId) || CAREER_SWITCH_PATHS[0];

  return (
    <section className="py-10 sm:py-20 bg-white" id="career-switch">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-orange-50 text-orange-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider font-display mb-2 sm:mb-3 border border-orange-200">
            <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> High-Impact Transition
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Interactive Career Switch Roadmaps
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 sm:mt-2">
            Transition from non-tech, customer support, or core engineering backgrounds into high-paying software and data roles.
          </p>
        </div>

        {/* Path Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mb-6 sm:mb-12">
          {CAREER_SWITCH_PATHS.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedPathId(path.id)}
              className={`px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
                selectedPathId === path.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {path.title}
            </button>
          ))}
        </div>

        {/* Active Roadmap Display Container */}
        <motion.div
          key={activePath.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-b from-slate-50/70 via-blue-50/20 to-slate-50/70 text-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200/80 shadow-lg relative overflow-hidden"
        >
          {/* Top Section: Title */}
          <div className="relative mb-6">
            <div className="max-w-xl">
              <span className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest font-display block mb-1">
                CAREER PATH
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-slate-900 font-display leading-tight">
                {activePath.fromRole ? `${activePath.fromRole} → ${activePath.steps[activePath.steps.length - 1].role}` : activePath.title}
              </h3>
            </div>
          </div>

          {/* Top Metrics Row: 3 White Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
            <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-tight truncate">
                  AVG PORTFOLIO
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-lg font-black text-amber-600 leading-tight">
                  {activePath.avgSalary.replace('LPA', '').trim()}
                </p>
                <span className="text-[9px] sm:text-xs text-amber-700 font-bold block">LPA</span>
              </div>
            </div>

            <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-tight truncate">
                  EXPECTED DURATION
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-lg font-black text-emerald-600 leading-tight">
                  {activePath.duration.replace('Months', '').trim()}
                </p>
                <span className="text-[9px] sm:text-xs text-emerald-700 font-bold block">Months</span>
              </div>
            </div>

            <div className="bg-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-tight truncate">
                  DEMAND GROWTH
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-lg font-black text-blue-600 leading-tight">
                  {activePath.demandGrowth.replace('YoY', '').trim()}
                </p>
                <span className="text-[9px] sm:text-xs text-blue-700 font-bold block">YoY</span>
              </div>
            </div>
          </div>

          {/* Section Heading with Blue Bar */}
          <div className="mb-6">
            <span className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest font-display block">
              STEP-BY-STEP PROGRESSION ROADMAP
            </span>
            <div className="w-8 h-0.5 bg-blue-600 mt-1 rounded-full" />
          </div>

          {/* Roadmap Steps (Staggered Winding Trail with Flying Bees) */}
          <div className="relative my-4 space-y-1">
            {activePath.steps.map((step, idx) => {
              const isEven = idx % 2 === 1; // Step 2 (idx=1), Step 4 (idx=3) are even
              const themeColor = isEven ? 'emerald' : 'blue';

              return (
                <React.Fragment key={idx}>
                  {/* Step Card Container (Alternating Left & Right) */}
                  <div className={`relative flex items-center ${isEven ? 'justify-end' : 'justify-start'}`}>
                    
                    {/* The Step Card */}
                    <div className={`relative w-[86%] sm:w-[72%] bg-white p-3 sm:p-5 rounded-2xl border border-slate-100 shadow-sm transition-all group ${
                      isEven ? 'border-emerald-100/90' : 'border-blue-100/90'
                    }`}>
                      
                      {/* Card Content Row */}
                      <div className="flex items-start gap-2.5 sm:gap-3.5">
                        
                        {/* Solid Number Badge (01, 02, etc.) */}
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-black text-xs sm:text-sm text-white flex items-center justify-center shrink-0 shadow-sm ${
                          isEven ? 'bg-emerald-500' : 'bg-blue-600'
                        }`}>
                          0{idx + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Timeline Pill */}
                          <div className="mb-1">
                            <span className={`inline-block text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                              isEven 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                : 'bg-blue-50 text-blue-700 border-blue-100'
                            }`}>
                              {step.timeline}
                            </span>
                          </div>

                          {/* Role Title */}
                          <h4 className="font-extrabold text-xs sm:text-base text-slate-900 leading-snug mb-1.5">
                            {step.role}
                          </h4>


                        </div>
                      </div>

                      {/* Connector Node Dot on Card Edge */}
                      <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-xs ${
                        isEven 
                          ? '-left-1.5 bg-emerald-500' 
                          : '-right-1.5 bg-blue-500'
                      }`} />
                    </div>

                    {/* Step 5 Special: Trophy Illustration on the Right */}
                    {idx === activePath.steps.length - 1 && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden xs:block">
                        <TrophyIllustration />
                      </div>
                    )}
                  </div>

                  {/* Connector Line & Flying Bee between steps */}
                  {idx < activePath.steps.length - 1 && (
                    <BeeConnector type={isEven ? 'from-left-to-right' : 'from-right-to-left'} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Bottom Banner: Keep Learning, Keep Growing! */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 via-indigo-50/60 to-blue-50 p-3.5 sm:p-5 rounded-2xl border border-blue-100/80 flex items-center justify-between shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-3 z-10">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
              </div>
              <div>
                <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                  Keep Learning, Keep Growing!
                </h5>
                <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5">
                  Stay consistent, build real-world experience and achieve your dream role.
                </p>
              </div>
            </div>

            {/* Decorative Matrix Dots */}
            <div className="hidden sm:grid grid-cols-4 gap-1.5 opacity-25 pr-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              ))}
            </div>
          </div>

          {/* Action Footer Button */}
          <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-600 font-medium text-center sm:text-left">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
              <span>Includes free course recommendations & interview question bank</span>
            </div>

            <button
              onClick={() => onExplorePath(activePath)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] sm:text-xs py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
            >
              Explore Full {activePath.fromRole} Roadmap <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

