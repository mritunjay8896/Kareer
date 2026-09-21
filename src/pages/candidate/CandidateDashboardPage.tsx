import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCheck, 
  Bookmark, 
  FileText, 
  User, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Briefcase,
  Trophy,
  Award,
  ExternalLink,
  Code2,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchCandidateApplications, fetchPublishedJobs } from '../../lib/db';
import { JobApplication, JobItem, ChallengeRegistration } from '../../types';
import { MOCK_STUDENT_REGISTRATIONS, MOCK_CHALLENGES } from '../../data/mockChallenges';
import { ChallengeSubmitModal } from '../../components/Challenges/ChallengeSubmitModal';

export const CandidateDashboardPage: React.FC = () => {
  const { currentUser, candidateProfile, updateCandidateProfile } = useAuth();
  
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<JobItem[]>([]);
  const [registrations, setRegistrations] = useState<ChallengeRegistration[]>(MOCK_STUDENT_REGISTRATIONS);
  const [loading, setLoading] = useState(true);
  const [selectedChallengeToSubmit, setSelectedChallengeToSubmit] = useState<any>(null);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  const loadData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const [apps, jobs] = await Promise.all([
        fetchCandidateApplications(currentUser.uid),
        fetchPublishedJobs()
      ]);
      setApplications(apps);
      setRecommendedJobs(jobs.slice(0, 3));
    } catch (e) {
      console.error('Error loading candidate dashboard:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const profile = candidateProfile || {
    fullName: 'Candidate',
    headline: 'Software Engineer',
    location: 'India',
    atsScore: 88,
    profileCompletion: 85,
    resumeName: 'Resume.pdf'
  };

  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted' || a.status === 'shortlisted').length;
  const interviewCount = applications.filter(a => a.status === 'Interview Scheduled' || a.status === 'interview').length;
  const challengesWon = registrations.filter(r => r.rank || r.status === 'Winner').length;

  const handleSubmitModalOpen = (reg: ChallengeRegistration) => {
    const fullChallenge = MOCK_CHALLENGES.find(c => c.id === reg.challengeId) || {
      id: reg.challengeId,
      title: reg.challengeTitle,
      organizer: reg.organizer,
      submissionDeadline: 'April 20, 2026',
      skills: reg.skillsAcquired || ['React', 'TypeScript']
    };
    setSelectedChallengeToSubmit({ ...fullChallenge, registration: reg });
    setSubmitModalOpen(true);
  };

  const handleSubmitSuccess = (data: any) => {
    if (selectedChallengeToSubmit?.registration) {
      setRegistrations(prev => prev.map(r => {
        if (r.id === selectedChallengeToSubmit.registration.id) {
          return {
            ...r,
            status: 'Submitted',
            projectTitle: data.projectTitle,
            projectDescription: data.projectDescription,
            githubUrl: data.githubUrl,
            demoUrl: data.demoUrl,
            submittedAt: 'Just now'
          };
        }
        return r;
      }));
    }
  };

  const togglePortfolioSync = (regId: string) => {
    setRegistrations(prev => prev.map(r => {
      if (r.id === regId) {
        return { ...r, isPortfolioVisible: !r.isPortfolioVisible };
      }
      return r;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Candidate Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center border-2 border-white/20 shadow-md shrink-0">
                {profile.fullName ? profile.fullName.substring(0, 2).toUpperCase() : 'ME'}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold">{profile.fullName}</h1>
                  <span className="px-2.5 py-0.5 bg-blue-500/30 text-blue-300 text-xs font-semibold rounded-full border border-blue-400/30">
                    Pro Candidate
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium line-clamp-1">{profile.headline}</p>
                <p className="text-xs text-slate-400">{profile.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <Link
                to="/challenges"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                <span>Explore Challenges</span>
              </Link>
              <Link
                to="/candidate/profile"
                className="px-4 py-2.5 bg-white text-slate-900 font-extrabold text-xs rounded-xl hover:bg-slate-100 transition-colors shadow-xs"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 border-t border-white/10 mt-6 text-xs">
            <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
              <span className="text-slate-400 block mb-0.5">Applied Jobs</span>
              <span className="text-xl font-extrabold text-white">{applications.length}</span>
            </div>

            <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
              <span className="text-slate-400 block mb-0.5">Shortlisted</span>
              <span className="text-xl font-extrabold text-emerald-400">{shortlistedCount}</span>
            </div>

            <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
              <span className="text-slate-400 block mb-0.5">Interview Calls</span>
              <span className="text-xl font-extrabold text-amber-400">{interviewCount}</span>
            </div>

            <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
              <span className="text-slate-400 block mb-0.5">Competitions</span>
              <span className="text-xl font-extrabold text-purple-300">{registrations.length} Joined</span>
            </div>

            <div className="p-3 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10">
              <span className="text-slate-400 block mb-0.5">ATS Readiness</span>
              <span className="text-xl font-extrabold text-blue-400">{profile.atsScore || 88}%</span>
            </div>
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Content (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* My Challenges & Competitions Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <h2 className="text-base font-bold text-slate-900">
                    My Registered Challenges ({registrations.length})
                  </h2>
                </div>
                <Link to="/challenges" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <span>Browse Arena</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {registrations.length === 0 ? (
                <div className="py-8 text-center space-y-3">
                  <Trophy className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500">You haven't registered for any competitions or hackathons yet.</p>
                  <Link
                    to="/challenges"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Browse Live Challenges
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {registrations.map(reg => (
                    <div key={reg.id} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/70 hover:border-slate-300 transition-all space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 hover:text-blue-600">
                              <Link to={`/challenges/${reg.challengeSlug || reg.challengeId}`}>
                                {reg.challengeTitle}
                              </Link>
                            </h3>
                            {reg.rank && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-black rounded-md flex items-center gap-1 border border-amber-300">
                                <Award className="w-3 h-3 text-amber-600" />
                                {reg.rank}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            By {reg.organizer} • {reg.participationType} {reg.teamName ? `(${reg.teamName})` : ''} • Registered {reg.registeredAt}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-center">
                          <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${
                            reg.status === 'Winner' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            reg.status === 'Submitted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            reg.status === 'Under Evaluation' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                            {reg.status}
                          </span>
                        </div>
                      </div>

                      {/* Project Submission info if already submitted */}
                      {reg.projectTitle && (
                        <div className="p-2.5 bg-white rounded-xl border border-slate-200/70 text-xs text-slate-700 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 truncate">Project: {reg.projectTitle}</span>
                            {reg.submittedAt && <span className="text-[10px] text-slate-400">Submitted {reg.submittedAt}</span>}
                          </div>
                          {reg.projectDescription && (
                            <p className="text-[11px] text-slate-500 line-clamp-1">{reg.projectDescription}</p>
                          )}
                          <div className="flex items-center gap-3 pt-1 text-[11px]">
                            {reg.githubUrl && (
                              <a href={reg.githubUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                                <Code2 className="w-3 h-3" /> GitHub Repo
                              </a>
                            )}
                            {reg.demoUrl && (
                              <a href={reg.demoUrl} target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" /> Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Bar for Registration */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
                        <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={reg.isPortfolioVisible}
                            onChange={() => togglePortfolioSync(reg.id)}
                            className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                          />
                          <span>Show on Public Portfolio</span>
                        </label>

                        <div className="flex items-center gap-2">
                          {reg.status === 'Registered' && (
                            <button
                              onClick={() => handleSubmitModalOpen(reg)}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg shadow-2xs transition-colors"
                            >
                              Submit Solution
                            </button>
                          )}
                          <Link
                            to={`/challenges/${reg.challengeSlug || reg.challengeId}`}
                            className="text-[11px] font-bold text-slate-500 hover:text-blue-600"
                          >
                            View Brief →
                          </Link>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ATS Score Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-600" /> ATS Resume Score & Readiness
                </h2>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                  High Readiness
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
                  <span className="text-xs font-bold text-blue-900 block">Overall ATS Score</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-blue-600">{profile.atsScore || 88}</span>
                    <span className="text-xs text-slate-500 font-semibold">/ 100 Points</span>
                  </div>
                  <p className="text-[11px] text-blue-800 leading-snug">
                    Your resume matches high keyword density requirements for modern Tech and BPO job posts.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">Profile Completion</span>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${profile.profileCompletion || 85}%` }}></div>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    {profile.profileCompletion || 85}% complete. Add your challenge badges to reach 100%.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Tracker */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Your Active Job Applications ({applications.length})</h2>
                <Link to="/candidate/applications" className="text-xs font-semibold text-blue-600 hover:underline">
                  View Full History →
                </Link>
              </div>

              {loading ? (
                <div className="py-8 text-center text-xs text-slate-400">Loading your applications...</div>
              ) : applications.length === 0 ? (
                <div className="py-8 text-center space-y-3">
                  <p className="text-xs text-slate-500">You haven't applied to any job vacancies yet.</p>
                  <Link
                    to="/jobs"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Browse Opportunities & Apply
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map(app => (
                    <div key={app.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-lg shrink-0">
                          {app.companyLogo || 'C'}
                        </div>
                        <div>
                          <h3 className="font-bold text-xs text-slate-900">{app.jobTitle}</h3>
                          <p className="text-[11px] text-slate-500">{app.companyName} • Applied {app.appliedDate}</p>
                        </div>
                      </div>

                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                        app.status === 'Shortlisted' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        app.status === 'Interview Scheduled' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        app.status === 'Offer' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-blue-50 text-blue-700 border-blue-100'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Live Hackathons & Challenges Spotlight */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" /> Featured Live Challenges
              </h3>

              <div className="space-y-3">
                {MOCK_CHALLENGES.slice(0, 2).map(challenge => (
                  <Link
                    key={challenge.id}
                    to={`/challenges/${challenge.slug || challenge.id}`}
                    className="block p-3.5 bg-slate-50 hover:bg-blue-50/50 rounded-2xl border border-slate-200/60 transition-colors group"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded-md border border-blue-200/80">
                        {challenge.type}
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-600">
                        {challenge.prizePool}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {challenge.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">By {challenge.organizer} • {challenge.registrationDeadline}</p>
                  </Link>
                ))}
              </div>

              <Link to="/challenges" className="block text-center text-xs font-bold text-blue-600 hover:underline pt-1">
                Explore 50+ Challenges →
              </Link>
            </div>

            {/* Recommended Jobs */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> Recommended For You
              </h3>

              <div className="space-y-3">
                {recommendedJobs.map(job => (
                  <Link
                    key={job.id}
                    to={`/job/${job.id}`}
                    className="block p-3 bg-slate-50 hover:bg-blue-50/50 rounded-2xl border border-slate-200/60 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {job.logo || 'J'}
                      </span>
                      <span className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {job.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-9.5">{job.company} • {job.salary}</p>
                  </Link>
                ))}
              </div>

              <Link to="/jobs" className="block text-center text-xs font-bold text-blue-600 hover:underline pt-2">
                Browse All Opportunities →
              </Link>
            </div>

            {/* Active Resume */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Candidate Resume</h4>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800 truncate">{profile.resumeName || 'Resume.pdf'}</span>
                <span className="text-[10px] text-emerald-600 font-bold">Active</span>
              </div>
              <button 
                onClick={() => alert('Resume updated.')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" /> Upload New Version
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Submit Modal */}
      {selectedChallengeToSubmit && (
        <ChallengeSubmitModal
          challenge={selectedChallengeToSubmit}
          registration={selectedChallengeToSubmit.registration}
          isOpen={submitModalOpen}
          onClose={() => {
            setSubmitModalOpen(false);
            setSelectedChallengeToSubmit(null);
          }}
          onSubmitSuccess={handleSubmitSuccess}
        />
      )}

    </div>
  );
};
