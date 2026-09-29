import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Globe, 
  FileText,
  User,
  GraduationCap,
  Briefcase,
  Layers,
  Award
} from 'lucide-react';

export const DualShowcaseSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        
        {/* =========================================
            LEFT COLUMN: ATS RESUME SHOWCASE
           ========================================= */}
        <div className="flex flex-col justify-between space-y-6">
          {/* Top: ATS Resume Mockup Card */}
          <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs overflow-hidden">
            {/* Mockup Window Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/70 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-bold text-slate-700">ATS Resume</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
              </div>
            </div>

            {/* Resume Content Sheet */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs text-left">
              {/* Header Info */}
              <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-base shrink-0 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200"
                    alt="Aman Sharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                    Aman Sharma
                  </h4>
                  <p className="text-xs text-blue-600 font-semibold mt-0.5">
                    Full Stack Developer
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-[10.5px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> Bangalore, India
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-2.5 h-2.5" /> aman@gmail.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Body: Left Sub-Nav + Right Sections */}
              <div className="grid grid-cols-12 gap-3 pt-3">
                {/* Left Mini Sidebar */}
                <div className="col-span-4 border-r border-slate-100 pr-2 space-y-1.5 text-[10px] text-slate-500 font-medium">
                  <div className="text-blue-600 font-bold bg-blue-50/80 px-1.5 py-1 rounded">Personal Info</div>
                  <div className="px-1.5 py-0.5">Skills</div>
                  <div className="px-1.5 py-0.5">Experience</div>
                  <div className="px-1.5 py-0.5">Education</div>
                  <div className="px-1.5 py-0.5">Projects</div>
                  <div className="px-1.5 py-0.5">Certifications</div>
                </div>

                {/* Right Content */}
                <div className="col-span-8 space-y-2.5 pl-1">
                  <div>
                    <span className="text-[10.5px] font-bold text-slate-800 block mb-0.5">About Me</span>
                    <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">
                      Passionate developer with 3+ years experience building responsive, performant web applications using React and Node.js.
                    </p>
                  </div>

                  <div>
                    <span className="text-[10.5px] font-bold text-slate-800 block mb-1">Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {['React', 'Node.js', 'JavaScript', 'MongoDB', 'SQL'].map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10.5px] font-bold text-slate-800 block mb-0.5">Experience</span>
                    <div className="text-[10px]">
                      <span className="font-bold text-slate-800 block">Software Developer</span>
                      <span className="text-slate-400 text-[9px]">ABC Tech Pvt Ltd | 2022 - Present</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Content & CTA */}
          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
              Build a Resume That Gets Read.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Create a professional ATS-friendly resume without starting from scratch. Choose from modern templates and highlight your best skills and experience.
            </p>

            <ul className="space-y-1.5 pt-1 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>ATS-friendly templates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Professional formatting</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Skills, experience, education</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Projects & certifications</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>PDF download</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/resume-builder"
                className="inline-flex items-center gap-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md shadow-blue-500/20 transition-all group"
              >
                <span>Build My Resume</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================
            RIGHT COLUMN: PORTFOLIO SHOWCASE
           ========================================= */}
        <div className="flex flex-col justify-between space-y-6">
          {/* Top: Portfolio Browser Mockup Card */}
          <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs overflow-hidden">
            {/* Browser Top Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/70 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[9px]">
                  AS
                </div>
                <span className="font-bold text-slate-800 text-[11px]">Aman Sharma</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">• Full Stack Developer</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] text-slate-500 font-medium">
                <span className="text-blue-600 font-bold">About</span>
                <span>Skills</span>
                <span>Experience</span>
                <span>Projects</span>
              </div>
            </div>

            {/* Portfolio Page Mockup */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs text-left">
              {/* Hero Banner inside portfolio */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                    Hello! I'm Aman Sharma
                  </h4>
                  <p className="text-[10px] text-slate-500 max-w-[240px] leading-snug">
                    Passionate Full Stack Developer with a love for building scalable web applications.
                  </p>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[9px] font-bold">
                      View Resume
                    </span>
                    <span className="px-2 py-0.5 rounded border border-slate-200 text-slate-700 text-[9px] font-semibold">
                      Contact Me
                    </span>
                  </div>
                </div>

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=260"
                    alt="Aman Sharma Portfolio"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* "My Projects" row */}
              <div className="pt-3">
                <span className="text-[10.5px] font-bold text-slate-800 block mb-2">My Projects</span>
                <div className="grid grid-cols-3 gap-2">
                  {/* Project 1 */}
                  <div className="rounded-lg border border-slate-200/80 p-1.5 bg-slate-50/60">
                    <div className="w-full h-10 rounded bg-gradient-to-tr from-blue-600 to-indigo-600 mb-1 flex items-center justify-center text-[8px] text-white font-bold">
                      E-Commerce
                    </div>
                    <span className="text-[9px] font-bold text-slate-800 block truncate">E-commerce Platform</span>
                  </div>

                  {/* Project 2 */}
                  <div className="rounded-lg border border-slate-200/80 p-1.5 bg-slate-50/60">
                    <div className="w-full h-10 rounded bg-gradient-to-tr from-cyan-600 to-blue-600 mb-1 flex items-center justify-center text-[8px] text-white font-bold">
                      Task App
                    </div>
                    <span className="text-[9px] font-bold text-slate-800 block truncate">Task Manager App</span>
                  </div>

                  {/* Project 3 */}
                  <div className="rounded-lg border border-slate-200/80 p-1.5 bg-slate-50/60">
                    <div className="w-full h-10 rounded bg-gradient-to-tr from-purple-600 to-pink-600 mb-1 flex items-center justify-center text-[8px] text-white font-bold">
                      Weather API
                    </div>
                    <span className="text-[9px] font-bold text-slate-800 block truncate">Weather App</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Content & CTA */}
          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
              Your Career Deserves More Than a PDF.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Create a beautiful portfolio that brings your skills, projects and experience to life. Showcase what makes you unique and stand out.
            </p>

            <ul className="space-y-1.5 pt-1 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Customizable templates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Project showcase</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Skills & achievements</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Social links & contact</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md shadow-blue-500/20 transition-all group"
              >
                <span>Create My Portfolio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
