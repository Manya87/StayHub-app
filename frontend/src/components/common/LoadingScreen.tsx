import React from 'react';
import { Spinner } from '@/components/ui/Spinner';

export const LoadingScreen: React.FC<{ message?: string }> = ({
  message = 'Loading StayHub...',
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-slate-100">
      <div className="relative flex items-center justify-center mb-4">
        <Spinner size="lg" />
      </div>
      <p className="text-sm font-medium text-slate-400 tracking-wide animate-pulse">{message}</p>
    </div>
  );
};
