import React, { useState } from 'react';
import { 
  Compass, 
  Briefcase, 
  MapPin, 
  Building2, 
  IndianRupee, 
  Clock, 
  Plus, 
  X, 
  Check, 
  XCircle 
} from 'lucide-react';
import { RegistrationCareerPreferences } from './types';
import { COMMON_ROLES, COMMON_LOCATIONS, COMMON_INDUSTRIES } from './constants';

interface Step10PreferencesProps {
  preferences: RegistrationCareerPreferences;
  onChange: (fields: Partial<RegistrationCareerPreferences>) => void;
  candidateType: string;
  errors: Record<string, string>;
}

const LOOKING_FOR_OPTIONS = [
  'Full-time Job',
  'Internship',
  'Part-time',
  'Contract',
  'Freelance',
  'Apprenticeship'
];

const WORK_MODE_OPTIONS = [
  'Remote',
  'Hybrid',
  'On-site',
  'Any'
];

const AVAILABILITY_OPTIONS = [
  'Immediately',
  'Within 15 days',
  'Within 30 days',
  'Within 60 days',
  'Not immediately'
];

const SALARY_RANGES = [
  '₹3 - ₹6 LPA',
  '₹6 - ₹10 LPA',
  '₹10 - ₹15 LPA',
  '₹15 - ₹25 LPA',
  '₹25 - ₹40 LPA',
  '₹40+ LPA'
];

const STIPEND_RANGES = [
  '₹5,000 - ₹10,000/month',
  '₹10,000 - ₹20,000/month',
  '₹20,000 - ₹35,000/month',
  '₹35,000 - ₹50,000/month',
  '₹50,000+/month'
];

export const Step10Preferences: React.FC<Step10PreferencesProps> = ({
  preferences,
  onChange,
  candidateType,
  errors
}) => {
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [customLocationInput, setCustomLocationInput] = useState('');

  // Toggle multi-select array helper
  const toggleArrayItem = (key: keyof RegistrationCareerPreferences, value: string) => {
    const current = (preferences[key] as string[]) || [];
    const exists = current.includes(value);
    const updated = exists ? current.filter((v) => v !== value) : [...current, value];
    onChange({ [key]: updated });
  };

  const handleAddCustomRole = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customRoleInput.trim();
    if (trimmed && !preferences.desiredRoles.includes(trimmed)) {
      onChange({ desiredRoles: [...preferences.desiredRoles, trimmed] });
      setCustomRoleInput('');
    }
  };

  const handleAddCustomLocation = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customLocationInput.trim();
    if (trimmed && !preferences.locations.includes(trimmed)) {
      onChange({ locations: [...preferences.locations, trimmed] });
      setCustomLocationInput('');
    }
  };

  const isInternshipIncluded = preferences.lookingFor.includes('Internship');
  const isJobIncluded = preferences.lookingFor.some(t => t !== 'Internship');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
          What are you looking for?
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Tell us what opportunities you are interested in so we can personalize your experience.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. LOOKING FOR */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Opportunity Type <span className="text-rose-500">*</span> <span className="text-slate-400 font-normal">(select all that apply)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {LOOKING_FOR_OPTIONS.map((opt) => {
              const selected = preferences.lookingFor.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleArrayItem('lookingFor', opt)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    selected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          {errors.lookingFor && (
            <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.lookingFor}</span>
            </p>
          )}
        </div>

        {/* 2. DESIRED JOB ROLES */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-800">
              Desired Job Roles <span className="text-rose-500">*</span>
            </label>
            <span className="text-[10px] text-slate-400">Click to select or type custom role below</span>
          </div>

          {/* Selected roles chips */}
          {preferences.desiredRoles.length > 0 && (
            <div className="flex flex-wrap gap-1.5 p-2.5 bg-blue-50/50 border border-blue-200/80 rounded-xl mb-2.5">
              {preferences.desiredRoles.map((role) => (
                <span
                  key={role}
                  className="bg-white border border-blue-200 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs"
                >
                  <span>{role}</span>
                  <button
                    type="button"
                    onClick={() => toggleArrayItem('desiredRoles', role)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Common roles preset buttons */}
          <div className="flex flex-wrap gap-1.5 mb-2.5 max-h-36 overflow-y-auto pr-1 no-scrollbar">
            {COMMON_ROLES.map((role) => {
              const selected = preferences.desiredRoles.includes(role);
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleArrayItem('desiredRoles', role)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    selected
                      ? 'bg-blue-600 text-white border-blue-600 font-bold'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {role}
                </button>
              );
            })}
          </div>

          {/* Custom role input */}
          <form onSubmit={handleAddCustomRole} className="flex gap-2">
            <input
              type="text"
              value={customRoleInput}
              onChange={(e) => setCustomRoleInput(e.target.value)}
              placeholder="Add another role (e.g. Android Developer, Growth Hacker)..."
              className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-blue-600"
            />
            <button
              type="submit"
              disabled={!customRoleInput.trim()}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              Add
            </button>
          </form>

          {errors.desiredRoles && (
            <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.desiredRoles}</span>
            </p>
          )}
        </div>

        {/* 3. PREFERRED WORK MODE */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Preferred Work Mode
          </label>
          <div className="flex flex-wrap gap-2">
            {WORK_MODE_OPTIONS.map((mode) => {
              const selected = preferences.workMode.includes(mode);
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => toggleArrayItem('workMode', mode)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selected
                      ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. PREFERRED LOCATIONS */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-800">
              Preferred Locations <span className="text-slate-400 font-normal">(select all that apply)</span>
            </label>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {COMMON_LOCATIONS.map((loc) => {
              const selected = preferences.locations.includes(loc);
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => toggleArrayItem('locations', loc)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    selected
                      ? 'bg-blue-600 text-white border-blue-600 font-bold'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleAddCustomLocation} className="flex gap-2">
            <input
              type="text"
              value={customLocationInput}
              onChange={(e) => setCustomLocationInput(e.target.value)}
              placeholder="Add another city (e.g. Chandigarh, Jaipur)..."
              className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-blue-600"
            />
            <button
              type="submit"
              disabled={!customLocationInput.trim()}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              Add
            </button>
          </form>
        </div>

        {/* 5. PREFERRED INDUSTRIES */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Preferred Industries
          </label>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_INDUSTRIES.map((ind) => {
              const selected = preferences.industries.includes(ind);
              return (
                <button
                  key={ind}
                  type="button"
                  onClick={() => toggleArrayItem('industries', ind)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    selected
                      ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {ind}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. EXPECTED COMPENSATION & AVAILABILITY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          {/* Expected Salary (if looking for job) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
              <span>Expected Annual Salary (LPA)</span>
            </label>
            <select
              value={preferences.expectedSalary}
              onChange={(e) => onChange({ expectedSalary: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
            >
              {SALARY_RANGES.map((rng) => (
                <option key={rng} value={rng}>
                  {rng}
                </option>
              ))}
            </select>
          </div>

          {/* Expected Stipend (if looking for internship) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
              <span>Expected Monthly Stipend (Internship)</span>
            </label>
            <select
              value={preferences.expectedStipend}
              onChange={(e) => onChange({ expectedStipend: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
            >
              {STIPEND_RANGES.map((rng) => (
                <option key={rng} value={rng}>
                  {rng}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>When can you join / start?</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {AVAILABILITY_OPTIONS.map((avail) => {
                const selected = preferences.availability === avail;
                return (
                  <button
                    key={avail}
                    type="button"
                    onClick={() => onChange({ availability: avail })}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      selected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {avail}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
