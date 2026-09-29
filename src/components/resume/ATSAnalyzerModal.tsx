import React, { useState } from 'react';
import { ResumeData, ATSAnalysisResult } from '../../types/resume';
import { calculateATSScore } from '../../services/atsAnalysisService';
import { analyzeJobDescriptionATS } from '../../services/aiResumeService';
import { X, Sparkles, CheckCircle2, AlertTriangle, AlertCircle, ArrowRight, Loader2, Copy, FileSearch } from 'lucide-react';

interface Props {
  data: ResumeData;
  isOpen: boolean;
  onClose: () => void;
  onApplySkill: (skillName: string) => void;
  onSaveTargetJD: (title: string, jd: string, lastResult: ATSAnalysisResult) => void;
}

export const ATSAnalyzerModal: React.FC<Props> = ({
  data,
  isOpen,
  onClose,
  onApplySkill,
  onSaveTargetJD,
}) => {
  const [targetTitle, setTargetTitle] = useState(data.targetJobTitle || data.personalInfo.targetTitle || '');
  const [targetJD, setTargetJD] = useState(data.targetJobDescription || '');
  const [activeTab, setActiveTab] = useState<'audit' | 'jd_match'>('audit');
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);
  const [analysis, setAnalysis] = useState<ATSAnalysisResult>(() =>
    calculateATSScore(data, data.targetJobDescription)
  );

  if (!isOpen) return null;

  const handleRunAnalysis = async () => {
    // 1. Run rigorous deterministic ATS scoring first
    const clientResult = calculateATSScore(data, targetJD);
    setAnalysis(clientResult);

    // 2. If user provided a JD, enhance with AI analysis
    if (targetJD.trim().length > 50) {
      setIsAnalyzingAI(true);
      try {
        const aiResult = await analyzeJobDescriptionATS(data, targetJD, targetTitle);
        setAnalysis(aiResult);
        onSaveTargetJD(targetTitle, targetJD, aiResult);
      } catch (err) {
        console.error('AI ATS failed, using calculated score:', err);
        onSaveTargetJD(targetTitle, targetJD, clientResult);
      } finally {
        setIsAnalyzingAI(false);
      }
    } else {
      onSaveTargetJD(targetTitle, targetJD, clientResult);
    }
  };

  const overallScore = analysis?.overallScore ?? analysis?.score ?? 70;
  const sectionScore = analysis?.sectionScore ?? 75;
  const keywordMatchScore = analysis?.keywordMatchScore ?? 70;
  const missingKeywords = analysis?.missingKeywords || [];
  const matchedKeywords = analysis?.matchedKeywords || [];
  const breakdown = analysis?.breakdown || [];
  const suggestions = analysis?.suggestions || [];

  const scoreColor =
    overallScore >= 80
      ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
      : overallScore >= 60
      ? 'text-amber-600 bg-amber-50 border-amber-200'
      : 'text-rose-600 bg-rose-50 border-rose-200';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Glitread Real ATS Score & Job Matcher
              </h2>
              <p className="text-xs text-slate-500">
                Grounded algorithmic analysis — no fake scores.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 px-5 pt-2 bg-slate-50">
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'audit'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            General ATS Audit
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('jd_match')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'jd_match'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileSearch className="w-3.5 h-3.5" /> Target Job Matcher
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'jd_match' && (
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Job Role
                  </label>
                  <input
                    type="text"
                    value={targetTitle}
                    onChange={(e) => setTargetTitle(e.target.value)}
                    placeholder="e.g. Frontend Developer"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Paste Target Job Description (JD)
                </label>
                <textarea
                  rows={4}
                  value={targetJD}
                  onChange={(e) => setTargetJD(e.target.value)}
                  placeholder="Paste the job description from LinkedIn, Glitread, or Company careers page here..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={isAnalyzingAI}
                  onClick={handleRunAnalysis}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-xs cursor-pointer disabled:opacity-50 transition"
                >
                  {isAnalyzingAI ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  {isAnalyzingAI ? 'Analyzing JD...' : 'Match Resume to JD'}
                </button>
              </div>
            </div>
          )}

          {/* Score Overview Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3.5 rounded-xl border text-center ${scoreColor}`}>
              <div className="text-2xl sm:text-3xl font-black">{overallScore}%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider mt-0.5">Overall ATS Score</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-center">
              <div className="text-2xl sm:text-3xl font-black text-slate-800">{sectionScore}%</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Section Completeness</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-center">
              <div className="text-2xl sm:text-3xl font-black text-slate-800">{keywordMatchScore}%</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Keyword Match</div>
            </div>
          </div>

          {/* Missing Skills from JD */}
          {missingKeywords.length > 0 && (
            <div className="p-3.5 border border-amber-200 bg-amber-50/70 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Missing In-Demand Keywords from Target Role:
              </div>
              <p className="text-[11px] text-amber-800">
                Click a skill below to instantly add it to your Resume Skills section if you have actual experience with it:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {missingKeywords.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => onApplySkill(k)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-md bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 font-semibold cursor-pointer shadow-2xs transition"
                  >
                    <span>+ {k}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Skills */}
          {matchedKeywords.length > 0 && (
            <div className="p-3.5 border border-emerald-200 bg-emerald-50/60 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Successfully Matched Keywords ({matchedKeywords.length}):
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {matchedKeywords.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center px-2 py-0.5 text-xs rounded bg-white text-emerald-800 border border-emerald-200 font-medium"
                  >
                    ✓ {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Specific Checkpoints */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Audit Breakdown
            </h3>
            <div className="space-y-1.5">
              {breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 ${
                    item.status === 'pass'
                      ? 'bg-emerald-50/40 border-emerald-200 text-emerald-900'
                      : item.status === 'warning'
                      ? 'bg-amber-50/40 border-amber-200 text-amber-900'
                      : 'bg-rose-50/40 border-rose-200 text-rose-900'
                  }`}
                >
                  {item.status === 'pass' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : item.status === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <span className="font-bold">{item.category}: </span>
                    <span>{item.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Recommendations */}
          {suggestions.length > 0 && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-slate-800">Key Recommendations:</h4>
              <ul className="list-disc ml-5 space-y-1 text-xs text-slate-700">
                {suggestions.map((sug, i) => (
                  <li key={i}>{sug}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 cursor-pointer shadow-xs transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
