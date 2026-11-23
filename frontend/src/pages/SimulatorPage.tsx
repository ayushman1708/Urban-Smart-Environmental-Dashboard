import React, { useState } from 'react';
import { simulatorService, SimulatorResponse } from '../services/simulator';
import { Sliders, Zap, AlertTriangle, CheckCircle2, RefreshCw, Radio, Flame, Cpu, Trash2 } from 'lucide-react';

interface SimulatorPageProps {
  onNavigate: (route: string) => void;
}

export const SimulatorPage: React.FC<SimulatorPageProps> = ({ onNavigate }) => {
  const [selectedZone, setSelectedZone] = useState('Zone B');
  const [pm25, setPm25] = useState(42);
  const [pm10, setPm10] = useState(76);
  const [temp, setTemp] = useState(29);
  const [humidity, setHumidity] = useState(62);
  const [noise, setNoise] = useState(68);
  const [ph, setPh] = useState(7.3);
  const [waste, setWaste] = useState(65);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulatorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrigger = async (type: 'pollution_spike' | 'sensor_failure' | 'waste_overflow' | 'reset_baseline') => {
    setLoading(true);
    setError(null);
    try {
      const res = await simulatorService.triggerSimulation({
        zone_code: selectedZone,
        anomaly_type: type,
        pm25,
        pm10,
        temperature: temp,
        humidity,
        noise_db: noise,
        ph,
        waste_fill_percent: waste,
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Simulation trigger failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              ECE Project Demonstration Panel
            </span>
            <span className="text-xs text-slate-400">Hardware Telemetry Injector</span>
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">IoT Sensor Hardware Simulator</h2>
          <p className="text-xs text-slate-400">Inject real-time sensor packets, trigger environmental anomalies, and evaluate threshold rule alerts</p>
        </div>

        <button
          onClick={() => onNavigate('overview')}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition"
        >
          View Dashboard Result →
        </button>
      </div>

      {/* Simulator Response Banner */}
      {result && (
        <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Simulation Event Processed</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                    {result.location_name}
                  </span>
                </div>
                <p className="text-xs text-slate-200 mt-1 font-medium">{result.message}</p>
                {result.alert_created && (
                  <div className="mt-2 text-xs font-bold text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Rule Engine Action: {result.alert_created}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => onNavigate('overview')}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition"
            >
              Verify KPIs
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold text-center">
          {error}
        </div>
      )}

      {/* Quick Action Demonstration Triggers */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          Viva Demonstration Event Triggers (1-Click Execution)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            disabled={loading}
            onClick={() => handleTrigger('pollution_spike')}
            className="group p-4 rounded-2xl bg-slate-800/80 hover:bg-rose-500/10 border border-slate-700/80 hover:border-rose-500/40 text-left transition"
          >
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 w-fit mb-3 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-100 mb-1">1. Pollution Spike</div>
            <div className="text-[11px] text-slate-400 leading-tight">
              Injects PM2.5 = 178.5 μg/m³ into Zone B. Triggers CRITICAL alert & anomaly highlight.
            </div>
          </button>

          <button
            disabled={loading}
            onClick={() => handleTrigger('sensor_failure')}
            className="group p-4 rounded-2xl bg-slate-800/80 hover:bg-amber-500/10 border border-slate-700/80 hover:border-amber-500/40 text-left transition"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-3 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-100 mb-1">2. Sensor Failure</div>
            <div className="text-[11px] text-slate-400 leading-tight">
              Simulates node telemetry timeout. Sets status to Offline and triggers node alert.
            </div>
          </button>

          <button
            disabled={loading}
            onClick={() => handleTrigger('waste_overflow')}
            className="group p-4 rounded-2xl bg-slate-800/80 hover:bg-purple-500/10 border border-slate-700/80 hover:border-purple-500/40 text-left transition"
          >
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-3 group-hover:scale-110 transition-transform">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-100 mb-1">3. Waste Overflow</div>
            <div className="text-[11px] text-slate-400 leading-tight">
              Injects ultrasonic bin fill = 94.5%. Triggers HIGH capacity overflow risk alert.
            </div>
          </button>

          <button
            disabled={loading}
            onClick={() => handleTrigger('reset_baseline')}
            className="group p-4 rounded-2xl bg-slate-800/80 hover:bg-emerald-500/10 border border-slate-700/80 hover:border-emerald-500/40 text-left transition"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-3 group-hover:scale-110 transition-transform">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-100 mb-1">4. Reset Baseline</div>
            <div className="text-[11px] text-slate-400 leading-tight">
              Resets telemetry back to normal optimal levels across all 5 monitoring zones.
            </div>
          </button>
        </div>
      </div>

      {/* Manual Sliders Custom Telemetry Injector */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Manual Telemetry Payload Injector</h3>
            <p className="text-xs text-slate-400">Configure exact numerical parameter values</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-semibold">Target Zone:</span>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-1.5 font-bold focus:outline-none"
            >
              <option value="Zone A">Zone A - Downtown Commercial</option>
              <option value="Zone B">Zone B - Industrial Hub</option>
              <option value="Zone C">Zone C - Residential Suburbs</option>
              <option value="Zone D">Zone D - Eco Green Park</option>
              <option value="Zone E">Zone E - Expressway Corridor</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* PM2.5 */}
          <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
            <div className="flex justify-between font-bold mb-2">
              <span className="text-slate-300">PM2.5 Concentration</span>
              <span className="text-rose-400 font-mono">{pm25} μg/m³</span>
            </div>
            <input
              type="range"
              min="5"
              max="300"
              value={pm25}
              onChange={(e) => setPm25(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          {/* PM10 */}
          <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
            <div className="flex justify-between font-bold mb-2">
              <span className="text-slate-300">PM10 Concentration</span>
              <span className="text-amber-400 font-mono">{pm10} μg/m³</span>
            </div>
            <input
              type="range"
              min="10"
              max="400"
              value={pm10}
              onChange={(e) => setPm10(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Temperature */}
          <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
            <div className="flex justify-between font-bold mb-2">
              <span className="text-slate-300">Temperature</span>
              <span className="text-amber-400 font-mono">{temp} °C</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Humidity */}
          <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
            <div className="flex justify-between font-bold mb-2">
              <span className="text-slate-300">Relative Humidity</span>
              <span className="text-cyan-400 font-mono">{humidity} %</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* Noise */}
          <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
            <div className="flex justify-between font-bold mb-2">
              <span className="text-slate-300">Noise Decibels</span>
              <span className="text-purple-400 font-mono">{noise} dB</span>
            </div>
            <input
              type="range"
              min="40"
              max="110"
              value={noise}
              onChange={(e) => setNoise(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          {/* Waste Fill */}
          <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
            <div className="flex justify-between font-bold mb-2">
              <span className="text-slate-300">Waste Bin Fill Capacity</span>
              <span className="text-emerald-400 font-mono">{waste} %</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={waste}
              onChange={(e) => setWaste(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        <button
          disabled={loading}
          onClick={() => handleTrigger('pollution_spike')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs transition shadow-xl shadow-cyan-500/20 flex items-center justify-center space-x-2"
        >
          <Radio className="w-4 h-4" />
          <span>{loading ? 'Transmitting Packet to Gateway...' : 'Transmit Custom Telemetry Packet to Database'}</span>
        </button>
      </div>
    </div>
  );
};
