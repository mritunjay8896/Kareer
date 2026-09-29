import React from 'react';
import { ResumePersonalInfo } from '../../../types/resume';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, Briefcase, Camera } from 'lucide-react';

interface Props {
  info: ResumePersonalInfo;
  onChange: (updated: ResumePersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<Props> = ({ info, onChange }) => {
  const handleChange = (field: keyof ResumePersonalInfo, value: any) => {
    onChange({ ...info, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={info.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Priya Sharma"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Target Job Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={info.targetTitle}
              onChange={(e) => handleChange('targetTitle', e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={info.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. priya.sharma@example.com"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="tel"
              value={info.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Location (City, State / Country) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={info.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g. Bengaluru, Karnataka, India"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
          Online Presence & Profiles
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-600 mb-1">LinkedIn Profile</label>
            <div className="relative">
              <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="url"
                value={info.linkedIn || ''}
                onChange={(e) => handleChange('linkedIn', e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">GitHub Profile</label>
            <div className="relative">
              <Github className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="url"
                value={info.github || ''}
                onChange={(e) => handleChange('github', e.target.value)}
                placeholder="https://github.com/username"
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">Portfolio Link</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="url"
                value={info.portfolio || ''}
                onChange={(e) => handleChange('portfolio', e.target.value)}
                placeholder="https://myportfolio.com"
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">Personal Website / Blog</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="url"
                value={info.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://myblog.dev"
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="flex items-center gap-2.5">
          <Camera className="w-4 h-4 text-slate-600" />
          <div>
            <div className="text-xs font-semibold text-slate-800">Profile Photo on Resume</div>
            <div className="text-[11px] text-slate-500">ATS standard recommendation is no-photo to avoid algorithmic parsing bias.</div>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={info.showPhoto ?? false}
            onChange={(e) => handleChange('showPhoto', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};
