import { ResumeData, AtsAnalysisResult } from '../types/resume';

export function calculateAtsAnalysis(resume: ResumeData, jobDescription?: string): AtsAnalysisResult {
  const { personalInfo, summary, education, skills, projects, experience, internships, certifications } = resume;

  // 1. Completeness Checks
  const hasName = Boolean(personalInfo.fullName && personalInfo.fullName.trim().length > 1);
  const hasEmail = Boolean(personalInfo.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email.trim()));
  const hasPhone = Boolean(personalInfo.phone && personalInfo.phone.trim().length >= 8);
  const hasLocation = Boolean(personalInfo.location && personalInfo.location.trim().length > 1);
  const contactComplete = hasName && hasEmail && hasPhone && hasLocation;

  const hasSummary = Boolean(summary && summary.trim().length >= 40);
  const educationComplete = Array.isArray(education) && education.length > 0 && education.some(e => Boolean(e.degree && e.institution));
  const skillsComplete = Array.isArray(skills) && skills.length >= 5;
  const projectsComplete = Array.isArray(projects) && projects.length > 0 && projects.some(p => Boolean(p.title && p.description));
  const experienceComplete = (Array.isArray(experience) && experience.length > 0) || (Array.isArray(internships) && internships.length > 0);

  // 2. Base Structural Score (Max 50 points)
  let structuralScore = 0;
  if (hasName) structuralScore += 5;
  if (hasEmail && hasPhone) structuralScore += 10;
  if (hasLocation) structuralScore += 5;
  if (hasSummary) structuralScore += 10;
  if (educationComplete) structuralScore += 10;
  if (skillsComplete) structuralScore += 10;

  // 3. Content Depth (Max 30 points)
  let contentScore = 0;
  if (projectsComplete) contentScore += 12;
  if (experienceComplete) contentScore += 12;
  if (Array.isArray(certifications) && certifications.length > 0) contentScore += 6;

  // Action verbs check in bullets/summary
  const actionVerbs = ['developed', 'built', 'created', 'designed', 'implemented', 'optimized', 'led', 'managed', 'engineered', 'architected', 'spearheaded', 'resolved', 'improved', 'delivered', 'automated'];
  const fullText = [
    summary || '',
    ...(projects || []).map(p => (p.description || '') + ' ' + (p.contributions?.join(' ') || '')),
    ...(experience || []).flatMap(e => [e.description || '', ...(e.responsibilities || []), ...(e.achievements || [])]),
    ...(internships || []).flatMap(i => [i.description || '', ...(i.responsibilities || [])])
  ].join(' ').toLowerCase();

  const foundVerbs = actionVerbs.filter(v => fullText.includes(v));
  if (foundVerbs.length >= 3) contentScore += 5;

  let baseScore = Math.min(structuralScore + contentScore, 85);

  // 4. Job Description Match (if provided)
  let matchedKeywords: string[] = [];
  let missingKeywords: string[] = [];
  let suggestions: string[] = [];
  let keywordMatchScore = 70;

  const resumeSkillsNames = (skills || []).map(s => (s.name || '').trim().toLowerCase());

  if (jobDescription && jobDescription.trim().length > 20) {
    // Extract technical keywords and core competencies from JD
    const jdClean = jobDescription.toLowerCase();
    
    // Comprehensive catalog of common tech and domain keywords
    const catalog = [
      'react', 'react.js', 'vue', 'angular', 'next.js', 'typescript', 'javascript', 'html', 'html5', 'css', 'css3', 'tailwind', 'bootstrap',
      'node', 'node.js', 'express', 'python', 'django', 'fastapi', 'flask', 'java', 'spring', 'spring boot', 'c++', 'c#', '.net', 'golang', 'rust',
      'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'firebase', 'firestore', 'supabase', 'dynamodb',
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'git', 'github', 'linux', 'rest', 'rest api', 'graphql',
      'agile', 'scrum', 'jira', 'figma', 'testing', 'jest', 'cypress', 'unit testing', 'microservices', 'data structures', 'algorithms',
      'machine learning', 'deep learning', 'pandas', 'numpy', 'pytorch', 'tensorflow', 'data analysis', 'excel', 'power bi', 'tableau'
    ];

    const detectedJdKeywords = catalog.filter(term => {
      const regex = new RegExp(`\\b${term.replace('.', '\\.')}\\b`, 'i');
      return regex.test(jdClean);
    });

    // Also look for explicit skills in resume text
    detectedJdKeywords.forEach(term => {
      const matchesSkill = resumeSkillsNames.some(s => s.includes(term) || term.includes(s));
      const inResumeText = fullText.includes(term);
      if (matchesSkill || inResumeText) {
        matchedKeywords.push(term);
      } else {
        missingKeywords.push(term);
      }
    });

    const totalIdentified = detectedJdKeywords.length;
    if (totalIdentified > 0) {
      const matchRate = matchedKeywords.length / totalIdentified;
      keywordMatchScore = Math.round(matchRate * 100);
      // Recalculate score weighted with JD match
      baseScore = Math.round(baseScore * 0.4 + matchRate * 100 * 0.6);
    }
  } else {
    // Estimate baseline keyword match based on diversity of skills listed
    keywordMatchScore = Math.min(Math.round(((skills || []).length / 10) * 100), 92);
  }

  if (missingKeywords.length > 0) {
    suggestions.push(`Consider adding target role skills if proficient: ${missingKeywords.slice(0, 5).join(', ')}`);
  } else if (!jobDescription || jobDescription.trim().length <= 20) {
    // General actionable suggestions
    if (!hasSummary) suggestions.push('Add a concise 2-3 sentence Professional Summary to anchor your profile.');
    if ((skills || []).length < 6) suggestions.push('List at least 6-8 relevant skills across Technical and Tools categories.');
    if ((projects || []).length === 0) suggestions.push('Include 1-2 key projects highlighting technology stack and contributions.');
    if (foundVerbs.length < 3) suggestions.push('Use active action verbs (e.g., Developed, Engineered, Optimized) in project/experience descriptions.');
    if (!personalInfo.linkedIn) suggestions.push('Add your LinkedIn URL to strengthen online verification.');
  }

  const finalScore = Math.min(Math.max(baseScore, 20), 98);

  // Section completeness percentage
  const totalSections = 6;
  let passedSections = 0;
  if (contactComplete) passedSections++;
  if (hasSummary) passedSections++;
  if (educationComplete) passedSections++;
  if (skillsComplete) passedSections++;
  if (projectsComplete) passedSections++;
  if (experienceComplete) passedSections++;
  const sectionScore = Math.round((passedSections / totalSections) * 100);

  // Structured breakdown
  const breakdown: AtsAnalysisResult['breakdown'] = [
    {
      category: 'Contact Information',
      status: contactComplete ? 'pass' : (hasEmail && hasPhone ? 'warning' : 'fail'),
      message: contactComplete
        ? 'Full name, email, phone number, and location are fully specified.'
        : 'Ensure both email and phone number are provided for recruiters to reach you.',
    },
    {
      category: 'Professional Summary',
      status: hasSummary ? 'pass' : (summary ? 'warning' : 'fail'),
      message: hasSummary
        ? 'Summary provides a clear career narrative and target specialization.'
        : 'A 2-3 sentence summary helps ATS parsers identify your core domain immediately.',
    },
    {
      category: 'Core Competencies & Skills',
      status: skillsComplete ? 'pass' : ((skills || []).length > 0 ? 'warning' : 'fail'),
      message: skillsComplete
        ? `${skills.length} skills categorized across languages, frameworks, and tools.`
        : 'Add at least 5-8 relevant technical competencies to boost keyword density.',
    },
    {
      category: 'Education History',
      status: educationComplete ? 'pass' : 'warning',
      message: educationComplete
        ? 'Degree, institution, and graduation timeline properly formatted.'
        : 'Include your degree, university name, and graduation year.',
    },
    {
      category: 'Work & Internship Experience',
      status: experienceComplete ? 'pass' : 'warning',
      message: experienceComplete
        ? 'Work history documented with roles, dates, and bullet points.'
        : 'If you have prior internships or work experience, list them with action verbs.',
    },
    {
      category: 'Key Projects',
      status: projectsComplete ? 'pass' : 'warning',
      message: projectsComplete
        ? 'Demonstrated real-world experience with technical projects.'
        : 'Add at least 1-2 projects highlighting tech stack and key accomplishments.',
    },
    {
      category: 'Action-Verb & Impact Phrasing',
      status: foundVerbs.length >= 3 ? 'pass' : (foundVerbs.length >= 1 ? 'warning' : 'fail'),
      message: foundVerbs.length >= 3
        ? `Found ${foundVerbs.length} strong action verbs (${foundVerbs.slice(0, 4).join(', ')}...).`
        : 'Begin bullet points with strong verbs such as Engineered, Architected, or Implemented.',
    },
    {
      category: 'ATS Format & Typography',
      status: 'pass',
      message: 'Clean single-column layout without tables or graphics blocking ATS scanners.',
    },
  ];

  return {
    score: finalScore,
    overallScore: finalScore,
    sectionScore,
    keywordMatchScore,
    matchedKeywords,
    missingKeywords,
    matchedCount: matchedKeywords.length,
    totalJdKeywords: matchedKeywords.length + missingKeywords.length,
    suggestions,
    completeness: {
      contact: contactComplete,
      summary: hasSummary,
      education: educationComplete,
      skills: skillsComplete,
      projects: projectsComplete,
      experience: experienceComplete,
    },
    breakdown,
  };
}

export const calculateATSScore = calculateAtsAnalysis;
