import React from 'react';
import {
  LayoutDashboard,
  Wind,
  CloudSun,
  Droplet,
  Volume2,
  Trash2,
  Map,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Bot,
  Cpu,
  Radio,
  Database,
  Sliders,
  FileText,
  Activity,
  Settings as SettingsIcon,
  Zap,
} from 'lucide-react';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentRoute, onNavigate, isOpen }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'air-quality', label: 'Air Quality', icon: Wind },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'water-quality', label: 'Water Quality', icon: Droplet },
    { id: 'noise', label: 'Noise Monitoring', icon: Volume2 },
    { id: 'smart-waste', label: 'Smart Waste', icon: Trash2 },
    { id: 'live-map', label: 'Live City Map', icon: Map },
    { id: 'alerts', label: 'Alerts Management', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'predictions', label: 'Predictions', icon: TrendingUp },
    { id: 'ai-assistant', label: 'AI Environmental Assistant', icon: Bot },
    { id: 'sensors', label: 'Sensor Management', icon: Cpu },
    { id: 'iot-devices', label: 'IoT / Hardware Gateways', icon: Radio },
    { id: 'data-explorer', label: 'Data Explorer', icon: Database },
    { id: 'simulator', label: 'Hardware Simulator', icon: Sliders },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'health', label: 'System Health', icon: Activity },
  ];

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20 flex-shrink-0">
          <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        {isOpen && (
          <div>
            <div className="text-xs font-black tracking-tight text-white leading-tight">
              Urban Smart <span className="text-cyan-400">Environmental</span>
            </div>
            <div className="text-[10px] font-medium text-slate-400">IoT Decision System</div>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-500/5 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              title={item.label}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              {isOpen && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer / Demo Mode Badge */}
      {isOpen && (
        <div className="p-3 m-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
          <div className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Demo AI Mode Active
          </div>
          <div className="text-[10px] text-slate-400">ECE Hardware Integration Ready</div>
        </div>
      )}
    </aside>
  );
};
