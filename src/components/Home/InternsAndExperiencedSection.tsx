import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import governmentDomeImg from '../../assets/images/government_dome_3d_1788699260897.jpg';
import backpackImg from '../../assets/images/backpack_illustration_1788459993181.jpg';
import portfolioImg from '../../assets/images/portfolio_mockup_3d_1788540187292.jpg';

export const InternsAndExperiencedSection: React.FC = () => {
  const cards = [
    {
      badge: 'GOVT JOBS',
      badgeColor: 'text-teal-700 bg-teal-50 border-teal-200/80',
      titleLine1: 'Explore Verified Government',
      titleLine2: 'Notifications & Exams.',
      desc: 'Central and state government hiring notices, eligibility criteria, and syllabus.',
      btnText: 'Explore Govt Jobs',
      link: '/government-jobs',
      image: governmentDomeImg,
      alt: 'Government Jobs and Notifications',
    },
    {
      badge: 'INTERNSHIPS',
      badgeColor: 'text-purple-700 bg-purple-50 border-purple-200/80',
      titleLine1: 'Turn Your First Opportunity',
      titleLine2: 'Into Experience.',
      desc: 'Find internships that help you learn, grow and get ahead.',
      btnText: 'Explore Internships',
      link: '/internships',
      image: backpackImg,
      alt: 'Student Internship Backpack',
    },
    {
      badge: 'PORTFOLIO',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200/80',
      titleLine1: 'Your Projects Deserve More',
      titleLine2: 'Than a Line on Resume.',
      desc: 'Create a professional portfolio that showcases your work the right way.',
      btnText: 'Build My Portfolio',
      link: '/portfolio',
      image: portfolioImg,
      alt: 'Student Profile and Portfolio',
    },
  ];

  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch">
        {cards.map((card) => (
          <div
            key={card.badge}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group isolate"
          >
            {/* Top Row: Content & 3D Illustration Graphic */}
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              {/* Text Column */}
              <div className="flex-1 space-y-1.5 text-left">
                <span
                  className={`inline-flex items-center text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md border tracking-wider uppercase ${card.badgeColor}`}
                >
                  {card.badge}
                </span>

                <h3 className="font-extrabold text-slate-900 tracking-tight leading-snug font-display text-[15px] sm:text-base lg:text-[17px] pt-0.5">
                  {card.titleLine1} <br />
                  <span>{card.titleLine2}</span>
                </h3>

                <p className="text-slate-500 font-normal text-xs sm:text-[12.5px] leading-relaxed pt-1">
                  {card.desc}
                </p>
              </div>

              {/* 3D Illustration Graphic */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 flex items-center justify-center">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 select-none"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bottom Row: CTA Button */}
            <div className="pt-4 sm:pt-5 text-left">
              <Link
                to={card.link}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-blue-200/90 bg-white text-blue-600 hover:bg-blue-50/70 hover:border-blue-300 text-xs font-semibold shadow-2xs transition-all group/btn"
              >
                <span>{card.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform text-blue-600" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

