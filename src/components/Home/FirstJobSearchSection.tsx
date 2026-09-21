import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  User, 
  GraduationCap, 
  Briefcase, 
  Headphones, 
  UserCheck, 
  Building2, 
  Globe 
} from 'lucide-react';

export const FirstJobSearchSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const tags = [
    { label: 'Fresher Jobs', sub: '0 – 1 Years', icon: User, color: 'bg-blue-50 text-blue-600 border-blue-100', filter: 'Fresher' },
    { label: 'Graduate Jobs', sub: 'Fresh Graduates', icon: GraduationCap, color: 'bg-emerald-50 text-emerald-600 border-emerald-100', filter: 'Graduate' },
    { label: 'Entry-Level IT Jobs', sub: 'Start your tech career', icon: Briefcase, color: 'bg-green-50 text-green-600 border-green-100', filter: 'IT' },
    { label: 'BPO / Call Center', sub: 'Customer Support Jobs', icon: Headphones, color: 'bg-purple-50 text-purple-600 border-purple-100', filter: 'BPO' },
    { label: 'Walk-in Jobs', sub: 'Apply & Join', icon: UserCheck, color: 'bg-amber-50 text-amber-600 border-amber-100', filter: 'Walk-in' },
    { label: 'Campus Hiring', sub: 'On-Campus Jobs', icon: Building2, color: 'bg-sky-50 text-sky-600 border-sky-100', filter: 'Campus' },
    { label: 'Off-Campus Hiring', sub: 'Apply from anywhere', icon: Globe, color: 'bg-blue-50 text-blue-600 border-blue-100', filter: 'Off-Campus' },
  ];

  const popularSearches = [
    'Software Developer',
    'Java',
    'Python',
    'Business Analyst',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/jobs');
    }
  };

  const handleSelectTag = (tag: typeof tags[0]) => {
    navigate(`/jobs?filter=${encodeURIComponent(tag.filter)}`);
  };

  return (
    <section className="w-full bg-white py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto text-center">
        
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-4 sm:mb-6">
          When You're Ready, Find Your First Job.
        </h2>

        {/* Category Cards: Mobile 2-col Masonry Bento Grid / Desktop Flex Row */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 mb-5 sm:mb-6 text-left">
          {tags.map((tag, index) => {
            const Icon = tag.icon;
            const isFeaturedMobile = index === 0;
            return (
              <button
                key={tag.label}
                onClick={() => handleSelectTag(tag)}
                className={`bg-white border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group text-left ${
                  isFeaturedMobile
                    ? 'col-span-2 sm:col-auto rounded-xl sm:rounded-2xl p-2.5 sm:px-3 sm:py-2 flex items-center justify-between sm:justify-start gap-2.5'
                    : 'col-span-1 sm:col-auto rounded-xl sm:rounded-2xl p-2 sm:px-3 sm:py-2 flex items-center gap-2 sm:gap-2.5'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center border shrink-0 ${tag.color}`}>
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2]" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-[11px] sm:text-xs font-extrabold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors truncate">
                      {tag.label}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-slate-500 leading-none mt-0.5 truncate">
                      {tag.sub}
                    </div>
                  </div>
                </div>

                {isFeaturedMobile && (
                  <span className="sm:hidden text-[8.5px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-md shrink-0">
                    High Demand
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search Bar + Popular Searches in a single cohesive row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-w-4xl mx-auto">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="w-full sm:flex-1 sm:min-w-[280px] sm:max-w-md">
            <div className="relative flex items-center bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl p-1 shadow-2xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 ml-2.5 sm:ml-3 mr-1.5 sm:mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, skill, or company..."
                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none pr-2 font-medium"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-colors flex items-center gap-1 shrink-0 shadow-xs cursor-pointer"
              >
                <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline">Search Jobs &gt;</span>
                <span className="xs:hidden">Search</span>
              </button>
            </div>
          </form>

          {/* Popular Searches Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-600">
            <span className="font-bold text-slate-700 mr-0.5 text-[11px] sm:text-xs">Popular Searches:</span>
            {popularSearches.map((item) => (
              <button
                key={item}
                onClick={() => navigate(`/jobs?search=${encodeURIComponent(item)}`)}
                className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white border border-slate-200/90 hover:border-blue-400 hover:text-blue-600 rounded-full text-[10.5px] sm:text-xs font-medium text-slate-600 shadow-2xs transition-all cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
