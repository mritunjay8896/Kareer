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
    <aside className="fixed left-0 top-[64px] bottom-0 z-30 w-16 md:w-[72px] bg-white border-r border-slate-200/90 flex flex-col items-center justify-between py-2 shadow-xs select-none overflow-y-auto no-scrollbar">
      {/* Top Nav Items */}
      <div className="w-full flex flex-col items-center gap-1 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item.path, item.isHomeItem);

          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => onNavClick(item.label)}
              className="w-full flex flex-col items-center py-1.5 px-0.5 rounded-xl transition-all group"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  active
                    ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 shadow-sm shadow-amber-500/20 border border-amber-300'
                    : 'text-slate-500 group-hover:text-amber-600 group-hover:bg-amber-50/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span 
                className={`text-[9.5px] leading-tight text-center tracking-tight mt-1 truncate max-w-[62px] ${
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
      <div className="w-full flex flex-col items-center gap-1 px-1 pt-2 border-t border-slate-100 mt-2">
        {!currentUser ? (
          <>
            <Link
              to="/login"
              className="w-full flex flex-col items-center py-1 rounded-xl transition-all group"
            >
              <div className="w-8 h-8 rounded-full border border-slate-300 text-slate-500 group-hover:border-amber-500 group-hover:text-amber-600 group-hover:bg-amber-50/50 flex items-center justify-center transition-colors">
                <LogIn className="w-3.5 h-3.5 stroke-[1.8]" />
              </div>
              <span className="text-[9.5px] text-slate-600 group-hover:text-amber-600 font-medium mt-0.5">
                Login
              </span>
            </Link>

            <Link
              to="/register"
              className="w-full flex flex-col items-center py-1 rounded-xl transition-all group"
            >
              <div className="w-8 h-8 rounded-full border border-slate-300 text-slate-500 group-hover:border-amber-500 group-hover:text-amber-600 group-hover:bg-amber-50/50 flex items-center justify-center transition-colors">
                <UserPlus className="w-3.5 h-3.5 stroke-[1.8]" />
              </div>
              <span className="text-[9.5px] text-slate-600 group-hover:text-amber-600 font-medium mt-0.5">
                Register
              </span>
            </Link>
          </>
        ) : (
          <Link
            to="/candidate/profile"
            className="w-full flex flex-col items-center py-1 rounded-xl transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shadow-xs border border-amber-300">
              {currentUser.charAt(0).toUpperCase()}
            </div>
            <span className="text-[9.5px] text-slate-700 font-bold mt-0.5 truncate max-w-[60px]">
              Profile
            </span>
          </Link>
        )}
      </div>
    </aside>
  );
};
