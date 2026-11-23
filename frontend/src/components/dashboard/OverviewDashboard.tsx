import React, { useEffect, useState } from 'react';
import { MetricCard } from '../common/MetricCard';
import { FilterBar } from '../common/FilterBar';
import { EnvironmentalStatusGrid } from './EnvironmentalStatusGrid';
import { RecentAlertsWidget } from './RecentAlertsWidget';
import { apiService } from '../../services/api';
import { DashboardSummary, RecentAlert, EnvironmentalStatus } from '../../types';
import {
  Wind,
  CloudSun,
  Activity,
  AlertTriangle,
  MapPin,
  Bot,
  Sliders,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface OverviewDashboardProps {
  onNavigate: (route: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ onNavigate }) => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentAlerts, setRecentAlerts] = useState<RecentAlert[]>([]);
  const [envStatus, setEnvStatus] = useState<EnvironmentalStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [sumData, alertData, statusData] = await Promise.all([
        apiService.getSummary(),
        apiService.getRecentAlerts(),
        apiService.getEnvironmentalStatus(),
      ]);
      setSummary(sumData);
      setRecentAlerts(alertData);
      setEnvStatus(statusData);
    } catch (err: any) {
      setError(err.message || 'Failed to load telemetry data from backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Demo Trend Chart Data
  const trendData = [
    { time: '00:00', AQI: 65, PM25: 32, Temp: 23 },
    { time: '03:00', AQI: 58, PM25: 28, Temp: 22 },
    { time: '06:00', AQI: 72, PM25: 38, Temp: 24 },
    { time: '09:00', AQI: 95, PM25: 52, Temp: 27 },
    { time: '12:00', AQI: 110, PM25: 64, Temp: 31 },
    { time: '15:00', AQI: 125, PM25: 78, Temp: 32 },
    { time: '18:00', AQI: 186, PM25: 121, Temp: 29 },
    { time: '21:00', AQI: 140, PM25: 85, Temp: 26 },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-300">Syncing Live Environmental Telemetry...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 text-center">
        <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-100 mb-1">Backend Connection Issue</h3>
        <p className="text-xs text-slate-400 mb-4">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Top Banner / Executive Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Live Sensor Stream
            </span>
            <span className="text-xs text-slate-400">Connected to 15 ESP32 IoT Nodes</span>
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Executive Telemetry Overview</h2>
          <p className="text-xs text-slate-400">
            Real-time urban environmental indices, anomaly highlights, and alert status
          </p>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('simulator')}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition"
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Launch Simulator</span>
          </button>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-600/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Global Filter Bar */}
      <FilterBar onRefresh={fetchDashboardData} />

      {/* KPI Cards Grid */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <MetricCard data={summary.current_aqi} icon={<Wind className="w-5 h-5" />} />
          <MetricCard data={summary.pm25} icon={<Activity className="w-5 h-5" />} />
          <MetricCard data={summary.pm10} icon={<Activity className="w-5 h-5" />} />
          <MetricCard data={summary.temperature} icon={<CloudSun className="w-5 h-5" />} />
          <MetricCard data={summary.humidity} icon={<CloudSun className="w-5 h-5" />} />
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Active Alerts
              </span>
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold text-rose-400">{summary.active_alerts_count}</span>
              <span className="text-xs text-slate-400 ml-2">Requires Action</span>
            </div>
            <button
              onClick={() => onNavigate('alerts')}
              className="text-xs text-cyan-400 font-semibold hover:underline text-left"
            >
              Review Rule Engine →
            </button>
          </div>
        </div>
      )}

      {/* Environmental Status Grid */}
      <EnvironmentalStatusGrid items={envStatus} onNavigate={onNavigate} />

      {/* Interactive 24-Hour Pollution & Weather Trend Chart */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-100 tracking-tight">24-Hour Diurnal Pollution & Temperature Trend</h3>
            <p className="text-xs text-slate-400">Comparative multi-parameter timeline across urban zones</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span> AQI Index
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block ml-2"></span> PM2.5
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block ml-2"></span> Temp (°C)
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="AQI" stroke="#22d3ee" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="PM25" stroke="#fb7185" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Temp" stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts Widget */}
      <RecentAlertsWidget alerts={recentAlerts} onNavigate={onNavigate} />
    </div>
  );
};
