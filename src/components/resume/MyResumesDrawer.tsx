import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { X, Plus, Copy, Trash2, Edit3, FileText, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  resumes: ResumeData[];
  currentResumeId: string;
  onClose: () => void;
  onSelectResume: (id: string) => void;
  onCreateNew: () => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
}

export const MyResumesDrawer: React.FC<Props> = ({
  isOpen,
  resumes,
  currentResumeId,
  onClose,
  onSelectResume,
  onCreateNew,
  onDuplicate,
  onDelete,
  onRename,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  if (!isOpen) return null;

  const startRename = (r: ResumeData) => {
    setEditingId(r.id);
    setEditTitle(r.title);
  };

  const saveRename = (id: string) => {
    if (editTitle.trim()) {
      onRename(id, editTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-2xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">My Saved Resumes</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Button */}
        <div className="p-4 border-b border-slate-100">
          <button
            type="button"
            onClick={onCreateNew}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create New Resume Version
          </button>
        </div>

        {/* Resumes List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {resumes.map((r) => {
            const isCurrent = r.id === currentResumeId;
            return (
              <div
                key={r.id}
                className={`p-3.5 rounded-xl border transition ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex-1">
                    {editingId === r.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="px-2 py-1 text-xs border border-blue-400 rounded focus:outline-none w-full"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => saveRename(r.id)}
                          className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{r.title}</span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                            Active
                          </span>
                        )}
                      </div>
                    )}
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Target: {r.personalInfo.targetTitle || 'General'}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => startRename(r)}
                      className="p-1 text-slate-400 hover:text-slate-700"
                      title="Rename"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDuplicate(r.id)}
                      className="p-1 text-slate-400 hover:text-slate-700"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {resumes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onDelete(r.id)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>Template: {r.template}</span>
                  {!isCurrent && (
                    <button
                      type="button"
                      onClick={() => onSelectResume(r.id)}
                      className="text-blue-600 hover:text-blue-800 font-bold"
                    >
                      Switch to this →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
