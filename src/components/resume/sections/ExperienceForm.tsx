import React from 'react';
import { ResumeExperience } from '../../../types/resume';
import { Plus, Trash2, Briefcase } from 'lucide-react';

interface Props {
  experience: ResumeExperience[];
  onChange: (updated: ResumeExperience[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ experience, onChange }) => {
  const handleAdd = () => {
    const newExp: ResumeExperience = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      responsibilities: [''],
    };
    onChange([...experience, newExp]);
  };

  const handleUpdate = (id: string, field: keyof ResumeExperience, value: any) => {
    onChange(
      experience.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleRemove = (id: string) => {
    onChange(experience.filter((e) => e.id !== id));
  };

  const handleAddBullet = (expId: string) => {
    const target = experience.find((e) => e.id === expId);
    if (!target) return;
    const current = target.responsibilities || [];
    handleUpdate(expId, 'responsibilities', [...current, '']);
  };

  const handleUpdateBullet = (expId: string, index: number, text: string) => {
    const target = experience.find((e) => e.id === expId);
    if (!target) return;
    const bullets = [...(target.responsibilities || [])];
    bullets[index] = text;
    handleUpdate(expId, 'responsibilities', bullets);
  };

  const handleRemoveBullet = (expId: string, index: number) => {
    const target = experience.find((e) => e.id === expId);
    if (!target) return;
    const bullets = (target.responsibilities || []).filter((_, i) => i !== index);
    handleUpdate(expId, 'responsibilities', bullets);
  };

  return (
    <div className="space-y-4">
      {experience.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
          <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-600 mb-1 font-medium">No work experience entries</p>
          <p className="text-[11px] text-slate-400 mb-3">
            Freshers can leave this section blank; it will automatically be hidden on your resume.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div key={exp.id} className="p-3.5 border border-slate-200 rounded-lg bg-white space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">
                  Role #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(exp.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition"
                  title="Remove experience"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                    placeholder="e.g. Infosys / TCS / Tech Solutions"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Designation / Role Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleUpdate(exp.id, 'role', e.target.value)}
                    placeholder="e.g. Associate Software Engineer"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)}
                    placeholder="e.g. Bengaluru, India / Remote"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                    placeholder="e.g. Jul 2023"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-slate-600">
                      End Date
                    </label>
                    <label className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => handleUpdate(exp.id, 'current', e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                      Present
                    </label>
                  </div>
                  <input
                    type="text"
                    disabled={exp.current}
                    value={exp.current ? 'Present' : exp.endDate}
                    onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                    placeholder="e.g. Present or Dec 2024"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
                  />
                </div>
              </div>

              {/* Responsibilities bullets */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-semibold text-slate-700">
                    Key Responsibilities & Bullet Points
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(exp.id)}
                    className="text-[11px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Bullet
                  </button>
                </div>
                <div className="space-y-1.5">
                  {(exp.responsibilities || []).map((resp, bulletIdx) => (
                    <div key={bulletIdx} className="flex gap-2 items-center">
                      <span className="text-slate-400 text-xs">•</span>
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => handleUpdateBullet(exp.id, bulletIdx, e.target.value)}
                        placeholder="Developed robust microservices handling 10k daily transactions..."
                        className="flex-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {(exp.responsibilities || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveBullet(exp.id, bulletIdx)}
                          className="p-1 text-slate-300 hover:text-rose-500"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-2 border border-dashed border-blue-300 text-blue-700 bg-blue-50/50 hover:bg-blue-50 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Another Experience
          </button>
        </div>
      )}
    </div>
  );
};
