import React from 'react';
import { ResumeData, ResumeSectionId } from '../types/resume';
import { getAccentClasses, getFontFamilyClass, getSpacingClasses } from './templateUtils';

interface TemplateProps {
  data: ResumeData;
}

export const Technical: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, skills, experience, projects, education, challenges, certifications, languages, sectionOrder, visibleSections } = data;
  const fontClass = getFontFamilyClass(data.font || 'Roboto');
  const accent = getAccentClasses(data.accent || 'black');
  const spacing = getSpacingClasses(data.spacing || 'Compact');

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
            <div className="font-mono text-[12px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
              // PROFILE SUMMARY
            </div>
            <p className={`${spacing.bodyText} text-slate-800`}>{summary}</p>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className={spacing.sectionGap}>
            <div className="font-mono text-[12px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
              // TECHNICAL STACK & PROFICIENCIES
            </div>
            <div className="space-y-1 font-mono text-[12px]">
              {(Object.entries(skillsByCategory) as [string, string[]][]).map(([cat, list]) => (
                <div key={cat} className="flex">
                  <span className="font-bold text-slate-900 min-w-[130px]">{cat}:</span>
                  <span className="text-slate-800 font-sans text-[12.5px]">{list.join(' • ')}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className={spacing.sectionGap}>
            <div className="font-mono text-[12px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
              // FEATURED CODE REPOSITORIES & PROJECTS
            </div>
            <div className={spacing.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="text-slate-900">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[13px] text-slate-950 font-mono">{proj.title}</span>
                    <div className="space-x-3 text-[11.5px]">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-blue-900 underline font-mono">
                          github
                        </a>
                      )}
                      {proj.projectUrl && (
                        <a href={proj.projectUrl} target="_blank" rel="noreferrer" className="text-blue-900 underline font-mono">
                          live-demo
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.techStack && (
                    <div className="text-[11.5px] font-mono text-slate-600 mt-0.5">
                      Stack: [{proj.techStack}]
                    </div>
                  )}
                  <p className={`${spacing.bodyText} text-slate-800 mt-0.5`}>{proj.description}</p>
                  {proj.impact && (
                    <p className={`${spacing.bodyText} text-slate-700 italic mt-0.5`}>• Impact: {proj.impact}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className={spacing.sectionGap}>
            <div className="font-mono text-[12px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
              // ENGINEERING EXPERIENCE
            </div>
            <div className={spacing.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="text-slate-900">
                  <div className="flex justify-between items-baseline font-mono text-[12.5px]">
                    <span className="font-bold text-slate-950">{exp.role} @ {exp.company}</span>
                    <span className="text-slate-600 text-[11.5px]">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className={`${spacing.bodyText} text-slate-800 mt-0.5`}>{exp.description}</p>}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc ml-4 space-y-0.5 text-slate-800 mt-0.5">
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

      case 'challenges':
        if (!challenges || challenges.length === 0) return null;
        return (
          <div key="challenges" className={spacing.sectionGap}>
            <div className="font-mono text-[12px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
              // HACKATHONS & CODING CHALLENGES
            </div>
            <div className="space-y-1">
              {challenges.map((c) => (
                <div key={c.id} className="flex justify-between text-[12px]">
                  <span>
                    <strong className="font-mono">{c.name}</strong> ({c.organizer})
                    {c.result && <span className="font-bold text-emerald-800 ml-1">[{c.result}]</span>}
                  </span>
                  <span className="font-mono text-[11px] text-slate-600">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className={spacing.sectionGap}>
            <div className="font-mono text-[12px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
              // EDUCATION
            </div>
            <div className="space-y-1">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-[12.5px]">
                  <span><strong>{edu.institution}</strong> — {edu.degree} in {edu.field}</span>
                  <span className="font-mono text-[11.5px] text-slate-600">{edu.startYear} - {edu.endYear}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className={spacing.sectionGap}>
            <div className="font-mono text-[12px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
              // CERTIFICATIONS
            </div>
            <div className="space-y-0.5 text-[12px]">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <span>{cert.name} ({cert.issuer})</span>
                  <span className="font-mono text-[11px] text-slate-600">{cert.issueDate}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className={spacing.sectionGap}>
            <div className="font-mono text-[12px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-0.5">
              // SPOKEN LANGUAGES
            </div>
            <p className={`${spacing.bodyText} text-slate-800`}>
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
      <div className="border-b-2 border-slate-950 pb-3 mb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono text-slate-950">
          {personalInfo.fullName || 'Candidate.dev'}
        </h1>
        <div className="text-[13px] font-mono text-slate-700 mt-0.5">
          &gt; {personalInfo.targetTitle || 'Full Stack Engineer'}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11.5px] text-slate-600 mt-2">
          {personalInfo.email && <span>email: {personalInfo.email}</span>}
          {personalInfo.phone && <span>tel: {personalInfo.phone}</span>}
          {personalInfo.location && <span>loc: {personalInfo.location}</span>}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-900 underline">
              github
            </a>
          )}
          {personalInfo.linkedIn && (
            <a href={personalInfo.linkedIn} target="_blank" rel="noreferrer" className="text-blue-900 underline">
              linkedin
            </a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="text-blue-900 underline">
              portfolio
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
