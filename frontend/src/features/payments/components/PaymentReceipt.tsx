import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PaymentRecord } from '../types/payment.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { Printer, CheckCircle2, Building } from 'lucide-react';

export const PaymentReceipt: React.FC<{ payment: PaymentRecord }> = ({ payment }) => {
  return (
    <Card className="max-w-md mx-auto bg-slate-900 border border-slate-700 p-6 space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide">STAYHUB</h4>
            <p className="text-[10px] text-slate-400">Official Payment Receipt</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" /> Paid
        </div>
      </div>

      <div className="text-center py-2">
        <span className="text-xs text-slate-400">Amount Paid</span>
        <h2 className="text-3xl font-extrabold text-white mt-1">
          {formatCurrency(payment.amount)}
        </h2>
      </div>

      <div className="divide-y divide-slate-800 text-xs text-slate-300">
        <div className="py-2.5 flex justify-between">
          <span className="text-slate-400">Receipt No:</span>
          <span className="font-mono text-white">REC-{payment.id.toUpperCase()}</span>
        </div>
        <div className="py-2.5 flex justify-between">
          <span className="text-slate-400">Tenant Name:</span>
          <span className="font-semibold text-white">{payment.tenantName}</span>
        </div>
        <div className="py-2.5 flex justify-between">
          <span className="text-slate-400">Property / Room:</span>
          <span>{payment.propertyName} • Room {payment.roomNumber}</span>
        </div>
        <div className="py-2.5 flex justify-between">
          <span className="text-slate-400">Payment Date:</span>
          <span>{formatDate(payment.paymentDate || new Date().toISOString())}</span>
        </div>
        <div className="py-2.5 flex justify-between">
          <span className="text-slate-400">Payment Mode:</span>
          <span>{payment.mode}</span>
        </div>
        {payment.transactionReference && (
          <div className="py-2.5 flex justify-between">
            <span className="text-slate-400">Transaction Ref:</span>
            <span className="font-mono text-indigo-400">{payment.transactionReference}</span>
          </div>
        )}
      </div>

      <div className="pt-2">
        <Button
          variant="secondary"
          className="w-full"
          size="sm"
          onClick={() => window.print()}
          leftIcon={<Printer className="w-4 h-4" />}
        >
          Print / Download Receipt
        </Button>
      </div>
    </Card>
  );
};
