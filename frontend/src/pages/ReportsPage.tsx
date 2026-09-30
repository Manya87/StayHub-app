import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Download, FileText, Receipt, Home, AlertCircle, Users } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [activeReport, setActiveReport] = useState<
    'Payment' | 'Expense' | 'Occupancy' | 'Complaint' | 'Visitor'
  >('Payment');

  const reportTabs = [
    { id: 'Payment', label: 'Payment Report', icon: FileText },
    { id: 'Expense', label: 'Expense Report', icon: Receipt },
    { id: 'Occupancy', label: 'Occupancy Report', icon: Home },
    { id: 'Complaint', label: 'Complaint Report', icon: AlertCircle },
    { id: 'Visitor', label: 'Visitor Report', icon: Users },
  ] as const;

  const monthlyTrend = [
    { month: 'Jan', height: 60, val: '₹3.9L' },
    { month: 'Feb', height: 70, val: '₹4.2L' },
    { month: 'Mar', height: 55, val: '₹3.8L' },
    { month: 'Apr', height: 95, val: '₹4.85L' },
    { month: 'May', height: 80, val: '₹4.5L' },
    { month: 'Jun', height: 85, val: '₹4.7L' },
    { month: 'Jul', height: 75, val: '₹4.4L' },
    { month: 'Aug', height: 88, val: '₹4.6L' },
  ];

  const yLabels = ['5L', '4L', '3L', '2L', '1L', '0'];

  return (
    <PageContainer
      title="Reports"
      subtitle="View detailed insights"
      actions={
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:border-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Apr 2025</span>
          </div>
          <Button
            size="sm"
            onClick={() => window.print()}
            leftIcon={<Download className="w-4 h-4" />}
            className="bg-[#5d5fef] hover:bg-[#4f46e5] text-white shadow-sm shadow-[#5d5fef]/25 font-semibold"
          >
            Export
          </Button>
        </div>
      }
    >
      {/* Two Column Layout matching Screen 13 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Vertical Report Category Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {reportTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeReport === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveReport(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-[#5d5fef] text-white shadow-md shadow-[#5d5fef]/25'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Report Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">{activeReport} Report</h3>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-4 bg-white border border-[#eef1f6]">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">₹4,85,000</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Total Collection</p>
            </Card>
            <Card className="p-4 bg-white border border-[#eef1f6]">
              <h3 className="text-lg sm:text-xl font-extrabold text-rose-500">₹18,000</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Pending Dues</p>
            </Card>
            <Card className="p-4 bg-white border border-[#eef1f6]">
              <h3 className="text-lg sm:text-xl font-extrabold text-emerald-600">₹4,67,000</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Received</p>
            </Card>
            <Card className="p-4 bg-white border border-[#eef1f6]">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">52</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Total Tenants</p>
            </Card>
          </div>

          {/* Monthly Collection Trend Bar Chart */}
          <Card className="p-5 bg-white border border-[#eef1f6]">
            <div className="pb-3 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">Monthly Collection Trend</h4>
            </div>

            <div className="pt-6 pb-2 flex">
              {/* Y Axis */}
              <div className="flex flex-col justify-between h-48 pr-3 text-[10px] text-slate-400 font-medium select-none">
                {yLabels.map((lbl) => (
                  <span key={lbl}>{lbl}</span>
                ))}
              </div>

              {/* Bars and grid */}
              <div className="relative flex-1 h-48 flex items-end justify-between gap-3 border-b border-slate-200">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                  {yLabels.map((_, i) => (
                    <div key={i} className="w-full border-t border-dashed border-slate-200"></div>
                  ))}
                </div>

                {monthlyTrend.map((item) => (
                  <div key={item.month} className="relative z-10 flex-1 flex flex-col items-center h-full justify-end group">
                    <div
                      style={{ height: `${item.height}%` }}
                      className="w-3.5 sm:w-5 bg-[#5d5fef] hover:bg-[#4338ca] rounded-t-full transition-all cursor-pointer shadow-sm"
                      title={`${item.month}: ${item.val}`}
                    />
                    <span className="text-[10px] font-medium text-slate-400 mt-2">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};
