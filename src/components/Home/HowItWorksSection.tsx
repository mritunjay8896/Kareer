import React from 'react';
import { 
  User, 
  FileText, 
  Briefcase, 
  Search, 
  ArrowRight 
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Create Your Profile',
      desc: 'Add your skills, experience, education and more.',
      icon: User,
      iconBg: 'bg-[#E8F1FD]',
      iconColor: 'text-[#1565ED]'
    },
    {
      num: '02',
      title: 'Build Your Resume',
      desc: 'Create an ATS-friendly resume in minutes.',
      icon: FileText,
      iconBg: 'bg-[#EAF9F1]',
      iconColor: 'text-[#10B981]'
    },
    {
      num: '03',
      title: 'Showcase Your Work',
      desc: 'Build a beautiful portfolio with your projects.',
      icon: Briefcase,
      iconBg: 'bg-[#F3EEFF]',
      iconColor: 'text-[#8B5CF6]'
    },
    {
      num: '04',
      title: 'Get Discovered',
      desc: 'Let employers find you based on your profile.',
      icon: Search,
      iconBg: 'bg-[#FFF7ED]',
      iconColor: 'text-[#F59E0B]'
    }
  ];

  return (
    <section className="w-full bg-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            How Glitread Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            Simple steps to build your professional identity and get noticed by the right employers.
          </p>
        </div>

        {/* 4 Steps Row with Connecting Arrows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-start relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.num} className="flex items-start gap-3.5 relative group">
                {/* Step Circle with Icon */}
                <div className={`w-12 h-12 rounded-full ${step.iconBg} ${step.iconColor} flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>

                {/* Step Content */}
                <div className="flex-1 pr-6">
                  <span className="text-xs font-extrabold text-blue-600 block mb-0.5">
                    {step.num}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Horizontal Arrow between steps (desktop only) */}
                {!isLast && (
                  <div className="hidden lg:flex items-center text-slate-300 absolute -right-2 top-4">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
