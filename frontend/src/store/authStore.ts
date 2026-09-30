import { create } from 'zustand';
import { User, Role } from '@/types/user.types';
import { STORAGE_KEYS } from '@/utils/constants';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string, refreshToken?: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const defaultAdminUser: User = {
  id: 'usr-admin-1',
  email: 'admin@pghub.com',
  firstName: 'Admin',
  lastName: 'Kumar',
  role: 'PROPERTY_OWNER' as Role,
  createdAt: '2025-01-01T00:00:00Z',
};

const getInitialUser = (): User | null => {
  const saved = localStorage.getItem(STORAGE_KEYS.USER);
  if (!saved) return defaultAdminUser;
  try {
    return JSON.parse(saved);
  } catch {
    return defaultAdminUser;
  }
};

const getInitialToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN) || 'demo-pghub-jwt-token';
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: getInitialUser(),
  token: getInitialToken(),
  isAuthenticated: true,
  login: (user, token, refreshToken) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    set({ user: null, token: null, isAuthenticated: false });
  },
  setUser: (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    set({ user });
  },
}));
