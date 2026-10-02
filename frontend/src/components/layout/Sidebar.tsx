import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BedDouble,
  CreditCard,
  Receipt,
  UtensilsCrossed,
  UserPlus,
  AlertCircle,
  Wrench,
  UserCheck,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Home,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: 'Tenants', to: '/tenants', icon: Users },
  { name: 'Rooms', to: '/rooms', icon: BedDouble },
  { name: 'Payments', to: '/payments', icon: CreditCard },
  { name: 'Expenses', to: '/expenses', icon: Receipt },
  { name: 'Food & Menu', to: '/mess', icon: UtensilsCrossed },
  { name: 'Visitors', to: '/visitors', icon: UserPlus },
  { name: 'Complaints', to: '/complaints', icon: AlertCircle },
  { name: 'Maintenance', to: '/maintenance', icon: Wrench },
  { name: 'Staff', to: '/staff', icon: UserCheck },
  { name: 'Reports', to: '/reports', icon: BarChart3 },
  { name: 'Notifications', to: '/notifications', icon: Bell },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { isSidebarOpen } = useUiStore();
  const { logout, user } = useAuthStore();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 bg-[#18163b] transition-all duration-300 flex flex-col ${
        isSidebarOpen ? 'w-60' : 'w-20'
      } hidden md:flex`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 gap-3 border-b border-[#242152]/80">
        <div className="w-9 h-9 rounded-xl bg-[#5d5fef] flex items-center justify-center text-white shadow-md shadow-[#5d5fef]/30 flex-shrink-0">
          <Home className="w-5 h-5" />
        </div>
        {isSidebarOpen && (
          <div className="overflow-hidden">
            <h1 className="text-base font-bold text-white tracking-wide leading-tight">PGHub</h1>
            <p className="text-[10px] text-[#9b99c7] font-medium truncate">Stay Easy, Live Better</p>
          </div>
        )}
      </div>

      {/* Navigation items */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#5d5fef] text-white shadow-md shadow-[#5d5fef]/25 font-semibold'
                    : 'text-[#9b99c7] hover:text-white hover:bg-[#242152]/70'
                }`
              }
              title={!isSidebarOpen ? item.name : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {isSidebarOpen && <span className="truncate">{item.name}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* User profile & logout footer */}
      <div className="p-3 border-t border-[#242152]/80">
        {isSidebarOpen ? (
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#242152]/50">
            <NavLink to="/profile" className="flex items-center gap-2.5 overflow-hidden hover:opacity-90">
              <div className="w-8 h-8 rounded-full bg-[#5d5fef] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {user?.firstName?.charAt(0) || 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">
                  {user?.firstName || 'Admin'} {user?.lastName || ''}
                </p>
                <p className="text-[10px] text-[#9b99c7] capitalize">{user?.role ? user.role.toLowerCase() : 'Owner'}</p>
              </div>
            </NavLink>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-[#9b99c7] hover:text-rose-400 hover:bg-[#18163b] transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={logout}
            className="w-full flex justify-center p-2 rounded-xl text-[#9b99c7] hover:text-rose-400 hover:bg-[#242152] transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </aside>
  );
};
