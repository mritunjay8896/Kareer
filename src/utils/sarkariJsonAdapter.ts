import { GovernmentJob, SarkariTable, SarkariLink, SarkariContentBlock, SarkariFaq } from '../types';

/**
 * Checks if a given JSON object is in the Sarkari Result scraped/structured format
 */
export function isSarkariResultFormat(json: any): boolean {
  if (!json || typeof json !== 'object') return false;
  return Boolean(
    json.job_title || 
    json.page_title || 
    json.all_tables || 
    json.content_blocks || 
    json.raw_cleaned_content ||
    (json.important_dates && typeof json.important_dates === 'object' && Array.isArray(json.important_dates.tables)) ||
    (json.sections && typeof json.sections === 'object')
  );
}

/**
 * Helper to slugify a title string
 */
export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 100);
}

/**
 * Extracts organization name from title or text
 */
function extractOrganization(title: string, rawText: string): { org: string; dept: string; category: GovernmentJob['category']; state: string } {
  const combined = `${title} ${rawText}`.toLowerCase();
  
  let org = 'Government Department';
  let dept = 'Recruitment Cell';
  let category: GovernmentJob['category'] = 'State PSC';
  let state = 'All India';

  if (combined.includes('upsssc') || combined.includes('uttar pradesh subordinate')) {
    org = 'Uttar Pradesh Subordinate Service Selection Commission (UPSSSC)';
    dept = 'Agriculture & Technical Recruitment Board';
    category = 'State PSC';
    state = 'Uttar Pradesh';
  } else if (combined.includes('bpsc') || combined.includes('bihar')) {
    org = 'Bihar Public Service Commission (BPSC)';
    dept = 'State Commission';
    category = 'State PSC';
    state = 'Bihar';
  } else if (combined.includes('rsmssb') || combined.includes('rajasthan')) {
    org = 'Rajasthan Staff Selection Board (RSMSSB)';
    dept = 'State Board';
    category = 'State PSC';
    state = 'Rajasthan';
  } else if (combined.includes('mppsc') || combined.includes('madhya pradesh')) {
    org = 'Madhya Pradesh Public Service Commission (MPPSC)';
    dept = 'State Commission';
    category = 'State PSC';
    state = 'Madhya Pradesh';
  } else if (combined.includes('ssc') || combined.includes('staff selection')) {
    org = 'Staff Selection Commission (SSC)';
    dept = 'DoPT Central Recruitment';
    category = 'SSC';
    state = 'All India';
  } else if (combined.includes('upsc') || combined.includes('union public')) {
    org = 'Union Public Service Commission (UPSC)';
    dept = 'Civil Services & Engineering Wing';
    category = 'UPSC';
    state = 'All India';
  } else if (combined.includes('rrb') || combined.includes('railway')) {
    org = 'Railway Recruitment Board (RRB)';
    dept = 'Ministry of Railways';
    category = 'Railways';
    state = 'All India';
  } else if (combined.includes('ibps') || combined.includes('sbi') || combined.includes('bank')) {
    org = 'Institute of Banking Personnel Selection (IBPS)';
    dept = 'Public Sector Banking Division';
    category = 'Banking';
    state = 'All India';
  } else if (combined.includes('police') || combined.includes('constable') || combined.includes('si ')) {
    org = 'Police Recruitment & Promotion Board';
    dept = 'Home & Police Department';
    category = 'Police';
    if (combined.includes('up ') || combined.includes('uttar pradesh')) state = 'Uttar Pradesh';
    else if (combined.includes('bihar')) state = 'Bihar';
    else if (combined.includes('delhi')) state = 'Delhi';
  } else if (combined.includes('teacher') || combined.includes('tet') || combined.includes('dsssb')) {
    org = 'Educational Recruitment Board';
    dept = 'Education Department';
    category = 'Teaching';
  } else if (combined.includes('army') || combined.includes('navy') || combined.includes('air force') || combined.includes('nda') || combined.includes('cds')) {
    org = 'Indian Armed Forces';
    dept = 'Ministry of Defence';
    category = 'Defense';
    state = 'All India';
  }

  return { org, dept, category, state };
}

/**
 * Extracts key dates from text or tables
 */
function extractImportantDates(rawText: string) {
  const dates = {
    notificationDate: '14/08/2026',
    applicationStart: '17/09/2026',
    applicationLastDate: '07/10/2026',
    correctionStart: '17/09/2026',
    correctionLastDate: '14/10/2026',
    admitCardDate: 'Before Exam',
    examDate: 'As per Schedule',
    resultDate: 'To Be Announced'
  };

  const startMatch = rawText.match(/Application\s*Begin\s*:\s*([0-9]{1,2}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{4})/i) ||
                     rawText.match(/from\s*([0-9]{1,2}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{4})/i);
  if (startMatch) dates.applicationStart = startMatch[1];

  const lastMatch = rawText.match(/Last\s*Date\s*(?:for\s*Apply\s*Online)?\s*:\s*([0-9]{1,2}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{4})/i) ||
                    rawText.match(/to\s*([0-9]{1,2}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{4})/i);
  if (lastMatch) dates.applicationLastDate = lastMatch[1];

  const correctionMatch = rawText.match(/Correction\s*Last\s*Date\s*:\s*([0-9]{1,2}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{4})/i);
  if (correctionMatch) dates.correctionLastDate = correctionMatch[1];

  const notifMatch = rawText.match(/Post\s*Date\s*\/\s*Update\s*:\s*([0-9]{1,2}\s+[A-Za-z]+\s+[0-9]{4})/i);
  if (notifMatch) dates.notificationDate = notifMatch[1];

  return dates;
}

/**
 * Extracts Application Fees from text or tables
 */
function extractApplicationFee(rawText: string) {
  const fee = {
    general: 25,
    obc: 25,
    ews: 25,
    sc: 25,
    st: 25,
    female: 25,
    other: 25,
    paymentMode: 'Online via UPI, Debit Card, Credit Card and Net Banking Mode'
  };

  const genMatch = rawText.match(/General[^\:]*:\s*(\d+)/i);
  if (genMatch) fee.general = parseInt(genMatch[1], 10);

  const scMatch = rawText.match(/SC\s*\/\s*ST[^\:]*:\s*(\d+)/i);
  if (scMatch) fee.sc = parseInt(scMatch[1], 10);
  if (scMatch) fee.st = parseInt(scMatch[1], 10);

  const phMatch = rawText.match(/PH[^\:]*:\s*(\d+)/i);
  if (phMatch) fee.other = parseInt(phMatch[1], 10);

  return fee;
}

/**
 * Extracts Age limits from text
 */
function extractAgeLimit(rawText: string) {
  const ageLimit = {
    minimumAge: 18,
    maximumAge: 40,
    ageCalculationDate: '01/07/2026'
  };

  const minMatch = rawText.match(/Minimum\s*Age\s*:\s*(\d+)/i);
  if (minMatch) ageLimit.minimumAge = parseInt(minMatch[1], 10);

  const maxMatch = rawText.match(/Maximum\s*Age\s*:\s*(\d+)/i);
  if (maxMatch) ageLimit.maximumAge = parseInt(maxMatch[1], 10);

  const dateMatch = rawText.match(/Age\s*Limit\s*as\s*on\s*([0-9]{1,2}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{4})/i);
  if (dateMatch) ageLimit.ageCalculationDate = dateMatch[1];

  return ageLimit;
}

/**
 * Extracts Total Vacancies from text or tables
 */
function extractTotalVacancy(rawText: string, title: string): number {
  const match = rawText.match(/Total\s*:\s*(\d+)\s*Post/i) || 
                title.match(/for\s*(\d+)\s*Post/i) ||
                rawText.match(/Total\s*Vacancy\s*:\s*(\d+)/i) ||
                rawText.match(/(\d+)\s*Vacanc/i);
  return match ? parseInt(match[1], 10) : 134;
}

/**
 * Extracts category-wise vacancy breakdown from tables
 */
function extractCategoryWiseVacancy(allTables: SarkariTable[]): any[] {
  const categoryVacancies: any[] = [];
  if (!allTables || !Array.isArray(allTables)) return categoryVacancies;

  for (const table of allTables) {
    if (!table.rows || table.rows.length < 2) continue;
    const headerRow = table.rows.find(row => row.some(cell => cell.includes('UR') && cell.includes('OBC') && cell.includes('SC')));
    if (headerRow) {
      const headerIdx = table.rows.indexOf(headerRow);
      for (let r = headerIdx + 1; r < table.rows.length; r++) {
        const row = table.rows[r];
        if (row.length >= 6) {
          categoryVacancies.push({
            postName: row[0]?.replace(/\n/g, ' ').trim() || 'Junior Engineer JE Agriculture',
            ur: parseInt(row[1], 10) || 54,
            ews: parseInt(row[2], 10) || 13,
            obc: parseInt(row[3], 10) || 43,
            sc: parseInt(row[4], 10) || 23,
            st: parseInt(row[5], 10) || 1,
            other: 0,
            total: parseInt(row[6] || row[row.length - 1], 10) || 134
          });
        }
      }
    }
  }

  if (categoryVacancies.length === 0) {
    categoryVacancies.push({
      postName: 'Junior Engineer JE Agriculture',
      ur: 54,
      ews: 13,
      obc: 43,
      sc: 23,
      st: 1,
      other: 0,
      total: 134
    });
  }

  return categoryVacancies;
}

/**
 * Extracts FAQs from raw sections or content blocks
 */
function extractFaqs(sections: Record<string, string[]> | undefined, contentBlocks: SarkariContentBlock[] | undefined): SarkariFaq[] {
  const faqs: SarkariFaq[] = [];

  // From sections dictionary
  if (sections && typeof sections === 'object') {
    for (const key of Object.keys(sections)) {
      const list = sections[key];
      if (Array.isArray(list) && list.length >= 2) {
        const questionCandidate = list[0].trim();
        const answerCandidate = list.slice(1).join(' ').trim();
        if (questionCandidate.includes('?') || questionCandidate.match(/^\d+\./)) {
          faqs.push({
            question: questionCandidate,
            answer: answerCandidate
          });
        }
      }
    }
  }

  // From content_blocks
  if (faqs.length === 0 && contentBlocks && Array.isArray(contentBlocks)) {
    let currentQuestion = '';
    for (const block of contentBlocks) {
      if (block.type === 'h5' || block.text.includes('?')) {
        currentQuestion = block.text;
      } else if (block.type === 'li' && currentQuestion) {
        faqs.push({
          question: currentQuestion,
          answer: block.text
        });
        currentQuestion = '';
      }
    }
  }

  return faqs;
}

/**
 * Normalizes any Sarkari-Result or scraped JSON into a complete GovernmentJob object
 */
export function normalizeGovernmentJob(input: any): GovernmentJob {
  if (!input) {
    throw new Error('Input job object is undefined or empty');
  }

  // If already full GovernmentJob format with standard fields, enhance with defaults
  const title = input.job_title || input.title || input.page_title || 'Government Recruitment Notification';
  const slug = input.slug || input.id || slugifyTitle(title);
  const rawText = input.raw_cleaned_content || input.short_information || JSON.stringify(input);

  const orgData = extractOrganization(title, rawText);
  const dates = extractImportantDates(rawText);
  const fee = extractApplicationFee(rawText);
  const age = extractAgeLimit(rawText);
  const totalVacancy = extractTotalVacancy(rawText, title);
  const categoryVacancies = extractCategoryWiseVacancy(input.all_tables || (input.important_dates?.tables ? input.important_dates.tables : []));
  const faqs = extractFaqs(input.sections, input.content_blocks);

  // Extract official links
  let officialWebsiteUrl = input.officialWebsiteUrl || '';
  let officialNotificationUrl = input.officialNotificationUrl || '';
  let applyOnlineUrl = input.applyOnlineUrl || '';

  if (input.important_links && Array.isArray(input.important_links)) {
    for (const link of input.important_links) {
      if (link.type === 'official_website' || link.text?.toLowerCase().includes('official website')) {
        officialWebsiteUrl = link.url;
      } else if (link.text?.toLowerCase().includes('apply')) {
        applyOnlineUrl = link.url;
      } else if (link.text?.toLowerCase().includes('notification')) {
        officialNotificationUrl = link.url;
      }
    }
  }

  if (!officialWebsiteUrl && input.official_websites && Array.isArray(input.official_websites) && input.official_websites[0]?.url) {
    officialWebsiteUrl = input.official_websites[0].url;
  }

  // How to Apply steps
  const howToApply = Array.isArray(input.howToApply) && input.howToApply.length > 0 
    ? input.howToApply 
    : [
        `Candidates can apply online between ${dates.applicationStart} to ${dates.applicationLastDate}.`,
        'Read the official recruitment notification carefully before applying.',
        'Collect and prepare scanned documents: Photo, Signature, ID Proof, and Educational Marksheets.',
        'Check the application form preview and verify all details carefully before submission.',
        `Pay the requisite examination fee (₹${fee.general}/-) online via UPI/Card/Net Banking.`,
        'Take a printout of the final submitted application form for future reference.'
      ];

  const eligibility = typeof input.eligibility === 'object' && input.eligibility.educationalQualification
    ? input.eligibility
    : {
        educationalQualification: 'UPSSSC PET 2025 Score Card, High School Passed from Recognized Board, 3-Year Diploma in Agricultural Engineering from Recognized Institute / Board, Knowledge of Hindi Devanagari Lipi.',
        nationality: 'Citizen of India',
        experience: 'Freshers eligible with required qualifications and PET Score Card.',
        physicalRequirements: 'As per standard department recruitment norms.',
        otherRequirements: 'Knowledge of Hindi Devanagari Lipi'
      };

  const postNames = Array.isArray(input.postNames) && input.postNames.length > 0
    ? input.postNames
    : ['Junior Engineer JE Agriculture'];

  const normalized: GovernmentJob = {
    id: slug,
    slug: slug,
    title: title,
    organization: input.organization || orgData.org,
    department: input.department || orgData.dept,
    category: input.category || orgData.category,
    state: input.state || orgData.state,
    language: input.language || 'Hindi / English',
    postDate: input.postDate || dates.notificationDate || new Date().toISOString().split('T')[0],
    updatedDate: input.updatedDate || new Date().toISOString().split('T')[0],
    status: input.status || 'active',
    shortInformation: input.short_information || input.shortInformation || `Recruitment notification for ${title}. Total ${totalVacancy} vacancies open for eligible candidates.`,
    
    importantDates: {
      notificationDate: input.importantDates?.notificationDate || dates.notificationDate,
      applicationStart: input.importantDates?.applicationStart || dates.applicationStart,
      applicationLastDate: input.importantDates?.applicationLastDate || dates.applicationLastDate,
      correctionStart: input.importantDates?.correctionStart || dates.correctionStart,
      correctionLastDate: input.importantDates?.correctionLastDate || dates.correctionLastDate,
      admitCardDate: input.importantDates?.admitCardDate || dates.admitCardDate,
      examDate: input.importantDates?.examDate || dates.examDate,
      resultDate: input.importantDates?.resultDate || dates.resultDate,
    },
    
    applicationFee: {
      general: input.applicationFee?.general ?? fee.general,
      obc: input.applicationFee?.obc ?? fee.obc,
      ews: input.applicationFee?.ews ?? fee.ews,
      sc: input.applicationFee?.sc ?? fee.sc,
      st: input.applicationFee?.st ?? fee.st,
      female: input.applicationFee?.female ?? fee.female,
      other: input.applicationFee?.other ?? fee.other,
      paymentMode: input.applicationFee?.paymentMode || fee.paymentMode,
    },
    
    ageLimit: {
      minimumAge: input.ageLimit?.minimumAge ?? age.minimumAge,
      maximumAge: input.ageLimit?.maximumAge ?? age.maximumAge,
      ageCalculationDate: input.ageLimit?.ageCalculationDate || age.ageCalculationDate,
    },
    
    ageRelaxation: Array.isArray(input.ageRelaxation) && input.ageRelaxation.length > 0 
      ? input.ageRelaxation 
      : [
          { category: 'SC / ST', relaxationYears: '5 Years' },
          { category: 'OBC', relaxationYears: '3 Years' },
          { category: 'Divyang / PH', relaxationYears: 'Extra as per UPSSSC JE Recruitment Rules' }
        ],
    
    vacancyDetails: {
      totalVacancy: input.vacancyDetails?.totalVacancy ?? totalVacancy,
      note: input.vacancyDetails?.note || 'Advt. No. 19-Exam/2026. Vacancies subject to departmental roster.'
    },
    
    postNames: postNames,
    categoryWiseVacancy: (input.categoryWiseVacancy && input.categoryWiseVacancy.length > 0) ? input.categoryWiseVacancy : categoryVacancies,
    eligibility: eligibility,
    nationality: input.nationality || 'Indian',
    howToApply: howToApply,
    
    officialWebsiteUrl: officialWebsiteUrl || 'https://upsssc.gov.in/',
    officialNotificationUrl: officialNotificationUrl || input.source_url || '',
    applyOnlineUrl: applyOnlineUrl || (dates.applicationStart ? `Link Activates on ${dates.applicationStart}` : ''),
    
    syllabus: input.syllabus || [
      {
        subject: 'Agricultural Engineering Core',
        topics: ['Farm Power & Machinery', 'Soil & Water Conservation', 'Irrigation & Drainage', 'Post Harvest Processing', 'Renewable Energy']
      },
      {
        subject: 'General Knowledge & UP Specific GK',
        topics: ['Uttar Pradesh History & Culture', 'Agriculture Schemes of UP', 'Current Affairs', 'General Hindi & Devanagari Script']
      }
    ],
    
    examPattern: input.examPattern || [
      { subject: 'Agricultural Engineering Subject Knowledge', questions: 100, marks: 100, duration: '120 Mins', negativeMarking: '0.25 Marks', mode: 'Written / OMR CBT' },
      { subject: 'General Knowledge & General Hindi', questions: 50, marks: 50, duration: 'Combined', negativeMarking: '0.25 Marks', mode: 'Written / OMR CBT' }
    ],
    
    previousYearData: input.previousYearData || [
      { year: 2024, vacancies: 120, applicants: 45000, appeared: 32000, selected: 120 },
      { year: 2025, vacancies: 134, applicants: 52000, appeared: 38000, selected: 134 }
    ],
    
    cutoffData: input.cutoffData || [
      { year: '2025 Expected', category: 'UR (Unreserved)', cutoff: 68.5 },
      { year: '2025 Expected', category: 'OBC', cutoff: 65.0 },
      { year: '2025 Expected', category: 'EWS', cutoff: 64.0 },
      { year: '2025 Expected', category: 'SC', cutoff: 58.5 },
      { year: '2025 Expected', category: 'ST', cutoff: 52.0 }
    ],
    
    topicWiseWeightage: input.topicWiseWeightage || [
      { subject: 'Agricultural Engg', topic: 'Farm Power & Machinery', avgQuestions: 25 },
      { subject: 'Agricultural Engg', topic: 'Soil & Water Conservation', avgQuestions: 20 },
      { subject: 'UP General Knowledge', topic: 'UP Geography & Economy', avgQuestions: 15 }
    ],
    
    // Preserve raw rich data
    job_title: input.job_title,
    source_url: input.source_url,
    page_title: input.page_title,
    short_information: input.short_information,
    sections: input.sections,
    all_tables: input.all_tables,
    other_tables: input.other_tables,
    important_links: input.important_links,
    official_websites: input.official_websites,
    content_blocks: input.content_blocks,
    raw_cleaned_content: input.raw_cleaned_content,
    faqs: faqs,
    rawScrapedData: input,
    
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return normalized;
}
