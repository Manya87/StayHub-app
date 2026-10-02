import React from 'react';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatCurrency';

export const ExpenseReport: React.FC = () => {
  const breakdown = [
    { category: 'Groceries & Mess', amount: 165000, percentage: 38 },
    { category: 'Electricity & Utilities', amount: 110000, percentage: 25 },
    { category: 'Staff Salaries', amount: 95000, percentage: 22 },
    { category: 'Repairs & Maintenance', amount: 45000, percentage: 10 },
    { category: 'Internet & Tech', amount: 20000, percentage: 5 },
  ];

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-white">Expense Distribution</h4>
          <p className="text-xs text-slate-400">Quarterly cost breakdown</p>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {breakdown.map((item) => (
          <div key={item.category} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">{item.category}</span>
              <span className="font-semibold text-white">{formatCurrency(item.amount)} ({item.percentage}%)</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
