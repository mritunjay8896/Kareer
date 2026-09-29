import React from 'react';
import { Link } from 'react-router-dom';
import boyBannerImg from '../../image1/boybanner.png';
import { 
  ArrowRight, 
  GraduationCap, 
  User, 
  Briefcase, 
  Star,
  Sparkles
} from 'lucide-react';

interface FigmaHeroProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const FigmaHero: React.FC<FigmaHeroProps> = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-white via-[#F8FAFE] to-[#F0F5FD] pt-8 sm:pt-12 lg:pt-14 pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden">
      <div className="w-full max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[460px] lg:min-h-[520px]">
          
          {/* Left Content Column */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5 flex flex-col justify-center z-10 py-2 sm:py-4">
            
            {/* Top Pill Card: Your Career. Your Story */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEFF] text-[#8B5CF6] text-xs font-semibold shadow-2xs w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6] fill-[#8B5CF6]/20" />
              <span>Your Career. Your Story</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-black text-slate-900 tracking-tight leading-[1.12] font-display">
                Build Your Professional <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">Identity.</span>
              </h1>
              <p className="text-sm sm:text-[15px] text-slate-500 font-normal leading-relaxed max-w-lg">
                Create your ATS-friendly resume, build a professional portfolio, and get discovered by employers — all in one place.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/resume-builder"
                className="bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Create My Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href="#features"
                className="bg-white hover:bg-slate-50 text-[#1565ED] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl border border-blue-200/90 shadow-2xs hover:border-blue-300 transition-all flex items-center justify-center"
              >
                <span>Explore Features</span>
              </a>
            </div>

            {/* Audience Pill Tags Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-blue-100/90 text-slate-700 text-xs font-semibold shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5 text-[#1565ED] shrink-0" />
                <span>Students</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-blue-100/90 text-slate-700 text-xs font-semibold shadow-2xs">
                <User className="w-3.5 h-3.5 text-[#1565ED] shrink-0" />
                <span>Freshers</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-blue-100/90 text-slate-700 text-xs font-semibold shadow-2xs">
                <Briefcase className="w-3.5 h-3.5 text-[#1565ED] shrink-0" />
                <span>Working Professionals</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-blue-100/90 text-slate-700 text-xs font-semibold shadow-2xs">
                <Star className="w-3.5 h-3.5 text-[#1565ED] shrink-0" />
                <span>Experienced Professionals</span>
              </div>
            </div>

          </div>

          {/* Right Graphic Column: 3D Scene with ATS Resume Card, Portfolio Window, Discovered by Top Companies Card, Boy & Desk */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[800px] xl:max-w-[860px] flex items-center justify-center">
              {/* Soft ambient radial glow */}
              <div className="absolute inset-0 m-auto w-[110%] h-[110%] -left-[5%] -top-[5%] rounded-full bg-gradient-to-tr from-blue-200/40 via-indigo-100/30 to-transparent blur-3xl pointer-events-none -z-0" />

              <img
                src={boyBannerImg}
                alt="Build Your Professional Identity"
                className="relative z-10 w-full h-auto object-contain max-h-[480px] sm:max-h-[560px] lg:max-h-[620px] select-none drop-shadow-[0_20px_40px_rgba(30,58,138,0.12)] transition-transform duration-500 hover:scale-[1.01]"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
