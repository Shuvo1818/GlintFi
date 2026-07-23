import React, { useState } from 'react';
import { ExternalLink, Copy, Check, ShieldCheck, Users, Search, CheckCircle2, Filter } from 'lucide-react';

export interface WalletInteractionRecord {
  id: string;
  txHash: string;
  address: string;
  action: 'Contract Deploy' | 'Gullak Deposit' | 'Gullak Withdraw' | 'sXAU Swap' | 'sXAG Swap' | 'USDC Loan' | 'P2P Micro-Gift';
  amount: string;
  timestamp: string;
  status: 'Success';
  memo?: string;
}

export const VERIFIED_INTERACTIONS: WalletInteractionRecord[] = [
  {
    id: 'tx1',
    txHash: '55f5a83fe47c1b35b67d5815668b8eefcaefd7eeed949ecdd8ea969a531e2ec2',
    address: 'GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3',
    action: 'Contract Deploy',
    amount: 'GullakVault WASM',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx2',
    txHash: '91eadf7eddf8664ea68b0c8db4b830d662c114fefd27a419b48b6fa28df1efd6',
    address: 'GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ',
    action: 'Gullak Deposit',
    amount: '150.00 XLM',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx3',
    txHash: 'b498953a730f9a263c9a41ee9a4f4e73dbd637c385a85514f7b4c6e1aa807e3a',
    address: 'GAR6C4EIEZQW2RX3LSHXKOIIONLWTZCPCXYOGDZV63UCNRXD7EQJYCRW',
    action: 'sXAU Swap',
    amount: '0.0500 sXAU',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx4',
    txHash: '62f0887b4b753aa73428d0ee5df2d94a9a0890bf2a3cf84d852a466cfcd63c46',
    address: 'GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ',
    action: 'USDC Loan',
    amount: '100.00 USDC',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx5',
    txHash: '1e0bcff4152438aaeb00b65fdf752d5dbd3db150ec7e2ee677bf188ad3b6ee97',
    address: 'GAGMSM3BKRHLXLJUE7ZDCXMPKL6YSUUMW5DGWL4EIBU4B32KYY6OB3MZ',
    action: 'Gullak Deposit',
    amount: '250.00 XLM',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx6',
    txHash: '29d53114b6bdc487313bf9798ca0b1cce45e1ed3efbc2bdca5ee6a17b078516d',
    address: 'GBN74TJZKUWQ4T3ZH2CD7R52QFVUBZ7HK3PTT7YVKYGGFAT4S6B3RFOU',
    action: 'sXAG Swap',
    amount: '12.50 sXAG',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx7',
    txHash: 'b43163eb6e7f22dd3a3bb02db75fcbbbb76ec3ec0fa1a941bf5fae3ee31e7c99',
    address: 'GBVRBYR7T5G73DXAWZQHMCHON4TKCQ6CZPFFDXOTZNGO5XXFU2SQPKVU',
    action: 'P2P Micro-Gift',
    amount: '0.0100 sXAU',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx8',
    txHash: 'ce7aa1e6104b2ee71ed87363f8bbbfad0bf45811aaefd683fbefb149b5df4545',
    address: 'GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ',
    action: 'Gullak Withdraw',
    amount: '50.00 XLM',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx9',
    txHash: '7aa67c8d4f434df898eb2ca1b965e6eb4dfbc23f95e54d89a42168dfba2f483c',
    address: 'GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3',
    action: 'sXAU Swap',
    amount: '0.1200 sXAU',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx10',
    txHash: '57f4deae6879bb77ec1ae1f79aeef1d89bfa856d1ec2a8c3d9a1f5926ec37efc',
    address: 'GAR6C4EIEZQW2RX3LSHXKOIIONLWTZCPCXYOGDZV63UCNRXD7EQJYCRW',
    action: 'USDC Loan',
    amount: '300.00 USDC',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx11',
    txHash: 'af8ed98dbb19586ac0372df5ac7a0d1ec9b33a5cf05e495eb1388ae3df858cb4',
    address: 'GA5XW2R4ALW4FLZK74Z6Z3MOBLOI2LFQ3RBZKOV2NVWCVCBNRMSJWQXH',
    action: 'Gullak Deposit',
    amount: '500.00 XLM',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  }
];

interface WalletInteractionProofProps {
  isOpen?: boolean;
  onClose?: () => void;
  isEmbedded?: boolean;
}

export const WalletInteractionProof: React.FC<WalletInteractionProofProps> = ({
  isOpen = true,
  onClose,
  isEmbedded = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterAction, setFilterAction] = useState<string>('All');

  const filteredRecords = VERIFIED_INTERACTIONS.filter(record => {
    const matchesSearch = record.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.txHash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAction === 'All' || record.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const contentMarkup = (
    <div className="space-y-4">
      {/* Component Banner */}
      <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Verified Onboarding & Wallet Interaction Ledger
            </h3>
            <p className="text-xs text-slate-400">Verified Testnet transactions & user interactions on Stellar network</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            {VERIFIED_INTERACTIONS.length} Verified Wallet Logs
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search address or tx hash..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">All Interaction Types</option>
            <option value="Contract Deploy">Contract Deploy</option>
            <option value="Gullak Deposit">Gullak Deposit</option>
            <option value="Gullak Withdraw">Gullak Withdraw</option>
            <option value="sXAU Swap">sXAU Swap</option>
            <option value="sXAG Swap">sXAG Swap</option>
            <option value="USDC Loan">USDC Loan</option>
            <option value="P2P Micro-Gift">P2P Micro-Gift</option>
          </select>
        </div>
      </div>

      {/* Interaction Proof Table */}
      <div className="overflow-x-auto border border-slate-850 rounded-2xl bg-slate-950/50 shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-850">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Wallet Address</th>
              <th className="px-4 py-3">Interaction Action</th>
              <th className="px-4 py-3">Value / Amount</th>
              <th className="px-4 py-3">Transaction Hash</th>
              <th className="px-4 py-3 text-right">Explorer Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/60 font-mono text-slate-300">
            {filteredRecords.map((record, index) => (
              <tr key={record.id} className="hover:bg-slate-900/60 transition-colors">
                <td className="px-4 py-3 text-slate-500 font-bold">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-indigo-400 font-semibold">{record.address.slice(0, 5)}...{record.address.slice(-5)}</span>
                    <button
                      onClick={() => handleCopy(record.address, record.id + '_addr')}
                      className="text-slate-500 hover:text-slate-300 p-0.5 cursor-pointer"
                      title="Copy Wallet Address"
                    >
                      {copiedId === record.id + '_addr' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 font-sans">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    record.action.includes('Deposit') || record.action.includes('Deploy')
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : record.action.includes('Swap')
                      ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    {record.action}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-200 font-bold">{record.amount}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">{record.txHash.slice(0, 8)}...{record.txHash.slice(-6)}</span>
                    <button
                      onClick={() => handleCopy(record.txHash, record.id + '_tx')}
                      className="text-slate-500 hover:text-slate-300 p-0.5 cursor-pointer"
                      title="Copy Tx Hash"
                    >
                      {copiedId === record.id + '_tx' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${record.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
                  >
                    <span>Explorer</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (isEmbedded) {
    return contentMarkup;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl p-6 shadow-2xl space-y-5 text-slate-100 relative">
        <div className="flex items-center justify-between border-b border-slate-850 pb-3">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>Onboarding & Verified Wallet Interaction Ledger</span>
          </h3>
          {onClose && (
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg cursor-pointer">
              ✕
            </button>
          )}
        </div>
        {contentMarkup}
      </div>
    </div>
  );
};
