export type CandidateType = 'student' | 'fresher' | 'working_professional' | 'experienced_professional';

export interface RegistrationEducation {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  currentlyStudying: boolean;
  grade: string; // CGPA / Percentage
  relevantCoursework: string;
  description: string;
  academicAchievements: string;
}

export interface RegistrationExperience {
  id: string;
  company: string;
  jobTitle: string;
  employmentType: 'Full-time' | 'Internship' | 'Part-time' | 'Contract' | 'Freelance';
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  location: string;
  workMode: 'On-site' | 'Remote' | 'Hybrid';
  description: string;
  responsibilities: string;
  achievements: string;
  technologies: string[];
}

export interface RegistrationSkill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

export interface RegistrationProject {
  id: string;
  name: string;
  thumbnailUrl: string;
  shortDescription: string;
  detailedDescription: string;
  projectType: 'Personal' | 'Academic' | 'Professional' | 'Freelance' | 'Open Source';
  role: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  caseStudyUrl: string;
  contribution: string;
  keyFeatures: string;
  challenges: string;
  results: string;
}

export interface RegistrationCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
  certificateUploadUrl: string;
  description: string;
}

export interface RegistrationAchievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  proofUrl: string;
}

export interface RegistrationLinks {
  linkedin: string;
  github: string;
  website: string;
  behance: string;
  dribbble: string;
  twitter: string;
  youtube: string;
  instagram: string;
  stackoverflow: string;
  leetcode: string;
  kaggle: string;
  medium: string;
}

export interface RegistrationCareerPreferences {
  lookingFor: string[];
  desiredRoles: string[];
  workMode: string[];
  locations: string[];
  industries: string[];
  expectedSalary: string;
  expectedStipend: string;
  availability: string;
}

export interface RegistrationPortfolioPreferences {
  username: string;
  visibility: 'Public' | 'Private';
  template: 'Modern' | 'Minimal' | 'Professional' | 'Creative' | 'Developer' | 'Student' | 'Executive';
  enabledSections: string[];
}

export interface FullRegistrationData {
  account: {
    email: string;
    password?: string;
    confirmPassword?: string;
  };
  candidateType: CandidateType;
  personal: {
    fullName: string;
    photoUrl: string;
    headline: string;
    phone: string;
    dob: string;
    gender: string;
    city: string;
    state: string;
    country: string;
    about: string;
  };
  education: RegistrationEducation[];
  experience: RegistrationExperience[];
  skills: RegistrationSkill[];
  projects: RegistrationProject[];
  certifications: RegistrationCertification[];
  achievements: RegistrationAchievement[];
  links: RegistrationLinks;
  careerPreferences: RegistrationCareerPreferences;
  portfolio: RegistrationPortfolioPreferences;
  profileCompletion: number;
}
