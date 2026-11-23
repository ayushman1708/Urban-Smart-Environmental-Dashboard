import React, { useEffect, useState } from 'react';
import { HealthStatus } from '../types';
import { apiService } from '../services/api';
import { Activity, Server, Database, Bot, Radio, Cpu, RefreshCw, CheckCircle2, Zap } from 'lucide-react';

export const SystemHealthPage: React.FC = () => {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const data = await apiService.getHealthStatus();
      setHealth(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-300">Checking System Infrastructure Health...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Technical Infrastructure
            </span>
            <span className="text-xs text-slate-400">Engineering Diagnostic View</span>
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">System Health & Services</h2>
          <p className="text-xs text-slate-400">Live operational status of backend services, database, IoT gateway, and AI engine</p>
        </div>

        <button
          onClick={fetchHealth}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 text-xs font-bold transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Diagnostics</span>
        </button>
      </div>

      {health && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Backend */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <Server className="w-5 h-5 text-cyan-400" />
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {health.backend}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-300">FastAPI REST Server</div>
            <div className="text-[11px] text-slate-400 mt-1">Response Time: {health.api_response_time_ms} ms</div>
          </div>

          {/* Database */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <Database className="w-5 h-5 text-emerald-400" />
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {health.database}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-300">SQLAlchemy Relational DB</div>
            <div className="text-[11px] text-slate-400 mt-1">SQLite / PostgreSQL Support</div>
          </div>

          {/* AI Service */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <Bot className="w-5 h-5 text-amber-400" />
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Demo AI Mode
              </span>
            </div>
            <div className="text-xs font-bold text-slate-300">Gemini LLM Service</div>
            <div className="text-[11px] text-slate-400 mt-1">Deterministic Fallback Active</div>
          </div>

          {/* IoT Gateway */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <Radio className="w-5 h-5 text-purple-400" />
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                {health.iot_gateway}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-300">ESP32 REST Gateway</div>
            <div className="text-[11px] text-slate-400 mt-1">Last Data: {health.last_sensor_update}</div>
          </div>
        </div>
      )}

      {/* Sensor Mesh Diagnostic Breakdown */}
      {health && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Sensor Mesh Network Diagnostic Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-slate-100">{health.total_sensors}</div>
              <div className="text-xs text-slate-400 mt-1">Total Provisioned Sensors</div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-emerald-400">{health.online_sensors}</div>
              <div className="text-xs text-slate-400 mt-1">Online & Transmitting</div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-rose-400">{health.offline_sensors}</div>
              <div className="text-xs text-slate-400 mt-1">Maintenance / Offline</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
