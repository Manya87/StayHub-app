import { useState } from 'react';
import { DailyMenu, MessMember, AttendanceRecord } from '../types/mess.types';

const MOCK_MENU: DailyMenu[] = [
  {
    dayOfWeek: 'Monday',
    breakfast: 'Idli Sambar & Coconut Chutney, Tea/Coffee',
    lunch: 'Steamed Rice, Dal Tadka, Aloo Gobi, Curd',
    snacks: 'Samosa & Chai',
    dinner: 'Roti, Paneer Butter Masala, Jeera Rice, Gulab Jamun',
  },
  {
    dayOfWeek: 'Tuesday',
    breakfast: 'Poha with Peanuts & Sev, Boiled Eggs, Tea',
    lunch: 'Rajma Chawal, Mix Veg Curry, Papad, Salad',
    snacks: 'Veg Cutlet & Tea',
    dinner: 'Phulka, Egg Curry / Dal Makhani, Steamed Rice',
  },
  {
    dayOfWeek: 'Wednesday',
    breakfast: 'Masala Dosa with Sambar & Red Chutney',
    lunch: 'Lemon Rice, Sambar, Bhindi Fry, Curd',
    snacks: 'Biscuits & Filter Coffee',
    dinner: 'Chicken Biryani / Veg Pulao, Raita, Kheer',
  },
  {
    dayOfWeek: 'Thursday',
    breakfast: 'Aloo Paratha with Curd & Butter',
    lunch: 'North Indian Thali (Dal, Paneer Sabzi, Rice, Roti)',
    snacks: 'Pakora & Ginger Tea',
    dinner: 'Chapati, Mixed Veg Korma, Steamed Rice',
  },
  {
    dayOfWeek: 'Friday',
    breakfast: 'Upma with Chutney & Kesari Bath',
    lunch: 'Chole Bhature with Pickled Onions',
    snacks: 'Sweet Corn & Coffee',
    dinner: 'Roti, Palak Paneer / Dal Fry, Jeera Rice',
  },
  {
    dayOfWeek: 'Saturday',
    breakfast: 'Puri Sabzi, Banana, Tea/Coffee',
    lunch: 'Curd Rice, Potato Fry, Rasam, Appalam',
    snacks: 'Sandwich & Tea',
    dinner: 'Fried Rice, Veg Manchurian / Chili Chicken',
  },
  {
    dayOfWeek: 'Sunday',
    breakfast: 'Mysore Masala Dosa, Filter Coffee',
    lunch: 'Special Sunday Feast (Chicken Curry / Shahi Paneer)',
    snacks: 'Cookies & Chai',
    dinner: 'Light Dinner (Khichdi, Kadhi, Papad)',
  },
];

const MOCK_MEMBERS: MessMember[] = [
  { id: 'm1', tenantId: 't-1', tenantName: 'Aditya Verma', roomNumber: '101', mealPlan: 'FULL_BOARD', dietType: 'NON_VEG', active: true },
  { id: 'm2', tenantId: 't-2', tenantName: 'Priya Sharma', roomNumber: '102', mealPlan: 'BREAKFAST_DINNER', dietType: 'VEG', active: true },
  { id: 'm3', tenantId: 't-3', tenantName: 'Kunal Kapoor', roomNumber: '202', mealPlan: 'FULL_BOARD', dietType: 'VEG', active: true },
];

export const useMess = () => {
  const [weeklyMenu] = useState<DailyMenu[]>(MOCK_MENU);
  const [members] = useState<MessMember[]>(MOCK_MEMBERS);
  const [todayCounts] = useState({ breakfast: 48, lunch: 36, dinner: 52 });

  return {
    weeklyMenu,
    members,
    todayCounts,
  };
};
