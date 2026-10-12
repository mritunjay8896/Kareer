import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  ArrowRight,
  Search,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Lock,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_JOBS } from '../../data/mockData';
import { JobItem } from '../../types';
import { JobCard } from '../Job/JobCard';
import { JobDetailModal } from './JobDetailModal';
import { useAuth } from '../../context/AuthContext';

interface OpportunitySectionProps {
  onApplyJob: (job: JobItem) => void;
  onBookmarkJob: (jobId: string) => void;
  bookmarkedJobIds: string[];
}

export const OpportunitySection: React.FC<OpportunitySectionProps> = ({
  onApplyJob,
  onBookmarkJob,
  bookmarkedJobIds
}) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('Recommended');
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const tabsRef = useRef<HTMLDivElement>(null);

  const tabs = [
    'Recommended',
    'Jobs',
    'Internships',
    'Government Jobs',
    'Remote Jobs',
    'IT',
    'Finance',
    'Marketing',
    'Data Science',
    'Engineering'
  ];

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 260;
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Filter jobs based on active tab and search query
  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(filterQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(filterQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTab === 'Recommended') return true;
    if (activeTab === 'Jobs') return !job.isGovernment && (job.type as string) !== 'Internship';
    if (activeTab === 'Internships') return (job.type as string) === 'Internship' || job.title.toLowerCase().includes('intern');
    if (activeTab === 'Government Jobs') return job.isGovernment || job.category === 'IT';
    if (activeTab === 'Remote Jobs') return job.type === 'Remote' || job.location.includes('Remote');
    
    return job.category === activeTab || job.type === activeTab;
  });

  return (
    <section className="pt-10 pb-16 bg-slate-50/50" id="jobs-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>15,000+ Active Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Explore Opportunities
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Apply directly to top hiring companies, tech startups, and government notices.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter by title, skill, or company..."
              className="w-full bg-white text-xs text-slate-900 placeholder-slate-400 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-100 outline-none transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Filter Tabs Bar with Navigation Arrow Buttons on Each Side */}
        <div className="relative flex items-center gap-2">
          {/* Left Nav Button */}
          <button
            onClick={() => scrollTabs('left')}
            aria-label="Scroll left"
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shrink-0 shadow-2xs hover:border-blue-300 transition-all flex items-center justify-center active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>

          {/* Scrollable Tabs */}
          <div
            ref={tabsRef}
            className="flex items-center gap-2 overflow-x-auto py-1 scroll-smooth scrollbar-none no-scrollbar flex-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Nav Button */}
          <button
            onClick={() => scrollTabs('right')}
            aria-label="Scroll right"
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shrink-0 shadow-2xs hover:border-blue-300 transition-all flex items-center justify-center active:scale-95"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Unauthenticated Member Lock OR Authenticated Jobs Masonry Grid */}
        {!currentUser ? (
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-gradient-to-b from-slate-50/60 to-white p-6 sm:p-10 text-center shadow-xs">
            {/* Blurred background preview of job cards */}
            <div className="absolute inset-0 filter blur-md opacity-30 pointer-events-none select-none overflow-hidden p-4">
              <div className="columns-1 sm:columns-3 gap-4 space-y-4">
                {filteredJobs.slice(0, 6).map((job) => (
                  <div key={job.id} className="break-inside-avoid">
                    <JobCard job={job} onApply={() => {}} />
                  </div>
                ))}
              </div>
            </div>

            {/* Foreground Lock & CTA Content */}
            <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-200 text-blue-600 flex items-center justify-center mb-4 shadow-xs">
                <Lock className="w-7 h-7 stroke-[2.2]" />
              </div>

              <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full mb-2">
                Member Protected Opportunities
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display mb-2">
                Log In to Unlock 15,000+ Jobs & Internships
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Active job vacancies, salary insights, recruiter contact details, and 1-click applications are reserved for authenticated Glitread members.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/login"
                  state={{ from: { pathname: '/jobs' } }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Log In to View Jobs</span>
                </Link>

                <Link
                  to="/register"
                  state={{ from: { pathname: '/jobs' } }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-blue-600" />
                  <span>Register Free Account</span>
                </Link>
              </div>
            </div>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredJobs.slice(0, 6).map((job) => (
              <div key={job.id} className="break-inside-avoid">
                <JobCard
                  job={job}
                  onApply={(j) => setSelectedJob(j)}
                  isSaved={bookmarkedJobIds.includes(job.id)}
                  onToggleSave={(id) => onBookmarkJob(id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
            <p className="text-sm text-slate-500 font-medium">No opportunities match your filter.</p>
            <button
              onClick={() => {
                setActiveTab('Recommended');
                setFilterQuery('');
              }}
              className="mt-3 text-xs font-bold text-blue-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center pt-4">
          <Link
            to={currentUser ? "/jobs" : "/login"}
            state={{ from: { pathname: '/jobs' } }}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs py-2.5 px-5 rounded-xl border border-slate-200 shadow-2xs transition-all hover:border-blue-300 hover:text-blue-600"
          >
            <span>Browse All {MOCK_JOBS.length}+ Opportunities</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

      </div>

      {/* Modal View for selected job */}
      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={(job) => {
          onApplyJob(job);
        }}
        onBookmark={(jobId) => onBookmarkJob(jobId)}
        isBookmarked={selectedJob ? bookmarkedJobIds.includes(selectedJob.id) : false}
      />
    </section>
  );
};
