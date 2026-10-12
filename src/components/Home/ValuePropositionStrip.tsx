import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';

export const ValuePropositionStrip: React.FC = () => {
  const valueCards = [
    {
      icon: Users,
      title: '2 Lakh+ Talent Pool',
      desc: 'Active database of pre-screened freshers and experienced professionals ready to hire.',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderHover: 'hover:border-blue-200'
    },
    {
      icon: Zap,
      title: 'Direct Hiring in 48h',
      desc: 'Zero agency delays, receive interview-ready shortlists matched to your exact job requirements.',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderHover: 'hover:border-emerald-200'
    },
    {
      icon: Layers,
      title: 'Verified Portfolios & Code',
      desc: 'Review live GitHub repositories, real-world deployed projects, and ATS-optimized candidate resumes.',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderHover: 'hover:border-purple-200'
    },
    {
      icon: ShieldCheck,
      title: 'Zero Agency Lock-in',
      desc: 'Direct candidate contact, transparent hiring workflows, and zero middleman placement commissions.',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderHover: 'hover:border-amber-200'
    }
  ];

  return (
    <section id="features" className="w-full bg-white py-6 sm:py-8 lg:py-10 px-3 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-[1340px] mx-auto bg-gradient-to-br from-blue-50/50 via-white to-slate-50/70 border border-blue-100/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
        
        {/* Subtle ambient light gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-50/40 rounded-full blur-2xl pointer-events-none -z-0" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: For Employers Badge, Headline, Subtitle, Dual CTAs & Trust Badges */}
          <div className="lg:col-span-5 space-y-4 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/90 text-blue-600 text-xs font-bold shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>For Employers</span>
            </div>

            {/* Headline in Bold Dark Navy */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 tracking-tight leading-[1.14] font-display">
              Hire Top Talent. <br className="hidden sm:inline" />
              <span className="text-[#1565ED]">Build Your Dream Team.</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed max-w-lg">
              Access an active pool of 2 lakh+ verified freshers, interns, and experienced professionals across technology, operations, and business roles.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#talent-pool"
                className="inline-flex items-center gap-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-sm px-5 sm:px-6 py-3 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer group whitespace-nowrap"
              >
                <span>Hire Talent Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <Link
                to="/search-profiles"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl shadow-2xs transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Search 50k+ Profiles</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>
            </div>

            {/* Trust Checkmarks */}
            <div className="pt-3 border-t border-slate-200/70 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Pre-screened candidates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Ready to join in 48h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Verified skillsets</span>
              </div>
            </div>

          </div>

          {/* Right Column: 4 Clean Value Proposition Cards in a 2x2 Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {valueCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs ${card.borderHover} transition-all flex flex-col justify-between group hover:shadow-sm`}
                >
                  <div className="space-y-3">
                    <div className={`w-10 h-10 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
