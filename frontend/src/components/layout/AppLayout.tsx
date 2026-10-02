import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { ToastContainer } from '@/components/ui/Toast';
import { useUiStore } from '@/store/uiStore';

export const AppLayout: React.FC = () => {
  const { isSidebarOpen } = useUiStore();

  return (
    <div className="min-h-screen bg-[#f4f6fb] text-slate-900 flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-60' : 'md:ml-20'
        } pb-16 md:pb-0`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Navigation Bar */}
      <MobileNav />

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
};
