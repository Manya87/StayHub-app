import React from 'react';
import { Card } from '@/components/ui/Card';

export const RevenueChart: React.FC = () => {
  const data = [
    { month: 'Jan', inc: 65, exp: 35 },
    { month: 'Feb', inc: 78, exp: 40 },
    { month: 'Mar', inc: 70, exp: 45 },
    { month: 'Apr', inc: 92, exp: 38 },
    { month: 'May', inc: 84, exp: 50 },
    { month: 'Jun', inc: 95, exp: 58 },
    { month: 'Jul', inc: 88, exp: 42 },
    { month: 'Aug', inc: 90, exp: 46 },
  ];

  const yLabels = ['50k', '40k', '30k', '20k', '10k', '0'];

  return (
    <Card className="p-5 bg-white border border-[#eef1f6] flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Monthly Income vs Expenses</h4>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#14b8a6]"></span> Income
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fb7185]"></span> Expenses
          </span>
        </div>
      </div>

      {/* Chart container with Y-axis and grid */}
      <div className="relative pt-6 pb-2">
        <div className="flex">
          {/* Y Axis */}
          <div className="flex flex-col justify-between h-48 pr-3 text-[10px] text-slate-400 font-medium select-none">
            {yLabels.map((lbl) => (
              <span key={lbl}>{lbl}</span>
            ))}
          </div>

          {/* Bars and gridlines */}
          <div className="relative flex-1 h-48 flex items-end justify-between gap-3 border-b border-slate-200">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              {yLabels.map((_, i) => (
                <div key={i} className="w-full border-t border-dashed border-slate-200"></div>
              ))}
            </div>

            {/* Bars */}
            {data.map((item) => (
              <div key={item.month} className="relative z-10 flex-1 flex flex-col items-center h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-full pb-0.5">
                  {/* Income bar (teal) */}
                  <div
                    style={{ height: `${item.inc}%` }}
                    className="w-2 sm:w-3.5 bg-[#14b8a6] hover:bg-[#0d9488] rounded-t-full transition-all cursor-pointer"
                    title={`Income (${item.month}): ₹${item.inc * 500}`}
                  />
                  {/* Expense bar (pink) */}
                  <div
                    style={{ height: `${item.exp}%` }}
                    className="w-2 sm:w-3.5 bg-[#fb7185] hover:bg-[#f43f5e] rounded-t-full transition-all cursor-pointer"
                    title={`Expense (${item.month}): ₹${item.exp * 500}`}
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-400 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
