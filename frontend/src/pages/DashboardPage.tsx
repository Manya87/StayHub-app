import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { StatsCard } from '@/features/dashboard/components/StatsCard';
import { OccupancyChart } from '@/features/dashboard/components/OccupancyChart';
import { RevenueChart } from '@/features/dashboard/components/RevenueChart';
import { RecentTenantsTable } from '@/features/dashboard/components/RecentTenantsTable';
import { BedDouble, Users, CreditCard, AlertCircle, Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Here's an overview of your PG."
      actions={
        <div className="flex items-center gap-3">
          {/* Month selector dropdown */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:border-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Apr 2025</span>
          </div>

          <Button
            size="sm"
            onClick={() => navigate('/tenants')}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-[#5d5fef] hover:bg-[#4f46e5] text-white shadow-sm shadow-[#5d5fef]/25"
          >
            Add New
          </Button>
        </div>
      }
    >
      {/* 4 Stat Cards Row (Screen 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Rooms"
          value="36"
          subtext={
            <div className="flex items-center gap-2 text-[11px]">
              <span className="flex items-center gap-1 text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 30 Occupied
              </span>
              <span className="flex items-center gap-1 text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> 6 Vacant
              </span>
            </div>
          }
          icon={<BedDouble className="w-5 h-5" />}
          iconBg="bg-indigo-50 text-[#5d5fef]"
        />
        <StatsCard
          title="Total Tenants"
          value="52"
          change="2 New this month"
          isPositive={true}
          icon={<Users className="w-5 h-5" />}
          iconBg="bg-sky-50 text-sky-500"
        />
        <StatsCard
          title="Monthly Collection"
          value="₹4,85,000"
          change="12% from last month"
          isPositive={true}
          icon={<CreditCard className="w-5 h-5" />}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <StatsCard
          title="Pending Dues"
          value="3"
          subtext={<span className="text-rose-500 font-medium">Total: ₹18,000</span>}
          isPositive={false}
          icon={<AlertCircle className="w-5 h-5" />}
          iconBg="bg-rose-50 text-rose-500"
        />
      </div>

      {/* Two Column Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <OccupancyChart />
        </div>
      </div>

      {/* Bottom Section: Recent Tenants Table */}
      <div className="mt-6">
        <RecentTenantsTable />
      </div>
    </PageContainer>
  );
};
