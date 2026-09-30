import { api } from '@/services/api';
import { Room, CreateRoomDTO } from '../types/room.types';

export const roomApi = {
  getAll: (propertyId?: string) => api.get<Room[]>('/rooms', { propertyId }),
  getById: (id: string) => api.get<Room>(`/rooms/${id}`),
  create: (data: CreateRoomDTO) => api.post<Room>('/rooms', data),
  update: (id: string, data: Partial<CreateRoomDTO>) => api.put<Room>(`/rooms/${id}`, data),
  delete: (id: string) => api.delete<void>(`/rooms/${id}`),
};
