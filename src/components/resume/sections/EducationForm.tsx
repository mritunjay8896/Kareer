import React from 'react';
import { ResumeEducation } from '../../../types/resume';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface Props {
  education: ResumeEducation[];
  onChange: (updated: ResumeEducation[]) => void;
}

export const EducationForm: React.FC<Props> = ({ education, onChange }) => {
  const handleAdd = () => {
    const newEntry: ResumeEducation = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      field: '',
      startYear: '',
      endYear: '',
      grade: '',
      location: '',
    };
    onChange([...education, newEntry]);
  };

  const handleUpdate = (id: string, field: keyof ResumeEducation, value: string) => {
    onChange(
      education.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(education.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      {education.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
          <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-600 mb-2 font-medium">No education entries added yet</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={edu.id} className="p-3.5 border border-slate-200 rounded-lg bg-white relative space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">
                  Education #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(edu.id)}
                  className="text-slate-400 hover:text-rose-600 transition p-1"
                  title="Remove education"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Degree / Qualification <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                    placeholder="e.g. B.Tech / B.E."
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Institution / University <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                    placeholder="e.g. VTU Technological University"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Field / Specialization / Branch
                  </label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => handleUpdate(edu.id, 'field', e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    CGPA / Percentage
                  </label>
                  <input
                    type="text"
                    value={edu.grade || ''}
                    onChange={(e) => handleUpdate(edu.id, 'grade', e.target.value)}
                    placeholder="e.g. 8.8 CGPA or 85%"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={edu.startYear}
                    onChange={(e) => handleUpdate(edu.id, 'startYear', e.target.value)}
                    placeholder="e.g. 2022"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    End Year (or Expected)
                  </label>
                  <input
                    type="text"
                    value={edu.endYear}
                    onChange={(e) => handleUpdate(edu.id, 'endYear', e.target.value)}
                    placeholder="e.g. 2026"
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
            <Plus className="w-3.5 h-3.5" /> Add Another Education
          </button>
        </div>
      )}
    </div>
  );
};
