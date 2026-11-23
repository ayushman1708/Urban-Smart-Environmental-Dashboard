import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Bot,
  Activity,
  ArrowRight,
  Zap,
  Globe,
  Radio,
  CheckCircle2,
  Lock,
  LineChart,
} from 'lucide-react';

interface LandingPageProps {
  onOpenDashboard: () => void;
  onNavigate: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenDashboard, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="text-sm font-black tracking-tight text-slate-100 flex items-center gap-1.5">
              Urban Smart <span className="text-cyan-400">Environmental Dashboard</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-400">ECE Hardware + Software IoT Platform</div>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-300">
          <a href="#problem" className="hover:text-cyan-400 transition">Problem Statement</a>
          <a href="#architecture" className="hover:text-cyan-400 transition">IoT Architecture</a>
          <a href="#features" className="hover:text-cyan-400 transition">Platform Features</a>
          <a href="#ece" className="hover:text-cyan-400 transition">ECE Project Context</a>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('login')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700"
          >
            Sign In
          </button>
          <button
            onClick={onOpenDashboard}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-cyan-500/20 flex items-center space-x-1.5"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-6">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Next-Gen Smart City Environmental Intelligence</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-100 max-w-4xl leading-tight mb-6">
          Monitor. Understand. Predict. <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">Act.</span>
        </h1>

        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
          A full-stack hardware + software environmental monitoring system that processes real-time sensor streams, executes automated threshold rules, and delivers AI decision support for modern smart cities.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onOpenDashboard}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-sm transition shadow-xl shadow-cyan-500/25 flex items-center justify-center space-x-2"
          >
            <span>Open Monitoring Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#architecture"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-sm transition flex items-center justify-center space-x-2"
          >
            <span>View System Architecture</span>
          </a>
        </div>
      </section>

      {/* Visual Data Flow Diagram */}
      <section id="architecture" className="px-6 py-12 max-w-6xl mx-auto w-full">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Data Acquisition Pipeline</span>
            <h3 className="text-xl font-bold text-slate-100 mt-1">End-to-End IoT & AI Architecture</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center relative group">
              <Cpu className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-200">1. Hardware Sensors</div>
              <div className="text-[10px] text-slate-400 mt-1">PM2.5, MQ135, DHT22, pH, Ultrasonic</div>
            </div>

            <div className="hidden md:flex justify-center text-cyan-400">→</div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center relative group">
              <Radio className="w-8 h-8 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-200">2. ESP32 Gateway</div>
              <div className="text-[10px] text-slate-400 mt-1">Wi-Fi / HTTP / MQTT Protocol</div>
            </div>

            <div className="hidden md:flex justify-center text-emerald-400">→</div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center relative group">
              <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-200">3. Backend & DB</div>
              <div className="text-[10px] text-slate-400 mt-1">FastAPI + SQLAlchemy + SQLite/PG</div>
            </div>

            <div className="hidden md:flex justify-center text-blue-400">→</div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center relative group">
              <Bot className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-200">4. Rule & AI Engine</div>
              <div className="text-[10px] text-slate-400 mt-1">Anomaly Detection & Gemini LLM</div>
            </div>

            <div className="hidden md:flex justify-center text-purple-400">→</div>

            {/* Step 5 */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center relative group">
              <Activity className="w-8 h-8 text-rose-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-200">5. Real-Time UI</div>
              <div className="text-[10px] text-slate-400 mt-1">Interactive React Dashboard</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section id="problem" className="px-6 py-16 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
          <div className="inline-flex p-3 rounded-2xl bg-rose-500/10 text-rose-400 mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-3">The Problem</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Urban environmental metrics are often fragmented across disparate monitoring networks. Municipalities and citizens lack a unified platform to identify localized pollution spikes, correlate weather patterns with air quality, evaluate decibel noise levels, and receive proactive, automated recommendations.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-3">The Smart Dashboard Solution</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            The platform unifies multi-sensor telemetry into a single, high-performance dashboard. It automatically processes sensor feeds, evaluates configured warning thresholds, triggers alerts, runs LLM-driven anomaly explanations, and provides actionable decision support for city authorities.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 px-6 py-8 text-center text-xs text-slate-500">
        <div>Urban Smart Environmental Monitoring & AI Decision Support System</div>
        <div className="mt-1">ECE Final Year Project Demonstration Platform • Built with React, TypeScript & FastAPI</div>
      </footer>
    </div>
  );
};
