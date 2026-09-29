import React from 'react';
import { ResumeSectionId } from '../../types/resume';
import { ArrowUp, ArrowDown, Eye, EyeOff, GripVertical } from 'lucide-react';

interface Props {
  sectionOrder: ResumeSectionId[];
  visibleSections: Record<ResumeSectionId, boolean>;
  onReorder: (newOrder: ResumeSectionId[]) => void;
  onToggleVisibility: (sectionId: ResumeSectionId) => void;
}

const SECTION_LABELS: Record<ResumeSectionId, string> = {
  personalInfo: 'Personal Information',
  summary: 'Professional Summary',
  education: 'Education',
  skills: 'Skills & Tech Stack',
  experience: 'Work Experience',
  internships: 'Internships',
  projects: 'Projects',
  certifications: 'Certifications',
  challenges: 'Challenges & Hackathons',
  achievements: 'Achievements',
  responsibilities: 'Leadership & Extracurricular',
  languages: 'Languages',
  links: 'Custom Links',
};

export const SectionManager: React.FC<Props> = ({
  sectionOrder,
  visibleSections,
  onReorder,
  onToggleVisibility,
}) => {
  const defaultOrder: ResumeSectionId[] = [
    'summary',
    'education',
    'skills',
    'experience',
    'internships',
    'projects',
    'certifications',
    'challenges',
    'achievements',
    'responsibilities',
    'languages',
    'links',
  ];
  const safeOrder = Array.isArray(sectionOrder) && sectionOrder.length > 0 ? sectionOrder : defaultOrder;
  const safeVisibility = visibleSections || ({} as Record<ResumeSectionId, boolean>);

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= safeOrder.length) return;
    const copy = [...safeOrder];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onReorder(copy);
  };

  return (
    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 mb-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h4 className="text-xs font-bold text-slate-800">Customize Section Order & Visibility</h4>
          <p className="text-[11px] text-slate-500">
            Reorder sections (e.g. put Education first for freshers) or hide empty sections.
          </p>
        </div>
      </div>

      <div className="space-y-1.5 pt-1">
        {safeOrder.map((sectionId, index) => {
          const isVisible = safeVisibility[sectionId] ?? true;
          const label = SECTION_LABELS[sectionId] || sectionId;

          return (
            <div
              key={sectionId}
              className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-xs transition ${
                isVisible
                  ? 'bg-white border-slate-200 text-slate-800 shadow-xs'
                  : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <GripVertical className="w-3.5 h-3.5 text-slate-400" />
                <span className={`font-medium ${!isVisible ? 'line-through text-slate-400' : ''}`}>
                  {label}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onToggleVisibility(sectionId)}
                  className={`p-1 rounded hover:bg-slate-100 transition ${isVisible ? 'text-blue-600' : 'text-slate-400'}`}
                  title={isVisible ? 'Hide Section' : 'Show Section'}
                >
                  {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  disabled={index === safeOrder.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
