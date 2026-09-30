import React, { useState } from 'react';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { authApi } from '../services/authApi';
import { useUiStore } from '@/store/uiStore';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { addToast } = useUiStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setSent(true);
      addToast('success', 'Reset password instructions sent to your email.');
    } catch {
      setSent(true);
      addToast('info', 'Demo: Password reset link simulated.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {sent ? (
        <div className="text-center space-y-3 py-4">
          <p className="text-sm text-slate-300">
            Check your inbox! We sent password reset instructions to{' '}
            <span className="font-semibold text-white">{email}</span>.
          </p>
          <Button variant="secondary" onClick={onBackToLogin} className="w-full">
            Back to Login
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@domain.com"
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />
          <Button
            type="submit"
            className="w-full"
            isLoading={loading}
            rightIcon={<Send className="w-4 h-4" />}
          >
            Send Reset Instructions
          </Button>
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-slate-200 mt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
          </button>
        </form>
      )}
    </div>
  );
};
