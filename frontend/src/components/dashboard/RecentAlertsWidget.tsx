import React from 'react';
import { RecentAlert } from '../../types';
import { AlertTriangle, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';

interface RecentAlertsWidgetProps {
  alerts: RecentAlert[];
  onNavigate: (route: string) => void;
}

export const RecentAlertsWidget: React.FC<RecentAlertsWidgetProps> = ({ alerts, onNavigate }) => {
  const getSeverityBadge = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'HIGH':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'MEDIUM':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'LOW':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 tracking-tight">Active Environmental Alerts</h3>
            <p className="text-xs text-slate-400">Threshold rule evaluation & real-time notifications</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('alerts')}
          className="flex items-center space-x-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
        >
          <span>View All Alerts</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
              <th className="py-3 px-3">Alert ID</th>
              <th className="py-3 px-3">Location</th>
              <th className="py-3 px-3">Parameter</th>
              <th className="py-3 px-3">Reading vs Limit</th>
              <th className="py-3 px-3">Severity</th>
              <th className="py-3 px-3">Time</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {alerts.map((a) => (
              <tr key={a.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-3 font-mono font-bold text-slate-300">{a.alert_code}</td>
                <td className="py-3 px-3 font-semibold text-slate-200">{a.zone_name}</td>
                <td className="py-3 px-3 font-semibold text-cyan-400">{a.parameter}</td>
                <td className="py-3 px-3 text-slate-300">
                  <span className="font-bold text-rose-400">{a.current_value}</span> / {a.threshold_value}
                </td>
                <td className="py-3 px-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityBadge(a.severity)}`}>
                    {a.severity}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-400">{a.timestamp}</td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => onNavigate('alerts')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-cyan-400 font-semibold transition"
                  >
                    Investigate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
