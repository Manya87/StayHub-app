import apiClient from './axios';
import { ApiResponse } from '@/types/api.types';

export const api = {
  get: async <T>(url: string, params?: any): Promise<ApiResponse<T>> => {
    const res = await apiClient.get<ApiResponse<T>>(url, { params });
    return res.data;
  },
  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const res = await apiClient.post<ApiResponse<T>>(url, data);
    return res.data;
  },
  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const res = await apiClient.put<ApiResponse<T>>(url, data);
    return res.data;
  },
  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    const res = await apiClient.delete<ApiResponse<T>>(url);
    return res.data;
  },
};
