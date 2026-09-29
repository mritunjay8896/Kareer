import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import registerBannerImg from '../image1/Register to find best webdevelopment jobs.png';

export const CandidateRegisterPage: React.FC = () => {
  const { currentUser, userRole, authInitialized, registerCandidate, demoCandidateLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authInitialized && currentUser) {
      if (userRole === 'employer') {
        navigate('/employer/dashboard', { replace: true });
      } else {
        navigate('/candidate/dashboard', { replace: true });
      }
    }
  }, [authInitialized, currentUser, userRole, navigate]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await registerCandidate(name, email, password, '+91 98765 43210');
      navigate('/candidate/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleDemoLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await demoCandidateLogin();
      navigate('/candidate/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google authentication demo failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubDemoLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await demoCandidateLogin();
      navigate('/candidate/dashboard');
    } catch (err: any) {
      setError(err.message || 'GitHub authentication demo failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="candidate-register-container"
      className="w-full min-h-[calc(100vh-64px)] relative flex items-center justify-center lg:justify-end px-4 sm:px-6 lg:px-10 xl:px-14 py-6 sm:py-8 lg:py-10 overflow-x-hidden bg-[#eef5fc]"
      style={{
        backgroundImage: `url("${registerBannerImg}")`,
        backgroundSize: 'min(100%, 1500px) auto',
        backgroundPosition: 'left 35% center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background Soft Fallback & Ambient Overlay for smaller viewports */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-transparent to-white/35 pointer-events-none lg:block hidden" />
      <div className="absolute inset-0 bg-blue-50/75 backdrop-blur-[2px] pointer-events-none lg:hidden" />

      {/* Floating Right Registration Card with reduced, compact width */}
      <div className="relative z-10 w-full max-w-[370px] sm:max-w-[390px] bg-white/95 sm:bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_16px_50px_-12px_rgba(20,50,110,0.18)] border border-slate-100 backdrop-blur-sm">
        
        {/* Toggle switch between Register & Login replacing glitread text */}
        <div className="mb-5">
          <div className="bg-slate-100/90 p-1 rounded-xl flex items-center gap-1 border border-slate-200/70">
            <span className="flex-1 py-1.5 px-3 text-center text-xs font-bold rounded-lg bg-white text-blue-600 shadow-xs select-none">
              Register
            </span>
            <Link
              to="/login"
              className="flex-1 py-1.5 px-3 text-center text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition-colors select-none"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            Create Your Account
          </h1>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
            Join thousands of students building their careers today.
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Full Name */}
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          {/* Email Address */}
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          {/* Password with Eye Toggle */}
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Primary Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
          >
            <span>{loading ? 'Registering...' : 'Register'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* OR Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase">
            <span className="bg-white px-3 font-bold text-slate-400 tracking-wider">OR</span>
          </div>
        </div>

        {/* Social Authentication Buttons */}
        <div className="space-y-2.5">
          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleDemoLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-2.5 shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Continue with GitHub */}
          <button
            type="button"
            onClick={handleGitHubDemoLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-2.5 shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4 fill-slate-800" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* Login redirect link */}
        <div className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-extrabold text-blue-600 hover:text-blue-700 hover:underline">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};
