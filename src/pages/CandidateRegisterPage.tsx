import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

import { 
  FullRegistrationData 
} from '../components/Registration/types';
import { 
  INITIAL_REGISTRATION_DATA 
} from '../components/Registration/constants';
import { 
  StepIndicator 
} from '../components/Registration/StepIndicator';
import { 
  RegistrationSidebar 
} from '../components/Registration/RegistrationSidebar';
import { 
  SideValuePropCard 
} from '../components/Registration/SideValuePropCard';

import { Step1Account } from '../components/Registration/Step1Account';
import { Step2ProfileType } from '../components/Registration/Step2ProfileType';
import { Step3PersonalDetails } from '../components/Registration/Step3PersonalDetails';
import { Step4Education } from '../components/Registration/Step4Education';
import { Step5Experience } from '../components/Registration/Step5Experience';
import { Step6Skills } from '../components/Registration/Step6Skills';
import { Step7Projects } from '../components/Registration/Step7Projects';
import { Step8CertificationsAchievements } from '../components/Registration/Step8CertificationsAchievements';
import { Step9Links } from '../components/Registration/Step9Links';
import { Step10Preferences } from '../components/Registration/Step10Preferences';
import { Step11PortfolioSetup } from '../components/Registration/Step11PortfolioSetup';
import { Step12Review } from '../components/Registration/Step12Review';

const DRAFT_STORAGE_KEY = 'glitread_candidate_registration_draft';

export const CandidateRegisterPage: React.FC = () => {
  const { currentUser, userRole, authInitialized } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || new URLSearchParams(location.search).get('redirect') || '/candidate/dashboard';

  // If already authenticated and not on registration flow, redirect
  useEffect(() => {
    if (authInitialized && currentUser) {
      if (userRole === 'employer') {
        navigate('/employer/dashboard', { replace: true });
      }
    }
  }, [authInitialized, currentUser, userRole, navigate, from]);

  // Main Form Data State
  const [formData, setFormData] = useState<FullRegistrationData>(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        return {
          ...INITIAL_REGISTRATION_DATA,
          ...parsed,
          account: {
            ...INITIAL_REGISTRATION_DATA.account,
            email: parsed.account?.email || ''
          }
        };
      }
    } catch (e) {
      console.warn('Error reading saved registration draft:', e);
    }
    return INITIAL_REGISTRATION_DATA;
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [maxVisitedStep, setMaxVisitedStep] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Auto-save draft to localStorage whenever form changes (excluding raw passwords)
  useEffect(() => {
    try {
      const safeToSave = {
        ...formData,
        account: {
          email: formData.account.email
        }
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(safeToSave));
    } catch (e) {
      console.warn('Could not save registration draft to localStorage:', e);
    }
  }, [formData]);

  // Calculate Profile Completion Dynamically
  const completionPercentage = useMemo(() => {
    let score = 0;
    if (formData.account.email) score += 10;
    if (formData.candidateType) score += 10;
    if (formData.personal.fullName && formData.personal.phone && formData.personal.city) {
      score += 10;
      if (formData.personal.headline || formData.personal.about) score += 5;
    }
    if (formData.education.length > 0 && formData.education[0].degree && formData.education[0].institution) {
      score += 15;
    }
    if (formData.candidateType === 'student' || formData.candidateType === 'fresher') {
      score += 10;
    } else if (formData.experience.length > 0) {
      score += 10;
    }
    if (formData.skills.length >= 1) {
      score += 10;
      if (formData.skills.length >= 3) score += 5;
    }
    if (formData.projects.length >= 1) score += 10;
    const hasCreds = formData.certifications.length > 0 || formData.achievements.length > 0;
    const hasLinks = Object.values(formData.links).some((val) => Boolean(val));
    if (hasCreds || hasLinks) score += 5;
    if (formData.careerPreferences.lookingFor?.length > 0 && formData.careerPreferences.desiredRoles?.length > 0) {
      score += 10;
    }
    return Math.min(100, Math.max(10, score));
  }, [formData]);

  // Validation before advancing
  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepIndex === 0) {
      const { email, password, confirmPassword } = formData.account;
      if (!email) {
        newErrors.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Please enter a valid email address.';
      }

      if (!password) {
        newErrors.password = 'Password is required.';
      } else if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters.';
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm your password.';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    } else if (stepIndex === 2) {
      const { fullName, phone, city } = formData.personal;
      if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
      if (!phone.trim()) newErrors.phone = 'Phone number is required.';
      if (!city.trim()) newErrors.city = 'City is required.';
    } else if (stepIndex === 3) {
      if (formData.candidateType === 'student' || formData.candidateType === 'fresher') {
        if (formData.education.length === 0 || !formData.education[0].degree || !formData.education[0].institution) {
          newErrors.education = 'Please add at least one education qualification.';
        }
      }
    } else if (stepIndex === 5) {
      if (formData.skills.length === 0) {
        newErrors.skills = 'Please add at least one core skill.';
      }
    } else if (stepIndex === 9) {
      if (!formData.careerPreferences.lookingFor || formData.careerPreferences.lookingFor.length === 0) {
        newErrors.lookingFor = 'Please select at least one opportunity type.';
      }
      if (!formData.careerPreferences.desiredRoles || formData.careerPreferences.desiredRoles.length === 0) {
        newErrors.desiredRoles = 'Please select at least one desired job role.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setErrors({});
      const next = currentStep + 1;
      setCurrentStep(next);
      setMaxVisitedStep((prev) => Math.max(prev, next));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleJumpToStep = (index: number) => {
    setErrors({});
    setCurrentStep(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Registration Submission
  const handleCompleteRegistration = async () => {
    if (!validateStep(0) || !validateStep(2) || !validateStep(5) || !validateStep(9)) {
      setSubmitError('Please complete all required fields highlighted in the earlier steps.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    let uid: string;
    const email = formData.account.email;
    const password = formData.account.password || 'Glitread@2026';
    const fullName = formData.personal.fullName;

    try {
      try {
        const authRes = await createUserWithEmailAndPassword(auth, email, password);
        uid = authRes.user.uid;
      } catch (authErr: any) {
        if (authErr.code === 'auth/email-already-in-use') {
          throw new Error('An account already exists with this email address. Please log in instead.');
        } else if (
          authErr.code === 'auth/operation-not-allowed' ||
          authErr.code === 'auth/admin-restricted-operation' ||
          authErr.code === 'auth/configuration-not-found'
        ) {
          uid = `candidate-${Date.now()}`;
        } else {
          throw new Error(authErr.message || 'Account creation failed. Please check your credentials.');
        }
      }

      // 1. Structured Document for users/{uid}
      const structuredUserDoc = {
        account: {
          email: formData.account.email
        },
        candidateType: formData.candidateType,
        personal: { ...formData.personal },
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills,
        projects: formData.projects,
        certifications: formData.certifications,
        achievements: formData.achievements,
        links: formData.links,
        careerPreferences: formData.careerPreferences,
        portfolio: {
          ...formData.portfolio,
          username: formData.portfolio.username || uid
        },
        profileCompletion: completionPercentage,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'users', uid), {
        uid,
        email: formData.account.email,
        displayName: fullName,
        role: 'candidate',
        photoURL: formData.personal.photoUrl || '',
        ...structuredUserDoc
      });

      // 2. Compatibility Document for candidates/{uid}
      const candidateProfileDoc = {
        id: uid,
        fullName: formData.personal.fullName,
        email: formData.account.email,
        phone: formData.personal.phone,
        location: `${formData.personal.city}${formData.personal.state ? `, ${formData.personal.state}` : ''}, ${formData.personal.country}`,
        avatar: formData.personal.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        headline: formData.personal.headline || 'Software Professional',
        bio: formData.personal.about || '',
        atsScore: 85,
        profileCompletion: completionPercentage,
        resumeName: `${formData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
        resumeUrl: '',
        resumeLastUpdated: 'Today',
        portfolioUrl: `https://glitread.com/p/${formData.portfolio.username || uid}`,
        linkedIn: formData.links.linkedin || '',
        github: formData.links.github || '',
        noticePeriod: formData.careerPreferences.availability || 'Immediately',
        expectedSalary: formData.careerPreferences.expectedSalary || '₹6 - ₹10 LPA',
        preferredLocation: formData.careerPreferences.locations?.join(', ') || formData.personal.city,
        skills: formData.skills.map((s) => s.name),
        languages: ['English', 'Hindi'],
        achievements: formData.achievements.map((a) => a.title),
        education: formData.education.map((edu) => ({
          id: edu.id,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          institution: edu.institution,
          startYear: edu.startYear,
          endYear: edu.endYear,
          grade: edu.grade
        })),
        experience: formData.experience.map((exp) => ({
          id: exp.id,
          role: exp.jobTitle,
          company: exp.company,
          location: exp.location,
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.currentlyWorking,
          description: exp.description || exp.responsibilities
        })),
        projects: formData.projects.map((proj) => ({
          id: proj.id,
          title: proj.name,
          description: proj.shortDescription || proj.detailedDescription,
          technologies: proj.technologies
        })),
        certifications: formData.certifications.map((cert) => ({
          id: cert.id,
          name: cert.name,
          issuer: cert.issuer,
          issueDate: cert.issueDate,
          credentialUrl: cert.credentialUrl
        })),
        candidateType: formData.candidateType,
        careerPreferences: formData.careerPreferences,
        portfolioPreferences: formData.portfolio,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'candidates', uid), candidateProfileDoc);
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      navigate(from || '/candidate/dashboard', { replace: true });
    } catch (err: any) {
      console.error('Registration submission error:', err);
      setSubmitError(err.message || 'Registration failed. Please check your details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isReviewStep = currentStep === 11;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f4f7fc] py-3.5 sm:py-6 px-3.5 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-[1292px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-9 items-center">
          
          {/* ========================================================
              LEFT COLUMN: Step badge, Headings, Feature items, 
              Illustration & Tagline (Inline layout)
             ======================================================== */}
          <div className="lg:col-span-5 xl:col-span-5">
            <RegistrationSidebar currentStep={currentStep} totalSteps={11} />
          </div>

          {/* ========================================================
              RIGHT COLUMN: Main White Card with Horizontal Stepper,
              Form Fields, Right-side Value Prop Card, & Next Button
             ======================================================== */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-md shadow-slate-200/40 p-5 sm:p-7 xl:p-8.5 relative">
              
              {/* Top 11-Step Horizontal Stepper */}
              <StepIndicator
                currentStep={currentStep}
                totalSteps={11}
                onSelectStep={handleJumpToStep}
                maxVisitedStep={maxVisitedStep}
              />

              <div className="border-t border-slate-100 pt-4 sm:pt-6">
                {/* When on Review Step (Step 12), show full width review */}
                {isReviewStep ? (
                  <Step12Review
                    data={formData}
                    completionPercentage={completionPercentage}
                    onJumpToStep={handleJumpToStep}
                    onSubmit={handleCompleteRegistration}
                    loading={submitting}
                    error={submitError}
                  />
                ) : (
                  /* 2-Column Layout Inside the Card (Matches Screenshot) */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-7 items-stretch">
                    
                    {/* Inner Left: Form Fields (approx 62% width) */}
                    <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Step 0: Account */}
                        {currentStep === 0 && (
                          <Step1Account
                            data={formData}
                            onChange={(fields) =>
                              setFormData((prev) => ({
                                ...prev,
                                account: { ...prev.account, ...fields }
                              }))
                            }
                            errors={errors}
                          />
                        )}

                        {/* Step 1: Profile Type */}
                        {currentStep === 1 && (
                          <Step2ProfileType
                            candidateType={formData.candidateType}
                            onSelect={(type) => {
                              setFormData((prev) => ({ ...prev, candidateType: type }));
                              setTimeout(() => handleNext(), 150);
                            }}
                          />
                        )}

                        {/* Step 2: Personal Details */}
                        {currentStep === 2 && (
                          <Step3PersonalDetails
                            data={formData}
                            onChange={(fields) =>
                              setFormData((prev) => ({
                                ...prev,
                                personal: { ...prev.personal, ...fields }
                              }))
                            }
                            errors={errors}
                          />
                        )}

                        {/* Step 3: Education */}
                        {currentStep === 3 && (
                          <Step4Education
                            educationList={formData.education}
                            onChange={(list) => setFormData((prev) => ({ ...prev, education: list }))}
                            candidateType={formData.candidateType}
                          />
                        )}

                        {/* Step 4: Experience */}
                        {currentStep === 4 && (
                          <Step5Experience
                            experienceList={formData.experience}
                            onChange={(list) => setFormData((prev) => ({ ...prev, experience: list }))}
                            candidateType={formData.candidateType}
                          />
                        )}

                        {/* Step 5: Skills */}
                        {currentStep === 5 && (
                          <Step6Skills
                            skillsList={formData.skills}
                            onChange={(list) => setFormData((prev) => ({ ...prev, skills: list }))}
                            error={errors.skills}
                          />
                        )}

                        {/* Step 6: Projects */}
                        {currentStep === 6 && (
                          <Step7Projects
                            projectsList={formData.projects}
                            onChange={(list) => setFormData((prev) => ({ ...prev, projects: list }))}
                          />
                        )}

                        {/* Step 7: Certifications & Achievements */}
                        {currentStep === 7 && (
                          <Step8CertificationsAchievements
                            certificationsList={formData.certifications}
                            achievementsList={formData.achievements}
                            onCertificationsChange={(list) =>
                              setFormData((prev) => ({ ...prev, certifications: list }))
                            }
                            onAchievementsChange={(list) =>
                              setFormData((prev) => ({ ...prev, achievements: list }))
                            }
                          />
                        )}

                        {/* Step 8: Professional Links */}
                        {currentStep === 8 && (
                          <Step9Links
                            links={formData.links}
                            onChange={(fields) =>
                              setFormData((prev) => ({
                                ...prev,
                                links: { ...prev.links, ...fields }
                              }))
                            }
                          />
                        )}

                        {/* Step 9: Preferences */}
                        {currentStep === 9 && (
                          <Step10Preferences
                            preferences={formData.careerPreferences}
                            onChange={(fields) =>
                              setFormData((prev) => ({
                                ...prev,
                                careerPreferences: { ...prev.careerPreferences, ...fields }
                              }))
                            }
                            candidateType={formData.candidateType}
                            errors={errors}
                          />
                        )}

                        {/* Step 10: Portfolio Setup */}
                        {currentStep === 10 && (
                          <Step11PortfolioSetup
                            portfolio={formData.portfolio}
                            fullName={formData.personal.fullName}
                            onChange={(fields) =>
                              setFormData((prev) => ({
                                ...prev,
                                portfolio: { ...prev.portfolio, ...fields }
                              }))
                            }
                          />
                        )}
                      </div>

                      {/* Bottom Button Row: Cancel / Back on Left, Next on Right */}
                      <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                        {currentStep === 0 ? (
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs sm:text-[13px] transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleBack}
                            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs sm:text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-6 sm:px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-[13px] flex items-center gap-2 shadow-sm shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
                        >
                          <span>{currentStep === 10 ? 'Review Profile' : 'Next'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                    {/* Inner Right: "Why create an account?" Card (approx 38% width) */}
                    <div className="lg:col-span-5 xl:col-span-5">
                      <SideValuePropCard />
                    </div>

                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
