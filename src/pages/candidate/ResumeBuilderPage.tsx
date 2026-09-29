import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ResumeData, ATSAnalysisResult, ResumeSectionId, ResumeTemplateId, ResumeFontFamily, ResumeSpacing, ResumeAccentColor } from '../../types/resume';
import {
  createDefaultResumeData,
  getUserResumeById,
  saveResume,
  listUserResumes,
  deleteResume,
  duplicateResume,
} from '../../services/resumeService';
import { importProfileToResume } from '../../services/profileService';
import { calculateATSScore } from '../../services/atsAnalysisService';
import { ResumeHeader } from '../../components/resume/ResumeHeader';
import { ResumeToolbar } from '../../components/resume/ResumeToolbar';
import { ResumeEditor } from '../../components/resume/ResumeEditor';
import { ResumePreview } from '../../components/resume/ResumePreview';
import { SectionManager } from '../../components/resume/SectionManager';
import { ATSAnalyzerModal } from '../../components/resume/ATSAnalyzerModal';
import { MyResumesDrawer } from '../../components/resume/MyResumesDrawer';
import { Sparkles, Eye, Edit3, CheckCircle2, AlertCircle } from 'lucide-react';

export const ResumeBuilderPage: React.FC = () => {
  const { resumeId } = useParams<{ resumeId?: string }>();
  const navigate = useNavigate();
  const { currentUser, candidateProfile } = useAuth();

  // Primary Resume State
  const [resumeData, setResumeData] = useState<ResumeData>(() =>
    createDefaultResumeData(currentUser?.uid)
  );
  const [allResumes, setAllResumes] = useState<ResumeData[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<number>(1);
  const [atsResult, setAtsResult] = useState<ATSAnalysisResult | null>(null);

  // UI Modals & Panels
  const [showSectionManager, setShowSectionManager] = useState(false);
  const [showATSModal, setShowATSModal] = useState(false);
  const [showMyResumesDrawer, setShowMyResumesDrawer] = useState(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [importNotification, setImportNotification] = useState<string | null>(null);

  const saveTimeoutRef = useRef<any>(null);

  // 1. Load initial resume
  useEffect(() => {
    async function load() {
      const uid = currentUser?.uid;
      const userResumes = await listUserResumes(uid);
      setAllResumes(userResumes);

      if (resumeId) {
        const found = await getUserResumeById(resumeId, uid);
        if (found) {
          setResumeData(found);
          const initialScore = calculateATSScore(found, found.targetJobDescription);
          setAtsResult(initialScore);
          return;
        }
      }

      // If resumes exist, pick the first or most recently updated
      if (userResumes.length > 0) {
        setResumeData(userResumes[0]);
        const initialScore = calculateATSScore(userResumes[0], userResumes[0].targetJobDescription);
        setAtsResult(initialScore);
      } else {
        // Initialize new resume. If user has a profile, pre-fill it!
        let initial = createDefaultResumeData(uid);
        if (candidateProfile) {
          initial = importProfileToResume(candidateProfile, uid);
        }
        setResumeData(initial);
        await saveResume(initial, uid);
        setAllResumes([initial]);
        const initialScore = calculateATSScore(initial);
        setAtsResult(initialScore);
      }
    }

    load();
  }, [resumeId, currentUser?.uid]);

  // 2. Debounced Auto-Save
  const triggerAutoSave = useCallback((dataToSave: ResumeData) => {
    setHasUnsavedChanges(true);
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      setIsSaving(true);
      try {
        await saveResume(dataToSave, currentUser?.uid);
        setHasUnsavedChanges(false);
        setLastSavedAt(new Date().toLocaleTimeString());
        // Update in allResumes list
        setAllResumes((prev) =>
          prev.map((r) => (r.id === dataToSave.id ? dataToSave : r))
        );
      } catch (err) {
        console.error('Failed auto-saving resume:', err);
      } finally {
        setIsSaving(false);
      }
    }, 1200);
  }, [currentUser?.uid]);

  const handleDataChange = (updated: ResumeData) => {
    setResumeData(updated);
    // Recalculate quick ATS score
    const newScore = calculateATSScore(updated, updated.targetJobDescription);
    setAtsResult(newScore);
    triggerAutoSave(updated);
  };

  const handleManualSave = async () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    setIsSaving(true);
    try {
      await saveResume(resumeData, currentUser?.uid);
      setHasUnsavedChanges(false);
      setLastSavedAt(new Date().toLocaleTimeString());
      setAllResumes((prev) =>
        prev.map((r) => (r.id === resumeData.id ? resumeData : r))
      );
    } catch (err) {
      console.error('Failed manual save:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Profile Import Handler
  const handleImportProfile = () => {
    if (!candidateProfile) {
      alert('No Glitread profile found. Please fill your profile in Candidate Profile.');
      return;
    }
    const imported = importProfileToResume(candidateProfile, currentUser?.uid);
    // Preserve existing template/font/spacing customization
    const merged: ResumeData = {
      ...imported,
      id: resumeData.id,
      title: resumeData.title,
      template: resumeData.template,
      font: resumeData.font,
      spacing: resumeData.spacing,
      accent: resumeData.accent,
      sectionOrder: resumeData.sectionOrder,
      visibleSections: resumeData.visibleSections,
    };
    handleDataChange(merged);
    setImportNotification('Successfully imported information from your Glitread candidate profile!');
    setTimeout(() => setImportNotification(null), 4000);
  };

  // 4. Download PDF (Uses print styles to generate pixel-perfect vector A4 PDF)
  const handleDownloadPDF = () => {
    window.print();
  };

  // 5. Drawer resume management
  const handleSelectResume = async (id: string) => {
    const found = await getUserResumeById(id, currentUser?.uid);
    if (found) {
      setResumeData(found);
      const score = calculateATSScore(found, found.targetJobDescription);
      setAtsResult(score);
      setShowMyResumesDrawer(false);
      navigate(`/resume-builder/${id}`);
    }
  };

  const handleCreateNewResume = async () => {
    const newResume = createDefaultResumeData(currentUser?.uid);
    newResume.title = `Resume Version ${allResumes.length + 1}`;
    await saveResume(newResume, currentUser?.uid);
    setAllResumes((prev) => [newResume, ...prev]);
    setResumeData(newResume);
    setShowMyResumesDrawer(false);
    navigate(`/resume-builder/${newResume.id}`);
  };

  const handleDuplicateResume = async (id: string) => {
    const dup = await duplicateResume(id, currentUser?.uid);
    if (dup) {
      setAllResumes((prev) => [dup, ...prev]);
      setResumeData(dup);
      setShowMyResumesDrawer(false);
      navigate(`/resume-builder/${dup.id}`);
    }
  };

  const handleDeleteResume = async (id: string) => {
    if (allResumes.length <= 1) {
      alert('You cannot delete your only resume.');
      return;
    }
    if (confirm('Are you sure you want to delete this resume?')) {
      await deleteResume(id, currentUser?.uid);
      const remaining = allResumes.filter((r) => r.id !== id);
      setAllResumes(remaining);
      if (resumeData.id === id) {
        setResumeData(remaining[0]);
        navigate(`/resume-builder/${remaining[0].id}`);
      }
    }
  };

  const handleRenameResume = (id: string, newTitle: string) => {
    setAllResumes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, title: newTitle } : r))
    );
    if (resumeData.id === id) {
      const updated = { ...resumeData, title: newTitle };
      handleDataChange(updated);
    }
  };

  const handleApplySkillFromATS = (skillName: string) => {
    // Add skill to Technical Skills category
    const exists = resumeData.skills.some(
      (s) => s.name.toLowerCase() === skillName.toLowerCase()
    );
    if (exists) return;

    const newSkill = {
      id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: skillName,
      category: 'Technical Skills' as const,
    };
    const updated = {
      ...resumeData,
      skills: [...resumeData.skills, newSkill],
    };
    handleDataChange(updated);
  };

  const handleSaveTargetJD = (title: string, jd: string, lastResult: ATSAnalysisResult) => {
    const updated: ResumeData = {
      ...resumeData,
      targetJobTitle: title,
      targetJobDescription: jd,
    };
    handleDataChange(updated);
    setAtsResult(lastResult);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* 1. Header Bar */}
      <ResumeHeader
        title={resumeData.title}
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        lastSavedAt={lastSavedAt}
        pageCount={pageCount}
        atsResult={atsResult}
        onSave={handleManualSave}
        onOpenATSModal={() => setShowATSModal(true)}
        onOpenMyResumes={() => setShowMyResumesDrawer(true)}
        onImportProfile={handleImportProfile}
        onDownloadPDF={handleDownloadPDF}
      />

      {/* 2. Format & Styling Toolbar */}
      <ResumeToolbar
        template={resumeData.template}
        font={resumeData.font}
        spacing={resumeData.spacing}
        accent={resumeData.accent}
        showSectionManager={showSectionManager}
        onTemplateChange={(t) => handleDataChange({ ...resumeData, template: t })}
        onFontChange={(f) => handleDataChange({ ...resumeData, font: f })}
        onSpacingChange={(s) => handleDataChange({ ...resumeData, spacing: s })}
        onAccentChange={(a) => handleDataChange({ ...resumeData, accent: a })}
        onToggleSectionManager={() => setShowSectionManager((prev) => !prev)}
      />

      {/* Notification Banner */}
      {importNotification && (
        <div className="bg-emerald-600 text-white text-xs px-4 py-2 text-center font-medium flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{importNotification}</span>
        </div>
      )}

      {/* Mobile Segmented Toggle (Visible only on screens below lg) */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-2 flex justify-center sticky top-28 z-20 print:hidden">
        <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100">
          <button
            type="button"
            onClick={() => setMobileTab('editor')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mobileTab === 'editor'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Editor
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mobileTab === 'preview'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
        </div>
      </div>

      {/* Main Workspace: Desktop 2-Column Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Form Editor (42% on desktop) */}
        <div
          className={`w-full lg:w-[42%] xl:w-[40%] bg-slate-50 border-r border-slate-200 overflow-y-auto ${
            mobileTab === 'editor' ? 'block' : 'hidden lg:block'
          } print:hidden`}
        >
          <div className="max-w-2xl mx-auto py-4 px-2 sm:px-4">
            {/* Optional Section Manager dropdown */}
            {showSectionManager && (
              <SectionManager
                sectionOrder={resumeData.sectionOrder}
                visibleSections={resumeData.visibleSections}
                onReorder={(newOrder) =>
                  handleDataChange({ ...resumeData, sectionOrder: newOrder })
                }
                onToggleVisibility={(secId) => {
                  const current = resumeData.visibleSections[secId] ?? true;
                  handleDataChange({
                    ...resumeData,
                    visibleSections: {
                      ...resumeData.visibleSections,
                      [secId]: !current,
                    },
                  });
                }}
              />
            )}

            {/* Accordion Sections */}
            <ResumeEditor data={resumeData} onChange={handleDataChange} />
          </div>
        </div>

        {/* Right Column: Live A4 Preview (58% on desktop, sticky full height) */}
        <div
          className={`w-full lg:w-[58%] xl:w-[60%] h-[calc(100vh-140px)] sticky top-36 ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:block'
          } print:w-full print:h-auto print:static print:block`}
        >
          <ResumePreview
            data={resumeData}
            onPageCountChange={(count) => setPageCount(count)}
          />
        </div>
      </div>

      {/* ATS Scoring & Target Job Matcher Modal */}
      <ATSAnalyzerModal
        data={resumeData}
        isOpen={showATSModal}
        onClose={() => setShowATSModal(false)}
        onApplySkill={handleApplySkillFromATS}
        onSaveTargetJD={handleSaveTargetJD}
      />

      {/* My Resumes Drawer */}
      <MyResumesDrawer
        isOpen={showMyResumesDrawer}
        resumes={allResumes}
        currentResumeId={resumeData.id}
        onClose={() => setShowMyResumesDrawer(false)}
        onSelectResume={handleSelectResume}
        onCreateNew={handleCreateNewResume}
        onDuplicate={handleDuplicateResume}
        onDelete={handleDeleteResume}
        onRename={handleRenameResume}
      />
    </div>
  );
};

// Also export as AtsResumeBuilderPage for backwards compatibility
export const AtsResumeBuilderPage = ResumeBuilderPage;
