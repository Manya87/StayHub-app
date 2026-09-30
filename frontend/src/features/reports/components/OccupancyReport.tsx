import React from 'react';
import { Card } from '@/components/ui/Card';
import { Table, Column } from '@/components/ui/Table';
import { OccupancyReportItem } from '../types/report.types';

export const OccupancyReport: React.FC<{ data: OccupancyReportItem[] }> = ({ data }) => {
  const columns: Column<OccupancyReportItem>[] = [
    { key: 'property', header: 'Property' },
    { key: 'totalBeds', header: 'Total Capacity' },
    { key: 'occupied', header: 'Occupied Beds' },
    {
      key: 'rate',
      header: 'Occupancy Rate',
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full"
              style={{ width: `${r.rate}%` }}
            />
          </div>
          <span className="font-semibold text-emerald-400 text-xs">{r.rate}%</span>
        </div>
      ),
    },
  ];

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-white">Occupancy & Inventory Utilization</h4>
          <p className="text-xs text-slate-400">Bed utilization across properties</p>
        </div>
      </div>
      <Table columns={columns} data={data} />
    </Card>
  );
};
