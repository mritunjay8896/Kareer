import React from 'react';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  FolderGit2, 
  Award, 
  Link as LinkIcon, 
  Compass, 
  Globe, 
  Edit3, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';
import { FullRegistrationData } from './types';

interface Step12ReviewProps {
  data: FullRegistrationData;
  completionPercentage: number;
  onJumpToStep: (stepIndex: number) => void;
  onSubmit: () => void;
  loading: boolean;
  error?: string | null;
}

export const Step12Review: React.FC<Step12ReviewProps> = ({
  data,
  completionPercentage,
  onJumpToStep,
  onSubmit,
  loading,
  error
}) => {
  const {
    account,
    candidateType,
    personal,
    education,
    experience,
    skills,
    projects,
    certifications,
    achievements,
    links,
    careerPreferences,
    portfolio
  } = data;

  const candidateTypeLabel = {
    student: 'Student',
    fresher: 'Fresher (0 - 1 Years)',
    working_professional: 'Working Professional (1 - 4 Years)',
    experienced_professional: 'Experienced Professional (4+ Years)'
  }[candidateType] || 'Fresher';

  return (
    <div className="space-y-6">
      {/* Header with Completion Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white/95 inline-block mb-2">
              Ready for Submission
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight font-display">
              Review Your Professional Profile
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl leading-relaxed">
              Verify your information before finalizing. You can edit any section below or later from your Glitread candidate dashboard.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shrink-0 min-w-[140px]">
            <div className="text-2xl sm:text-3xl font-black text-white">
              {completionPercentage}%
            </div>
            <div className="text-[11px] font-bold text-blue-100 uppercase tracking-wider mt-0.5">
              Profile Score
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-semibold text-rose-700">
          {error}
        </div>
      )}

      {/* Review Sections Grid */}
      <div className="space-y-4">
        {/* 1. Account & Profile Type */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-extrabold text-slate-900">Account & Profile Type</h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(0)}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Email Address:</span>
              <strong className="text-slate-900 font-bold">{account.email || '—'}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Candidate Category:</span>
              <strong className="text-slate-900 font-bold">{candidateTypeLabel}</strong>
            </div>
          </div>
        </div>

        {/* 2. Personal Information */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-extrabold text-slate-900">Personal Information</h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="space-y-3 pt-3 text-xs">
            <div className="flex items-center gap-3">
              {personal.photoUrl ? (
                <img
                  src={personal.photoUrl}
                  alt={personal.fullName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold shrink-0">
                  {personal.fullName?.charAt(0) || 'U'}
                </div>
              )}
              <div>
                <strong className="text-sm font-black text-slate-900 block font-display">
                  {personal.fullName || '—'}
                </strong>
                <span className="text-xs text-blue-700 font-semibold block">
                  {personal.headline || 'Job Candidate'}
                </span>
                <span className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                  {personal.phone && <span>{personal.phone}</span>}
                  {personal.city && <span>• {personal.city}, {personal.country}</span>}
                </span>
              </div>
            </div>

            {personal.about && (
              <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 text-slate-600 leading-relaxed text-xs">
                {personal.about}
              </div>
            )}
          </div>
        </div>

        {/* 3. Education */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-extrabold text-slate-900">
                Education ({education.length})
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(3)}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="pt-3 space-y-2">
            {education.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No education records provided.</p>
            ) : (
              education.map((edu) => (
                <div key={edu.id} className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 flex items-start justify-between text-xs">
                  <div>
                    <strong className="font-extrabold text-slate-900 block">
                      {edu.degree || 'Degree'}
                    </strong>
                    <span className="text-slate-600 block">{edu.institution}</span>
                    {edu.fieldOfStudy && <span className="text-slate-500 block text-[11px]">{edu.fieldOfStudy}</span>}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-semibold text-slate-600 block">
                      {edu.startYear} - {edu.currentlyStudying ? 'Present' : edu.endYear}
                    </span>
                    {edu.grade && <span className="text-[11px] font-bold text-blue-600 block">{edu.grade}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 4. Experience */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <h4 className="text-sm font-extrabold text-slate-900">
                Work Experience ({experience.length})
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(4)}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="pt-3 space-y-2">
            {experience.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No experience records (Fresh candidate).</p>
            ) : (
              experience.map((exp) => (
                <div key={exp.id} className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 flex items-start justify-between text-xs">
                  <div>
                    <strong className="font-extrabold text-slate-900 block">
                      {exp.jobTitle || 'Role'}
                    </strong>
                    <span className="text-slate-600 block">{exp.company} • {exp.employmentType}</span>
                    {exp.technologies?.length > 0 && (
                      <span className="text-[10px] text-slate-500 block mt-1">
                        Stack: {exp.technologies.join(', ')}
                      </span>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-semibold text-slate-600 block">
                      {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{exp.workMode}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 5. Skills */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-extrabold text-slate-900">
                Skills ({skills.length})
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(5)}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="pt-3 flex flex-wrap gap-1.5">
            {skills.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No skills added.</p>
            ) : (
              skills.map((s) => (
                <span
                  key={s.name}
                  className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-lg"
                >
                  {s.name} <span className="text-[10px] font-medium text-blue-600">({s.level})</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* 6. Projects */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-extrabold text-slate-900">
                Projects ({projects.length})
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(6)}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="pt-3 space-y-2">
            {projects.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No projects added.</p>
            ) : (
              projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="font-extrabold text-slate-900">{proj.name}</strong>
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {proj.projectType}
                    </span>
                  </div>
                  {proj.shortDescription && (
                    <p className="text-slate-600 text-xs mt-1">{proj.shortDescription}</p>
                  )}
                  {proj.technologies?.length > 0 && (
                    <p className="text-[11px] text-blue-600 font-semibold mt-1">
                      {proj.technologies.join(' • ')}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 7. Certifications & Achievements */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-extrabold text-slate-900">
                Credentials & Awards ({certifications.length + achievements.length})
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(7)}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="pt-3 space-y-1 text-xs">
            {certifications.length === 0 && achievements.length === 0 ? (
              <p className="text-slate-400 italic">None added.</p>
            ) : (
              <>
                {certifications.map((c) => (
                  <div key={c.id} className="text-slate-700">
                    📜 <strong>{c.name}</strong> by {c.issuer}
                  </div>
                ))}
                {achievements.map((a) => (
                  <div key={a.id} className="text-slate-700">
                    🏆 <strong>{a.title}</strong> {a.organization ? `(${a.organization})` : ''}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* 8. Links */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-extrabold text-slate-900">Professional Links</h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(8)}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="pt-3 flex flex-wrap gap-2 text-xs">
            {Object.entries(links).filter(([_, url]) => Boolean(url)).length === 0 ? (
              <p className="text-slate-400 italic">No links provided.</p>
            ) : (
              Object.entries(links).map(([key, url]) => {
                if (!url) return null;
                const urlStr = String(url);
                return (
                  <a
                    key={key}
                    href={urlStr.startsWith('http') ? urlStr : `https://${urlStr}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg text-slate-700 font-semibold capitalize transition-colors"
                  >
                    {key}: {urlStr.replace(/^https?:\/\//, '')}
                  </a>
                );
              })
            )}
          </div>
        </div>

        {/* 9. Career Preferences */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-extrabold text-slate-900">Career Preferences</h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(9)}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Looking For:</span>
              <strong className="text-slate-900 font-bold">
                {careerPreferences.lookingFor?.join(', ') || '—'}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Desired Roles:</span>
              <strong className="text-slate-900 font-bold">
                {careerPreferences.desiredRoles?.join(', ') || '—'}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Preferred Locations & Mode:</span>
              <strong className="text-slate-900 font-bold">
                {careerPreferences.locations?.join(', ') || 'Any'} • {careerPreferences.workMode?.join(', ') || 'Any'}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Expected Compensation & Availability:</span>
              <strong className="text-slate-900 font-bold">
                {careerPreferences.expectedSalary} • Joining {careerPreferences.availability}
              </strong>
            </div>
          </div>
        </div>

        {/* 10. Portfolio Setup */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-extrabold text-slate-900">Portfolio Website Preferences</h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(10)}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Portfolio URL:</span>
              <strong className="text-blue-700 font-bold">
                glitread.com/p/{portfolio.username || 'username'}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Visibility:</span>
              <strong className="text-slate-900 font-bold">{portfolio.visibility}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Template Style:</span>
              <strong className="text-slate-900 font-bold">{portfolio.template}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Final Submit Button Container */}
      <div className="p-6 bg-slate-50 border border-slate-200/90 rounded-3xl text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700">
          <ShieldCheck className="w-4 h-4" />
          <span>Profile ready for activation on Glitread</span>
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={onSubmit}
          className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Creating Your Glitread Profile...' : 'Complete Registration & Launch Profile'}
        </button>
        <p className="text-[11px] text-slate-400 max-w-md mx-auto">
          By completing registration, your credentials will be secured and your profile will be ready to apply to jobs and launch your portfolio.
        </p>
      </div>
    </div>
  );
};
