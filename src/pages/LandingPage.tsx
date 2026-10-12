import React from 'react';
import { FigmaHero } from '../components/Home/FigmaHero';
import { ValuePropositionStrip } from '../components/Home/ValuePropositionStrip';
import { HiringCapabilitiesSection } from '../components/Home/HiringCapabilitiesSection';
import { HireFromUsSection } from '../components/Home/HireFromUsSection';
import { InternsAndExperiencedSection } from '../components/Home/InternsAndExperiencedSection';
import { EmployerDiscoverySection } from '../components/Home/EmployerDiscoverySection';
import { OneLinkProfileSection } from '../components/Home/OneLinkProfileSection';
import { CareerStageSection } from '../components/Home/CareerStageSection';
import { UnemployedIndiaBanner } from '../components/Home/UnemployedIndiaBanner';
import { FinalCtaBanner } from '../components/Home/FinalCtaBanner';

interface LandingPageProps {
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onApplyJob?: (job: any) => void;
  onBookmarkJob?: (jobId: string) => void;
  bookmarkedJobIds?: string[];
  onSelectTool?: (toolId: string) => void;
  onEmployerJobPublished?: (job: any) => void;
  onExplorePath?: (path: string) => void;
  onSeoLinkClick?: (title: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onOpenAuth,
}) => {
  return (
    <div className="w-full bg-white flex flex-col min-h-screen text-slate-900">
      {/* 1. Hero Section featuring Four Young Professionals & "Hire From Us. Get Hired Fast." */}
      <FigmaHero onOpenAuth={onOpenAuth} />

      {/* 2. Value Proposition Strip ("Zero Unemployed India — Built For Employers. Empowering Students.") */}
      <ValuePropositionStrip />

      {/* 3. Hiring Capabilities ("The Right Skills. The Right People.") */}
      <HiringCapabilitiesSection />

      {/* 4. Large Employer Talent Pool Section (2 Lakh+ Freshers & Experienced) */}
      <HireFromUsSection />

      {/* 5. Interns & Experienced Covered (Dual Track / Side-by-Side View) */}
      <InternsAndExperiencedSection />

      {/* 6. Employer Discovery Mockup ("Let Employers Discover You") */}
      <EmployerDiscoverySection />

      {/* 7. One Link Profile Showcase */}
      <OneLinkProfileSection />

      {/* 8. Built For Your Career Stage (Student, Fresher, Working Professional, Experienced) */}
      <CareerStageSection />

      {/* 9. Zero Unemployed India Mission Banner (Light / Premium Style) */}
      <UnemployedIndiaBanner />

      {/* 10. Final Call To Action Banner */}
      <FinalCtaBanner onOpenAuth={onOpenAuth} />
    </div>
  );
};
