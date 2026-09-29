import React from 'react';
import { 
  GraduationCap, 
  Rocket, 
  Briefcase, 
  Star 
} from 'lucide-react';

export const CareerStageSection: React.FC = () => {
  const stages = [
    {
      title: 'Student',
      desc: 'Currently studying and building your profile.',
      icon: GraduationCap,
      iconBg: 'bg-[#F3EEFF]',
      iconColor: 'text-[#8B5CF6]'
    },
    {
      title: 'Fresher',
      desc: 'Recently graduated or starting your first career.',
      icon: Rocket,
      iconBg: 'bg-[#EBF3FE]',
      iconColor: 'text-[#1565ED]'
    },
    {
      title: 'Working Professional',
      desc: 'Build your professional presence and grow further.',
      icon: Briefcase,
      iconBg: 'bg-[#EAF6FF]',
      iconColor: 'text-[#0284C7]'
    },
    {
      title: 'Experienced Professional',
      desc: 'Showcase your experience, achievements and expertise.',
      icon: Star,
      iconBg: 'bg-[#FFF7ED]',
      iconColor: 'text-[#F59E0B]'
    }
  ];

  return (
    <section className="w-full bg-white py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Heading */}
          <div className="lg:col-span-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
              Built For Your Career Stage
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs leading-relaxed">
              No matter where you are in your journey, Glitread helps you showcase your best self.
            </p>
          </div>

          {/* Right 4 Horizontal Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div 
                  key={stage.title} 
                  className="bg-white border border-slate-200/90 rounded-xl p-3 sm:p-3.5 flex items-start gap-3 shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div className={`w-9 h-9 rounded-full ${stage.iconBg} ${stage.iconColor} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4.5 h-4.5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
