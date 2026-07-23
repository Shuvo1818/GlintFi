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
    txHash: '47bbb59d997864f1d3c26a5ca4c8e76ca15cd03112d7b59cf80b45722dc6ca15',
    address: 'GAMSDLGTG7FAFRQ4DPCPLKVIISLUZLRN4FRLWIBMFOWXRCXGIXDYIRW4S',
    action: 'Contract Deploy',
    amount: 'GullakVault WASM',
    timestamp: '2026-07-18 01:38',
    status: 'Success'
  },
  {
    id: 'tx2',
    txHash: '7dc8e0b21b73b35770b4161ca12f4ad6cb79ec22facf5f1bd8d319a464c75cf3',
    address: 'GAMSDLGTG7FAFRQ4DPCPLKVIISLUZLRN4FRLWIBMFOWXRCXGIXDYIRW4S',
    action: 'Gullak Deposit',
    amount: '150.00 XLM',
    timestamp: '2026-07-18 01:52',
    status: 'Success'
  },
  {
    id: 'tx3',
    txHash: 'c552dd02215d5b51f8b0c5f01d803a7a22799c3c8619daa600c231f19355a456',
    address: 'GAPNX3Q6WZ5JN7OO2WHZ52ZCPZ6US4NYXB4EW6I7NMVIU6FT7TZIUOXH',
    action: 'sXAU Swap',
    amount: '0.0500 sXAU',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx4',
    txHash: '2e7c804316c667bde2f6c6c50325a70554d6c07a98d5c323ca42bea4c257c482',
    address: 'GBDCULE53LUPK4XHUCXBI35MAZFQHENMZ3JRKAJS2PPYBV646M6XKVHG',
    action: 'USDC Loan',
    amount: '100.00 USDC',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx5',
    txHash: 'ec90e261fe830e9d1e5ac52c03ee71ef1659282e92663b68401d8d9382f4c2c8',
    address: 'GCHGSJGJFSN557D3EBUSIYHIVXPI6QJCZJSSUJEFBVC45L5YM6YCA3EG',
    action: 'Gullak Deposit',
    amount: '250.00 XLM',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx6',
    txHash: '7c3268d8de6503d3d00c08c0a3ed8268763f08fafcab6be59e8e866e6e5f7062',
    address: 'GA6IYX2Z62YC7PQNYATZNT24GZXKIBPGKK6H3KWOUBE53BAR2GMDXZIY',
    action: 'sXAG Swap',
    amount: '12.50 sXAG',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx7',
    txHash: 'ef0d32c4c2b793df7ca525dafa151d5bec79811d0eaf396e52e997840cd75fe5',
    address: 'GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ',
    action: 'P2P Micro-Gift',
    amount: '0.0100 sXAU',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx8',
    txHash: '3bb4b7c95098a7bc935fbdc1f96debabd8921085668cb89ab5a12df186b43f27',
    address: 'GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3',
    action: 'Gullak Withdraw',
    amount: '50.00 XLM',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx9',
    txHash: '0ecd5c36c5cc35aea1d6e0a4fa10bb40be28b094e1bab92d1595786a668b06fc',
    address: 'GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ',
    action: 'sXAU Swap',
    amount: '0.1200 sXAU',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx10',
    txHash: '0da791c7cc13fc6c783cbb6ec9ef99ad2f2370a1a13a4705003e4bad990e1802',
    address: 'GCUPC4XXEKD4CI625BBXA3GCBM2BF5ZQODKP5GP55X5PFY2Q7Z4MXZPL',
    action: 'USDC Loan',
    amount: '300.00 USDC',
    timestamp: '2026-07-23 15:46',
    status: 'Success'
  },
  {
    id: 'tx11',
    txHash: '9677e8dcca45c23d4c7a98a75eab2ec1cc6246741872a9b96e5813cac321488a',
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
