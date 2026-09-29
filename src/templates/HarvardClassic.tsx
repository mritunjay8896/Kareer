import React from 'react';
import { ResumeData, ResumeSectionId } from '../types/resume';
import { getAccentClasses, getFontFamilyClass, getSpacingClasses } from './templateUtils';

interface TemplateProps {
  data: ResumeData;
}

export const HarvardClassic: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, education, skills, experience, internships, projects, certifications, achievements, challenges, responsibilities, languages, links, sectionOrder, visibleSections } = data;
  const fontClass = getFontFamilyClass(data.font || 'Georgia');
  const accent = getAccentClasses(data.accent || 'navy');
  const spacing = getSpacingClasses(data.spacing || 'Standard');

  // Group skills by category
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
            <h2 className={`${spacing.headingText} uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5 ${accent.text}`}>
              Professional Summary
            </h2>
            <p className={`${spacing.bodyText} text-slate-800 text-justify`}>{summary}</p>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className={spacing.sectionGap}>
            <h2 className={`${spacing.headingText} uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5 ${accent.text}`}>
              Education
            </h2>
            <div className={spacing.itemGap}>
              {education.map((edu) => (
                <div key={edu.id} className="text-slate-900">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[13px]">{edu.institution}</span>
                    <span className="text-[12px] font-medium text-slate-700">
                      {edu.startYear} – {edu.endYear || 'Present'}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="italic text-[12.5px] text-slate-800">
                      {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                    </span>
                    {edu.grade && (
                      <span className="text-[12px] text-slate-700 font-semibold">
                        CGPA / Grade: {edu.grade}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className={spacing.sectionGap}>
            <h2 className={`${spacing.headingText} uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5 ${accent.text}`}>
              Experience
            </h2>
            <div className={spacing.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="text-slate-900">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[13px]">{exp.company}</span>
                    <span className="text-[12px] text-slate-700 font-medium">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="italic text-[12.5px] text-slate-800">{exp.role}</span>
                    {exp.location && <span className="text-[11.5px] text-slate-600">{exp.location}</span>}
                  </div>
                  {exp.description && <p className={`${spacing.bodyText} text-slate-700 mb-1`}>{exp.description}</p>}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc ml-5 space-y-0.5 text-slate-800">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className={spacing.bodyText}>{resp}</li>
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
            <h2 className={`${spacing.headingText} uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5 ${accent.text}`}>
              Internships
            </h2>
            <div className={spacing.itemGap}>
              {internships.map((intern) => (
                <div key={intern.id} className="text-slate-900">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[13px]">{intern.company}</span>
                    <span className="text-[12px] text-slate-700 font-medium">
                      {intern.startDate} – {intern.endDate || 'Present'}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="italic text-[12.5px] text-slate-800">{intern.role}</span>
                    {intern.location && <span className="text-[11.5px] text-slate-600">{intern.location}</span>}
                  </div>
                  {intern.description && <p className={`${spacing.bodyText} text-slate-700 mb-1`}>{intern.description}</p>}
                  {intern.responsibilities && intern.responsibilities.length > 0 && (
                    <ul className="list-disc ml-5 space-y-0.5 text-slate-800">
                      {intern.responsibilities.map((resp, idx) => (
                        <li key={idx} className={spacing.bodyText}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className={spacing.sectionGap}>
            <h2 className={`${spacing.headingText} uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5 ${accent.text}`}>
              Technical & Core Competencies
            </h2>
            <div className="space-y-1 text-slate-800">
              {(Object.entries(skillsByCategory) as [string, string[]][]).map(([category, items]) => (
                <div key={category} className={`${spacing.bodyText} flex`}>
                  <span className="font-bold min-w-[140px] text-slate-900">{category}:</span>
                  <span className="text-slate-800">{items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className={spacing.sectionGap}>
            <h2 className={`${spacing.headingText} uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5 ${accent.text}`}>
              Projects
            </h2>
            <div className={spacing.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="text-slate-900">
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[13px]">{proj.title}</span>
                      {proj.techStack && (
                        <span className="text-[11.5px] font-mono text-slate-600">[{proj.techStack}]</span>
                      )}
                    </div>
                    {proj.projectUrl && (
                      <a href={proj.projectUrl} target="_blank" rel="noreferrer" className="text-[11.5px] text-blue-800 hover:underline">
                        Link ↗
                      </a>
                    )}
                  </div>
                  <p className={`${spacing.bodyText} text-slate-800 mt-0.5`}>{proj.description}</p>
                  {proj.impact && (
                    <p className={`${spacing.bodyText} text-slate-700 italic mt-0.5`}>• Key Result: {proj.impact}</p>
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
            <h2 className={`${spacing.headingText} uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5 ${accent.text}`}>
              Challenges & Hackathons
            </h2>
            <div className={spacing.itemGap}>
              {challenges.map((c) => (
                <div key={c.id} className="text-slate-900 flex justify-between items-start">
                  <div>
                    <span className="font-bold text-[13px]">{c.name}</span>
                    <span className="text-[12px] text-slate-700 ml-2">({c.organizer})</span>
                    {c.result && <span className="text-[12px] font-semibold text-emerald-800 ml-2">• {c.result}</span>}
                    {c.skills && <p className={`${spacing.subText} text-slate-600 mt-0.5`}>Skills: {c.skills}</p>}
                  </div>
                  <span className="text-[11.5px] text-slate-600 shrink-0">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className={spacing.sectionGap}>
            <h2 className={`${spacing.headingText} uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5 ${accent.text}`}>
              Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div className="text-[12.5px] text-slate-900">
                    <span className="font-semibold">{cert.name}</span>
                    {cert.issuer && <span className="text-slate-700"> — {cert.issuer}</span>}
                    {cert.credentialId && <span className="text-slate-500 font-mono text-[11px] ml-1.5">(ID: {cert.credentialId})</span>}
                  </div>
                  {cert.issueDate && <span className="text-[11.5px] text-slate-600">{cert.issueDate}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className={spacing.sectionGap}>
            <h2 className={`${spacing.headingText} uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5 ${accent.text}`}>
              Achievements & Honors
            </h2>
            <ul className="list-disc ml-5 space-y-1 text-slate-800">
              {achievements.map((ach) => (
                <li key={ach.id} className={spacing.bodyText}>
                  <span className="font-semibold">{ach.title}</span>
                  {ach.description ? `: ${ach.description}` : ''}
                  {ach.date ? ` (${ach.date})` : ''}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className={spacing.sectionGap}>
            <h2 className={`${spacing.headingText} uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5 ${accent.text}`}>
              Languages
            </h2>
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
    <div className={`w-full bg-white text-slate-900 ${fontClass} p-8 sm:p-10 leading-normal selection:bg-slate-200`}>
      {/* Header Centered */}
      <div className={`text-center ${spacing.headerPad} border-b-2 border-slate-800 mb-4`}>
        <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight uppercase ${accent.text}`}>
          {personalInfo.fullName || 'Candidate Name'}
        </h1>
        {personalInfo.targetTitle && (
          <div className="text-[13px] font-semibold tracking-wide uppercase text-slate-700 mt-1">
            {personalInfo.targetTitle}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11.5px] text-slate-700 mt-1.5">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.email && <span>•</span>}
          {personalInfo.email && <span className="font-medium text-slate-900">{personalInfo.email}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedIn && (
            <>
              <span>•</span>
              <a href={personalInfo.linkedIn} target="_blank" rel="noreferrer" className="text-blue-900 hover:underline">
                LinkedIn
              </a>
            </>
          )}
          {personalInfo.github && (
            <>
              <span>•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-900 hover:underline">
                GitHub
              </a>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span>•</span>
              <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="text-blue-900 hover:underline">
                Portfolio
              </a>
            </>
          )}
        </div>
      </div>

      {/* Dynamic Ordered Sections */}
      <div>
        {(sectionOrder || []).map((sectionId) => renderSection(sectionId))}
      </div>
    </div>
  );
};
