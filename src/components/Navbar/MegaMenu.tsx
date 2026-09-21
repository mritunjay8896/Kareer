import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  Sparkles, 
  ChevronRight, 
  Award, 
  CheckCircle2, 
  BookOpen,
  Users,
  Flame,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  Globe,
  Plane,
  DollarSign,
  Headphones
} from 'lucide-react';

interface MegaMenuProps {
  type: 'jobs' | 'internships' | 'government' | 'courses' | 'tests';
  onItemClick: (label: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type, onItemClick }) => {
  if (type === 'jobs') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="absolute top-full left-0 sm:-left-6 xl:-left-12 w-[880px] xl:w-[1020px] max-w-[92vw] mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-4 gap-6 z-50 overflow-hidden"
      >
        {/* Column 1: Top Locations */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            Top Locations
          </div>
          <ul className="space-y-1.5 text-sm">
            {['Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai', 'Remote Jobs'].map((loc) => (
              <li key={loc}>
                <button
                  onClick={() => onItemClick(`Jobs in ${loc}`)}
                  className="w-full text-left text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between group"
                >
                  <span>Jobs in {loc}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Top Categories */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            Top Categories
          </div>
          <ul className="space-y-1.5 text-sm">
            {['Software & Tech', 'Cloud & DevOps', 'Data Science & AI', 'Product Management', 'Cybersecurity', 'Digital Marketing', 'Finance & Banking'].map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => onItemClick(`${cat} Jobs`)}
                  className="w-full text-left text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between group"
                >
                  <span>{cat}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Special Hiring Programs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Exclusive Programs
          </div>
          <ul className="space-y-1.5 text-sm">
            {[
              { label: 'Full Time Tech Roles', badge: 'High Demand' },
              { label: 'Fresher Jobs (2025/26)', badge: 'Hot' },
              { label: '100% Remote Jobs', badge: 'High Pay' },
              { label: 'Women in Tech Careers', badge: 'Diversity' },
              { label: 'Walk-in Interview Drives', badge: 'Urgent' }
            ].map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => onItemClick(item.label)}
                  className="w-full text-left text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between group"
                >
                  <span className="font-medium line-clamp-1">{item.label}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full shrink-0">
                    {item.badge}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Feature Promo Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white flex flex-col justify-between shadow-md">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold mb-3">
              <Flame className="w-3.5 h-3.5 text-amber-300" /> Free ATS Resume Check
            </div>
            <h4 className="font-bold text-base leading-snug">Boost Callbacks by 3.5x</h4>
            <p className="text-xs text-blue-100 mt-2 leading-relaxed">
              Get an instant AI audit of your resume formatting, keywords & formatting against top Indian tech recruiters.
            </p>
          </div>
          <button
            onClick={() => onItemClick('AI Resume Checker')}
            className="mt-4 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs py-2 px-3.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            Check Resume Score Free <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    );
  }

  if (type === 'internships') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="absolute top-full left-0 sm:-left-16 xl:-left-28 w-[760px] xl:w-[880px] max-w-[92vw] mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-3 gap-6 z-50 overflow-hidden"
      >
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
            Top Streams
          </div>
          <ul className="space-y-1 text-sm">
            {['Computer Science / IT', 'UI/UX & Product Design', 'Digital Marketing', 'Data Analytics', 'Finance & Accounting', 'Content Writing'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => onItemClick(`${item} Internship`)}
                  className="w-full text-left text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 px-2.5 py-1.5 rounded-lg transition-all"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
            Internship Mode
          </div>
          <ul className="space-y-1 text-sm">
            {['100% Work From Home', 'Summer 2026 Internships', 'Part-time Internships', 'Internships with High Stipend (>₹20k)', 'Internships for Women'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => onItemClick(item)}
                  className="w-full text-left text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 px-2.5 py-1.5 rounded-lg transition-all"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">PPO Guaranteed</span>
            <h4 className="font-bold text-base mt-1">Convert Internship to Full-Time</h4>
            <p className="text-xs text-slate-300 mt-2">
              Over 8,000+ interns on CareerPulse secured full-time PPOs with average package ₹8.5 LPA.
            </p>
          </div>
          <button
            onClick={() => onItemClick('PPO Internships')}
            className="mt-4 bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white py-2 px-3 rounded-lg transition-colors text-center"
          >
            Explore PPO Opportunities →
          </button>
        </div>
      </motion.div>
    );
  }

  if (type === 'government') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="absolute top-full left-0 sm:-left-32 xl:-left-44 w-[880px] xl:w-[1020px] max-w-[92vw] mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-4 gap-6 z-50 overflow-hidden"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Top Govt Sectors
          </div>
          <ul className="space-y-1 text-sm">
            {['SSC (CGL, CHSL, MTS, CPO)', 'UPSC (IAS, IPS, CDS, NDA)', 'Railways (RRB NTPC, Group D)', 'Banking (IBPS, SBI PO, RBI)', 'Teaching (CTET, KVS, NVS)'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => onItemClick(item)}
                  className="w-full text-left text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition-all"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Defense & State
          </div>
          <ul className="space-y-1 text-sm">
            {['Police & Defence (Army, Navy)', 'State PSC (UPPCS, BPSC, MPSC)', 'PSU Recruitment (GATE)', 'ISRO & DRDO Technical', 'Judiciary & Law Officers'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => onItemClick(item)}
                  className="w-full text-left text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition-all"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
            <FileText className="w-3.5 h-3.5 text-purple-600" /> Exam Updates
          </div>
          <ul className="space-y-1 text-sm">
            {[
              { title: 'Latest Exam Results 2026', tag: 'New' },
              { title: 'Admit Card Downloads', tag: 'Live' },
              { title: 'Official Exam Syllabus', tag: 'PDF' },
              { title: 'Previous Year Papers', tag: 'Free' },
              { title: 'Answer Keys & Cut-offs', tag: 'Updated' }
            ].map((item) => (
              <li key={item.title}>
                <button
                  onClick={() => onItemClick(item.title)}
                  className="w-full text-left text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between"
                >
                  <span>{item.title}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                    {item.tag}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded text-xs font-semibold mb-2">
              Govt Notification Hub
            </div>
            <h4 className="font-bold text-base">Over 45,000+ Open Vacancies</h4>
            <p className="text-xs text-emerald-100 mt-2">
              Free alerts on WhatsApp & Email for every new government job notification.
            </p>
          </div>
          <button
            onClick={() => onItemClick('Govt Job Alert Subscription')}
            className="mt-4 bg-emerald-400 hover:bg-emerald-300 font-bold text-xs text-slate-900 py-2 px-3 rounded-lg transition-colors text-center"
          >
            Enable Free Notifications
          </button>
        </div>
      </motion.div>
    );
  }

  if (type === 'courses') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="absolute top-full left-0 sm:-left-48 xl:-left-64 w-[880px] xl:w-[1020px] max-w-[92vw] mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-4 gap-6 z-50 overflow-hidden"
      >
        {/* 4 Column Courses Mega Menu */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" /> Full Stack & Tech
          </div>
          <ul className="space-y-1 text-sm">
            {['Full Stack Web Development', 'MERN & Next.js Masterclass', 'Python & Django Bootcamp', 'Java Backend & Microservices', 'Mobile App Dev (React Native)'].map((c) => (
              <li key={c}>
                <button onClick={() => onItemClick(c)} className="w-full text-left text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg">
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Data & AI
          </div>
          <ul className="space-y-1 text-sm">
            {['Data Science & ML Engineering', 'Business Analytics with PowerBI', 'Generative AI & LLM Apps', 'Data Engineering & SQL', 'Deep Learning with PyTorch'].map((c) => (
              <li key={c}>
                <button onClick={() => onItemClick(c)} className="w-full text-left text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg">
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Design & Business
          </div>
          <ul className="space-y-1 text-sm">
            {['UI/UX Design Masterclass', 'Digital Marketing & Growth', 'Product Management Essentials', 'Financial Modeling & Valuation', 'Human Resource Management'].map((c) => (
              <li key={c}>
                <button onClick={() => onItemClick(c)} className="w-full text-left text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg">
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-1.5">
            <Award className="w-4 h-4" /> Placement Programs
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 space-y-3">
            <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full uppercase">100% Job Guarantee</span>
            <h5 className="font-bold text-sm text-slate-900 leading-snug">Placement Guaranteed Bootcamps</h5>
            <p className="text-xs text-slate-600">Pay 0 Tuition until you get placed at ₹6+ LPA in top product companies.</p>
            <button onClick={() => onItemClick('Placement Bootcamps')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors">
              Explore Bootcamps
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'tests') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="absolute top-full left-0 sm:-left-48 xl:-left-64 w-[880px] xl:w-[1000px] max-w-[92vw] mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-3 gap-6 z-50 overflow-hidden"
      >
        {/* Column 1: IT & Tech Mock Tests */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-blue-700 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-600" /> Tech Mock Assessments
          </div>
          <ul className="space-y-1.5 text-sm">
            {[
              { name: 'Full Stack MERN Assessment', badge: 'Hot' },
              { name: 'Java & Spring Boot Aptitude', badge: 'Live' },
              { name: 'Python & Data Science Test', badge: 'Popular' },
              { name: 'SQL & Database Design Test', badge: 'Active' },
              { name: 'Frontend React.js Coding Round', badge: 'High Pay' }
            ].map((test) => (
              <li key={test.name}>
                <button
                  onClick={() => onItemClick(test.name)}
                  className="w-full text-left text-slate-600 hover:text-blue-700 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-1">{test.name}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded shrink-0">
                    {test.badge}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Aptitude & Govt Exams */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600" /> Aptitude & Competitive
          </div>
          <ul className="space-y-1.5 text-sm">
            {[
              'Quantitative Aptitude Mastery',
              'Logical Reasoning Full Test',
              'Verbal English Comprehension',
              'TCS NQT National Mock Exam',
              'SSC CGL Tier 1 Mock Series'
            ].map((test) => (
              <li key={test}>
                <button
                  onClick={() => onItemClick(test)}
                  className="w-full text-left text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-1">{test}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-emerald-600 transition-opacity" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Promo Card */}
        <div className="bg-gradient-to-br from-indigo-900 via-blue-950 to-slate-900 text-white rounded-xl p-5 flex flex-col justify-between border border-blue-800/80 shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase mb-2">
              ⚡ Free Mock Tests
            </div>
            <h4 className="font-extrabold text-base leading-tight">Industry Skill Benchmark</h4>
            <p className="text-xs text-blue-100/90 mt-2 leading-relaxed">
              Take verified mock tests designed by top recruiters to get candidate skill certificates and priority callbacks.
            </p>
          </div>
          <button
            onClick={() => onItemClick('All Mock Tests')}
            className="mt-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs py-2.5 px-3 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer shadow-sm relative z-10"
          >
            Start Free Mock Test <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  return null;
};
