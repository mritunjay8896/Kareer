import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  Star, 
  Zap,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { JobItem } from '../../types';

interface JobCardProps {
  job: JobItem;
  onApply: (job: JobItem) => void;
  isSaved?: boolean;
  onToggleSave?: (jobId: string) => void;
  layout?: 'bar' | 'card';
}

export const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  onApply, 
  isSaved = false, 
  onToggleSave,
  layout = 'bar'
}) => {
  const navigate = useNavigate();
  const [logoFailed, setLogoFailed] = React.useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // If user clicked buttons or links, don't navigate main card
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;
    navigate(`/job/${job.slug || job.id}`);
  };

  const shareJob = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job opening for ${job.title} at ${job.company}`,
        url: window.location.origin + `/job/${job.slug || job.id}`
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin + `/job/${job.slug || job.id}`);
      alert('Job link copied to clipboard!');
    }
  };

  // If compact card layout requested
  if (layout === 'card') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
        onClick={handleCardClick}
        className="group relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200/80 hover:border-blue-500/40 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
      >
        <div>
          {/* Top Badges & Actions */}
          <div className="flex items-start justify-between gap-2.5 sm:gap-3 mb-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Link 
                  to={`/company/${job.companySlug || job.company.toLowerCase().replace(/\s+/g, '-')}`}
                  className="font-bold text-slate-900 hover:text-blue-600 transition-colors text-[11px] sm:text-sm line-clamp-1"
                >
                  {job.company}
                </Link>
                {job.verified && (
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 shrink-0" title="Verified Employer" />
                )}
                {job.rating && (
                  <div className="flex items-center gap-0.5 sm:gap-1 bg-amber-50 px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold text-amber-700 shrink-0">
                    <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-amber-400 text-amber-400" />
                    <span>{job.rating}</span>
                  </div>
                )}
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight truncate">{job.department || 'Technology & Engineering'}</p>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <button
                onClick={shareJob}
                className="p-1 sm:p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Share Job"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onToggleSave) onToggleSave(job.id);
                }}
                className={`p-1 sm:p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isSaved 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
                title={isSaved ? 'Saved' : 'Save Job'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Job Title */}
          <Link 
            to={`/job/${job.slug || job.id}`}
            className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1 sm:mb-1.5 block leading-snug"
          >
            {job.title}
          </Link>

          {/* Key Information Badges */}
          <div className="flex items-center flex-wrap gap-y-1 sm:gap-y-1.5 gap-x-2 sm:gap-x-3 text-[11px] sm:text-xs font-medium text-slate-600 mb-2 sm:mb-2.5">
            <div className="flex items-center gap-1 text-slate-700">
              <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              <span>{job.experience}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-900 font-semibold">
              <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
              <span>{job.salary}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-700">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              <span className="truncate max-w-[110px] sm:max-w-[140px]">{job.location}</span>
            </div>

            <div className="bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold text-slate-700">
              {job.type}
            </div>
          </div>

          {/* Job Description Snippet */}
          <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2 sm:mb-2.5">
            {job.description}
          </p>

          {/* Skill Tags */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-1.5 flex-wrap mb-2 sm:mb-2.5">
            {job.skills.slice(0, 4).map((skill, idx) => (
              <span 
                key={idx}
                className="px-1.5 sm:px-2 py-0.5 bg-slate-50 text-slate-600 text-[9.5px] sm:text-[10.5px] font-medium rounded-md border border-slate-200/60"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 px-0.5 sm:px-1">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Footer / CTA Area */}
        <div className="pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 sm:gap-3 text-slate-500">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1 text-[10px] sm:text-[11px]">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400" />
              {job.postedTime}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {job.urgent && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                <Zap className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Urgent
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onApply(job);
              }}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-xs hover:shadow-md flex items-center gap-1 text-[11px] sm:text-xs cursor-pointer"
            >
              Apply Now <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Primary: Bar Style Rectangular List Style
  const companyInitial = job.company ? job.company.substring(0, 2).toUpperCase() : 'CO';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={handleCardClick}
      className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-blue-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer w-full flex flex-col md:flex-row md:items-center justify-between gap-4 text-left"
    >
      {/* Left/Main Column: Logo & Comprehensive Job Details */}
      <div className="flex items-start gap-3.5 sm:gap-4 flex-1 min-w-0">
        {/* Company Avatar / Logo */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-blue-50/40 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs group-hover:border-blue-400 transition-colors">
          {job.logo && !logoFailed ? (
            <img
              src={job.logo}
              alt={job.company}
              onError={() => setLogoFailed(true)}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-black text-xs sm:text-sm text-blue-700 bg-blue-100/60 rounded-lg">
              {companyInitial}
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Row 1: Title & Status Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link 
              to={`/job/${job.slug || job.id}`}
              className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug"
            >
              {job.title}
            </Link>

            {job.urgent && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                <Zap className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Urgent
              </span>
            )}
            {job.featured && (
              <span className="inline-flex items-center text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Row 2: Company, Rating, Verified & Category */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600">
            <Link 
              to={`/company/${job.companySlug || job.company.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-bold text-slate-800 hover:text-blue-600 transition-colors line-clamp-1"
            >
              {job.company}
            </Link>

            {job.verified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" title="Verified Employer" />
            )}

            {job.rating && (
              <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-700">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                <span>{job.rating}</span>
              </div>
            )}

            <span className="text-slate-300">•</span>
            <span className="text-slate-500 text-[11px] sm:text-xs truncate max-w-[180px]">
              {job.department || job.category || 'Technology'}
            </span>
          </div>

          {/* Row 3: Meta Info Bar (Experience, Salary, Location, Type) */}
          <div className="flex items-center flex-wrap gap-y-1 gap-x-2.5 sm:gap-x-3 text-[11px] sm:text-xs font-medium text-slate-600 pt-0.5">
            <div className="flex items-center gap-1 text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
              <Briefcase className="w-3 h-3 text-slate-400" />
              <span>{job.experience}</span>
            </div>

            <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 font-bold">
              <DollarSign className="w-3 h-3 text-emerald-600" />
              <span>{job.salary}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="truncate max-w-[120px] sm:max-w-[160px]">{job.location}</span>
            </div>

            <div className="bg-blue-50 text-blue-700 border border-blue-200/60 px-2 py-0.5 rounded-md text-[10.5px] sm:text-[11px] font-bold">
              {job.type}
            </div>
          </div>

          {/* Row 4: Description Snippet & Skills */}
          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1 leading-relaxed pt-0.5">
            {job.description}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            {job.skills.slice(0, 4).map((skill, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 bg-slate-100/80 text-slate-700 text-[10px] sm:text-[11px] font-medium rounded-md border border-slate-200/50"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="text-[10px] font-semibold text-slate-400 px-1">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Timestamps & Action Buttons */}
      <div className="shrink-0 flex items-center md:flex-col md:items-end justify-between md:justify-center gap-2.5 sm:gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 md:pl-4 md:border-l md:border-slate-100">
        {/* Meta / Save / Share Row */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-400 font-medium">
            <Clock className="w-3 h-3 text-slate-400" />
            {job.postedTime}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={shareJob}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Share Job"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleSave) onToggleSave(job.id);
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isSaved 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title={isSaved ? 'Saved' : 'Save Job'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onApply(job);
          }}
          className="px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer whitespace-nowrap active:scale-95"
        >
          <span>Apply Now</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
