import React, { useState } from 'react';
import { Wallet, X, ExternalLink, Copy } from 'lucide-react';
import { checkFreighterConnection, getFreighterAddress, connectAlbedoWallet } from './wallet';

interface ConnectWalletProps {
  walletConnected: boolean;
  stellarAddress: string;
  onConnect: (address: string, type: 'freighter' | 'albedo' | 'manual') => void;
  onDisconnect: () => void;
  addToast: (title: string, message: string, type: 'success' | 'warning' | 'info') => void;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({
  walletConnected,
  stellarAddress,
  onConnect,
  onDisconnect,
  addToast,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [manualAddressInput, setManualAddressInput] = useState('');

  // freighter wallet connection handler
  const handleConnectFreighter = async () => {
    try {
      const active = await checkFreighterConnection();
      if (!active) {
        addToast('Freighter Not Found', 'Please install the Freighter browser extension.', 'warning');
        return;
      }

      const address = await getFreighterAddress();
      if (address) {
        onConnect(address, 'freighter');
        addToast('Wallet Connected', 'Connected via Freighter.', 'success');
        setModalOpen(false);
      }
    } catch (err: any) {
      console.warn('Freighter connection error:', err);
      addToast('Freighter Connection Failed', err.message || 'Login request rejected.', 'warning');
    }
  };

  // albedo wallet connection handler
  const handleConnectAlbedo = async () => {
    try {
      const address = await connectAlbedoWallet();
      if (address) {
        onConnect(address, 'albedo');
        addToast('Wallet Connected', 'Connected via Albedo.', 'success');
        setModalOpen(false);
      }
    } catch (err: any) {
      console.warn('Albedo connection error:', err);
      addToast('Albedo Connection Failed', err.message || 'Login request rejected.', 'warning');
    }
  };

  // manual address loading handler
  const handleConnectManual = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAddr = manualAddressInput.trim();
    if (!cleanAddr.startsWith('G') || cleanAddr.length !== 56) {
      addToast('Invalid Address', 'Stellar public key must be 56 characters starting with G.', 'warning');
      return;
    }
    onConnect(cleanAddr, 'manual');
    addToast('Account Loaded', 'Public key loaded in read-only mode.', 'success');
    setModalOpen(false);
    setManualAddressInput('');
  };

  return (
    <div className="flex items-center gap-2">
      {walletConnected ? (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono shadow-inner">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          <span className="font-bold tracking-tight">
            {stellarAddress.slice(0, 4)}...{stellarAddress.slice(-4)}
          </span>
          <div className="flex items-center gap-1 ml-1 border-l border-slate-800 pl-1.5">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(stellarAddress);
                addToast('Address Copied', 'Stellar public key copied to clipboard!', 'success');
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition cursor-pointer"
              title="Copy Full Address"
            >
              <Copy className="w-3 h-3" />
            </button>
            <button 
              onClick={onDisconnect}
              className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
              title="Disconnect Wallet"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-100 text-xs sm:text-sm font-semibold transition shadow-lg shadow-indigo-950/50 cursor-pointer shrink-0"
        >
          <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Connect Wallet</span>
          <span className="inline sm:hidden">Connect</span>
        </button>
      )}

      {/* Connection Modal Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex justify-center items-start sm:items-center z-50 p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-5 my-auto shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-850">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-indigo-400" />
                <span>Connect Stellar Account</span>
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-200 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Freighter Wallet Connect Button */}
              <button
                onClick={handleConnectFreighter}
                className="w-full p-4 bg-slate-950 border border-slate-850 hover:border-indigo-500/50 rounded-xl text-left flex items-center justify-between transition duration-200 group cursor-pointer"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition">Connect Freighter</h4>
                  <p className="text-xs text-slate-400 mt-1">Access using Stellar official extension wallet.</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 text-slate-400 group-hover:text-indigo-400">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </button>

              {/* Albedo Wallet Connect Button */}
              <button
                onClick={handleConnectAlbedo}
                className="w-full p-4 bg-slate-950 border border-slate-850 hover:border-indigo-500/50 rounded-xl text-left flex items-center justify-between transition duration-200 group cursor-pointer"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition">Connect Albedo</h4>
                  <p className="text-xs text-slate-400 mt-1">Access using web-based Albedo key vault (no extension needed).</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 text-slate-400 group-hover:text-indigo-400">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-850"></div>
                <span className="flex-shrink mx-3 text-slate-500 text-[10px] uppercase font-bold tracking-widest">Or View Any Key</span>
                <div className="flex-grow border-t border-slate-850"></div>
              </div>

              {/* Manual Public Key Entry Form */}
              <form onSubmit={handleConnectManual} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Paste Stellar Public Key (G...)</label>
                  <input
                    type="text"
                    required
                    value={manualAddressInput}
                    onChange={(e) => setManualAddressInput(e.target.value)}
                    placeholder="e.g. GB32...4K9Z"
                    className="w-full px-3 py-2.5 rounded-lg glass-input text-xs font-mono bg-slate-950 border border-slate-850 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-lg text-xs tracking-wider uppercase transition shadow-lg shadow-indigo-600/10 cursor-pointer text-slate-100"
                >
                  Load Ledger View
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
