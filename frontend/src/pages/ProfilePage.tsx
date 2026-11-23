import React from 'react';
import { User } from '../types';
import { Shield, Mail, Calendar, Key, CheckCircle } from 'lucide-react';

interface ProfilePageProps {
  user: User | null;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="p-6 text-center text-slate-400">
        No active user session. Please sign in.
      </div>
    );
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Authority':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'Researcher':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl mb-6">
        <div className="flex items-center space-x-5 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-1 shadow-xl shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center font-black text-2xl text-cyan-400">
              {user.full_name.charAt(0)}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-100">{user.full_name}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getRoleBadge(user.role)}`}>
                <Shield className="w-3 h-3 mr-1" />
                {user.role} Role
              </span>
              <span className="text-xs text-slate-400">• System User</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Account Details</div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-[10px] text-slate-400">Email Address</div>
                  <div className="text-xs font-bold text-slate-200">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-[10px] text-slate-400">Registered On</div>
                  <div className="text-xs font-bold text-slate-200">{new Date(user.created_at).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-[10px] text-slate-400">Account Status</div>
                  <div className="text-xs font-bold text-emerald-400">Active & Verified</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Role Capabilities</div>
            
            <ul className="space-y-2 text-xs text-slate-300">
              {user.role === 'Admin' && (
                <>
                  <li className="flex items-center gap-2">✓ Manage IoT Sensors & Hardware Gateways</li>
                  <li className="flex items-center gap-2">✓ Modify Threshold Rule Engine Limits</li>
                  <li className="flex items-center gap-2">✓ Manage Users & System Configuration</li>
                  <li className="flex items-center gap-2">✓ Full Infrastructure Health Monitoring</li>
                </>
              )}
              {user.role === 'Authority' && (
                <>
                  <li className="flex items-center gap-2">✓ Monitor Pollution & Critical Alerts</li>
                  <li className="flex items-center gap-2">✓ Generate & Download Environmental Reports</li>
                  <li className="flex items-center gap-2">✓ Access AI Recommendations</li>
                </>
              )}
              {user.role === 'Researcher' && (
                <>
                  <li className="flex items-center gap-2">✓ View Historical Telemetry Datasets</li>
                  <li className="flex items-center gap-2">✓ Analyze Multi-Zone Parameter Correlations</li>
                  <li className="flex items-center gap-2">✓ Export Raw Sensor Readings (CSV/JSON)</li>
                </>
              )}
              {user.role === 'Citizen' && (
                <>
                  <li className="flex items-center gap-2">✓ View Real-Time AQI & Weather Indices</li>
                  <li className="flex items-center gap-2">✓ Interact with EcoSense AI Chatbot</li>
                  <li className="flex items-center gap-2">✓ Receive Public Health Warnings</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
