import React from 'react';
import { Plus, Trash2, Award, Trophy, ExternalLink, Calendar, Building2 } from 'lucide-react';
import { RegistrationCertification, RegistrationAchievement } from './types';

interface Step8CertificationsAchievementsProps {
  certificationsList: RegistrationCertification[];
  achievementsList: RegistrationAchievement[];
  onCertificationsChange: (list: RegistrationCertification[]) => void;
  onAchievementsChange: (list: RegistrationAchievement[]) => void;
}

export const Step8CertificationsAchievements: React.FC<Step8CertificationsAchievementsProps> = ({
  certificationsList,
  achievementsList,
  onCertificationsChange,
  onAchievementsChange
}) => {
  // Add Certification
  const addCert = () => {
    const newCert: RegistrationCertification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      certificateUploadUrl: '',
      description: ''
    };
    onCertificationsChange([...certificationsList, newCert]);
  };

  const updateCert = (id: string, fields: Partial<RegistrationCertification>) => {
    onCertificationsChange(
      certificationsList.map((c) => (c.id === id ? { ...c, ...fields } : c))
    );
  };

  const removeCert = (id: string) => {
    onCertificationsChange(certificationsList.filter((c) => c.id !== id));
  };

  // Add Achievement
  const addAchieve = () => {
    const newAch: RegistrationAchievement = {
      id: `ach-${Date.now()}`,
      title: '',
      organization: '',
      date: '',
      description: '',
      proofUrl: ''
    };
    onAchievementsChange([...achievementsList, newAch]);
  };

  const updateAchieve = (id: string, fields: Partial<RegistrationAchievement>) => {
    onAchievementsChange(
      achievementsList.map((a) => (a.id === id ? { ...a, ...fields } : a))
    );
  };

  const removeAchieve = (id: string) => {
    onAchievementsChange(achievementsList.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
          Certifications & Achievements
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Industry-recognized credentials, licenses, hackathon wins, and academic honors.
        </p>
      </div>

      {/* SECTION 1: CERTIFICATIONS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <h4 className="text-sm font-extrabold text-slate-900">
              Certifications & Licenses ({certificationsList.length})
            </h4>
          </div>
          <button
            type="button"
            onClick={addCert}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>

        {certificationsList.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">
            No certifications added yet (e.g. AWS Certified, Google Cloud, Meta Frontend, Cisco CCNA).
          </p>
        ) : (
          <div className="space-y-3">
            {certificationsList.map((cert, index) => (
              <div
                key={cert.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-700">
                    {cert.name ? cert.name : `Certification #${index + 1}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCert(cert.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Certification Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCert(cert.id, { name: e.target.value })}
                      placeholder="e.g. AWS Certified Solutions Architect"
                      className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Issuing Organization <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCert(cert.id, { issuer: e.target.value })}
                      placeholder="e.g. Amazon Web Services / Google / Coursera"
                      className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Issue Date
                    </label>
                    <input
                      type="month"
                      value={cert.issueDate}
                      onChange={(e) => updateCert(cert.id, { issueDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Expiry Date <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="month"
                      value={cert.expiryDate}
                      onChange={(e) => updateCert(cert.id, { expiryDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Credential ID
                    </label>
                    <input
                      type="text"
                      value={cert.credentialId}
                      onChange={(e) => updateCert(cert.id, { credentialId: e.target.value })}
                      placeholder="e.g. AWS-89765241"
                      className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Credential URL / Verification Link
                  </label>
                  <input
                    type="url"
                    value={cert.credentialUrl}
                    onChange={(e) => updateCert(cert.id, { credentialUrl: e.target.value })}
                    placeholder="https://credly.com/badges/..."
                    className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: ACHIEVEMENTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h4 className="text-sm font-extrabold text-slate-900">
              Honors & Key Achievements ({achievementsList.length})
            </h4>
          </div>
          <button
            type="button"
            onClick={addAchieve}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded-xl border border-amber-200 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Achievement</span>
          </button>
        </div>

        {achievementsList.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">
            No achievements added yet (e.g. Smart India Hackathon finalist, Top 1% LeetCode, Dean's List).
          </p>
        ) : (
          <div className="space-y-3">
            {achievementsList.map((ach, index) => (
              <div
                key={ach.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-700">
                    {ach.title ? ach.title : `Achievement #${index + 1}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeAchieve(ach.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Achievement Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={ach.title}
                      onChange={(e) => updateAchieve(ach.id, { title: e.target.value })}
                      placeholder="e.g. National Hackathon 1st Runner Up / Top Contributor"
                      className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Awarding Organization
                    </label>
                    <input
                      type="text"
                      value={ach.organization}
                      onChange={(e) => updateAchieve(ach.id, { organization: e.target.value })}
                      placeholder="e.g. AICTE / IEEE / ACM"
                      className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Date
                    </label>
                    <input
                      type="month"
                      value={ach.date}
                      onChange={(e) => updateAchieve(ach.id, { date: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Proof URL / Certificate Link
                    </label>
                    <input
                      type="url"
                      value={ach.proofUrl}
                      onChange={(e) => updateAchieve(ach.id, { proofUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={ach.description}
                    onChange={(e) => updateAchieve(ach.id, { description: e.target.value })}
                    placeholder="Briefly describe what you built or accomplished..."
                    className="w-full p-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
