import React, { useEffect, useState } from 'react';
import { readingsService, SmartWasteTelemetry } from '../services/readings';
import { Trash2, RefreshCw, AlertTriangle, Truck, CheckCircle2 } from 'lucide-react';

export const SmartWastePage: React.FC = () => {
  const [data, setData] = useState<SmartWasteTelemetry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWaste = async () => {
    setLoading(true);
    try {
      const res = await readingsService.getSmartWaste();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaste();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-300">Fetching Smart Waste Telemetry...</p>
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
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Ultrasonic Sensors
            </span>
            <span className="text-xs text-slate-400">Waste Capacity Stream</span>
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Smart Waste Container Management</h2>
          <p className="text-xs text-slate-400">Container fill levels, overflow time forecasting, and dispatch collection alerts</p>
        </div>

        <button
          onClick={fetchWaste}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 text-xs font-bold transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Waste Telemetry</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Monitored Bins</div>
          <div className="text-3xl font-black text-slate-100 my-1">{data.total_bins}</div>
          <div className="text-[10px] text-slate-400">Provisioned Smart Nodes</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Near Capacity Bins</div>
          <div className="text-3xl font-black text-amber-400 my-1">{data.full_bins}</div>
          <div className="text-[10px] font-bold text-amber-400">&gt; 75% Capacity Limit</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Overflow Risks</div>
          <div className="text-3xl font-black text-rose-400 my-1">{data.overflow_risk}</div>
          <div className="text-[10px] text-rose-400 font-bold">Action Required</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Dispatch Trucks</div>
          <div className="text-3xl font-black text-cyan-400 my-1">{data.collection_required}</div>
          <div className="text-[10px] text-slate-400">Scheduled Routes</div>
        </div>
      </div>

      {/* Bin Capacity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.bins.map((bin) => (
          <div key={bin.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono font-bold text-slate-100 text-sm">{bin.id}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  bin.fill_level > 80
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : bin.fill_level > 60
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}
              >
                {bin.status}
              </span>
            </div>

            <div className="text-xs text-slate-400 mb-3">{bin.location}</div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-300">Fill Level</span>
                <span className={bin.fill_level > 80 ? 'text-rose-400' : 'text-emerald-400'}>
                  {bin.fill_level}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    bin.fill_level > 80 ? 'bg-rose-500' : bin.fill_level > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${bin.fill_level}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Forecast: {bin.prediction}</span>
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
