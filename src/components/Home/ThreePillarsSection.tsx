import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import trophyImg from '../../assets/images/trophy_hackathon_3d_1788540171132.jpg';
import backpackImg from '../../assets/images/backpack_illustration_1788459993181.jpg';
import portfolioImg from '../../assets/images/portfolio_mockup_3d_1788540187292.jpg';

export const ThreePillarsSection: React.FC = () => {
  const cards = [
    {
      badge: 'CHALLENGES',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200/70',
      titleLine1: "Don't Just Say You Have Skills.",
      titleLine2: 'Prove Them.',
      desc: 'Take part in challenges and hackathons. Earn certificates and get noticed.',
      btnText: 'Explore Challenges',
      mobileBtnText: 'Challenges',
      link: '/challenges',
      image: trophyImg,
      alt: 'Challenges and Hackathons with Trophy',
    },
    {
      badge: 'INTERNSHIPS',
      badgeColor: 'text-purple-700 bg-purple-50 border-purple-200/70',
      titleLine1: 'Turn Your First Opportunity',
      titleLine2: 'Into Experience.',
      desc: 'Find internships that help you learn, grow and get ahead.',
      btnText: 'Explore Internships',
      mobileBtnText: 'Internships',
      link: '/internships',
      image: backpackImg,
      alt: 'Student Internship Backpack',
    },
    {
      badge: 'PORTFOLIO',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200/70',
      titleLine1: 'Your Projects Deserve More',
      titleLine2: 'Than a Line on Resume.',
      desc: 'Create a professional portfolio that showcases your work the right way.',
      btnText: 'Build My Portfolio',
      mobileBtnText: 'Portfolio',
      link: '/portfolio',
      image: portfolioImg,
      alt: 'Student Profile and Portfolio',
    },
  ];

  return (
    <section className="w-full bg-white py-4 sm:py-6 md:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6 items-stretch">
        {cards.map((card, index) => {
          const isFeaturedMobile = index === 0;
          return (
            <div
              key={card.btnText}
              className={`bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group ${
                isFeaturedMobile
                  ? 'col-span-2 md:col-span-1 flex flex-row items-center justify-between gap-2.5 sm:gap-4'
                  : 'col-span-1 md:col-span-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 sm:gap-4'
              }`}
            >
              {/* Left Column: Text & Action Button */}
              <div className="flex-1 flex flex-col justify-between h-full z-10 w-full">
                <div>
                  <span
                    className={`inline-flex items-center text-[8.5px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md mb-1 sm:mb-1.5 border ${card.badgeColor}`}
                  >
                    {card.badge}
                  </span>
                  <h3
                    className={`font-extrabold text-slate-900 tracking-tight leading-tight md:leading-snug font-display ${
                      isFeaturedMobile
                        ? 'text-xs sm:text-[15px] md:text-[17px]'
                        : 'text-[11px] sm:text-[14px] md:text-[17px] line-clamp-2'
                    }`}
                  >
                    {card.titleLine1} <br className="hidden md:inline" />
                    <span>{card.titleLine2}</span>
                  </h3>
                  <p
                    className={`text-slate-500 font-normal mt-1 sm:mt-1.5 max-w-[210px] ${
                      isFeaturedMobile
                        ? 'text-[10px] sm:text-xs leading-snug line-clamp-2'
                        : 'hidden sm:block text-xs leading-relaxed line-clamp-2'
                    }`}
                  >
                    {card.desc}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 w-full md:w-auto">
                  <Link
                    to={card.link}
                    className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-blue-200/90 bg-white text-blue-600 text-[10.5px] sm:text-xs font-semibold hover:bg-blue-50/70 hover:border-blue-300 transition-all shadow-2xs group/btn w-full md:w-auto"
                  >
                    <span className="md:hidden">{card.mobileBtnText}</span>
                    <span className="hidden md:inline">{card.btnText}</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-0.5 transition-transform text-blue-600" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 3D Illustration Graphic */}
              <div
                className={`shrink-0 relative flex items-center justify-center ${
                  isFeaturedMobile
                    ? 'w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36'
                    : 'w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto md:mx-0 my-1 md:my-0'
                }`}
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 select-none"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
