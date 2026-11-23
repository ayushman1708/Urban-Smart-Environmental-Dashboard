import React, { useState } from 'react';
import { Shield, Zap, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { authService } from '../services/auth';
import { User } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onNavigateRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateRegister }) => {
  const [email, setEmail] = useState('admin@ecosense.org');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await authService.login(email, password);
      onLoginSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const setPersona = (pEmail: string, pPass: string) => {
    setEmail(pEmail);
    setPassword(pPass);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5 mx-auto mb-3 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Urban Smart Environmental Dashboard</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in to access your role-based environmental portal</p>
        </div>

        {/* Viva Quick Persona Switch Buttons */}
        <div className="mb-6 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3">
          <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" />
            Viva / Demo Persona Shortcuts
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setPersona('admin@ecosense.org', 'admin123')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 text-left transition"
            >
              <div className="font-bold text-slate-200">Admin</div>
              <div className="text-[10px] text-slate-400">Full System Control</div>
            </button>
            <button
              onClick={() => setPersona('authority@ecosense.org', 'authority123')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 text-left transition"
            >
              <div className="font-bold text-slate-200">Authority</div>
              <div className="text-[10px] text-slate-400">Alerts & Reports</div>
            </button>
            <button
              onClick={() => setPersona('researcher@ecosense.org', 'research123')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 text-left transition"
            >
              <div className="font-bold text-slate-200">Researcher</div>
              <div className="text-[10px] text-slate-400">Historical Datasets</div>
            </button>
            <button
              onClick={() => setPersona('citizen@ecosense.org', 'citizen123')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 text-left transition"
            >
              <div className="font-bold text-slate-200">Citizen</div>
              <div className="text-[10px] text-slate-400">Public AQI & AI</div>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs transition shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <button onClick={onNavigateRegister} className="text-cyan-400 font-bold hover:underline">
            Register Account
          </button>
        </div>
      </div>
    </div>
  );
};
