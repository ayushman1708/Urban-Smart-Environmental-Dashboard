import React, { useEffect, useState } from 'react';
import { readingsService, AirQualityTelemetry } from '../services/readings';
import { Wind, Activity, RefreshCw, AlertTriangle } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const AirQualityPage: React.FC = () => {
  const [data, setData] = useState<AirQualityTelemetry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAirQuality = async () => {
    setLoading(true);
    try {
      const res = await readingsService.getAirQuality();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirQuality();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-300">Fetching Air Quality Telemetry...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Live Environmental Data
            </span>
            <span className="text-xs text-slate-400">Multi-Pollutant Telemetry</span>
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Air Quality Intelligence</h2>
          <p className="text-xs text-slate-400">Particulate matter, gaseous concentrations, and zone pollution breakdown</p>
        </div>

        <button
          onClick={fetchAirQuality}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 text-xs font-bold transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">AQI Index</div>
          <div className="text-3xl font-black text-cyan-400 my-1">{data.current_aqi}</div>
          <div className="text-[10px] font-bold text-amber-400">Moderate</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">PM2.5</div>
          <div className="text-3xl font-black text-rose-400 my-1">{data.pm25}</div>
          <div className="text-[10px] text-slate-400">μg/m³</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">PM10</div>
          <div className="text-3xl font-black text-amber-400 my-1">{data.pm10}</div>
          <div className="text-[10px] text-slate-400">μg/m³</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">CO</div>
          <div className="text-3xl font-black text-emerald-400 my-1">{data.co}</div>
          <div className="text-[10px] text-slate-400">mg/m³</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">NO₂</div>
          <div className="text-3xl font-black text-blue-400 my-1">{data.no2}</div>
          <div className="text-[10px] text-slate-400">μg/m³</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">O₃</div>
          <div className="text-3xl font-black text-purple-400 my-1">{data.o3}</div>
          <div className="text-[10px] text-slate-400">μg/m³</div>
        </div>
      </div>

      {/* Recharts Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AQI & PM2.5 Diurnal Trend Line Chart */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-slate-100 mb-1">24-Hour Diurnal AQI & PM2.5 Trend</h3>
          <p className="text-xs text-slate-400 mb-4">Real-time database aggregated timeline</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Legend />
                <Line type="monotone" dataKey="AQI" stroke="#22d3ee" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="PM25" stroke="#fb7185" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pollution by Zone Bar Chart */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-slate-100 mb-1">Air Quality Index by Urban Zone</h3>
          <p className="text-xs text-slate-400 mb-4">Comparative multi-zone pollution metrics</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.zone_pollution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="zone_code" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="aqi" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                <Bar dataKey="pm25" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
