import React from 'react';
import { Calendar, MapPin, SlidersHorizontal, RefreshCw } from 'lucide-react';

interface FilterBarProps {
  onRefresh?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onRefresh }) => {
  const [selectedZone, setSelectedZone] = React.useState('all');
  const [selectedPeriod, setSelectedPeriod] = React.useState('24h');
  const [selectedParam, setSelectedParam] = React.useState('all');

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-md">
      <div className="flex flex-wrap items-center gap-3">
        {/* Zone Selector */}
        <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-400">Zone:</span>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-slate-900">All Monitoring Zones (5)</option>
            <option value="Zone A" className="bg-slate-900">Zone A - Downtown Commercial</option>
            <option value="Zone B" className="bg-slate-900">Zone B - Industrial Hub</option>
            <option value="Zone C" className="bg-slate-900">Zone C - Residential Suburbs</option>
            <option value="Zone D" className="bg-slate-900">Zone D - Eco Green Park</option>
            <option value="Zone E" className="bg-slate-900">Zone E - Expressway Corridor</option>
          </select>
        </div>

        {/* Time Period Selector */}
        <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-400">Period:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="24h" className="bg-slate-900">Last 24 Hours</option>
            <option value="7d" className="bg-slate-900">Last 7 Days</option>
            <option value="30d" className="bg-slate-900">Last 30 Days</option>
            <option value="custom" className="bg-slate-900">Custom Date Range</option>
          </select>
        </div>

        {/* Parameter Selector */}
        <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-300">
          <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-400">Parameter:</span>
          <select
            value={selectedParam}
            onChange={(e) => setSelectedParam(e.target.value)}
            className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-slate-900">All Parameters</option>
            <option value="AQI" className="bg-slate-900">AQI Index</option>
            <option value="PM2.5" className="bg-slate-900">PM2.5 Particulate</option>
            <option value="PM10" className="bg-slate-900">PM10 Particulate</option>
            <option value="Temperature" className="bg-slate-900">Temperature & Humidity</option>
            <option value="Noise" className="bg-slate-900">Decibel Noise</option>
            <option value="Water" className="bg-slate-900">pH & Water Quality</option>
            <option value="Waste" className="bg-slate-900">Smart Waste Fill %</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-600/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold hover:bg-cyan-600/20 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Live Telemetry</span>
          </button>
        )}
      </div>
    </div>
  );
};
