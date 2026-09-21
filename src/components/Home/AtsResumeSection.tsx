import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import heroStudentImg from '../../assets/images/hero_student_1788459979282.jpg';

export const AtsResumeSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-4 sm:py-8 px-2.5 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto bg-gradient-to-r from-[#EFF5FF] via-[#F4F8FF] to-[#EDF3FF] border border-blue-100/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-2 sm:space-y-3">
            <span className="inline-flex items-center text-[9px] sm:text-xs font-bold text-blue-600 bg-blue-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-blue-100">
              SMART RESUME BUILDER
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-[32px] font-extrabold text-slate-900 tracking-tight leading-snug sm:leading-tight font-display">
              Turn Your Student Journey Into a Resume.
            </h2>

            <p className="text-[11.5px] sm:text-sm text-slate-600 font-normal leading-relaxed max-w-md">
              Create an ATS friendly resume in minutes. Use your profile data and export in PDF.
            </p>

            <div className="pt-1 sm:pt-2">
              <Link
                to="/resume-builder"
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer group"
              >
                <span>Create My Resume</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: ATS Resume Preview Mockup */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end mt-1 sm:mt-0">
            <div className="relative w-full max-w-[480px]">
              
              {/* Resume Sheet */}
              <div className="w-full bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-md sm:shadow-xl p-3 sm:p-5 pr-18 sm:pr-24">
                
                {/* Header with Photo + Info */}
                <div className="flex items-center gap-2 sm:gap-3 pb-2.5 sm:pb-3 border-b border-slate-100">
                  <img
                    src={heroStudentImg}
                    alt="Student"
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg object-cover border border-slate-200 shadow-2xs shrink-0"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">Your Name</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Software Developer</div>
                    <div className="text-[9px] sm:text-[10px] text-blue-600 underline">yourportfolio.dev</div>
                  </div>
                </div>

                {/* Tabs row */}
                <div className="flex items-center gap-2 sm:gap-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] text-slate-500 border-b border-slate-100 font-semibold overflow-x-auto no-scrollbar whitespace-nowrap">
                  <span className="text-blue-600">Education</span>
                  <span>Technical Skills</span>
                  <span>Key Projects</span>
                  <span>Experience</span>
                </div>

                {/* Resume Dummy Body Lines matching screenshot */}
                <div className="py-2 sm:py-2.5 space-y-1.5 sm:space-y-2 text-[9px] sm:text-[10px]">
                  <div>
                    <div className="font-extrabold text-[9px] sm:text-[10px] text-slate-800 uppercase tracking-wider mb-1">
                      Education
                    </div>
                    <div className="h-1.5 sm:h-2 bg-slate-200/80 rounded w-4/5 mb-1" />
                    <div className="h-1 sm:h-1.5 bg-slate-100 rounded w-2/3" />
                  </div>

                  <div className="pt-0.5 sm:pt-1">
                    <div className="font-extrabold text-[9px] sm:text-[10px] text-slate-800 uppercase tracking-wider mb-1">
                      Skills
                    </div>
                    <div className="flex gap-1 sm:gap-1.5 flex-wrap">
                      <div className="h-1.5 sm:h-2 bg-slate-200/80 rounded w-12 sm:w-16" />
                      <div className="h-1.5 sm:h-2 bg-slate-200/80 rounded w-10 sm:w-12" />
                      <div className="h-1.5 sm:h-2 bg-slate-200/80 rounded w-11 sm:w-14" />
                      <div className="h-1.5 sm:h-2 bg-slate-200/80 rounded w-14 sm:w-20" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating ATS Score Card on Right */}
              <div className="absolute right-0.5 sm:-right-4 top-1/2 -translate-y-1/2 bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-2 sm:p-4 shadow-lg sm:shadow-xl flex flex-col items-center justify-center min-w-[85px] sm:min-w-[115px] z-10">
                <span className="text-[9px] sm:text-[10.5px] font-bold text-slate-700 tracking-tight">ATS Score</span>
                <span className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight my-0.5">
                  95
                </span>
                {/* Green wavy accent */}
                <div className="w-6 sm:w-8 h-0.5 sm:h-1 bg-emerald-500 rounded-full mb-1 sm:mb-1.5 opacity-80" />
                <span className="text-[8.5px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-200">
                  Excellent
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
