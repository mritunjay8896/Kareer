import React, { useState } from 'react';
import { ResumeSkillItem, SkillCategory } from '../../../types/resume';
import { Plus, X, Tag } from 'lucide-react';

interface Props {
  skills: ResumeSkillItem[];
  onChange: (updated: ResumeSkillItem[]) => void;
}

const CATEGORIES: SkillCategory[] = [
  'Technical Skills',
  'Frameworks',
  'Languages',
  'Databases',
  'Tools',
  'Soft Skills',
  'Other',
];

export const SkillsForm: React.FC<Props> = ({ skills, onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('Technical Skills');
  const [newSkillName, setNewSkillName] = useState('');

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newSkillName.trim();
    if (!trimmed) return;

    // Check duplicate
    const exists = skills.some(
      (s) => s.name.toLowerCase() === trimmed.toLowerCase() && s.category === selectedCategory
    );
    if (exists) {
      setNewSkillName('');
      return;
    }

    const newItem: ResumeSkillItem = {
      id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: trimmed,
      category: selectedCategory,
    };

    onChange([...skills, newItem]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (id: string) => {
    onChange(skills.filter((s) => s.id !== id));
  };

  // Group current skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, ResumeSkillItem[]>);

  return (
    <div className="space-y-4">
      {/* Category selector & input row */}
      <form onSubmit={handleAddSkill} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs rounded-full font-medium transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder={`Add a skill to ${selectedCategory} (e.g. React, PostgreSQL, Docker)...`}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={!newSkillName.trim()}
            className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </form>

      {/* Render chips by category */}
      <div className="space-y-3">
        {CATEGORIES.map((cat) => {
          const list = skillsByCategory[cat] || [];
          if (list.length === 0) return null;
          return (
            <div key={cat} className="p-2.5 border border-slate-100 rounded-lg bg-white">
              <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex justify-between items-center">
                <span>{cat}</span>
                <span className="text-slate-400 font-normal">({list.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {list.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    <span>{s.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s.id)}
                      className="text-slate-400 hover:text-rose-600 transition"
                      title="Remove"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {skills.length === 0 && (
          <div className="text-center py-4 text-xs text-slate-400">
            No skills added yet. Choose a category and type a skill above.
          </div>
        )}
      </div>
    </div>
  );
};
