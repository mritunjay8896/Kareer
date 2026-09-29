import React from 'react';
import { 
  User, 
  FileText, 
  Layers, 
  Building2 
} from 'lucide-react';

export const ValuePropositionStrip: React.FC = () => {
  const items = [
    {
      icon: User,
      title: 'Professional Profile',
      desc: 'Keep your career information organized.',
      iconBg: 'bg-[#EBF3FE]',
      iconColor: 'text-[#1565ED]'
    },
    {
      icon: FileText,
      title: 'ATS Resume',
      desc: 'Create a professional ATS-friendly resume.',
      iconBg: 'bg-[#EAF9F1]',
      iconColor: 'text-[#10B981]'
    },
    {
      icon: Layers,
      title: 'Portfolio',
      desc: 'Showcase your work and achievements.',
      iconBg: 'bg-[#F3EEFF]',
      iconColor: 'text-[#8B5CF6]'
    },
    {
      icon: Building2,
      title: 'Employer Discovery',
      desc: 'Get discovered by relevant employers.',
      iconBg: 'bg-[#FFF7ED]',
      iconColor: 'text-[#F59E0B]'
    }
  ];

  return (
    <section id="features" className="w-full bg-white py-4 sm:py-6 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Title and Description */}
          <div className="lg:col-span-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-display">
              One Profile. Multiple Possibilities.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs leading-relaxed">
              Everything you need to build your professional identity in one place.
            </p>
          </div>

          {/* Right: 4 Value Feature Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
                      {item.desc}
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
