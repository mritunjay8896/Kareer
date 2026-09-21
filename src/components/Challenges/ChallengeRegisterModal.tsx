import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Users, User, Trophy, Sparkles, ShieldCheck, ArrowRight, Link as LinkIcon } from 'lucide-react';
import { ChallengeItem, ChallengeRegistration } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface ChallengeRegisterModalProps {
  challenge: ChallengeItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (registration: ChallengeRegistration) => void;
}

export const ChallengeRegisterModal: React.FC<ChallengeRegisterModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { currentUser, candidateProfile } = useAuth();

  const [participationType, setParticipationType] = useState<'Individual' | 'Team'>('Individual');
  const [teamName, setTeamName] = useState('');
  const [teamMemberEmails, setTeamMemberEmails] = useState('');
  const [fullName, setFullName] = useState(candidateProfile?.fullName || currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [collegeOrOrg, setCollegeOrOrg] = useState(candidateProfile?.education?.[0]?.institution || 'College / University');
  const [portfolioLink, setPortfolioLink] = useState(candidateProfile?.portfolioUrl || '');
  const [linkToPortfolio, setLinkToPortfolio] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !challenge) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newRegistration: ChallengeRegistration = {
      id: `reg-${Date.now()}`,
      registrationId: `reg-${Date.now()}`,
      challengeId: challenge.id,
      challengeSlug: challenge.slug || challenge.id,
      challengeTitle: challenge.title,
      organizer: challenge.organizer,
      studentId: currentUser?.uid || 'student-current',
      studentName: fullName || 'Candidate',
      studentEmail: email || 'student@glitread.com',
      status: 'Registered',
      participationType: participationType,
      teamName: participationType === 'Team' ? (teamName || 'Team Innovation') : undefined,
      teamMembers: participationType === 'Team' 
        ? [fullName, ...teamMemberEmails.split(',').map(m => m.trim()).filter(Boolean)] 
        : [fullName],
      registeredAt: new Date().toISOString().split('T')[0],
      isPortfolioVisible: linkToPortfolio,
      skillsAcquired: challenge.skills.slice(0, 4)
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccess(newRegistration);
    }, 600);
  };

  const handleDone = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100"
      >
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-white text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>Challenge Registration</span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold line-clamp-2">
            {challenge.title}
          </h3>

          <p className="text-xs text-blue-100 mt-1">
            Organized by <strong>{challenge.organizer}</strong> • Prize Pool: <strong>{challenge.prizePool}</strong>
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-slate-900">Registration Confirmed!</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  You are registered for <strong>{challenge.title}</strong>. This challenge is now tracked under your <strong>Student Dashboard</strong>.
                </p>
              </div>

              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 text-left text-xs space-y-1.5">
                <div className="flex items-center justify-between text-blue-900 font-bold">
                  <span>Submission Deadline:</span>
                  <span className="text-rose-600 font-extrabold">{challenge.submissionDeadline}</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  You can submit your repository, video demo, and project link anytime from your dashboard before the deadline.
                </p>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleDone}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
                >
                  Go to Challenge Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Participation Mode Choice */}
              {challenge.participationType === 'Individual or Team' && (
                <div>
                  <label className="text-xs font-extrabold text-slate-900 block mb-1.5">
                    Select Participation Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setParticipationType('Individual')}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        participationType === 'Individual'
                          ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>Solo / Individual</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setParticipationType('Team')}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        participationType === 'Team'
                          ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>Team ({challenge.minTeamSize || 2}-{challenge.maxTeamSize || 4} Members)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Team Details if Team selected */}
              {participationType === 'Team' && (
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. ByteCraft Innovators"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Teammate Email Addresses (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={teamMemberEmails}
                      onChange={(e) => setTeamMemberEmails(e.target.value)}
                      placeholder="member1@college.edu, member2@college.edu"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Candidate Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Candidate Name"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  College / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={collegeOrOrg}
                  onChange={(e) => setCollegeOrOrg(e.target.value)}
                  placeholder="e.g. National Institute of Technology"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Portfolio Integration Switch */}
              <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="link-portfolio"
                  checked={linkToPortfolio}
                  onChange={(e) => setLinkToPortfolio(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5"
                />
                <label htmlFor="link-portfolio" className="text-[11px] text-slate-700 select-none cursor-pointer">
                  <strong className="text-slate-900 block font-bold">Auto-sync with Glitread Portfolio</strong>
                  Showcase this competition and its achievement badges on my public portfolio to get noticed by recruiters.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <span>Complete Free Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </motion.div>
    </div>
  );
};
