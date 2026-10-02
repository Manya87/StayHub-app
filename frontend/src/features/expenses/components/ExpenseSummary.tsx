import React from 'react';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatCurrency';
import { ExpenseRecord } from '../types/expense.types';

export const ExpenseSummary: React.FC<{ expenses: ExpenseRecord[] }> = ({ expenses }) => {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800">
      <div>
        <span className="text-xs text-slate-400">Total Logged Expenses</span>
        <h3 className="text-xl font-bold text-rose-400 mt-0.5">{formatCurrency(total)}</h3>
      </div>
      <span className="text-xs font-medium text-slate-400">{expenses.length} records</span>
    </Card>
  );
};
