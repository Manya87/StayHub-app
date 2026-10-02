import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';

const SCREENS = [
  { id: 1, label: '1. Login', path: '/login' },
  { id: 2, label: '2. Dashboard', path: '/dashboard' },
  { id: 3, label: '3. Tenants', path: '/tenants' },
  { id: 4, label: '4. Add Tenant', path: '/tenants?action=add' },
  { id: 5, label: '5. Rooms', path: '/rooms' },
  { id: 6, label: '6. Payments', path: '/payments' },
  { id: 7, label: '7. Expenses', path: '/expenses' },
  { id: 8, label: '8. Complaints', path: '/complaints' },
  { id: 9, label: '9. Maintenance', path: '/maintenance' },
  { id: 10, label: '10. Food & Menu', path: '/mess' },
  { id: 11, label: '11. Visitors', path: '/visitors' },
  { id: 12, label: '12. Staff', path: '/staff' },
  { id: 13, label: '13. Reports', path: '/reports' },
  { id: 14, label: '14. Notifications', path: '/notifications' },
  { id: 15, label: '15. Settings', path: '/settings' },
  { id: 16, label: '16. Profile', path: '/profile' },
];

export const MockupNavigator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-3 right-3 z-50 flex flex-col items-end pointer-events-auto">
      {/* Header bar / toggle */}
      <div className="bg-[#121128] text-white px-3 py-1.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-2 text-xs font-semibold backdrop-blur-md">
        <Layers className="w-3.5 h-3.5 text-[#5d5fef]" />
        <span>PGHub Reference Screens (1–16)</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          title={isOpen ? 'Minimize Navigator' : 'Expand Navigator'}
        >
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Screen pills container */}
      {isOpen && (
        <div className="mt-2 p-2 bg-[#121128]/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 max-w-2xl max-h-48 overflow-y-auto">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
            {SCREENS.map((s) => {
              const isCurrent =
                s.path === '/tenants?action=add'
                  ? location.pathname === '/tenants' && location.search.includes('action=add')
                  : location.pathname === s.path.split('?')[0];

              return (
                <button
                  key={s.id}
                  onClick={() => navigate(s.path)}
                  className={`px-2 py-1.5 rounded-xl text-[10px] font-bold text-center transition-all truncate ${
                    isCurrent
                      ? 'bg-[#5d5fef] text-white shadow-md shadow-[#5d5fef]/40 scale-105'
                      : 'bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white'
                  }`}
                  title={s.label}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
