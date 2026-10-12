import React, { useState, useMemo } from 'react';
import { Search, Plus, X, Sparkles, Check, XCircle } from 'lucide-react';
import { RegistrationSkill } from './types';
import { SKILL_CATEGORIES, POPULAR_SKILLS_BY_CATEGORY } from './constants';

interface Step6SkillsProps {
  skillsList: RegistrationSkill[];
  onChange: (list: RegistrationSkill[]) => void;
  error?: string;
}

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

export const Step6Skills: React.FC<Step6SkillsProps> = ({
  skillsList,
  onChange,
  error
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [customSkillName, setCustomSkillName] = useState('');
  const [customLevel, setCustomLevel] = useState<RegistrationSkill['level']>('Intermediate');
  const [customCategory, setCustomCategory] = useState<string>('Frontend');

  // Set of already added skill names (lowercase for deduplication)
  const addedNames = useMemo(
    () => new Set(skillsList.map((s) => s.name.toLowerCase())),
    [skillsList]
  );

  // Add a skill
  const handleAddSkill = (name: string, category: string, level: RegistrationSkill['level'] = 'Intermediate') => {
    const trimmed = name.trim();
    if (!trimmed || addedNames.has(trimmed.toLowerCase())) return;

    onChange([
      ...skillsList,
      {
        name: trimmed,
        level,
        category
      }
    ]);
  };

  // Remove skill
  const handleRemoveSkill = (name: string) => {
    onChange(skillsList.filter((s) => s.name.toLowerCase() !== name.toLowerCase()));
  };

  // Update skill level
  const handleUpdateLevel = (name: string, level: RegistrationSkill['level']) => {
    onChange(
      skillsList.map((s) => (s.name.toLowerCase() === name.toLowerCase() ? { ...s, level } : s))
    );
  };

  // Handle custom skill submit
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkillName.trim()) {
      handleAddSkill(customSkillName.trim(), customCategory, customLevel);
      setCustomSkillName('');
    }
  };

  // Filter popular suggestions
  const suggestedSkills = useMemo(() => {
    let list: { name: string; category: string }[] = [];

    Object.entries(POPULAR_SKILLS_BY_CATEGORY).forEach(([cat, skills]) => {
      if (selectedCategoryFilter === 'All' || selectedCategoryFilter === cat) {
        skills.forEach((name) => {
          list.push({ name, category: cat });
        });
      }
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }

    return list.slice(0, 24);
  }, [searchQuery, selectedCategoryFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
          Skills & Proficiencies
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Add your key technical, design, and business skills with proficiency levels. This powers recruiter matching and ATS parsing.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-rose-700">
          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Added Skills List (Interactive chips with level dropdown) */}
      <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Added Skills ({skillsList.length})</span>
          </span>
          <span className="text-[11px] text-slate-500">
            {skillsList.length >= 5 ? '✓ Great skill count!' : 'Add at least 3-5 skills'}
          </span>
        </div>

        {skillsList.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-3 text-center">
            No skills added yet. Click on suggestions below or type custom skills to add.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill) => (
              <div
                key={skill.name}
                className="bg-white border border-slate-200 shadow-2xs rounded-xl pl-3 pr-1.5 py-1 flex items-center gap-2 text-xs font-semibold text-slate-800 hover:border-blue-300 transition-all"
              >
                <span>{skill.name}</span>
                
                {/* Level selector */}
                <select
                  value={skill.level}
                  onChange={(e) => handleUpdateLevel(skill.name, e.target.value as any)}
                  className="bg-slate-100 hover:bg-slate-200 border-none rounded-lg text-[10px] font-bold text-blue-700 px-1.5 py-0.5 outline-none cursor-pointer"
                >
                  {SKILL_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.name)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                  title="Remove skill"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Add Form */}
      <form onSubmit={handleCustomSubmit} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
        <label className="block text-xs font-bold text-slate-700">
          Add Custom Skill
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
          <div className="sm:col-span-6 relative">
            <input
              type="text"
              value={customSkillName}
              onChange={(e) => setCustomSkillName(e.target.value)}
              placeholder="e.g. Next.js, Kubernetes, Tailwind, Blender"
              className="w-full px-3.5 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
            >
              {SKILL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              disabled={!customSkillName.trim()}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>
        </div>
      </form>

      {/* Popular Suggestions & Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <span className="text-xs font-bold text-slate-700">
            Or Click to Add Popular Skills
          </span>

          {/* Search box for suggestions */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter suggested skills..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-blue-600"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedCategoryFilter('All')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategoryFilter === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategoryFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Suggested Skills Grid */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {suggestedSkills.map((s) => {
            const isAdded = addedNames.has(s.name.toLowerCase());
            return (
              <button
                key={s.name}
                type="button"
                disabled={isAdded}
                onClick={() => handleAddSkill(s.name, s.category, 'Intermediate')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white text-slate-700 border-slate-200/90 hover:border-blue-400 hover:text-blue-600 shadow-2xs hover:shadow-xs active:scale-95'
                }`}
              >
                <span>{s.name}</span>
                {isAdded ? (
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                ) : (
                  <Plus className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
