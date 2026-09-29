import { UserProfileData } from '../types';
import { ResumeData, ResumeSkillItem, SkillCategory, ResumeSectionId } from '../types/resume';

export function importProfileToResume(
  profile: Partial<UserProfileData>,
  existingResume?: Partial<ResumeData>
): ResumeData {
  const isExperienced = (profile.experience && profile.experience.length > 0);

  // Categorize flat skills array
  const rawSkills = profile.skills || [];
  const categorizedSkills: ResumeSkillItem[] = rawSkills.map((s, idx) => {
    const sLower = s.toLowerCase();
    let category: SkillCategory = 'Technical Skills';
    if (['react', 'vue', 'angular', 'next.js', 'node', 'express', 'django', 'spring', 'flask', 'tailwind'].some(k => sLower.includes(k))) {
      category = 'Frameworks';
    } else if (['sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'firebase'].some(k => sLower.includes(k))) {
      category = 'Databases';
    } else if (['git', 'docker', 'aws', 'figma', 'postman', 'jira', 'linux'].some(k => sLower.includes(k))) {
      category = 'Tools';
    } else if (['communication', 'leadership', 'teamwork', 'problem solving', 'agile'].some(k => sLower.includes(k))) {
      category = 'Soft Skills';
    } else if (['javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'html', 'css'].some(k => sLower.includes(k))) {
      category = 'Languages';
    }
    return {
      id: `skill-${idx}-${Date.now()}`,
      name: s,
      category,
    };
  });

  // Dynamic ordering: Fresher prioritizes Education, Skills, Projects, Internships
  // Experienced prioritizes Experience, Skills, Projects, Education
  const fresherOrder: ResumeSectionId[] = [
    'personalInfo',
    'summary',
    'education',
    'skills',
    'projects',
    'internships',
    'challenges',
    'certifications',
    'achievements',
    'experience',
    'responsibilities',
    'languages',
    'links',
  ];

  const experiencedOrder: ResumeSectionId[] = [
    'personalInfo',
    'summary',
    'experience',
    'skills',
    'projects',
    'education',
    'internships',
    'challenges',
    'certifications',
    'achievements',
    'responsibilities',
    'languages',
    'links',
  ];

  const initialSectionOrder = isExperienced ? experiencedOrder : fresherOrder;

  return {
    id: existingResume?.id || `resume-${Date.now()}`,
    userId: existingResume?.userId,
    title: existingResume?.title || (profile.fullName ? `${profile.fullName}'s Resume` : 'My Resume'),
    template: existingResume?.template || (isExperienced ? 'HarvardClassic' : 'StudentProfessional'),
    font: existingResume?.font || 'Inter',
    accent: existingResume?.accent || 'navy',
    spacing: existingResume?.spacing || 'Standard',
    personalInfo: {
      fullName: profile.fullName || '',
      targetTitle: profile.headline?.split('•')[0]?.trim() || 'Software Developer',
      email: profile.email || '',
      phone: profile.phone || '',
      location: profile.location || '',
      linkedIn: profile.linkedIn || '',
      github: profile.github || '',
      portfolio: profile.portfolioUrl || '',
      website: '',
      photoUrl: profile.avatar || '',
      showPhoto: false, // ATS default is clean no-photo
    },
    summary: profile.bio || (profile.headline ? `${profile.headline}. Focused on building high quality scalable applications.` : ''),
    education: (profile.education || []).map((edu, i) => ({
      id: edu.id || `edu-${i}-${Date.now()}`,
      degree: edu.degree || '',
      institution: edu.institution || '',
      field: edu.fieldOfStudy || '',
      startYear: edu.startYear || '',
      endYear: edu.endYear || '',
      grade: edu.grade || '',
      location: '',
    })),
    skills: categorizedSkills,
    experience: (profile.experience || []).map((exp, i) => ({
      id: exp.id || `exp-${i}-${Date.now()}`,
      company: exp.company || '',
      role: exp.role || '',
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      current: exp.current ?? false,
      responsibilities: exp.description ? [exp.description] : [],
      description: exp.description || '',
    })),
    internships: [],
    projects: (profile.projects || []).map((proj, i) => ({
      id: proj.id || `proj-${i}-${Date.now()}`,
      title: proj.title || '',
      description: proj.description || '',
      techStack: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : '',
      githubUrl: proj.link || '',
      projectUrl: proj.link || '',
    })),
    certifications: (profile.certifications || []).map((cert, i) => ({
      id: cert.id || `cert-${i}-${Date.now()}`,
      name: cert.name || '',
      issuer: cert.issuer || '',
      issueDate: cert.issueDate || '',
      credentialUrl: cert.credentialUrl || '',
    })),
    achievements: (profile.achievements || []).map((ach, i) => ({
      id: `ach-${i}-${Date.now()}`,
      title: ach,
      description: '',
      date: '',
    })),
    challenges: [],
    responsibilities: [],
    languages: (profile.languages || ['English', 'Hindi']).map((lang, i) => ({
      id: `lang-${i}-${Date.now()}`,
      name: lang,
      proficiency: 'Fluent',
    })),
    links: [],
    sectionOrder: initialSectionOrder,
    visibleSections: {
      personalInfo: true,
      summary: true,
      education: true,
      skills: true,
      projects: true,
      experience: isExperienced,
      internships: !isExperienced,
      certifications: Boolean(profile.certifications && profile.certifications.length > 0),
      achievements: Boolean(profile.achievements && profile.achievements.length > 0),
      challenges: true,
      responsibilities: false,
      languages: true,
      links: false,
    },
    targetJobDescription: existingResume?.targetJobDescription || '',
    createdAt: existingResume?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function createEmptyResume(title = 'Untitled Resume', isExperienced = false): ResumeData {
  const fresherOrder: ResumeSectionId[] = [
    'personalInfo',
    'summary',
    'education',
    'skills',
    'projects',
    'internships',
    'challenges',
    'certifications',
    'achievements',
    'experience',
    'responsibilities',
    'languages',
    'links',
  ];

  return {
    id: `resume-${Date.now()}`,
    title,
    template: 'HarvardClassic',
    font: 'Inter',
    accent: 'navy',
    spacing: 'Standard',
    personalInfo: {
      fullName: '',
      targetTitle: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      github: '',
      portfolio: '',
      website: '',
      showPhoto: false,
    },
    summary: '',
    education: [],
    skills: [],
    experience: [],
    internships: [],
    projects: [],
    certifications: [],
    achievements: [],
    challenges: [],
    responsibilities: [],
    languages: [],
    links: [],
    sectionOrder: fresherOrder,
    visibleSections: {
      personalInfo: true,
      summary: true,
      education: true,
      skills: true,
      projects: true,
      experience: false,
      internships: true,
      certifications: true,
      achievements: true,
      challenges: true,
      responsibilities: false,
      languages: true,
      links: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
