import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Globe, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Bookmark, 
  Share2, 
  ShieldCheck,
  Zap,
  Code2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ChallengeItem } from '../../types';

interface ChallengeCardProps {
  challenge: ChallengeItem;
  onBookmark?: (challengeId: string) => void;
  isBookmarked?: boolean;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onBookmark,
  isBookmarked = false,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;
    navigate(`/challenges/${challenge.slug || challenge.id}`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = window.location.origin + `/challenges/${challenge.slug || challenge.id}`;
    if (navigator.share) {
      navigator.share({
        title: challenge.title,
        text: `Check out ${challenge.title} on Glitread: ${challenge.description}`,
        url: url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert('Challenge link copied to clipboard!');
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookmark) {
      onBookmark(challenge.id);
    }
  };

  // Subtle category accents
  const getCategoryTheme = (type: string, category: string) => {
    const combined = `${type} ${category}`.toLowerCase();
    if (combined.includes('ai') || combined.includes('agent')) {
      return {
        badge: 'bg-purple-50 text-purple-700 border-purple-200/80',
        dot: 'bg-purple-500',
        accentBar: 'hover:border-purple-300'
      };
    }
    if (combined.includes('design') || combined.includes('ui/ux')) {
      return {
        badge: 'bg-pink-50 text-pink-700 border-pink-200/80',
        dot: 'bg-pink-500',
        accentBar: 'hover:border-pink-300'
      };
    }
    if (combined.includes('business') || combined.includes('finance') || combined.includes('case')) {
      return {
        badge: 'bg-amber-50 text-amber-800 border-amber-200/80',
        dot: 'bg-amber-500',
        accentBar: 'hover:border-amber-300'
      };
    }
    if (combined.includes('marketing') || combined.includes('non-tech') || combined.includes('sustainability') || combined.includes('green')) {
      return {
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
        dot: 'bg-emerald-500',
        accentBar: 'hover:border-emerald-300'
      };
    }
    // Default / Hackathon / Coding: Blue Accent
    return {
      badge: 'bg-blue-50 text-blue-700 border-blue-200/80',
      dot: 'bg-blue-600',
      accentBar: 'hover:border-blue-300'
    };
  };

  const theme = getCategoryTheme(challenge.type, challenge.category);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      onClick={handleCardClick}
      className={`group relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between ${theme.accentBar}`}
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category / Type Badge */}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${theme.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
              {challenge.type}
            </span>

            {/* Featured Badge */}
            {challenge.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                Featured
              </span>
            )}

            {/* Difficulty Badge */}
            <span className="text-[11px] font-semibold text-slate-500 px-2 py-0.5 bg-slate-100/80 rounded-md">
              {challenge.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Share Challenge"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleSaveClick}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-400 hover:text-blue-600 hover:bg-slate-100'
              }`}
              title={isBookmarked ? 'Saved to Bookmarks' : 'Bookmark Challenge'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Organizer Info */}
        <div className="mb-3.5">
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {challenge.title}
          </h3>

          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600 font-medium flex-wrap">
            <span>By {challenge.organizer}</span>
            {challenge.verifiedOrganizer && (
              <span className="inline-flex items-center gap-0.5 text-blue-600 font-semibold" title="Verified by Glitread">
                <CheckCircle2 className="w-3.5 h-3.5 fill-blue-50 text-blue-600" />
                <span className="text-[10px]">Verified</span>
              </span>
            )}
          </div>
        </div>

        {/* Challenge Short Description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {challenge.description}
        </p>

        {/* Small Challenge Metadata */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 mb-4">
          <div className="flex items-center gap-1.5 truncate">
            <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{challenge.mode} ({challenge.location || 'Virtual'})</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{challenge.participationType}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate col-span-2 text-slate-700 font-medium">
            <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>Deadline: <strong className="text-slate-900 font-bold">{challenge.registrationDeadline}</strong></span>
          </div>
        </div>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {challenge.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[10.5px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs"
            >
              {skill}
            </span>
          ))}
          {challenge.skills.length > 3 && (
            <span className="text-[10px] text-slate-400 font-semibold px-1.5 py-0.5">
              +{challenge.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Row: Prize, Participants & CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div>
          <div className="flex items-center gap-1 text-emerald-700 font-extrabold text-sm sm:text-base">
            <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{challenge.prizePool}</span>
          </div>
          <span className="text-[10.5px] text-slate-400 font-medium">
            {challenge.participantsCount.toLocaleString()} Participants
          </span>
        </div>

        <Link
          to={`/challenges/${challenge.slug || challenge.id}`}
          className="inline-flex items-center gap-1 px-3.5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-xs group/btn shrink-0"
        >
          <span>View Challenge</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};
