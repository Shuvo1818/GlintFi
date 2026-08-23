import React, { useState } from 'react';
import { Vote, CheckCircle2 } from 'lucide-react';

interface Proposal {
  id: number;
  title: string;
  category: string;
  votesFor: number;
  votesAgainst: number;
  status: 'ACTIVE' | 'PASSED' | 'EXECUTED';
  userVoted?: 'FOR' | 'AGAINST';
}

export const GovernancePortal: React.FC<{ addToast: (t: string, m: string, tp: 'success' | 'info' | 'warning') => void }> = ({ addToast }) => {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: 'GIP-01: Increase Gullak Vault APY Multiplier for sXAU Stakers',
      category: 'Protocol Yield',
      votesFor: 124000,
      votesAgainst: 12000,
      status: 'ACTIVE'
    },
    {
      id: 2,
      title: 'GIP-02: Lower USDC Collateral Loan Liquidation Threshold to 115%',
      category: 'Risk Parameter',
      votesFor: 98000,
      votesAgainst: 45000,
      status: 'ACTIVE'
    },
    {
      id: 3,
      title: 'GIP-03: Integrate Synthetic Platinum (sXPT) Metals Vault',
      category: 'Asset Expansion',
      votesFor: 210000,
      votesAgainst: 5000,
      status: 'PASSED'
    }
  ]);

  const handleVote = (id: number, type: 'FOR' | 'AGAINST') => {
    setProposals(prev =>
      prev.map(p => {
        if (p.id === id) {
          if (p.userVoted) return p;
          const forAdd = type === 'FOR' ? 1000 : 0;
          const againstAdd = type === 'AGAINST' ? 1000 : 0;
          return {
            ...p,
            votesFor: p.votesFor + forAdd,
            votesAgainst: p.votesAgainst + againstAdd,
            userVoted: type
          };
        }
        return p;
      })
    );
    addToast('Vote Cast', `Voted ${type} on Proposal #${id} with 1,000 GLINT voting weight.`, 'success');
  };

  return (
    <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
            <Vote className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              On-Chain Soroban Governance Portal
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">Level 7 DAO</span>
            </h3>
            <p className="text-xs text-slate-400">Decentralized parameter voting and protocol upgrade execution</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Voting Power</span>
          <span className="text-lg font-bold text-purple-400 font-mono">1,000 GLINT</span>
        </div>
      </div>

      <div className="space-y-4">
        {proposals.map(p => {
          const total = p.votesFor + p.votesAgainst;
          const forPct = total > 0 ? Math.round((p.votesFor / total) * 100) : 50;

          return (
            <div key={p.id} className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded font-medium border border-purple-500/30">
                  {p.category}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded font-bold ${
                  p.status === 'ACTIVE' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {p.status}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-200">{p.title}</h4>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>For: {p.votesFor.toLocaleString()} ({forPct}%)</span>
                  <span>Against: {p.votesAgainst.toLocaleString()} ({100 - forPct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500" style={{ width: `${forPct}%` }}></div>
                  <div className="h-full bg-rose-500" style={{ width: `${100 - forPct}%` }}></div>
                </div>
              </div>

              {/* Voting Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                {p.userVoted ? (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Voted {p.userVoted}
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleVote(p.id, 'FOR')}
                      className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs px-4 py-2 rounded-lg font-bold transition-all"
                    >
                      Vote For
                    </button>
                    <button
                      onClick={() => handleVote(p.id, 'AGAINST')}
                      className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs px-4 py-2 rounded-lg font-bold transition-all"
                    >
                      Vote Against
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
