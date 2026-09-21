import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Landmark, 
  School, 
  Rocket, 
  FileText, 
  User, 
  LogIn, 
  UserPlus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface LeftSidebarRailProps {
  currentUser?: string | null;
  userRole?: 'candidate' | 'employer' | null;
  onOpenEmployer: () => void;
  onSwitchRole: (role: 'candidate' | 'employer') => void;
  onNavClick: (topic: string) => void;
}

export const LeftSidebarRail: React.FC<LeftSidebarRailProps> = ({
  currentUser,
  userRole = 'candidate',
  onNavClick
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [isCardCollapsed, setIsCardCollapsed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleState = (e: any) => {
      if (e?.detail !== undefined) {
        setIsCardCollapsed(e.detail);
      } else {
        setIsCardCollapsed(prev => !prev);
      }
    };
    const handlePopupState = (e: any) => {
      if (typeof e?.detail === 'boolean') {
        setIsPopupOpen(e.detail);
      }
    };

    window.addEventListener('career-card-state-changed', handleState);
    window.addEventListener('toggle-career-card', handleState);
    window.addEventListener('career-popup-state', handlePopupState);

    return () => {
      window.removeEventListener('career-card-state-changed', handleState);
      window.removeEventListener('toggle-career-card', handleState);
      window.removeEventListener('career-popup-state', handlePopupState);
    };
  }, []);

  const isHome = currentPath === '/';

  const navItems = [
    { label: 'Home', icon: Home, path: '/', isHomeItem: true },
    { label: 'Jobs', icon: Briefcase, path: '/jobs' },
    { label: 'Internships', icon: GraduationCap, path: '/internships' },
    { label: 'Challenges', icon: Trophy, path: '/challenges' },
    { label: 'Govt Jobs', icon: Landmark, path: '/government-jobs' },
    { label: 'Campus Hiring', icon: School, path: '/jobs?filter=Campus' },
    { label: 'Off-Campus', icon: Rocket, path: '/jobs?filter=Off-Campus' },
    { label: 'Applications', icon: FileText, path: '/applied-jobs' },
    { label: 'Profile', icon: User, path: currentUser ? '/candidate/profile' : '/login' },
  ];

  const isItemActive = (path: string, isHomeItem?: boolean) => {
    if (isHomeItem) return isHome;
    if (path === '/') return false;

    // Item has search parameters, e.g. /jobs?filter=Campus
    if (path.includes('?')) {
      const [pathBase, query] = path.split('?');
      return location.pathname === pathBase && location.search.includes(query);
    }

    // Base jobs route: active only when no special filter query is active
    if (path === '/jobs') {
      return (
        location.pathname === '/jobs' &&
        !location.search.includes('filter=Campus') &&
        !location.search.includes('filter=Off-Campus')
      );
    }

    return currentPath.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-[64px] bottom-0 z-30 w-12 sm:w-14 md:w-16 lg:w-[72px] bg-white border-r border-slate-200/90 flex flex-col items-center justify-between py-1.5 sm:py-2 shadow-xs select-none overflow-y-auto no-scrollbar">
      {/* Top Nav Items */}
      <div className="w-full flex flex-col items-center gap-0.5 sm:gap-1 px-0.5 sm:px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item.path, item.isHomeItem);

          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => onNavClick(item.label)}
              className="w-full flex flex-col items-center py-0.5 sm:py-1 md:py-1.5 px-0.5 rounded-lg sm:rounded-xl transition-all group"
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl flex items-center justify-center transition-all ${
                  active
                    ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 shadow-sm shadow-amber-500/20 border border-amber-300'
                    : 'text-slate-500 group-hover:text-amber-600 group-hover:bg-amber-50/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${active ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span 
                className={`text-[8px] sm:text-[8.5px] md:text-[9.5px] leading-tight text-center tracking-tight mt-0.5 sm:mt-1 truncate max-w-[42px] sm:max-w-[50px] md:max-w-[62px] ${
                  active ? 'font-bold text-amber-950' : 'text-slate-600 group-hover:text-amber-700 font-medium'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Collapsable button below profile icon - Vertical Bar Style */}
        <div className="relative w-full flex justify-center mt-1 mb-0.5">
          <button
            id="sidebar-collapse-btn"
            type="button"
            onClick={() => {
              if (location.pathname !== '/jobs') {
                navigate('/jobs');
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('open-career-popup'));
                }, 120);
              } else {
                window.dispatchEvent(new CustomEvent('toggle-career-popup'));
              }
            }}
            title="No Experience? View Internship & Career Card Popup"
            aria-label="No Experience Card Popup"
            className={`relative w-[30px] sm:w-[34px] md:w-[38px] flex flex-col items-center py-2 sm:py-2.5 px-0.5 rounded-xl sm:rounded-2xl transition-all duration-200 group cursor-pointer border ${
              isPopupOpen
                ? 'bg-gradient-to-b from-[#1565ED] to-[#0E56D6] text-white border-[#1565ED] shadow-md shadow-blue-500/35 ring-2 ring-blue-400/40 scale-[1.02]'
                : 'bg-gradient-to-b from-blue-50/95 via-indigo-50/50 to-blue-50/90 text-[#1565ED] border-blue-200/90 hover:from-[#1565ED] hover:to-[#0E56D6] hover:text-white hover:border-[#1565ED] shadow-2xs hover:scale-[1.02]'
            }`}
          >
            {/* Selected vertical active indicator on left rail edge */}
            {isPopupOpen && (
              <span className="absolute -left-[4px] sm:-left-[6px] top-2 bottom-2 w-1.5 bg-[#1565ED] rounded-r-full shadow-xs" />
            )}

            {/* Icon Box at the top of the vertical bar */}
            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
              isPopupOpen
                ? 'bg-white/20 text-white'
                : 'bg-white text-[#1565ED] shadow-2xs border border-blue-100/80 group-hover:bg-white/20 group-hover:text-white group-hover:border-transparent'
            }`}>
              <Rocket className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2] -rotate-12 transition-transform group-hover:scale-110" />
            </div>

            {/* Vertical Bar Text - Written "No Experience" vertically */}
            <span
              className={`[writing-mode:vertical-rl] rotate-180 text-[7.5px] sm:text-[8.5px] md:text-[9px] font-black uppercase tracking-widest whitespace-nowrap select-none my-1.5 transition-colors ${
                isPopupOpen ? 'text-white' : 'text-[#1565ED] group-hover:text-white'
              }`}
            >
              No Experience
            </span>

            {/* Micro Dot Accent at the bottom of the vertical bar */}
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
              isPopupOpen ? 'bg-white/80' : 'bg-[#1565ED]/70 group-hover:bg-white/80'
            }`} />
          </button>

          {/* Desktop Hover Tooltip */}
          <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 z-50 translate-x-1 group-hover:translate-x-0 hidden sm:block border border-slate-800">
            No Experience? Card Popup
          </div>
        </div>
      </div>

      {/* Bottom Auth Links */}
      <div className="w-full flex flex-col items-center gap-0.5 sm:gap-1 px-0.5 sm:px-1 pt-1.5 sm:pt-2 border-t border-slate-100 mt-1 sm:mt-2">
        {!currentUser ? (
          <>
            <Link
              to="/login"
              className="w-full flex flex-col items-center py-0.5 sm:py-1 rounded-lg sm:rounded-xl transition-all group"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-slate-300 text-slate-500 group-hover:border-amber-500 group-hover:text-amber-600 group-hover:bg-amber-50/50 flex items-center justify-center transition-colors">
                <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[1.8]" />
              </div>
              <span className="text-[8px] sm:text-[8.5px] md:text-[9.5px] text-slate-600 group-hover:text-amber-600 font-medium mt-0.5 truncate max-w-[42px] sm:max-w-[50px] md:max-w-[60px]">
                Login
              </span>
            </Link>

            <Link
              to="/register"
              className="w-full flex flex-col items-center py-0.5 sm:py-1 rounded-lg sm:rounded-xl transition-all group"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-slate-300 text-slate-500 group-hover:border-amber-500 group-hover:text-amber-600 group-hover:bg-amber-50/50 flex items-center justify-center transition-colors">
                <UserPlus className="w-3.5 h-3.5 stroke-[1.8]" />
              </div>
              <span className="text-[8px] sm:text-[8.5px] md:text-[9.5px] text-slate-600 group-hover:text-amber-600 font-medium mt-0.5 truncate max-w-[42px] sm:max-w-[50px] md:max-w-[60px]">
                Register
              </span>
            </Link>
          </>
        ) : (
          <Link
            to="/candidate/profile"
            className="w-full flex flex-col items-center py-0.5 sm:py-1 rounded-lg sm:rounded-xl transition-all group"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-bold text-[10px] sm:text-xs flex items-center justify-center shadow-xs border border-amber-300">
              {currentUser.charAt(0).toUpperCase()}
            </div>
            <span className="text-[8px] sm:text-[8.5px] md:text-[9.5px] text-slate-700 font-bold mt-0.5 truncate max-w-[42px] sm:max-w-[50px] md:max-w-[60px]">
              Profile
            </span>
          </Link>
        )}
      </div>
    </aside>
  );
};
