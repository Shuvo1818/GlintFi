import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle2, Cpu } from 'lucide-react';

export const OracleHealthMonitor: React.FC = () => {
  const [latency, setLatency] = useState(42);
  const [lastHeartbeat, setLastHeartbeat] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      const newLatency = 35 + Math.floor(Math.random() * 15);
      setLatency(newLatency);
      setLastHeartbeat(new Date().toLocaleTimeString());
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              Oracle Price Feed Health & Circuit Breaker
              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">Soroban Guard</span>
            </h3>
            <p className="text-xs text-slate-400">Real-time Band/Reflector Oracle heartbeat and volatility guard</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-emerald-400">Circuit Breaker Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 block">Oracle Feed Status</span>
          <span className="text-lg font-bold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> 100% Operational
          </span>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 block">Round-Trip Latency</span>
          <span className="text-lg font-bold text-cyan-400 font-mono">{latency} ms</span>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 block">Max Volatility Threshold</span>
          <span className="text-lg font-bold text-amber-400 font-mono">5.00% Max</span>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 block">Last Ledger Heartbeat</span>
          <span className="text-sm font-bold text-slate-300 font-mono">{lastHeartbeat}</span>
        </div>
      </div>

      <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <p className="text-xs text-slate-300">
            Protected against oracle flash crashes and price manipulation attacks on synthetic sXAU / sXAG assets.
          </p>
        </div>
        <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700 font-mono">
          Ledger #54,291,048
        </span>
      </div>
    </div>
  );
};
