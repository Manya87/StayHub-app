import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useModal } from '@/hooks/useModal';
import { Calendar, Plus } from 'lucide-react';

interface Meal {
  id: string;
  name: string;
  time: string;
  timingColor: string;
  items: string[];
  image: string;
}

const todayMeals: Meal[] = [
  {
    id: '1',
    name: 'Breakfast',
    time: '8:00 AM - 10:00 AM',
    timingColor: 'bg-indigo-50 text-[#5d5fef]',
    items: ['Poha', 'Boiled Eggs', 'Tea / Coffee'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '2',
    name: 'Lunch',
    time: '1:00 PM - 3:00 PM',
    timingColor: 'bg-amber-50 text-amber-600',
    items: ['Rice', 'Dal', 'Mixed Veg', 'Roti', 'Salad'],
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '3',
    name: 'Dinner',
    time: '8:00 PM - 10:00 PM',
    timingColor: 'bg-blue-50 text-blue-600',
    items: ['Chapati', 'Paneer Curry', 'Rice', 'Curd'],
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80',
  },
];

export const MessPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Today' | 'This Week'>('Today');
  const addModal = useModal();
  const [meals, setMeals] = useState<Meal[]>(todayMeals);

  const [mealName, setMealName] = useState('Breakfast');
  const [mealTime, setMealTime] = useState('');
  const [mealItems, setMealItems] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeal: Meal = {
      id: String(Date.now()),
      name: mealName,
      time: mealTime || '7:00 PM - 9:00 PM',
      timingColor: 'bg-indigo-50 text-[#5d5fef]',
      items: mealItems.split(',').map((s) => s.trim()),
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
    };
    setMeals([...meals, newMeal]);
    addModal.close();
    setMealItems('');
  };

  return (
    <PageContainer
      title="Food & Menu"
      subtitle="Manage daily food menu"
      actions={
        <div className="flex items-center gap-3">
          {/* Date Picker Button */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:border-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Tue, 15 Apr 2025</span>
          </div>

          <Button
            size="sm"
            onClick={addModal.open}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-[#5d5fef] hover:bg-[#4f46e5] text-white shadow-sm shadow-[#5d5fef]/25 font-semibold"
          >
            Add Menu
          </Button>
        </div>
      }
    >
      {/* Tabs matching Screen 10 */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 mb-6 overflow-x-auto pb-1">
        {(['Today', 'This Week'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2.5 px-3 text-xs font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab
                ? 'text-[#5d5fef]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5d5fef] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* 3 Food Cards matching Screen 10 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <Card
            key={meal.id}
            className="p-5 bg-white border border-[#eef1f6] hover:shadow-card-hover transition-all"
          >
            <div className="mb-3">
              <h4 className="text-base font-extrabold text-slate-900">{meal.name}</h4>
              <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${meal.timingColor}`}>
                {meal.time}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              {/* Dishes bullet list */}
              <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                {meal.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Round plate image */}
              <div className="flex-shrink-0">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-20 h-20 rounded-full object-cover shadow-md ring-2 ring-slate-100"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Menu Modal */}
      <Modal isOpen={addModal.isOpen} onClose={addModal.close} title="Add Meal Menu" maxWidth="md">
        <form onSubmit={handleAdd} className="space-y-4">
          <Select
            label="Meal Type *"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            options={[
              { label: 'Breakfast', value: 'Breakfast' },
              { label: 'Lunch', value: 'Lunch' },
              { label: 'Evening Snacks', value: 'Snacks' },
              { label: 'Dinner', value: 'Dinner' },
            ]}
          />
          <Input
            label="Timing (e.g. 8:00 AM - 10:00 AM)"
            value={mealTime}
            onChange={(e) => setMealTime(e.target.value)}
            placeholder="8:00 AM - 10:00 AM"
          />
          <Input
            label="Dishes (comma separated) *"
            value={mealItems}
            onChange={(e) => setMealItems(e.target.value)}
            placeholder="e.g. Poha, Boiled Eggs, Tea"
            required
          />
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="secondary" type="button" onClick={addModal.close}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#5d5fef] text-white">
              Save Menu
            </Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
};
