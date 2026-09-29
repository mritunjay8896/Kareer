import React from 'react';
import { ResumeChallenge } from '../../../types/resume';
import { Plus, Trash2, Trophy } from 'lucide-react';

interface Props {
  challenges: ResumeChallenge[];
  onChange: (updated: ResumeChallenge[]) => void;
}

export const ChallengesForm: React.FC<Props> = ({ challenges, onChange }) => {
  const handleAdd = () => {
    const newChallenge: ResumeChallenge = {
      id: `chal-${Date.now()}`,
      name: '',
      organizer: '',
      type: 'Hackathon',
      date: '',
      result: '',
      skills: '',
      projectUrl: '',
      certificateUrl: '',
    };
    onChange([...challenges, newChallenge]);
  };

  const handleUpdate = (id: string, field: keyof ResumeChallenge, value: string) => {
    onChange(
      challenges.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleRemove = (id: string) => {
    onChange(challenges.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      {challenges.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
          <Trophy className="w-8 h-8 text-amber-500/50 mx-auto mb-2" />
          <p className="text-xs text-slate-600 mb-1 font-medium">No challenges or hackathons added</p>
          <p className="text-[11px] text-slate-400 mb-2">
            Highlight your Glitread hackathon ranks, coding competitions, or technical challenges.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Challenge / Hackathon
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {challenges.map((c, index) => (
            <div key={c.id} className="p-3.5 border border-slate-200 rounded-lg bg-white space-y-2.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" /> Challenge #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(c.id)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Challenge / Hackathon Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => handleUpdate(c.id, 'name', e.target.value)}
                    placeholder="e.g. Smart India Hackathon / Glitread Tech Sprint"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Organizer / Platform <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={c.organizer}
                    onChange={(e) => handleUpdate(c.id, 'organizer', e.target.value)}
                    placeholder="e.g. Ministry of Education / Glitread / Devfolio"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Result / Standing
                  </label>
                  <input
                    type="text"
                    value={c.result}
                    onChange={(e) => handleUpdate(c.id, 'result', e.target.value)}
                    placeholder="e.g. 1st Place Winner / Top 5 Finalist / Qualified"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Date / Month
                  </label>
                  <input
                    type="text"
                    value={c.date}
                    onChange={(e) => handleUpdate(c.id, 'date', e.target.value)}
                    placeholder="e.g. Nov 2024"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Skills & Tech Demonstrated
                  </label>
                  <input
                    type="text"
                    value={c.skills || ''}
                    onChange={(e) => handleUpdate(c.id, 'skills', e.target.value)}
                    placeholder="e.g. Realtime WebSockets, React, AI Prompt Engineering, FastAPI"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Submission / Certificate URL
                  </label>
                  <input
                    type="url"
                    value={c.projectUrl || c.certificateUrl || ''}
                    onChange={(e) => handleUpdate(c.id, 'projectUrl', e.target.value)}
                    placeholder="https://github.com/myteam/hackathon-submission"
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
            <Plus className="w-3.5 h-3.5" /> Add Another Challenge
          </button>
        </div>
      )}
    </div>
  );
};
