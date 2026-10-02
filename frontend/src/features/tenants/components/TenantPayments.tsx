import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { Tenant } from '../types/tenant.types';

export const TenantPayments: React.FC<{ tenant: Tenant }> = ({ tenant }) => {
  const dummyPayments = [
    { id: 'p1', month: 'September 2026', amount: tenant.monthlyRent, status: 'PAID', date: '2026-09-02' },
    { id: 'p2', month: 'August 2026', amount: tenant.monthlyRent, status: 'PAID', date: '2026-08-01' },
    { id: 'p3', month: 'July 2026', amount: tenant.monthlyRent, status: 'PAID', date: '2026-07-03' },
  ];

  return (
    <Card className="p-5 bg-white border border-[#eef1f6]">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Payment Ledger</h4>
          <p className="text-xs text-slate-500 mt-0.5">Rent collections for this tenant</p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {dummyPayments.map((p) => (
          <div key={p.id} className="py-3.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">{p.month}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Paid on {formatDate(p.date)}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-extrabold text-slate-900 block mb-1">
                {formatCurrency(p.amount)}
              </span>
              <Badge variant="success" size="sm">Paid</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
