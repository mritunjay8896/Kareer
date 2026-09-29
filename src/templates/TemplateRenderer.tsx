import React from 'react';
import { ResumeData, ResumeSectionId } from '../types/resume';
import { HarvardClassic } from './HarvardClassic';
import { ModernATS } from './ModernATS';
import { StudentProfessional } from './StudentProfessional';
import { Technical } from './Technical';
import { Minimal } from './Minimal';

interface TemplateRendererProps {
  data: ResumeData;
}

const DEFAULT_SECTION_ORDER: ResumeSectionId[] = [
  'summary',
  'education',
  'skills',
  'experience',
  'internships',
  'projects',
  'certifications',
  'challenges',
  'achievements',
  'responsibilities',
  'languages',
  'links',
];

export const normalizeResumeData = (data: ResumeData): ResumeData => {
  if (!data) return {} as ResumeData;
  return {
    ...data,
    personalInfo: data.personalInfo || {
      fullName: '',
      targetTitle: '',
      email: '',
      phone: '',
      location: '',
    },
    summary: data.summary || '',
    education: Array.isArray(data.education) ? data.education : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
    experience: (Array.isArray(data.experience) ? data.experience : []).map((exp) => ({
      ...exp,
      responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities : [],
      achievements: Array.isArray(exp.achievements) ? exp.achievements : [],
    })),
    internships: (Array.isArray(data.internships) ? data.internships : []).map((intern) => ({
      ...intern,
      responsibilities: Array.isArray(intern.responsibilities) ? intern.responsibilities : [],
    })),
    projects: (Array.isArray(data.projects) ? data.projects : []).map((proj) => ({
      ...proj,
      contributions: Array.isArray(proj.contributions) ? proj.contributions : [],
    })),
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    achievements: Array.isArray(data.achievements) ? data.achievements : [],
    challenges: Array.isArray(data.challenges) ? data.challenges : [],
    responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [],
    languages: Array.isArray(data.languages) ? data.languages : [],
    links: Array.isArray(data.links) ? data.links : [],
    sectionOrder:
      Array.isArray(data.sectionOrder) && data.sectionOrder.length > 0
        ? data.sectionOrder
        : DEFAULT_SECTION_ORDER,
    visibleSections: data.visibleSections || ({} as Record<ResumeSectionId, boolean>),
  };
};

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data }) => {
  const safeData = normalizeResumeData(data);

  switch (safeData.template) {
    case 'ModernATS':
      return <ModernATS data={safeData} />;
    case 'StudentProfessional':
      return <StudentProfessional data={safeData} />;
    case 'Technical':
      return <Technical data={safeData} />;
    case 'Minimal':
      return <Minimal data={safeData} />;
    case 'HarvardClassic':
    default:
      return <HarvardClassic data={safeData} />;
  }
};
