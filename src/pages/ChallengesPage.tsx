import React, { useState, useMemo, useRef } from 'react';
import { 
  Trophy, 
  Search, 
  ArrowRight, 
  Code2,
  Code,
  PenTool,
  Briefcase,
  Building2,
  Users,
  Clock,
  Rocket,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  X
} from 'lucide-react';
import { Breadcrumb } from '../components/UI/Breadcrumb';
import { ChallengeItem, ChallengeRegistration } from '../types';
import { MOCK_CHALLENGES } from '../data/mockChallenges';
import { ChallengeCard } from '../components/Challenges/ChallengeCard';
import { ChallengeFilterSidebar, ChallengeFilterState } from '../components/Challenges/ChallengeFilterSidebar';
import { ChallengeRegisterModal } from '../components/Challenges/ChallengeRegisterModal';
import challengeBanner3 from '../image1/challege_banner_3.png';

interface ChallengesPageProps {
  challenges?: ChallengeItem[];
  bookmarkedIds?: string[];
  onBookmark?: (id: string) => void;
}

interface FeaturedChallengeItem {
  id: string;
  categoryType: string;
  categoryTheme: 'blue' | 'purple' | 'pink' | 'amber';
  icon: React.ElementType;
  title: string;
  description: string;
  skills: string[];
  duration: string;
  organizer: string;
  prizePool: string;
  fullChallenge?: ChallengeItem;
}

export const ChallengesPage: React.FC<ChallengesPageProps> = ({
  challenges = MOCK_CHALLENGES,
  bookmarkedIds = [],
  onBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [myChallengesTab, setMyChallengesTab] = useState<'All' | 'In Progress' | 'Completed' | 'Upcoming'>('All');
  const [showAllChallenges, setShowAllChallenges] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedChallengeForRegister, setSelectedChallengeForRegister] = useState<ChallengeItem | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [userRegistrations, setUserRegistrations] = useState<ChallengeRegistration[]>([]);

  const challengesSectionRef = useRef<HTMLDivElement>(null);
  const myChallengesSectionRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<ChallengeFilterState>({
    searchQuery: '',
    types: [],
    modes: [],
    participationTypes: [],
    difficulties: [],
    eligibilities: [],
    deadlineRange: 'all',
    selectedSkills: [],
    onlyFeatured: false,
    onlyVerified: false
  });

  const availableSkills = useMemo(() => {
    const set = new Set<string>();
    challenges.forEach(c => c.skills.forEach(s => set.add(s)));
    return Array.from(set).sort();
  }, [challenges]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      types: [],
      modes: [],
      participationTypes: [],
      difficulties: [],
      eligibilities: [],
      deadlineRange: 'all',
      selectedSkills: [],
      onlyFeatured: false,
      onlyVerified: false
    });
    setSelectedCategory(null);
  };

  const scrollToChallenges = () => {
    challengesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToMyChallenges = () => {
    myChallengesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 7 Categories from screenshot
  const categoryList = [
    {
      id: 'tech',
      title: 'Tech Challenges',
      subtitle: 'Solve real-world tech problems',
      icon: Code2,
      cardBg: 'bg-[#F4F2FF] border-[#E8E3FF] hover:border-[#D6CCFF]',
      iconBoxBg: 'bg-[#EAE4FF] text-[#6E42E5]',
      buttonBg: 'bg-[#EAE4FF] text-[#6E42E5] group-hover:bg-[#6E42E5] group-hover:text-white',
      filterKey: 'Tech'
    },
    {
      id: 'coding',
      title: 'Coding',
      subtitle: 'Sharpen your coding skills',
      icon: Code,
      cardBg: 'bg-[#EEFBF5] border-[#D5F5E4] hover:border-[#B7EFD1]',
      iconBoxBg: 'bg-[#D7F7E6] text-[#00A86B]',
      buttonBg: 'bg-[#D7F7E6] text-[#00A86B] group-hover:bg-[#00A86B] group-hover:text-white',
      filterKey: 'Coding'
    },
    {
      id: 'design',
      title: 'Design',
      subtitle: 'Create. Design. Innovate.',
      icon: PenTool,
      cardBg: 'bg-[#FFF9EC] border-[#FDEAC4] hover:border-[#FBDCA3]',
      iconBoxBg: 'bg-[#FDF0D0] text-[#D97706]',
      buttonBg: 'bg-[#FDF0D0] text-[#D97706] group-hover:bg-[#D97706] group-hover:text-white',
      filterKey: 'Design'
    },
    {
      id: 'business',
      title: 'Business',
      subtitle: 'Think. Analyze. Build.',
      icon: Briefcase,
      cardBg: 'bg-[#FFF0F4] border-[#FCD6E0] hover:border-[#F9BDCD]',
      iconBoxBg: 'bg-[#FCE1E9] text-[#E11D48]',
      buttonBg: 'bg-[#FCE1E9] text-[#E11D48] group-hover:bg-[#E11D48] group-hover:text-white',
      filterKey: 'Business'
    },
    {
      id: 'hackathons',
      title: 'Hackathons',
      subtitle: 'Collaborate & Build together',
      icon: Trophy,
      cardBg: 'bg-[#EFF6FF] border-[#DBEAFE] hover:border-[#BFDBFE]',
      iconBoxBg: 'bg-[#DBEAFE] text-[#2563EB]',
      buttonBg: 'bg-[#DBEAFE] text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white',
      filterKey: 'Hackathon'
    },
    {
      id: 'company',
      title: 'Company Challenges',
      subtitle: 'Solve problems from real companies',
      icon: Building2,
      cardBg: 'bg-[#F6F2FF] border-[#EADBFF] hover:border-[#DCC8FF]',
      iconBoxBg: 'bg-[#EEDDFF] text-[#7C3AED]',
      buttonBg: 'bg-[#EEDDFF] text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white',
      filterKey: 'Company'
    },
    {
      id: 'nontech',
      title: 'Non-Tech',
      subtitle: 'Explore beyond technology',
      icon: Users,
      cardBg: 'bg-[#F0FDF8] border-[#D3F9E7] hover:border-[#B2F5D7]',
      iconBoxBg: 'bg-[#D7F8E8] text-[#059669]',
      buttonBg: 'bg-[#D7F8E8] text-[#059669] group-hover:bg-[#059669] group-hover:text-white',
      filterKey: 'Non-Tech'
    }
  ];

  // 4 Featured Challenges from screenshot
  const featuredCards: FeaturedChallengeItem[] = [
    {
      id: 'feat-web-app',
      categoryType: 'Tech Challenge',
      categoryTheme: 'blue',
      icon: Code2,
      title: 'Build a Web App Challenge',
      description: 'Create a functional web application using modern technologies.',
      skills: ['Web Development', 'React', 'JavaScript'],
      duration: 'Open • 2 weeks',
      organizer: 'DevCommunity Global',
      prizePool: '₹50,000',
      fullChallenge: challenges.find(c => c.id === 'ch-fullstack-odyssey') || challenges[1] || challenges[0]
    },
    {
      id: 'feat-ai-tomorrow',
      categoryType: 'Hackathon',
      categoryTheme: 'purple',
      icon: Trophy,
      title: 'AI for a Better Tomorrow',
      description: 'Build innovative solutions using AI/ML to solve real-world problems.',
      skills: ['AI/ML', 'Python', 'Data Science'],
      duration: 'Open • 3 weeks',
      organizer: 'Google Developer Student Clubs',
      prizePool: '₹1,00,000',
      fullChallenge: challenges.find(c => c.id === 'ch-ai-innovation-2026') || challenges[0]
    },
    {
      id: 'feat-uiux-design',
      categoryType: 'Design Challenge',
      categoryTheme: 'pink',
      icon: PenTool,
      title: 'UI/UX Design Challenge',
      description: 'Design a user-friendly interface for modern web or mobile applications.',
      skills: ['Figma', 'UI/UX', 'Design'],
      duration: 'Open • 1 week',
      organizer: 'Zomato Design Hub',
      prizePool: '₹30,000',
      fullChallenge: challenges.find(c => c.id === 'ch-uiux-sprint') || challenges[3] || challenges[0]
    },
    {
      id: 'feat-marketing-strategy',
      categoryType: 'Business Challenge',
      categoryTheme: 'amber',
      icon: Briefcase,
      title: 'Marketing Strategy Challenge',
      description: 'Create a marketing plan for a real-world brand or product.',
      skills: ['Marketing', 'Strategy', 'Communication'],
      duration: 'Open • 2 weeks',
      organizer: 'Razorpay Strategy Lab',
      prizePool: '₹80,000',
      fullChallenge: challenges.find(c => c.id === 'ch-fintech-case') || challenges[2] || challenges[0]
    }
  ];

  const handleOpenRegister = (challenge: ChallengeItem) => {
    setSelectedChallengeForRegister(challenge);
    setIsRegisterModalOpen(true);
  };

  const handleRegistrationSuccess = (reg: ChallengeRegistration) => {
    setUserRegistrations(prev => [reg, ...prev]);
    setIsRegisterModalOpen(false);
  };

  const filteredChallenges = useMemo(() => {
    return challenges.filter((c) => {
      // Category filter from cards
      if (selectedCategory) {
        const matchesCategory = 
          c.type.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          c.category.toLowerCase().includes(selectedCategory.toLowerCase());
        if (!matchesCategory) return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matches =
          c.title.toLowerCase().includes(q) ||
          c.organizer.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.skills.some(s => s.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Types
      if (filters.types.length > 0 && !filters.types.includes(c.type)) return false;
      // Modes
      if (filters.modes.length > 0 && !filters.modes.includes(c.mode)) return false;
      // Participation
      if (filters.participationTypes.length > 0 && !filters.participationTypes.includes(c.participationType)) return false;
      // Difficulty
      if (filters.difficulties.length > 0 && !filters.difficulties.includes(c.difficulty)) return false;
      // Eligibility
      if (filters.eligibilities.length > 0 && !filters.eligibilities.includes(c.eligibility)) return false;
      // Verified / Featured
      if (filters.onlyFeatured && !c.featured) return false;
      if (filters.onlyVerified && !c.verifiedOrganizer) return false;
      // Skills
      if (filters.selectedSkills.length > 0) {
        const hasSkill = filters.selectedSkills.some(sk => c.skills.includes(sk));
        if (!hasSkill) return false;
      }

      return true;
    });
  }, [challenges, filters, selectedCategory]);

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-0">
      
      {/* Top Breadcrumb */}
      <div className="w-full bg-white/70 border-b border-slate-200/70 px-3 sm:px-4 py-1.5">
        <div className="w-full max-w-[1340px] xl:max-w-[1380px] mx-auto px-1 sm:px-2">
          <Breadcrumb items={[{ label: 'Challenges' }]} />
        </div>
      </div>

      {/* 1. HERO BANNER (Compact, Least Margin & Padding, Seamless Fit) */}
      <div className="w-full px-2 sm:px-3 lg:px-4 pt-1 sm:pt-1.5">
        <div className="w-full max-w-[1340px] xl:max-w-[1380px] mx-auto bg-gradient-to-r from-[#BCD6EF] via-[#C5DDF5] to-[#CEDEEE] rounded-xl md:rounded-2xl border border-[#ADCDEC]/90 shadow-2xs overflow-hidden px-3 sm:px-4 lg:px-5 py-0.5 grid grid-cols-1 md:grid-cols-12 gap-2 lg:gap-4 items-center">
          
          {/* Left Text & CTA */}
          <div className="md:col-span-6 lg:col-span-5 relative z-10 py-1.5 sm:py-2 md:py-2.5 self-center">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 text-blue-800 border border-blue-200/70 text-[10px] font-semibold tracking-wide shadow-2xs">
              <span>Build • Practice • Grow</span>
            </div>

            <h1 className="text-lg sm:text-xl lg:text-[23px] font-black text-slate-900 tracking-tight leading-snug mt-1 font-display">
              Don’t Just Say You Have Skills.{' '}
              <span className="text-blue-800 block sm:inline">Prove Them.</span>
            </h1>

            <p className="text-slate-700 text-[11px] sm:text-[11.5px] mt-0.5 leading-relaxed font-normal max-w-md">
              Participate in challenges and hackathons, build real projects, and showcase your abilities to stand out from the crowd.
            </p>

            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <button 
                onClick={scrollToChallenges}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <span>Explore Challenges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button 
                onClick={scrollToMyChallenges}
                className="px-3 py-1.5 bg-white/90 hover:bg-white text-slate-800 font-semibold text-xs rounded-lg border border-blue-200/80 transition-all cursor-pointer shadow-2xs"
              >
                <span>View My Progress</span>
              </button>
            </div>
          </div>

          {/* Right 3D Illustration - Seamlessly blended, snug fitting */}
          <div className="md:col-span-6 lg:col-span-7 relative flex items-center justify-center md:justify-end self-center select-none overflow-hidden py-0">
            {/* 4-sided gradient edge feather masks to guarantee zero hard native edges */}
            <div className="absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-[#C5DDF5] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-[#CEDEEE] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 top-0 h-5 sm:h-6 bg-gradient-to-b from-[#C5DDF5] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-5 sm:h-6 bg-gradient-to-t from-[#C5DDF5] to-transparent pointer-events-none z-10" />

            <img 
              src={challengeBanner3} 
              alt="Challenges and competitions" 
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse 90% 86% at 50% 50%, black 50%, rgba(0, 0, 0, 0.85) 72%, transparent 98%)',
                maskImage: 'radial-gradient(ellipse 90% 86% at 50% 50%, black 50%, rgba(0, 0, 0, 0.85) 72%, transparent 98%)',
              }}
              className="w-full max-w-[460px] sm:max-w-[520px] md:max-w-[580px] lg:max-w-[640px] xl:max-w-[680px] h-[155px] sm:h-[175px] md:h-[190px] lg:h-[205px] xl:h-[215px] object-contain object-center pointer-events-none select-none block"
            />
          </div>
        </div>
      </div>

      {/* Main Container - Compact Spacing */}
      <div className="w-full max-w-[1340px] xl:max-w-[1380px] mx-auto px-2 sm:px-3 lg:px-4 py-3.5 sm:py-4 space-y-4 sm:space-y-5 pb-10">

        {/* 2. EXPLORE BY CATEGORY */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-display">Explore by Category</h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Clear filter: {selectedCategory}</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5">
            {categoryList.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.filterKey;

              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(isSelected ? null : cat.filterKey);
                    scrollToChallenges();
                  }}
                  className={`${cat.cardBg} ${
                    isSelected ? 'ring-2 ring-blue-600 shadow-sm' : ''
                  } rounded-2xl p-4 flex flex-col justify-between h-[168px] sm:h-[180px] transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer group border`}
                >
                  <div>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.iconBoxBg} mb-3 transition-transform group-hover:scale-105`}>
                      <IconComp className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-snug mt-1 line-clamp-2">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${cat.buttonBg}`}>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. FEATURED CHALLENGES */}
        <section ref={challengesSectionRef} className="scroll-mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-display">Featured Challenges</h2>
              {selectedCategory && (
                <span className="text-xs font-semibold text-blue-600 block mt-0.5">
                  Filtered by Category: <strong>{selectedCategory}</strong>
                </span>
              )}
            </div>

            <button
              onClick={() => setShowAllChallenges(!showAllChallenges)}
              className="px-3.5 py-1.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
            >
              <span>{showAllChallenges ? 'Show Featured Only' : 'View All Challenges'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Cards Default View from screenshot */}
          {!showAllChallenges && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredCards.map((card) => {
                const IconComp = card.icon;

                // Color mappings based on card category theme
                const themeStyles = {
                  blue: {
                    badge: 'bg-blue-50 text-blue-600 border-blue-100',
                    icon: 'bg-blue-50 text-blue-600'
                  },
                  purple: {
                    badge: 'bg-purple-50 text-purple-600 border-purple-100',
                    icon: 'bg-purple-50 text-purple-600'
                  },
                  pink: {
                    badge: 'bg-pink-50 text-pink-600 border-pink-100',
                    icon: 'bg-pink-50 text-pink-600'
                  },
                  amber: {
                    badge: 'bg-amber-50 text-amber-600 border-amber-100',
                    icon: 'bg-amber-50 text-amber-600'
                  }
                }[card.categoryTheme];

                return (
                  <div
                    key={card.id}
                    onClick={() => card.fullChallenge && handleOpenRegister(card.fullChallenge)}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between gap-2">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${themeStyles.icon}`}>
                          <IconComp className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${themeStyles.badge}`}>
                          {card.categoryType}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-bold text-slate-900 text-sm sm:text-[14.5px] mt-3 group-hover:text-blue-600 transition-colors leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                        {card.description}
                      </p>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
                        {card.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-0.5 rounded-full bg-slate-100/90 text-slate-600 text-[10.5px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Status & Arrow */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{card.duration}</span>
                      </div>

                      <div className="w-7 h-7 rounded-full border border-blue-200 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Expanded Catalog View with Filters (When 'View All' is toggled) */}
          {showAllChallenges && (
            <div className="space-y-6">
              {/* Search and Sort Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    placeholder="Search challenges by title, skill, or organizer..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 text-slate-900 text-xs font-medium rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  {filters.searchQuery && (
                    <button
                      onClick={() => setFilters({ ...filters, searchQuery: '' })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                    className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                    <span>Filter</span>
                  </button>
                  <span className="text-xs text-slate-500 font-medium">
                    Showing <strong>{filteredChallenges.length}</strong> challenges
                  </span>
                </div>
              </div>

              {/* Grid with Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                <div className="hidden lg:block lg:col-span-1">
                  <ChallengeFilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    onReset={handleResetFilters}
                    availableSkills={availableSkills}
                  />
                </div>

                {mobileFilterOpen && (
                  <div className="lg:hidden col-span-1 mb-4">
                    <ChallengeFilterSidebar
                      filters={filters}
                      onFilterChange={setFilters}
                      onReset={handleResetFilters}
                      availableSkills={availableSkills}
                    />
                  </div>
                )}

                <div className="lg:col-span-3">
                  {filteredChallenges.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
                      <Trophy className="w-10 h-10 text-slate-300 mx-auto" />
                      <h3 className="text-sm font-bold text-slate-900">No challenges found</h3>
                      <p className="text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
                      <button
                        onClick={handleResetFilters}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {filteredChallenges.map((challenge) => (
                        <ChallengeCard
                          key={challenge.id}
                          challenge={challenge}
                          isBookmarked={bookmarkedIds.includes(challenge.id)}
                          onBookmark={onBookmark}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 4. MY CHALLENGES */}
        <section ref={myChallengesSectionRef} className="scroll-mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-display">My Challenges</h2>
            <button 
              onClick={() => setShowAllChallenges(true)}
              className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Filter Tabs (All, In Progress, Completed, Upcoming) */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar py-0.5">
            {(['All', 'In Progress', 'Completed', 'Upcoming'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMyChallengesTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  myChallengesTab === tab
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Registrations List or Empty State */}
          {userRegistrations.length > 0 && myChallengesTab === 'All' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userRegistrations.map((reg) => (
                <div key={reg.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[11px] font-bold">
                      Registered
                    </span>
                    <span className="text-[11px] text-slate-400">{reg.registeredAt}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{reg.challengeTitle}</h4>
                  <p className="text-xs text-slate-500">{reg.organizer}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Type: {reg.participationType}</span>
                    <button
                      onClick={scrollToChallenges}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Screenshot-Accurate Empty State Card */
            <div className="bg-white rounded-2xl border border-slate-200/90 p-10 sm:p-14 text-center flex flex-col items-center justify-center space-y-2.5 shadow-2xs">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-1">
                <Trophy className="w-7 h-7 stroke-[1.8]" />
              </div>
              
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                No challenges joined yet
              </h3>
              
              <p className="text-xs text-slate-500 max-w-sm">
                Explore available challenges and start building your skills today.
              </p>

              <button
                onClick={scrollToChallenges}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors mt-2 cursor-pointer"
              >
                <span>Explore Challenges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </section>

        {/* 5. BOTTOM CALLOUT BANNER */}
        <div className="bg-gradient-to-r from-blue-50/90 via-sky-50/70 to-blue-50/80 rounded-2xl p-6 sm:p-8 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xs">
          {/* Left Text */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-100/90 text-blue-600 flex items-center justify-center shrink-0">
              <Rocket className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg font-display">
                Ready to Build Your Skills?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Join challenges, compete, and showcase your talent to top recruiters.
              </p>
            </div>
          </div>

          {/* Right Action & Dartboard Illustration */}
          <div className="flex items-center gap-4 sm:gap-6 relative z-10 shrink-0">
            <button
              onClick={scrollToChallenges}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Explore Challenges</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Bullseye Dartboard graphic */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 relative flex items-center justify-center select-none pointer-events-none">
              <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer Ring */}
                <circle cx="56" cy="54" r="34" stroke="#3B82F6" strokeWidth="6" strokeDasharray="6 3" />
                {/* Middle Ring */}
                <circle cx="56" cy="54" r="24" stroke="#60A5FA" strokeWidth="5" />
                {/* Inner Bullseye */}
                <circle cx="56" cy="54" r="12" fill="#2563EB" />
                <circle cx="56" cy="54" r="5" fill="#EFF6FF" />
                {/* Arrow hitting bullseye */}
                <path d="M20 20 L52 52" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round" />
                <path d="M16 24 L20 20 L24 16" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
                {/* Sparkles */}
                <circle cx="16" cy="46" r="2.5" fill="#60A5FA" />
                <circle cx="82" cy="18" r="2.5" fill="#60A5FA" />
                <circle cx="88" cy="72" r="2" fill="#93C5FD" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Challenge Register Modal */}
      {selectedChallengeForRegister && (
        <ChallengeRegisterModal
          challenge={selectedChallengeForRegister}
          isOpen={isRegisterModalOpen}
          onClose={() => {
            setIsRegisterModalOpen(false);
            setSelectedChallengeForRegister(null);
          }}
          onSuccess={handleRegistrationSuccess}
        />
      )}

    </div>
  );
};

