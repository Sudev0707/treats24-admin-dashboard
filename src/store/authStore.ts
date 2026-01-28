import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminUser, UserRole } from '@/types';

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  hasRole: (roles: UserRole[]) => boolean;
  hasPermission: (permission: string) => boolean;
}

// Mock admin users for demo
const mockAdminUsers: Record<string, { password: string; user: AdminUser }> = {
  'admin@treats24.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'sudev@treats24.com',
      name: 'Sudev',
      role: 'ADMIN',
      avatar: undefined,
      lastLogin: new Date().toISOString(),
      createdAt: '2024-01-01T00:00:00Z',
    },
  },
  'support@treats24.com': {
    password: 'support123',
    user: {
      id: '2',
      email: 'support@treats24.com',
      name: 'Treat Support',
      role: 'SUPPORT',
      avatar: undefined,
      lastLogin: new Date().toISOString(),
      createdAt: '2024-02-01T00:00:00Z',
    },
  },
  'finance@treats24.com': {
    password: 'finance123',
    user: {
      id: '3',
      email: 'finance@treats24.com',
      name: 'Treat Finance',
      role: 'FINANCE',
      avatar: undefined,
      lastLogin: new Date().toISOString(),
      createdAt: '2024-03-01T00:00:00Z',
    },
  },
};

// Role-based permissions
const rolePermissions: Record<UserRole, string[]> = {
  ADMIN: ['*'], // All permissions
  SUPPORT: [
    'dashboard.view',
    'users.view',
    'users.manage',
    'partners.view',
    'orders.view',
    'orders.manage',
    'notifications.view',
    'notifications.manage',
  ],
  FINANCE: [
    'dashboard.view',
    'finance.view',
    'finance.manage',
    'partners.view',
    'orders.view',
    'analytics.view',
  ],
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = mockAdminUsers[email.toLowerCase()];
        
        if (mockUser && mockUser.password === password) {
          const token = `jwt-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          set({
            user: { ...mockUser.user, lastLogin: new Date().toISOString() },
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      hasRole: (roles: UserRole[]) => {
        const { user } = get();
        if (!user) return false;
        return roles.includes(user.role);
      },

      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;
        
        const permissions = rolePermissions[user.role];
        return permissions.includes('*') || permissions.includes(permission);
      },
    }),
    {
      name: 'treats24-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
