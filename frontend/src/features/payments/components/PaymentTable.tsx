import React from 'react';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { PaymentRecord } from '../types/payment.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { MoreHorizontal } from 'lucide-react';

interface PaymentTableProps {
  payments: PaymentRecord[];
  isLoading?: boolean;
  onSelect?: (payment: PaymentRecord) => void;
}

export const PaymentTable: React.FC<PaymentTableProps> = ({ payments, isLoading, onSelect }) => {
  const getStatusBadge = (status: PaymentRecord['status']) => {
    switch (status) {
      case 'PAID':
        return <Badge variant="success" size="sm">Paid</Badge>;
      case 'PENDING':
        return <Badge variant="warning" size="sm">Pending</Badge>;
      case 'OVERDUE':
        return <Badge variant="danger" size="sm">Overdue</Badge>;
      default:
        return <Badge variant="warning" size="sm">Partial</Badge>;
    }
  };

  const columns: Column<PaymentRecord>[] = [
    {
      key: 'index',
      header: '#',
      render: (_, idx) => <span className="text-slate-400 font-medium">{(idx ?? 0) + 1}</span>,
      className: 'w-12',
    },
    {
      key: 'tenant',
      header: 'Tenant',
      render: (p) => (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-[#5d5fef]">
            {p.tenantName.charAt(0)}
          </div>
          <span className="font-bold text-slate-900">{p.tenantName}</span>
        </div>
      ),
    },
    {
      key: 'room',
      header: 'Room',
      render: (p) => <span className="font-semibold text-slate-700">{p.roomNumber}</span>,
    },
    {
      key: 'month',
      header: 'Month',
      render: () => <span className="text-slate-500 font-medium">Apr 2025</span>,
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (p) => (
        <span className="text-xs font-bold text-slate-900">{formatCurrency(p.amount)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => getStatusBadge(p.status),
    },
    {
      key: 'date',
      header: 'Date',
      render: (p) => (
        <span className="text-xs text-slate-500">
          {p.paymentDate ? formatDate(p.paymentDate) : formatDate(p.dueDate)}
        </span>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      align: 'right',
      render: () => (
        <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return <Table columns={columns} data={payments} isLoading={isLoading} onRowClick={onSelect} />;
};
