import React, { useState } from 'react';
import { RefreshCw, TrendingUp, Zap, ArrowRight } from 'lucide-react';

interface AutoCompoundVaultProps {
  userAddress: string;
  xlmBalance: number;
  addToast: (title: string, msg: string, type: 'success' | 'info' | 'warning') => void;
}

export const AutoCompoundVault: React.FC<AutoCompoundVaultProps> = ({ xlmBalance, addToast }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState<'alpha' | 'beta' | 'gamma'>('alpha');
  const [isCompounding, setIsCompounding] = useState(false);
  const [stakedBalance, setStakedBalance] = useState(450.0);
  const [earnedYield, setEarnedYield] = useState(18.45);

  const handleDeposit = () => {
    const val = parseFloat(depositAmount);
    if (!val || val <= 0) {
      addToast('Invalid Amount', 'Please enter a valid deposit amount.', 'warning');
      return;
    }
    if (val > xlmBalance) {
      addToast('Insufficient Balance', 'Deposit amount exceeds available XLM balance.', 'warning');
      return;
    }
    setIsCompounding(true);
    setTimeout(() => {
      setStakedBalance(prev => prev + val);
      setDepositAmount('');
      setIsCompounding(false);
      addToast('Auto-Vault Deposit Successful', `Deposited ${val} XLM into Auto-Compounding ${selectedStrategy.toUpperCase()} Strategy.`, 'success');
    }, 1200);
  };

  const handleClaim = () => {
    if (earnedYield <= 0) return;
    addToast('Yield Claimed', `Successfully claimed ${earnedYield.toFixed(2)} XLM auto-compounded yield!`, 'success');
    setEarnedYield(0);
  };

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              Auto-Compounding Soroban Vault Strategy
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">Level 7 Upgrade</span>
            </h3>
            <p className="text-xs text-slate-400">Automated yield reinvestment protocol powered by Soroban Smart Contracts</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Total Staked</span>
          <span className="text-lg font-bold text-amber-400">{stakedBalance.toFixed(2)} XLM</span>
        </div>
      </div>

      {/* Strategy Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setSelectedStrategy('alpha')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedStrategy === 'alpha'
              ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10'
              : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm">Alpha Yield Max</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">14.8% APY</span>
          </div>
          <p className="text-xs text-slate-400">Automated daily rebalancing across sXAU & sXAG pools.</p>
        </button>

        <button
          onClick={() => setSelectedStrategy('beta')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedStrategy === 'beta'
              ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10'
              : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm">Beta Stable Yield</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">11.2% APY</span>
          </div>
          <p className="text-xs text-slate-400">Low-risk USDC collateralized lending strategy.</p>
        </button>

        <button
          onClick={() => setSelectedStrategy('gamma')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedStrategy === 'gamma'
              ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10'
              : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm">Gamma Gold Guard</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">18.5% APY</span>
          </div>
          <p className="text-xs text-slate-400">High-yield synthetic precious metal arbitrage vault.</p>
        </button>
      </div>

      {/* Action Form */}
      <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-2/3 space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex justify-between">
            <span>Deposit Amount (XLM)</span>
            <span className="text-slate-400">Available: {xlmBalance.toFixed(2)} XLM</span>
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="0.00"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
            />
            <button
              onClick={() => setDepositAmount(xlmBalance.toString())}
              className="absolute right-2 top-2 text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 px-2 py-1 rounded"
            >
              MAX
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col justify-end h-full">
          <button
            onClick={handleDeposit}
            disabled={isCompounding}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-bold py-2.5 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {isCompounding ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Deposit & Compound</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Yield Claim Bar */}
      <div className="flex items-center justify-between p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-xs text-slate-400 block">Pending Reinvested Yield</span>
            <span className="text-base font-bold text-emerald-400">+{earnedYield.toFixed(2)} XLM</span>
          </div>
        </div>
        <button
          onClick={handleClaim}
          disabled={earnedYield <= 0}
          className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-40"
        >
          Harvest Yield
        </button>
      </div>
    </div>
  );
};
