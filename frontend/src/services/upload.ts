import apiClient from './axios';
import { ApiResponse } from '@/types/api.types';

export interface UploadResponse {
  fileUrl: string;
  fileName: string;
  fileSize: number;
}

export const uploadService = {
  uploadFile: async (file: File): Promise<ApiResponse<UploadResponse>> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post<ApiResponse<UploadResponse>>('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};
