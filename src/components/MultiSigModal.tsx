import React, { useState } from 'react';
import { Key, ShieldCheck, CheckCircle2, Lock, ArrowRight, UserCheck, X, ShieldAlert, Zap } from 'lucide-react';

interface MultiSigModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMultiSigActive: boolean;
  setIsMultiSigActive: (active: boolean) => void;
  addToast?: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const MultiSigModal: React.FC<MultiSigModalProps> = ({
  isOpen,
  onClose,
  isMultiSigActive,
  setIsMultiSigActive,
  addToast,
}) => {
  const [threshold] = useState<number>(2);
  const [signatures, setSignatures] = useState<Record<string, boolean>>({
    'Signer 1 (Protocol Custodian)': true,
    'Signer 2 (User Wallet)': false,
    'Signer 3 (Backup Guardian)': false,
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const [executedTxHash, setExecutedTxHash] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentSignatureCount = Object.values(signatures).filter(Boolean).length;
  const isThresholdMet = currentSignatureCount >= threshold;

  const toggleSignature = (signerKey: string) => {
    setSignatures((prev) => ({
      ...prev,
      [signerKey]: !prev[signerKey],
    }));
  };

  const handleExecuteMultiSigTx = () => {
    if (!isThresholdMet) {
      if (addToast) addToast('Signature Threshold Deficit', `Requires ${threshold} of 3 signatures to execute. Currently has ${currentSignatureCount}.`, 'warning');
      return;
    }

    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      const fakeHash = `multisig_${Math.random().toString(36).substring(2, 12)}_${Date.now().toString(16)}`;
      setExecutedTxHash(fakeHash);
      if (addToast) addToast('Multi-Sig Transaction Approved ⚡', `Executed with ${currentSignatureCount} authorized signatures. Tx: ${fakeHash.slice(0, 16)}...`, 'success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-2xl flex items-center justify-center border transition-colors ${
              isMultiSigActive 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}>
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Multi-Signature Vault Guard
              </h3>
              <p className="text-xs text-slate-400">Multi-party threshold approval logic (Stellar SEP-0001 compliant)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Security Status & Toggle Card */}
        <div className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
          isMultiSigActive
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            : 'bg-slate-950/60 border-slate-800 text-slate-400'
        }`}>
          <div className="flex items-center gap-3">
            {isMultiSigActive ? (
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-slate-500 shrink-0" />
            )}
            <div>
              <div className="text-xs font-bold flex items-center gap-2">
                {isMultiSigActive ? 'PROTECTION ACTIVE (2-of-3 Multi-Sig)' : 'PROTECTION DISABLED (Single-Key Mode)'}
              </div>
              <p className="text-[11px] text-slate-400">
                {isMultiSigActive 
                  ? 'High-value vault withdrawals require at least 2 co-signers before execution.' 
                  : 'Multi-signature threshold checks are currently bypassed for standard single transactions.'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              const nextState = !isMultiSigActive;
              setIsMultiSigActive(nextState);
              if (addToast) addToast(
                nextState ? 'Multi-Sig Protection Activated 🛡️' : 'Multi-Sig Protection Deactivated',
                nextState ? 'Vault transactions now require 2-of-3 signatures.' : 'Switched to standard single-signature mode.',
                nextState ? 'success' : 'warning'
              );
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer border ${
              isMultiSigActive
                ? 'bg-amber-500 text-slate-950 border-amber-400 hover:bg-amber-400 shadow-md shadow-amber-950/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
          >
            {isMultiSigActive ? 'TURN OFF' : 'TURN ON'}
          </button>
        </div>

        {/* Threshold Meter */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">Live Threshold Meter:</span>
            <span className={`font-mono font-bold px-2 py-0.5 rounded border ${
              isThresholdMet 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
              {currentSignatureCount} / 3 Signatures ({isThresholdMet ? '✓ Threshold Met' : '⚠️ Need 2+ Signatures'})
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isThresholdMet
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-500'
              }`}
              style={{ width: `${(currentSignatureCount / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Signer List (Interactive Click to Sign) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <span>Configured Vault Signers:</span>
            <span className="text-[10px] text-slate-500 normal-case">(Click row to sign/unsign)</span>
          </div>
          {Object.entries(signatures).map(([signer, signed]) => (
            <div
              key={signer}
              onClick={() => toggleSignature(signer)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition cursor-pointer ${
                signed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className={`w-4 h-4 ${signed ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="text-xs font-medium">{signer}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  signed ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}>
                  {signed ? 'SIGNED ✓' : 'NOT SIGNED 🔒'}
                </span>
                {signed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button & Simulation Result */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleExecuteMultiSigTx}
            disabled={isExecuting || !isThresholdMet || !isMultiSigActive}
            className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
              isThresholdMet && isMultiSigActive
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-emerald-950/50'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            {isExecuting ? (
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 animate-bounce text-slate-950" /> Executing Multi-Sig Envelope...
              </span>
            ) : !isMultiSigActive ? (
              <span>Protection Disabled (Switch ON Above)</span>
            ) : isThresholdMet ? (
              <span className="flex items-center gap-1.5">
                Execute Multi-Sig Vault Transaction <ArrowRight className="w-4 h-4" />
              </span>
            ) : (
              <span>🔒 Threshold Deficit: Needs 2+ Signatures</span>
            )}
          </button>

          {executedTxHash && (
            <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center justify-between font-mono animate-fadeIn">
              <span>Verified Tx Hash: {executedTxHash.slice(0, 24)}...</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 rounded text-[10px] text-emerald-400 font-bold">200 OK</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
