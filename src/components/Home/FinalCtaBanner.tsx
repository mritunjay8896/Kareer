import React from 'react';
import { ArrowRight } from 'lucide-react';
import jobForAllImg from '../../image1/jobforall.png';

interface FinalCtaBannerProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const FinalCtaBanner: React.FC<FinalCtaBannerProps> = ({ onOpenAuth }) => {
  return (
    <section className="w-full bg-white py-6 sm:py-10 px-2.5 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-slate-50 border border-blue-100 rounded-2xl sm:rounded-3xl p-4 sm:p-10 lg:p-12 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
          
          {/* Left Column */}
          <div className="w-full lg:col-span-7 space-y-2.5 sm:space-y-4">
            <span className="inline-flex items-center text-[9px] sm:text-xs font-bold text-blue-600 bg-blue-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-blue-100">
              TAKE THE FIRST STEP
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug sm:leading-tight font-display">
              Your Career Doesn't Start With Your First Job. <br />
              <span className="text-blue-600">It Starts With Your First Step.</span>
            </h2>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-lg font-normal">
              Build your profile. Showcase your skills. Get discovered.
            </p>

            {/* Mobile Bento Highlights Grid */}
            <div className="grid grid-cols-3 gap-1.5 sm:hidden py-1">
              <div className="bg-white/80 border border-blue-100/90 rounded-lg p-2 text-center shadow-2xs">
                <div className="text-[10.5px] font-extrabold text-blue-700">100% Free</div>
                <div className="text-[8.5px] text-slate-500 mt-0.5">For Students</div>
              </div>
              <div className="bg-white/80 border border-blue-100/90 rounded-lg p-2 text-center shadow-2xs">
                <div className="text-[10.5px] font-extrabold text-indigo-700">ATS Ready</div>
                <div className="text-[8.5px] text-slate-500 mt-0.5">Instant Export</div>
              </div>
              <div className="bg-white/80 border border-blue-100/90 rounded-lg p-2 text-center shadow-2xs">
                <div className="text-[10.5px] font-extrabold text-emerald-700">Verified</div>
                <div className="text-[8.5px] text-slate-500 mt-0.5">Opportunities</div>
              </div>
            </div>

            <div className="pt-1 sm:pt-2">
              <button
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer group w-full sm:w-auto"
              >
                <span>Start Building Your Career</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Students Character Graphic (Hidden on mobile, visible on sm and desktop) */}
          <div className="hidden sm:flex lg:col-span-5 justify-center lg:justify-end mt-1 sm:mt-0">
            <div className="w-full max-w-md flex items-center justify-center">
              <img
                src={jobForAllImg}
                alt="Students building their careers"
                className="w-full h-auto object-contain max-h-36 sm:max-h-64 drop-shadow-md select-none"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
