import React from 'react';
import { Plus, Trash2, GraduationCap, Building2, BookOpen, Calendar, Award } from 'lucide-react';
import { RegistrationEducation } from './types';

interface Step4EducationProps {
  educationList: RegistrationEducation[];
  onChange: (list: RegistrationEducation[]) => void;
  candidateType: string;
}

export const Step4Education: React.FC<Step4EducationProps> = ({
  educationList,
  onChange,
  candidateType
}) => {
  const addEducation = () => {
    const newEdu: RegistrationEducation = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      currentlyStudying: false,
      grade: '',
      relevantCoursework: '',
      description: '',
      academicAchievements: ''
    };
    onChange([...educationList, newEdu]);
  };

  const updateItem = (id: string, fields: Partial<RegistrationEducation>) => {
    onChange(
      educationList.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(educationList.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            Education History
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {candidateType === 'student' || candidateType === 'fresher' 
              ? 'Required for students and freshers to match entry-level jobs and internships.' 
              : 'Add your highest degrees, certifications, or diplomas.'}
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {educationList.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-3 bg-slate-50/50">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center mx-auto shadow-2xs">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-800">No Education Records Added Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-0.5">
              Click below to add your college, university, degree, and academic achievements.
            </p>
          </div>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Education Record</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {educationList.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs relative space-y-4 transition-all"
            >
              {/* Header: Title + Delete button */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    {item.degree || item.institution ? `${item.degree || 'Degree'} ${item.institution ? `at ${item.institution}` : ''}` : `Education Entry #${index + 1}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove this education record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Grid 1: Degree & Institution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Degree / Qualification <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={item.degree}
                      onChange={(e) => updateItem(item.id, { degree: e.target.value })}
                      placeholder="e.g. B.Tech Computer Science / B.E. / MBA"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    College / University <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={item.institution}
                      onChange={(e) => updateItem(item.id, { institution: e.target.value })}
                      placeholder="e.g. Indian Institute of Technology / VTU"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Grid 2: Specialization & CGPA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Field of Study / Specialization
                  </label>
                  <div className="relative">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={item.fieldOfStudy}
                      onChange={(e) => updateItem(item.id, { fieldOfStudy: e.target.value })}
                      placeholder="e.g. Computer Science, AI & ML, Electronics"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    CGPA / Percentage
                  </label>
                  <input
                    type="text"
                    value={item.grade}
                    onChange={(e) => updateItem(item.id, { grade: e.target.value })}
                    placeholder="e.g. 8.4 CGPA or 85%"
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Grid 3: Years + Currently Studying checkbox */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={item.startYear}
                    onChange={(e) => updateItem(item.id, { startYear: e.target.value })}
                    placeholder="e.g. 2022"
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    End Year (or Expected)
                  </label>
                  <input
                    type="text"
                    disabled={item.currentlyStudying}
                    value={item.currentlyStudying ? 'Present' : item.endYear}
                    onChange={(e) => updateItem(item.id, { endYear: e.target.value })}
                    placeholder="e.g. 2026"
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>

                <div className="pb-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={item.currentlyStudying}
                      onChange={(e) => updateItem(item.id, { 
                        currentlyStudying: e.target.checked,
                        endYear: e.target.checked ? 'Present' : ''
                      })}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span className="text-xs font-bold text-slate-700">Currently Studying Here</span>
                  </label>
                </div>
              </div>

              {/* Coursework & Achievements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Relevant Coursework
                  </label>
                  <input
                    type="text"
                    value={item.relevantCoursework}
                    onChange={(e) => updateItem(item.id, { relevantCoursework: e.target.value })}
                    placeholder="e.g. Data Structures, Cloud Computing, DBMS"
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Academic Achievements / Honors
                  </label>
                  <input
                    type="text"
                    value={item.academicAchievements}
                    onChange={(e) => updateItem(item.id, { academicAchievements: e.target.value })}
                    placeholder="e.g. Department Rank 1, Dean's List"
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addEducation}
            className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 text-blue-600 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Education Qualification</span>
          </button>
        </div>
      )}
    </div>
  );
};
