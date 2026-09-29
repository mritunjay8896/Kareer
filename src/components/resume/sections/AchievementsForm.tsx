import React from 'react';
import { ResumeAchievement } from '../../../types/resume';
import { Plus, Trash2, Award } from 'lucide-react';

interface Props {
  achievements: ResumeAchievement[];
  onChange: (updated: ResumeAchievement[]) => void;
}

export const AchievementsForm: React.FC<Props> = ({ achievements, onChange }) => {
  const handleAdd = () => {
    const newAch: ResumeAchievement = {
      id: `ach-${Date.now()}`,
      title: '',
      description: '',
      date: '',
    };
    onChange([...achievements, newAch]);
  };

  const handleUpdate = (id: string, field: keyof ResumeAchievement, value: string) => {
    onChange(
      achievements.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const handleRemove = (id: string) => {
    onChange(achievements.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-4">
      {achievements.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
          <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-600 mb-2 font-medium">No honors or achievements added</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Achievement
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((ach, index) => (
            <div key={ach.id} className="p-3 border border-slate-200 rounded-lg bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Achievement #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(ach.id)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Title / Honor <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={ach.title}
                    onChange={(e) => handleUpdate(ach.id, 'title', e.target.value)}
                    placeholder="e.g. Dean's List for Academic Excellence / National Merit Scholar"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Date / Year
                  </label>
                  <input
                    type="text"
                    value={ach.date || ''}
                    onChange={(e) => handleUpdate(ach.id, 'date', e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Context / Details
                  </label>
                  <input
                    type="text"
                    value={ach.description || ''}
                    onChange={(e) => handleUpdate(ach.id, 'description', e.target.value)}
                    placeholder="e.g. Ranked top 1% among 5,000 participating students state-wide."
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-2 border border-dashed border-blue-300 text-blue-700 bg-blue-50/50 hover:bg-blue-50 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Another Achievement
          </button>
        </div>
      )}
    </div>
  );
};
