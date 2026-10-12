import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  ExternalLink, 
  FileText, 
  Globe, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  Filter, 
  X, 
  GraduationCap, 
  Github, 
  Linkedin, 
  Send,
  Building,
  Award,
  ChevronRight,
  SlidersHorizontal,
  Eye
} from 'lucide-react';
import { MOCK_CANDIDATES, CandidateProfileItem } from '../../data/mockCandidates';

export const CandidateSearchPage: React.FC = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedNotice, setSelectedNotice] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [onlyVerifiedPortfolio, setOnlyVerifiedPortfolio] = useState(false);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);

  // Selected Candidate for Detailed Modal View
  const [activeCandidate, setActiveCandidate] = useState<CandidateProfileItem | null>(null);
  const [contactCandidate, setContactCandidate] = useState<CandidateProfileItem | null>(null);
  const [messageSent, setMessageSent] = useState(false);
  const [messageText, setMessageText] = useState('Hi! We reviewed your Glitread portfolio and would love to speak with you regarding our open role.');

  // Roles list for quick pill filtering
  const roleCategories = [
    'All',
    'Full Stack Engineer',
    'Frontend & UI/UX Engineer',
    'Backend & Cloud Engineer',
    'AI / ML Engineer',
    'Mobile App Developer',
    'DevOps & SRE Engineer',
  ];

  // Filtering Logic
  const filteredCandidates = useMemo(() => {
    return MOCK_CANDIDATES.filter((candidate) => {
      // Keyword matching
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = candidate.name.toLowerCase().includes(query);
        const matchesRole = candidate.role.toLowerCase().includes(query);
        const matchesHeadline = candidate.headline.toLowerCase().includes(query);
        const matchesLocation = candidate.location.toLowerCase().includes(query);
        const matchesSkills = candidate.skills.some((s) => s.toLowerCase().includes(query));
        const matchesBio = candidate.bio.toLowerCase().includes(query);

        if (!matchesName && !matchesRole && !matchesHeadline && !matchesLocation && !matchesSkills && !matchesBio) {
          return false;
        }
      }

      // Role filter
      if (selectedRole !== 'All' && candidate.role !== selectedRole) {
        return false;
      }

      // Experience filter
      if (selectedExperience === 'Fresher' && candidate.experienceYears > 1) return false;
      if (selectedExperience === '1-2 Years' && (candidate.experienceYears < 1 || candidate.experienceYears > 2)) return false;
      if (selectedExperience === '3+ Years' && candidate.experienceYears < 3) return false;

      // Notice period filter
      if (selectedNotice !== 'All' && candidate.noticePeriod !== selectedNotice) {
        return false;
      }

      // Work mode filter
      if (selectedWorkMode !== 'All' && candidate.workMode !== selectedWorkMode) {
        return false;
      }

      // Verified Portfolio toggle
      if (onlyVerifiedPortfolio && !candidate.verifiedPortfolio) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedRole, selectedExperience, selectedNotice, selectedWorkMode, onlyVerifiedPortfolio]);

  const toggleShortlist = (id: string) => {
    setShortlistedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setContactCandidate(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-6">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Direct Employer Talent Search (No Dashboard Required)
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Search & Discover Candidate Profiles
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Directly explore candidate personal portfolio websites, view verified ATS resumes, and connect with top job seekers without logging into a heavy recruiter dashboard.
            </p>
          </div>

          {/* Search Bar & Instant Filters */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by skill (React, Node, Python), job title, or candidate name..."
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick dropdown filters */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Experience</option>
                <option value="Fresher">Fresher / 0-1 Yr</option>
                <option value="1-2 Years">1 - 2 Years</option>
                <option value="3+ Years">3+ Years</option>
              </select>

              <select
                value={selectedNotice}
                onChange={(e) => setSelectedNotice(e.target.value)}
                className="px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="All">Any Notice Period</option>
                <option value="Immediate">Immediate Joiner</option>
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days</option>
              </select>

              <select
                value={selectedWorkMode}
                onChange={(e) => setSelectedWorkMode(e.target.value)}
                className="px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Work Modes</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
              </select>
            </div>
          </div>

          {/* Role Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 no-scrollbar">
            <span className="text-xs font-bold text-slate-500 shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Roles:
            </span>
            {roleCategories.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  selectedRole === role
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter and Active Count */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 px-1">
          <div>
            Showing <strong className="text-slate-900 font-bold">{filteredCandidates.length}</strong> matching candidate {filteredCandidates.length === 1 ? 'profile' : 'profiles'}
            {shortlistedIds.length > 0 && (
              <span className="ml-3 text-blue-600 font-semibold">
                • {shortlistedIds.length} candidate{shortlistedIds.length > 1 ? 's' : ''} saved in shortlist
              </span>
            )}
          </div>
          {(searchQuery || selectedRole !== 'All' || selectedExperience !== 'All' || selectedNotice !== 'All' || selectedWorkMode !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRole('All');
                setSelectedExperience('All');
                setSelectedNotice('All');
                setSelectedWorkMode('All');
              }}
              className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCandidates.map((candidate) => {
            const isShortlisted = shortlistedIds.includes(candidate.id);

            return (
              <div
                key={candidate.id}
                className="bg-white rounded-2xl border border-slate-200/80 hover:border-blue-400/80 hover:shadow-md transition-all duration-200 flex flex-col justify-between p-5 group relative"
              >
                {/* Card Top: Avatar, Name, Notice, Shortlist */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 shadow-2xs shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                            {candidate.name}
                          </h3>
                          {candidate.verifiedPortfolio && (
                            <span title="Verified Portfolio Website" className="text-blue-600">
                              <CheckCircle2 className="w-4 h-4" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-slate-500 line-clamp-1">
                          {candidate.role}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleShortlist(candidate.id)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isShortlisted
                          ? 'bg-blue-50 border-blue-200 text-blue-600'
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                      }`}
                      title={isShortlisted ? 'Remove from shortlist' : 'Shortlist candidate'}
                    >
                      {isShortlisted ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Headline & Badges */}
                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {candidate.headline}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-600">
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {candidate.location}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                      <Briefcase className="w-3 h-3 text-slate-400" />
                      {candidate.experienceLabel}
                    </span>
                    <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-md font-semibold">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {candidate.noticePeriod}
                    </span>
                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200/60 px-2 py-0.5 rounded-md font-bold">
                      <Award className="w-3 h-3 text-blue-600" />
                      ATS {candidate.atsScore}%
                    </span>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
                    {candidate.skills.slice(0, 5).map((skill) => (
                      <button
                        key={skill}
                        onClick={() => setSearchQuery(skill)}
                        className="text-[10px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 px-2 py-0.5 rounded-md transition-colors"
                      >
                        {skill}
                      </button>
                    ))}
                    {candidate.skills.length > 5 && (
                      <span className="text-[10px] font-medium text-slate-400 px-1 py-0.5">
                        +{candidate.skills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions: View Portfolio, View Resume, Invite */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* View Portfolio Button */}
                    <Link
                      to={`/p/${candidate.handle}`}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1 transition-all border border-blue-200/60"
                      title="Open Live Portfolio Website"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Portfolio
                    </Link>

                    {/* View Resume Modal Button */}
                    <button
                      onClick={() => setActiveCandidate(candidate)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-all"
                      title="Inspect Profile & ATS Resume"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Resume
                    </button>
                  </div>

                  {/* Contact / Invite button */}
                  <button
                    onClick={() => setContactCandidate(candidate)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Connect
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredCandidates.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No candidates match your current search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try removing some filter restrictions or searching for broader terms like "React" or "Python".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRole('All');
                setSelectedExperience('All');
                setSelectedNotice('All');
                setSelectedWorkMode('All');
              }}
              className="mt-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>

      {/* Candidate Profile & Resume Modal */}
      {activeCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 space-y-6 relative">
            <button
              onClick={() => setActiveCandidate(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-start gap-4 pr-10">
              <img
                src={activeCandidate.avatar}
                alt={activeCandidate.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-100 shadow-sm"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-slate-900 font-display">
                    {activeCandidate.name}
                  </h2>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-bold">
                    ATS {activeCandidate.atsScore}%
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700">{activeCandidate.headline}</p>
                <p className="text-xs text-slate-500">
                  {activeCandidate.location} • {activeCandidate.experienceLabel} • Notice: <strong>{activeCandidate.noticePeriod}</strong>
                </p>
              </div>
            </div>

            {/* Direct Links */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Link
                to={`/p/${activeCandidate.handle}`}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Globe className="w-3.5 h-3.5" />
                Open Live Portfolio Website
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </Link>
              {activeCandidate.github && (
                <a
                  href={activeCandidate.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              )}
              {activeCandidate.linkedin && (
                <a
                  href={activeCandidate.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              )}
            </div>

            {/* About / Bio */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Professional Summary</h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {activeCandidate.bio}
              </p>
            </div>

            {/* Verified Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Core Technical Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeCandidate.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Work Experience</h4>
              <div className="space-y-2.5">
                {activeCandidate.experience.map((exp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{exp.role}</span>
                      <span className="text-[11px] font-medium text-slate-500">{exp.period}</span>
                    </div>
                    <div className="text-xs font-semibold text-blue-600">{exp.company}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{exp.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Featured Portfolio Projects</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeCandidate.featuredProjects.map((proj, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <h5 className="font-bold text-xs text-slate-900">{proj.title}</h5>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{proj.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.tags.map((t) => (
                        <span key={t} className="text-[9.5px] font-semibold bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Education</h4>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{activeCandidate.education.degree}</div>
                  <div className="text-slate-500 text-[11px]">{activeCandidate.education.institution}</div>
                </div>
                <span className="text-xs font-semibold text-slate-400">{activeCandidate.education.year}</span>
              </div>
            </div>

            {/* Footer action in modal */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveCandidate(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setContactCandidate(activeCandidate);
                  setActiveCandidate(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs cursor-pointer"
              >
                Connect with {activeCandidate.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct Contact Modal */}
      {contactCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-5 relative">
            <button
              onClick={() => setContactCandidate(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900 font-display">
                Contact {contactCandidate.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Send an immediate interview invite or opportunity note directly to this candidate.
              </p>
            </div>

            {messageSent ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-sm text-emerald-900">Message Delivered!</h4>
                <p className="text-xs text-emerald-700">
                  Your inquiry and contact details have been sent to {contactCandidate.name} ({contactCandidate.email}).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Company & Role</label>
                  <input
                    type="text"
                    defaultValue="Engineering Talent Team, TechCorp"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Work Email</label>
                  <input
                    type="email"
                    defaultValue="hiring@techcorp.io"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Opportunity Message</label>
                  <textarea
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setContactCandidate(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Invitation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
