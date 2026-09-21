import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Sparkles, Flame, CheckCircle2, Award, Users, Calendar, ShieldCheck, Zap } from 'lucide-react';
import { ChallengeCard } from './ChallengeCard';
import { ChallengeItem } from '../../types';
import { MOCK_CHALLENGES } from '../../data/mockChallenges';

interface ChallengeSectionProps {
  challenges?: ChallengeItem[];
  bookmarkedChallengeIds?: string[];
  onBookmarkChallenge?: (challengeId: string) => void;
}

export const ChallengeSection: React.FC<ChallengeSectionProps> = ({
  challenges = MOCK_CHALLENGES,
  bookmarkedChallengeIds = [],
  onBookmarkChallenge
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: '🔥 All Challenges' },
    { id: 'Hackathon', label: '🚀 Hackathons' },
    { id: 'AI', label: '🤖 AI & Agents' },
    { id: 'Coding', label: '💻 Coding & DSA' },
    { id: 'Design', label: '🎨 UI/UX Design' },
    { id: 'Business', label: '📊 Business Case' }
  ];

  const filteredChallenges = challenges.filter(c => {
    if (selectedCategory === 'All') return true;
    return c.type.toLowerCase() === selectedCategory.toLowerCase() || c.category.toLowerCase() === selectedCategory.toLowerCase();
  }).slice(0, 4);

  return (
    <section id="challenges-section" className="py-14 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50/70 border-y border-slate-200/80 relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-blue-50 border border-amber-200/80 text-amber-900 text-xs font-extrabold tracking-wide uppercase mb-3 shadow-2xs">
              <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
              <span>Glitread Arena • Live Competitions</span>
              <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[9px] font-black rounded-full uppercase">
                Live
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-display">
              Challenges, Hackathons & Sprints
            </h2>
            
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium max-w-2xl leading-relaxed">
              Compete in verified developer hackathons, AI sprints, and business case competitions. Win cash rewards, earn verified portfolio badges, and fast-track interviews with top tech employers.
            </p>
          </div>

          {/* View All CTA & Live Stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-slate-200/80 shadow-2xs text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Award className="w-4 h-4 text-amber-500" />
                <span>₹10,00,000+ Prizes</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Users className="w-4 h-4 text-blue-600" />
                <span>15k+ Joined</span>
              </div>
            </div>

            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-md shadow-blue-500/20 group transition-all"
            >
              <span>Explore All {challenges.length}+ Challenges</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Challenges Grid (3-4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              isBookmarked={bookmarkedChallengeIds.includes(challenge.id)}
              onBookmark={onBookmarkChallenge}
            />
          ))}
        </div>

        {/* Bottom Banner / Bridge to Portfolio & Jobs */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl border border-blue-800/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-lg">
              <Trophy className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-white">
                Win Hackathons & Auto-Sync Verified Badges to Your Portfolio
              </h4>
              <p className="text-xs text-blue-200/90 font-medium mt-0.5">
                Every project and challenge credential is authenticated by Glitread and showcased to 120+ active hiring partners.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
            <Link
              to="/challenges"
              className="w-full sm:w-auto text-center px-5 py-2.5 bg-white text-slate-950 hover:bg-slate-100 text-xs font-black rounded-xl shadow-md transition-all"
            >
              Browse Glitread Arena →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
