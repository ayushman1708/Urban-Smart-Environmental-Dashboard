import React from 'react';
import { EnvironmentalStatus } from '../../types';
import { Wind, CloudSun, Droplet, Volume2, Trash2, ChevronRight } from 'lucide-react';

interface EnvironmentalStatusGridProps {
  items: EnvironmentalStatus[];
  onNavigate: (route: string) => void;
}

export const EnvironmentalStatusGrid: React.FC<EnvironmentalStatusGridProps> = ({ items, onNavigate }) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'air quality': return <Wind className="w-5 h-5 text-cyan-400" />;
      case 'weather': return <CloudSun className="w-5 h-5 text-amber-400" />;
      case 'water quality': return <Droplet className="w-5 h-5 text-blue-400" />;
      case 'noise': return <Volume2 className="w-5 h-5 text-purple-400" />;
      case 'smart waste': return <Trash2 className="w-5 h-5 text-emerald-400" />;
      default: return <Wind className="w-5 h-5 text-slate-400" />;
    }
  };

  const getCategoryRoute = (category: string) => {
    switch (category.toLowerCase()) {
      case 'air quality': return 'air-quality';
      case 'weather': return 'weather';
      case 'water quality': return 'water-quality';
      case 'noise': return 'noise';
      case 'smart waste': return 'smart-waste';
      default: return 'overview';
    }
  };

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'green':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'yellow':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'orange':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'red':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 tracking-tight">Environmental Status Breakdown</h3>
          <p className="text-xs text-slate-400">Multi-domain environmental telemetry across city zones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate(getCategoryRoute(item.category))}
            className="group cursor-pointer bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-500/40 rounded-xl p-4 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                {getCategoryIcon(item.category)}
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getHealthBadge(item.health_indicator)}`}>
                {item.status}
              </span>
            </div>

            <div className="text-xs font-bold text-slate-200 mb-1">{item.category}</div>
            <div className="text-xs text-slate-300 font-semibold mb-2">{item.latest_reading}</div>
            <div className="text-[11px] text-slate-400 leading-tight line-clamp-2">{item.trend_description}</div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>View Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
