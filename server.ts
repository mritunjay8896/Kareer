import express from "express";
import fs from "fs";
import path from "path";

const app = express();

const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Health check endpoint for Cloud Run & uptime monitors
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

const GOV_JOBS_DIR = path.join(process.cwd(), "data", "government-jobs");

// Ensure /data/government-jobs directory exists
if (!fs.existsSync(GOV_JOBS_DIR)) {
  fs.mkdirSync(GOV_JOBS_DIR, { recursive: true });
}

// Helper to read all government job files
function readAllGovJobs() {
  const jobs: any[] = [];
  try {
    if (fs.existsSync(GOV_JOBS_DIR)) {
      const files = fs.readdirSync(GOV_JOBS_DIR);
      for (const file of files) {
        if (file.endsWith(".json")) {
          const filePath = path.join(GOV_JOBS_DIR, file);
          const fileContent = fs.readFileSync(filePath, "utf-8");
          try {
            const parsed = JSON.parse(fileContent);
            jobs.push(parsed);
          } catch (e) {
            console.error(`Error parsing JSON file ${file}:`, e);
          }
        }
      }
    }
  } catch (err) {
    console.error("Error reading government jobs directory:", err);
  }
  return jobs.sort(
    (a, b) => new Date(b.updatedDate || b.postDate).getTime() - new Date(a.updatedDate || a.postDate).getTime()
  );
}

// GitHub API sync helper
async function syncToGitHubRepo(filename: string, content: string, isDelete = false) {
  const token = process.env.GITHUB_TOKEN;
  const repoOwner = process.env.GITHUB_REPO_OWNER || process.env.GITHUB_REPOSITORY_OWNER;
  const repoName = process.env.GITHUB_REPO_NAME || process.env.GITHUB_REPOSITORY?.split('/')[1];

  if (!token || !repoOwner || !repoName) {
    console.log("GitHub token/repo not configured in environment. File updated locally.");
    return;
  }

  const filePath = `data/government-jobs/${filename}`;
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

  try {
    // Check if file exists to get SHA
    let sha: string | undefined;
    const getRes = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (getRes.ok) {
      const existingData = await getRes.json();
      sha = existingData.sha;
    }

    if (isDelete) {
      if (sha) {
        await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `admin: delete government job ${filename}`,
            sha,
          }),
        });
        console.log(`Synced deletion of ${filename} to GitHub`);
      }
    } else {
      const base64Content = Buffer.from(content).toString("base64");
      await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `admin: update government job ${filename}`,
          content: base64Content,
          ...(sha ? { sha } : {}),
        }),
      });
      console.log(`Synced update of ${filename} to GitHub`);
    }
  } catch (err) {
    console.error("Error syncing to GitHub API:", err);
  }
}

// Public API Routes
app.get("/api/government-jobs", (req, res) => {
  const jobs = readAllGovJobs();
  res.json(jobs);
});

// Helper for deterministic ATS refinement
function generateDeterministicImprovement(text: string, mode?: string): string {
  let fallbackText = text.trim();
  if (mode === "shorten") {
    fallbackText = fallbackText.split(". ").slice(0, 2).join(". ");
    if (!fallbackText.endsWith(".")) fallbackText += ".";
  } else if (mode === "bullet") {
    if (!/^(Led|Built|Developed|Engineered|Implemented|Optimized|Architected|Delivered|Collaborated|Spearheaded)/i.test(fallbackText)) {
      fallbackText = "Engineered and delivered " + fallbackText.charAt(0).toLowerCase() + fallbackText.slice(1);
    }
  } else if (mode === "ats") {
    fallbackText = fallbackText.replace(/\b(good|helped|worked on|did|made)\b/gi, (match) => {
      const map: Record<string, string> = {
        good: "high-performing",
        helped: "collaborated to deliver",
        "worked on": "developed and deployed",
        did: "executed",
        made: "architected",
      };
      return map[match.toLowerCase()] || match;
    });
  }
  return fallbackText;
}

// AI Writing & ATS Assistant Endpoints
app.post("/api/ai/resume-improve", async (req, res) => {
  try {
    const { text, mode, context } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing text to improve" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallbackText = generateDeterministicImprovement(text, mode);
      return res.json({ result: fallbackText, note: "Applied ATS action-verb optimization rule." });
    }

    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey });

    let systemInstruction = `You are an expert ATS resume editor.
CRITICAL MANDATE: NEVER invent fake facts, metrics, companies, years of experience, or percentages.
Only refine the grammar, tone, action verbs, and ATS keyword clarity strictly based on the user's provided text.`;

    let prompt = "";
    if (mode === "shorten") {
      prompt = `Make the following text concise and punchy for an ATS resume without losing any factual meaning or adding invented statistics:\n\n"${text}"\n\nReturn ONLY the improved text, no quotes, no extra explanations.`;
    } else if (mode === "bullet") {
      prompt = `Refine this resume bullet point using a strong active verb (e.g., Architected, Engineered, Implemented, Spearheaded). Do NOT add made-up metrics or percentages:\n\n"${text}"\n\nReturn ONLY the improved bullet point, no quotes, no conversational intro.`;
    } else if (mode === "ats") {
      prompt = `Rewrite this resume text to make it ATS-friendly with industry standard phrasing. Preserve all facts exactly, never hallucinate metrics or skills:\n\n"${text}"\n\nReturn ONLY the improved text, no commentary.`;
    } else {
      prompt = `Improve the clarity, professional tone, and impact of this resume text while strictly retaining only the facts provided by the user:\n\n"${text}"\n\nReturn ONLY the improved text.`;
    }

    if (context) {
      prompt += `\nRole / Field Context: ${context}`;
    }

    // Try primary model first, fallback to flash-lite if 503/high demand, and fallback to rule-based if both fail
    let generatedText = "";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.3,
          maxOutputTokens: 600,
        },
      });
      generatedText = response.text ? response.text.trim() : "";
    } catch (primaryErr: any) {
      console.warn("Primary gemini-3.8-flash high demand/error, trying gemini-3.1-flash-lite:", primaryErr?.message);
      try {
        const responseLite = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.3,
            maxOutputTokens: 600,
          },
        });
        generatedText = responseLite.text ? responseLite.text.trim() : "";
      } catch (secondaryErr: any) {
        console.warn("Gemini models unavailable (503/quota/high demand). Using deterministic ATS refinement:", secondaryErr?.message);
        const fallback = generateDeterministicImprovement(text, mode);
        return res.json({
          result: fallback,
          fallback: true,
          note: "Applied deterministic ATS action-verb optimization rule (model experiencing temporary high demand).",
        });
      }
    }

    const result = generatedText || generateDeterministicImprovement(text, mode);
    res.json({ result });
  } catch (err: any) {
    console.error("Error in /api/ai/resume-improve, returning fallback:", err);
    const fallback = generateDeterministicImprovement(req.body?.text || "", req.body?.mode);
    res.json({ result: fallback, fallback: true });
  }
});

app.post("/api/ai/resume-ats-analyze", async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;
    if (!resumeData) {
      return res.status(400).json({ error: "Missing resume data" });
    }

    // Prepare text summary of resume
    const skills: string[] = Array.isArray(resumeData.skills)
      ? (typeof resumeData.skills[0] === "string" ? resumeData.skills : resumeData.skills.map((s: any) => s.name || s))
      : [];
    const experienceCount = Array.isArray(resumeData.experience) ? resumeData.experience.length : 0;
    const projectCount = Array.isArray(resumeData.projects) ? resumeData.projects.length : 0;
    const hasEducation = Array.isArray(resumeData.education) && resumeData.education.length > 0;
    const hasEmail = Boolean(resumeData.personalInfo?.email);
    const hasPhone = Boolean(resumeData.personalInfo?.phone);
    const hasSummary = Boolean(resumeData.summary && resumeData.summary.length > 30);

    // Calculate algorithmic score
    let score = 40;
    if (hasEmail && hasPhone) score += 15;
    if (hasSummary) score += 10;
    if (skills.length >= 5) score += 15;
    if (projectCount >= 1) score += 10;
    if (hasEducation) score += 10;

    let matchedKeywords: string[] = [];
    let missingKeywords: string[] = [];
    let suggestions: string[] = [];
    let keywordMatchScore = 70;

    if (jobDescription && jobDescription.trim()) {
      const jdWords = jobDescription
        .toLowerCase()
        .replace(/[^a-z0-9#+.]+/g, " ")
        .split(/\s+/)
        .filter((w: string) => w.length > 3);
      
      const commonTech = [
        "react", "javascript", "typescript", "python", "node", "java", "sql",
        "aws", "docker", "git", "html", "css", "c++", "linux", "rest", "api",
        "mongodb", "kubernetes", "graphql", "tailwind", "express", "postgresql"
      ];
      
      const jdTech: string[] = Array.from(new Set<string>(jdWords.filter((w: string) => commonTech.includes(w))));
      const userSkillsLower: string[] = (skills || []).map((s: any) => typeof s === 'string' ? s.toLowerCase() : s?.name ? String(s.name).toLowerCase() : '');

      matchedKeywords = jdTech.filter((t: string) => userSkillsLower.some((s: string) => s.includes(t)));
      missingKeywords = jdTech.filter((t: string) => !userSkillsLower.some((s: string) => s.includes(t)));

      if (jdTech.length > 0) {
        const matchRatio = matchedKeywords.length / jdTech.length;
        keywordMatchScore = Math.round(matchRatio * 100);
        score = Math.round(score * 0.4 + matchRatio * 100 * 0.6);
      }
    } else {
      keywordMatchScore = Math.min(Math.round((skills.length / 8) * 100), 90);
      if (!hasSummary) suggestions.push("Add a 2-3 sentence Professional Summary to anchor your experience.");
      if (skills.length < 8) suggestions.push("Add more technical and soft skills to improve keyword density.");
      if (projectCount === 0) suggestions.push("Include at least 1-2 impactful projects with live or GitHub links.");
      if (!resumeData.personalInfo?.linkedin) suggestions.push("Include your LinkedIn profile link.");
    }

    if (missingKeywords.length > 0) {
      suggestions.push(`Consider adding target role skills if proficient: ${missingKeywords.slice(0, 5).join(", ")}`);
    }

    score = Math.min(Math.max(score, 25), 98);

    const totalSections = 6;
    let passedSections = 0;
    if (hasEmail && hasPhone) passedSections++;
    if (hasSummary) passedSections++;
    if (hasEducation) passedSections++;
    if (skills.length >= 5) passedSections++;
    if (projectCount > 0) passedSections++;
    if (experienceCount > 0) passedSections++;
    const sectionScore = Math.round((passedSections / totalSections) * 100);

    const breakdown = [
      {
        category: "Contact Information",
        status: hasEmail && hasPhone ? "pass" : "fail",
        message: hasEmail && hasPhone ? "Email and phone number are present." : "Missing email or phone.",
      },
      {
        category: "Professional Summary",
        status: hasSummary ? "pass" : "warning",
        message: hasSummary ? "Professional summary anchors profile." : "Add a summary to introduce core specialization.",
      },
      {
        category: "Core Competencies",
        status: skills.length >= 5 ? "pass" : "warning",
        message: skills.length >= 5 ? `${skills.length} skills listed.` : "Add at least 5-8 relevant skills.",
      },
      {
        category: "Education History",
        status: hasEducation ? "pass" : "warning",
        message: hasEducation ? "Education records formatted." : "Add degrees or certifications.",
      },
      {
        category: "Projects & Practical Work",
        status: projectCount > 0 ? "pass" : "warning",
        message: projectCount > 0 ? `${projectCount} projects documented.` : "Add key technical projects.",
      },
      {
        category: "ATS Typography & Format",
        status: "pass",
        message: "Clean single-column layout without tables or graphics blocking ATS scanners.",
      },
    ];

    res.json({
      score,
      overallScore: score,
      sectionScore,
      keywordMatchScore,
      matchedKeywords,
      missingKeywords,
      matchedCount: matchedKeywords.length,
      totalJdKeywords: matchedKeywords.length + missingKeywords.length,
      suggestions,
      completeness: {
        contact: hasEmail && hasPhone,
        summary: hasSummary,
        education: hasEducation,
        skills: skills.length >= 5,
        projects: projectCount > 0,
        experience: experienceCount > 0,
      },
      breakdown,
    });
  } catch (err: any) {
    console.error("Error in /api/ai/resume-ats-analyze:", err);
    res.status(500).json({ error: err.message || "Failed to analyze resume" });
  }
});

// Dynamic XML Sitemap for Google Search & Discover
app.get("/sitemap.xml", (req, res) => {
  try {
    const jobs = readAllGovJobs();
    const domain = "https://glitread.com";
    const nowIso = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Static Core Pages
    xml += `  <url>\n    <loc>${domain}/</loc>\n    <lastmod>${nowIso}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${domain}/government-jobs</loc>\n    <lastmod>${nowIso}</lastmod>\n    <changefreq>always</changefreq>\n    <priority>0.95</priority>\n  </url>\n`;

    // Dynamic Job Detail Pages
    for (const job of jobs) {
      const slug = job.slug || job.id;
      const lastmod = job.updatedAt || job.createdAt || (job.updatedDate ? new Date(job.updatedDate).toISOString() : nowIso);
      xml += `  <url>\n`;
      xml += `    <loc>${domain}/government-jobs/${slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      if (job.ogImageUrl) {
        xml += `    <image:image>\n      <image:loc>${job.ogImageUrl}</image:loc>\n      <image:title>${job.title || "Government Job Notification"}</image:title>\n    </image:image>\n`;
      }
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    console.error("Error generating sitemap:", err);
    res.status(500).send("Error generating sitemap");
  }
});

// Robots.txt for Search & Generative AI Crawlers
app.get("/robots.txt", (req, res) => {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/

# Generative AI & LLM Search Engine Agents (GEO / SearchGPT / Perplexity / Gemini)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

Sitemap: https://glitread.com/sitemap.xml
`;
  res.header("Content-Type", "text/plain");
  res.send(robots);
});

// /llms.txt Standard for Generative AI Discovery & Indexing
app.get("/llms.txt", (req, res) => {
  try {
    const jobs = readAllGovJobs();
    const domain = "https://glitread.com";

    let md = `# Glitread — Government Exams & Jobs Portal\n\n`;
    md += `> Glitread provides authoritative, up-to-date notifications, eligibility rules, syllabus, age limits, and direct application links for all Central and State Government Exams in India (Sarkari Naukri).\n\n`;
    md += `## Primary Live Government Job Notifications\n\n`;

    for (const job of jobs) {
      const vacancies = job.vacancyDetails?.totalVacancy ? `${job.vacancyDetails.totalVacancy.toLocaleString()} Posts` : 'Multiple Vacancies';
      const lastDate = job.importantDates?.applicationLastDate || 'Check Notification';
      const org = job.organization || 'Govt Body';
      md += `- [${job.title}](${domain}/government-jobs/${job.slug || job.id}): ${org} | Vacancies: ${vacancies} | Last Date: ${lastDate}\n`;
    }

    md += `\n## Core Categories\n`;
    md += `- Central Govt Jobs: SSC, UPSC, Railway RRB, Banking (IBPS/SBI), Defense\n`;
    md += `- State Govt Jobs: All 28 Indian States & 8 Union Territories\n`;
    md += `- Website: ${domain}\n`;

    res.header("Content-Type", "text/plain; charset=utf-8");
    res.send(md);
  } catch (err) {
    res.status(500).send("Error generating llms.txt");
  }
});

// /llms-full.txt Detailed Markdown Directory for AI Knowledge Graphs
app.get("/llms-full.txt", (req, res) => {
  try {
    const jobs = readAllGovJobs();
    const domain = "https://glitread.com";

    let md = `# Glitread Government Exams Knowledge Graph & Directory\n\n`;

    for (const job of jobs) {
      md += `## ${job.title}\n`;
      md += `- **URL:** ${domain}/government-jobs/${job.slug || job.id}\n`;
      md += `- **Organization:** ${job.organization || 'N/A'}\n`;
      md += `- **Category:** ${job.category || 'Central Govt'}\n`;
      md += `- **State/Region:** ${job.state || 'All India'}\n`;
      md += `- **Total Vacancies:** ${job.vacancyDetails?.totalVacancy || 'N/A'}\n`;
      md += `- **Educational Qualification:** ${job.eligibility?.educationalQualification || 'Check Official Notice'}\n`;
      md += `- **Age Limit:** ${job.ageLimit?.minimumAge || 18} to ${job.ageLimit?.maximumAge || 35} years\n`;
      md += `- **Application Start:** ${job.importantDates?.applicationStart || 'N/A'}\n`;
      md += `- **Application Last Date:** ${job.importantDates?.applicationLastDate || 'N/A'}\n`;
      md += `- **Official Website:** ${job.officialWebsiteUrl || 'https://india.gov.in'}\n`;
      if (job.shortInformation) {
        md += `- **Summary:** ${job.shortInformation}\n`;
      }
      md += `\n---\n\n`;
    }

    res.header("Content-Type", "text/plain; charset=utf-8");
    res.send(md);
  } catch (err) {
    res.status(500).send("Error generating llms-full.txt");
  }
});

app.get("/api/government-jobs/:slugOrId", (req, res) => {
  const { slugOrId } = req.params;
  const jobs = readAllGovJobs();
  const job = jobs.find((j) => j.slug === slugOrId || j.id === slugOrId);
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ error: "Government job not found" });
  }
});

// Admin API Routes
app.post("/api/admin/jobs", async (req, res) => {
  try {
    const jobData = req.body;
    const title = jobData?.title || jobData?.job_title || jobData?.page_title;
    if (!jobData || (!jobData.id && !jobData.slug && !title)) {
      return res.status(400).json({ error: "Invalid job data. 'title' or 'job_title' required." });
    }

    const slug = jobData.slug || jobData.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const id = jobData.id || slug;
    const nowIso = new Date().toISOString();
    const todayDate = new Date().toISOString().split("T")[0];

    const finalJob = {
      title,
      ...jobData,
      id,
      slug,
      updatedDate: todayDate,
      updatedAt: nowIso,
      createdAt: jobData.createdAt || nowIso,
    };

    const filename = `${slug}.json`;
    const filePath = path.join(GOV_JOBS_DIR, filename);
    const jsonStr = JSON.stringify(finalJob, null, 2);

    fs.writeFileSync(filePath, jsonStr, "utf-8");

    // Sync to GitHub if configured
    await syncToGitHubRepo(filename, jsonStr, false);

    res.json({ success: true, job: finalJob });
  } catch (err: any) {
    console.error("Error saving job:", err);
    res.status(500).json({ error: err.message || "Failed to save job JSON" });
  }
});

// Admin Bulk Upload API Route
app.post("/api/admin/jobs/bulk", async (req, res) => {
  try {
    const payload = req.body;
    let jobsList: any[] = [];

    if (Array.isArray(payload)) {
      jobsList = payload;
    } else if (payload && Array.isArray(payload.jobs)) {
      jobsList = payload.jobs;
    } else if (payload && typeof payload === 'object' && (payload.title || payload.job_title || payload.page_title)) {
      jobsList = [payload];
    } else {
      return res.status(400).json({ error: "Invalid bulk data. Provide an array of job JSON objects or { jobs: [...] }" });
    }

    if (jobsList.length === 0) {
      return res.status(400).json({ error: "No job items found in upload payload" });
    }

    const savedJobs: any[] = [];
    const errors: Array<{ index: number; title?: string; error: string }> = [];
    const nowIso = new Date().toISOString();
    const todayDate = new Date().toISOString().split("T")[0];

    for (let i = 0; i < jobsList.length; i++) {
      const jobData = jobsList[i];
      if (!jobData || typeof jobData !== 'object') {
        errors.push({ index: i, error: "Invalid JSON object" });
        continue;
      }

      const title = jobData.title || jobData.job_title || jobData.page_title;
      if (!title) {
        errors.push({ index: i, error: "Missing required 'title' or 'job_title' field" });
        continue;
      }

      const slugBase = jobData.slug || jobData.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const slug = slugBase || `gov-job-${Date.now()}-${i}`;
      const id = jobData.id || slug;

      const finalJob = {
        category: "Central Govt",
        state: "All India",
        status: "active",
        ...jobData,
        title,
        id,
        slug,
        updatedDate: jobData.updatedDate || todayDate,
        postDate: jobData.postDate || todayDate,
        updatedAt: nowIso,
        createdAt: jobData.createdAt || nowIso,
      };

      const filename = `${slug}.json`;
      const filePath = path.join(GOV_JOBS_DIR, filename);
      const jsonStr = JSON.stringify(finalJob, null, 2);

      try {
        fs.writeFileSync(filePath, jsonStr, "utf-8");
        await syncToGitHubRepo(filename, jsonStr, false);
        savedJobs.push(finalJob);
      } catch (e: any) {
        errors.push({ index: i, title, error: e.message || "File write error" });
      }
    }

    res.json({
      success: true,
      count: savedJobs.length,
      savedJobs,
      errors
    });
  } catch (err: any) {
    console.error("Error in bulk saving jobs:", err);
    res.status(500).json({ error: err.message || "Failed bulk job save" });
  }
});

app.delete("/api/admin/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = readAllGovJobs();
    const target = jobs.find((j) => j.id === id || j.slug === id);

    if (!target) {
      return res.status(404).json({ error: "Job not found" });
    }

    const filename = `${target.slug || target.id}.json`;
    const filePath = path.join(GOV_JOBS_DIR, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Sync deletion to GitHub if configured
    await syncToGitHubRepo(filename, "", true);

    res.json({ success: true, message: `Deleted job ${id}` });
  } catch (err: any) {
    console.error("Error deleting job:", err);
    res.status(500).json({ error: err.message || "Failed to delete job JSON" });
  }
});

async function start() {
  const isDistBundle = typeof __filename !== "undefined" && (__filename.endsWith(".cjs") || __filename.includes("dist"));
  const isProduction = process.env.NODE_ENV === "production" || isDistBundle;

  if (!isProduction) {
    // Dynamic import Vite in development so production bundle has zero Vite runtime dependency
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.join(process.cwd(), "dist", "index.html"))
      ? path.join(process.cwd(), "dist")
      : typeof __dirname !== "undefined" && fs.existsSync(path.join(__dirname, "index.html"))
      ? __dirname
      : path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send("Glitread platform is starting up...");
      }
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (env: ${isProduction ? "production" : "development"})`);
  });

  // Graceful termination for Cloud Run container lifecycle
  process.on("SIGTERM", () => {
    console.log("SIGTERM received, closing HTTP server");
    server.close(() => {
      process.exit(0);
    });
  });
}

start();
