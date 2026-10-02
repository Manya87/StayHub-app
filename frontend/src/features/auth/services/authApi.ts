import { api } from '@/services/api';
import { LoginRequest, AuthResponse, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest, GoogleAuthRequest } from '../types/auth.types';

export const authApi = {
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data),
  register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/register', data),
  googleLogin: (data: GoogleAuthRequest) => api.post<AuthResponse>('/auth/google', data),
  forgotPassword: (data: ForgotPasswordRequest) => api.post<{ message: string }>('/auth/forgot-password', data),
  resetPassword: (data: ResetPasswordRequest) => api.post<{ message: string }>('/auth/reset-password', data),
  me: () => api.get<AuthResponse['user']>('/auth/me'),
};
