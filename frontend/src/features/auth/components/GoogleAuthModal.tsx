import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, ArrowRight, Plus, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({ isOpen, onClose }) => {
  const { googleLogin } = useAuth();
  const [clientId, setClientId] = useState(
    () => localStorage.getItem('stayhub_google_client_id') || import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
  );
  const [customEmail, setCustomEmail] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isVerifying, setIsVerifying] = useState<string | null>(null);
  const [redirectError, setRedirectError] = useState('');

  if (!isOpen) return null;

  const mockGoogleAccounts = [
    {
      name: 'Pranav Hiremath',
      email: 'pranavhiremath7777@gmail.com',
      avatar: '',
      initials: 'PH',
      bg: 'bg-indigo-600',
    },
    {
      name: 'Alex Rivera',
      email: 'alex.rivera@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      initials: 'AR',
      bg: 'bg-emerald-600',
    },
    {
      name: 'Priya Sharma',
      email: 'priya.sharma@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      initials: 'PS',
      bg: 'bg-purple-600',
    },
  ];

  const handleSelectAccount = async (account: { name: string; email: string; avatar?: string }) => {
    setIsVerifying(account.email);
    const names = account.name.split(' ');
    const firstName = names[0] || 'Google';
    const lastName = names.slice(1).join(' ') || 'User';

    setTimeout(async () => {
      try {
        await googleLogin({
          email: account.email,
          firstName,
          lastName,
          avatarUrl: account.avatar || '',
          googleId: `goog_${Math.random().toString(36).substring(2, 10)}`,
        });
        onClose();
      } finally {
        setIsVerifying(null);
      }
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim() || !customEmail.includes('@')) return;
    const cleanEmail = customEmail.trim();
    const username = cleanEmail.split('@')[0];
    handleSelectAccount({
      name: username.charAt(0).toUpperCase() + username.slice(1),
      email: cleanEmail,
    });
  };

  const handleRedirectToGoogle = () => {
    const cleanId = clientId.trim();
    if (!cleanId || cleanId.includes('YOUR_GOOGLE_CLIENT_ID')) {
      setRedirectError(
        'Google requires a registered Client ID from Google Cloud Console. Without one, Google blocks the request with "Error 401: invalid_client".'
      );
      return;
    }
    setRedirectError('');
    localStorage.setItem('stayhub_google_client_id', cleanId);
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/google/callback`);
    const nonce = Math.random().toString(36).substring(2);
    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      cleanId
    )}&redirect_uri=${redirectUri}&response_type=token%20id_token&scope=openid%20email%20profile&nonce=${nonce}&prompt=select_account`;

    window.location.href = googleUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-none">Sign in with Google</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">to continue to StayHub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-2">Choose an account</p>
            <div className="space-y-1.5 divide-y divide-slate-100 rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/50">
              {mockGoogleAccounts.map((account) => (
                <button
                  key={account.email}
                  disabled={isVerifying !== null}
                  onClick={() => handleSelectAccount(account)}
                  className="w-full px-3.5 py-3 flex items-center justify-between hover:bg-white transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    {account.avatar ? (
                      <img
                        src={account.avatar}
                        alt={account.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div
                        className={`w-9 h-9 rounded-full ${account.bg} text-white font-bold text-xs flex items-center justify-center`}
                      >
                        {account.initials}
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#5d5fef] transition-colors">
                        {account.name}
                      </div>
                      <div className="text-[11px] text-slate-500">{account.email}</div>
                    </div>
                  </div>
                  {isVerifying === account.email ? (
                    <Loader2 className="w-4 h-4 text-[#5d5fef] animate-spin" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#5d5fef] group-hover:translate-x-0.5 transition-all" />
                  )}
                </button>
              ))}

              {/* Use Another Google Account */}
              {!showCustomInput ? (
                <button
                  onClick={() => setShowCustomInput(true)}
                  className="w-full px-3.5 py-3 flex items-center gap-3 text-left hover:bg-white text-xs font-semibold text-slate-700 hover:text-[#5d5fef] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span>Use another Google account</span>
                </button>
              ) : (
                <form onSubmit={handleCustomSubmit} className="p-3 bg-white space-y-2">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Enter Google Email Address
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="yourname@gmail.com"
                      className="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#5d5fef]"
                      required
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={isVerifying !== null}
                      className="px-3 py-1.5 bg-[#5d5fef] text-white text-xs font-bold rounded-xl hover:bg-[#4f46e5] transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Direct Redirection Section */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Live accounts.google.com Redirect
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
              Redirect directly to Google's official authorization servers for real OAuth login:
            </p>

            {redirectError && (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-snug space-y-1">
                <p className="font-semibold text-amber-800">⚠️ Google Cloud Client ID Required</p>
                <p>{redirectError}</p>
                <p className="text-slate-600 pt-1 border-t border-amber-200/60 font-medium">
                  💡 <em>You can sign in immediately as <strong>Pranav Hiremath</strong> by selecting your name from the account list above!</em>
                </p>
              </div>
            )}

            <div className="space-y-2">
              <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Google OAuth Client ID (optional if testing redirect)"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5d5fef]"
              />
              <button
                type="button"
                onClick={handleRedirectToGoogle}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
              >
                <span>Proceed to accounts.google.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400">
            To enable production Google OAuth, configure <code className="text-slate-600 font-mono">VITE_GOOGLE_CLIENT_ID</code> in <code className="text-slate-600 font-mono">.env</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
