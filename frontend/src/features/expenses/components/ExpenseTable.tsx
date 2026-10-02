import React from 'react';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { ExpenseRecord } from '../types/expense.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { MoreHorizontal } from 'lucide-react';

interface ExpenseTableProps {
  expenses: ExpenseRecord[];
  isLoading?: boolean;
}

export const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses, isLoading }) => {
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  const getCategoryBadge = (cat: string) => {
    switch (cat.toUpperCase()) {
      case 'ELECTRICITY':
        return <Badge variant="warning" size="sm">Electricity</Badge>;
      case 'WATER':
        return <Badge variant="info" size="sm">Water</Badge>;
      case 'GROCERIES':
      case 'GROCERY':
        return <Badge variant="success" size="sm">Groceries</Badge>;
      case 'MAINTENANCE':
      case 'MAINTENANCE_REPAIRS':
        return <Badge variant="indigo" size="sm">Maintenance</Badge>;
      case 'SALARY':
      case 'SALARIES':
        return <Badge variant="neutral" size="sm">Salaries</Badge>;
      case 'INTERNET':
      case 'INTERNET_WIFI':
      case 'WIFI':
        return <Badge variant="info" size="sm">Internet</Badge>;
      case 'MISCELLANEOUS':
        return <Badge variant="neutral" size="sm">Others</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{cat}</Badge>;
    }
  };

  const columns: Column<ExpenseRecord>[] = [
    {
      key: 'index',
      header: '#',
      render: (_, idx) => <span className="text-slate-400 font-medium">{(idx ?? 0) + 1}</span>,
      className: 'w-12',
    },
    {
      key: 'date',
      header: 'Date',
      render: (e) => <span className="text-slate-500 font-medium">{formatDate(e.date)}</span>,
    },
    {
      key: 'category',
      header: 'Category',
      render: (e) => getCategoryBadge(e.category),
    },
    {
      key: 'title',
      header: 'Description',
      render: (e) => <span className="font-semibold text-slate-800">{e.title}</span>,
    },
    {
      key: 'amount',
      header: 'Amount (₹)',
      render: (e) => (
        <span className="font-bold text-slate-900">{formatCurrency(e.amount)}</span>
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

  return (
    <div className="space-y-3">
      <Table columns={columns} data={expenses} isLoading={isLoading} />
      {expenses.length > 0 && (
        <div className="flex justify-end p-4 bg-white rounded-2xl border border-[#eef1f6] shadow-sm">
          <p className="text-xs font-semibold text-slate-500">
            Total Expenses:{' '}
            <strong className="text-sm font-extrabold text-slate-900 ml-2">
              {formatCurrency(totalAmount)}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};
