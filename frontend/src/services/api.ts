import { DashboardSummary, RecentAlert, EnvironmentalStatus, HealthStatus } from '../types';

const API_BASE = '/api/v1';

const getHeaders = () => {
  const token = localStorage.getItem('ecosense_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const apiService = {
  async getSummary(): Promise<DashboardSummary> {
    const res = await fetch(`${API_BASE}/dashboard/summary`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch dashboard summary');
    return res.json();
  },

  async getRecentAlerts(): Promise<RecentAlert[]> {
    const res = await fetch(`${API_BASE}/dashboard/recent-alerts`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch recent alerts');
    return res.json();
  },

  async getEnvironmentalStatus(): Promise<EnvironmentalStatus[]> {
    const res = await fetch(`${API_BASE}/dashboard/environmental-status`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch environmental status');
    return res.json();
  },

  async getHealthStatus(): Promise<HealthStatus> {
    const res = await fetch(`${API_BASE}/health`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch system health');
    return res.json();
  },
};
