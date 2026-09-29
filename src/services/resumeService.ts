import { doc, getDoc, setDoc, deleteDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ResumeData, ResumeSectionId } from '../types/resume';

const LOCAL_STORAGE_KEY_PREFIX = 'glitread_resume_';
const LOCAL_STORAGE_LIST_KEY = 'glitread_user_resumes_list';

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

export function sanitizeResumeData(data: ResumeData): ResumeData {
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
}

export async function saveResume(resume: ResumeData, userId?: string | null): Promise<void> {
  const updatedResume: ResumeData = {
    ...resume,
    updatedAt: new Date().toISOString(),
  };

  // Always mirror in localStorage for immediate latency-free retrieval and offline resilience
  try {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${resume.id}`, JSON.stringify(updatedResume));
    
    // Update local index of resumes
    const listRaw = localStorage.getItem(LOCAL_STORAGE_LIST_KEY);
    let list: Array<{ id: string; title: string; updatedAt: string }> = listRaw ? JSON.parse(listRaw) : [];
    const existingIndex = list.findIndex(r => r.id === resume.id);
    if (existingIndex >= 0) {
      list[existingIndex] = { id: resume.id, title: resume.title, updatedAt: updatedResume.updatedAt };
    } else {
      list.unshift({ id: resume.id, title: resume.title, updatedAt: updatedResume.updatedAt });
    }
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }

  // If user is authenticated, also sync to Firestore
  if (userId) {
    try {
      const resumeRef = doc(db, 'users', userId, 'resumes', resume.id);
      await setDoc(resumeRef, updatedResume, { merge: true });
    } catch (err) {
      console.warn('Firestore resume sync error (saved locally):', err);
    }
  }
}

export async function getResume(resumeId: string, userId?: string | null): Promise<ResumeData | null> {
  // First try Firestore if userId is present
  if (userId) {
    try {
      const resumeRef = doc(db, 'users', userId, 'resumes', resumeId);
      const snap = await getDoc(resumeRef);
      if (snap.exists()) {
        const data = sanitizeResumeData(snap.data() as ResumeData);
        // update local cache
        localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${resumeId}`, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn('Firestore load failed, falling back to local storage:', err);
    }
  }

  // Fallback to localStorage
  try {
    const local = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${resumeId}`);
    if (local) {
      return sanitizeResumeData(JSON.parse(local) as ResumeData);
    }
  } catch (err) {
    console.warn('LocalStorage read error:', err);
  }

  return null;
}

export async function getUserResumes(userId?: string | null): Promise<Array<{ id: string; title: string; updatedAt: string }>> {
  let results: Array<{ id: string; title: string; updatedAt: string }> = [];

  // Try Firestore
  if (userId) {
    try {
      const resumesCol = collection(db, 'users', userId, 'resumes');
      const snap = await getDocs(query(resumesCol, orderBy('updatedAt', 'desc')));
      if (!snap.empty) {
        snap.forEach(docSnap => {
          const d = docSnap.data() as ResumeData;
          results.push({ id: d.id, title: d.title || 'Untitled Resume', updatedAt: d.updatedAt || '' });
        });
        return results;
      }
    } catch (err) {
      console.warn('Firestore list fetch error, reading local list:', err);
    }
  }

  // Fallback to local storage list
  try {
    const listRaw = localStorage.getItem(LOCAL_STORAGE_LIST_KEY);
    if (listRaw) {
      results = JSON.parse(listRaw);
    }
  } catch (err) {
    console.warn('Local storage list error:', err);
  }

  return results;
}

export async function deleteResume(resumeId: string, userId?: string | null): Promise<void> {
  try {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}${resumeId}`);
    const listRaw = localStorage.getItem(LOCAL_STORAGE_LIST_KEY);
    if (listRaw) {
      const list = JSON.parse(listRaw).filter((item: any) => item.id !== resumeId);
      localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(list));
    }
  } catch (err) {
    console.warn('LocalStorage delete error:', err);
  }

  if (userId) {
    try {
      await deleteDoc(doc(db, 'users', userId, 'resumes', resumeId));
    } catch (err) {
      console.warn('Firestore delete error:', err);
    }
  }
}

export const getUserResumeById = getResume;

export function createDefaultResumeData(userId?: string): ResumeData {
  return {
    id: `resume-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    userId: userId || undefined,
    title: 'Software Engineer Resume',
    template: 'ModernATS',
    font: 'Inter',
    accent: 'blue',
    spacing: 'Standard',
    personalInfo: {
      fullName: 'Alex Morgan',
      targetTitle: 'Full-Stack Software Engineer',
      email: 'alex.morgan@glitread.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      linkedIn: 'https://linkedin.com/in/alexmorgan',
      github: 'https://github.com/alexmorgan',
      portfolio: 'https://alexmorgan.dev',
      showPhoto: false,
    },
    summary: 'Results-driven Full-Stack Engineer with experience architecting high-throughput React & Node.js microservices, optimizing database performance, and deploying scalable cloud infrastructure. Passionate about automated testing, CI/CD pipelines, and high-quality software craftsmanship.',
    education: [
      {
        id: 'edu-1',
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of California, Berkeley',
        field: 'Computer Science',
        startYear: '2020',
        endYear: '2024',
        grade: '3.85 GPA',
        location: 'Berkeley, CA',
      },
    ],
    skills: [
      { id: 's-1', name: 'React', category: 'Frameworks' },
      { id: 's-2', name: 'TypeScript', category: 'Languages' },
      { id: 's-3', name: 'Node.js', category: 'Technical Skills' },
      { id: 's-4', name: 'Python', category: 'Languages' },
      { id: 's-5', name: 'PostgreSQL', category: 'Databases' },
      { id: 's-6', name: 'Docker', category: 'Tools' },
      { id: 's-7', name: 'AWS (S3, Lambda)', category: 'Technical Skills' },
      { id: 's-8', name: 'Git & GitHub', category: 'Tools' },
      { id: 's-9', name: 'REST APIs', category: 'Technical Skills' },
      { id: 's-10', name: 'Tailwind CSS', category: 'Frameworks' },
    ],
    experience: [
      {
        id: 'exp-1',
        company: 'Apex Cloud Solutions',
        role: 'Software Engineer',
        location: 'San Francisco, CA',
        startDate: 'Jun 2024',
        endDate: 'Present',
        current: true,
        employmentType: 'Full-time',
        description: 'Building client-facing analytics dashboards and serverless backend pipelines.',
        responsibilities: [
          'Engineered real-time telemetry streaming dashboard using React, TypeScript, and WebSockets serving 45,000+ daily active users.',
          'Optimized PostgreSQL query execution plans, reducing p95 database response latency by 38%.',
          'Collaborated with cross-functional design and product engineering teams across 2-week agile sprints.',
        ],
        achievements: [
          'Awarded Developer of the Month for resolving critical cache invalidation bottlenecks.',
        ],
      },
    ],
    internships: [
      {
        id: 'int-1',
        company: 'Vanguard Systems',
        role: 'Software Engineering Intern',
        location: 'San Jose, CA',
        startDate: 'Jun 2023',
        endDate: 'Aug 2023',
        description: 'Developed automated REST integration testing harnesses.',
        responsibilities: [
          'Implemented end-to-end automated testing pipelines using Jest and GitHub Actions, cutting regression cycle time by 45%.',
          'Migrated legacy JavaScript microservices to strict TypeScript, preventing over 60 compile-time defect patterns.',
        ],
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Distributed Real-Time Task Queue',
        techStack: 'TypeScript, Redis, Express, Docker',
        description: 'High-throughput asynchronous job processing worker queue capable of handling 8,000+ tasks/sec with exponential backoff retries.',
        githubUrl: 'https://github.com/alexmorgan/task-queue',
        startDate: '2023',
        endDate: '2024',
        contributions: [
          'Built reliable Redis-backed message broker with fault-tolerant workers and dead-letter queue routing.',
          'Containerized deployment using Docker Compose with automated health checks.',
        ],
      },
      {
        id: 'proj-2',
        title: 'ATS Resume Parser & Matcher',
        techStack: 'React, Tailwind CSS, NLP, Vite',
        description: 'Intelligent resume builder evaluating ATS keyword density and structure against modern applicant tracking system benchmarks.',
        projectUrl: 'https://ats-builder.glitread.com',
        githubUrl: 'https://github.com/alexmorgan/ats-resume',
        startDate: '2024',
        endDate: '2024',
        contributions: [
          'Developed pixel-accurate vector print engine outputting Harvard & Modern ATS compliant resumes.',
        ],
      },
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        issueDate: '2024',
        credentialId: 'AWS-8392019',
      },
    ],
    challenges: [
      {
        id: 'chal-1',
        name: 'Glitread Cloud Hackathon 2024',
        organizer: 'Glitread Dev Community',
        type: 'Hackathon',
        date: '2024',
        result: 'First Place Winner (Top 1 of 120 teams)',
        skills: 'Full-Stack, Cloud Architecture',
      },
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'Dean’s Honor List (4 Consecutive Semesters)',
        description: 'Recognized for academic excellence maintaining top 5% GPA in Department of Electrical Engineering & Computer Sciences.',
        date: '2021 – 2024',
      },
    ],
    responsibilities: [],
    languages: [
      { id: 'lang-1', name: 'English', proficiency: 'Native' },
      { id: 'lang-2', name: 'Spanish', proficiency: 'Professional' },
    ],
    links: [],
    sectionOrder: [
      'personalInfo',
      'summary',
      'education',
      'skills',
      'projects',
      'experience',
      'internships',
      'certifications',
      'challenges',
      'achievements',
      'languages',
    ],
    visibleSections: {
      personalInfo: true,
      summary: true,
      education: true,
      skills: true,
      projects: true,
      experience: true,
      internships: true,
      certifications: true,
      challenges: true,
      achievements: true,
      responsibilities: false,
      languages: true,
      links: false,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function listUserResumes(userId?: string | null): Promise<ResumeData[]> {
  const resumeEntries = await getUserResumes(userId);
  const fullResumes: ResumeData[] = [];

  for (const entry of resumeEntries) {
    const resume = await getResume(entry.id, userId);
    if (resume) {
      fullResumes.push(resume);
    }
  }

  // If no resumes saved, create default and save it
  if (fullResumes.length === 0) {
    const defaultResume = createDefaultResumeData(userId || undefined);
    await saveResume(defaultResume, userId);
    fullResumes.push(defaultResume);
  }

  return fullResumes;
}

export async function duplicateResume(resumeId: string, userId?: string | null): Promise<ResumeData | null> {
  const existing = await getResume(resumeId, userId);
  if (!existing) return null;

  const duplicated: ResumeData = {
    ...existing,
    id: `resume-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: `${existing.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await saveResume(duplicated, userId);
  return duplicated;
}
