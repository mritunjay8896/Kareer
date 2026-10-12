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
    <footer className="w-full bg-white text-slate-600 pt-12 pb-8 border-t border-slate-200/90 text-left">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-slate-100">
          
          {/* Brand Column */}
          <div className="space-y-2 md:col-span-1">
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

          {/* Product Column */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs">Product</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  Portfolio Website
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="hover:text-blue-600 transition-colors">
                  ATS Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/autofill-extension" className="hover:text-blue-600 transition-colors">
                  Chrome Extension
                </Link>
              </li>
              <li>
                <Link to="/search-profiles" className="hover:text-blue-600 transition-colors">
                  Search Candidates
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="hover:text-blue-600 transition-colors">
                  Career Guides
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs">Company</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs">Follow Us</h4>
            <div className="flex items-center gap-3 text-slate-500 text-sm">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors"
                title="Twitter / X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © 2026 Glitread. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-slate-600 transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
