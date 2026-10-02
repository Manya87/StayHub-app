import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Bell, Search, Building } from 'lucide-react';
import { useUiStore } from '@/store/uiStore';
import { usePropertyStore } from '@/store/propertyStore';
import { useAuthStore } from '@/store/authStore';

export const Header: React.FC = () => {
  const { toggleSidebar } = useUiStore();
  const { selectedProperty } = usePropertyStore();
  const { user } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors hidden md:block"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-64 md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tenants, rooms, payments..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5d5fef]/20 focus:border-[#5d5fef] transition-all"
          />
        </div>

        {/* Property Selector Pill */}
        {selectedProperty && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs">
            <Building className="w-3.5 h-3.5 text-[#5d5fef]" />
            <span className="text-[#312e81] font-medium truncate max-w-[160px]">
              {selectedProperty.name}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Global Notifications */}
        <NavLink
          to="/notifications"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
        </NavLink>

        {/* User Avatar & Name Profile Badge */}
        <NavLink
          to="/profile"
          className="flex items-center gap-2.5 pl-3 border-l border-slate-200 hover:opacity-90 transition-opacity"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="Admin"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-50 shadow-sm"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight">Admin</p>
            <p className="text-[10px] text-slate-400 font-medium">Owner</p>
          </div>
          <svg className="w-3.5 h-3.5 text-slate-400 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </NavLink>
      </div>
    </header>
  );
};
