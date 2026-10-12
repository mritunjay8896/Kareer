import React from 'react';
import { User, Phone, MapPin, Calendar, FileText, Image, Sparkles, XCircle } from 'lucide-react';
import { FullRegistrationData } from './types';

interface Step3PersonalDetailsProps {
  data: FullRegistrationData;
  onChange: (fields: Partial<FullRegistrationData['personal']>) => void;
  errors: Record<string, string>;
}

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
];

export const Step3PersonalDetails: React.FC<Step3PersonalDetailsProps> = ({
  data,
  onChange,
  errors
}) => {
  const personal = data.personal;

  return (
    <div className="space-y-3.5">
      <div>
        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-display">
          Personal Information
        </h3>
        <p className="text-[10px] text-slate-500 mt-0.5">
          This forms the headline and contact section of your resume and shareable portfolio.
        </p>
      </div>

      <div className="space-y-2.5">
        {/* Photo URL & Quick Avatar Picker */}
        <div className="p-2.5 bg-slate-50/70 border border-slate-200/80 rounded-xl flex flex-col sm:flex-row items-center gap-2.5">
          <div className="relative w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-2xs overflow-hidden shrink-0 flex items-center justify-center">
            {personal.photoUrl ? (
              <img
                src={personal.photoUrl}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_AVATARS[0];
                }}
              />
            ) : (
              <User className="w-6 h-6 text-slate-400" />
            )}
          </div>

          <div className="flex-1 w-full space-y-1.5">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                Profile Photo (Image URL or Choose Avatar)
              </label>
              <div className="relative">
                <Image className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={personal.photoUrl}
                  onChange={(e) => onChange({ photoUrl: e.target.value })}
                  placeholder="https://... (or click preset avatar below)"
                  className="w-full pl-8 pr-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-900 outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Quick avatar presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Presets:</span>
              <div className="flex items-center gap-1">
                {DEFAULT_AVATARS.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onChange({ photoUrl: url })}
                    className={`w-5.5 h-5.5 rounded-md overflow-hidden border transition-all cursor-pointer ${
                      personal.photoUrl === url ? 'ring-2 ring-blue-600 border-white scale-105' : 'border-slate-200 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full Name & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={personal.fullName}
                onChange={(e) => onChange({ fullName: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className={`w-full pl-8 pr-3 py-1.5 bg-slate-50/70 border rounded-lg text-xs font-medium text-slate-900 outline-none transition-all focus:bg-white ${
                  errors.fullName 
                    ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-100' 
                    : 'border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-100'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-[9.5px] text-rose-500 font-semibold mt-0.5 flex items-center gap-1">
                <XCircle className="w-3 h-3 shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-1">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={personal.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                placeholder="e.g. +91 98765 43210"
                className={`w-full pl-8 pr-3 py-1.5 bg-slate-50/70 border rounded-lg text-xs font-medium text-slate-900 outline-none transition-all focus:bg-white ${
                  errors.phone 
                    ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-100' 
                    : 'border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-100'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-[9.5px] text-rose-500 font-semibold mt-0.5 flex items-center gap-1">
                <XCircle className="w-3 h-3 shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Professional Headline */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[10px] font-bold text-slate-700">
              Professional Headline <span className="text-slate-400 font-normal">(appears below name)</span>
            </label>
            <span className="text-[9px] text-slate-400">e.g. Role | Tech Stack</span>
          </div>
          <div className="relative">
            <Sparkles className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personal.headline}
              onChange={(e) => onChange({ headline: e.target.value })}
              placeholder="e.g. Computer Science Graduate | Software Developer"
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50/70 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* DOB & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={personal.dob}
                onChange={(e) => onChange({ dob: e.target.value })}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50/70 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-1">
              Gender <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <select
              value={personal.gender}
              onChange={(e) => onChange({ gender: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-slate-50/70 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* City, State, Country */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-1">
              City <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={personal.city}
                onChange={(e) => onChange({ city: e.target.value })}
                placeholder="e.g. Bangalore"
                className={`w-full pl-8 pr-3 py-1.5 bg-slate-50/70 border rounded-lg text-xs font-medium text-slate-900 outline-none transition-all focus:bg-white ${
                  errors.city 
                    ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-100' 
                    : 'border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-100'
                }`}
              />
            </div>
            {errors.city && (
              <p className="text-[9.5px] text-rose-500 font-semibold mt-0.5 flex items-center gap-1">
                <XCircle className="w-3 h-3 shrink-0" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-1">
              State
            </label>
            <input
              type="text"
              value={personal.state}
              onChange={(e) => onChange({ state: e.target.value })}
              placeholder="e.g. Karnataka"
              className="w-full px-2.5 py-1.5 bg-slate-50/70 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-1">
              Country
            </label>
            <input
              type="text"
              value={personal.country}
              onChange={(e) => onChange({ country: e.target.value })}
              placeholder="India"
              className="w-full px-2.5 py-1.5 bg-slate-50/70 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* About Me / Professional Summary */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[10px] font-bold text-slate-700">
              About Me / Summary
            </label>
            <span className="text-[9px] text-slate-400">Used in resume & portfolio bio</span>
          </div>
          <textarea
            rows={2.5 as any}
            value={personal.about}
            onChange={(e) => onChange({ about: e.target.value })}
            placeholder="Tell recruiters about yourself, your background, interests and professional goals."
            className="w-full p-2.5 bg-slate-50/70 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-100 leading-relaxed resize-none"
          />
        </div>
      </div>
    </div>
  );
};
