import React, { useEffect, useState } from 'react';
import { readingsService, NoiseTelemetry } from '../services/readings';
import { Volume2, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const NoisePage: React.FC = () => {
  const [data, setData] = useState<NoiseTelemetry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNoise = async () => {
    setLoading(true);
    try {
      const res = await readingsService.getNoise();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoise();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-300">Fetching Noise Level Telemetry...</p>
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
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
              Acoustic Telemetry
            </span>
            <span className="text-xs text-slate-400">Decibel Sensors Stream</span>
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Noise Level & Acoustic Hotspots</h2>
          <p className="text-xs text-slate-400">Ambient sound levels, peak decibel thresholds, and zone acoustic compliance</p>
        </div>

        <button
          onClick={fetchNoise}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-purple-400 text-xs font-bold transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Noise Metrics</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Current Decibel</div>
          <div className="text-3xl font-black text-purple-400 my-1">{data.current_db} dB</div>
          <div className="text-[10px] font-bold text-amber-400">Moderate Daytime Level</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Average 24h dB</div>
          <div className="text-3xl font-black text-cyan-400 my-1">{data.avg_db} dB</div>
          <div className="text-[10px] text-slate-400">Baseline</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Peak Peak dB</div>
          <div className="text-3xl font-black text-rose-400 my-1">{data.max_db} dB</div>
          <div className="text-[10px] text-rose-400 font-bold">Recorded on Expressway</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Minimum Quiet dB</div>
          <div className="text-3xl font-black text-emerald-400 my-1">{data.min_db} dB</div>
          <div className="text-[10px] text-slate-400">Nighttime Green Park</div>
        </div>
      </div>

      {/* Decibel Time Series Line Chart */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-slate-100 mb-1">Decibel Level (dB) 24-Hour Timeline vs 65 dB Threshold</h3>
        <p className="text-xs text-slate-400 mb-4">Traffic and commercial acoustic peaks</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[40, 90]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="dB" stroke="#c084fc" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Threshold" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hotspots Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-slate-100 mb-3">Zone Category Acoustic Hotspots</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <th className="py-2.5 px-3">Zone</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Current dB</th>
                <th className="py-2.5 px-3">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {data.hotspots.map((h, i) => (
                <tr key={i} className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-semibold text-slate-200">{h.zone}</td>
                  <td className="py-3 px-3 text-cyan-400 font-semibold">{h.type}</td>
                  <td className="py-3 px-3 font-mono font-bold text-purple-400">{h.db} dB</td>
                  <td className="py-3 px-3 font-semibold text-amber-400">{h.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
