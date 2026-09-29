import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  MapPin, 
  Check, 
  Star, 
  Bookmark, 
  Building2 
} from 'lucide-react';
import campusBuildingImg from '../../assets/images/campus_building_3d_1788699234850.jpg';

export const EmployerDiscoverySection: React.FC = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* =========================================
            LEFT: Title, Subtitle, CTA Button
           ========================================= */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            Let Employers <br className="hidden sm:inline" />
            Discover You.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
            Your profile can become searchable by employers looking for candidates with your skills, experience and background.
          </p>

          <div className="pt-2">
            <Link
              to="/resume-builder"
              className="inline-flex items-center gap-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md shadow-blue-500/20 transition-all group"
            >
              <span>Make My Profile Discoverable</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* =========================================
            CENTER: Recruiter Search Interface Mockup
           ========================================= */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs text-left">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Find Candidates
          </span>

          {/* Search Bar Inputs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-50 border border-slate-200/80 rounded-xl mb-3">
            <div className="flex items-center gap-1 px-2 flex-1 min-w-0">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-xs text-slate-800 font-medium truncate">Frontend Developer</span>
            </div>
            <div className="w-px h-4 bg-slate-200 shrink-0" />
            <div className="flex items-center gap-1 px-2 flex-1 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-xs text-slate-800 font-medium truncate">Bangalore</span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Search className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Skill Filter Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-semibold">
              React
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-semibold">
              JavaScript
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-semibold">
              Node.js
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-semibold">
              +2
            </span>
          </div>

          {/* Candidate Search Result Card */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3.5 sm:p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                    alt="Rahul Sharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                    Rahul Sharma
                  </h4>
                  <p className="text-[11px] text-slate-500">Frontend Developer</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    2+ Years Experience • Bangalore
                  </p>
                </div>
              </div>

              {/* Stats Badge on top right */}
              <div className="text-right text-[10px] text-slate-400 shrink-0">
                <span className="font-bold text-slate-800 block text-xs">3</span>
                <span>Projects</span>
              </div>
            </div>

            {/* Candidate Skills */}
            <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-slate-200/60">
              {['React', 'JavaScript', 'TypeScript', 'Node.js'].map(sk => (
                <span key={sk} className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[9px] font-medium">
                  {sk}
                </span>
              ))}
            </div>

            {/* Recruiter Action Buttons */}
            <div className="flex items-center gap-2 mt-3 pt-1">
              <button
                type="button"
                className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors text-center"
              >
                View Profile
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition-colors flex items-center gap-1"
              >
                <Bookmark className="w-3 h-3 text-slate-500" />
                <span>Shortlist</span>
              </button>
            </div>
          </div>

        </div>

        {/* =========================================
            RIGHT: 3D Corporate Buildings & Annotation
           ========================================= */}
        <div className="lg:col-span-3 relative flex items-center justify-center">
          
          {/* Hand-drawn Annotation: "Top Companies Find Talent Here" with curved arrow */}
          <div className="hidden sm:flex flex-col items-center absolute -top-8 -left-6 z-20 pointer-events-none select-none">
            <span className="text-blue-600 font-serif italic font-bold text-xs sm:text-sm transform -rotate-6 whitespace-nowrap">
              Top Companies <br />
              Find Talent Here
            </span>
            <svg width="48" height="36" viewBox="0 0 48 36" fill="none" className="text-blue-500 transform rotate-12 translate-x-2">
              <path 
                d="M10 4 C 18 16, 28 26, 38 28" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                fill="none" 
                strokeDasharray="2 3"
              />
              <path 
                d="M34 22 L 38 28 L 30 30" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>

          <div className="relative w-full max-w-[260px] flex items-center justify-center">
            {/* 3D Campus / Corporate Illustration */}
            <img
              src={campusBuildingImg}
              alt="Top Companies Find Talent Here"
              className="w-full h-auto object-contain rounded-2xl select-none"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
