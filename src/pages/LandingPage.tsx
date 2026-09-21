import React from 'react';
import { FigmaHero } from '../components/Home/FigmaHero';
import { FindOpportunitySection } from '../components/Home/FindOpportunitySection';
import { NoExperienceSection } from '../components/Home/NoExperienceSection';
import { ThreePillarsSection } from '../components/Home/ThreePillarsSection';
import { AtsResumeSection } from '../components/Home/AtsResumeSection';
import { FirstJobSearchSection } from '../components/Home/FirstJobSearchSection';
import { RecruiterProfileSection } from '../components/Home/RecruiterProfileSection';
import { GovtOpportunitiesSection } from '../components/Home/GovtOpportunitiesSection';
import { LatestAndHiringSection } from '../components/Home/LatestAndHiringSection';
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
      {/* 1. Hero Section */}
      <FigmaHero onOpenAuth={onOpenAuth} />

      {/* 2. Find Your Next Opportunity (includes Journey steps right below description) */}
      <FindOpportunitySection />

      {/* 4. No Experience? Start Here. */}
      <NoExperienceSection />

      {/* 5. Three Pillars: Challenges, Internships, Portfolio */}
      <ThreePillarsSection />

      {/* 6. Turn Your Student Journey Into a Resume */}
      <AtsResumeSection />

      {/* 7. When You're Ready, Find Your First Job */}
      <FirstJobSearchSection />

      {/* 8. Built for Students. Loved by Recruiters. */}
      <RecruiterProfileSection />

      {/* 9. Government Opportunities */}
      <GovtOpportunitiesSection />

      {/* 10. Latest Opportunities & Are You Hiring? */}
      <LatestAndHiringSection />

      {/* 11. Final Call To Action Banner */}
      <FinalCtaBanner onOpenAuth={onOpenAuth} />
    </div>
  );
};
