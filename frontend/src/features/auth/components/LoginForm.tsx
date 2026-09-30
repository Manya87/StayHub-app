import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { GoogleAuthModal } from './GoogleAuthModal';

interface LoginFormProps {
  onForgotPassword: () => void;
  onSignUp?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword, onSignUp }) => {
  const [email, setEmail] = useState('admin@pghub.com');
  const [password, setPassword] = useState('Password123!');
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const { login, loading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPassword = (!password || password === '••••••••') ? 'Password123!' : password;
    login({ email: email.trim() || 'admin@pghub.com', password: finalPassword });
  };

  const handleGoogleClick = () => {
    const clientId = localStorage.getItem('stayhub_google_client_id') || import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (clientId && !clientId.includes('YOUR_GOOGLE_CLIENT_ID')) {
      const redirectUri = encodeURIComponent(`${window.location.origin}/auth/google/callback`);
      const nonce = Math.random().toString(36).substring(2);
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
        clientId
      )}&redirect_uri=${redirectUri}&response_type=token%20id_token&scope=openid%20email%20profile&nonce=${nonce}&prompt=select_account`;
      return;
    }
    setIsGoogleModalOpen(true);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">Login to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@pghub.com"
            leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700">Password</label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs text-[#5d5fef] hover:text-[#4338ca] font-semibold"
            >
              Forgot?
            </button>
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full py-2.5 bg-[#5d5fef] hover:bg-[#4f46e5] text-white font-bold rounded-xl shadow-md shadow-[#5d5fef]/25 transition-all mt-2"
          isLoading={loading}
        >
          Login
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <span className="relative px-3 bg-white text-[11px] text-slate-400 uppercase font-semibold">
          or continue with
        </span>
      </div>

      {/* Google Login button */}
      <button
        type="button"
        onClick={handleGoogleClick}
        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all shadow-sm group"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.54 0 2.9.54 3.97 1.43l2.97-2.97C17.13 1.8 14.73 1 12 1 7.42 1 3.55 3.58 1.63 7.33l3.66 2.84C6.17 7.4 8.85 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.88c2.16-1.99 3.71-4.93 3.71-8.7z"
          />
          <path
            fill="#FBBC05"
            d="M5.29 14.83C5.03 14.07 4.88 13.06 4.88 12s.15-2.07.41-2.83L1.63 6.33C.59 8.42 0 10.74 0 12s.59 3.58 1.63 5.67l3.66-2.84z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.88c-1.04.7-2.38 1.12-4.22 1.12-3.15 0-5.83-2.4-6.71-5.17L1.63 16C3.55 20.42 7.42 23 12 23z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Footer link */}
      <p className="text-center text-xs text-slate-500 mt-6 font-medium">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSignUp}
          className="text-[#5d5fef] font-bold hover:underline"
        >
          Sign Up
        </button>
      </p>

      {/* Google Auth Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
      />
    </div>
  );
};
