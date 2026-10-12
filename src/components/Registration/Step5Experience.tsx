import React from 'react';
import { Plus, Trash2, Briefcase, Building2, MapPin, Calendar, Wrench, Info } from 'lucide-react';
import { RegistrationExperience } from './types';

interface Step5ExperienceProps {
  experienceList: RegistrationExperience[];
  onChange: (list: RegistrationExperience[]) => void;
  candidateType: string;
}

export const Step5Experience: React.FC<Step5ExperienceProps> = ({
  experienceList,
  onChange,
  candidateType
}) => {
  const isStudentOrFresher = candidateType === 'student' || candidateType === 'fresher';

  const addExperience = () => {
    const newExp: RegistrationExperience = {
      id: `exp-${Date.now()}`,
      company: '',
      jobTitle: '',
      employmentType: isStudentOrFresher ? 'Internship' : 'Full-time',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      location: '',
      workMode: 'Hybrid',
      description: '',
      responsibilities: '',
      achievements: '',
      technologies: []
    };
    onChange([...experienceList, newExp]);
  };

  const updateItem = (id: string, fields: Partial<RegistrationExperience>) => {
    onChange(
      experienceList.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(experienceList.filter((item) => item.id !== id));
  };

  const handleTechChange = (id: string, text: string) => {
    const tags = text.split(',').map(t => t.trim()).filter(Boolean);
    updateItem(id, { technologies: tags });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            Work Experience & Internships
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isStudentOrFresher 
              ? 'Optional: Add any internships, trainee roles, or freelance work you have done.'
              : 'Add your current and previous professional employment history.'}
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {isStudentOrFresher && (
        <div className="p-3.5 bg-blue-50/60 border border-blue-200/70 rounded-xl flex items-start gap-2.5 text-xs text-blue-900">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Experience is optional for {candidateType === 'student' ? 'Students' : 'Freshers'}:</span> You can add internships, college society roles, or skip directly to the next step.
          </div>
        </div>
      )}

      {experienceList.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-3 bg-slate-50/50">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center mx-auto shadow-2xs">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-800">
              {isStudentOrFresher ? 'No Prior Work Experience? No Problem!' : 'No Experience Records Added Yet'}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-0.5">
              {isStudentOrFresher
                ? 'You can add summer internships, freelance gigs, or leave empty and click Next.'
                : 'Add your company roles, achievements, and technical stack used.'}
            </p>
          </div>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Experience / Internship</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experienceList.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs relative space-y-4 transition-all"
            >
              {/* Header: Title + Delete button */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    {item.jobTitle || item.company ? `${item.jobTitle || 'Role'} ${item.company ? `at ${item.company}` : ''}` : `Experience Entry #${index + 1}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove this experience record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Grid 1: Company & Job Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Company / Organization Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={item.company}
                      onChange={(e) => updateItem(item.id, { company: e.target.value })}
                      placeholder="e.g. Infosys / Google / Startup Inc"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Job Title / Role <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={item.jobTitle}
                      onChange={(e) => updateItem(item.id, { jobTitle: e.target.value })}
                      placeholder="e.g. Frontend Developer / Software Intern"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Grid 2: Employment Type, Work Mode, Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Employment Type
                  </label>
                  <select
                    value={item.employmentType}
                    onChange={(e) => updateItem(item.id, { employmentType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Work Mode
                  </label>
                  <select
                    value={item.workMode}
                    onChange={(e) => updateItem(item.id, { workMode: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={item.location}
                      onChange={(e) => updateItem(item.id, { location: e.target.value })}
                      placeholder="e.g. Bangalore, India"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Dates & Currently Working Checkbox */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={item.startDate}
                    onChange={(e) => updateItem(item.id, { startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    disabled={item.currentlyWorking}
                    value={item.currentlyWorking ? '' : item.endDate}
                    onChange={(e) => updateItem(item.id, { endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>

                <div className="pb-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={item.currentlyWorking}
                      onChange={(e) => updateItem(item.id, { 
                        currentlyWorking: e.target.checked,
                        endDate: e.target.checked ? 'Present' : ''
                      })}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span className="text-xs font-bold text-slate-700">Currently Working Here</span>
                  </label>
                </div>
              </div>

              {/* Technologies Used */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Technologies / Tools Used <span className="text-slate-400 font-normal">(comma-separated)</span>
                </label>
                <div className="relative">
                  <Wrench className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={item.technologies.join(', ')}
                    onChange={(e) => handleTechChange(item.id, e.target.value)}
                    placeholder="e.g. React, TypeScript, Node.js, AWS, PostgreSQL"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Description & Responsibilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Job Description & Responsibilities
                  </label>
                  <textarea
                    rows={3}
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    placeholder="Describe your day-to-day duties and deliverables..."
                    className="w-full p-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Key Achievements / Impact
                  </label>
                  <textarea
                    rows={3}
                    value={item.achievements}
                    onChange={(e) => updateItem(item.id, { achievements: e.target.value })}
                    placeholder="e.g. Reduced API latency by 35%, automated regression testing..."
                    className="w-full p-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 resize-none"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 text-blue-600 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Experience Record</span>
          </button>
        </div>
      )}
    </div>
  );
};
