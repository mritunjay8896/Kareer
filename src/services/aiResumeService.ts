import { ResumeData, AtsAnalysisResult } from '../types/resume';
import { calculateAtsAnalysis } from './atsAnalysisService';

export async function improveResumeText(
  text: string,
  mode: 'improve' | 'shorten' | 'bullet' | 'ats',
  context?: string
): Promise<string> {
  try {
    const res = await fetch('/api/ai/resume-improve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, mode, context }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return data.result || text;
  } catch (err) {
    console.warn('AI API fallback to local enhancement:', err);
    // Local deterministic styling without hallucinating facts
    const trimmed = text.trim();
    if (mode === 'shorten') {
      const sentences = trimmed.split('. ');
      return sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '.' : '');
    } else if (mode === 'bullet') {
      if (!/^(Led|Built|Developed|Engineered|Implemented|Optimized|Architected|Delivered)/i.test(trimmed)) {
        return `Engineered and deployed ${trimmed.charAt(0).toLowerCase() + trimmed.slice(1)}`;
      }
    } else if (mode === 'ats') {
      return trimmed
        .replace(/\bhelped\b/gi, 'collaborated to deliver')
        .replace(/\bworked on\b/gi, 'developed and maintained')
        .replace(/\bgood\b/gi, 'robust')
        .replace(/\bmade\b/gi, 'engineered');
    }
    return trimmed;
  }
}

export async function analyzeResumeWithAts(
  resumeData: ResumeData,
  jobDescription?: string,
  targetTitle?: string
): Promise<AtsAnalysisResult> {
  const clientCalc = calculateAtsAnalysis(resumeData, jobDescription);

  try {
    const res = await fetch('/api/ai/resume-ats-analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeData, jobDescription, targetTitle }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        ...clientCalc,
        ...data,
        overallScore: data.overallScore ?? data.score ?? clientCalc.overallScore,
        sectionScore: data.sectionScore ?? clientCalc.sectionScore,
        keywordMatchScore: data.keywordMatchScore ?? clientCalc.keywordMatchScore,
        breakdown: Array.isArray(data.breakdown) && data.breakdown.length > 0 ? data.breakdown : clientCalc.breakdown,
      };
    }
  } catch (err) {
    console.warn('Backend ATS analysis offline, using local client calculation:', err);
  }

  // Fallback to client algorithm
  return clientCalc;
}

export const analyzeJobDescriptionATS = analyzeResumeWithAts;
