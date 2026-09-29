import React from 'react';
import { ResumeData, ResumeSectionId } from '../types/resume';
import { getAccentClasses, getFontFamilyClass, getSpacingClasses } from './templateUtils';

interface TemplateProps {
  data: ResumeData;
}

export const StudentProfessional: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, education, skills, projects, internships, challenges, certifications, achievements, languages, sectionOrder, visibleSections } = data;
  const fontClass = getFontFamilyClass(data.font || 'Inter');
  const accent = getAccentClasses(data.accent || 'navy');
  const spacing = getSpacingClasses(data.spacing || 'Standard');

  const skillsByCategory = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  const renderSection = (sectionId: ResumeSectionId) => {
    if (!visibleSections[sectionId]) return null;

    switch (sectionId) {
      case 'summary':
        if (!summary) return null;
        return (
          <div key="summary" className={spacing.sectionGap}>
            <div className={`font-bold text-[13px] uppercase tracking-wider ${accent.text} border-b border-slate-200 pb-0.5 mb-1.5`}>
              Profile Overview
            </div>
            <p className={`${spacing.bodyText} text-slate-700`}>{summary}</p>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className={spacing.sectionGap}>
            <div className={`font-bold text-[13px] uppercase tracking-wider ${accent.text} border-b border-slate-200 pb-0.5 mb-1.5`}>
              Education & Academic Background
            </div>
            <div className={spacing.itemGap}>
              {education.map((edu) => (
                <div key={edu.id} className="text-slate-900">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[13px] text-slate-900">{edu.institution}</span>
                    <span className="text-[12px] font-medium text-slate-600">{edu.startYear} – {edu.endYear}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[12.5px]">
                    <span className="text-slate-800">{edu.degree} in {edu.field}</span>
                    {edu.grade && <span className="font-semibold text-slate-800">CGPA: {edu.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className={spacing.sectionGap}>
            <div className={`font-bold text-[13px] uppercase tracking-wider ${accent.text} border-b border-slate-200 pb-0.5 mb-1.5`}>
              Technical Skills & Competencies
            </div>
            <div className="space-y-1 text-[12.5px]">
              {(Object.entries(skillsByCategory) as [string, string[]][]).map(([cat, list]) => (
                <div key={cat} className="flex">
                  <span className="font-semibold text-slate-900 min-w-[140px]">{cat}:</span>
                  <span className="text-slate-700">{list.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className={spacing.sectionGap}>
            <div className={`font-bold text-[13px] uppercase tracking-wider ${accent.text} border-b border-slate-200 pb-0.5 mb-1.5`}>
              Projects & Practical Engineering
            </div>
            <div className={spacing.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="text-slate-900">
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[13px]">{proj.title}</span>
                      {proj.techStack && (
                        <span className="text-[11px] font-mono text-slate-500">| {proj.techStack}</span>
                      )}
                    </div>
                    {proj.projectUrl && (
                      <a href={proj.projectUrl} target="_blank" rel="noreferrer" className={`text-[11.5px] font-medium ${accent.text} hover:underline`}>
                        View Project ↗
                      </a>
                    )}
                  </div>
                  <p className={`${spacing.bodyText} text-slate-700 mt-0.5`}>{proj.description}</p>
                  {proj.impact && (
                    <p className={`${spacing.bodyText} text-slate-600 mt-0.5`}>• Key Result: {proj.impact}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'internships':
        if (!internships || internships.length === 0) return null;
        return (
          <div key="internships" className={spacing.sectionGap}>
            <div className={`font-bold text-[13px] uppercase tracking-wider ${accent.text} border-b border-slate-200 pb-0.5 mb-1.5`}>
              Internships & Training
            </div>
            <div className={spacing.itemGap}>
              {internships.map((intern) => (
                <div key={intern.id} className="text-slate-900">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[13px]">{intern.role} – {intern.company}</span>
                    <span className="text-[11.5px] font-medium text-slate-600">
                      {intern.startDate} – {intern.endDate || 'Present'}
                    </span>
                  </div>
                  {intern.description && <p className={`${spacing.bodyText} text-slate-700 mt-0.5`}>{intern.description}</p>}
                  {intern.responsibilities && intern.responsibilities.length > 0 && (
                    <ul className="list-disc ml-4 space-y-0.5 text-slate-700 mt-0.5">
                      {intern.responsibilities.map((r, i) => (
                        <li key={i} className={spacing.bodyText}>{r}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'challenges':
        if (!challenges || challenges.length === 0) return null;
        return (
          <div key="challenges" className={spacing.sectionGap}>
            <div className={`font-bold text-[13px] uppercase tracking-wider ${accent.text} border-b border-slate-200 pb-0.5 mb-1.5`}>
              Hackathons & Competitive Challenges
            </div>
            <div className="space-y-1">
              {challenges.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline text-[12.5px]">
                  <div>
                    <span className="font-semibold text-slate-900">{c.name}</span>
                    <span className="text-slate-600"> ({c.organizer})</span>
                    {c.result && <span className="font-bold text-emerald-800 ml-1.5">• {c.result}</span>}
                  </div>
                  <span className="text-[11.5px] text-slate-500">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className={spacing.sectionGap}>
            <div className={`font-bold text-[13px] uppercase tracking-wider ${accent.text} border-b border-slate-200 pb-0.5 mb-1.5`}>
              Certifications & Credentials
            </div>
            <div className="space-y-0.5">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between text-[12px]">
                  <span>{c.name} — <strong className="text-slate-800">{c.issuer}</strong></span>
                  <span className="text-slate-500">{c.issueDate}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className={spacing.sectionGap}>
            <div className={`font-bold text-[13px] uppercase tracking-wider ${accent.text} border-b border-slate-200 pb-0.5 mb-1.5`}>
              Key Achievements
            </div>
            <ul className="list-disc ml-4 space-y-0.5 text-slate-700">
              {achievements.map((a) => (
                <li key={a.id} className={spacing.bodyText}>
                  <strong>{a.title}</strong>{a.description ? `: ${a.description}` : ''}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className={spacing.sectionGap}>
            <div className={`font-bold text-[13px] uppercase tracking-wider ${accent.text} border-b border-slate-200 pb-0.5 mb-1`}>
              Languages
            </div>
            <p className={`${spacing.bodyText} text-slate-700`}>
              {languages.map((l) => `${l.name} (${l.proficiency})`).join(' • ')}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} p-8 sm:p-10 leading-normal`}>
      <div className="border-b-2 border-slate-900 pb-3 mb-4 text-center">
        <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${accent.text}`}>
          {personalInfo.fullName || 'Student Name'}
        </h1>
        <div className="text-[13px] font-semibold text-slate-700 mt-0.5">
          {personalInfo.targetTitle || 'Aspiring Software Engineer'}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11.5px] text-slate-600 mt-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.github && (
            <span>• <a href={personalInfo.github} target="_blank" rel="noreferrer" className={`${accent.text} underline`}>GitHub</a></span>
          )}
          {personalInfo.linkedIn && (
            <span>• <a href={personalInfo.linkedIn} target="_blank" rel="noreferrer" className={`${accent.text} underline`}>LinkedIn</a></span>
          )}
        </div>
      </div>

      <div>
        {(sectionOrder || []).map((sectionId) => renderSection(sectionId))}
      </div>
    </div>
  );
};
