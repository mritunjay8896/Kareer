import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import trophyImg from '../../assets/images/trophy_hackathon_3d_1788540171132.jpg';
import backpackImg from '../../assets/images/backpack_illustration_1788459993181.jpg';
import portfolioImg from '../../assets/images/portfolio_mockup_3d_1788540187292.jpg';

export const ThreePillarsSection: React.FC = () => {
  const cards = [
    {
      titleLine1: "Don't Just Say You Have Skills.",
      titleLine2: 'Prove Them.',
      desc: 'Take part in challenges and hackathons. Earn certificates and get noticed.',
      btnText: 'Explore Challenges',
      link: '/challenges',
      image: trophyImg,
      alt: 'Challenges and Hackathons with Trophy',
    },
    {
      titleLine1: 'Turn Your First Opportunity',
      titleLine2: 'Into Experience.',
      desc: 'Find internships that help you learn, grow and get ahead.',
      btnText: 'Explore Internships',
      link: '/internships',
      image: backpackImg,
      alt: 'Student Internship Backpack',
    },
    {
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
    <section className="w-full bg-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {cards.map((card) => (
          <div
            key={card.btnText}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-row items-center justify-between gap-3 sm:gap-4 relative overflow-hidden group"
          >
            {/* Left Column: Text & Action Button */}
            <div className="flex-1 flex flex-col justify-between h-full z-10">
              <div>
                <h3 className="text-base sm:text-[17px] font-extrabold text-slate-900 tracking-tight leading-snug font-display">
                  {card.titleLine1} <br />
                  <span>{card.titleLine2}</span>
                </h3>
                <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1.5 max-w-[210px] line-clamp-2">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to={card.link}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-blue-200/90 bg-white text-blue-600 text-xs font-semibold hover:bg-blue-50/70 hover:border-blue-300 transition-all shadow-2xs group/btn"
                >
                  <span>{card.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform text-blue-600" />
                </Link>
              </div>
            </div>

            {/* Right Column: 3D Illustration Graphic */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 shrink-0 relative flex items-center justify-center">
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 select-none"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
