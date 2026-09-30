import React from 'react';
import { Card } from '@/components/ui/Card';
import { Table, Column } from '@/components/ui/Table';
import { FinancialSummaryReport } from '../types/report.types';
import { formatCurrency } from '@/utils/formatCurrency';

export const RevenueReport: React.FC<{ data: FinancialSummaryReport[] }> = ({ data }) => {
  const columns: Column<FinancialSummaryReport>[] = [
    { key: 'period', header: 'Month / Period' },
    {
      key: 'totalIncome',
      header: 'Total Collections',
      render: (r) => <span className="font-semibold text-emerald-400">{formatCurrency(r.totalIncome)}</span>,
    },
    {
      key: 'totalExpenses',
      header: 'Operating Expenses',
      render: (r) => <span className="font-semibold text-rose-400">{formatCurrency(r.totalExpenses)}</span>,
    },
    {
      key: 'netProfit',
      header: 'Net Yield',
      render: (r) => <span className="font-bold text-white">{formatCurrency(r.netProfit)}</span>,
    },
    {
      key: 'collectionRate',
      header: 'Efficiency',
      render: (r) => <span className="text-indigo-400 font-bold">{r.collectionRate}%</span>,
    },
  ];

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-white">Monthly Revenue & Profitability</h4>
          <p className="text-xs text-slate-400">Net operating income breakdown</p>
        </div>
      </div>
      <Table columns={columns} data={data} />
    </Card>
  );
};
