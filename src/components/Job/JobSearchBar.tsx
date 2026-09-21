import React, { useState } from 'react';
import { Search, MapPin, Briefcase, X, Sparkles } from 'lucide-react';

interface JobSearchBarProps {
  query: string;
  location: string;
  experience: string;
  language?: string;
  onSearchChange: (query: string, location: string, experience: string, language?: string) => void;
  onSearchSubmit: () => void;
  slim?: boolean;
}

export const JobSearchBar: React.FC<JobSearchBarProps> = ({
  query,
  location,
  experience,
  onSearchChange,
  onSearchSubmit,
  slim = false
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularSearches = [
    'React Developer',
    'Full Stack Engineer',
    'Data Analyst',
    'Remote Jobs',
    'Fresher Hiring',
    'FinTech'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
    setShowSuggestions(false);
  };

  return (
    <div className={`bg-white rounded-lg sm:rounded-xl ${slim ? 'p-1 sm:p-1.5 shadow-2xs' : 'p-1.5 sm:p-2 shadow-xs'} border border-slate-200/90 w-full relative`}>
      <form onSubmit={handleSubmit} className={`flex flex-col md:flex-row items-center ${slim ? 'gap-1 sm:gap-1.5' : 'gap-1.5 sm:gap-2'}`}>
        
        {/* Row 1 on Mobile: Keyword Search + Compact Search Button / Inline on Desktop */}
        <div className="flex items-center gap-1 sm:gap-1.5 w-full md:contents">
          {/* Keyword Search */}
          <div className={`relative flex-1 w-full flex items-center gap-1 sm:gap-1.5 ${slim ? 'px-2 py-1 sm:px-2.5 sm:py-1.5' : 'px-2.5 py-1 sm:px-3 sm:py-2'} bg-slate-50 md:bg-transparent rounded-lg border border-slate-200/60 md:border-none focus-within:ring-2 md:focus-within:ring-0 focus-within:ring-blue-500`}>
            <Search className={`${slim ? 'w-3.5 h-3.5 sm:w-4 sm:h-4' : 'w-4 h-4 sm:w-5 sm:h-5'} text-slate-400 flex-shrink-0`} />
            <input
              type="text"
              value={query}
              onChange={(e) => onSearchChange(e.target.value, location, experience)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search Job Title, Skills, or Company"
              className={`w-full bg-transparent ${slim ? 'text-[11px] sm:text-[12.5px]' : 'text-[11px] sm:text-xs md:text-sm'} font-medium text-slate-900 placeholder-slate-400 focus:outline-none`}
            />
            {query && (
              <button
                type="button"
                onClick={() => onSearchChange('', location, experience)}
                className="p-0.5 sm:p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Search CTA on Mobile */}
          <button
            type="submit"
            className="md:hidden px-2.5 sm:px-3.5 py-1 sm:py-1.5 h-[28px] sm:h-[34px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] sm:text-xs rounded-lg transition-colors shadow-2xs flex items-center justify-center gap-1 shrink-0 cursor-pointer"
          >
            <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Search</span>
          </button>
        </div>

        <div className={`hidden md:block ${slim ? 'h-5' : 'h-7'} w-[1px] bg-slate-200`}></div>

        {/* Row 2 on Mobile: 2-column Bento Filter Grid / Inline on Desktop */}
        <div className="grid grid-cols-2 gap-1 sm:gap-1.5 w-full md:contents">
          {/* Location Input */}
          <div className={`relative w-full ${slim ? 'md:w-44 px-1.5 py-0.5 sm:px-2 sm:py-1.5' : 'md:w-56 px-2 py-1 sm:px-3 sm:py-2'} flex items-center gap-1 sm:gap-1.5 bg-slate-50 md:bg-transparent rounded-lg border border-slate-200/60 md:border-none`}>
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => onSearchChange(query, e.target.value, experience)}
              placeholder="Location"
              className="w-full bg-transparent text-[10px] sm:text-xs md:text-[12.5px] font-medium text-slate-900 placeholder-slate-400 focus:outline-none truncate"
            />
          </div>

          <div className={`hidden md:block ${slim ? 'h-5' : 'h-7'} w-[1px] bg-slate-200`}></div>

          {/* Experience Select */}
          <div className={`relative w-full ${slim ? 'md:w-36 px-1.5 py-0.5 sm:px-2 sm:py-1.5' : 'md:w-40 px-2 py-1 sm:px-3 sm:py-2'} flex items-center gap-1 sm:gap-1.5 bg-slate-50 md:bg-transparent rounded-lg border border-slate-200/60 md:border-none`}>
            <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-slate-400 shrink-0" />
            <select
              value={experience}
              onChange={(e) => onSearchChange(query, location, e.target.value)}
              className="w-full bg-transparent text-[10px] sm:text-xs md:text-[12.5px] font-medium text-slate-700 focus:outline-none cursor-pointer truncate"
            >
              <option value="">Exp: Any</option>
              <option value="Freshers (0 Yrs)">0 Yrs</option>
              <option value="1-3 Yrs">1-3 Yrs</option>
              <option value="3-5 Yrs">3-5 Yrs</option>
              <option value="5+ Yrs">5+ Yrs</option>
            </select>
          </div>
        </div>

        {/* Desktop Search CTA */}
        <button
          type="submit"
          className={`hidden md:flex items-center justify-center gap-1.5 w-auto ${slim ? 'px-4 py-1.5 h-8 sm:h-8.5 text-xs' : 'px-7 py-3 text-xs sm:text-sm'} bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-xs hover:shadow-md shrink-0 cursor-pointer`}
        >
          <Search className={`${slim ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
          <span>Search</span>
        </button>
      </form>

      {/* Auto Suggestions Popover */}
      {showSuggestions && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-40 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popular Searches
            </span>
            <button
              onClick={() => setShowSuggestions(false)}
              className="text-slate-400 hover:text-slate-600 text-[11px]"
            >
              Close
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {popularSearches.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSearchChange(pill, location, experience);
                  onSearchSubmit();
                  setShowSuggestions(false);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-medium rounded-lg transition-colors border border-slate-200/60"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
