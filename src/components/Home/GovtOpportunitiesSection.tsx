import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Landmark, 
  Building2, 
  Train, 
  Shield, 
  ShieldCheck, 
  GraduationCap, 
  MoreHorizontal,
  Award,
  Sparkles
} from 'lucide-react';

interface DepartmentItem {
  name: string;
  icon: React.ElementType;
  color: string;
  borderClass: string;
  query: string;
  logoUrl?: string;
  wikiUrl?: string;
}

export const GovtOpportunitiesSection: React.FC = () => {
  const navigate = useNavigate();

  const departments: DepartmentItem[] = [
    { 
      name: 'SSC', 
      icon: Landmark, 
      logoUrl: '/logos/ssc.jpg',
      wikiUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Staff_Selection_Commission_Logo.jpg',
      color: 'bg-white border-emerald-200/90', 
      borderClass: 'border-slate-200/90',
      query: 'SSC' 
    },
    { 
      name: 'UPSC', 
      icon: Landmark, 
      logoUrl: '/logos/upsc.jpg',
      wikiUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Logo_-_Union_Public_Service_Commission_-_Government_of_India.jpg',
      color: 'bg-white border-blue-200/90', 
      borderClass: 'border-slate-200/90',
      query: 'UPSC' 
    },
    { 
      name: 'Banking', 
      icon: Building2, 
      logoUrl: '/logos/banking.svg',
      wikiUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg',
      color: 'bg-white border-sky-200/90', 
      borderClass: 'border-rose-200 shadow-rose-100/50',
      query: 'Banking' 
    },
    { 
      name: 'Railway', 
      icon: Train, 
      logoUrl: '/logos/railway.svg',
      wikiUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Indian_Railways_Tricolour_Logo.svg',
      color: 'bg-white border-red-200/90', 
      borderClass: 'border-slate-200/90',
      query: 'Railway' 
    },
    { 
      name: 'Defence', 
      icon: Shield, 
      logoUrl: '/logos/defence.svg',
      wikiUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Ministry_of_Defence_India.svg',
      color: 'bg-white border-emerald-200/90', 
      borderClass: 'border-slate-200/90',
      query: 'Defence' 
    },
    { 
      name: 'Police', 
      icon: ShieldCheck, 
      logoUrl: '/logos/police.png',
      wikiUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Indian_Police_Service_logo.png',
      color: 'bg-white border-indigo-200/90', 
      borderClass: 'border-slate-200/90',
      query: 'Police' 
    },
    { 
      name: 'Teaching', 
      icon: GraduationCap, 
      logoUrl: '/logos/teaching.svg',
      wikiUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/db/PM_SHRI_KENDRIYA_VIDYALAYA.svg',
      color: 'bg-white border-amber-200/90', 
      borderClass: 'border-slate-200/90',
      query: 'Teaching' 
    },
    { 
      name: 'State Govt.', 
      icon: Building2, 
      logoUrl: '/logos/state-govt.svg',
      wikiUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg',
      color: 'bg-white border-orange-200/90', 
      borderClass: 'border-slate-200/90',
      query: 'State' 
    },
    { 
      name: 'More', 
      icon: MoreHorizontal, 
      color: 'bg-blue-50 text-blue-600 border-blue-100', 
      borderClass: 'border-slate-200/90',
      query: 'All' 
    },
  ];

  return (
    <section className="w-full bg-white py-5 sm:py-8 px-2.5 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto bg-gradient-to-r from-[#EFF5FF] via-[#F4F8FF] to-[#EDF3FF] border border-blue-100/80 rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center">
          
          {/* Left Description */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-2 sm:space-y-3">
            <span className="inline-flex items-center text-[9px] sm:text-xs font-bold text-blue-600 bg-blue-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-blue-100">
              GOVERNMENT SECTOR
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug font-display">
              Government <br className="hidden sm:inline" />
              Opportunities
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed max-w-xs font-normal">
              Find the latest government job notifications across departments.
            </p>
            <div className="pt-1">
              <Link
                to="/government-jobs"
                className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-blue-600 font-semibold text-[11px] sm:text-xs px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-blue-200 shadow-2xs transition-all cursor-pointer group w-full sm:w-auto"
              >
                <span>View All Govt. Jobs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Department Cards: Mobile Masonry Grid / Desktop Horizontal Strip */}
          <div className="lg:col-span-8 xl:col-span-9 w-full">
            {/* Mobile Masonry Grid (3x3 Bento) */}
            <div className="grid grid-cols-3 gap-2 sm:hidden w-full">
              {departments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <button
                    key={dept.name}
                    onClick={() => navigate(dept.query === 'All' ? '/government-jobs' : `/government-jobs?category=${dept.query}`)}
                    className={`bg-white border ${dept.borderClass} rounded-xl p-2 text-center transition-all cursor-pointer shadow-2xs hover:shadow-xs flex flex-col items-center justify-center min-h-[76px]`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 border ${dept.color} shadow-2xs overflow-hidden p-0.5`}>
                      {dept.logoUrl ? (
                        <img 
                          src={dept.logoUrl} 
                          alt={`${dept.name} logo`} 
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            if (dept.wikiUrl && e.currentTarget.src !== dept.wikiUrl) {
                              e.currentTarget.src = dept.wikiUrl;
                            }
                          }}
                        />
                      ) : (
                        <Icon className="w-3.5 h-3.5 stroke-[2]" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 leading-tight truncate w-full text-center">
                      {dept.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Horizontal Scroll Grid (>= sm: completely unchanged) */}
            <div className="hidden sm:block overflow-x-auto no-scrollbar py-1">
              <div className="grid grid-cols-5 sm:grid-cols-9 gap-2 sm:gap-2.5 min-w-[620px] sm:min-w-0">
                {departments.map((dept) => {
                  const Icon = dept.icon;
                  return (
                    <button
                      key={dept.name}
                      onClick={() => navigate(dept.query === 'All' ? '/government-jobs' : `/government-jobs?category=${dept.query}`)}
                      className={`bg-white hover:bg-blue-50/50 hover:border-blue-300 border ${dept.borderClass} rounded-2xl p-2.5 sm:p-3 text-center transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md hover:-translate-y-0.5 group flex flex-col items-center justify-center min-h-[96px] sm:min-h-[104px]`}
                    >
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-2 transition-all duration-200 group-hover:scale-110 border ${dept.color} shadow-2xs overflow-hidden p-1.5`}>
                        {dept.logoUrl ? (
                          <img 
                            src={dept.logoUrl} 
                            alt={`${dept.name} logo`} 
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              if (dept.wikiUrl && e.currentTarget.src !== dept.wikiUrl) {
                                e.currentTarget.src = dept.wikiUrl;
                              }
                            }}
                          />
                        ) : (
                          <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
                        )}
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight truncate w-full text-center">
                        {dept.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

