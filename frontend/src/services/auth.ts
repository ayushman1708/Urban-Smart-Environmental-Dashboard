import { User } from '../types';

const API_BASE = '/api/v1';

export const authService = {
  async login(email: string, password: string): Promise<{ access_token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Login failed');
    }
    const data = await res.json();
    localStorage.setItem('ecosense_token', data.access_token);
    localStorage.setItem('ecosense_user', JSON.stringify(data.user));
    return data;
  },

  async register(email: string, password: string, full_name: string, role: string): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name, role }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Registration failed');
    }
    return res.json();
  },

  getCurrentUser(): User | null {
    const stored = localStorage.getItem('ecosense_user');
    return stored ? JSON.parse(stored) : null;
  },

  logout(): void {
    localStorage.removeItem('ecosense_token');
    localStorage.removeItem('ecosense_user');
  },
};
