import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-extrabold text-indigo-500 mb-2 font-mono">404</h1>
      <h2 className="text-xl font-bold text-white mb-2">Page Not Found</h2>
      <p className="text-sm text-slate-400 max-w-sm mb-6">
        The page you are looking for does not exist or may have been relocated.
      </p>
      <Button onClick={() => navigate('/dashboard')} leftIcon={<Home className="w-4 h-4" />}>
        Return to Dashboard
      </Button>
    </div>
  );
};
