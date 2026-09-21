import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Facebook 
} from 'lucide-react';

interface FooterProps {
  onSubscribeNewsletter?: (email: string) => void;
  onLinkClick?: (label: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-white text-slate-600 pt-14 pb-10 border-t border-slate-200/90">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200/80">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/glitread-logo.svg"
                alt="glitread logo"
                className="w-8 h-8 object-contain shrink-0"
              />
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-none font-display">
                  glitread<span className="text-blue-600 font-black">.com</span>
                </span>
                <span className="text-[7.5px] tracking-wider uppercase font-black text-amber-700 bg-amber-50 border border-amber-200/80 px-1 py-0.5 rounded mt-0.5 w-fit">
                  Student Career Platform
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              India's student-first career platform to build profiles, gain experience and land your dream opportunity.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs sm:text-sm">
            
            {/* For Students */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">For Students</h4>
              <ul className="space-y-2 text-slate-500">
                <li><Link to="/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link></li>
                <li><Link to="/internships" className="hover:text-blue-600 transition-colors">Internships</Link></li>
                <li><Link to="/challenges" className="hover:text-blue-600 transition-colors">Challenges</Link></li>
                <li><Link to="/government-jobs" className="hover:text-blue-600 transition-colors">Government Jobs</Link></li>
                <li><Link to="/resume-builder" className="hover:text-blue-600 transition-colors">Resume Builder</Link></li>
                <li><Link to="/portfolio" className="hover:text-blue-600 transition-colors">Portfolio Builder</Link></li>
              </ul>
            </div>

            {/* For Employers */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">For Employers</h4>
              <ul className="space-y-2 text-slate-500">
                <li><Link to="/employers" className="hover:text-blue-600 transition-colors">Post a Job</Link></li>
                <li><Link to="/employers" className="hover:text-blue-600 transition-colors">Find Candidates</Link></li>
                <li><Link to="/employers/login" className="hover:text-blue-600 transition-colors">Employer Login</Link></li>
                <li><Link to="/employers" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
                <li><Link to="/employers" className="hover:text-blue-600 transition-colors">Resources</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Resources</h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Career Articles</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Resume Tips</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Interview Tips</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Student Resources</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Company</h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Sitemap</a></li>
                <li><Link to="/admin/login" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">Govt Admin CMS</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 Glitread.com. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for every student</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
