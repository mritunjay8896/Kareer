import React from 'react';
import { Check } from 'lucide-react';
import { ShieldLockIllustration } from './RegistrationGraphics';

const BENEFITS = [
  'Access all Glitread features',
  'Build your professional profile',
  'Create a portfolio website',
  'Get personalized job & internship recommendations',
  'Track your applications and progress'
];

export const SideValuePropCard: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#f8faff] border border-blue-100/70 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
      <div>
        {/* Shield Graphic */}
        <div className="mb-1.5">
          <ShieldLockIllustration />
        </div>

        {/* Heading */}
        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 text-center mb-3.5 tracking-tight font-display">
          Why create an account?
        </h4>

        {/* Checklist */}
        <div className="space-y-2.5">
          {BENEFITS.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-[12.5px] text-slate-700 font-medium leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Quote at Bottom */}
      <div className="mt-4 pt-3.5 border-t border-blue-100/60 text-center">
        <blockquote className="relative">
          <span className="text-xl text-blue-300 font-serif leading-none absolute -top-1.5 left-1">
            “
          </span>
          <p className="font-serif italic text-[10.5px] sm:text-[11px] font-semibold text-blue-950 px-2 leading-tight">
            “Your career journey begins with a single step.”
          </p>
        </blockquote>

        {/* Small decorative scribble */}
        <svg
          className="w-12 h-1.5 text-blue-400 mx-auto mt-1"
          viewBox="0 0 60 8"
          fill="none"
        >
          <path
            d="M3 5 Q30 1 57 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
