import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  FolderGit2, 
  Sparkles, 
  GraduationCap, 
  Trophy, 
  Award, 
  Star, 
  UserCheck 
} from 'lucide-react';

export const NoExperienceSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto bg-slate-50/75 border border-slate-200/85 rounded-2xl py-4 sm:py-5 px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-4 space-y-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              No Experience Yet?{' '}
              <span className="text-blue-600">Break The Loop.</span>
            </h2>
            <p className="text-xs text-slate-600 leading-snug max-w-sm">
              Break the "No Job, No Experience" cycle. Get an internship to start your career, prove your skills with projects, and land your first job.
            </p>
            <div className="pt-0.5 flex items-center gap-2">
              <Link
                to="/internships"
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-colors shadow-2xs"
              >
                <span>Find Internships</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/challenges"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-xl border border-slate-200 transition-colors shadow-2xs"
              >
                <span>Challenges</span>
              </Link>
            </div>
          </div>

          {/* Right Equation Visual */}
          <div className="lg:col-span-8 flex flex-wrap items-center justify-center lg:justify-end gap-1.5 sm:gap-2">
            {/* Projects */}
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-100/90 border border-purple-200/80 text-purple-700 flex items-center justify-center shadow-2xs">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-bold text-slate-700 mt-1">Projects</span>
            </div>

            <span className="text-slate-400 font-bold text-xs pb-3.5">+</span>

            {/* Skills */}
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100/90 border border-emerald-200/80 text-emerald-700 flex items-center justify-center shadow-2xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-bold text-slate-700 mt-1">Skills</span>
            </div>

            <span className="text-slate-400 font-bold text-xs pb-3.5">+</span>

            {/* Internships */}
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-100/90 border border-sky-200/80 text-sky-700 flex items-center justify-center shadow-2xs">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-bold text-slate-700 mt-1">Internships</span>
            </div>

            <span className="text-slate-400 font-bold text-xs pb-3.5">+</span>

            {/* Challenges */}
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100/90 border border-amber-200/80 text-amber-700 flex items-center justify-center shadow-2xs">
                <Trophy className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-bold text-slate-700 mt-1">Challenges</span>
            </div>

            <span className="text-slate-400 font-bold text-xs pb-3.5">+</span>

            {/* Certifications */}
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-100/90 border border-cyan-200/80 text-cyan-700 flex items-center justify-center shadow-2xs">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-bold text-slate-700 mt-1">Certificates</span>
            </div>

            <span className="text-slate-400 font-bold text-xs pb-3.5">+</span>

            {/* Achievements */}
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-100/90 border border-indigo-200/80 text-indigo-700 flex items-center justify-center shadow-2xs">
                <Star className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-bold text-slate-700 mt-1">Badges</span>
            </div>

            <span className="text-slate-500 font-black text-sm pb-3.5 px-0.5">=</span>

            {/* Career Profile */}
            <div className="flex flex-col items-center pl-0.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs border-2 border-white ring-2 ring-emerald-200/80">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold text-emerald-800 mt-1 whitespace-nowrap">
                Career Profile
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
