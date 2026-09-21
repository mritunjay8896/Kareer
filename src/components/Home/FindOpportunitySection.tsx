import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Trophy, 
  Briefcase, 
  School, 
  Users, 
  Landmark, 
  Globe, 
  ArrowRight,
  Sparkles,
  Code2,
  User
} from 'lucide-react';

import { JourneySteps } from './JourneySection';

// 3D Image Assets matching the screenshot
import studentJourneyImg from '../../assets/images/student_journey_3d_1788699191385.jpg';
import briefcasePurpleImg from '../../assets/images/briefcase_purple_3d_1788699207337.jpg';
import trophyGoldImg from '../../assets/images/trophy_gold_3d_1788699294218.jpg';
import resumeSearchImg from '../../assets/images/resume_search_3d_1788699221492.jpg';
import campusBuildingImg from '../../assets/images/campus_building_3d_1788699234850.jpg';
import megaphoneRoseImg from '../../assets/images/megaphone_rose_3d_1788699247484.jpg';
import governmentDomeImg from '../../assets/images/government_dome_3d_1788699260897.jpg';
import globeArrowImg from '../../assets/images/globe_arrow_3d_1788699272839.jpg';

export const FindOpportunitySection: React.FC = () => {
  return (
    <section className="w-full bg-white pt-1 sm:pt-3 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1360px] mx-auto">
        {/* Top Header */}
        <div className="text-center mx-auto mb-4 sm:mb-5">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight font-display">
            Find Your <span className="text-blue-600">Next Opportunity</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl mx-auto leading-relaxed">
            Explore internships, jobs, challenges, hackathons and more — all in one place, designed for students and freshers.
          </p>

          {/* 6 Journey Steps */}
          <JourneySteps className="mt-4 sm:mt-5 mb-0.5" />
        </div>

        {/* Bento Grid: Left Hero Card + Right Opportunity Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch mt-3 sm:mt-4">
          {/* Left Hero Card (Your Career Journey Starts Here) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#EEF4FE] via-[#E8F1FD] to-[#DFECFD] border border-blue-100/90 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xs relative overflow-hidden">
            {/* Top Left Badge */}
            <div className="flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 bg-white/90 text-blue-600 text-xs font-bold px-3 py-1 rounded-full border border-blue-100 shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5" />
                STUDENT FIRST
              </span>
            </div>

            {/* Center: Character Illustration with floating badge pills */}
            <div className="relative my-3 sm:my-4 flex items-center justify-center min-h-[220px]">
              {/* Floating Chip 1: Build Profile (Top Left) */}
              <div className="absolute top-1 left-0 sm:left-2 z-10 bg-white/95 border border-slate-100 shadow-sm rounded-xl px-2.5 py-1 flex items-center gap-1.5">
                <div className="w-4.5 h-4.5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <User className="w-2.5 h-2.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">Build Profile</span>
              </div>

              {/* Floating Chip 2: Learn Skills (Top Right) */}
              <div className="absolute top-3 right-0 sm:right-2 z-10 bg-white/95 border border-slate-100 shadow-sm rounded-xl px-2.5 py-1 flex items-center gap-1.5">
                <div className="w-4.5 h-4.5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Code2 className="w-2.5 h-2.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">Learn Skills</span>
              </div>

              {/* Floating Chip: Get Hired (Bottom Right) */}
              <div className="absolute bottom-4 right-1 sm:right-3 z-10 bg-white/95 border border-slate-100 shadow-sm rounded-xl px-2.5 py-1 flex items-center gap-1.5">
                <div className="w-4.5 h-4.5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Briefcase className="w-2.5 h-2.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">Get Hired</span>
              </div>

              {/* 3D Student Image - Blends seamlessly with card background with no shadow */}
              <img
                src={studentJourneyImg}
                alt="Student Career Journey"
                className="w-48 sm:w-54 h-auto object-contain mix-blend-multiply select-none pointer-events-none relative z-0"
              />
            </div>

            {/* Bottom Content & CTA */}
            <div className="z-10 mt-auto">
              <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight mb-2 font-display">
                Your Career Journey Starts Here
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                Build your profile, gain skills, complete challenges, get real experience and move closer to your first job.
              </p>
              <div className="flex items-center gap-2">
                <Link
                  to="/student/onboarding"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-blue-500/20 transition-all hover:gap-3 cursor-pointer group"
                >
                  Start Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                {/* Sparkle decorative lines matching screenshot */}
                <div className="flex items-center gap-1 text-blue-400">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 7 Opportunity Cards in a Balanced 2-Row Grid */}
          <div className="lg:col-span-8 grid grid-rows-2 gap-4">
            {/* Row 1: 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 h-full">
              {/* Card 1: Internships */}
              <Link
                to="/internships"
                className="bg-[#F8F5FF] border border-purple-100/90 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                    <GraduationCap className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-[15px] text-slate-900 group-hover:text-purple-700 transition-colors mb-1 font-display">
                    Internships
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Gain real-world experience while you study.
                  </p>
                </div>
                <div className="flex items-end justify-between mt-4 pt-1">
                  <div className="w-7 h-7 rounded-full bg-purple-100 group-hover:bg-purple-600 text-purple-600 group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <img
                    src={briefcasePurpleImg}
                    alt="Internships"
                    className="w-13 h-13 sm:w-15 sm:h-15 object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>

              {/* Card 2: Challenges & Hackathons */}
              <Link
                to="/challenges"
                className="bg-[#FFFDF4] border border-amber-100/90 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                    <Trophy className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-[15px] text-slate-900 group-hover:text-amber-700 transition-colors mb-1 font-display">
                    Challenges & Hackathons
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Prove your skills, build amazing projects.
                  </p>
                </div>
                <div className="flex items-end justify-between mt-4 pt-1">
                  <div className="w-7 h-7 rounded-full bg-amber-100 group-hover:bg-amber-500 text-amber-600 group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <img
                    src={trophyGoldImg}
                    alt="Challenges & Hackathons"
                    className="w-13 h-13 sm:w-15 sm:h-15 object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>

              {/* Card 3: Fresher Jobs */}
              <Link
                to="/jobs?experience=Fresher"
                className="bg-[#F1F7FF] border border-blue-100/90 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                    <Briefcase className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-[15px] text-slate-900 group-hover:text-blue-700 transition-colors mb-1 font-display">
                    Fresher Jobs
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Find your first full-time opportunity.
                  </p>
                </div>
                <div className="flex items-end justify-between mt-4 pt-1">
                  <div className="w-7 h-7 rounded-full bg-blue-100 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <img
                    src={resumeSearchImg}
                    alt="Fresher Jobs"
                    className="w-13 h-13 sm:w-15 sm:h-15 object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>

              {/* Card 4: Campus Hiring */}
              <Link
                to="/jobs?type=campus"
                className="bg-[#F2FDF6] border border-emerald-100/90 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                    <School className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-[15px] text-slate-900 group-hover:text-emerald-700 transition-colors mb-1 font-display">
                    Campus Hiring
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Discover opportunities from your college.
                  </p>
                </div>
                <div className="flex items-end justify-between mt-4 pt-1">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <img
                    src={campusBuildingImg}
                    alt="Campus Hiring"
                    className="w-13 h-13 sm:w-15 sm:h-15 object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
            </div>

            {/* Row 2: 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 h-full">
              {/* Card 5: Off-Campus Hiring */}
              <Link
                to="/jobs?type=off-campus"
                className="bg-[#FFF4F5] border border-rose-100/90 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
                    <Users className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-[15px] text-slate-900 group-hover:text-rose-700 transition-colors mb-1 font-display">
                    Off-Campus Hiring
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Explore opportunities beyond campus.
                  </p>
                </div>
                <div className="flex items-end justify-between mt-4 pt-1">
                  <div className="w-7 h-7 rounded-full bg-rose-100 group-hover:bg-rose-600 text-rose-600 group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <img
                    src={megaphoneRoseImg}
                    alt="Off-Campus Hiring"
                    className="w-13 h-13 sm:w-15 sm:h-15 object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>

              {/* Card 6: Government Jobs */}
              <Link
                to="/government-jobs"
                className="bg-[#F0FDFC] border border-teal-100/90 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                    <Landmark className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-[15px] text-slate-900 group-hover:text-teal-700 transition-colors mb-1 font-display">
                    Government Jobs
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Access government opportunities and notices.
                  </p>
                </div>
                <div className="flex items-end justify-between mt-4 pt-1">
                  <div className="w-7 h-7 rounded-full bg-teal-100 group-hover:bg-teal-600 text-teal-700 group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <img
                    src={governmentDomeImg}
                    alt="Government Jobs"
                    className="w-13 h-13 sm:w-15 sm:h-15 object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>

              {/* Card 7: Global Opportunities */}
              <Link
                to="/jobs?location=Global"
                className="bg-[#F5F4FF] border border-indigo-100/90 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                    <Globe className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-[15px] text-slate-900 group-hover:text-indigo-700 transition-colors mb-1 font-display">
                    Global Opportunities
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Explore international opportunities.
                  </p>
                </div>
                <div className="flex items-end justify-between mt-4 pt-1">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <img
                    src={globeArrowImg}
                    alt="Global Opportunities"
                    className="w-13 h-13 sm:w-15 sm:h-15 object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
