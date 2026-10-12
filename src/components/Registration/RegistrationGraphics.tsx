import React from 'react';
import internBoyImg from '../../image1/intern_boy.png';

export const CandidateIllustration: React.FC = () => {
  return (
    <div className="relative z-0 w-full max-w-[195px] sm:max-w-[210px] mx-auto py-1 flex flex-col items-center">
      <img
        src={internBoyImg}
        alt="Candidate Journey on Glitread"
        className="w-full h-auto max-h-[140px] object-contain drop-shadow-xs relative z-0"
      />

      {/* Styled Tagline below illustration */}
      <div className="text-center mt-1.5 space-y-0.5 relative z-0">
        <p className="font-serif italic text-[11.5px] font-bold text-slate-800 tracking-wide">
          Your Talent. Your Story.
        </p>
        <p className="font-serif italic text-[11px] font-semibold text-blue-700 relative inline-block">
          On Glitread.
          <svg className="w-13 h-1.5 text-blue-400 absolute -bottom-0.5 left-1/2 -translate-x-1/2" viewBox="0 0 60 8" fill="none">
            <path d="M2 6 Q30 1 58 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </p>
      </div>
    </div>
  );
};

export const ShieldLockIllustration: React.FC = () => {
  return (
    <div className="relative w-17 h-17 sm:w-19 sm:h-19 mx-auto flex items-center justify-center">
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md animate-pulse" />

      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-xs"
      >
        {/* Floating Sparkles */}
        <circle cx="20" cy="35" r="1.5" fill="#60A5FA" />
        <circle cx="100" cy="30" r="2" fill="#3B82F6" />
        <circle cx="15" cy="80" r="2" fill="#93C5FD" />
        <circle cx="105" cy="75" r="1.5" fill="#60A5FA" />
        <path d="M96 20 Q96 24 100 24 Q96 24 96 28 Q96 24 92 24 Q96 24 96 20 Z" fill="#60A5FA" />

        {/* Outer 3D Shield Base */}
        <path
          d="M60 14 L95 28 C95 62 80 88 60 102 C40 88 25 62 25 28 L60 14 Z"
          fill="url(#shield-grad-base)"
          stroke="#93C5FD"
          strokeWidth="1.5"
        />

        {/* Inner Shield Layer */}
        <path
          d="M60 22 L87 34 C87 60 74 81 60 92 C46 81 33 60 33 34 L60 22 Z"
          fill="url(#shield-grad-inner)"
        />

        {/* Gloss highlight */}
        <path
          d="M60 22 L87 34 C87 50 82 66 74 78 C68 55 64 36 60 22 Z"
          fill="#FFFFFF"
          opacity="0.25"
        />

        {/* Center Lock */}
        {/* Shackle */}
        <rect x="52" y="45" width="16" height="15" rx="8" fill="none" stroke="#FFFFFF" strokeWidth="3" />
        {/* Lock Body */}
        <rect x="48" y="55" width="24" height="20" rx="5" fill="#FFFFFF" />
        {/* Keyhole */}
        <circle cx="60" cy="63" r="2.5" fill="#2563EB" />
        <path d="M59 64 L58 69 H62 L61 64 Z" fill="#2563EB" />

        <defs>
          <linearGradient id="shield-grad-base" x1="25" y1="14" x2="95" y2="102" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" />
            <stop offset="0.5" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="shield-grad-inner" x1="33" y1="22" x2="87" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#93C5FD" />
            <stop offset="0.4" stopColor="#60A5FA" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
