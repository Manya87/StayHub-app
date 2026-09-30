import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export const GoogleCallbackPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { googleLogin } = useAuth();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleGoogleResponse = async () => {
      try {
        // Parse hash fragment (#id_token=...&access_token=...)
        const hash = location.hash.substring(1);
        const params = new URLSearchParams(hash || location.search);

        const idToken = params.get('id_token');
        const accessToken = params.get('access_token');
        const error = params.get('error');

        if (error) {
          throw new Error(params.get('error_description') || `Google sign-in error: ${error}`);
        }

        let email = '';
        let firstName = 'Google';
        let lastName = 'User';
        let avatarUrl = '';
        let googleId = '';

        if (idToken) {
          // Decode ID token JWT
          const parts = idToken.split('.');
          if (parts.length >= 2) {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            email = payload.email || '';
            firstName = payload.given_name || payload.name?.split(' ')[0] || 'Google';
            lastName = payload.family_name || payload.name?.split(' ').slice(1).join(' ') || 'User';
            avatarUrl = payload.picture || '';
            googleId = payload.sub || '';
          }
        } else if (accessToken) {
          // Fetch userinfo from Google API with access token
          const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (res.ok) {
            const profile = await res.json();
            email = profile.email || '';
            firstName = profile.given_name || profile.name?.split(' ')[0] || 'Google';
            lastName = profile.family_name || profile.name?.split(' ').slice(1).join(' ') || 'User';
            avatarUrl = profile.picture || '';
            googleId = profile.sub || '';
          }
        }

        if (!email) {
          throw new Error('Could not retrieve verified email from Google verification.');
        }

        setStatus('success');
        await googleLogin({
          email,
          firstName,
          lastName,
          avatarUrl,
          googleId,
        });
      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err.message || 'Google account verification failed.');
      }
    };

    handleGoogleResponse();
  }, [location, googleLogin, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 text-center shadow-2xl space-y-4">
        {status === 'verifying' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-[#5d5fef]/10 text-[#5d5fef] flex items-center justify-center mx-auto">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Verifying Google Account</h2>
            <p className="text-xs text-slate-500">
              Securing connection and authenticating your StayHub session...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Verification Successful</h2>
            <p className="text-xs text-slate-500">Redirecting to your dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Authentication Failed</h2>
            <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
              {errorMessage}
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2.5 bg-[#5d5fef] hover:bg-[#4f46e5] text-white font-bold rounded-xl text-xs transition-all shadow-md mt-4"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};
