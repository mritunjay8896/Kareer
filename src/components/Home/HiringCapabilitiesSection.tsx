import React from 'react';
import { 
  Code2, 
  ShieldCheck, 
  Cloud, 
  Settings, 
  Users, 
  PenTool, 
  MoreHorizontal 
} from 'lucide-react';

const ROLES = [
  {
    id: 'software-developers',
    title: 'Software Developers',
    icon: Code2,
    circleBg: 'bg-[#EBF3FE]',
    iconColor: 'text-[#1565ED]',
  },
  {
    id: 'qa-tester',
    title: 'QA / Tester',
    icon: ShieldCheck,
    circleBg: 'bg-[#E8FAF0]',
    iconColor: 'text-[#059669]',
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: Cloud,
    circleBg: 'bg-[#EBF5FE]',
    iconColor: 'text-[#0284C7]',
  },
  {
    id: 'operations',
    title: 'Operations',
    icon: Settings,
    circleBg: 'bg-[#F4EEFF]',
    iconColor: 'text-[#7C3AED]',
  },
  {
    id: 'consultant',
    title: 'Consultant',
    icon: Users,
    circleBg: 'bg-[#EBF5FE]',
    iconColor: 'text-[#2563EB]',
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    icon: PenTool,
    circleBg: 'bg-[#FAE8FF]',
    iconColor: 'text-[#A855F7]',
  },
  {
    id: 'more',
    title: '& More',
    icon: MoreHorizontal,
    circleBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
];

export const HiringCapabilitiesSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-6 sm:py-8 px-3 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-[1340px] mx-auto bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs">
        
        {/* Section Header matching screenshot */}
        <div className="text-left space-y-1 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold tracking-tight text-slate-900 font-display">
            Hire From Us for These Roles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Get professionals with the skills you're looking for.
          </p>
        </div>

        {/* Roles Horizontal Strip with Vertical Dividers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <a
                key={role.id}
                href="#talent-pool"
                className="flex flex-col items-center justify-center p-3 sm:p-4 group cursor-pointer hover:bg-slate-50/60 rounded-xl transition-all"
              >
                {/* Circular Role Icon with soft pastel background */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${role.circleBg} ${role.iconColor} flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs mb-3`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                </div>

                {/* Role Label */}
                <span className="text-xs sm:text-[13px] font-bold text-slate-800 text-center leading-snug group-hover:text-blue-600 transition-colors max-w-[105px]">
                  {role.title}
                </span>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
