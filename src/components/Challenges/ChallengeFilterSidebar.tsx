import React from 'react';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';
import { ChallengeDifficulty, ChallengeEligibility, ChallengeMode, ChallengeParticipationType, ChallengeType } from '../../types';

export interface ChallengeFilterState {
  searchQuery: string;
  types: string[];
  modes: string[];
  participationTypes: string[];
  difficulties: string[];
  eligibilities: string[];
  deadlineRange: string; // 'all' | 'closing_soon' | 'this_week' | 'this_month'
  selectedSkills: string[];
  onlyFeatured: boolean;
  onlyVerified: boolean;
}

interface ChallengeFilterSidebarProps {
  filters: ChallengeFilterState;
  onFilterChange: (filters: ChallengeFilterState) => void;
  onReset: () => void;
  availableSkills: string[];
}

export const ChallengeFilterSidebar: React.FC<ChallengeFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  availableSkills
}) => {
  const challengeTypes: { label: string; value: string }[] = [
    { label: 'Hackathon', value: 'Hackathon' },
    { label: 'Coding & DSA', value: 'Coding' },
    { label: 'AI & Agents', value: 'AI' },
    { label: 'UI/UX & Design', value: 'Design' },
    { label: 'Business & Case Study', value: 'Business' },
    { label: 'Growth & Marketing', value: 'Marketing' },
    { label: 'Finance & FinTech', value: 'Finance' },
    { label: 'Open Innovation', value: 'Open Innovation' },
    { label: 'Non-Tech & General', value: 'Non-Tech' }
  ];

  const modes: { label: string; value: string }[] = [
    { label: 'Online / Virtual', value: 'Online' },
    { label: 'Offline / In-Person', value: 'Offline' },
    { label: 'Hybrid', value: 'Hybrid' }
  ];

  const participationOptions = [
    { label: 'Individual', value: 'Individual' },
    { label: 'Team', value: 'Team' },
    { label: 'Individual or Team', value: 'Individual or Team' }
  ];

  const difficulties = [
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
    { label: 'All Levels', value: 'All Levels' }
  ];

  const eligibilityList = [
    { label: 'Open to All', value: 'Open to All' },
    { label: 'College Students', value: 'College Students' },
    { label: 'Freshers', value: 'Freshers' },
    { label: 'Working Professionals', value: 'Working Professionals' },
    { label: 'School Students', value: 'School Students' }
  ];

  const deadlineOptions = [
    { label: 'All Deadlines', value: 'all' },
    { label: 'Closing Soon (Under 7 Days)', value: 'closing_soon' },
    { label: 'This Month', value: 'this_month' },
    { label: 'Upcoming', value: 'upcoming' }
  ];

  const toggleArrayItem = (key: 'types' | 'modes' | 'participationTypes' | 'difficulties' | 'eligibilities' | 'selectedSkills', val: string) => {
    const current = [...filters[key]];
    const index = current.indexOf(val);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(val);
    }
    onFilterChange({ ...filters, [key]: current });
  };

  const hasActiveFilters = 
    filters.types.length > 0 ||
    filters.modes.length > 0 ||
    filters.participationTypes.length > 0 ||
    filters.difficulties.length > 0 ||
    filters.eligibilities.length > 0 ||
    filters.selectedSkills.length > 0 ||
    filters.deadlineRange !== 'all' ||
    filters.onlyFeatured ||
    filters.onlyVerified;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-6 shadow-xs sticky top-[80px]">
      
      {/* Top Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <h3 className="font-extrabold text-sm text-slate-900">Filters</h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Verified & Featured Quick Toggles */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.onlyFeatured}
            onChange={(e) => onFilterChange({ ...filters, onlyFeatured: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
          <span>Featured Challenges only</span>
        </label>

        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.onlyVerified}
            onChange={(e) => onFilterChange({ ...filters, onlyVerified: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
          <span>Verified by Glitread only</span>
        </label>
      </div>

      {/* Challenge Type */}
      <div className="space-y-2.5">
        <span className="text-xs font-extrabold text-slate-900 block">Challenge Type</span>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
          {challengeTypes.map((t) => {
            const isChecked = filters.types.includes(t.value);
            return (
              <label key={t.value} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayItem('types', t.value)}
                  className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>{t.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Mode (Online / Offline / Hybrid) */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <span className="text-xs font-extrabold text-slate-900 block">Mode</span>
        <div className="space-y-1.5 text-xs">
          {modes.map((m) => {
            const isChecked = filters.modes.includes(m.value);
            return (
              <label key={m.value} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayItem('modes', m.value)}
                  className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>{m.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Participation Type */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <span className="text-xs font-extrabold text-slate-900 block">Participation</span>
        <div className="space-y-1.5 text-xs">
          {participationOptions.map((p) => {
            const isChecked = filters.participationTypes.includes(p.value);
            return (
              <label key={p.value} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayItem('participationTypes', p.value)}
                  className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>{p.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <span className="text-xs font-extrabold text-slate-900 block">Difficulty</span>
        <div className="space-y-1.5 text-xs">
          {difficulties.map((d) => {
            const isChecked = filters.difficulties.includes(d.value);
            return (
              <label key={d.value} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayItem('difficulties', d.value)}
                  className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>{d.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Eligibility */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <span className="text-xs font-extrabold text-slate-900 block">Eligibility</span>
        <div className="space-y-1.5 text-xs">
          {eligibilityList.map((e) => {
            const isChecked = filters.eligibilities.includes(e.value);
            return (
              <label key={e.value} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayItem('eligibilities', e.value)}
                  className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>{e.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Deadline Range */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <span className="text-xs font-extrabold text-slate-900 block">Registration Deadline</span>
        <div className="space-y-1.5 text-xs">
          {deadlineOptions.map((dl) => (
            <label key={dl.value} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
              <input
                type="radio"
                name="deadlineRange"
                checked={filters.deadlineRange === dl.value}
                onChange={() => onFilterChange({ ...filters, deadlineRange: dl.value })}
                className="w-3.5 h-3.5 text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span>{dl.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skills */}
      {availableSkills.length > 0 && (
        <div className="space-y-2.5 pt-3 border-t border-slate-100">
          <span className="text-xs font-extrabold text-slate-900 block">Skills & Tech Stack</span>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
            {availableSkills.map((skill) => {
              const isSelected = filters.selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleArrayItem('selectedSkills', skill)}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
