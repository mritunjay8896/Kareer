import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Linkedin, 
  Github 
} from 'lucide-react';
import heroStudentImg from '../../assets/images/hero_student_1788459979282.jpg';

export const RecruiterProfileSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'About' | 'Projects' | 'Internships' | 'Certifications' | 'Achievements'>('About');

  const checklist = [
    { label: 'Education', width: 'w-14' },
    { label: 'Skills', width: 'w-14' },
    { label: 'Projects', width: 'w-14' },
    { label: 'Internships', width: 'w-14' },
    { label: 'Challenges', width: 'w-14' },
    { label: 'Certifications', width: 'w-14' },
  ];

  const skillChips = [
    'JavaScript', 'React', 'Node.js', 'MongoDB', 'Python', 'SQL', 'Git'
  ];

  return (
    <section className="w-full bg-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              Built for Students. <br />
              Loved by Recruiters.
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-sm">
              Recruiters discover you based on your skills, projects, education, internships and achievements —not just years of experience.
            </p>

            <div className="pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer group"
              >
                <span>Create a Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Candidate Profile Showcase */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
            
            {/* Sub-Card 1: Profile Strength */}
            <div className="sm:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                  <span>Profile Strength</span>
                  <span className="text-slate-900 font-extrabold text-xs">85%</span>
                </div>

                {/* Circular Gauge + Bar Row */}
                <div className="flex items-center gap-3 my-2.5">
                  <div className="relative w-12 h-12 rounded-full border-3 border-slate-100 flex items-center justify-center shrink-0">
                    <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-emerald-500"
                        strokeDasharray="85, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[11px] font-black text-slate-900">85%</span>
                  </div>
                  <div className="flex-1">
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Checklist with horizontal green progress bars */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Checklist
                  </div>
                  {checklist.map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>{item.label}</span>
                      <div className="w-14 h-1.5 bg-emerald-500 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sub-Card 2: Main Student Profile Card */}
            <div className="sm:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
              <div>
                {/* Profile Header */}
                <div className="flex items-start gap-3.5 pb-3.5 border-b border-slate-100">
                  <img
                    src={heroStudentImg}
                    alt="Mritunjay Singh"
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-2xs shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-slate-900 truncate">
                      Mritunjay Singh
                    </div>
                    <div className="text-[11px] text-slate-600 truncate">
                      B. Tech in Computer Science
                    </div>
                    <div className="text-[10px] text-slate-400">
                      2026 Graduate
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                      <span>Bangalore, India</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-slate-600">
                      <Github className="w-3.5 h-3.5 hover:text-black cursor-pointer" />
                      <Linkedin className="w-3.5 h-3.5 text-blue-600 hover:text-blue-700 cursor-pointer" />
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-3 border-b border-slate-100 py-2 overflow-x-auto no-scrollbar text-[10.5px]">
                  {(['About', 'Projects', 'Internships', 'Certifications', 'Achievements'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`font-semibold whitespace-nowrap transition-colors pb-0.5 cursor-pointer ${
                        activeTab === tab 
                          ? 'text-blue-600 border-b-2 border-blue-600 font-bold' 
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Skills Container */}
                <div className="pt-3">
                  <div className="text-[10.5px] font-bold text-slate-700 mb-2">
                    Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skillChips.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-semibold shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
