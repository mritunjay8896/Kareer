import React from 'react';
import { 
  Linkedin, 
  Github, 
  Globe, 
  Twitter, 
  Youtube, 
  Instagram, 
  Code, 
  BookOpen, 
  Link as LinkIcon 
} from 'lucide-react';
import { RegistrationLinks } from './types';

interface Step9LinksProps {
  links: RegistrationLinks;
  onChange: (fields: Partial<RegistrationLinks>) => void;
}

export const Step9Links: React.FC<Step9LinksProps> = ({
  links,
  onChange
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
          Professional Links & Socials
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Connect your GitHub, LinkedIn, coding profiles, and portfolio. Recruiters review these to verify code quality and problem solving.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Linkedin className="w-4 h-4 text-blue-600" />
            <span>LinkedIn Profile</span>
          </label>
          <input
            type="url"
            value={links.linkedin}
            onChange={(e) => onChange({ linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Github className="w-4 h-4 text-slate-900" />
            <span>GitHub Profile</span>
          </label>
          <input
            type="url"
            value={links.github}
            onChange={(e) => onChange({ github: e.target.value })}
            placeholder="https://github.com/username"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Personal Website */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Personal Website / Blog</span>
          </label>
          <input
            type="url"
            value={links.website}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="https://mywebsite.com"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* LeetCode */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-amber-600" />
            <span>LeetCode Profile</span>
          </label>
          <input
            type="url"
            value={links.leetcode}
            onChange={(e) => onChange({ leetcode: e.target.value })}
            placeholder="https://leetcode.com/username"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* X / Twitter */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Twitter className="w-4 h-4 text-sky-500" />
            <span>X / Twitter</span>
          </label>
          <input
            type="url"
            value={links.twitter}
            onChange={(e) => onChange({ twitter: e.target.value })}
            placeholder="https://x.com/username"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Stack Overflow */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <LinkIcon className="w-4 h-4 text-orange-500" />
            <span>Stack Overflow</span>
          </label>
          <input
            type="url"
            value={links.stackoverflow}
            onChange={(e) => onChange({ stackoverflow: e.target.value })}
            placeholder="https://stackoverflow.com/users/..."
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Behance */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <LinkIcon className="w-4 h-4 text-blue-700" />
            <span>Behance (Designers)</span>
          </label>
          <input
            type="url"
            value={links.behance}
            onChange={(e) => onChange({ behance: e.target.value })}
            placeholder="https://behance.net/username"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Dribbble */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <LinkIcon className="w-4 h-4 text-pink-500" />
            <span>Dribbble (Designers)</span>
          </label>
          <input
            type="url"
            value={links.dribbble}
            onChange={(e) => onChange({ dribbble: e.target.value })}
            placeholder="https://dribbble.com/username"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Kaggle */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-cyan-600" />
            <span>Kaggle (Data Science)</span>
          </label>
          <input
            type="url"
            value={links.kaggle}
            onChange={(e) => onChange({ kaggle: e.target.value })}
            placeholder="https://kaggle.com/username"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Medium */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-slate-800" />
            <span>Medium / Tech Blog</span>
          </label>
          <input
            type="url"
            value={links.medium}
            onChange={(e) => onChange({ medium: e.target.value })}
            placeholder="https://medium.com/@username"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* YouTube */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Youtube className="w-4 h-4 text-red-600" />
            <span>YouTube Channel</span>
          </label>
          <input
            type="url"
            value={links.youtube}
            onChange={(e) => onChange({ youtube: e.target.value })}
            placeholder="https://youtube.com/@username"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Instagram */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>Instagram (Creative / Work)</span>
          </label>
          <input
            type="url"
            value={links.instagram}
            onChange={(e) => onChange({ instagram: e.target.value })}
            placeholder="https://instagram.com/username"
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </div>
  );
};
