import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Rocket,
  Check,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { JobItem } from '../types';
import { MOCK_JOBS } from '../data/mockData';
import { JobSearchBar } from '../components/Job/JobSearchBar';
import { JobFilterSidebar, FilterState } from '../components/Job/JobFilterSidebar';
import { JobCard } from '../components/Job/JobCard';
import { Breadcrumb } from '../components/UI/Breadcrumb';
import internBoyImg from '../image1/intern_boy.png';

interface JobsPageProps {
  jobsList?: JobItem[];
  onApplyJob: (job: JobItem) => void;
  onBookmarkJob: (jobId: string) => void;
  bookmarkedJobIds: string[];
}

export const JobsPage: React.FC<JobsPageProps> = ({
  jobsList,
  onApplyJob,
  onBookmarkJob,
  bookmarkedJobIds
}) => {
  const activeJobs = jobsList || MOCK_JOBS;
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchExperience, setSearchExperience] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'relevance' | 'salary' | 'applicants'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isCareerPopupOpen, setIsCareerPopupOpen] = useState(false);

  useEffect(() => {
    const handleOpenPopup = () => {
      setIsCareerPopupOpen(true);
    };
    const handleTogglePopup = () => {
      setIsCareerPopupOpen(prev => !prev);
    };
    window.addEventListener('open-career-popup', handleOpenPopup);
    window.addEventListener('toggle-career-popup', handleTogglePopup);
    window.addEventListener('toggle-career-card', handleTogglePopup);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCareerPopupOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-career-popup', handleOpenPopup);
      window.removeEventListener('toggle-career-popup', handleTogglePopup);
      window.removeEventListener('toggle-career-card', handleTogglePopup);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('career-popup-state', { detail: isCareerPopupOpen }));
  }, [isCareerPopupOpen]);

  const [filters, setFilters] = useState<FilterState>({
    workModes: [],
    experiences: [],
    salaryRanges: [],
    departments: [],
    companyTypes: [],
    postedWithin: 'all',
    languages: []
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSearchLocation('');
    setSearchExperience('');
    setFilters({
      workModes: [],
      experiences: [],
      salaryRanges: [],
      departments: [],
      companyTypes: [],
      postedWithin: 'all',
      languages: []
    });
    setCurrentPage(1);
  };

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return activeJobs.filter(job => {
      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesSkills = job.skills.some(s => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesSkills) return false;
      }

      // Location
      if (searchLocation) {
        if (!job.location.toLowerCase().includes(searchLocation.toLowerCase())) return false;
      }

      // Experience
      if (searchExperience) {
        if (!job.experience.toLowerCase().includes(searchExperience.toLowerCase())) return false;
      }

      // Work Modes Filter
      if (filters.workModes.length > 0) {
        const matchesMode = filters.workModes.some(m => job.type.toLowerCase().includes(m.toLowerCase()) || job.location.toLowerCase().includes(m.toLowerCase()));
        if (!matchesMode) return false;
      }

      // Departments Filter
      if (filters.departments.length > 0) {
        if (!filters.departments.includes(job.category)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'salary') {
        return b.applicantsCount - a.applicantsCount;
      }
      if (sortBy === 'applicants') {
        return b.applicantsCount - a.applicantsCount;
      }
      return 0; // Default order
    });
  }, [searchQuery, searchLocation, searchExperience, filters, sortBy]);

  // Pagination
  const pageSize = 6;
  const totalPages = Math.ceil(filteredJobs.length / pageSize) || 1;
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16 pt-3">
      <div className="w-full max-w-[1536px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-3.5">
        
        {/* Inline Top Bar: Breadcrumb + Slim Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4 py-0.5">
          {/* Breadcrumb Navigation */}
          <div className="shrink-0 self-start md:self-center">
            <Breadcrumb items={[{ label: 'Browse Jobs' }]} />
          </div>

          {/* Slim Search Bar */}
          <div className="flex-1 w-full md:max-w-4xl lg:max-w-5xl">
            <JobSearchBar
              query={searchQuery}
              location={searchLocation}
              experience={searchExperience}
              onSearchChange={(q, loc, exp) => {
                setSearchQuery(q);
                setSearchLocation(loc);
                setSearchExperience(exp);
              }}
              onSearchSubmit={() => setCurrentPage(1)}
              slim={true}
            />
          </div>
        </div>

        {/* Main Content Area: 15% Filter, 60% Middle Job List, 20%-25% Right Sidebar */}
        <div className="w-full flex flex-col lg:flex-row gap-3.5 lg:gap-4 xl:gap-5 items-start pt-1">
          
          {/* Filter Sidebar (15% width) */}
          <JobFilterSidebar
            filters={filters}
            onChange={(f) => {
              setFilters(f);
              setCurrentPage(1);
            }}
            onReset={resetFilters}
            isMobileOpen={mobileFilterOpen}
            onCloseMobile={() => setMobileFilterOpen(false)}
            className="w-full lg:w-[15%] shrink-0"
          />

          {/* Job List Column (60% width) */}
          <div className="w-full lg:w-[60%] flex-1 min-w-0 space-y-4">
            
            {/* Top Bar: Count & Sorting */}
            <div className="bg-white rounded-lg sm:rounded-2xl p-1.5 sm:p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden px-2.5 py-1 sm:px-3 sm:py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Filters
                </button>
                <div className="hidden sm:block">
                  <h2 className="hidden sm:block font-bold text-slate-900 text-sm sm:text-base">
                    Showing {filteredJobs.length} Job Vacancies
                  </h2>
                  <p className="hidden sm:block text-xs text-slate-500">Updated every 15 minutes with direct recruiter links</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                <span className="text-slate-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-900 font-semibold rounded-lg sm:rounded-xl px-2 py-1 sm:px-3 sm:py-1.5 focus:outline-none cursor-pointer text-[10.5px] sm:text-xs"
                >
                  <option value="newest">Newest First</option>
                  <option value="relevance">Most Relevant</option>
                  <option value="salary">Highest Salary</option>
                  <option value="applicants">Most Applied</option>
                </select>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {(searchQuery || searchLocation || filters.workModes.length > 0 || filters.departments.length > 0) && (
              <div className="flex items-center gap-2 flex-wrap bg-blue-50/60 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-blue-100 text-xs">
                <span className="font-semibold text-blue-900">Active Filters:</span>
                {searchQuery && (
                  <span className="bg-white text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 font-medium">
                    Keyword: "{searchQuery}"
                  </span>
                )}
                {searchLocation && (
                  <span className="bg-white text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 font-medium">
                    Location: "{searchLocation}"
                  </span>
                )}
                {filters.workModes.map(m => (
                  <span key={m} className="bg-white text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 font-medium">
                    {m}
                  </span>
                ))}
                <button
                  onClick={resetFilters}
                  className="text-blue-600 underline font-semibold ml-auto text-xs cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Job Cards - Mobile Masonry Grid / Desktop Feed */}
            {paginatedJobs.length > 0 ? (
              <div className="columns-1 sm:columns-2 lg:columns-1 gap-2.5 sm:gap-3 space-y-2.5 sm:space-y-0">
                {paginatedJobs.map((job) => (
                  <div key={job.id} className="break-inside-avoid mb-2.5 sm:mb-3">
                    <JobCard
                      job={job}
                      onApply={onApplyJob}
                      isSaved={bookmarkedJobIds.includes(job.id)}
                      onToggleSave={onBookmarkJob}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Building2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">No Jobs Match Your Filter Criteria</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try removing some filters or searching for broader terms like "React", "Data", or "Bangalore".
                  </p>
                </div>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 bg-blue-600 text-white font-semibold text-xs rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200/80 text-xs font-semibold text-slate-700">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <span>
                  Page <strong className="text-slate-900">{currentPage}</strong> of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Right Recommendation Sidebar (Fixed/Sticky while scrolling) */}
          <div className="w-full lg:w-[300px] xl:w-[320px] shrink-0 space-y-3 sm:space-y-4 lg:space-y-5 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            
            {/* No Experience Yet / Break The Loop Card */}
            <div 
              id="no-experience-career-card"
              className="bg-white rounded-xl sm:rounded-[22px] border border-[#DCE8F8] shadow-[0_4px_20px_rgba(21,101,237,0.08)] relative overflow-hidden transition-all duration-300 flex flex-col justify-between p-3.5 sm:p-5"
            >
              {/* Header with Badges & Collapsable/Popup Button */}
              <div className="flex items-center justify-between gap-2 relative z-20 mb-2 sm:mb-2.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Blue pill: 🚀 BREAK THE LOOP */}
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#1565ED] text-white text-[9.5px] sm:text-[11px] font-black uppercase tracking-wider shadow-xs">
                    <Rocket className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white -rotate-12 stroke-[2.2]" />
                    <span>BREAK THE LOOP</span>
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-[10px] sm:text-[11.5px] font-bold">
                    No Experience Yet?
                  </span>
                </div>

                {/* Collapsable Card Popup Button */}
                <button
                  type="button"
                  id="career-card-toggle-btn"
                  onClick={() => setIsCareerPopupOpen(true)}
                  className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg bg-blue-50/90 hover:bg-blue-100 text-[#1565ED] border border-blue-200/80 transition-all flex items-center gap-1 text-[10px] sm:text-[11px] font-bold shrink-0 cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                  aria-label="Open No Experience Card Popup"
                  title="Open Card Popup"
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1565ED]" />
                  <span>Card Popup</span>
                </button>
              </div>

              {/* Subtle pale-blue abstract blob/shape behind the boy */}
              <div className="absolute right-0 top-0 w-[68%] h-[82%] bg-[#EDF5FE] rounded-bl-[120px] rounded-tl-[30px] pointer-events-none z-0" />
              <div className="absolute right-0 bottom-14 w-44 h-44 bg-[#E2EEFD] rounded-full blur-2xl pointer-events-none z-0 opacity-70" />

              {/* Upper-right handwritten-style career annotation */}
              <div className="absolute top-10 right-3 sm:top-12 sm:right-4 select-none pointer-events-none z-10">
                <div className="relative inline-block text-right">
                  {/* Sparks */}
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute -left-3.5 sm:-left-4 -top-1 text-[#1565ED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="2" x2="12" y2="7" />
                    <line x1="4" y1="12" x2="8" y2="10" />
                    <line x1="20" y1="7" x2="16" y2="11" />
                  </svg>
                  {/* Handwritten label */}
                  <div className="text-[9px] sm:text-[10px] font-black leading-[1.1] text-[#1565ED] rotate-[4deg] tracking-tight">
                    Your<br />Career<br />Starts<br />Here
                  </div>
                  {/* Curved arrow pointing toward the boy */}
                  <svg className="w-3.5 h-5 sm:w-4 sm:h-6 text-[#1565ED] ml-auto mt-0.5" viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 2 C18 12, 14 20, 4 23" />
                    <path d="M9 19 L3 23 L7 27" />
                  </svg>
                </div>
              </div>

              {/* Prominent 3D Boy Illustration sitting in the lower-right visual area */}
              <div className="absolute right-[-2px] sm:right-[-4px] bottom-[46px] sm:bottom-[54px] w-[120px] sm:w-[175px] pointer-events-none z-10 flex items-end justify-end">
                <img
                  src={internBoyImg}
                  alt="Student with laptop"
                  className="w-full h-auto object-contain select-none drop-shadow-md"
                  loading="eager"
                />
              </div>

              {/* Foreground Content: Heading, Description */}
              <div className="relative z-10 space-y-2 sm:space-y-3 mb-2.5 sm:mb-4">
                {/* Heading */}
                <h3 className="text-[15px] sm:text-[20px] font-black text-[#0F172A] tracking-tight leading-[1.2] font-display max-w-[170px] sm:max-w-[185px]">
                  Get an Internship to<br />Start Your Career
                </h3>

                {/* Description */}
                <p className="text-[11px] sm:text-[12.5px] text-[#556987] font-normal leading-normal max-w-[155px] sm:max-w-[178px]">
                  Break the “no job, no experience” loop by starting with internships.
                </p>
              </div>

              {/* Full-width CTA Button */}
              <div className="relative z-20 mb-1 sm:mb-3.5">
                <Link
                  to="/internships"
                  className="w-full h-[36px] sm:h-[42px] bg-[#1565ED] hover:bg-[#0E56D6] text-white font-extrabold rounded-lg sm:rounded-[14px] text-xs sm:text-[13px] shadow-[0_8px_20px_rgba(21,101,237,0.32)] hover:shadow-[0_10px_24px_rgba(21,101,237,0.42)] transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-between px-3.5 sm:px-4 group"
                >
                  <span>Internships + Course @ ₹999</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transition-transform group-hover:translate-x-1 stroke-[2.5]" />
                </Link>
              </div>

              {/* Footer */}
              <div className="pt-1.5 sm:pt-2.5 border-t border-[#E3EDFB] flex items-center justify-between text-[11px] sm:text-[12.5px] relative z-10">
                <span className="text-slate-500 truncate">For freshers & students</span>
                <button
                  type="button"
                  onClick={() => setIsCareerPopupOpen(true)}
                  className="text-[#1565ED] hover:text-[#0E56D6] font-bold cursor-pointer hover:underline shrink-0"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Resume Score Card Widget */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-white space-y-2 sm:space-y-3 shadow-md">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200" />
                <h4 className="font-bold text-xs sm:text-sm">Free ATS Resume Checker</h4>
              </div>
              <p className="text-[11px] sm:text-xs text-blue-100 leading-normal sm:leading-relaxed">
                Scan your resume against 500+ job descriptions to boost your interview callbacks by 3x.
              </p>
              <Link
                to="/dashboard"
                className="block text-center py-1.5 sm:py-2 bg-white text-blue-700 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs hover:bg-blue-50 transition-colors"
              >
                Upload Resume & Check Score
              </Link>
            </div>

            {/* Trending Skills Widget */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-xs space-y-2 sm:space-y-3">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" /> High In-Demand Skills
              </h3>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {['React 18', 'TypeScript', 'System Design', 'PyTorch', 'Kafka', 'PostgreSQL', 'Docker', 'Next.js'].map(skill => (
                  <span key={skill} className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-slate-100 text-slate-700 rounded-md sm:rounded-lg text-[10.5px] sm:text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* No Experience Career Card Popup Modal (Adjusted for mobile view) */}
      {isCareerPopupOpen && (
        <div 
          id="career-card-popup-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsCareerPopupOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl sm:rounded-[26px] p-4 sm:p-6 md:p-7 border border-[#DCE8F8] shadow-[0_20px_60px_rgba(15,23,42,0.25)] relative overflow-hidden w-full max-w-[420px] sm:max-w-[450px] max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsCareerPopupOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all z-30 cursor-pointer shadow-xs active:scale-95"
              aria-label="Close popup"
              title="Close"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Subtle pale-blue abstract shapes */}
            <div className="absolute right-0 top-0 w-[70%] h-[80%] bg-[#EDF5FE] rounded-bl-[130px] rounded-tl-[30px] pointer-events-none z-0" />
            <div className="absolute right-0 bottom-12 w-48 h-48 bg-[#E2EEFD] rounded-full blur-2xl pointer-events-none z-0 opacity-70" />

            {/* Upper-right handwritten annotation */}
            <div className="absolute top-10 right-9 sm:top-12 sm:right-11 select-none pointer-events-none z-10">
              <div className="relative inline-block text-right">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute -left-3.5 sm:-left-4 -top-1 text-[#1565ED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="2" x2="12" y2="7" />
                  <line x1="4" y1="12" x2="8" y2="10" />
                  <line x1="20" y1="7" x2="16" y2="11" />
                </svg>
                <div className="text-[9px] sm:text-[10px] font-black leading-[1.1] text-[#1565ED] rotate-[4deg] tracking-tight">
                  Your<br />Career<br />Starts<br />Here
                </div>
                <svg className="w-3.5 h-5 sm:w-4 sm:h-6 text-[#1565ED] ml-auto mt-0.5" viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 2 C18 12, 14 20, 4 23" />
                  <path d="M9 19 L3 23 L7 27" />
                </svg>
              </div>
            </div>

            {/* 3D Boy Illustration */}
            <div className="absolute right-[-4px] sm:right-[-2px] bottom-[54px] sm:bottom-[62px] w-[130px] sm:w-[170px] pointer-events-none z-10 flex items-end justify-end">
              <img
                src={internBoyImg}
                alt="Student with laptop"
                className="w-full h-auto object-contain select-none drop-shadow-md"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-2.5 sm:space-y-3.5 mb-3 sm:mb-4 pr-5">
              <div className="flex flex-col items-start gap-1 sm:gap-1.5">
                <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#1565ED] text-white text-[9.5px] sm:text-[11px] font-black uppercase tracking-wider shadow-xs">
                  <Rocket className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white -rotate-12 stroke-[2.2]" />
                  <span>BREAK THE LOOP</span>
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-[10px] sm:text-[11.5px] font-bold">
                  No Experience Yet?
                </span>
              </div>

              <h3 className="text-[17px] sm:text-[22px] font-black text-[#0F172A] tracking-tight leading-[1.2] font-display max-w-[195px] sm:max-w-[220px]">
                Get an Internship to<br />Start Your Career
              </h3>

              <p className="text-[11.5px] sm:text-[13px] text-[#556987] font-normal leading-relaxed max-w-[185px] sm:max-w-[215px]">
                Break the “no job, no experience” loop by starting with internships. Get real projects, verified certificate, and placement support.
              </p>
            </div>

            {/* CTA Button */}
            <div className="relative z-20 mb-3">
              <Link
                to="/internships"
                onClick={() => setIsCareerPopupOpen(false)}
                className="w-full h-[40px] sm:h-[44px] bg-[#1565ED] hover:bg-[#0E56D6] text-white font-extrabold rounded-xl text-xs sm:text-[13px] shadow-[0_8px_20px_rgba(21,101,237,0.32)] hover:shadow-[0_10px_24px_rgba(21,101,237,0.42)] transition-all flex items-center justify-between px-4 group"
              >
                <span>Internships + Course @ ₹999</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1 stroke-[2.5]" />
              </Link>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-[#E3EDFB] flex items-center justify-between text-[11px] sm:text-[12px] text-slate-500 relative z-10">
              <span className="truncate">Certificate & Placement Support</span>
              <button
                type="button"
                onClick={() => setIsCareerPopupOpen(false)}
                className="text-[#1565ED] hover:text-[#0E56D6] font-bold cursor-pointer hover:underline shrink-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
