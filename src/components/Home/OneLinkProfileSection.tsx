import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  MapPin, 
  Briefcase, 
  FileText, 
  FolderGit2, 
  Award, 
  Share2 
} from 'lucide-react';

export const OneLinkProfileSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText?.('https://glitread.com/p/aman-sharma');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto bg-[#F8FAFC] border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* =========================================
              LEFT: Title, Subtitle, Copy Link Box
             ========================================= */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              One Link. Your Entire <br className="hidden sm:inline" />
              Professional Profile.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              Share your Glitread profile with recruiters, on LinkedIn, in your resume or anywhere you apply.
            </p>

            {/* Link Pill with Copy Button */}
            <div className="flex items-center justify-between bg-white border border-slate-200/90 rounded-xl p-1.5 sm:p-2 shadow-2xs max-w-sm">
              <span className="text-xs font-mono text-slate-600 px-2 truncate">
                glitread.com/p/aman-sharma
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200/80 transition-all cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* =========================================
              CENTER: Live Profile Preview Card
             ========================================= */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Profile Card */}
            <div className="w-full max-w-[380px] bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm relative z-10 text-center">
              
              {/* Avatar + Open To Opportunities Badge */}
              <div className="relative inline-block mb-2">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-white shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200"
                    alt="Aman Sharma Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                Aman Sharma
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Full Stack Developer
              </p>
              
              <div className="flex items-center justify-center gap-2 mt-1.5">
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  Bangalore, India
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Open to Opportunities
                </span>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-2 my-4 pt-2 border-t border-slate-100">
                <div className="bg-slate-50 rounded-xl p-2 text-center">
                  <span className="block font-black text-sm text-slate-800">3+</span>
                  <span className="text-[10px] text-slate-400 font-medium">Years Exp.</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 text-center">
                  <span className="block font-black text-sm text-slate-800">8</span>
                  <span className="text-[10px] text-slate-400 font-medium">Projects</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 text-center">
                  <span className="block font-black text-sm text-slate-800">5</span>
                  <span className="text-[10px] text-slate-400 font-medium">Certifications</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                <button
                  type="button"
                  className="px-2 py-1.5 rounded-lg bg-[#1565ED] hover:bg-[#0E56D6] text-white text-[11px] font-bold shadow-2xs transition-colors"
                >
                  View Resume
                </button>
                <button
                  type="button"
                  className="px-2 py-1.5 rounded-lg bg-white border border-blue-200 hover:bg-blue-50 text-blue-600 text-[11px] font-semibold transition-colors"
                >
                  View Portfolio
                </button>
                <button
                  type="button"
                  className="px-2 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition-colors"
                >
                  Share Profile
                </button>
              </div>

            </div>
          </div>

          {/* =========================================
              RIGHT: Checklist items + Annotation
             ========================================= */}
          <div className="lg:col-span-3 flex items-center justify-between gap-2 sm:gap-4">
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Add to your resume</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Share on LinkedIn</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Use in job applications</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Share via email or WhatsApp</span>
              </li>
            </ul>

            {/* Hand-drawn Annotation to the right */}
            <div className="hidden sm:flex flex-col items-center select-none shrink-0 pl-1">
              <span className="text-blue-500 font-serif italic text-xs sm:text-sm font-bold whitespace-nowrap transform -rotate-6 text-center leading-tight">
                *Your <br />
                Profile Link*
              </span>
              <svg width="44" height="42" viewBox="0 0 44 42" fill="none" className="text-blue-500 transform -rotate-12 mt-1">
                <path d="M12 4 C 28 8, 36 24, 20 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M16 26 L 20 34 L 28 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
