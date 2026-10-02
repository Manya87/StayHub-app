import React from 'react';
import { Card } from '@/components/ui/Card';

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtext?: React.ReactNode;
  description?: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  iconBg?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtext,
  description,
  change,
  isPositive = true,
  icon,
  iconBg = 'bg-indigo-50 text-[#5d5fef]',
}) => {
  return (
    <Card hoverEffect className="relative overflow-hidden p-5 bg-white border border-[#eef1f6]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">{value}</h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">{title}</p>
          </div>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {change && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
              isPositive
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : 'bg-rose-50 text-rose-600 border border-rose-100'
            }`}
          >
            {isPositive ? '↑ ' : '↓ '}
            {change}
          </span>
        )}
        {subtext && (
          <span className="text-[11px] text-slate-400 font-medium">{subtext}</span>
        )}
      </div>
    </Card>
  );
};
