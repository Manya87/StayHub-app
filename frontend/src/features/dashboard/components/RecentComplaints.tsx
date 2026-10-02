import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RecentComplaintItem } from '../types/dashboard.types';
import { AlertCircle } from 'lucide-react';

interface RecentComplaintsProps {
  complaints: RecentComplaintItem[];
}

export const RecentComplaints: React.FC<RecentComplaintsProps> = ({ complaints }) => {
  const getPriorityBadge = (p: RecentComplaintItem['priority']) => {
    switch (p) {
      case 'URGENT':
        return <Badge variant="danger" size="sm">Urgent</Badge>;
      case 'HIGH':
        return <Badge variant="warning" size="sm">High</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{p}</Badge>;
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-slate-100">Active Issues & Maintenance</h4>
          <p className="text-xs text-slate-400">Tenant tickets needing attention</p>
        </div>
        <span className="text-xs text-indigo-400 hover:underline cursor-pointer">Manage All</span>
      </div>

      <div className="divide-y divide-slate-800/60 mt-2">
        {complaints.map((c) => (
          <div key={c.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">{c.title}</p>
                <p className="text-[10px] text-slate-400">
                  By {c.tenantName} ({c.roomNumber}) • {c.createdAt}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getPriorityBadge(c.priority)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
