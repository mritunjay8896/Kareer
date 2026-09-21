import React from 'react';
import { ArrowRight } from 'lucide-react';
import jobForAllImg from '../../image1/jobforall.png';

interface FinalCtaBannerProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const FinalCtaBanner: React.FC<FinalCtaBannerProps> = ({ onOpenAuth }) => {
  return (
    <section className="w-full bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-slate-50 border border-blue-100 rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              Your Career Doesn't Start With Your First Job. <br />
              <span className="text-blue-600">It Starts With Your First Step.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
              Build your profile. Showcase your skills. Get discovered.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer group"
              >
                <span>Start Building Your Career</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Students Character Graphic */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md flex items-center justify-center">
              <img
                src={jobForAllImg}
                alt="Students building their careers"
                className="w-full h-auto object-contain max-h-56 sm:max-h-64 drop-shadow-md select-none"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
