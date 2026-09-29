export type TemplateId = 'HarvardClassic' | 'ModernATS' | 'StudentProfessional' | 'Technical' | 'Minimal';
export type FontId = 'Inter' | 'Arial' | 'Roboto' | 'Georgia';
export type SpacingId = 'Compact' | 'Standard' | 'Comfortable';
export type AccentColor = 'navy' | 'black' | 'blue' | 'green';

export interface ResumePersonalInfo {
  fullName: string;
  targetTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  website?: string;
  photoUrl?: string;
  showPhoto?: boolean;
}

export interface ResumeEducation {
  id: string;
  degree: string;
  institution: string;
  field: string;
  startYear: string;
  endYear: string;
  grade: string;
  location?: string;
}

export type SkillCategory = 'Technical Skills' | 'Soft Skills' | 'Tools' | 'Languages' | 'Frameworks' | 'Databases' | 'Other';

export interface ResumeSkillItem {
  id: string;
  name: string;
  category: SkillCategory;
}

export interface ResumeProject {
  id: string;
  title: string;
  description: string;
  techStack: string;
  projectUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
  contributions?: string[];
  impact?: string;
}

export interface ResumeExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  employmentType?: string;
  description?: string;
  responsibilities: string[];
  achievements?: string[];
  skills?: string[];
}

export interface ResumeInternship {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  responsibilities: string[];
  skills?: string[];
  certificateUrl?: string;
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ResumeChallenge {
  id: string;
  name: string;
  organizer: string;
  type: string;
  date: string;
  result: string;
  skills?: string;
  projectUrl?: string;
  certificateUrl?: string;
}

export interface ResumeAchievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface ResumeResponsibility {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export interface ResumeLanguage {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
}

export interface ResumeLink {
  id: string;
  label: string;
  url: string;
}

export type ResumeSectionId =
  | 'personalInfo'
  | 'summary'
  | 'education'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'internships'
  | 'certifications'
  | 'achievements'
  | 'challenges'
  | 'responsibilities'
  | 'languages'
  | 'links';

export interface ResumeData {
  id: string;
  userId?: string;
  title: string;
  template: TemplateId;
  font: FontId;
  accent: AccentColor;
  spacing: SpacingId;
  pageCount?: number;
  personalInfo: ResumePersonalInfo;
  summary: string;
  education: ResumeEducation[];
  skills: ResumeSkillItem[];
  experience: ResumeExperience[];
  internships: ResumeInternship[];
  projects: ResumeProject[];
  certifications: ResumeCertification[];
  achievements: ResumeAchievement[];
  challenges: ResumeChallenge[];
  responsibilities: ResumeResponsibility[];
  languages: ResumeLanguage[];
  links: ResumeLink[];
  sectionOrder: ResumeSectionId[];
  visibleSections: Record<ResumeSectionId, boolean>;
  targetJobDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ATSAuditItem {
  category: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
}

export type AtsAnalysisResult = {
  score: number;
  overallScore: number;
  sectionScore: number;
  keywordMatchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  matchedCount: number;
  totalJdKeywords: number;
  suggestions: string[];
  completeness: {
    contact: boolean;
    summary: boolean;
    education: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
  };
  breakdown: ATSAuditItem[];
};

export type ATSAnalysisResult = AtsAnalysisResult;
export type ResumeTemplateId = TemplateId;
export type ResumeFontFamily = FontId;
export type ResumeSpacing = SpacingId;
export type ResumeAccentColor = AccentColor;
