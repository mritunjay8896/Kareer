import React from 'react';
import { ResumeLanguage } from '../../../types/resume';
import { Plus, Trash2, Globe2 } from 'lucide-react';

interface Props {
  languages: ResumeLanguage[];
  onChange: (updated: ResumeLanguage[]) => void;
}

const PROFICIENCIES = ['Native', 'Fluent', 'Professional', 'Working', 'Conversational', 'Elementary'];

export const LanguagesForm: React.FC<Props> = ({ languages, onChange }) => {
  const handleAdd = () => {
    const newLang: ResumeLanguage = {
      id: `lang-${Date.now()}`,
      name: '',
      proficiency: 'Fluent',
    };
    onChange([...languages, newLang]);
  };

  const handleUpdate = (id: string, field: keyof ResumeLanguage, value: string) => {
    onChange(
      languages.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const handleRemove = (id: string) => {
    onChange(languages.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-4">
      {languages.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
          <Globe2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-600 mb-2 font-medium">No languages added</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Language
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {languages.map((lang) => (
            <div key={lang.id} className="flex gap-2 items-center p-2 border border-slate-200 rounded-lg bg-white">
              <input
                type="text"
                value={lang.name}
                onChange={(e) => handleUpdate(lang.id, 'name', e.target.value)}
                placeholder="e.g. English / Hindi / Spanish"
                className="flex-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={lang.proficiency}
                onChange={(e) => handleUpdate(lang.id, 'proficiency', e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {PROFICIENCIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleRemove(lang.id)}
                className="p-1 text-slate-300 hover:text-rose-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-2 border border-dashed border-blue-300 text-blue-700 bg-blue-50/50 hover:bg-blue-50 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Another Language
          </button>
        </div>
      )}
    </div>
  );
};
