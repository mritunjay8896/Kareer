import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroStudentImg from '../../assets/images/hero_student_1788459979282.jpg';

interface FinalCtaBannerProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const FinalCtaBanner: React.FC<FinalCtaBannerProps> = ({ onOpenAuth }) => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto bg-gradient-to-r from-[#EFF6FF] via-[#EEF4FF] to-[#E8F0FE] border border-blue-100 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xs">
        
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-200/30 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left: 3D Student Character with "Your Future Starts Here" annotation */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Hand-drawn Annotation: "Your Future Starts Here" with curved arrow */}
            <div className="hidden sm:flex flex-col items-center absolute -top-4 right-2 sm:right-6 z-20 pointer-events-none select-none">
              <span className="text-blue-600 font-serif italic font-bold text-xs sm:text-sm transform rotate-6 whitespace-nowrap">
                Your Future <br />
                Starts Here
              </span>
              <svg width="48" height="36" viewBox="0 0 48 36" fill="none" className="text-blue-500 transform -rotate-12 translate-x-2">
                <path 
                  d="M10 4 C 24 10, 36 20, 20 28" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  fill="none" 
                  strokeDasharray="2 3"
                />
                <path 
                  d="M16 22 L 20 28 L 26 24" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>

            <div className="relative w-full max-w-[260px] sm:max-w-[300px]">
              <img
                src={heroStudentImg}
                alt="Your Future Starts Here"
                className="w-full h-auto object-contain select-none drop-shadow-sm"
              />
            </div>
          </div>

          {/* Right/Center Content */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-display">
              Ready to Build Your Professional Identity?
            </h2>
            <p className="text-xs sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
              Create your profile, build your resume, showcase your work and get discovered by employers.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                to="/resume-builder"
                className="inline-flex items-center justify-center gap-2 bg-[#1565ED] hover:bg-[#0E56D6] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-md shadow-blue-500/20 hover:shadow-lg transition-all group"
              >
                <span>Create My Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-500 font-medium pt-1">
              Free to create • Built for students, freshers and professionals
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
