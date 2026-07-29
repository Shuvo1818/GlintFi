import React, { useState } from 'react';
import { Key, ShieldCheck, CheckCircle2, Lock, ArrowRight, UserCheck, X } from 'lucide-react';

interface MultiSigModalProps {
  isOpen: boolean;
  onClose: () => void;
  addToast?: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const MultiSigModal: React.FC<MultiSigModalProps> = ({ isOpen, onClose, addToast }) => {
  const [threshold] = useState<number>(2);
  const [signatures, setSignatures] = useState<Record<string, boolean>>({
    'Signer 1 (Protocol Custodian)': true,
    'Signer 2 (User Wallet)': false,
    'Signer 3 (Backup Guardian)': false,
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  if (!isOpen) return null;

  const currentSignatureCount = Object.values(signatures).filter(Boolean).length;

  const toggleSignature = (signerKey: string) => {
    setSignatures((prev) => ({
      ...prev,
      [signerKey]: !prev[signerKey],
    }));
  };

  const handleExecuteMultiSigTx = () => {
    if (currentSignatureCount < threshold) {
      if (addToast) addToast('Signature Threshold Not Met', `Required ${threshold} of 3 signatures to execute.`, 'warning');
      return;
    }

    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setIsApproved(true);
      if (addToast) addToast('Multi-Sig Approved', 'Multi-signature vault transaction approved & submitted to Stellar network.', 'success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Multi-Signature Vault Guard
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" /> Multi-Sig Protection
                </span>
              </h3>
              <p className="text-xs text-slate-400">Multi-party threshold approval logic (SEP-0001 compliant)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Threshold Meter */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">Approval Threshold Status:</span>
            <span className="font-mono text-indigo-400 font-bold">{currentSignatureCount} / 3 Signatures ({threshold} Required)</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                currentSignatureCount >= threshold
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-amber-500 to-indigo-500'
              }`}
              style={{ width: `${(currentSignatureCount / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Signer List */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Configured Vault Signers:</h4>
          {Object.entries(signatures).map(([signer, signed]) => (
            <div
              key={signer}
              onClick={() => toggleSignature(signer)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition cursor-pointer ${
                signed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className={`w-4 h-4 ${signed ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="text-xs font-medium">{signer}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {signed ? 'Signed' : 'Pending'}
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

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleExecuteMultiSigTx}
            disabled={isExecuting || currentSignatureCount < threshold}
            className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
              currentSignatureCount >= threshold
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-emerald-950/50'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            {isExecuting ? (
              <span>Executing Multi-Sig Envelope...</span>
            ) : isApproved ? (
              <span className="flex items-center gap-1.5 text-emerald-950">
                <ShieldCheck className="w-4 h-4" /> Multi-Sig Threshold Passed & Executed
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                Execute Multi-Sig Approval <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
