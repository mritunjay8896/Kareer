import React, { useState, useEffect } from 'react';
import { 
  Chrome, 
  Zap, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Settings, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  RotateCcw, 
  Globe, 
  FileText, 
  Code, 
  Sliders, 
  Laptop, 
  AlertCircle,
  HelpCircle,
  Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ChromeExtensionPage: React.FC = () => {
  const { currentUser, candidateProfile } = useAuth();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'demo' | 'profile' | 'code' | 'install'>('demo');

  // Autofill Profile State (persisted in localStorage)
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('glitread_extension_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      firstName: 'Aarav',
      lastName: 'Sharma',
      email: 'aarav.sharma.dev@gmail.com',
      phone: '+91 98765 43210',
      location: 'Bangalore, India',
      portfolioUrl: 'https://glitread.app/p/aarav-sharma',
      linkedinUrl: 'https://linkedin.com/in/aarav-sharma-tech',
      githubUrl: 'https://github.com/aaravsharma',
      currentTitle: 'Full Stack Engineer',
      yearsOfExperience: '3',
      authorizedToWork: 'Yes',
      requireSponsorship: 'No',
      noticePeriod: 'Immediate',
      expectedSalary: '₹22,00,000',
      whyHireMe: '3+ years crafting scalable web microservices in React, TypeScript and Node.js. Passionate about sub-50ms latency and high-performance UI systems.',
    };
  });

  // Simulated Job Application Form State (in the live demo)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedinUrl: '',
    portfolioUrl: '',
    githubUrl: '',
    currentTitle: '',
    experience: '',
    authorizedToWork: '',
    requireSponsorship: '',
    coverNote: '',
  });

  const [isAutofilling, setIsAutofilling] = useState(false);
  const [filledFieldsCount, setFilledFieldsCount] = useState(0);
  const [autofillSuccess, setAutofillSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Sync profile data to localStorage
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('glitread_extension_profile', JSON.stringify(profileData));
    alert('Autofill profile saved successfully! Next time you trigger autofill, these values will be used.');
  };

  // Trigger simulated 1-click autofill with realistic animation
  const handleTriggerAutofill = () => {
    setIsAutofilling(true);
    setAutofillSuccess(false);

    // Progressive filling simulation
    const steps = [
      { key: 'firstName', value: profileData.firstName },
      { key: 'lastName', value: profileData.lastName },
      { key: 'email', value: profileData.email },
      { key: 'phone', value: profileData.phone },
      { key: 'location', value: profileData.location },
      { key: 'linkedinUrl', value: profileData.linkedinUrl },
      { key: 'portfolioUrl', value: profileData.portfolioUrl },
      { key: 'githubUrl', value: profileData.githubUrl },
      { key: 'currentTitle', value: profileData.currentTitle },
      { key: 'experience', value: profileData.yearsOfExperience },
      { key: 'authorizedToWork', value: profileData.authorizedToWork },
      { key: 'requireSponsorship', value: profileData.requireSponsorship },
      { key: 'coverNote', value: profileData.whyHireMe },
    ];

    let count = 0;
    steps.forEach((step, index) => {
      setTimeout(() => {
        setFormData((prev) => ({ ...prev, [step.key]: step.value }));
        count++;
        setFilledFieldsCount(count);

        if (index === steps.length - 1) {
          setIsAutofilling(false);
          setAutofillSuccess(true);
        }
      }, (index + 1) * 60);
    });
  };

  const handleResetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      linkedinUrl: '',
      portfolioUrl: '',
      githubUrl: '',
      currentTitle: '',
      experience: '',
      authorizedToWork: '',
      requireSponsorship: '',
      coverNote: '',
    });
    setFilledFieldsCount(0);
    setAutofillSuccess(false);
  };

  // Chrome Extension source codes for download / inspection
  const manifestJsonCode = JSON.stringify({
    manifest_version: 3,
    name: "Glitread 1-Click Job Application Autofill",
    version: "1.0.0",
    description: "Autofill job application forms on Greenhouse, Workday, Lever, Taleo, Ashby and custom career portals in 1 click using your Glitread resume and portfolio.",
    permissions: ["activeTab", "scripting", "storage"],
    action: {
      default_popup: "popup.html",
      default_icon: "icon.png"
    },
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["content.js"],
        run_at: "document_idle"
      }
    ]
  }, null, 2);

  const contentJsCode = `// Glitread Autofill Engine Content Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "AUTOFILL_APPLICATION") {
    const profile = request.profile;
    let filledCount = 0;

    const fieldMap = [
      { selectors: ['input[name*="first_name" i]', 'input[id*="first_name" i]', 'input[autocomplete="given-name"]'], val: profile.firstName },
      { selectors: ['input[name*="last_name" i]', 'input[id*="last_name" i]', 'input[autocomplete="family-name"]'], val: profile.lastName },
      { selectors: ['input[type="email"]', 'input[name*="email" i]', 'input[id*="email" i]'], val: profile.email },
      { selectors: ['input[type="tel"]', 'input[name*="phone" i]', 'input[id*="phone" i]'], val: profile.phone },
      { selectors: ['input[name*="linkedin" i]', 'input[id*="linkedin" i]'], val: profile.linkedinUrl },
      { selectors: ['input[name*="website" i]', 'input[name*="portfolio" i]', 'input[id*="portfolio" i]'], val: profile.portfolioUrl },
      { selectors: ['input[name*="github" i]', 'input[id*="github" i]'], val: profile.githubUrl },
      { selectors: ['textarea[name*="summary" i]', 'textarea[name*="cover" i]', 'textarea[id*="comments" i]'], val: profile.whyHireMe }
    ];

    fieldMap.forEach(item => {
      for (const sel of item.selectors) {
        const el = document.querySelector(sel);
        if (el && !el.value) {
          el.value = item.val;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          el.style.backgroundColor = '#EFF6FF';
          el.style.borderColor = '#2563EB';
          filledCount++;
          break;
        }
      }
    });

    sendResponse({ success: true, filledCount });
  }
});`;

  const popupHtmlCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { width: 320px; font-family: -apple-system, sans-serif; margin: 0; padding: 16px; background: #fff; color: #0f172a; }
    .header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
    .title { font-weight: 800; font-size: 14px; }
    .btn { width: 100%; background: #2563eb; color: #fff; border: none; padding: 10px; border-radius: 8px; font-weight: 700; cursor: pointer; }
    .btn:hover { background: #1d4ed8; }
    .stats { font-size: 11px; color: #64748b; margin-top: 8px; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <div style="font-weight:900;color:#2563eb;">glitread</div>
    <div class="title">Autofill Assistant</div>
  </div>
  <button id="autofillBtn" class="btn">⚡ Autofill Application Form</button>
  <div class="stats">Greenhouse • Workday • Lever • Ashby</div>
  <script src="popup.js"></script>
</body>
</html>`;

  // Download extension files as a bundle
  const handleDownloadExtension = () => {
    const files = [
      { name: 'manifest.json', content: manifestJsonCode },
      { name: 'content.js', content: contentJsCode },
      { name: 'popup.html', content: popupHtmlCode },
      {
        name: 'popup.js',
        content: `document.getElementById('autofillBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.storage.local.get(['profile'], (res) => {
    chrome.tabs.sendMessage(tab.id, { action: 'AUTOFILL_APPLICATION', profile: res.profile || {} });
  });
});`
      },
      {
        name: 'README.txt',
        content: `GLITREAD CHROME EXTENSION INSTALLATION:
1. Open Google Chrome, Brave, or Edge.
2. In the URL bar, go to: chrome://extensions
3. Enable the 'Developer mode' toggle in the top-right corner.
4. Click 'Load unpacked' button in the top-left.
5. Select this folder.
Done! The Glitread Autofill extension icon will now appear in your browser toolbar.`
      }
    ];

    // Trigger individual downloads or combined text
    files.forEach((file, idx) => {
      setTimeout(() => {
        const blob = new Blob([file.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `glitread-extension-${file.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, idx * 250);
    });

    alert('Extension files downloaded! Follow the 4-step guide on this page to load them unpacked into Chrome.');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24 pt-6">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Hero Banner */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/80 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold">
              <Chrome className="w-3.5 h-3.5 text-blue-600" />
              Chrome Extension • 1-Click Form Autofill
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              Stop Retyping Your Resume.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
                Autofill Job Applications in 1 Click.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Apply to 10x more jobs in half the time. The Glitread Chrome Extension seamlessly fills out job application forms across Greenhouse, Workday, Lever, Ashby, Taleo, and custom career sites using your verified Glitread portfolio and ATS resume.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('demo')}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                Try Live Interactive Demo
              </button>

              <button
                onClick={handleDownloadExtension}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Unpacked Extension
              </button>

              <button
                onClick={() => setActiveTab('install')}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                Installation Guide
              </button>
            </div>
          </div>

          {/* Supported ATS Badges */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-semibold text-slate-500">
            <span className="text-slate-400 font-medium">Compatible with:</span>
            {['Greenhouse', 'Workday', 'Lever', 'Ashby', 'BambooHR', 'Taleo', 'Indeed Easy Apply', 'Custom Forms'].map((badge) => (
              <span key={badge} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200/60">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('demo')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'demo'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Zap className="w-4 h-4" />
            Interactive Autofill Playground
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Autofill Profile Data
          </button>

          <button
            onClick={() => setActiveTab('install')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'install'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Laptop className="w-4 h-4" />
            Install in Chrome / Brave
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Code className="w-4 h-4" />
            Extension Source Code
          </button>
        </div>

        {/* TAB 1: INTERACTIVE LIVE AUTOFILL PLAYGROUND */}
        {activeTab === 'demo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Simulated ATS Job Application Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      LIVE ATS SIMULATOR
                    </span>
                    <span className="text-xs text-slate-400">Greenhouse / Workday Preview</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1 font-display">
                    Job Application: Senior Frontend Engineer
                  </h3>
                </div>

                <button
                  onClick={handleResetForm}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Clear all fields to test autofill again"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Form
                </button>
              </div>

              {autofillSuccess && (
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-3 text-xs text-blue-900 font-semibold animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span><strong>13 fields auto-filled!</strong> All information synchronized with Glitread profile.</span>
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                    Speed: 0.42s
                  </span>
                </div>
              )}

              {/* Real form inputs simulating a company's job application */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. Aarav"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 transition-all ${
                        formData.firstName ? 'bg-blue-50/60 border-blue-400 font-medium' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 transition-all ${
                        formData.lastName ? 'bg-blue-50/60 border-blue-400 font-medium' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@email.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 transition-all ${
                        formData.email ? 'bg-blue-50/60 border-blue-400 font-medium' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 ..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 transition-all ${
                        formData.phone ? 'bg-blue-50/60 border-blue-400 font-medium' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Location / City *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Bangalore, India"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 transition-all ${
                      formData.location ? 'bg-blue-50/60 border-blue-400 font-medium' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Portfolio Website URL *</label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="https://glitread.app/p/yourname"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 transition-all ${
                        formData.portfolioUrl ? 'bg-blue-50/60 border-blue-400 font-medium' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Profile URL *</label>
                    <input
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 transition-all ${
                        formData.linkedinUrl ? 'bg-blue-50/60 border-blue-400 font-medium' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">GitHub / Code Repository URL</label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 transition-all ${
                        formData.githubUrl ? 'bg-blue-50/60 border-blue-400 font-medium' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Total Years of Experience</label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="e.g. 3"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 transition-all ${
                        formData.experience ? 'bg-blue-50/60 border-blue-400 font-medium' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Legally Authorized to Work?</label>
                    <input
                      type="text"
                      value={formData.authorizedToWork}
                      onChange={(e) => setFormData({ ...formData, authorizedToWork: e.target.value })}
                      placeholder="Yes / No"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 transition-all ${
                        formData.authorizedToWork ? 'bg-blue-50/60 border-blue-400 font-medium' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Requires Visa Sponsorship?</label>
                    <input
                      type="text"
                      value={formData.requireSponsorship}
                      onChange={(e) => setFormData({ ...formData, requireSponsorship: e.target.value })}
                      placeholder="No / Yes"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 transition-all ${
                        formData.requireSponsorship ? 'bg-blue-50/60 border-blue-400 font-medium' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Why are you a great fit for this role?</label>
                  <textarea
                    rows={3}
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    placeholder="Brief self introduction..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 transition-all ${
                      formData.coverNote ? 'bg-blue-50/60 border-blue-400 font-medium' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {filledFieldsCount} of 13 fields filled
                </span>
                <button
                  type="button"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Submit Application (Demo)
                </button>
              </div>
            </div>

            {/* Right Column: Simulated Chrome Extension Floating Popup (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Chrome Extension Widget Mockup */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-blue-500/80 p-5 sm:p-6 shadow-xl relative overflow-hidden">
                {/* Header bar styled like Chrome Extension popup */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <img
                      src="/glitread-logo.svg"
                      alt="Glitread"
                      className="w-5 h-5 object-contain"
                    />
                    <span className="font-extrabold text-sm text-slate-900 font-display">
                      glitread
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                      Extension v1.0
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Greenhouse Detected
                  </span>
                </div>

                {/* Candidate Info Connected */}
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-extrabold text-xs text-slate-900 truncate">
                      {profileData.firstName} {profileData.lastName}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {profileData.currentTitle} • {profileData.location}
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="mt-5 space-y-2">
                  <button
                    onClick={handleTriggerAutofill}
                    disabled={isAutofilling}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className={`w-4 h-4 ${isAutofilling ? 'animate-spin' : ''}`} />
                    {isAutofilling ? 'Auto-filling form fields...' : '⚡ Autofill Application Form'}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    Click above to watch the form on the left fill automatically!
                  </p>
                </div>

                {/* Quick Copy Shortcuts inside Extension */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Quick-Copy Shortcuts
                  </span>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <span className="text-slate-600 font-medium truncate max-w-[200px]">
                        🌐 Portfolio: {profileData.portfolioUrl}
                      </span>
                      <button
                        onClick={() => copyToClipboard(profileData.portfolioUrl, 'portfolio')}
                        className="text-blue-600 font-bold hover:underline shrink-0 text-[11px]"
                      >
                        {copiedCode === 'portfolio' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <span className="text-slate-600 font-medium truncate max-w-[200px]">
                        💼 LinkedIn: {profileData.linkedinUrl}
                      </span>
                      <button
                        onClick={() => copyToClipboard(profileData.linkedinUrl, 'linkedin')}
                        className="text-blue-600 font-bold hover:underline shrink-0 text-[11px]"
                      >
                        {copiedCode === 'linkedin' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <span className="text-slate-600 font-medium truncate max-w-[200px]">
                        📝 Bio / Why Hire Me note
                      </span>
                      <button
                        onClick={() => copyToClipboard(profileData.whyHireMe, 'whyHireMe')}
                        className="text-blue-600 font-bold hover:underline shrink-0 text-[11px]"
                      >
                        {copiedCode === 'whyHireMe' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer link to adjust settings */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Stored locally on device
                  </span>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="text-blue-600 font-bold hover:underline text-[11px]"
                  >
                    Edit Profile Data →
                  </button>
                </div>
              </div>

              {/* Feature Highlights Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3">
                <h4 className="font-extrabold text-sm text-slate-900 font-display">
                  Why use the Glitread Extension?
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Save 15 minutes per job:</strong> Fills 12-20 standard questions in under 1 second.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Always up-to-date:</strong> Directly syncs with your Glitread ATS Resume & Portfolio handle.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>100% Private:</strong> Does not send your credentials to any third-party telemetry.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PROFILE DATA & FIELD MAPPING */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-display">
                Autofill Profile Configuration
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Configure the exact values the Chrome extension will use when auto-filling forms across different job sites.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location (City, Country)</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Portfolio Link</label>
                  <input
                    type="url"
                    value={profileData.portfolioUrl}
                    onChange={(e) => setProfileData({ ...profileData, portfolioUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={profileData.linkedinUrl}
                    onChange={(e) => setProfileData({ ...profileData, linkedinUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">GitHub Profile</label>
                  <input
                    type="url"
                    value={profileData.githubUrl}
                    onChange={(e) => setProfileData({ ...profileData, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Job Title</label>
                  <input
                    type="text"
                    value={profileData.currentTitle}
                    onChange={(e) => setProfileData({ ...profileData, currentTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Default Pitch / Why Hire Me</label>
                <textarea
                  rows={3}
                  value={profileData.whyHireMe}
                  onChange={(e) => setProfileData({ ...profileData, whyHireMe: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('demo')}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Test in Demo
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer"
                >
                  Save Profile Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: INSTALLATION GUIDE */}
        {activeTab === 'install' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900 font-display">
                How to Install the Extension in 4 Simple Steps
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                You can install the Glitread extension in any Chromium browser (Google Chrome, Brave, Microsoft Edge, Arc) in under 60 seconds.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                    1
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">Download Extension Files</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Click the download button below to save the extension bundle containing the Manifest V3 and content script files.
                  </p>
                  <button
                    onClick={handleDownloadExtension}
                    className="mt-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Now
                  </button>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                    2
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">Open chrome://extensions</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Open a new tab in your browser and type <code className="bg-white px-1.5 py-0.5 rounded border text-[11px] font-mono text-blue-700">chrome://extensions</code> in the URL address bar, then press Enter.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                    3
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">Enable Developer Mode</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In the top-right corner of the Extensions page, toggle the <strong>Developer mode</strong> switch to ON.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                    4
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">Click "Load unpacked"</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Click the <strong>Load unpacked</strong> button on the top-left and select the downloaded folder. The Glitread icon will appear in your browser toolbar!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXTENSION SOURCE CODE */}
        {activeTab === 'code' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 font-display">
                    Extension Source Files (Manifest V3)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Transparent, open source Chrome Extension codebase.
                  </p>
                </div>

                <button
                  onClick={handleDownloadExtension}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Bundle
                </button>
              </div>

              {/* Code blocks */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex items-center justify-between pb-1.5">
                    <span className="text-xs font-mono font-bold text-slate-700">manifest.json</span>
                    <button
                      onClick={() => copyToClipboard(manifestJsonCode, 'manifest')}
                      className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                    >
                      {copiedCode === 'manifest' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedCode === 'manifest' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-900 text-slate-200 text-xs font-mono rounded-xl overflow-x-auto max-h-60">
                    {manifestJsonCode}
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between pb-1.5">
                    <span className="text-xs font-mono font-bold text-slate-700">content.js (Form Field Detection & Autofill)</span>
                    <button
                      onClick={() => copyToClipboard(contentJsCode, 'content')}
                      className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                    >
                      {copiedCode === 'content' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedCode === 'content' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-900 text-slate-200 text-xs font-mono rounded-xl overflow-x-auto max-h-60">
                    {contentJsCode}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
