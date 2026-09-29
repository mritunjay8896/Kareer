import React from 'react';
import { ResumeInternship } from '../../../types/resume';
import { Plus, Trash2, Award } from 'lucide-react';

interface Props {
  internships: ResumeInternship[];
  onChange: (updated: ResumeInternship[]) => void;
}

export const InternshipsForm: React.FC<Props> = ({ internships, onChange }) => {
  const handleAdd = () => {
    const newIntern: ResumeInternship = {
      id: `intern-${Date.now()}`,
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      responsibilities: [''],
      certificateUrl: '',
    };
    onChange([...internships, newIntern]);
  };

  const handleUpdate = (id: string, field: keyof ResumeInternship, value: any) => {
    onChange(
      internships.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(internships.filter((item) => item.id !== id));
  };

  const handleAddBullet = (id: string) => {
    const target = internships.find((i) => i.id === id);
    if (!target) return;
    const current = target.responsibilities || [];
    handleUpdate(id, 'responsibilities', [...current, '']);
  };

  const handleUpdateBullet = (id: string, index: number, text: string) => {
    const target = internships.find((i) => i.id === id);
    if (!target) return;
    const bullets = [...(target.responsibilities || [])];
    bullets[index] = text;
    handleUpdate(id, 'responsibilities', bullets);
  };

  const handleRemoveBullet = (id: string, index: number) => {
    const target = internships.find((i) => i.id === id);
    if (!target) return;
    const bullets = (target.responsibilities || []).filter((_, i) => i !== index);
    handleUpdate(id, 'responsibilities', bullets);
  };

  return (
    <div className="space-y-4">
      {internships.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
          <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-600 mb-2 font-medium">No internships or industrial training added</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Internship
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {internships.map((intern, index) => (
            <div key={intern.id} className="p-3.5 border border-slate-200 rounded-lg bg-white space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">
                  Internship #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(intern.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition"
                  title="Remove internship"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Company / Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={intern.company}
                    onChange={(e) => handleUpdate(intern.id, 'company', e.target.value)}
                    placeholder="e.g. Glitread Tech / Microsoft / Startup"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Internship Role <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={intern.role}
                    onChange={(e) => handleUpdate(intern.id, 'role', e.target.value)}
                    placeholder="e.g. Frontend Development Intern"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={intern.location}
                    onChange={(e) => handleUpdate(intern.id, 'location', e.target.value)}
                    placeholder="e.g. Remote / Bengaluru"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Duration (Start – End)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={intern.startDate}
                      onChange={(e) => handleUpdate(intern.id, 'startDate', e.target.value)}
                      placeholder="e.g. Jan 2024"
                      className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={intern.endDate}
                      onChange={(e) => handleUpdate(intern.id, 'endDate', e.target.value)}
                      placeholder="e.g. Apr 2024"
                      className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-slate-700">
                      Key Responsibilities & Deliverables
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddBullet(intern.id)}
                      className="text-[11px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Add Bullet
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {(intern.responsibilities || []).map((resp, bulletIdx) => (
                      <div key={bulletIdx} className="flex gap-2 items-center">
                        <span className="text-slate-400 text-xs">•</span>
                        <input
                          type="text"
                          value={resp}
                          onChange={(e) => handleUpdateBullet(intern.id, bulletIdx, e.target.value)}
                          placeholder="Implemented React UI components conforming to Figma design specifications..."
                          className="flex-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {(intern.responsibilities || []).length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveBullet(intern.id, bulletIdx)}
                            className="p-1 text-slate-300 hover:text-rose-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Certificate / Verification URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={intern.certificateUrl || ''}
                    onChange={(e) => handleUpdate(intern.id, 'certificateUrl', e.target.value)}
                    placeholder="https://glitread.com/verify/cert-id"
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
            <Plus className="w-3.5 h-3.5" /> Add Another Internship
          </button>
        </div>
      )}
    </div>
  );
};
