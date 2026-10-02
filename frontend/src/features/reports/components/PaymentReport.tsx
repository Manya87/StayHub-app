import React from 'react';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatCurrency';

export const PaymentReport: React.FC = () => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-white">Payment Method Channels</h4>
          <p className="text-xs text-slate-400">Collections grouped by transaction rail</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <p className="text-[11px] text-slate-400">UPI / QR</p>
          <h4 className="text-base font-bold text-white mt-1">74%</h4>
          <span className="text-[10px] text-slate-500">Fastest settlement</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <p className="text-[11px] text-slate-400">Bank Transfer / IMPS</p>
          <h4 className="text-base font-bold text-white mt-1">16%</h4>
          <span className="text-[10px] text-slate-500">Direct wire</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <p className="text-[11px] text-slate-400">Credit / Debit Cards</p>
          <h4 className="text-base font-bold text-white mt-1">6%</h4>
          <span className="text-[10px] text-slate-500">Gateway</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <p className="text-[11px] text-slate-400">Cash Settlements</p>
          <h4 className="text-base font-bold text-white mt-1">4%</h4>
          <span className="text-[10px] text-slate-500">Manual receipt</span>
        </div>
      </div>
    </Card>
  );
};
