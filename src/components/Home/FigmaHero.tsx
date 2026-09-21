import React from 'react';
import { Link } from 'react-router-dom';
import jobForAllImg from '../../image1/jobforall.png';
import { 
  ArrowRight, 
  ShieldCheck, 
  Users 
} from 'lucide-react';

interface FigmaHeroProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const FigmaHero: React.FC<FigmaHeroProps> = ({ onOpenAuth }) => {
  return (
    <section className="relative w-full bg-white flex flex-col justify-center min-h-0 sm:min-h-[560px] lg:min-h-[calc(100vh-64px)] max-h-none lg:max-h-[960px] px-3 sm:px-6 lg:px-10 xl:px-14 py-4 sm:py-8 lg:py-10 overflow-hidden">
      <div className="w-full max-w-[1360px] xl:max-w-[1480px] 2xl:max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-center my-auto">
        
        {/* Left Content Column - Responsive typography and balanced width */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-3 sm:space-y-5 lg:space-y-6 xl:space-y-7 flex flex-col justify-center">
          <div className="space-y-1.5 sm:space-y-3.5">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] 2xl:text-[58px] font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.12] font-display">
              Build Your Career <br className="hidden sm:inline" />
              <span className="text-blue-600">Before You Graduate.</span>
            </h1>

            <p className="text-xs sm:text-base lg:text-[17px] xl:text-lg text-slate-600 font-normal leading-relaxed max-w-xl xl:max-w-2xl">
              Create your profile, gain real experience, showcase your skills and discover opportunities built for students and freshers.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-0.5 sm:pt-1">
            <button
              onClick={() => onOpenAuth('register')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-base xl:text-[17px] px-3.5 sm:px-7 xl:px-8 py-2 sm:py-3.5 xl:py-4 rounded-lg sm:rounded-xl shadow-md shadow-blue-500/15 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer group"
            >
              <span>Build My Profile</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 xl:w-5 xl:h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              to="/jobs"
              className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-base xl:text-[17px] px-3.5 sm:px-7 xl:px-8 py-2 sm:py-3.5 xl:py-4 rounded-lg sm:rounded-xl border border-slate-300/80 shadow-2xs hover:border-slate-400 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 xl:w-5 xl:h-5 text-slate-500" />
            </Link>
          </div>

          {/* Trust Badges Row */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 pt-0.5 sm:pt-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-700 text-[11px] sm:text-[13px] font-semibold">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 shrink-0" />
              <span>100% Student First</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-emerald-50/80 border border-emerald-100 text-emerald-800 text-[11px] sm:text-[13px] font-semibold">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
              <span>Trusted by Students</span>
            </div>
          </div>
        </div>

        {/* Right Graphic Column: Main Illustration that scales fluidly with screen size */}
        <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end xl:justify-center">
          
          {/* Main Visual Canvas Area */}
          <div className="relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[600px] xl:max-w-[680px] 2xl:max-w-[760px] flex items-center justify-center">
            
            {/* Multi-layered Fading Light Blur Background Mixing Seamlessly */}
            <div className="absolute -inset-4 sm:-inset-8 rounded-full bg-gradient-to-tr from-blue-100/50 via-sky-50/60 to-indigo-100/40 blur-2xl lg:blur-3xl pointer-events-none -z-0 opacity-80" />
            <div className="absolute inset-2 sm:inset-4 rounded-full bg-gradient-to-b from-white/20 via-sky-100/40 to-blue-50/60 blur-xl pointer-events-none -z-0" />

            {/* Center Main Student Image - Scaled dynamically so it fills the screen without excessive separation */}
            <div className="relative z-10 w-full flex items-center justify-center px-1">
              <img
                src={jobForAllImg}
                alt="Build Your Career Before You Graduate"
                className="w-full h-auto object-contain max-h-[200px] sm:max-h-[420px] md:max-h-[460px] lg:max-h-[500px] xl:max-h-[580px] 2xl:max-h-[640px] drop-shadow-[0_14px_35px_rgba(37,99,235,0.12)] select-none [mask-image:linear-gradient(to_bottom,black_94%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_94%,transparent_100%)]"
                loading="eager"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
