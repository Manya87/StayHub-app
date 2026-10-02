import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatCurrency';
import { RecentPaymentItem } from '../types/dashboard.types';
import { CheckCircle2 } from 'lucide-react';

interface RecentPaymentsProps {
  payments: RecentPaymentItem[];
}

export const RecentPayments: React.FC<RecentPaymentsProps> = ({ payments }) => {
  return (
    <Card>
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-slate-100">Recent Collections</h4>
          <p className="text-xs text-slate-400">Latest rent and utility settlements</p>
        </div>
        <span className="text-xs text-indigo-400 hover:underline cursor-pointer">View all</span>
      </div>

      <div className="divide-y divide-slate-800/60 mt-2">
        {payments.map((p) => (
          <div key={p.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">{p.tenantName}</p>
                <p className="text-[10px] text-slate-400">Room: {p.roomNumber} • {p.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-100">{formatCurrency(p.amount)}</p>
              <Badge variant="success" size="sm">Paid</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
