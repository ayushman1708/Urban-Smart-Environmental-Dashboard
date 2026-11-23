import React, { useEffect, useState } from 'react';
import { readingsService, WeatherTelemetry } from '../services/readings';
import { CloudSun, Wind, Thermometer, Droplet, Compass, RefreshCw, AlertCircle } from 'lucide-react';
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

export const WeatherPage: React.FC = () => {
  const [data, setData] = useState<WeatherTelemetry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await readingsService.getWeather();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-300">Fetching Weather Telemetry...</p>
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
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Atmospheric Telemetry
            </span>
            <span className="text-xs text-slate-400">Micro-Climate Stream</span>
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Weather & Micro-Climate</h2>
          <p className="text-xs text-slate-400">Temperature, humidity, wind vectors, pressure, and air-pollution correlation analysis</p>
        </div>

        <button
          onClick={fetchWeather}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 text-xs font-bold transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Weather</span>
        </button>
      </div>

      {/* Weather Insights Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Weather-Pollution Correlation Insight</div>
          <div className="text-xs text-slate-200 mt-0.5 leading-relaxed">{data.correlation_insight}</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Temperature</div>
          <div className="text-3xl font-black text-amber-400 my-1">{data.temperature}°C</div>
          <div className="text-[10px] text-slate-400">Optimal</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Humidity</div>
          <div className="text-3xl font-black text-cyan-400 my-1">{data.humidity}%</div>
          <div className="text-[10px] text-slate-400">Relative</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Wind Speed</div>
          <div className="text-3xl font-black text-emerald-400 my-1">{data.wind_speed}</div>
          <div className="text-[10px] text-slate-400">km/h</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Wind Vector</div>
          <div className="text-3xl font-black text-purple-400 my-1">{data.wind_direction}°</div>
          <div className="text-[10px] text-slate-400">South-West</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Pressure</div>
          <div className="text-3xl font-black text-blue-400 my-1">{data.pressure}</div>
          <div className="text-[10px] text-slate-400">hPa</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Rainfall</div>
          <div className="text-3xl font-black text-teal-400 my-1">{data.rainfall}</div>
          <div className="text-[10px] text-slate-400">mm</div>
        </div>
      </div>

      {/* Temperature vs Humidity Dual-Axis Trend */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-slate-100 mb-1">Temperature vs Humidity 24-Hour Curve</h3>
        <p className="text-xs text-slate-400 mb-4">Inverse diurnal humidity & thermal variations</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis yAxisId="left" stroke="#fbbf24" fontSize={11} />
              <YAxis yAxisId="right" orientation="right" stroke="#22d3ee" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="Temp" stroke="#fbbf24" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="Humidity" stroke="#22d3ee" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
