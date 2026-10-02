import { api } from '@/services/api';
import { DailyMenu, MessMember, AttendanceRecord } from '../types/mess.types';

export const messApi = {
  getWeeklyMenu: (propertyId?: string) => api.get<DailyMenu[]>('/mess/menu', { propertyId }),
  getMembers: (propertyId?: string) => api.get<MessMember[]>('/mess/members', { propertyId }),
  getAttendance: (propertyId?: string) =>
    api.get<AttendanceRecord[]>('/mess/attendance', { propertyId }),
};
