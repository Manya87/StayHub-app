import React from 'react';
import { Card } from '@/components/ui/Card';
import { DailyMenu } from '../types/mess.types';

export const Menu: React.FC<{ menu: DailyMenu[] }> = ({ menu }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menu.map((m) => (
        <Card key={m.dayOfWeek} hoverEffect className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-sm font-bold text-indigo-400">{m.dayOfWeek}</h4>
            <span className="text-[10px] uppercase font-semibold text-slate-500">Weekly Schedule</span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="font-semibold text-slate-300 block">Breakfast:</span>
              <span className="text-slate-400">{m.breakfast}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-300 block">Lunch:</span>
              <span className="text-slate-400">{m.lunch}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-300 block">Snacks:</span>
              <span className="text-slate-400">{m.snacks}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-300 block">Dinner:</span>
              <span className="text-slate-400">{m.dinner}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
