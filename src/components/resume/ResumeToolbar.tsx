import React from 'react';
import { ResumeTemplateId, ResumeFontFamily, ResumeSpacing, ResumeAccentColor } from '../../types/resume';
import { SlidersHorizontal, LayoutTemplate, Type, Space, Palette } from 'lucide-react';

interface Props {
  template: ResumeTemplateId;
  font: ResumeFontFamily;
  spacing: ResumeSpacing;
  accent: ResumeAccentColor;
  showSectionManager: boolean;
  onTemplateChange: (t: ResumeTemplateId) => void;
  onFontChange: (f: ResumeFontFamily) => void;
  onSpacingChange: (s: ResumeSpacing) => void;
  onAccentChange: (a: ResumeAccentColor) => void;
  onToggleSectionManager: () => void;
}

const TEMPLATES: { id: ResumeTemplateId; name: string }[] = [
  { id: 'HarvardClassic', name: 'Harvard Classic' },
  { id: 'ModernATS', name: 'Modern ATS' },
  { id: 'StudentProfessional', name: 'Student Professional' },
  { id: 'Technical', name: 'Technical Dev' },
  { id: 'Minimal', name: 'Minimalist' },
];

const FONTS: ResumeFontFamily[] = ['Inter', 'Arial', 'Roboto', 'Georgia'];
const SPACINGS: ResumeSpacing[] = ['Compact', 'Standard', 'Comfortable'];
const ACCENTS: { id: ResumeAccentColor; label: string; bgClass: string }[] = [
  { id: 'navy', label: 'Navy', bgClass: 'bg-slate-900' },
  { id: 'black', label: 'Black', bgClass: 'bg-black' },
  { id: 'blue', label: 'Royal Blue', bgClass: 'bg-blue-600' },
  { id: 'green', label: 'Forest Green', bgClass: 'bg-emerald-800' },
];

export const ResumeToolbar: React.FC<Props> = ({
  template,
  font,
  spacing,
  accent,
  showSectionManager,
  onTemplateChange,
  onFontChange,
  onSpacingChange,
  onAccentChange,
  onToggleSectionManager,
}) => {
  return (
    <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Template Selector */}
          <div className="flex items-center gap-1.5">
            <LayoutTemplate className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-slate-700 hidden sm:inline">Template:</span>
            <select
              value={template}
              onChange={(e) => onTemplateChange(e.target.value as ResumeTemplateId)}
              className="bg-white border border-slate-200 rounded-md px-2 py-1 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Font Selector */}
          <div className="flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-slate-700 hidden sm:inline">Font:</span>
            <select
              value={font}
              onChange={(e) => onFontChange(e.target.value as ResumeFontFamily)}
              className="bg-white border border-slate-200 rounded-md px-2 py-1 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Spacing Selector */}
          <div className="flex items-center gap-1.5">
            <Space className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-slate-700 hidden sm:inline">Spacing:</span>
            <select
              value={spacing}
              onChange={(e) => onSpacingChange(e.target.value as ResumeSpacing)}
              className="bg-white border border-slate-200 rounded-md px-2 py-1 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {SPACINGS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Accent Color */}
          <div className="flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-slate-700 hidden sm:inline">Color:</span>
            <div className="flex items-center gap-1">
              {ACCENTS.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => onAccentChange(acc.id)}
                  title={acc.label}
                  className={`w-4 h-4 rounded-full ${acc.bgClass} transition cursor-pointer ${
                    accent === acc.id ? 'ring-2 ring-offset-1 ring-blue-600 scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Section Order & Visibility Button */}
        <button
          type="button"
          onClick={onToggleSectionManager}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition cursor-pointer ${
            showSectionManager
              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{showSectionManager ? 'Close Sections' : 'Reorder / Hide Sections'}</span>
        </button>
      </div>
    </div>
  );
};
