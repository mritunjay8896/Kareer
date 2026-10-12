import React from 'react';
import { Plus, Trash2, FolderGit2, Github, ExternalLink, Image, Code, Sparkles, Layers } from 'lucide-react';
import { RegistrationProject } from './types';

interface Step7ProjectsProps {
  projectsList: RegistrationProject[];
  onChange: (list: RegistrationProject[]) => void;
}

export const Step7Projects: React.FC<Step7ProjectsProps> = ({
  projectsList,
  onChange
}) => {
  const addProject = () => {
    const newProj: RegistrationProject = {
      id: `proj-${Date.now()}`,
      name: '',
      thumbnailUrl: '',
      shortDescription: '',
      detailedDescription: '',
      projectType: 'Personal',
      role: 'Full Stack Developer',
      startDate: '',
      endDate: '',
      technologies: [],
      githubUrl: '',
      liveDemoUrl: '',
      caseStudyUrl: '',
      contribution: '',
      keyFeatures: '',
      challenges: '',
      results: ''
    };
    onChange([...projectsList, newProj]);
  };

  const updateItem = (id: string, fields: Partial<RegistrationProject>) => {
    onChange(
      projectsList.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(projectsList.filter((item) => item.id !== id));
  };

  const handleTechChange = (id: string, text: string) => {
    const tags = text.split(',').map((t) => t.trim()).filter(Boolean);
    updateItem(id, { technologies: tags });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            Projects Portfolio
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showcase your best personal, academic, or open-source projects. These populate your resume projects section and live portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {projectsList.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-3 bg-slate-50/50">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center mx-auto shadow-2xs">
            <FolderGit2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-800">No Projects Added Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-0.5">
              Adding 1-3 projects significantly improves recruiter engagement, portfolio strength, and ATS scores.
            </p>
          </div>
          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Project</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projectsList.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs relative space-y-4 transition-all"
            >
              {/* Header: Title + Delete button */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    {item.name ? item.name : `Project #${index + 1}`}
                  </span>
                  <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {item.projectType}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove this project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Grid 1: Name, Type, Role */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Project Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, { name: e.target.value })}
                    placeholder="e.g. AI Resume Analyzer / E-commerce App"
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Project Type
                  </label>
                  <select
                    value={item.projectType}
                    onChange={(e) => updateItem(item.id, { projectType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  >
                    <option value="Personal">Personal Project</option>
                    <option value="Academic">Academic / Capstone</option>
                    <option value="Professional">Professional Client Work</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Open Source">Open Source Contribution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Your Role in Project
                  </label>
                  <input
                    type="text"
                    value={item.role}
                    onChange={(e) => updateItem(item.id, { role: e.target.value })}
                    placeholder="e.g. Lead Developer / UI Designer"
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Technologies Used */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Technologies / Tools Used <span className="text-slate-400 font-normal">(comma-separated)</span>
                </label>
                <div className="relative">
                  <Code className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={item.technologies.join(', ')}
                    onChange={(e) => handleTechChange(item.id, e.target.value)}
                    placeholder="e.g. React, Node.js, Tailwind CSS, PostgreSQL, Firebase"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              {/* URLs: GitHub, Live Demo, Thumbnail */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    GitHub Repository URL
                  </label>
                  <div className="relative">
                    <Github className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={item.githubUrl}
                      onChange={(e) => updateItem(item.id, { githubUrl: e.target.value })}
                      placeholder="https://github.com/username/project"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Live Demo / Website URL
                  </label>
                  <div className="relative">
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={item.liveDemoUrl}
                      onChange={(e) => updateItem(item.id, { liveDemoUrl: e.target.value })}
                      placeholder="https://myproject.vercel.app"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Thumbnail Image URL <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <Image className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={item.thumbnailUrl}
                      onChange={(e) => updateItem(item.id, { thumbnailUrl: e.target.value })}
                      placeholder="https://... screenshot"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Short & Detailed Description */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Short Elevator Pitch <span className="text-slate-400 font-normal">(1-2 sentences for portfolio card)</span>
                  </label>
                  <input
                    type="text"
                    value={item.shortDescription}
                    onChange={(e) => updateItem(item.id, { shortDescription: e.target.value })}
                    placeholder="e.g. A full-stack job platform helping 500+ students connect with remote startups."
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Key Features & Architecture
                    </label>
                    <textarea
                      rows={2}
                      value={item.keyFeatures}
                      onChange={(e) => updateItem(item.id, { keyFeatures: e.target.value })}
                      placeholder="e.g. Real-time notifications, OAuth2 auth, PDF generation..."
                      className="w-full p-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Challenges Overcome & Impact / Results
                    </label>
                    <textarea
                      rows={2}
                      value={item.results}
                      onChange={(e) => updateItem(item.id, { results: e.target.value })}
                      placeholder="e.g. Optimized database queries, 100+ active users..."
                      className="w-full p-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addProject}
            className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 text-blue-600 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Project</span>
          </button>
        </div>
      )}
    </div>
  );
};
