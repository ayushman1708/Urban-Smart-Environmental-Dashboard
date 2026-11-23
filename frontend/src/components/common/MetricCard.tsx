import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { KPIMetricData } from '../../types';

interface MetricCardProps {
  data: KPIMetricData;
  icon: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ data, icon }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'good':
      case 'optimal':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'moderate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'poor':
      case 'high':
      case 'attention':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'critical':
      case 'unhealthy':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="relative group bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {data.title}
        </span>
        <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 text-cyan-400 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline space-x-2 my-1">
        <span className="text-3xl font-extrabold tracking-tight text-slate-100">
          {data.value}
        </span>
        <span className="text-sm font-medium text-slate-400">{data.unit}</span>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(
            data.status
          )}`}
        >
          {data.status}
        </span>

        <div className="flex items-center space-x-1 text-xs text-slate-400">
          {data.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" />}
          {data.trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 text-emerald-400" />}
          {data.trend === 'stable' && <Minus className="w-3.5 h-3.5 text-slate-400" />}
          <span className={data.change_percentage >= 0 ? 'text-rose-400' : 'text-emerald-400'}>
            {data.change_percentage > 0 ? `+${data.change_percentage}%` : `${data.change_percentage}%`}
          </span>
        </div>
      </div>
    </div>
  );
};
