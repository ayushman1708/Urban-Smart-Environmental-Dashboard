import React, { useEffect, useState } from 'react';
import { readingsService, WaterQualityTelemetry } from '../services/readings';
import { Droplet, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const WaterQualityPage: React.FC = () => {
  const [data, setData] = useState<WaterQualityTelemetry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWater = async () => {
    setLoading(true);
    try {
      const res = await readingsService.getWaterQuality();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWater();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-300">Fetching Water Quality Telemetry...</p>
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
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              River Basin Sensors
            </span>
            <span className="text-xs text-slate-400">Aquatic Telemetry Stream</span>
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Water Quality & Basin Health</h2>
          <p className="text-xs text-slate-400">pH balance, turbidity, dissolved oxygen, TDS, and aquatic safety assessment</p>
        </div>

        <button
          onClick={fetchWater}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-blue-400 text-xs font-bold transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* Aquatic Assessment Banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 flex items-start space-x-3">
        <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Overall Aquatic Assessment: {data.status}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Score: {data.overall_score}/100</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">{data.assessment}</p>
        </div>
      </div>

      {/* Parameter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">pH Balance</div>
          <div className="text-3xl font-black text-blue-400 my-1">{data.ph}</div>
          <div className="text-[10px] font-bold text-emerald-400">Normal Range (6.5-8.5)</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Turbidity</div>
          <div className="text-3xl font-black text-cyan-400 my-1">{data.turbidity}</div>
          <div className="text-[10px] text-slate-400">NTU</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Dissolved Oxygen (DO)</div>
          <div className="text-3xl font-black text-emerald-400 my-1">{data.dissolved_oxygen}</div>
          <div className="text-[10px] text-slate-400">mg/L</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Conductivity</div>
          <div className="text-3xl font-black text-purple-400 my-1">{data.conductivity}</div>
          <div className="text-[10px] text-slate-400">μS/cm</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">TDS</div>
          <div className="text-3xl font-black text-indigo-400 my-1">{data.tds}</div>
          <div className="text-[10px] text-slate-400">ppm</div>
        </div>
      </div>
    </div>
  );
};
