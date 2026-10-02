import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MoreHorizontal } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const recentTenants = [
  {
    id: '1',
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    room: '101',
    gender: 'Male',
    joinDate: '10 Apr 2025',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Neha Verma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    room: '202',
    gender: 'Female',
    joinDate: '08 Apr 2025',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Amit Kumar',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    room: '102',
    gender: 'Male',
    joinDate: '05 Apr 2025',
    status: 'Due Payment',
  },
  {
    id: '4',
    name: 'Priya Singh',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
    room: '205',
    gender: 'Female',
    joinDate: '01 Apr 2025',
    status: 'Active',
  },
];

export const RecentTenantsTable: React.FC = () => {
  return (
    <Card className="p-5 bg-white border border-[#eef1f6]">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Recent Tenants</h4>
          <p className="text-xs text-slate-400 mt-0.5">Latest residents checked into property</p>
        </div>
        <NavLink
          to="/tenants"
          className="text-xs font-semibold text-[#5d5fef] hover:underline"
        >
          View All Tenants →
        </NavLink>
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left text-xs md:text-sm text-slate-700">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] text-slate-400 font-semibold uppercase">
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Room</th>
              <th className="py-3 px-2">Gender</th>
              <th className="py-3 px-2">Join Date</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentTenants.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span className="font-semibold text-slate-900">{t.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-slate-600 font-medium">Room {t.room}</td>
                <td className="py-3 px-2 text-slate-500">{t.gender}</td>
                <td className="py-3 px-2 text-slate-500">{t.joinDate}</td>
                <td className="py-3 px-2">
                  <Badge
                    variant={t.status === 'Active' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {t.status}
                  </Badge>
                </td>
                <td className="py-3 px-2 text-right">
                  <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
