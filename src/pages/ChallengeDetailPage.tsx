import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Globe, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Bookmark, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Code2, 
  Award, 
  Briefcase, 
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Layers,
  Zap,
  Check
} from 'lucide-react';
import { ChallengeItem, ChallengeRegistration } from '../types';
import { MOCK_CHALLENGES } from '../data/mockChallenges';
import { ChallengeRegisterModal } from '../components/Challenges/ChallengeRegisterModal';
import { ChallengeSubmitModal } from '../components/Challenges/ChallengeSubmitModal';
import { useAuth } from '../context/AuthContext';

interface ChallengeDetailPageProps {
  challenges?: ChallengeItem[];
  bookmarkedIds?: string[];
  onBookmark?: (id: string) => void;
}

export const ChallengeDetailPage: React.FC<ChallengeDetailPageProps> = ({
  challenges = MOCK_CHALLENGES,
  bookmarkedIds = [],
  onBookmark
}) => {
  const { challengeId, slug } = useParams<{ challengeId?: string; slug?: string }>();
  const idOrSlug = challengeId || slug || '';
  const navigate = useNavigate();
  const { currentUser, candidateProfile } = useAuth();

  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationData, setRegistrationData] = useState<ChallengeRegistration | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Find Challenge by slug or id
  const challenge = challenges.find(
    (c) => c.slug === idOrSlug || c.id === idOrSlug || c.challengeId === idOrSlug
  ) || challenges[0];

  useEffect(() => {
    if (challenge) {
      document.title = `${challenge.title} — Register & Participate | Glitread`;
    }
  }, [challenge]);

  const isSaved = bookmarkedIds.includes(challenge?.id || '');

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: challenge.title,
        text: `Participate in ${challenge.title} on Glitread: ${challenge.description}`,
        url: url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleRegisterSuccess = (reg: ChallengeRegistration) => {
    setIsRegistered(true);
    setRegistrationData(reg);
  };

  const handleSubmitSuccess = (data: any) => {
    if (registrationData) {
      setRegistrationData({
        ...registrationData,
        status: 'Submitted',
        ...data
      });
    }
  };

  if (!challenge) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Challenge Not Found</h2>
          <Link to="/challenges" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
            Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-4">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium overflow-x-auto no-scrollbar py-1">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <Link to="/challenges" className="hover:text-blue-600 transition-colors">Challenges</Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{challenge.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Hero Banner & Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          
          {/* Banner Graphic Header */}
          {challenge.bannerImage && (
            <div className="relative h-48 sm:h-64 w-full bg-slate-900 overflow-hidden">
              <img
                src={challenge.bannerImage}
                alt={challenge.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
              
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30">
                  {challenge.status}
                </span>
              </div>
            </div>
          )}

          {/* Hero Body Content */}
          <div className="p-6 sm:p-8 relative">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              
              <div className="space-y-3 max-w-3xl">
                
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                    {challenge.type}
                  </span>

                  {challenge.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Featured Challenge
                    </span>
                  )}

                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {challenge.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight font-display">
                  {challenge.title}
                </h1>

                {/* Organizer Info */}
                <div className="flex items-center gap-2 text-sm text-slate-600 font-semibold flex-wrap">
                  <span>Organized by <strong className="text-slate-900">{challenge.organizer}</strong></span>
                  {challenge.verifiedOrganizer && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-blue-600 text-white" />
                      Verified by Glitread
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {challenge.description}
                </p>

                {/* Meta Highlights Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-medium">Prize Pool</span>
                    <span className="text-base sm:text-lg font-extrabold text-emerald-600 flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      {challenge.prizePool}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-medium">Registration Deadline</span>
                    <span className="text-xs sm:text-sm font-extrabold text-rose-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {challenge.registrationDeadline}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-medium">Participation</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      {challenge.participationType}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-medium">Registered</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {challenge.participantsCount.toLocaleString()} Students
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons Box (Right) */}
              <div className="lg:w-72 w-full p-5 bg-slate-50/90 rounded-2xl border border-slate-200/80 space-y-3 shrink-0">
                <div className="text-center pb-2 border-b border-slate-200/60">
                  <span className="text-xs text-slate-500 font-medium">Registration Status</span>
                  <div className="text-sm font-extrabold text-emerald-600 flex items-center justify-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{challenge.status}</span>
                  </div>
                </div>

                {isRegistered ? (
                  <div className="space-y-2">
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-bold text-center">
                      ✓ You are registered!
                    </div>
                    <button
                      onClick={() => setSubmitModalOpen(true)}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Submit Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setRegisterModalOpen(true)}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Participate Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleShare}
                    className="py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                  </button>

                  <button
                    onClick={() => onBookmark && onBookmark(challenge.id)}
                    className={`py-2 px-3 border rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs ${
                      isSaved 
                        ? 'bg-blue-50 border-blue-200 text-blue-700' 
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-600 text-blue-600' : 'text-slate-500'}`} />
                    <span>{isSaved ? 'Saved' : 'Bookmark'}</span>
                  </button>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 text-center font-medium">
                  Free Registration • Verifiable Portfolio Badge
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 2-Column Detail Grid: Main Content + Sidebar Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Content (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Problem Statement Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Problem Statement & Challenge Brief</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {challenge.problemStatement}
              </p>
            </div>

            {/* What You Need to Build / Deliverables */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Code2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">What You Need To Build & Submit</h2>
              </div>

              {/* Requirements */}
              {challenge.requirements && challenge.requirements.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Core Technical Requirements
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {challenge.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Deliverables */}
              {challenge.deliverables && challenge.deliverables.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Expected Deliverables
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {challenge.deliverables.map((del, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="font-medium text-slate-800">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies Allowed */}
              {challenge.technologiesAllowed && challenge.technologiesAllowed.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Technologies Allowed
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.technologiesAllowed.map((tech, idx) => (
                      <span key={idx} className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Timeline Visualizer */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Competition Timeline</h2>
              </div>

              <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-blue-100 my-4 ml-3">
                {challenge.timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <div className={`absolute -left-[31px] sm:-left-[39px] top-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                      step.completed 
                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                        : step.active
                        ? 'bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}>
                      {step.completed ? '✓' : idx + 1}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                          {step.title}
                        </h4>
                        <span className="text-[11px] font-bold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-md">
                          {step.date}
                        </span>
                      </div>
                      {step.description && (
                        <p className="text-xs text-slate-500 font-medium">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prizes & Awards */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">Prizes & Recognition</h2>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Total Pool: {challenge.prizePool}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {challenge.prizes.map((prize, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-br from-slate-50 to-amber-50/30 rounded-2xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                        {prize.position}
                      </span>
                      {prize.amount && (
                        <span className="text-sm font-black text-slate-900">
                          {prize.amount}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      {prize.title}
                    </h4>

                    {prize.perks && prize.perks.length > 0 && (
                      <ul className="space-y-1 text-[11px] text-slate-600 pt-1 border-t border-slate-200/50">
                        {prize.perks.map((perk, pIdx) => (
                          <li key={pIdx} className="flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Judging Criteria Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Award className="w-5 h-5 text-blue-600" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Judging Criteria</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-extrabold text-[10px]">
                      <th className="py-2.5 pr-4">Criteria</th>
                      <th className="py-2.5 px-4 text-right">Weight</th>
                      <th className="py-2.5 pl-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {challenge.judgingCriteria.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 pr-4 font-bold text-slate-900">
                          {item.criteria}
                        </td>
                        <td className="py-3 px-4 text-right font-black text-blue-600">
                          {item.weight}%
                        </td>
                        <td className="py-3 pl-4 text-slate-600 text-[11px]">
                          {item.description || 'Evaluation based on industry benchmarks and jury review.'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Challenge Rules */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Rules & Code of Conduct</h2>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
                {challenge.rules.map((rule, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="text-slate-800">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Sidebar: Overview, Skills & Organizer (1 Col) */}
          <div className="space-y-6">
            
            {/* Quick Overview Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-3">
                Challenge Overview
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 font-medium">Eligibility:</span>
                  <span className="font-bold text-slate-900 text-right">{challenge.eligibility}</span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 font-medium">Mode / Location:</span>
                  <span className="font-bold text-slate-900 text-right">{challenge.mode} ({challenge.location || 'Virtual'})</span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 font-medium">Team Size:</span>
                  <span className="font-bold text-slate-900 text-right">
                    {challenge.participationType === 'Individual' ? 'Solo (1 Member)' : `${challenge.minTeamSize || 1} - ${challenge.maxTeamSize || 4} Members`}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 font-medium">Challenge Starts:</span>
                  <span className="font-bold text-slate-900 text-right">{challenge.challengeStart}</span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 font-medium">Submission Due:</span>
                  <span className="font-bold text-rose-600 text-right">{challenge.submissionDeadline}</span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 font-medium">Result Date:</span>
                  <span className="font-bold text-slate-900 text-right">{challenge.resultDate}</span>
                </div>
              </div>
            </div>

            {/* Skills You'll Build */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Skills You'll Showcase</span>
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {challenge.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Organizer Profile Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3.5">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm ${challenge.organizerLogoBg || 'bg-slate-900 text-white'} shadow-xs shrink-0`}>
                  {challenge.organizerLogo || challenge.organizer.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{challenge.organizer}</h4>
                  {challenge.verifiedOrganizer && (
                    <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Organizer
                    </span>
                  )}
                </div>
              </div>

              {challenge.organizerAbout && (
                <p className="text-xs text-slate-600 leading-relaxed">
                  {challenge.organizerAbout}
                </p>
              )}

              {challenge.organizerWebsite && (
                <a
                  href={challenge.organizerWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Glitread Portfolio Integration Note */}
            <div className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl space-y-2.5 shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider">Portfolio Synchronized</h4>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed font-medium">
                Completing this challenge adds an official verified achievement credential directly onto your public Glitread candidate portfolio.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Registration Modal */}
      <ChallengeRegisterModal
        challenge={challenge}
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSuccess={handleRegisterSuccess}
      />

      {/* Submit Project Modal */}
      <ChallengeSubmitModal
        challenge={challenge}
        registration={registrationData}
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        onSubmitSuccess={handleSubmitSuccess}
      />

    </div>
  );
};
