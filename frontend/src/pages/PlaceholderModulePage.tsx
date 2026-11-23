import React from 'react';
import { Layers, ArrowRight, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';

interface PlaceholderModulePageProps {
  title: string;
  description: string;
  phaseTag: string;
  onNavigate: (route: string) => void;
}

export const PlaceholderModulePage: React.FC<PlaceholderModulePageProps> = ({
  title,
  description,
  phaseTag,
  onNavigate,
}) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="flex items-center space-x-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            {phaseTag}
          </span>
          <span className="text-xs text-slate-400">Phase 1 Foundation Active</span>
        </div>

        <h2 className="text-3xl font-black text-slate-100 tracking-tight mb-2">{title}</h2>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed mb-8">{description}</p>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 mb-8">
          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
            Module Blueprint & Capabilities
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Full REST API Data Ingestion Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Relational Database Schema Provisioned</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Real-Time WebSocket Stream Compatible</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>ESP32 Hardware Payload Ready</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => onNavigate('overview')}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition flex items-center space-x-2"
          >
            <span>Return to Executive Overview</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
