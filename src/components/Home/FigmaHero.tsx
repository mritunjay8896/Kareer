import React from 'react';
import { Link } from 'react-router-dom';
import jobForAllImg from '../../image1/jobforall.png';
import { ArrowRight, Users, Sparkles, CheckCircle2 } from 'lucide-react';

interface FigmaHeroProps {
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export const FigmaHero: React.FC<FigmaHeroProps> = ({ onOpenAuth }) => {
  return (
    <section className="relative w-full bg-white pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-100">
      <div className="w-full max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-center z-10">
            
            {/* Small brand line */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-600 uppercase">
                Zero Unemployed India
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] font-display text-balance">
                Hire From Us. <br />
                <span className="text-blue-600">Get Hired Fast.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl text-balance">
                Connect with 2 lakh+ freshers and experienced professionals across technology, operations, and business roles.
              </p>
            </div>

            {/* Action Buttons: Dual Track */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              {/* Primary Employer CTA: Bright Blue */}
              <a
                href="#talent-pool"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Hire Talent</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary Candidate CTA: Light / Subtle border */}
              <Link
                to="/resume-builder"
                className="bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Explore Opportunities</span>
              </Link>
            </div>

            {/* 3 Compact Trust Indicators */}
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
                <span>Multiple Skills &amp; Domains</span>
              </div>
            </div>

          </div>

          {/* Right Graphic Column (5 cols) - PRESERVED EXISTING ILLUSTRATION WITH SUBTLE PALE-BLUE GLOW */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[480px] lg:max-w-[520px] flex items-center justify-center lg:justify-end">
              {/* Subtle pale-blue glow behind illustration */}
              <div className="absolute inset-0 m-auto w-[110%] h-[110%] -left-[5%] -top-[5%] rounded-full bg-blue-100/60 blur-3xl pointer-events-none -z-0" />

              <img
                src={jobForAllImg}
                alt="Young professionals and graduates ready to build careers"
                className="relative z-10 w-full h-auto object-contain max-h-[400px] sm:max-h-[440px] lg:max-h-[480px] select-none transition-transform duration-300 block"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
