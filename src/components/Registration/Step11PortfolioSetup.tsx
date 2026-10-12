import React, { useEffect } from 'react';
import { Globe, Lock, Eye, Check, Sparkles, Layout } from 'lucide-react';
import { RegistrationPortfolioPreferences } from './types';

interface Step11PortfolioSetupProps {
  portfolio: RegistrationPortfolioPreferences;
  fullName: string;
  onChange: (fields: Partial<RegistrationPortfolioPreferences>) => void;
}

const TEMPLATES: { id: RegistrationPortfolioPreferences['template']; name: string; desc: string }[] = [
  { id: 'Modern', name: 'Modern Indigo', desc: 'Bento layout with sleek skill badges and gradient accents' },
  { id: 'Minimal', name: 'Clean Minimal', desc: 'Monochrome, high-typography layout for maximum clarity' },
  { id: 'Professional', name: 'Corporate Elite', desc: 'Structured timeline design for enterprise recruiters' },
  { id: 'Creative', name: 'Creative Showcase', desc: 'Visual cards and portfolio showcase with vibrant tags' },
  { id: 'Developer', name: 'Terminal & Code', desc: 'Developer-oriented cards, GitHub links, and tech stacks' },
  { id: 'Student', name: 'Campus Ready', desc: 'Highlights coursework, internships, and capstone projects' },
  { id: 'Executive', name: 'Executive Lead', desc: 'Focuses on strategic impact, leadership, and metrics' }
];

const AVAILABLE_SECTIONS = [
  'About',
  'Skills',
  'Experience',
  'Education',
  'Projects',
  'Certifications',
  'Achievements',
  'Internships',
  'Open Source',
  'Contact'
];

export const Step11PortfolioSetup: React.FC<Step11PortfolioSetupProps> = ({
  portfolio,
  fullName,
  onChange
}) => {
  // Suggest a username if empty
  useEffect(() => {
    if (!portfolio.username && fullName.trim()) {
      const slug = fullName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      if (slug) {
        onChange({ username: slug });
      }
    }
  }, [fullName, portfolio.username, onChange]);

  const handleUsernameChange = (val: string) => {
    // Alphanumeric + hyphens/underscores
    const sanitized = val.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    onChange({ username: sanitized });
  };

  const toggleSection = (sec: string) => {
    const current = portfolio.enabledSections || [];
    const exists = current.includes(sec);
    const updated = exists ? current.filter((s) => s !== sec) : [...current, sec];
    onChange({ enabledSections: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
          Shareable Portfolio Setup
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize your free personal portfolio website URL and layout preferences.
        </p>
      </div>

      <div className="space-y-5">
        {/* Username & Live Link Preview */}
        <div className="bg-blue-50/50 border border-blue-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <label className="block text-xs font-bold text-slate-800">
            Portfolio Username / Handle <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-xl shrink-0">
              glitread.com/p/
            </span>
            <input
              type="text"
              value={portfolio.username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              placeholder="yourname"
              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-blue-700 outline-none focus:border-blue-600 shadow-2xs"
            />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-blue-900/80 font-medium">
            <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>
              Your public portfolio will be live at:{' '}
              <strong className="text-blue-700 underline">
                https://glitread.com/p/{portfolio.username || 'yourname'}
              </strong>
            </span>
          </div>
        </div>

        {/* Visibility: Public vs Private */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Portfolio Visibility
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onChange({ visibility: 'Public' })}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                portfolio.visibility === 'Public'
                  ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:bg-slate-50 bg-white'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Public (Recommended)
                </span>
                <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                  Anyone with the link can view your portfolio. Discoverable by verified recruiters.
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onChange({ visibility: 'Private' })}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                portfolio.visibility === 'Private'
                  ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:bg-slate-50 bg-white'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Private
                </span>
                <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                  Hidden from public search engines. Only accessible when you share direct access.
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Portfolio Template Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Choose Portfolio Design Style
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {TEMPLATES.map((tmpl) => {
              const selected = portfolio.template === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => onChange({ template: tmpl.id })}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selected
                      ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 font-bold'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{tmpl.name}</span>
                    {selected && <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />}
                  </div>
                  <p className="text-[10px] text-slate-500 leading-snug">
                    {tmpl.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Display Sections Checkboxes */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Enabled Portfolio Sections <span className="text-slate-400 font-normal">(check all to display)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {AVAILABLE_SECTIONS.map((sec) => {
              const checked = portfolio.enabledSections?.includes(sec);
              return (
                <button
                  key={sec}
                  type="button"
                  onClick={() => toggleSection(sec)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    checked
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span>{sec}</span>
                  {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
