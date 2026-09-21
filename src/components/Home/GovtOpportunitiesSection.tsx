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

export const GovtOpportunitiesSection: React.FC = () => {
  const navigate = useNavigate();

  const departments = [
    { 
      name: 'SSC', 
      icon: Landmark, 
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100', 
      borderClass: 'border-slate-200/90',
      query: 'SSC' 
    },
    { 
      name: 'UPSC', 
      icon: Landmark, 
      color: 'bg-blue-50 text-blue-600 border-blue-100', 
      borderClass: 'border-slate-200/90',
      query: 'UPSC' 
    },
    { 
      name: 'Banking', 
      icon: Building2, 
      color: 'bg-rose-50 text-rose-600 border-rose-100', 
      borderClass: 'border-rose-200 shadow-rose-100/50',
      query: 'Banking' 
    },
    { 
      name: 'Railway', 
      icon: Train, 
      color: 'bg-red-50 text-red-600 border-red-100', 
      borderClass: 'border-slate-200/90',
      query: 'Railway' 
    },
    { 
      name: 'Defence', 
      icon: Shield, 
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100', 
      borderClass: 'border-slate-200/90',
      query: 'Defence' 
    },
    { 
      name: 'Police', 
      icon: ShieldCheck, 
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100', 
      borderClass: 'border-slate-200/90',
      query: 'Police' 
    },
    { 
      name: 'Teaching', 
      icon: GraduationCap, 
      color: 'bg-amber-50 text-amber-600 border-amber-100', 
      borderClass: 'border-slate-200/90',
      query: 'Teaching' 
    },
    { 
      name: 'State Govt.', 
      icon: Building2, 
      color: 'bg-orange-50 text-orange-600 border-orange-100', 
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
    <section className="w-full bg-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto bg-gradient-to-r from-[#EFF5FF] via-[#F4F8FF] to-[#EDF3FF] border border-blue-100/80 rounded-3xl p-5 sm:p-7 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Description */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug font-display">
              Government <br className="hidden sm:inline" />
              Opportunities
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs font-normal">
              Find the latest government job notifications across departments.
            </p>
            <div className="pt-1">
              <Link
                to="/government-jobs"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-blue-600 font-semibold text-xs px-4 py-2 rounded-xl border border-blue-200 shadow-2xs transition-all cursor-pointer group"
              >
                <span>View All Govt. Jobs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Department Cards in a single sleek horizontal strip */}
          <div className="lg:col-span-8 xl:col-span-9 overflow-x-auto no-scrollbar py-1">
            <div className="grid grid-cols-5 sm:grid-cols-9 gap-2 sm:gap-2.5 min-w-[620px] sm:min-w-0">
              {departments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <button
                    key={dept.name}
                    onClick={() => navigate(dept.query === 'All' ? '/government-jobs' : `/government-jobs?category=${dept.query}`)}
                    className={`bg-white hover:bg-blue-50/50 hover:border-blue-300 border ${dept.borderClass} rounded-2xl p-2.5 sm:p-3 text-center transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md hover:-translate-y-0.5 group flex flex-col items-center justify-center min-h-[96px] sm:min-h-[104px]`}
                  >
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110 border ${dept.color} shadow-2xs`}>
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
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
    </section>
  );
};

