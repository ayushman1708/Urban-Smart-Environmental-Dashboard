import React from 'react';
import { Sun, Moon, Bell, Shield, User, Menu } from 'lucide-react';
import { User as UserType } from '../../types';
import { setTheme, getStoredTheme } from '../../utils/theme';

interface HeaderProps {
  user: UserType | null;
  toggleSidebar: () => void;
  onLogout: () => void;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, toggleSidebar, onLogout, onNavigate }) => {
  const [theme, setCurrTheme] = React.useState<'light' | 'dark'>(getStoredTheme());

  const handleThemeToggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setCurrTheme(next);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          title="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
            Urban Environmental Intelligence
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              ECE IoT Platform
            </span>
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">
            Real-time IoT Telemetry, Anomaly Detection & Decision Support System
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* System Health Status Indicator */}
        <button
          onClick={() => onNavigate('health')}
          className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>System Healthy</span>
        </button>

        {/* Dark/Light Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-slate-100 hover:bg-slate-700 transition"
          title="Toggle Dark / Light Mode"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Notifications Icon */}
        <button
          onClick={() => onNavigate('alerts')}
          className="relative p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-slate-100 hover:bg-slate-700 transition"
          title="View Alerts & Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
            4
          </span>
        </button>

        {/* User Account / Role Pill */}
        {user ? (
          <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-800 transition"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-xs">
                {user.full_name.charAt(0)}
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-xs font-semibold text-slate-200">{user.full_name}</div>
                <div className="text-[10px] text-cyan-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {user.role}
                </div>
              </div>
            </button>

            <button
              onClick={onLogout}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-2 py-1 rounded hover:bg-rose-500/10 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => onNavigate('login')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-600/20"
          >
            <User className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
