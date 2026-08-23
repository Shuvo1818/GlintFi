import React, { useState } from 'react';
import { Zap, ArrowRightLeft, RefreshCw } from 'lucide-react';

export const FlashLoanAggregator: React.FC<{
  addToast: (t: string, m: string, tp: 'success' | 'info' | 'warning') => void;
}> = ({ addToast }) => {
  const [borrowAsset, setBorrowAsset] = useState<'USDC' | 'XLM' | 'sXAU'>('USDC');
  const [loanAmount, setLoanAmount] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = () => {
    const amt = parseFloat(loanAmount);
    if (!amt || amt <= 0) {
      addToast('Invalid Loan Amount', 'Please enter a valid flash loan quantity.', 'warning');
      return;
    }
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setLoanAmount('');
      addToast('Flash Loan Executed', `Successfully executed single-ledger Soroban flash loan of ${amt} ${borrowAsset}. Fee: 0.05%`, 'success');
    }, 1500);
  };

  return (
    <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
            <ArrowRightLeft className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              Soroban Flash Loan Liquidity Engine
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">Zero Collateral</span>
            </h3>
            <p className="text-xs text-slate-400">Single-transaction uncollateralized liquidity for arbitrage and rebalancing</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Available Pool</span>
          <span className="text-lg font-bold text-blue-400 font-mono">1,500,000 USDC</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Select Borrow Asset</label>
          <div className="grid grid-cols-3 gap-2">
            {(['USDC', 'XLM', 'sXAU'] as const).map(asset => (
              <button
                key={asset}
                onClick={() => setBorrowAsset(asset)}
                className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                  borrowAsset === asset
                    ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {asset}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Loan Amount ({borrowAsset})</label>
          <input
            type="number"
            placeholder="e.g. 5000"
            value={loanAmount}
            onChange={e => setLoanAmount(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono text-slate-400">
        <div className="flex justify-between">
          <span>Flash Loan Premium Fee:</span>
          <span className="text-emerald-400 font-bold">0.05%</span>
        </div>
        <div className="flex justify-between">
          <span>Atomic Execution Guarantee:</span>
          <span className="text-blue-400 font-bold">Soroban Single-Host Invocation</span>
        </div>
      </div>

      <button
        onClick={handleExecute}
        disabled={isExecuting}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
      >
        {isExecuting ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Zap className="w-4 h-4 text-yellow-300" />
            <span>Execute Atomic Flash Loan</span>
          </>
        )}
      </button>
    </div>
  );
};
