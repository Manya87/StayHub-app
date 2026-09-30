import React from 'react';
import { Card } from '@/components/ui/Card';
import { Utensils, Coffee, Sun, Moon } from 'lucide-react';

interface MealAttendanceProps {
  counts: {
    breakfast: number;
    lunch: number;
    dinner: number;
  };
}

export const MealAttendance: React.FC<MealAttendanceProps> = ({ counts }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="text-center p-4">
        <Coffee className="w-5 h-5 text-amber-400 mx-auto mb-2" />
        <span className="text-xs text-slate-400 block">Breakfast Servings</span>
        <h3 className="text-2xl font-bold text-white mt-1">{counts.breakfast}</h3>
      </Card>
      <Card className="text-center p-4">
        <Sun className="w-5 h-5 text-amber-500 mx-auto mb-2" />
        <span className="text-xs text-slate-400 block">Lunch Servings</span>
        <h3 className="text-2xl font-bold text-white mt-1">{counts.lunch}</h3>
      </Card>
      <Card className="text-center p-4">
        <Moon className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
        <span className="text-xs text-slate-400 block">Dinner Servings</span>
        <h3 className="text-2xl font-bold text-white mt-1">{counts.dinner}</h3>
      </Card>
    </div>
  );
};
