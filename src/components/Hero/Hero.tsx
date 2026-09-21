import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { HeroIllustration } from './HeroIllustration';
import { CompanyMarquee } from './CompanyMarquee';
import { MAIN_CATEGORIES } from '../JobCategories/JobCategoriesSection';

interface HeroProps {
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onExploreClick();
    }
  };

  return (
    <section className="pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-12 w-full bg-white overflow-hidden relative">
      {/* Background radial soft ambient lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl 2xl:max-w-[1440px] h-[500px] bg-gradient-to-b from-blue-50/80 via-indigo-50/20 to-transparent -z-10 pointer-events-none rounded-b-[60px]" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 sm:gap-8 xl:gap-12 items-center">
          
          {/* LEFT COLUMN: Content & Filter Card (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-4 lg:space-y-6 order-2 lg:order-1 -mt-8 sm:-mt-10 lg:mt-0 relative z-20"
          >
            {/* Large Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] font-display">
              Build Your Career.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
                Land Your Dream Job.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              Find verified Jobs, Internships, Challenges & Hackathons, Govt Notices, AI Resume Builder, and Portfolios in one seamless platform.
            </p>

            {/* Light Glassmorphic Job Filter Bar */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/90 rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-slate-200/60 max-w-xl space-y-3">
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2.5">
                {/* Search Input */}
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by job title, skill, or company..."
                    className="w-full bg-white/80 text-xs sm:text-sm text-slate-800 placeholder-slate-400 pl-9 pr-3 py-2.5 rounded-xl border border-slate-200/80 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                  />
                </div>

                {/* Filter / Search Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Quick Filter Chips */}
              <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100/80 overflow-x-auto text-[11px] no-scrollbar">
                <span className="text-slate-400 font-medium shrink-0">Popular:</span>
                <button
                  onClick={() => navigate('/challenges')}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 font-bold transition-colors shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1"
                >
                  <span>🏆 Challenges</span>
                  <span className="px-1 py-0.2 bg-amber-500 text-white text-[8px] font-black rounded-sm uppercase">New</span>
                </button>
                {[
                  'Remote', 
                  'Full Time', 
                  'Fresher Tech', 
                  'IT / Tech', 
                  'Government'
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      navigate(`/jobs?search=${encodeURIComponent(tag)}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100/80 hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-medium transition-colors shrink-0 whitespace-nowrap cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Custom Vector/UI Illustration (6 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <HeroIllustration />
          </motion.div>

        </div>

        {/* 5 Main Category Buttons directly below Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-3 sm:pt-6"
        >
          <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {MAIN_CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                const isLastAndOdd = idx === MAIN_CATEGORIES.length - 1 && MAIN_CATEGORIES.length % 2 !== 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/jobs?search=${encodeURIComponent(cat.name)}`)}
                    className={`group flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-3.5 sm:py-7 min-h-[72px] sm:min-h-[84px] rounded-xl border transition-all duration-200 cursor-pointer text-left w-full ${cat.colorScheme.bg} ${cat.colorScheme.border} ${isLastAndOdd ? 'col-span-2 sm:col-span-1' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className={`p-2 sm:p-2.5 rounded-lg shrink-0 flex items-center justify-center shadow-2xs ${cat.colorScheme.iconBg} ${cat.colorScheme.iconColor}`}>
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-[11px] sm:text-sm font-bold tracking-tight leading-tight whitespace-normal break-words ${cat.colorScheme.text}`}>
                          {cat.name}
                        </p>
                        <span className={`inline-block text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-md mt-1 ${cat.colorScheme.badge}`}>
                          {cat.count}
                        </span>
                      </div>
                    </div>

                    <div className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0 text-slate-600">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scrolling Company Logos Marquee */}
      <div className="mt-10 sm:mt-12 w-full">
        <CompanyMarquee />
      </div>
    </section>
  );
};
