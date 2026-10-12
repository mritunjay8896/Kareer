import React from 'react';
import { GraduationCap, Sparkles, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { CandidateType, FullRegistrationData } from './types';

interface Step2ProfileTypeProps {
  candidateType: CandidateType;
  onSelect: (type: CandidateType) => void;
}

interface ProfileOption {
  type: CandidateType;
  title: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  borderColor: string;
}

const PROFILE_OPTIONS: ProfileOption[] = [
  {
    type: 'student',
    title: 'Student',
    badge: 'College / University',
    description: 'Currently studying in a degree or diploma program. Looking for internships, part-time opportunities, or campus drives.',
    icon: GraduationCap,
    accentColor: 'bg-blue-50 text-blue-600',
    borderColor: 'border-blue-200'
  },
  {
    type: 'fresher',
    title: 'Fresher',
    badge: '0 - 1 Years Experience',
    description: 'Recent graduate or stepping into the job market. Ready for entry-level roles, trainee positions, and graduate programs.',
    icon: Sparkles,
    accentColor: 'bg-emerald-50 text-emerald-600',
    borderColor: 'border-emerald-200'
  },
  {
    type: 'working_professional',
    title: 'Working Professional',
    badge: '1 - 4 Years Experience',
    description: 'Currently employed or with industry experience. Seeking career growth, better salary packages, or new technology stacks.',
    icon: Briefcase,
    accentColor: 'bg-purple-50 text-purple-600',
    borderColor: 'border-purple-200'
  },
  {
    type: 'experienced_professional',
    title: 'Experienced Professional',
    badge: '4+ Years Experience',
    description: 'Mid to senior-level industry expert, lead, or manager. Looking for strategic roles, leadership, or specialized technical positions.',
    icon: Award,
    accentColor: 'bg-amber-50 text-amber-600',
    borderColor: 'border-amber-200'
  }
];

export const Step2ProfileType: React.FC<Step2ProfileTypeProps> = ({
  candidateType,
  onSelect
}) => {
  return (
    <div className="space-y-3.5">
      <div>
        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-display">
          What best describes you?
        </h3>
        <p className="text-[10px] text-slate-500 mt-0.5">
          This tailors your registration experience, resume format, and matching opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {PROFILE_OPTIONS.map((option) => {
          const isSelected = candidateType === option.type;
          const Icon = option.icon;

          return (
            <button
              key={option.type}
              type="button"
              onClick={() => onSelect(option.type)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 relative group cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${option.borderColor} ${option.accentColor}`}>
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[8.5px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {option.badge}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-50 shrink-0" />
                    )}
                  </div>
                </div>

                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-0.5 font-display">
                  {option.title}
                </h4>
                <p className="text-[10px] text-slate-600 leading-snug">
                  {option.description}
                </p>
              </div>

              <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] font-bold">
                <span className={isSelected ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-600'}>
                  {isSelected ? '✓ Selected Profile' : 'Select Option'}
                </span>
                <span className="text-slate-400">
                  {option.type === 'student' || option.type === 'fresher' ? 'Exp. Optional' : 'Exp. Recommended'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
