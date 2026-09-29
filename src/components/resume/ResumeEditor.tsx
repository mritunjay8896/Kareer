import React, { useState } from 'react';
import { ResumeData, ResumeSectionId } from '../../types/resume';
import { PersonalInfoForm } from './sections/PersonalInfoForm';
import { SummaryForm } from './sections/SummaryForm';
import { EducationForm } from './sections/EducationForm';
import { SkillsForm } from './sections/SkillsForm';
import { ProjectsForm } from './sections/ProjectsForm';
import { ExperienceForm } from './sections/ExperienceForm';
import { InternshipsForm } from './sections/InternshipsForm';
import { CertificationsForm } from './sections/CertificationsForm';
import { ChallengesForm } from './sections/ChallengesForm';
import { AchievementsForm } from './sections/AchievementsForm';
import { LanguagesForm } from './sections/LanguagesForm';
import {
  User,
  FileText,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Briefcase,
  Award,
  Trophy,
  ChevronDown,
  ChevronUp,
  Globe2,
  Medal,
} from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export const ResumeEditor: React.FC<Props> = ({ data, onChange }) => {
  // Accordion open states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personalInfo: true,
    summary: true,
    education: true,
    skills: true,
    projects: true,
    experience: false,
    internships: false,
    challenges: false,
    certifications: false,
    achievements: false,
    languages: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateField = <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* 1. Personal Information */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('personalInfo')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Personal Information</h3>
              <p className="text-xs text-slate-500">
                {data.personalInfo.fullName || 'Name not set'} • {data.personalInfo.email || 'Email not set'}
              </p>
            </div>
          </div>
          {openSections.personalInfo ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.personalInfo && (
          <div className="p-4 pt-1 border-t border-slate-100">
            <PersonalInfoForm
              info={data.personalInfo}
              onChange={(updated) => updateField('personalInfo', updated)}
            />
          </div>
        )}
      </div>

      {/* 2. Professional Summary */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('summary')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Professional Summary</h3>
              <p className="text-xs text-slate-500">
                {data.summary ? `${data.summary.slice(0, 45)}...` : 'Brief career intro'}
              </p>
            </div>
          </div>
          {openSections.summary ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.summary && (
          <div className="p-4 pt-1 border-t border-slate-100">
            <SummaryForm
              summary={data.summary}
              targetTitle={data.personalInfo.targetTitle}
              onChange={(updated) => updateField('summary', updated)}
            />
          </div>
        )}
      </div>

      {/* 3. Education */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('education')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Education</h3>
              <p className="text-xs text-slate-500">
                {data.education.length} degree(s) added
              </p>
            </div>
          </div>
          {openSections.education ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.education && (
          <div className="p-4 pt-1 border-t border-slate-100">
            <EducationForm
              education={data.education}
              onChange={(updated) => updateField('education', updated)}
            />
          </div>
        )}
      </div>

      {/* 4. Skills & Competencies */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('skills')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Skills & Tech Stack</h3>
              <p className="text-xs text-slate-500">
                {data.skills.length} skill(s) categorized
              </p>
            </div>
          </div>
          {openSections.skills ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.skills && (
          <div className="p-4 pt-1 border-t border-slate-100">
            <SkillsForm
              skills={data.skills}
              onChange={(updated) => updateField('skills', updated)}
            />
          </div>
        )}
      </div>

      {/* 5. Projects */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('projects')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Projects</h3>
              <p className="text-xs text-slate-500">
                {data.projects.length} project(s) added
              </p>
            </div>
          </div>
          {openSections.projects ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.projects && (
          <div className="p-4 pt-1 border-t border-slate-100">
            <ProjectsForm
              projects={data.projects}
              onChange={(updated) => updateField('projects', updated)}
            />
          </div>
        )}
      </div>

      {/* 6. Internships */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('internships')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xs">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Internships & Training</h3>
              <p className="text-xs text-slate-500">
                {data.internships.length} internship(s)
              </p>
            </div>
          </div>
          {openSections.internships ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.internships && (
          <div className="p-4 pt-1 border-t border-slate-100">
            <InternshipsForm
              internships={data.internships}
              onChange={(updated) => updateField('internships', updated)}
            />
          </div>
        )}
      </div>

      {/* 7. Work Experience */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('experience')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Work Experience</h3>
              <p className="text-xs text-slate-500">
                {data.experience.length === 0 ? 'Empty (hidden on resume for freshers)' : `${data.experience.length} position(s)`}
              </p>
            </div>
          </div>
          {openSections.experience ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.experience && (
          <div className="p-4 pt-1 border-t border-slate-100">
            <ExperienceForm
              experience={data.experience}
              onChange={(updated) => updateField('experience', updated)}
            />
          </div>
        )}
      </div>

      {/* 8. Challenges & Hackathons */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('challenges')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Challenges & Hackathons</h3>
              <p className="text-xs text-slate-500">
                {data.challenges.length} hackathon/challenge(s)
              </p>
            </div>
          </div>
          {openSections.challenges ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.challenges && (
          <div className="p-4 pt-1 border-t border-slate-100">
            <ChallengesForm
              challenges={data.challenges}
              onChange={(updated) => updateField('challenges', updated)}
            />
          </div>
        )}
      </div>

      {/* 9. Certifications */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('certifications')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
              <Medal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Certifications</h3>
              <p className="text-xs text-slate-500">
                {data.certifications.length} certification(s)
              </p>
            </div>
          </div>
          {openSections.certifications ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.certifications && (
          <div className="p-4 pt-1 border-t border-slate-100">
            <CertificationsForm
              certifications={data.certifications}
              onChange={(updated) => updateField('certifications', updated)}
            />
          </div>
        )}
      </div>

      {/* 10. Achievements & Honors */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('achievements')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Achievements & Honors</h3>
              <p className="text-xs text-slate-500">
                {data.achievements.length} achievement(s)
              </p>
            </div>
          </div>
          {openSections.achievements ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.achievements && (
          <div className="p-4 pt-1 border-t border-slate-100">
            <AchievementsForm
              achievements={data.achievements}
              onChange={(updated) => updateField('achievements', updated)}
            />
          </div>
        )}
      </div>

      {/* 11. Languages */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('languages')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Spoken Languages</h3>
              <p className="text-xs text-slate-500">
                {data.languages.length} language(s)
              </p>
            </div>
          </div>
          {openSections.languages ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.languages && (
          <div className="p-4 pt-1 border-t border-slate-100">
            <LanguagesForm
              languages={data.languages}
              onChange={(updated) => updateField('languages', updated)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
