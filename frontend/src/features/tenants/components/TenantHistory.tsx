import React from 'react';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/utils/formatDate';
import { Clock } from 'lucide-react';
import { Tenant } from '../types/tenant.types';

export const TenantHistory: React.FC<{ tenant: Tenant }> = ({ tenant }) => {
  const events = [
    { title: 'Checked In', date: tenant.checkInDate, desc: `Allocated Room ${tenant.roomNumber}` },
    { title: 'Security Deposit Received', date: tenant.checkInDate, desc: 'Verified and credited' },
    { title: 'KYC Verification Completed', date: tenant.checkInDate, desc: `${tenant.idProofType} accepted` },
  ];

  return (
    <Card className="p-5 bg-white border border-[#eef1f6] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Activity History</h4>
          <p className="text-xs text-slate-500 mt-0.5">Timeline of tenant lifecycle events</p>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        {events.map((ev, idx) => (
          <div key={idx} className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-[#5d5fef] mt-0.5">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{ev.title}</p>
              <p className="text-[11px] text-slate-600 font-medium mt-0.5">{ev.desc}</p>
              <span className="text-[10px] text-slate-400 font-semibold">{formatDate(ev.date)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
