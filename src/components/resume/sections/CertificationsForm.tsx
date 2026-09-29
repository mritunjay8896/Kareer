import React from 'react';
import { ResumeCertification } from '../../../types/resume';
import { Plus, Trash2, Award } from 'lucide-react';

interface Props {
  certifications: ResumeCertification[];
  onChange: (updated: ResumeCertification[]) => void;
}

export const CertificationsForm: React.FC<Props> = ({ certifications, onChange }) => {
  const handleAdd = () => {
    const newCert: ResumeCertification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
      credentialId: '',
      credentialUrl: '',
    };
    onChange([...certifications, newCert]);
  };

  const handleUpdate = (id: string, field: keyof ResumeCertification, value: string) => {
    onChange(
      certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleRemove = (id: string) => {
    onChange(certifications.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      {certifications.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
          <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-600 mb-2 font-medium">No certifications added yet</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Certification
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="p-3 border border-slate-200 rounded-lg bg-white space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Certification #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(cert.id)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Certification Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleUpdate(cert.id, 'name', e.target.value)}
                    placeholder="e.g. AWS Certified Cloud Practitioner / Meta React"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Issuing Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleUpdate(cert.id, 'issuer', e.target.value)}
                    placeholder="e.g. Amazon Web Services / Coursera"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="text"
                    value={cert.issueDate}
                    onChange={(e) => handleUpdate(cert.id, 'issueDate', e.target.value)}
                    placeholder="e.g. May 2024"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Credential ID / URL
                  </label>
                  <input
                    type="text"
                    value={cert.credentialUrl || cert.credentialId || ''}
                    onChange={(e) => handleUpdate(cert.id, 'credentialUrl', e.target.value)}
                    placeholder="e.g. https://credly.com/earner/..."
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
            <Plus className="w-3.5 h-3.5" /> Add Another Certification
          </button>
        </div>
      )}
    </div>
  );
};
