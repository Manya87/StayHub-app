import { api } from '@/services/api';
import { StaffRecord, CreateStaffDTO } from '../types/staff.types';

export const staffApi = {
  getAll: (propertyId?: string) => api.get<StaffRecord[]>('/staff', { propertyId }),
  getById: (id: string) => api.get<StaffRecord>(`/staff/${id}`),
  create: (data: CreateStaffDTO) => api.post<StaffRecord>('/staff', data),
  delete: (id: string) => api.delete<void>(`/staff/${id}`),
};
