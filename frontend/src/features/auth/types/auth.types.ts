import { User } from '@/types/user.types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  avatarUrl?: string;
  user?: User;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface GoogleAuthRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  googleId?: string;
}
