import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const UnemployedIndiaBanner: React.FC = () => {
  return (
    <section className="w-full bg-slate-50/60 py-14 sm:py-20 px-3 sm:px-6 lg:px-8 relative overflow-hidden border-b border-slate-100">
      {/* Decorative subtle background accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1340px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Mission & Tagline */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Tagline Callout */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Tagline: Zero Unemployed India</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display leading-[1.12]">
              From Unemployed India to <br className="hidden sm:inline" />
              <span className="text-blue-600">
                India’s Strongest Tech Workforce.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
              Every year, over 15 lakh engineering and college graduates step into the job market, yet thousands of companies struggle with hiring shortages. <strong className="text-slate-900">Glitread solves the disconnect.</strong> We train, verify, and equip candidates with real-world project portfolios — and give employers direct access to a pre-vetted talent pool of 2 Lakh+ freshers and experienced professionals.
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-xl">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800">
                  2 Lakh+ Pre-Vetted Candidates
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800">
                  Zero Agency Lock-in Fees
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800">
                  Interns to 8+ Yrs Experienced
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800">
                  Shortlists Delivered in 48 Hours
                </span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#talent-pool"
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Hire From Us (2 Lakh+ Pool)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/resume-builder"
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 transition-all flex items-center gap-2 shadow-2xs"
              >
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Student / Candidate Registration</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Stat Counter Boxes */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4">
            
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 text-center sm:text-left space-y-1 shadow-xs">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-600 font-display">
                2,00,000+
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Talent Pool
              </h4>
              <p className="text-[11px] text-slate-500">
                Freshers, interns & experienced across India
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 text-center sm:text-left space-y-1 shadow-xs">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo-600 font-display">
                5+ Domains
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Core Tech Stacks
              </h4>
              <p className="text-[11px] text-slate-500">
                Developers, Testers, DevOps, Ops & Consultants
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 text-center sm:text-left space-y-1 shadow-xs">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-600 font-display">
                48 Hours
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Average Shortlist
              </h4>
              <p className="text-[11px] text-slate-500">
                Fast-track hiring with zero administrative delay
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 text-center sm:text-left space-y-1 shadow-xs">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-500 font-display">
                100% Ready
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Live Portfolio Verified
              </h4>
              <p className="text-[11px] text-slate-500">
                Each profile backed by live code and projects
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
