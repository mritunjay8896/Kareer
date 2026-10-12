import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Sparkles, 
  Layout, 
  Clock, 
  Building2, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Check,
  X
} from 'lucide-react';

export const HireFromUsSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    workEmail: '',
    phone: '',
    roleCategory: 'Software Developer',
    candidateLevel: 'Freshers & Experienced',
    openings: '1-3 Openings',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const topFeatures = [
    {
      id: 'highly-skilled',
      icon: Users,
      iconBg: 'bg-[#EFF6FF]',
      iconColor: 'text-[#2563EB]',
      title: 'Highly Skilled Talent',
      desc: 'Pre-screened & job-ready candidates'
    },
    {
      id: 'right-skills',
      icon: Sparkles,
      iconBg: 'bg-[#F5F3FF]',
      iconColor: 'text-[#7C3AED]',
      title: 'Right Skills For Your Needs',
      desc: 'Technical + Non-Technical across multiple domains'
    },
    {
      id: 'flexible-hiring',
      icon: Layout,
      iconBg: 'bg-[#EFF6FF]',
      iconColor: 'text-[#2563EB]',
      title: 'Flexible Hiring',
      desc: 'Interns, Freshers & Experienced Professionals'
    },
    {
      id: 'fast-easy',
      icon: Clock,
      iconBg: 'bg-[#EFF6FF]',
      iconColor: 'text-[#2563EB]',
      title: 'Fast & Easy',
      desc: 'Simplified hiring process with full support'
    }
  ];

  return (
    <section id="talent-pool" className="w-full bg-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 border-b border-slate-100 scroll-mt-16 relative">
      <div id="hire-from-us" className="absolute -top-20 left-0" />
      
      <div className="max-w-[1340px] mx-auto space-y-8 sm:space-y-10">
        
        {/* =========================================================
            PART 1: 4-Column Feature Strip Card with Vertical Dividers
            ========================================================= */}
        <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {topFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={feat.id} 
                  className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 sm:px-6 first:pl-0 last:pr-0 group"
                >
                  <div className={`w-12 h-12 rounded-full ${feat.iconBg} ${feat.iconColor} flex items-center justify-center mb-4 shadow-2xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            PART 2: Bottom Section — Trusted by Growing Businesses + 2x2 Stats
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subhead, CTA Button */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-semibold shadow-2xs">
              <span>Employer Success</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.12] font-display">
              Trusted by Growing Businesses
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-md">
              From startups to enterprises, companies across India choose Glitread to find the right talent, faster.
            </p>

            <div className="pt-2">
              <Link
                to="/search-profiles"
                className="inline-flex items-center gap-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Browse Talent Pool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: 2x2 Colored Stat Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Stat Card 1: Talent Pool (Soft Blue) */}
            <div className="bg-[#F0F7FF] border border-blue-100/90 rounded-2xl p-5 sm:p-6 shadow-2xs text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                2,00,000+
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1 leading-tight">
                Total Talent Pool
              </div>
              <div className="text-xs text-slate-500 leading-tight">
                (Freshers + Experienced)
              </div>
            </div>

            {/* Stat Card 2: Hiring Companies (Soft Warm Peach) */}
            <div className="bg-[#FFF6F0] border border-orange-100/90 rounded-2xl p-5 sm:p-6 shadow-2xs text-left">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#EA580C] font-display tracking-tight">
                1000+
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1 leading-tight">
                Hiring Companies
              </div>
              <div className="text-xs text-slate-500 leading-tight">
                &amp; Growing
              </div>
            </div>

            {/* Stat Card 3: Verification Rate (Soft Mint Green) */}
            <div className="bg-[#F0FAF4] border border-emerald-100/90 rounded-2xl p-5 sm:p-6 shadow-2xs text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                95%
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1 leading-tight">
                Profile Verification
              </div>
              <div className="text-xs text-slate-500 leading-tight">
                Rate
              </div>
            </div>

            {/* Stat Card 4: Industries Covered (Soft Lavender) */}
            <div className="bg-[#F7F3FF] border border-purple-100/90 rounded-2xl p-5 sm:p-6 shadow-2xs text-left">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                10+
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1 leading-tight">
                Industries
              </div>
              <div className="text-xs text-slate-500 leading-tight">
                Covered
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Hire for Requirements Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Hire for Your Requirements
                </h3>
                <p className="text-xs text-slate-500">
                  Access 2,00,000+ candidates tailored to your team
                </p>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  Request Received
                </h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Our talent team will match your criteria with verified candidates from our 2 lakh+ talent pool and share profiles within 24 hours.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Innovations"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hr@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Skills or Specific Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. React, Node.js, immediate availability in Bangalore or remote"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
                  >
                    Submit Hiring Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
