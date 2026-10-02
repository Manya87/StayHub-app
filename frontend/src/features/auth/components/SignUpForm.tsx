import React, { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowLeft, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { GoogleAuthModal } from './GoogleAuthModal';

interface SignUpFormProps {
  onBackToLogin: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onBackToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'PROPERTY_OWNER',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const { register, loading } = useAuth();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Enter a valid phone number (min 10 digits)';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: formData.role,
      });
    } catch {
      // Error is caught and surfaced via toast in useAuth
    }
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">Join StayHub to manage properties & tenants</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">First Name</label>
            <Input
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="Alex"
              leftIcon={<User className="w-3.5 h-3.5 text-slate-400" />}
              error={errors.firstName}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
            <Input
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Rivera"
              leftIcon={<User className="w-3.5 h-3.5 text-slate-400" />}
              error={errors.lastName}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="alex@stayhub.com"
            leftIcon={<Mail className="w-3.5 h-3.5 text-slate-400" />}
            error={errors.email}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="9876543210"
            leftIcon={<Phone className="w-3.5 h-3.5 text-slate-400" />}
            error={errors.phone}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Account Role</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <select
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-800 text-xs md:text-sm pl-10 pr-3.5 py-2.5 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5d5fef]/20 focus:border-[#5d5fef]"
            >
              <option value="PROPERTY_OWNER">Property Owner / PG Owner</option>
              <option value="PROPERTY_MANAGER">Hostel / PG Manager</option>
              <option value="TENANT">Tenant</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-3.5 h-3.5 text-slate-400" />}
              error={errors.password}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Confirm</label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-3.5 h-3.5 text-slate-400" />}
              error={errors.confirmPassword}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-2.5 bg-[#5d5fef] hover:bg-[#4f46e5] text-white font-bold rounded-xl shadow-md shadow-[#5d5fef]/25 transition-all mt-3"
          isLoading={loading}
        >
          Sign Up
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-4 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <span className="relative px-3 bg-white text-[10px] text-slate-400 uppercase font-semibold">
          or sign up with
        </span>
      </div>

      {/* Google Sign up button */}
      <button
        type="button"
        onClick={() => {
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
        }}
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
        <span>Sign up with Google</span>
      </button>

      {/* Footer link */}
      <div className="text-center text-xs text-slate-500 mt-4 font-medium flex items-center justify-center gap-1">
        <span>Already have an account?</span>
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-[#5d5fef] font-bold hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" /> Log In
        </button>
      </div>

      {/* Google Auth Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
      />
    </div>
  );
};
