import React from 'react';
import { ResumeData, ResumeSectionId } from '../types/resume';
import { getAccentClasses, getFontFamilyClass, getSpacingClasses } from './templateUtils';

interface TemplateProps {
  data: ResumeData;
}

export const ModernATS: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, education, skills, experience, internships, projects, certifications, achievements, challenges, languages, sectionOrder, visibleSections } = data;
  const fontClass = getFontFamilyClass(data.font || 'Inter');
  const accent = getAccentClasses(data.accent || 'blue');
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
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`w-2 h-2 rounded-full ${accent.bg}`}></span>
              <h2 className={`${spacing.headingText} uppercase tracking-wider text-slate-900`}>
                Professional Summary
              </h2>
            </div>
            <p className={`${spacing.bodyText} text-slate-700 pl-4 border-l-2 border-slate-200`}>
              {summary}
            </p>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className={spacing.sectionGap}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${accent.bg}`}></span>
              <h2 className={`${spacing.headingText} uppercase tracking-wider text-slate-900`}>
                Work Experience
              </h2>
            </div>
            <div className="space-y-3 pl-4 border-l-2 border-slate-200">
              {experience.map((exp) => (
                <div key={exp.id} className="text-slate-900">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[13px] text-slate-900">{exp.role}</span>
                    <span className="text-[11.5px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] font-medium text-slate-700 mb-1">
                    <span className={accent.text}>{exp.company}</span>
                    {exp.location && <span>• {exp.location}</span>}
                  </div>
                  {exp.description && <p className={`${spacing.bodyText} text-slate-600 mb-1`}>{exp.description}</p>}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc ml-4 space-y-0.5 text-slate-700">
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
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${accent.bg}`}></span>
              <h2 className={`${spacing.headingText} uppercase tracking-wider text-slate-900`}>
                Internships
              </h2>
            </div>
            <div className="space-y-3 pl-4 border-l-2 border-slate-200">
              {internships.map((intern) => (
                <div key={intern.id} className="text-slate-900">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[13px] text-slate-900">{intern.role}</span>
                    <span className="text-[11.5px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {intern.startDate} – {intern.endDate || 'Present'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] font-medium text-slate-700 mb-1">
                    <span className={accent.text}>{intern.company}</span>
                    {intern.location && <span>• {intern.location}</span>}
                  </div>
                  {intern.description && <p className={`${spacing.bodyText} text-slate-600 mb-1`}>{intern.description}</p>}
                  {intern.responsibilities && intern.responsibilities.length > 0 && (
                    <ul className="list-disc ml-4 space-y-0.5 text-slate-700">
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
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${accent.bg}`}></span>
              <h2 className={`${spacing.headingText} uppercase tracking-wider text-slate-900`}>
                Education
              </h2>
            </div>
            <div className="space-y-2 pl-4 border-l-2 border-slate-200">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[13px] text-slate-900">{edu.degree}</span>
                    <span className="text-[11.5px] font-medium text-slate-600">{edu.startYear} – {edu.endYear}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[12px] text-slate-700">
                    <span>{edu.institution}{edu.field ? `, ${edu.field}` : ''}</span>
                    {edu.grade && <span className="font-semibold text-slate-900">Score: {edu.grade}</span>}
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
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${accent.bg}`}></span>
              <h2 className={`${spacing.headingText} uppercase tracking-wider text-slate-900`}>
                Skills & Technologies
              </h2>
            </div>
            <div className="space-y-1.5 pl-4 border-l-2 border-slate-200">
              {(Object.entries(skillsByCategory) as [string, string[]][]).map(([cat, list]) => (
                <div key={cat} className="flex flex-wrap items-baseline gap-1 text-[12.5px]">
                  <span className="font-semibold text-slate-900 min-w-[130px]">{cat}:</span>
                  <div className="flex flex-wrap gap-1">
                    {list.map((item, i) => (
                      <span key={i} className="inline-block bg-slate-100 text-slate-800 text-[11px] px-2 py-0.5 rounded font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className={spacing.sectionGap}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${accent.bg}`}></span>
              <h2 className={`${spacing.headingText} uppercase tracking-wider text-slate-900`}>
                Featured Projects
              </h2>
            </div>
            <div className="space-y-2.5 pl-4 border-l-2 border-slate-200">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[13px] text-slate-900">{proj.title}</span>
                    {proj.projectUrl && (
                      <a href={proj.projectUrl} target="_blank" rel="noreferrer" className={`text-[11.5px] font-semibold ${accent.text} hover:underline`}>
                        Live URL ↗
                      </a>
                    )}
                  </div>
                  {proj.techStack && (
                    <div className="text-[11px] font-mono text-slate-600 mt-0.5">{proj.techStack}</div>
                  )}
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
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${accent.bg}`}></span>
              <h2 className={`${spacing.headingText} uppercase tracking-wider text-slate-900`}>
                Challenges & Hackathons
              </h2>
            </div>
            <div className="space-y-1.5 pl-4 border-l-2 border-slate-200">
              {challenges.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline text-[12px]">
                  <div>
                    <span className="font-semibold text-slate-900">{c.name}</span>
                    <span className="text-slate-600"> • {c.organizer}</span>
                    {c.result && <span className="font-bold text-emerald-700 ml-1.5">[{c.result}]</span>}
                  </div>
                  <span className="text-slate-500 font-medium">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className={spacing.sectionGap}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`w-2 h-2 rounded-full ${accent.bg}`}></span>
              <h2 className={`${spacing.headingText} uppercase tracking-wider text-slate-900`}>
                Certifications
              </h2>
            </div>
            <div className="space-y-1 pl-4 border-l-2 border-slate-200">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline text-[12px]">
                  <span className="font-medium text-slate-900">{cert.name} ({cert.issuer})</span>
                  <span className="text-slate-500">{cert.issueDate}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className={spacing.sectionGap}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`w-2 h-2 rounded-full ${accent.bg}`}></span>
              <h2 className={`${spacing.headingText} uppercase tracking-wider text-slate-900`}>
                Achievements
              </h2>
            </div>
            <ul className="list-disc ml-8 space-y-1 text-slate-700">
              {achievements.map((ach) => (
                <li key={ach.id} className={spacing.bodyText}>
                  <span className="font-semibold text-slate-900">{ach.title}</span>
                  {ach.description ? `: ${ach.description}` : ''}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className={spacing.sectionGap}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${accent.bg}`}></span>
              <h2 className={`${spacing.headingText} uppercase tracking-wider text-slate-900`}>
                Languages
              </h2>
            </div>
            <p className={`${spacing.bodyText} text-slate-700 pl-4`}>
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
      {/* Modern Header Left-aligned with subtle accent border */}
      <div className={`border-b border-slate-200 pb-4 mb-4`}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${accent.text}`}>
              {personalInfo.fullName || 'Candidate Name'}
            </h1>
            {personalInfo.targetTitle && (
              <div className="text-sm font-semibold tracking-wide text-slate-700 mt-0.5">
                {personalInfo.targetTitle}
              </div>
            )}
          </div>
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-16 h-16 rounded object-cover border border-slate-200"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate-600 mt-2 font-medium">
          {personalInfo.email && (
            <span className="flex items-center gap-1 text-slate-900">
              ✉ {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.linkedIn && (
            <a href={personalInfo.linkedIn} target="_blank" rel="noreferrer" className={`${accent.text} hover:underline`}>
              LinkedIn ↗
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className={`${accent.text} hover:underline`}>
              GitHub ↗
            </a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className={`${accent.text} hover:underline`}>
              Portfolio ↗
            </a>
          )}
        </div>
      </div>

      {/* Dynamic Sections */}
      <div>
        {(sectionOrder || []).map((sectionId) => renderSection(sectionId))}
      </div>
    </div>
  );
};
