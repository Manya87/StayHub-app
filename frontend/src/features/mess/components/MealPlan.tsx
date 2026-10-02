import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2 } from 'lucide-react';

export const MealPlan: React.FC = () => {
  const plans = [
    {
      name: 'Full Board (3 Meals + Snacks)',
      price: '₹ 3,500 / month',
      description: 'Daily Breakfast, Lunch, Evening Snacks & Dinner',
      isPopular: true,
    },
    {
      name: 'Working Professional (Breakfast + Dinner)',
      price: '₹ 2,600 / month',
      description: 'Designed for corporate and tech workers off-site during lunch',
      isPopular: false,
    },
    {
      name: 'Dinner Only Plan',
      price: '₹ 1,800 / month',
      description: 'Hot home-style dinner 7 days a week',
      isPopular: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans.map((p) => (
        <Card key={p.name} className={`space-y-3 ${p.isPopular ? 'border-indigo-500/50 bg-indigo-950/20' : ''}`}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white">{p.name}</h4>
            {p.isPopular && <Badge variant="indigo" size="sm">Most Popular</Badge>}
          </div>
          <p className="text-lg font-extrabold text-emerald-400">{p.price}</p>
          <p className="text-xs text-slate-400">{p.description}</p>
        </Card>
      ))}
    </div>
  );
};
