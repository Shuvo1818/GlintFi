import React, { useState } from 'react';
import { Sparkles, Coins, ArrowRight, CheckCircle2, Wallet, Layers, Gift } from 'lucide-react';

interface OnboardingGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectWallet: () => void;
}

export const OnboardingGuide: React.FC<OnboardingGuideProps> = ({
  isOpen,
  onClose,
  onConnectWallet
}) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 relative overflow-hidden">
        
        {/* Top Glow Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header progress */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-slate-100">
              Welcome to GlintFi
            </h3>
          </div>
          
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step ? 'w-6 bg-indigo-500' : s < step ? 'w-2 bg-emerald-500' : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Welcome & Overview */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 via-slate-900 to-amber-500/10 border border-indigo-500/20 space-y-2">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Step 1 of 3</span>
              <h4 className="text-lg font-bold text-slate-100">Decentralized Precious Metals & Automated Micro-Savings</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                GlintFi allows you to invest in fractional synthetic Gold (<strong className="text-amber-400">sXAU</strong>) & Silver (<strong className="text-slate-200">sXAG</strong>), earn automated yield on Stellar Testnet through <strong className="text-indigo-400">Gullak SIP Vaults</strong>, and send zero-fee micro-gifts.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-1">
                <Coins className="w-5 h-5 text-amber-400 mx-auto" />
                <div className="text-xs font-bold text-slate-200">sXAU & sXAG</div>
                <div className="text-[10px] text-slate-400">Fractional Metal</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-1">
                <Layers className="w-5 h-5 text-indigo-400 mx-auto" />
                <div className="text-xs font-bold text-slate-200">Gullak SIP</div>
                <div className="text-[10px] text-slate-400">Soroban Yield</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-1">
                <Gift className="w-5 h-5 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-slate-200">Micro-Gift</div>
                <div className="text-[10px] text-slate-400">P2P Metals</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Wallet Setup */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Step 2 of 3</span>
              <h4 className="text-lg font-bold text-slate-100">Connect Your Wallet & Get Testnet XLM</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect using <strong className="text-indigo-400">Freighter Extension</strong> or <strong className="text-amber-400">Albedo Wallet</strong>. If you are on Testnet, you can easily fund your wallet with free Testnet XLM from the Stellar Friendbot.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wallet className="w-6 h-6 text-indigo-400" />
                <div>
                  <div className="text-xs font-bold text-slate-100">Freighter / Albedo Wallet</div>
                  <div className="text-[10px] text-slate-400">Sign Soroban transactions securely</div>
                </div>
              </div>
              <button
                onClick={onConnectWallet}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-xs font-semibold cursor-pointer transition shadow-md"
              >
                Connect Now
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Start Savings */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Step 3 of 3</span>
              <h4 className="text-lg font-bold text-slate-100">Ready to Start Micro-Saving & Trading!</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                You're all set to explore GlintFi. Execute live DEX swaps, lock XLM collateral for instant USDC loans, or deposit into the Soroban Gullak Vault.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live DEX Swap rates updated automatically</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Soroban Smart Contract vault auto-compounding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real-time System Telemetry monitoring</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
            >
              Back
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-medium transition cursor-pointer"
            >
              Skip Tour
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-xs font-bold transition shadow-lg cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-100 text-xs font-bold transition shadow-lg cursor-pointer"
            >
              <span>Get Started</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
