import React from 'react';
import { Save, CheckCircle, Download, Sparkles, FolderOpen, Import, FileText } from 'lucide-react';
import { ATSAnalysisResult } from '../../types/resume';

interface Props {
  title: string;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastSavedAt: string | null;
  pageCount: number;
  atsResult: ATSAnalysisResult | null;
  onSave: () => void;
  onOpenATSModal: () => void;
  onOpenMyResumes: () => void;
  onImportProfile: () => void;
  onDownloadPDF: () => void;
}

export const ResumeHeader: React.FC<Props> = ({
  title,
  isSaving,
  hasUnsavedChanges,
  lastSavedAt,
  pageCount,
  atsResult,
  onSave,
  onOpenATSModal,
  onOpenMyResumes,
  onImportProfile,
  onDownloadPDF,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-14 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Title & Micro Info */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              AI ATS Resume Builder & Analyzer
            </h1>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              ATS 100% Parsable
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Build an ATS-friendly resume from your Glitread profile with real-time score auditing.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Page count badge */}
          <div className="hidden sm:flex items-center px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
            {pageCount === 1 ? '📄 1 Page (Optimal)' : `📄 ${pageCount} Pages`}
          </div>

          {/* Import Profile button */}
          <button
            type="button"
            onClick={onImportProfile}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition cursor-pointer"
            title="Import information from your Glitread Profile"
          >
            <Import className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Import Profile</span>
          </button>

          {/* My Resumes Drawer */}
          <button
            type="button"
            onClick={onOpenMyResumes}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-slate-600" />
            <span>My Resumes</span>
          </button>

          {/* ATS Analyzer button */}
          <button
            type="button"
            onClick={onOpenATSModal}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer border ${
              atsResult
                ? atsResult.overallScore >= 80
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ATS Audit {atsResult ? `(${atsResult.overallScore}%)` : ''}</span>
          </button>

          {/* Save Status / Button */}
          <button
            type="button"
            disabled={isSaving}
            onClick={onSave}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              hasUnsavedChanges
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isSaving ? (
              <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : hasUnsavedChanges ? (
              <Save className="w-3.5 h-3.5" />
            ) : (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            )}
            <span>{isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save' : 'Saved'}</span>
          </button>

          {/* Download PDF button */}
          <button
            type="button"
            onClick={onDownloadPDF}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
