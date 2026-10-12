import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Check, X, Shield, User } from 'lucide-react';
import { FullRegistrationData } from './types';

interface Step1AccountProps {
  data: FullRegistrationData;
  onChange: (fields: Partial<FullRegistrationData['account']>) => void;
  errors: Record<string, string>;
}

export const Step1Account: React.FC<Step1AccountProps> = ({
  data,
  onChange,
  errors
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = data.account.password || '';
  const confirm = data.account.confirmPassword || '';

  // Password criteria
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  // Calculate score (0 to 4)
  const score = [hasMinLength, hasUppercase, hasNumber, hasSpecial].filter(Boolean).length;

  const strengthLabel = 
    password.length === 0 ? 'Weak' :
    score <= 1 ? 'Weak' :
    score === 2 ? 'Fair' :
    score === 3 ? 'Good' : 'Strong';

  const strengthColor =
    password.length === 0 ? 'text-red-500' :
    score <= 1 ? 'text-red-500' :
    score === 2 ? 'text-amber-500' :
    score === 3 ? 'text-blue-500' : 'text-emerald-500';

  return (
    <div className="space-y-3">
      {/* Step Section Header */}
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
          <User className="w-3.5 h-3.5 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            Account Information
          </h3>
          <p className="text-[10.5px] sm:text-[11px] text-slate-500 mt-0.5">
            Enter your email and create a strong password to get started.
          </p>
        </div>
      </div>

      <div className="space-y-2.5 pt-0.5">
        {/* Email Address */}
        <div>
          <label className="block text-[11px] sm:text-xs font-semibold text-slate-800 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={data.account.email}
              onChange={(e) => onChange({ email: e.target.value.trim() })}
              placeholder="you@example.com"
              className={`w-full pl-8.5 pr-3 py-1.5 bg-white border rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.email
                  ? 'border-red-400 ring-1 ring-red-100'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-[10px] text-red-500 font-medium mt-0.5">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-[11px] sm:text-xs font-semibold text-slate-800 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => onChange({ password: e.target.value })}
              placeholder="Create a strong password"
              className={`w-full pl-8.5 pr-8 py-1.5 bg-white border rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.password
                  ? 'border-red-400 ring-1 ring-red-100'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[10px] text-red-500 font-medium mt-0.5">
              {errors.password}
            </p>
          )}

          {/* 4-Segment Strength Indicator */}
          <div className="mt-1 space-y-0.5">
            <div className="grid grid-cols-4 gap-1">
              {[1, 2, 3, 4].map((index) => {
                const filled = score >= index;
                const barColor = 
                  score <= 1 ? 'bg-red-500' :
                  score === 2 ? 'bg-amber-500' :
                  score === 3 ? 'bg-blue-500' : 'bg-emerald-500';

                return (
                  <div
                    key={index}
                    className={`h-0.5 sm:h-1 rounded-full transition-all ${
                      filled ? barColor : 'bg-slate-200'
                    }`}
                  />
                );
              })}
            </div>

            <p className={`text-[10px] font-semibold ${strengthColor}`}>
              Password strength: {strengthLabel}
            </p>

            {/* 4 Password Rules Checklist */}
            <div className="grid grid-cols-2 gap-1 pt-0.5 text-[9.5px] sm:text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[7.5px] font-bold shrink-0 ${
                  hasMinLength ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}>
                  {hasMinLength ? <Check className="w-2 h-2 stroke-[3]" /> : '○'}
                </span>
                <span className={hasMinLength ? 'text-slate-700 font-medium' : 'text-slate-500'}>
                  At least 8 characters
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[7.5px] font-bold shrink-0 ${
                  hasUppercase ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}>
                  {hasUppercase ? <Check className="w-2 h-2 stroke-[3]" /> : '○'}
                </span>
                <span className={hasUppercase ? 'text-slate-700 font-medium' : 'text-slate-500'}>
                  One uppercase letter
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[7.5px] font-bold shrink-0 ${
                  hasNumber ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}>
                  {hasNumber ? <Check className="w-2 h-2 stroke-[3]" /> : '○'}
                </span>
                <span className={hasNumber ? 'text-slate-700 font-medium' : 'text-slate-500'}>
                  One number
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[7.5px] font-bold shrink-0 ${
                  hasSpecial ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}>
                  {hasSpecial ? <Check className="w-2 h-2 stroke-[3]" /> : '○'}
                </span>
                <span className={hasSpecial ? 'text-slate-700 font-medium' : 'text-slate-500'}>
                  One special character
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-[11px] sm:text-xs font-semibold text-slate-800 mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => onChange({ confirmPassword: e.target.value })}
              placeholder="Re-enter your password"
              className={`w-full pl-8.5 pr-8 py-1.5 bg-white border rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.confirmPassword
                  ? 'border-red-400 ring-1 ring-red-100'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[10px] text-red-500 font-medium mt-0.5">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Data Security Banner */}
        <div className="bg-blue-50/70 border border-blue-100/90 rounded-xl p-2.5 flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
            <Shield className="w-3 h-3 stroke-[2.2]" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
              Your data is secure
            </h4>
            <p className="text-[9.5px] text-slate-500 leading-tight">
              We use industry-standard security to keep your information safe and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
