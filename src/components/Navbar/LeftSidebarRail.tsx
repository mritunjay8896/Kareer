import React from 'react';
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
  UserPlus
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
