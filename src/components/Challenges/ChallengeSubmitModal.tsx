import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, Upload, Code2, Globe, Video, Sparkles, ArrowRight, Trophy } from 'lucide-react';
import { ChallengeItem, ChallengeRegistration } from '../../types';

interface ChallengeSubmitModalProps {
  challenge: ChallengeItem | null;
  registration?: ChallengeRegistration | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (data: {
    projectTitle: string;
    projectDescription: string;
    githubUrl: string;
    demoUrl: string;
    videoUrl?: string;
  }) => void;
}

export const ChallengeSubmitModal: React.FC<ChallengeSubmitModalProps> = ({
  challenge,
  registration,
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  const [projectTitle, setProjectTitle] = useState(registration?.projectTitle || '');
  const [projectDescription, setProjectDescription] = useState(registration?.projectDescription || '');
  const [githubUrl, setGithubUrl] = useState(registration?.githubUrl || '');
  const [demoUrl, setDemoUrl] = useState(registration?.demoUrl || '');
  const [videoUrl, setVideoUrl] = useState('');
  const [techStack, setTechStack] = useState('React, TypeScript, Node.js, Gemini API');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !challenge) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSubmitSuccess({
        projectTitle,
        projectDescription,
        githubUrl,
        demoUrl,
        videoUrl
      });
    }, 600);
  };

  const handleDone = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-extrabold uppercase tracking-wider mb-2 border border-blue-400/30">
            <Upload className="w-3.5 h-3.5" />
            <span>Submit Challenge Solution</span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold line-clamp-1">
            {challenge.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Deadline: <strong className="text-rose-400">{challenge.submissionDeadline}</strong>
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-slate-900">Project Submitted Successfully!</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Your submission for <strong>{challenge.title}</strong> has been saved. The jury will evaluate your codebase and live demo.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-left text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Added to Glitread Portfolio</span>
                </div>
                <p className="text-emerald-800 text-[11px]">
                  This project & participation record is now visible on your verified student portfolio for employers.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleDone}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Project / Solution Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. HealthSense AI - Multimodal Triage"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Summary & Key Innovation *
                </label>
                <textarea
                  required
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe the problem solved, architectural approach, and core features..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1">
                    <Code2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>GitHub Repository URL *</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1">
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    <span>Live Demo / App URL *</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://my-app.vercel.app"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1">
                  <Video className="w-3.5 h-3.5 text-slate-500" />
                  <span>Demo Video Link (Loom / YouTube)</span>
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or Loom"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Solution...</span>
                  ) : (
                    <>
                      <span>Submit Solution for Evaluation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
