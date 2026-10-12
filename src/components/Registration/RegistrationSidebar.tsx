import React from 'react';
import { User, FileText, Layout, Compass } from 'lucide-react';
import { CandidateIllustration } from './RegistrationGraphics';

interface RegistrationSidebarProps {
  currentStep: number;
  totalSteps?: number;
}

const FEATURE_POINTS = [
  {
    icon: User,
    title: 'Build Professional Profile',
    desc: 'Showcase your skills, experience and projects'
  },
  {
    icon: FileText,
    title: 'Create Resume',
    desc: 'Generate ATS-friendly resume instantly'
  },
  {
    icon: Layout,
    title: 'Build Portfolio',
    desc: 'Get a shareable portfolio website'
  },
  {
    icon: Compass,
    title: 'Find Opportunities',
    desc: 'Discover jobs, internships and more'
  }
];

const STEP_TITLES: Record<number, string> = {
  0: 'Create Your Account',
  1: 'Choose Your Profile',
  2: 'Personal Details',
  3: 'Add Your Education',
  4: 'Share Your Experience',
  5: 'Add Your Skills',
  6: 'Showcase Projects',
  7: 'Credentials & Awards',
  8: 'Professional Links',
  9: 'Career Preferences',
  10: 'Portfolio Website',
  11: 'Review Profile'
};

export const RegistrationSidebar: React.FC<RegistrationSidebarProps> = ({
  currentStep,
  totalSteps = 11
}) => {
  const stepTitle = STEP_TITLES[currentStep] || 'Create Your Account';

  return (
    <div className="w-full space-y-3.5 sm:space-y-4 pr-0 lg:pr-2">
      {/* Step Pill */}
      <div>
        <span className="inline-flex items-center text-[10.5px] sm:text-[11px] font-bold text-blue-600 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
          Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}
        </span>
      </div>

      {/* Title & Description */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
          {stepTitle}
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed max-w-[280px]">
          Join Glitread and get started on your journey to build your professional profile, create a portfolio, find opportunities and more.
        </p>
      </div>

      {/* Inline Layout: Text Pointers & Illustration Side-by-Side (Comfortably spaced) */}
      <div className="relative flex flex-row items-center justify-start gap-5 sm:gap-6 lg:gap-7 pt-1">
        {/* 4 Feature Points with soft circular icons (Natural width) */}
        <div className="relative z-10 space-y-2.5 sm:space-y-3 max-w-[220px] sm:max-w-[240px] shrink-0">
          {FEATURE_POINTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative z-10 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Icon className="w-3 h-3 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[11px] sm:text-xs font-bold text-slate-800 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[9.5px] sm:text-[10px] text-slate-400 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Illustration Inline alongside pointers (Comfortable distance) */}
        <div className="relative z-0 shrink-0 w-36 sm:w-40 flex flex-col items-center justify-center">
          <CandidateIllustration />
        </div>
      </div>
    </div>
  );
};
