export type MealType = 'BREAKFAST' | 'LUNCH' | 'SNACKS' | 'DINNER';

export interface DailyMenu {
  dayOfWeek: string;
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
}

export interface MessMember {
  id: string;
  tenantId: string;
  tenantName: string;
  roomNumber: string;
  mealPlan: 'FULL_BOARD' | 'BREAKFAST_DINNER' | 'LUNCH_DINNER';
  dietType: 'VEG' | 'NON_VEG';
  active: boolean;
}

export interface AttendanceRecord {
  date: string;
  breakfastCount: number;
  lunchCount: number;
  dinnerCount: number;
}
