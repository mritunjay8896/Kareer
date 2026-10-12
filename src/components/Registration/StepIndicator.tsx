import React from 'react';
import { Check } from 'lucide-react';

export interface StepMeta {
  title: string;
  shortLabel: string;
}

export const REGISTRATION_STEPS: StepMeta[] = [
  { title: 'Create Your Account', shortLabel: 'Account' },
  { title: 'Select Profile Type', shortLabel: 'Profile Type' },
  { title: 'Personal Information', shortLabel: 'Personal' },
  { title: 'Education History', shortLabel: 'Education' },
  { title: 'Work Experience', shortLabel: 'Experience' },
  { title: 'Skills & Proficiencies', shortLabel: 'Skills' },
  { title: 'Projects Portfolio', shortLabel: 'Projects' },
  { title: 'Credentials & Awards', shortLabel: 'Credentials' },
  { title: 'Professional Links', shortLabel: 'Links' },
  { title: 'Career Preferences', shortLabel: 'Preferences' },
  { title: 'Portfolio Website Setup', shortLabel: 'Portfolio' },
];

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onSelectStep?: (index: number) => void;
  maxVisitedStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps = 11,
  onSelectStep,
  maxVisitedStep
}) => {
  const stepsToShow = REGISTRATION_STEPS.slice(0, 11);

  return (
    <div className="w-full pb-3 pt-0 select-none overflow-x-auto no-scrollbar">
      <div className="min-w-[520px] flex items-center justify-between relative px-0.5">
        {stepsToShow.map((step, idx) => {
          const isCurrent = idx === currentStep;
          const isCompleted = idx < currentStep;
          const canClick = idx <= maxVisitedStep && onSelectStep;
          const isLast = idx === stepsToShow.length - 1;

          return (
            <React.Fragment key={step.shortLabel}>
              {/* Step Circle & Label */}
              <button
                type="button"
                disabled={!canClick}
                onClick={() => canClick && onSelectStep(idx)}
                className={`flex flex-col items-center group relative z-10 focus:outline-none transition-all ${
                  canClick ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                {/* Circle */}
                <div
                  className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-[10.5px] transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-100 shadow-xs'
                      : isCompleted
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-white border border-slate-200 text-slate-400 font-semibold'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3 stroke-[3]" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[9.5px] sm:text-[10px] whitespace-nowrap mt-1 transition-colors ${
                    isCurrent
                      ? 'text-blue-600 font-bold'
                      : isCompleted
                      ? 'text-slate-700 font-semibold'
                      : 'text-slate-400 font-medium'
                  }`}
                >
                  {step.shortLabel}
                </span>
              </button>

              {/* Connecting Line between circles */}
              {!isLast && (
                <div
                  className={`flex-1 h-[1px] mx-1 mb-3 transition-colors ${
                    idx < currentStep ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
