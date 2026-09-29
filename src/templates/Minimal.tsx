import React from 'react';
import { ResumeData, ResumeSectionId } from '../types/resume';
import { getAccentClasses, getFontFamilyClass, getSpacingClasses } from './templateUtils';

interface TemplateProps {
  data: ResumeData;
}

export const Minimal: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, education, skills, experience, internships, projects, certifications, achievements, challenges, languages, sectionOrder, visibleSections } = data;
  const fontClass = getFontFamilyClass(data.font || 'Inter');
  const accent = getAccentClasses(data.accent || 'black');
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
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              Summary
            </div>
            <p className={`${spacing.bodyText} text-slate-800`}>{summary}</p>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className={spacing.sectionGap}>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              Experience
            </div>
            <div className={spacing.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-[13px] text-slate-900">{exp.role}</span>
                    <span className="text-[11px] text-slate-500">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-[12px] text-slate-600 mb-1">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
                  {exp.description && <p className={`${spacing.bodyText} text-slate-700`}>{exp.description}</p>}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc ml-4 space-y-0.5 text-slate-700 mt-1">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className={spacing.bodyText}>{r}</li>
                      ))}
                    </ul>
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
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              Internships
            </div>
            <div className={spacing.itemGap}>
              {internships.map((intern) => (
                <div key={intern.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-[13px] text-slate-900">{intern.role}</span>
                    <span className="text-[11px] text-slate-500">{intern.startDate} — {intern.endDate || 'Present'}</span>
                  </div>
                  <div className="text-[12px] text-slate-600 mb-1">{intern.company}</div>
                  {intern.responsibilities && intern.responsibilities.length > 0 && (
                    <ul className="list-disc ml-4 space-y-0.5 text-slate-700 mt-1">
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

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className={spacing.sectionGap}>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              Education
            </div>
            <div className={spacing.itemGap}>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-[12.5px]">
                  <div>
                    <span className="font-semibold text-slate-900">{edu.degree} in {edu.field}</span>
                    <div className="text-slate-600 text-[12px]">{edu.institution}</div>
                  </div>
                  <span className="text-[11px] text-slate-500">{edu.startYear} — {edu.endYear}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className={spacing.sectionGap}>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
              Skills
            </div>
            <div className="space-y-1 text-[12.5px]">
              {(Object.entries(skillsByCategory) as [string, string[]][]).map(([cat, list]) => (
                <div key={cat} className="flex">
                  <span className="font-medium text-slate-500 min-w-[130px]">{cat}:</span>
                  <span className="text-slate-800">{list.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className={spacing.sectionGap}>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              Projects
            </div>
            <div className={spacing.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-[13px] text-slate-900">{proj.title}</span>
                    {proj.projectUrl && (
                      <a href={proj.projectUrl} target="_blank" rel="noreferrer" className="text-[11px] text-slate-500 hover:text-slate-900 underline">
                        link ↗
                      </a>
                    )}
                  </div>
                  <p className={`${spacing.bodyText} text-slate-700 mt-0.5`}>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'challenges':
        if (!challenges || challenges.length === 0) return null;
        return (
          <div key="challenges" className={spacing.sectionGap}>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              Hackathons
            </div>
            <div className="space-y-1">
              {challenges.map((c) => (
                <div key={c.id} className="flex justify-between text-[12px]">
                  <span>{c.name} ({c.organizer}) {c.result && <strong className="text-slate-800">[{c.result}]</strong>}</span>
                  <span className="text-[11px] text-slate-500">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className={spacing.sectionGap}>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              Certifications
            </div>
            <div className="space-y-0.5 text-[12px]">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between">
                  <span>{c.name} — {c.issuer}</span>
                  <span className="text-[11px] text-slate-500">{c.issueDate}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className={spacing.sectionGap}>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              Languages
            </div>
            <p className={`${spacing.bodyText} text-slate-700`}>
              {languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} p-8 sm:p-10 leading-normal`}>
      <div className="pb-4 mb-4 border-b border-slate-100">
        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-slate-950">
          {personalInfo.fullName || 'Candidate Name'}
        </h1>
        <div className="text-[13px] text-slate-500 mt-0.5">
          {personalInfo.targetTitle || 'Software Engineer'}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-slate-500 mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedIn && (
            <a href={personalInfo.linkedIn} target="_blank" rel="noreferrer" className="underline hover:text-slate-900">
              LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="underline hover:text-slate-900">
              GitHub
            </a>
          )}
        </div>
      </div>

      <div>
        {(sectionOrder || []).map((sectionId) => renderSection(sectionId))}
      </div>
    </div>
  );
};
