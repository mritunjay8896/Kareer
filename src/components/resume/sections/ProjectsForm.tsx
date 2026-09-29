import React, { useState } from 'react';
import { ResumeProject } from '../../../types/resume';
import { Plus, Trash2, ArrowUp, ArrowDown, FolderGit2, Sparkles, Loader2 } from 'lucide-react';
import { improveResumeText } from '../../../services/aiResumeService';

interface Props {
  projects: ResumeProject[];
  onChange: (updated: ResumeProject[]) => void;
}

export const ProjectsForm: React.FC<Props> = ({ projects, onChange }) => {
  const [improvingId, setImprovingId] = useState<string | null>(null);

  const handleAdd = () => {
    const newProject: ResumeProject = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      techStack: '',
      projectUrl: '',
      githubUrl: '',
      startDate: '',
      endDate: '',
      impact: '',
    };
    onChange([...projects, newProject]);
  };

  const handleUpdate = (id: string, field: keyof ResumeProject, value: any) => {
    onChange(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleRemove = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const copy = [...projects];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange(copy);
  };

  const handleImproveBullet = async (id: string, currentText: string) => {
    if (!currentText.trim()) return;
    setImprovingId(id);
    try {
      const improved = await improveResumeText(currentText, 'bullet');
      handleUpdate(id, 'description', improved);
    } catch (e) {
      console.error(e);
    } finally {
      setImprovingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
          <FolderGit2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-600 mb-2 font-medium">No projects added yet</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, index) => (
            <div key={proj.id} className="p-3.5 border border-slate-200 rounded-lg bg-white space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-blue-600" /> Project #{index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === projects.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(proj.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                    title="Remove project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Project Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => handleUpdate(proj.id, 'title', e.target.value)}
                    placeholder="e.g. Distributed Task Orchestrator / Full Stack E-Commerce"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Technologies Used (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={proj.techStack}
                    onChange={(e) => handleUpdate(proj.id, 'techStack', e.target.value)}
                    placeholder="e.g. React, TypeScript, Node.js, PostgreSQL, Tailwind CSS"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    GitHub / Source Code URL
                  </label>
                  <input
                    type="url"
                    value={proj.githubUrl || ''}
                    onChange={(e) => handleUpdate(proj.id, 'githubUrl', e.target.value)}
                    placeholder="https://github.com/user/project"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Live Demo / Project URL
                  </label>
                  <input
                    type="url"
                    value={proj.projectUrl || ''}
                    onChange={(e) => handleUpdate(proj.id, 'projectUrl', e.target.value)}
                    placeholder="https://myproject.dev"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-slate-600">
                      Project Description & Core Contributions <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      disabled={!proj.description.trim() || improvingId === proj.id}
                      onClick={() => handleImproveBullet(proj.id, proj.description)}
                      className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 disabled:opacity-50 cursor-pointer"
                    >
                      {improvingId === proj.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      Refine with Action Verb
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)}
                    placeholder="Architected a responsive single-page application with real-time state synchronization, reducing API payload latency."
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Key Result / Measurable Impact (Optional)
                  </label>
                  <input
                    type="text"
                    value={proj.impact || ''}
                    onChange={(e) => handleUpdate(proj.id, 'impact', e.target.value)}
                    placeholder="e.g. Achieved 99.8% uptime with 500+ active users in beta release."
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-2 border border-dashed border-blue-300 text-blue-700 bg-blue-50/50 hover:bg-blue-50 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Another Project
          </button>
        </div>
      )}
    </div>
  );
};
