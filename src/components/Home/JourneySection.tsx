import React from 'react';
import { 
  User, 
  FileText, 
  Lightbulb, 
  Search, 
  Rocket 
} from 'lucide-react';

export const stepsData = [
  {
    step: '01',
    title: 'Create Portfolio',
    desc: 'Launch custom /p/:handle website.',
    icon: User,
    color: 'bg-blue-50 text-blue-600 border-blue-200'
  },
  {
    step: '02',
    title: 'Build ATS Resume',
    desc: 'Real-time scoring & PDF export.',
    icon: FileText,
    color: 'bg-rose-50 text-rose-500 border-rose-200'
  },
  {
    step: '03',
    title: 'Add Chrome Ext',
    desc: 'Install 1-click form autofill tool.',
    icon: Lightbulb,
    color: 'bg-amber-50 text-amber-500 border-amber-200'
  },
  {
    step: '04',
    title: 'Autofill In 1 Sec',
    desc: 'Instant fill across Greenhouse & Workday.',
    icon: Rocket,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
  },
  {
    step: '05',
    title: 'Employer Discovery',
    desc: 'Hiring teams search candidate profiles.',
    icon: Search,
    color: 'bg-purple-50 text-purple-600 border-purple-200'
  },
  {
    step: '06',
    title: 'Direct Hire',
    desc: 'Receive direct interviews & offers.',
    icon: Rocket,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
  },
];

export const JourneySteps: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative max-w-[1180px] mx-auto ${className}`}>
      {/* Horizontal Connecting Dashed Line behind icons on desktop */}
      <div className="hidden lg:block absolute top-5 left-[6%] right-[6%] h-0.5 border-t-2 border-dashed border-slate-200 -z-0" />

      {/* Steps Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 relative z-10">
        {stepsData.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.step} className="flex flex-col items-center text-center group">
              {/* Step Circle with Icon */}
              <div className="relative mb-2.5">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-2xs transition-transform duration-200 group-hover:scale-105 ${item.color} bg-white`}>
                  <Icon className="w-4.5 h-4.5 stroke-[2]" />
                </div>
              </div>

              <h3 className="font-bold text-xs sm:text-[13px] text-slate-900 mb-1 leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-500 leading-tight max-w-[150px]">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const JourneySection: React.FC = () => {
  return (
    <section className="w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
      <div className="max-w-[1340px] mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center tracking-tight mb-12 font-display">
          Your Journey Starts Here
        </h2>

        <JourneySteps />
      </div>
    </section>
  );
};

