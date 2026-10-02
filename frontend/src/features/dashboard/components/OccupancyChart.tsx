import React from 'react';
import { Card } from '@/components/ui/Card';

export const OccupancyChart: React.FC = () => {
  // SVG Donut calculation: circumference = 2 * PI * r = 2 * 3.14159 * 42 ~= 264
  const occupiedPct = 78;
  const vacantPct = 17;
  const maintPct = 5;

  const circ = 264;
  const occupiedStroke = (occupiedPct / 100) * circ;
  const vacantStroke = (vacantPct / 100) * circ;
  const maintStroke = (maintPct / 100) * circ;

  return (
    <Card className="p-5 bg-white border border-[#eef1f6] flex flex-col justify-between">
      <div className="pb-3 border-b border-slate-100">
        <h4 className="text-sm font-bold text-slate-900">Room Occupancy</h4>
        <p className="text-xs text-slate-400 mt-0.5">Real-time status breakdown</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
        {/* SVG Donut Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth="11"
            />
            {/* Occupied stroke (emerald) */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#10b981"
              strokeWidth="11"
              strokeDasharray={`${occupiedStroke} ${circ}`}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Vacant stroke (rose) */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#ef4444"
              strokeWidth="11"
              strokeDasharray={`${vacantStroke} ${circ}`}
              strokeDashoffset={`-${occupiedStroke + 4}`}
              strokeLinecap="round"
            />
            {/* Maintenance stroke (amber) */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#f59e0b"
              strokeWidth="11"
              strokeDasharray={`${maintStroke} ${circ}`}
              strokeDashoffset={`-${occupiedStroke + vacantStroke + 8}`}
              strokeLinecap="round"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-extrabold text-slate-900 leading-none">78%</span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">Occupied</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2.5 text-xs text-slate-600 min-w-[130px]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Occupied
            </span>
            <span className="font-bold text-slate-900">28</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              Vacant
            </span>
            <span className="font-bold text-slate-900">8</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Maintenance
            </span>
            <span className="font-bold text-slate-900">2</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400">
            <span>Total Rooms</span>
            <span className="font-bold text-slate-700">38</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
