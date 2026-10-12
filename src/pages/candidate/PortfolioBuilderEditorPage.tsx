import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  RotateCw,
  UploadCloud,
  Search,
  Type,
  Heading as HeadingIcon,
  Image as ImageIcon,
  MousePointerClick,
  Minus,
  MoveVertical,
  Box,
  Columns,
  Grid,
  SquareDashed,
  User,
  LayoutGrid,
  Briefcase,
  GraduationCap,
  Star,
  Award,
  Trophy,
  FileText,
  Mail,
  Share2,
  Video,
  Move,
  Link2,
  Copy,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  MapPin,
  Download,
  ArrowRight,
  ExternalLink,
  Check,
  X,
  Code2,
  Shield,
  Palette,
  Tag,
  Sparkles,
  Send,
  Quote,
  Music,
  Calendar,
  TrendingUp,
  FolderKanban,
  ListCollapse,
  Inbox,
  Layers,
  Plus
} from 'lucide-react';

export const PortfolioBuilderEditorPage: React.FC = () => {
  const navigate = useNavigate();

  // Top bar states
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullPreview, setIsFullPreview] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [usernameHandle, setUsernameHandle] = useState('alex-carter');

  // Left sidebar states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'pages' | 'sections'>('pages');
  const [sectionSearch, setSectionSearch] = useState('');

  // Pages state
  const [pagesList, setPagesList] = useState([
    { id: 'home', title: 'Home (Portfolio)', slug: '/', isDefault: true },
    { id: 'projects', title: 'Projects Showcase', slug: '/projects', isDefault: false },
    { id: 'about', title: 'About & Bio', slug: '/about', isDefault: false },
    { id: 'contact', title: 'Contact & Hire', slug: '/contact', isDefault: false },
  ]);
  const [activePageId, setActivePageId] = useState('home');

  // Right sidebar tab state
  const [inspectorTab, setInspectorTab] = useState<'style' | 'content' | 'advanced'>('style');
  const [bgType, setBgType] = useState<'color' | 'image' | 'gradient'>('color');
  const [sectionBgColor, setSectionBgColor] = useState('#f8fafc');
  const [sectionWidth, setSectionWidth] = useState('Full Width');
  
  // Padding & Margin states
  const [paddingTop, setPaddingTop] = useState(80);
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(80);
  const [paddingLeft, setPaddingLeft] = useState(0);

  const [marginTop, setMarginTop] = useState(0);
  const [marginRight, setMarginRight] = useState(0);
  const [marginBottom, setMarginBottom] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);

  const [borderRadius, setBorderRadius] = useState(12);
  const [layoutStyle, setLayoutStyle] = useState('Default');

  // Selected element / section for toolbar
  const [selectedSection, setSelectedSection] = useState<'hero' | 'about' | 'skills' | 'projects' | 'experience'>('hero');

  // Collapsible accordion in right sidebar
  const [borderExpanded, setBorderExpanded] = useState(false);
  const [shadowExpanded, setShadowExpanded] = useState(false);

  // Undo / Redo history
  const [historyCount, setHistoryCount] = useState(1);

  const handleSave = () => {
    setSaveToast('Saved changes successfully!');
    setTimeout(() => setSaveToast(null), 2500);
  };

  const handleInsertSection = (name: string) => {
    setSaveToast(`Added "${name}" section to canvas`);
    setTimeout(() => setSaveToast(null), 2500);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden select-none">
      
      {/* =========================================================================
          1. TOP NAVIGATION BAR (Strictly matching image)
          ========================================================================= */}
      <header className="h-[64px] bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 z-40">
        
        {/* Left: Back to Templates */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/portfolio"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Templates</span>
          </Link>
        </div>

        {/* Center: Device Toggle Pill */}
        <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            title="Desktop view"
            className={`p-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'desktop'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('tablet')}
            title="Tablet view"
            className={`p-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'tablet'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            title="Mobile view"
            className={`p-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'mobile'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Undo, Redo, Save, Preview, Publish */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {saveToast && (
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              {saveToast}
            </span>
          )}

          {/* Undo */}
          <button
            type="button"
            onClick={() => setHistoryCount(prev => Math.max(0, prev - 1))}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            title="Undo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Redo */}
          <button
            type="button"
            onClick={() => setHistoryCount(prev => prev + 1)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            title="Redo"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Save */}
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            Save
          </button>

          {/* Preview */}
          <button
            type="button"
            onClick={() => setIsFullPreview(!isFullPreview)}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            Preview
          </button>

          {/* Publish */}
          <button
            type="button"
            onClick={() => setPublishModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1565ED] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Publish</span>
          </button>
        </div>

      </header>

      {/* =========================================================================
          2. WORKSPACE CONTAINER (Left Sidebar + Center Canvas + Right Inspector)
          ========================================================================= */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* -----------------------------------------------------------------------
            LEFT SIDEBAR: ELEMENTS (Strictly matching screenshot)
           ----------------------------------------------------------------------- */}
        {!isFullPreview && (
          <aside className={`${isSidebarCollapsed ? 'w-[64px]' : 'w-[290px]'} bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 z-30 transition-all duration-200`}>
            
            {/* Top Tabs / Search / Collapse Header */}
            <div className={`border-b border-slate-100 ${isSidebarCollapsed ? 'p-3 flex flex-col items-center gap-2' : 'p-4 space-y-3'}`}>
              {isSidebarCollapsed ? (
                <button
                  type="button"
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  title="Expand sidebar"
                  aria-label="Expand sidebar"
                >
                  <PanelLeftOpen className="w-5 h-5 text-blue-600" />
                </button>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setSidebarTab('pages')}
                        className={`text-xs font-extrabold pb-1.5 relative transition-colors ${
                          sidebarTab === 'pages'
                            ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        Pages
                      </button>
                      <button
                        type="button"
                        onClick={() => setSidebarTab('sections')}
                        className={`text-xs font-extrabold pb-1.5 relative transition-colors ${
                          sidebarTab === 'sections'
                            ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        Sections
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setIsSidebarCollapsed(true)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        title="Collapse sidebar"
                        aria-label="Collapse sidebar"
                      >
                        <PanelLeftClose className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Search Box for Sections */}
                  {sidebarTab === 'sections' && (
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={sectionSearch}
                        onChange={(e) => setSectionSearch(e.target.value)}
                        placeholder="Search sections..."
                        className="w-full pl-9 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                      {sectionSearch && (
                        <button
                          type="button"
                          onClick={() => setSectionSearch('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Pages / Sections Body */}
            <div className={`flex-1 overflow-y-auto text-left ${isSidebarCollapsed ? 'p-2 space-y-3 flex flex-col items-center' : 'p-4 space-y-4'}`}>
              
              {/* COLLAPSED MODE: Slim Icon Rail */}
              {isSidebarCollapsed ? (
                <div className="flex flex-col items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSidebarTab('pages');
                      setIsSidebarCollapsed(false);
                    }}
                    className={`p-2.5 rounded-xl transition-all ${
                      sidebarTab === 'pages'
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    title="Pages (Click to expand)"
                  >
                    <FileText className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSidebarTab('sections');
                      setIsSidebarCollapsed(false);
                    }}
                    className={`p-2.5 rounded-xl transition-all ${
                      sidebarTab === 'sections'
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    title="Sections (Click to expand)"
                  >
                    <Layers className="w-5 h-5" />
                  </button>

                  <div className="w-6 h-px bg-slate-200 my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsSidebarCollapsed(false);
                    }}
                    className="p-2.5 rounded-xl text-blue-600 hover:bg-blue-50 transition-all"
                    title="Add block"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ) : sidebarTab === 'pages' ? (
                /* PAGES TAB CONTENT */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-bold text-slate-800">Your Pages</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newPageNum = pagesList.length + 1;
                        setPagesList(prev => [
                          ...prev,
                          {
                            id: `page-${newPageNum}`,
                            title: `New Page ${newPageNum}`,
                            slug: `/page-${newPageNum}`,
                            isDefault: false
                          }
                        ]);
                        setSaveToast('Created new page');
                        setTimeout(() => setSaveToast(null), 2000);
                      }}
                      className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Page</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {pagesList.map((page) => (
                      <div
                        key={page.id}
                        onClick={() => setActivePageId(page.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          activePageId === page.id
                            ? 'bg-blue-50/70 border-blue-300 text-blue-900 shadow-2xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className={`w-4 h-4 ${activePageId === page.id ? 'text-blue-600' : 'text-slate-400'}`} />
                          <div>
                            <p className="text-xs font-bold leading-tight">{page.title}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{page.slug}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {page.isDefault && (
                            <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                              Main
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSaveToast(`Duplicated ${page.title}`);
                              setTimeout(() => setSaveToast(null), 2000);
                            }}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded"
                            title="Duplicate page"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* SECTIONS TAB CONTENT */
                <div className="space-y-4">
                  <span className="text-xs font-extrabold text-slate-900 block">
                    Pre-built Sections
                  </span>
                  <div className="space-y-2.5">
                    {[
                      { name: 'Hero Header Minimal', desc: 'Heading, subtext, CTA & avatar' },
                      { name: 'Experience Timeline', desc: 'Chronological career milestones' },
                      { name: 'Projects Grid 2x2', desc: 'Case study cards with tags & links' },
                      { name: 'Skills & Tech Stack', desc: 'Pill chips with category groups' },
                      { name: 'Testimonials Slider', desc: 'Client endorsements & quotes' },
                      { name: 'Contact & Hire Form', desc: 'Direct message submission form' },
                    ]
                      .filter(sec => !sectionSearch.trim() || sec.name.toLowerCase().includes(sectionSearch.toLowerCase()) || sec.desc.toLowerCase().includes(sectionSearch.toLowerCase()))
                      .map((sec) => (
                      <div
                        key={sec.name}
                        onClick={() => handleInsertSection(sec.name)}
                        className="p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <h6 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {sec.name}
                          </h6>
                          <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{sec.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Visual Hint Card (Strictly matching screenshot) */}
            <div className={`transition-all ${isSidebarCollapsed ? 'p-2' : 'p-3.5 m-3 bg-[#EEF5FF] border border-blue-100 rounded-2xl text-left'}`}>
              {isSidebarCollapsed ? (
                <div
                  className="w-10 h-10 mx-auto rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => setIsSidebarCollapsed(false)}
                  title="Click to expand elements"
                >
                  <Move className="w-4 h-4" />
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Move className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-tight">Drag & Drop</h5>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                      Pick an element from the left panel and drop it onto your page.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </aside>
        )}

        {/* -----------------------------------------------------------------------
            CENTER: PORTFOLIO CANVAS (Strictly matching screenshot)
           ----------------------------------------------------------------------- */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-start justify-center bg-[#F1F5F9]">
          
          <div
            className={`w-full bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden transition-all duration-300 ${
              deviceMode === 'desktop'
                ? 'max-w-[1040px]'
                : deviceMode === 'tablet'
                ? 'max-w-[768px]'
                : 'max-w-[390px]'
            }`}
          >
            
            {/* 1. Canvas Top Nav Bar */}
            <div className="py-4 px-6 sm:px-10 border-b border-slate-100 flex items-center justify-between text-xs font-semibold bg-white">
              {/* Origami/triangle blue geometric logo */}
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-7 h-7 flex items-center justify-center">
                  <svg viewBox="0 0 32 32" className="w-7 h-7 text-[#1565ED]" fill="currentColor">
                    <polygon points="16,4 4,28 16,22" fill="#1565ED" />
                    <polygon points="16,4 28,28 16,22" fill="#0E56D6" />
                    <polygon points="16,14 10,24 22,24" fill="#3B82F6" opacity="0.4" />
                  </svg>
                </div>
              </div>

              {/* Navigation links */}
              <div className="hidden sm:flex items-center gap-6 text-[13px] text-slate-600 font-medium">
                <span className="text-slate-900 font-bold cursor-pointer">Home</span>
                <span className="hover:text-blue-600 cursor-pointer">About</span>
                <span className="hover:text-blue-600 cursor-pointer">Skills</span>
                <span className="hover:text-blue-600 cursor-pointer">Projects</span>
                <span className="hover:text-blue-600 cursor-pointer">Experience</span>
                <span className="hover:text-blue-600 cursor-pointer">Education</span>
                <span className="hover:text-blue-600 cursor-pointer">Contact</span>
              </div>

              {/* Download CV CTA */}
              <div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-[#1565ED] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Download CV
                </button>
              </div>
            </div>

            {/* 2. Hero Section (CURRENTLY SELECTED in screenshot!) */}
            <section
              onClick={() => setSelectedSection('hero')}
              style={{
                backgroundColor: sectionBgColor,
                paddingTop: `${paddingTop}px`,
                paddingBottom: `${paddingBottom}px`,
                paddingLeft: `${paddingLeft || 40}px`,
                paddingRight: `${paddingRight || 40}px`,
                borderRadius: `${borderRadius}px`,
              }}
              className="relative transition-all cursor-pointer border-2 border-blue-500 m-4 rounded-2xl"
            >
              {/* Floating Top-Left Blue Toolbar Badge (Strictly matching screenshot) */}
              <div className="absolute -top-3.5 left-4 z-30 bg-[#1565ED] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <Move className="w-3 h-3 text-white" />
                  <span>Section</span>
                </div>
                <span className="text-blue-300">|</span>
                <button type="button" className="hover:text-blue-200 cursor-pointer" title="Link">
                  <Link2 className="w-3 h-3" />
                </button>
                <button type="button" className="hover:text-blue-200 cursor-pointer" title="Duplicate">
                  <Copy className="w-3 h-3" />
                </button>
                <button type="button" className="hover:text-rose-200 cursor-pointer" title="Delete">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
                
                {/* Hero Left Content */}
                <div className="md:col-span-7 space-y-4">
                  {/* Hello, I'm Pill Badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                    Hello, I'm
                  </div>

                  {/* Name & Title */}
                  <div className="space-y-1">
                    <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                      Alex Carter
                    </h1>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1565ED] tracking-tight">
                      Full Stack Developer
                    </h2>
                  </div>

                  {/* Subtitle */}
                  <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
                    I build modern web applications with clean code and great user experiences.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded-full bg-[#1565ED] hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
                    >
                      <span>View My Work</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold shadow-2xs flex items-center gap-2 transition-all"
                    >
                      <span>Contact Me</span>
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                  </div>

                  {/* Social Icons */}
                  <div className="flex items-center gap-4 pt-3 text-slate-800">
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Hero Right: Photo with doodle accents & Turning ideas into reality */}
                <div className="md:col-span-5 relative flex items-center justify-center">
                  
                  {/* Blue doodle accents above head */}
                  <div className="absolute top-2 left-10 text-blue-500 font-bold text-sm tracking-widest select-none">
                    \ | /
                  </div>
                  <div className="absolute top-6 right-16 text-blue-500 font-bold text-xs select-none">
                    / \
                  </div>

                  {/* Cutout / framed photo of Alex */}
                  <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-3xl overflow-hidden bg-gradient-to-t from-slate-200 to-slate-100 shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600"
                      alt="Alex Carter"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Turning ideas into reality with hand-drawn arrow */}
                  <div className="absolute -right-4 sm:-right-8 top-14 text-left pointer-events-none hidden sm:block">
                    <span className="font-handwriting font-bold text-sm text-[#1565ED] block transform rotate-6" style={{ fontFamily: 'cursive' }}>
                      Turning ideas <br />
                      into reality
                    </span>
                    <svg className="w-10 h-10 text-[#1565ED] mt-1 transform -rotate-12" viewBox="0 0 50 50" fill="none">
                      <path d="M40 5 C30 25, 15 25, 5 35" stroke="#1565ED" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M5 35 L12 32 M5 35 L8 42" stroke="#1565ED" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>

                </div>

              </div>
            </section>

            {/* 3. About Me Section */}
            <section
              onClick={() => setSelectedSection('about')}
              className="p-6 sm:p-10 border-t border-slate-100 text-left relative hover:border-blue-300 transition-colors"
            >
              {/* Floating Toolbar Badge */}
              <div className="absolute -top-3 left-6 z-20 bg-[#1565ED] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow flex items-center gap-2">
                <span>✥ Text</span>
                <span className="text-blue-300">|</span>
                <Link2 className="w-2.5 h-2.5" />
                <Copy className="w-2.5 h-2.5" />
                <Trash2 className="w-2.5 h-2.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* About Left */}
                <div className="md:col-span-6 space-y-3.5">
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    About Me
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    I'm a passionate Full Stack Developer with experience in building web applications using modern technologies. I love turning ideas into real products.
                  </p>

                  {/* Details grid: Location, Email, Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold text-slate-900 block leading-tight">Location</span>
                        <span className="text-[10px] text-slate-500">Bangalore, India</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold text-slate-900 block leading-tight">Email</span>
                        <span className="text-[10px] text-slate-500">alex@example.com</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Briefcase className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold text-slate-900 block leading-tight">Experience</span>
                        <span className="text-[10px] text-slate-500">1+ Years</span>
                      </div>
                    </div>
                  </div>

                  {/* Download Resume Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      className="px-5 py-2 rounded-full bg-[#1565ED] hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Resume</span>
                    </button>
                  </div>
                </div>

                {/* About Right: Laptop Workspace Photo */}
                <div className="md:col-span-6">
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=700"
                      alt="Modern Workspace"
                      className="w-full h-56 object-cover"
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* 4. My Skills Section */}
            <section
              onClick={() => setSelectedSection('skills')}
              className="p-6 sm:p-10 border-t border-slate-100 text-left relative"
            >
              {/* Floating Toolbar Badge */}
              <div className="absolute -top-3 left-6 z-20 bg-[#1565ED] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow flex items-center gap-2">
                <span>✥ Skills</span>
                <span className="text-blue-300">|</span>
                <Link2 className="w-2.5 h-2.5" />
                <Copy className="w-2.5 h-2.5" />
                <Trash2 className="w-2.5 h-2.5" />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-5">
                My Skills
              </h2>

              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'HTML', icon: Code2 },
                  { name: 'CSS', icon: Shield },
                  { name: 'JavaScript', icon: Code2 },
                  { name: 'React', icon: LayoutGrid },
                  { name: 'Node.js', icon: Box },
                  { name: 'MongoDB', icon: Star },
                ].map((s) => {
                  const IconComp = s.icon;
                  return (
                    <div
                      key={s.name}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white shadow-2xs hover:border-blue-400 transition-colors"
                    >
                      <IconComp className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-xs font-semibold text-slate-800">{s.name}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 5. Projects Section (3 Cards) */}
            <section
              onClick={() => setSelectedSection('projects')}
              className="p-6 sm:p-10 border-t border-slate-100 text-left"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Projects
                </h2>
                <span className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer">
                  View All →
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Project 1 */}
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
                    alt="E-Commerce Website"
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                      E-Commerce Website
                    </h4>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">React</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">Node.js</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">MongoDB</span>
                    </div>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
                    alt="Task Management App"
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                      Task Management App
                    </h4>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">React</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">Firebase</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">Tailwind</span>
                    </div>
                  </div>
                </div>

                {/* Project 3 - Mountain Landscape matching screenshot */}
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600"
                    alt="Portfolio Website"
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                      Portfolio Website
                    </h4>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">HTML</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">CSS</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">JavaScript</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Experience & Education 2-Column Section (Matching Screenshot) */}
            <section
              onClick={() => setSelectedSection('experience')}
              className="p-6 sm:p-10 border-t border-slate-100 text-left bg-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Left Column: Experience */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <h3 className="font-extrabold text-base text-slate-900">Experience</h3>
                  </div>

                  <div className="relative pl-6 border-l-2 border-blue-500 space-y-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 absolute -left-[5px] top-1.5" />
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">Software Engineer</h4>
                      <span className="text-[11px] text-slate-400 font-semibold">2021 – Present</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium block">TechNova Solutions</span>
                    <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4 pt-1">
                      <li>Developed and maintained web applications using React and Node.js.</li>
                      <li>Collaborated with cross-functional teams to deliver high-quality products.</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Education */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <h3 className="font-extrabold text-base text-slate-900">Education</h3>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-900">B.E. Computer Science</h4>
                        <span className="text-[11px] text-slate-400 font-semibold">2018 – 2022</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Visvesvaraya Technological University</span>
                        <span className="font-semibold text-slate-600">CGPA: 8.4/10</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

          </div>

        </main>

        {/* -----------------------------------------------------------------------
            RIGHT SIDEBAR: CONTEXTUAL INSPECTOR (Strictly matching screenshot)
           ----------------------------------------------------------------------- */}
        {!isFullPreview && (
          <aside className="w-[300px] bg-white border-l border-slate-200 flex flex-col justify-between shrink-0 text-slate-800 z-30 text-left">
            
            {/* Header Tabs: Style, Content, Advanced */}
            <div className="p-3 px-4 border-b border-slate-100 flex items-center justify-between text-xs font-bold">
              <button
                type="button"
                onClick={() => setInspectorTab('style')}
                className={`pb-1.5 transition-colors relative cursor-pointer ${
                  inspectorTab === 'style'
                    ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Style
              </button>
              <button
                type="button"
                onClick={() => setInspectorTab('content')}
                className={`pb-1.5 transition-colors relative cursor-pointer ${
                  inspectorTab === 'content'
                    ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Content
              </button>
              <button
                type="button"
                onClick={() => setInspectorTab('advanced')}
                className={`pb-1.5 transition-colors relative cursor-pointer ${
                  inspectorTab === 'advanced'
                    ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Advanced
              </button>
            </div>

            {/* Inspector Controls Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              
              {/* Section Header Accordion (Square icon + Section + Chevron Up) */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border border-blue-400 flex items-center justify-center text-blue-600 font-bold text-[10px]">
                    ◫
                  </div>
                  <span className="font-extrabold text-sm text-slate-900">Section</span>
                </div>
                <ChevronUp className="w-4 h-4 text-slate-400" />
              </div>

              {/* Background Control Group */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900 block">
                  Background
                </label>
                
                {/* 3 Pills: Color, Image, Gradient */}
                <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-100 rounded-lg text-[11px] font-semibold text-center">
                  <button
                    type="button"
                    onClick={() => setBgType('color')}
                    className={`py-1.5 rounded-md transition-all ${
                      bgType === 'color' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-600'
                    }`}
                  >
                    Color
                  </button>
                  <button
                    type="button"
                    onClick={() => setBgType('image')}
                    className={`py-1.5 rounded-md transition-all ${
                      bgType === 'image' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-600'
                    }`}
                  >
                    Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setBgType('gradient')}
                    className={`py-1.5 rounded-md transition-all ${
                      bgType === 'gradient' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-600'
                    }`}
                  >
                    Gradient
                  </button>
                </div>

                {/* Hex Color Input Swatch */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-7 h-7 rounded-lg border border-slate-200 bg-[#f8fafc] shadow-2xs" />
                  <input
                    type="text"
                    value={sectionBgColor}
                    onChange={(e) => setSectionBgColor(e.target.value)}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Width Control Group */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 block">
                  Width
                </label>
                <div className="relative">
                  <select
                    value={sectionWidth}
                    onChange={(e) => setSectionWidth(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 appearance-none focus:outline-none"
                  >
                    <option>Full Width</option>
                    <option>Boxed (Container)</option>
                    <option>Custom Width</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Padding Control Group (4 boxes with link icon) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900">
                    Padding
                  </label>
                  <Link2 className="w-3.5 h-3.5 text-blue-600 cursor-pointer" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Top */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Top</span>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                      <input
                        type="number"
                        value={paddingTop}
                        onChange={(e) => setPaddingTop(Number(e.target.value))}
                        className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 flex items-center">px ⌄</span>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Right</span>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                      <input
                        type="number"
                        value={paddingRight}
                        onChange={(e) => setPaddingRight(Number(e.target.value))}
                        className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 flex items-center">px ⌄</span>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Bottom</span>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                      <input
                        type="number"
                        value={paddingBottom}
                        onChange={(e) => setPaddingBottom(Number(e.target.value))}
                        className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 flex items-center">px ⌄</span>
                    </div>
                  </div>

                  {/* Left */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Left</span>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                      <input
                        type="number"
                        value={paddingLeft}
                        onChange={(e) => setPaddingLeft(Number(e.target.value))}
                        className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 flex items-center">px ⌄</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Margin Control Group (4 boxes with link icon) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900">
                    Margin
                  </label>
                  <Link2 className="w-3.5 h-3.5 text-blue-600 cursor-pointer" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Top */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Top</span>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                      <input
                        type="number"
                        value={marginTop}
                        onChange={(e) => setMarginTop(Number(e.target.value))}
                        className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 flex items-center">px ⌄</span>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Right</span>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                      <input
                        type="number"
                        value={marginRight}
                        onChange={(e) => setMarginRight(Number(e.target.value))}
                        className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 flex items-center">px ⌄</span>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Bottom</span>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                      <input
                        type="number"
                        value={marginBottom}
                        onChange={(e) => setMarginBottom(Number(e.target.value))}
                        className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 flex items-center">px ⌄</span>
                    </div>
                  </div>

                  {/* Left */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Left</span>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                      <input
                        type="number"
                        value={marginLeft}
                        onChange={(e) => setMarginLeft(Number(e.target.value))}
                        className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 flex items-center">px ⌄</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Border Radius Slider with "12 px" */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Border Radius</span>
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-[11px]">
                    <span className="font-bold">{borderRadius}</span>
                    <span className="text-slate-400">px</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Layout Dropdown */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-slate-900 block">
                  Layout
                </label>
                <div className="relative">
                  <select
                    value={layoutStyle}
                    onChange={(e) => setLayoutStyle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 appearance-none focus:outline-none"
                  >
                    <option>Default</option>
                    <option>Centered</option>
                    <option>Split 50/50</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Collapsible: Border */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setBorderExpanded(!borderExpanded)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <SquareDashed className="w-3.5 h-3.5 text-slate-500" />
                    <span>Border</span>
                  </div>
                  {borderExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Collapsible: Shadow */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShadowExpanded(!shadowExpanded)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Box className="w-3.5 h-3.5 text-slate-500" />
                    <span>Shadow</span>
                  </div>
                  {shadowExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>

          </aside>
        )}

      </div>

      {/* =========================================================================
          3. PUBLISH MODAL
          ========================================================================= */}
      {publishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 text-slate-900 text-left space-y-5 animate-scale-up">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base tracking-tight text-slate-900">
                    Publish Your Portfolio
                  </h3>
                  <p className="text-xs text-slate-500">
                    Get a live shareable URL for jobs and recruiters
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPublishModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Custom Handle Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Custom Portfolio Username
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus-within:border-blue-500 focus-within:bg-white transition-all">
                <span className="text-slate-400 font-semibold select-none">
                  glitread.app/u/
                </span>
                <input
                  type="text"
                  value={usernameHandle}
                  onChange={(e) => setUsernameHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  className="w-full bg-transparent font-bold text-slate-900 focus:outline-none ml-0.5"
                />
              </div>
              <span className="text-[11px] text-slate-400">
                Letters, numbers, and dashes only.
              </span>
            </div>

            {/* Published URL Display Card */}
            <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl space-y-2">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                Live Portfolio Link
              </span>
              <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-blue-200">
                <span className="text-xs font-bold text-blue-600 truncate">
                  https://glitread.app/u/{usernameHandle}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://glitread.app/u/${usernameHandle}`);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white rounded text-[11px] font-bold text-slate-700 transition-colors flex items-center gap-1 shrink-0"
                >
                  {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSaveToast('Portfolio published!');
                  setPublishModalOpen(false);
                }}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Publish Portfolio</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
