import React, { useState } from 'react';
import { Sparkles, Scissors, CheckCircle2, Loader2 } from 'lucide-react';
import { improveResumeText } from '../../../services/aiResumeService';

interface Props {
  summary: string;
  targetTitle?: string;
  onChange: (val: string) => void;
}

export const SummaryForm: React.FC<Props> = ({ summary, targetTitle, onChange }) => {
  const [loadingMode, setLoadingMode] = useState<string | null>(null);

  const handleImprove = async (mode: 'improve' | 'shorten' | 'ats') => {
    if (!summary.trim()) return;
    setLoadingMode(mode);
    try {
      const improved = await improveResumeText(summary, mode, targetTitle);
      onChange(improved);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMode(null);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Professional Summary (2–4 lines)
          </label>
          <span className="text-[11px] text-slate-400 font-mono">
            {summary.length} characters
          </span>
        </div>
        <textarea
          rows={4}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Proactive Software Developer with demonstrated expertise in React, TypeScript, and Node.js. Experienced in designing scalable frontend architectures, building RESTful web services, and collaborating in Agile teams."
          className="w-full p-3 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white leading-relaxed resize-y"
        />
      </div>

      {/* AI Assistance Layer */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AI Grounded Tools:
        </span>

        <button
          type="button"
          disabled={!summary.trim() || Boolean(loadingMode)}
          onClick={() => handleImprove('improve')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 disabled:opacity-50 transition-colors border border-blue-200 cursor-pointer"
        >
          {loadingMode === 'improve' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
          Improve with AI
        </button>

        <button
          type="button"
          disabled={!summary.trim() || Boolean(loadingMode)}
          onClick={() => handleImprove('shorten')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-50 text-slate-700 rounded-md hover:bg-slate-100 disabled:opacity-50 transition-colors border border-slate-200 cursor-pointer"
        >
          {loadingMode === 'shorten' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Scissors className="w-3 h-3" />}
          Shorten
        </button>

        <button
          type="button"
          disabled={!summary.trim() || Boolean(loadingMode)}
          onClick={() => handleImprove('ats')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-800 rounded-md hover:bg-emerald-100 disabled:opacity-50 transition-colors border border-emerald-200 cursor-pointer"
        >
          {loadingMode === 'ats' ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
          Make ATS Friendly
        </button>
      </div>

      <p className="text-[11px] text-slate-500 italic">
        Note: Glitread AI never invents fake metrics or companies; it purely refines grammar and active voice based on your input.
      </p>
    </div>
  );
};
