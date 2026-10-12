import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Globe, 
  FileText, 
  Sparkles, 
  Search, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { HeroIllustration } from './HeroIllustration';

interface HeroProps {
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="pt-6 sm:pt-10 lg:pt-12 pb-8 sm:pb-14 w-full bg-white overflow-hidden relative">
      {/* Background radial soft ambient lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl 2xl:max-w-[1440px] h-[520px] bg-gradient-to-b from-blue-50/70 via-indigo-50/20 to-transparent -z-10 pointer-events-none rounded-b-[60px]" />
      <div className="absolute top-16 right-10 w-96 h-96 bg-sky-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* LEFT COLUMN: Content (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-4 lg:space-y-6 order-1 relative z-20"
          >
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100/90 text-blue-700 text-xs font-bold shadow-2xs w-fit">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Career Identity & Application Suite</span>
            </div>

            {/* Large Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] font-display">
              Portfolio, Resume &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
                1-Click Form Autofill.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              Build your custom portfolio website, create ATS-ready resumes, auto-fill job applications in seconds with our Chrome extension, and let employers search your profile directly.
            </p>

            {/* Quick Action Badges / CTAs matching current theme */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              <Link
                to="/portfolio"
                className="px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 hover:gap-2 cursor-pointer group"
              >
                <Globe className="w-4 h-4" />
                <span>Portfolio Website</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/resume-builder"
                className="px-4.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-300" />
                <span>Resume Builder</span>
              </Link>

              <Link
                to="/autofill-extension"
                className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-extrabold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Chrome Extension</span>
              </Link>

              <Link
                to="/search-profiles"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Employer Search</span>
              </Link>
            </div>

            {/* Feature trust points */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Free to Use
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1.5 text-slate-600">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Instant /p/:handle
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1.5 text-slate-600">
                <Zap className="w-4 h-4 text-amber-500" />
                1-Click Autofill
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Custom Vector/UI Illustration (6 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-6 order-2"
          >
            <HeroIllustration />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
