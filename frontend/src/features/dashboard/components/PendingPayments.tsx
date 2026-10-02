import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatCurrency';
import { PendingPaymentItem } from '../types/dashboard.types';
import { Clock } from 'lucide-react';

interface PendingPaymentsProps {
  payments: PendingPaymentItem[];
}

export const PendingPayments: React.FC<PendingPaymentsProps> = ({ payments }) => {
  return (
    <Card>
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-slate-100">Pending Dues</h4>
          <p className="text-xs text-slate-400">Tenants with upcoming/due balances</p>
        </div>
        <span className="text-xs text-indigo-400 hover:underline cursor-pointer">Send Reminders</span>
      </div>

      <div className="divide-y divide-slate-800/60 mt-2">
        {payments.map((p) => (
          <div key={p.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">{p.tenantName}</p>
                <p className="text-[10px] text-slate-400">Room: {p.roomNumber} • Due: {p.dueDate}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-amber-400">{formatCurrency(p.amount)}</p>
              <Badge variant="warning" size="sm">Pending</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
