import React from 'react';
import { FigmaHero } from '../components/Home/FigmaHero';
import { ValuePropositionStrip } from '../components/Home/ValuePropositionStrip';
import { HowItWorksSection } from '../components/Home/HowItWorksSection';
import { DualShowcaseSection } from '../components/Home/DualShowcaseSection';
import { OneLinkProfileSection } from '../components/Home/OneLinkProfileSection';
import { EmployerDiscoverySection } from '../components/Home/EmployerDiscoverySection';
import { CareerStageSection } from '../components/Home/CareerStageSection';
import { FinalCtaBanner } from '../components/Home/FinalCtaBanner';
import { JobItem, CareerSwitchPath } from '../types';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onApplyJob?: (job: JobItem) => void;
  onBookmarkJob?: (jobId: string) => void;
  bookmarkedJobIds?: string[];
  onSelectTool?: (toolName: string) => void;
  onEmployerJobPublished?: (title: string, company: string) => void;
  onExplorePath?: (path: CareerSwitchPath) => void;
  onSeoLinkClick?: (url: string, label: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
}) => {
  return (
    <div className="w-full bg-white flex flex-col min-h-screen">
      {/* 1. Hero Banner: Build Your Professional Identity */}
      <FigmaHero onOpenAuth={onOpenAuth} />

      {/* 2. Value Proposition Strip: One Profile. Multiple Possibilities. */}
      <ValuePropositionStrip />

      {/* 3. How Glitread Works (4 Steps with Connecting Arrows) */}
      <HowItWorksSection />

      {/* 4. Dual Showcase: Build a Resume That Gets Read & Your Career Deserves More Than a PDF */}
      <DualShowcaseSection />

      {/* 5. One Link. Your Entire Professional Profile. */}
      <OneLinkProfileSection />

      {/* 6. Let Employers Discover You. */}
      <EmployerDiscoverySection />

      {/* 7. Built For Your Career Stage (Student, Fresher, Working Prof, Experienced Prof) */}
      <CareerStageSection />

      {/* 8. Final CTA Banner: Ready to Build Your Professional Identity? */}
      <FinalCtaBanner onOpenAuth={onOpenAuth} />
    </div>
  );
};
