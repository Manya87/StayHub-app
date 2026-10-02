import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { SignUpForm } from '@/features/auth/components/SignUpForm';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';
import { Home, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export const LoginPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const [view, setView] = useState<'login' | 'signup' | 'forgot'>(() => {
    if (location.pathname === '/signup' || location.pathname === '/register') {
      return 'signup';
    }
    return 'login';
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (location.pathname === '/signup' || location.pathname === '/register') {
      setView('signup');
    } else if (location.pathname === '/login') {
      setView('login');
    }
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-between p-6 sm:p-12 lg:p-16 overflow-hidden">
      {/* Full-screen bedroom background image matching Mockup Screen 1 */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85")',
        }}
      />
      {/* Dark violet / navy vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#110e26]/90 via-[#18163b]/75 to-[#110e26]/60 pointer-events-none" />

      {/* Brand Header top left */}
      <div className="absolute top-8 left-8 sm:top-12 sm:left-12 z-20 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#5d5fef] flex items-center justify-center text-white shadow-lg shadow-[#5d5fef]/40">
          <Home className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide leading-none">PGHub</h1>
          <p className="text-xs text-[#a5a3ce] font-medium mt-1">Stay Easy, Live Better</p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 pt-20 lg:pt-0">
        {/* Left Hero Content */}
        <div className="max-w-xl text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm">
            Smart PG Management for a Better Living
          </h2>
          <p className="mt-5 text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-lg">
            Manage tenants, rooms, payments, maintenance and more — all in one place.
          </p>

          {/* 3 Pill Badges */}
          <div className="mt-10 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-xs text-white font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-xs text-white font-medium">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Simple</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-xs text-white font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#8183ff]" />
              <span>Complete</span>
            </div>
          </div>
        </div>

        {/* Right Floating Card */}
        <div
          className={`w-full ${
            view === 'signup' ? 'max-w-md' : 'max-w-sm'
          } bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-7 sm:p-8 border border-white/40 transition-all duration-200 my-auto`}
        >
          {view === 'login' && (
            <LoginForm
              onForgotPassword={() => setView('forgot')}
              onSignUp={() => {
                setView('signup');
                navigate('/signup');
              }}
            />
          )}
          {view === 'signup' && (
            <SignUpForm
              onBackToLogin={() => {
                setView('login');
                navigate('/login');
              }}
            />
          )}
          {view === 'forgot' && (
            <ForgotPasswordForm
              onBackToLogin={() => {
                setView('login');
                navigate('/login');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
