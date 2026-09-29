import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube 
} from 'lucide-react';

interface FooterProps {
  onSubscribeNewsletter?: (email: string) => void;
  onLinkClick?: (label: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full bg-white text-slate-600 pt-12 pb-10 border-t border-slate-200/90">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8">
          
          {/* Brand Column */}
          <div className="space-y-2 md:max-w-xs">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/glitread-logo.svg"
                alt="glitread logo"
                className="w-7 h-7 object-contain shrink-0"
              />
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none font-display">
                glitread
              </span>
            </Link>

            <p className="text-xs text-slate-500 font-medium">
              Build. Showcase. Get Discovered.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-3 gap-8 sm:gap-14 text-xs sm:text-sm">
            
            {/* For Candidates */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 text-xs">For Candidates</h4>
              <ul className="space-y-2 text-slate-500 text-xs">
                <li>
                  <Link to="/candidate/profile" className="hover:text-blue-600 transition-colors">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link to="/resume-builder" className="hover:text-blue-600 transition-colors">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                    Portfolio
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 text-xs">Resources</h4>
              <ul className="space-y-2 text-slate-500 text-xs">
                <li>
                  <a href="#features" className="hover:text-blue-600 transition-colors">
                    Resume Tips
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-blue-600 transition-colors">
                    Career Resources
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 text-xs">Company</h4>
              <ul className="space-y-2 text-slate-500 text-xs">
                <li>
                  <a href="#features" className="hover:text-blue-600 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-blue-600 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-blue-600 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-blue-600 transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Social Icons on Right */}
          <div className="flex items-center gap-2.5">
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition-colors text-xs"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="Twitter / X"
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition-colors text-xs"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition-colors text-xs"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition-colors text-xs"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};
