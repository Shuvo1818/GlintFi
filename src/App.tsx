import React, { useState, useMemo, useEffect } from 'react';
import { 
  Coins, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  RefreshCw, 
  PiggyBank, 
  Percent, 
  Send, 
  CheckCircle2, 
  X, 
  Info, 
  Calendar, 
  DollarSign, 
  Flame, 
  Award, 
  Lock, 
  ArrowDownUp, 
  Clock,
  ExternalLink,
  Loader2,
  Gift,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  LogOut,
  Edit2,
  Check,
  Trash2,
  Copy
} from 'lucide-react';
import { isConnected, requestAccess, signTransaction as freighterSignTransaction } from '@stellar/freighter-api';
import albedo from '@albedo-link/intent';
import { auth, db } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs
} from 'firebase/firestore';
import { Horizon, TransactionBuilder, Asset, Operation, Networks, Keypair, Contract, nativeToScVal, scValToNative, rpc } from '@stellar/stellar-sdk';

// Interfaces
interface SipSchedule {
  id: string;
  asset: 'sXAU' | 'sXAG';
  amount: number;
  fundingAsset: 'XLM' | 'USDC';
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  createdAt: string;
}

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: string;
}

interface TransactionRecord {
  id: string;
  type: 'Swap' | 'Loan' | 'Transfer' | 'Gift';
  description: string;
  amount: string;
  asset: string;
  date: string;
  hash: string;
  status: 'Success' | 'Pending';
}

interface ReceivedGift {
  id: string;
  sender: string;
  amount: string;
  asset: string;
  note: string;
  date: string;
  hash: string;
}

type AssetCode = 'XLM' | 'USDC' | 'sXAU' | 'sXAG';

const CANONICAL_ISSUERS = {
  testnet: {
    USDC: 'GBBD47IF6LWK7P7TXXTEXXG73OW2T7DI3B5R7JISFTHMGL2NEXJ3OF64',
    sXAU: 'GDVWAJR4ZEF6WZAHMTOBJDPEI5AOW5PSVKS2DSAAMW2M4RNF3PSR5PTR',
    sXAG: 'GDU4LBOJOAFQNXFWLWNWVDZF4MZHLCRSB323KUP33SFGJN54IKRBLHCX',
    distributor: 'GDX2MP6ATXZYKLLEO4GKNEC4UNQKUPUSML7KYPYQU6OPL4XITUI52F3X',
    distributorSecret: 'SBC6UQTRJOC6FA2P7XR3TCBYECQX33XCECUOJJMKVMTBQPBK7LCP4DJT'
  },
  public: {
    USDC: 'GA5ZSEJ6PLNCSA3FS32BATATJ4C3WZX7WOBA5424MTGSZ6GS75XAT277',
    sXAU: 'GDVWAJR4ZEF6WZAHMTOBJDPEI5AOW5PSVKS2DSAAMW2M4RNF3PSR5PTR',
    sXAG: 'GDU4LBOJOAFQNXFWLWNWVDZF4MZHLCRSB323KUP33SFGJN54IKRBLHCX',
    distributor: 'GDX2MP6ATXZYKLLEO4GKNEC4UNQKUPUSML7KYPYQU6OPL4XITUI52F3X',
    distributorSecret: ''
  }
};

// ---------------------------------------------------------
// Base Market Data Series (Will be scaled to live prices)
// ---------------------------------------------------------
const MOCK_BASE_DATA: Record<'sXAU' | 'sXAG', Record<'1D' | '7D' | '1M', Candle[]>> = {
  sXAU: {
    '1D': [
      { time: '10:00', open: 2378.20, high: 2380.50, low: 2377.10, close: 2379.80, volume: '1.2K oz' },
      { time: '12:00', open: 2379.80, high: 2382.40, low: 2379.00, close: 2381.10, volume: '980 oz' },
      { time: '14:00', open: 2381.10, high: 2381.50, low: 2376.50, close: 2377.30, volume: '1.5K oz' },
      { time: '16:00', open: 2377.30, high: 2380.00, low: 2376.80, close: 2379.20, volume: '850 oz' },
      { time: '18:00', open: 2379.20, high: 2383.80, low: 2378.90, close: 2382.60, volume: '2.1K oz' },
      { time: '20:00', open: 2382.60, high: 2384.10, low: 2381.50, close: 2383.90, volume: '1.4K oz' },
      { time: '22:00', open: 2383.90, high: 2385.00, low: 2382.00, close: 2382.80, volume: '910 oz' },
      { time: '00:00', open: 2382.80, high: 2383.50, low: 2379.10, close: 2380.40, volume: '1.1K oz' },
      { time: '02:00', open: 2380.40, high: 2382.90, low: 2379.80, close: 2382.10, volume: '720 oz' },
      { time: '04:00', open: 2382.10, high: 2385.60, low: 2381.80, close: 2384.80, volume: '1.8K oz' },
    ],
    '7D': [
      { time: 'Mon', open: 2355.00, high: 2368.00, low: 2351.00, close: 2364.50, volume: '8.4K oz' },
      { time: 'Tue', open: 2364.50, high: 2372.20, low: 2361.00, close: 2369.80, volume: '9.2K oz' },
      { time: 'Wed', open: 2369.80, high: 2375.00, low: 2364.20, close: 2367.00, volume: '10.5K oz' },
      { time: 'Thu', open: 2367.00, high: 2382.00, low: 2365.10, close: 2378.40, volume: '12.1K oz' },
      { time: 'Fri', open: 2378.40, high: 2390.50, low: 2374.00, close: 2385.20, volume: '14.8K oz' },
      { time: 'Sat', open: 2385.20, high: 2388.00, low: 2382.10, close: 2383.90, volume: '4.2K oz' },
      { time: 'Sun', open: 2383.90, high: 2386.40, low: 2379.50, close: 2384.80, volume: '3.9K oz' },
    ],
    '1M': [
      { time: 'Wk 1', open: 2310.00, high: 2342.00, low: 2305.00, close: 2338.00, volume: '42K oz' },
      { time: 'Wk 2', open: 2338.00, high: 2365.00, low: 2329.00, close: 2358.50, volume: '38K oz' },
      { time: 'Wk 3', open: 2358.50, high: 2395.00, low: 2350.00, close: 2382.00, volume: '51K oz' },
      { time: 'Wk 4', open: 2382.00, high: 2410.00, low: 2374.00, close: 2384.80, volume: '47K oz' },
    ]
  },
  sXAG: {
    '1D': [
      { time: '10:00', open: 29.62, high: 29.70, low: 29.51, close: 29.55, volume: '12K oz' },
      { time: '12:00', open: 29.55, high: 29.58, low: 29.40, close: 29.43, volume: '9.5K oz' },
      { time: '14:00', open: 29.43, high: 29.52, low: 29.35, close: 29.48, volume: '15K oz' },
      { time: '16:00', open: 29.48, high: 29.60, low: 29.45, close: 29.52, volume: '8.2K oz' },
      { time: '18:00', open: 29.52, high: 29.55, low: 29.38, close: 29.41, volume: '11K oz' },
      { time: '20:00', open: 29.41, high: 29.46, low: 29.30, close: 29.32, volume: '14K oz' },
      { time: '22:00', open: 29.32, high: 29.44, low: 29.31, close: 29.42, volume: '9.8K oz' },
      { time: '00:00', open: 29.42, high: 29.48, low: 29.38, close: 29.40, volume: '6.5K oz' },
      { time: '02:00', open: 29.40, high: 29.45, low: 29.35, close: 29.39, volume: '5.2K oz' },
      { time: '04:00', open: 29.39, high: 29.44, low: 29.36, close: 29.40, volume: '10K oz' },
    ],
    '7D': [
      { time: 'Mon', open: 30.12, high: 30.25, low: 29.80, close: 29.95, volume: '72K oz' },
      { time: 'Tue', open: 29.95, high: 30.08, low: 29.71, close: 29.78, volume: '85K oz' },
      { time: 'Wed', open: 29.78, high: 29.90, low: 29.50, close: 29.52, volume: '91K oz' },
      { time: 'Thu', open: 29.52, yHigh: 29.72, low: 29.38, close: 29.45, volume: '68K oz' } as any,
      { time: 'Fri', open: 29.45, high: 29.68, low: 29.30, close: 29.61, volume: '77K oz' },
      { time: 'Sat', open: 29.61, high: 29.65, low: 29.38, close: 29.42, volume: '22K oz' },
      { time: 'Sun', open: 29.42, high: 29.50, low: 29.35, close: 29.40, volume: '19K oz' },
    ],
    '1M': [
      { time: 'Wk 1', open: 30.85, high: 31.20, low: 29.95, close: 30.22, volume: '310K oz' },
      { time: 'Wk 2', open: 30.22, high: 30.50, low: 29.60, close: 29.88, volume: '280K oz' },
      { time: 'Wk 3', open: 29.88, high: 30.10, low: 29.22, close: 29.55, volume: '340K oz' },
      { time: 'Wk 4', open: 29.55, high: 29.80, low: 29.30, close: 29.40, volume: '290K oz' },
    ]
  }
};

if (!MOCK_BASE_DATA.sXAG['7D'][3].high) {
  MOCK_BASE_DATA.sXAG['7D'][3].high = 29.72;
}

const isRealHash = (hash: string) => {
  return typeof hash === 'string' && hash.length === 64 && /^[0-9a-fA-F]+$/.test(hash);
};

const formatLocalTime = (dateInput: string | Date) => {
  try {
    const localDate = new Date(dateInput);
    if (isNaN(localDate.getTime())) return '';
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  } catch (e) {
    return '';
  }
};

function App() {
  // ---------------------------------------------------------
  // State variables
  // ---------------------------------------------------------
  const [currentView, setCurrentView] = useState<'dashboard' | 'trade'>('dashboard');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [authMode, setAuthMode] = useState<'welcome' | 'signin' | 'signup'>('welcome');
  const [authName, setAuthName] = useState<string>('');
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState<string>('');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [editNameVal, setEditNameVal] = useState<string>('');
  const [isSavingName, setIsSavingName] = useState<boolean>(false);
  const [assetIssuers, setAssetIssuers] = useState<Record<string, string>>({});
  const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);
  const [deletedTxIds, setDeletedTxIds] = useState<Set<string>>(new Set());
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [stellarAddress, setStellarAddress] = useState<string>('');
  const [connectionType, setConnectionType] = useState<'freighter' | 'albedo' | 'manual' | null>(null);
  const [networkMode, setNetworkMode] = useState<'public' | 'testnet'>('testnet');
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);
  const [isFetchingBalances, setIsFetchingBalances] = useState<boolean>(false);
  const [manualAddressInput, setManualAddressInput] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'swap' | 'gullak' | 'loan' | 'send'>('swap');
  const [chartAsset, setChartAsset] = useState<'sXAU' | 'sXAG'>('sXAU');
  const [chartTimeframe, setChartTimeframe] = useState<'1D' | '7D' | '1M'>('1D');
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);

  // Live Ledger Balances (Initialized to 0.00 when disconnected)
  const [balances, setBalances] = useState({
    XLM: 0.00,
    USDC: 0.00,
    sXAU: 0.00,
    sXAG: 0.00
  });

  const [trustlines, setTrustlines] = useState<{ USDC: boolean; sXAU: boolean; sXAG: boolean }>({
    USDC: false,
    sXAU: false,
    sXAG: false
  });
  const [isActivatingTrustline, setIsActivatingTrustline] = useState<Record<string, boolean>>({});
  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  // Base Market Prices (Actual values from API)
  const [basePrices, setBasePrices] = useState({
    XLM: 0.1825,
    USDC: 1.00,
    sXAU: 4057.30,
    sXAG: 58.20
  });

  // Live Market Prices (Ticking/fluctuating values for UI animation)
  const [livePrices, setLivePrices] = useState({
    XLM: 0.1825,
    USDC: 1.00,
    sXAU: 4057.30,
    sXAG: 58.20
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Form states
  const [swapFrom, setSwapFrom] = useState<AssetCode>('XLM');
  const [swapTo, setSwapTo] = useState<AssetCode>('sXAU');
  const [swapAmount, setSwapAmount] = useState<string>('');

  const [gullakAsset, setGullakAsset] = useState<'sXAU' | 'sXAG'>('sXAU');
  const [gullakAmount, setGullakAmount] = useState<string>('');
  const [gullakSource, setGullakSource] = useState<'XLM' | 'USDC'>('USDC');
  const [gullakFreq, setGullakFreq] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');
  const [gullakSubTab, setGullakSubTab] = useState<'sip' | 'soroban'>('sip');
  const [sorobanBalance, setSorobanBalance] = useState<string>('0.0000000');
  const [isFetchingSorobanBalance, setIsFetchingSorobanBalance] = useState<boolean>(false);
  const [sorobanDepositAmt, setSorobanDepositAmt] = useState<string>('');
  const [sorobanTxStatus, setSorobanTxStatus] = useState<'idle' | 'simulating' | 'signing' | 'submitting' | 'success'>('idle');
  const [sorobanTxHash, setSorobanTxHash] = useState<string>('');
  const [shagunTxStatus, setShagunTxStatus] = useState<'idle' | 'simulating' | 'signing' | 'submitting' | 'success'>('idle');
  const [shagunTxHash, setShagunTxHash] = useState<string>('');
  const [sips, setSips] = useState<SipSchedule[]>([]);

  const [loanCollateralAsset, setLoanCollateralAsset] = useState<'sXAU' | 'sXAG'>('sXAU');
  const [loanCollateralAmt, setLoanCollateralAmt] = useState<string>('');

  // Send & Gift State
  const [sendGiftType, setSendGiftType] = useState<'regular' | 'gift'>('regular');
  const [shagunAddress, setShagunAddress] = useState<string>('');
  const [shagunAsset, setShagunAsset] = useState<'sXAU' | 'sXAG' | 'XLM' | 'USDC'>('sXAU');
  const [shagunAmount, setShagunAmount] = useState<string>('');
  const [shagunNote, setShagunNote] = useState<string>('');

  // Activity & Gifts Ledger States
  const [ledgerTab, setLedgerTab] = useState<'activity' | 'gifts'>('activity');
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);

  const [receivedGifts, setReceivedGifts] = useState<ReceivedGift[]>([]);

  const [activeModal, setActiveModal] = useState<{
    type: 'success' | 'error';
    title: string;
    details: React.ReactNode;
  } | null>(null);

  // ---------------------------------------------------------
  // Helper / Utility Actions
  // ---------------------------------------------------------

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // ---------------------------------------------------------
  // API Fetch Tasks: Live prices and Horizon balances
  // ---------------------------------------------------------

  const fetchLivePrices = async () => {
    let xlmVal = 0.1825;
    let goldVal = 4057.30;
    let silverVal = 58.20;
    let success = false;

    // 1. Try Gold-API (Public, CORS-friendly, gives exact spot XAU and XAG)
    try {
      const goldRes = await fetch('https://api.gold-api.com/price/XAU');
      const silverRes = await fetch('https://api.gold-api.com/price/XAG');
      if (goldRes.ok && silverRes.ok) {
        const goldData = await goldRes.json();
        const silverData = await silverRes.json();
        if (goldData.price && silverData.price) {
          goldVal = parseFloat(goldData.price) || 4057.30;
          silverVal = parseFloat(silverData.price) || 58.20;
          success = true;
        }
      }
    } catch (err) {
      console.warn('Gold-API spot price fetch failed, trying CoinGecko:', err);
    }

    // 2. Try CoinGecko API (CORS-friendly, fetches XLM, Gold, and Silver in a single request)
    try {
      const cgRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=pax-gold,kinesis-silver,stellar&vs_currencies=usd');
      if (cgRes.ok) {
        const cgData = await cgRes.json();
        if (!success && cgData['pax-gold']?.usd) {
          goldVal = parseFloat(cgData['pax-gold'].usd) || goldVal;
          success = true;
        }
        if (!success && cgData['kinesis-silver']?.usd) {
          silverVal = parseFloat(cgData['kinesis-silver'].usd) || silverVal;
        }
        if (cgData['stellar']?.usd) {
          xlmVal = parseFloat(cgData['stellar'].usd) || 0.1825;
        }
      }
    } catch (err) {
      console.warn('CoinGecko price fetch failed, trying Binance fallback:', err);
    }

    // 3. Fallback to Binance API if Gold-API and CoinGecko gold fetches failed
    if (!success) {
      try {
        const xlmRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=XLMUSDT');
        const binanceGoldRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT');

        if (xlmRes.ok) {
          const xlmData = await xlmRes.json();
          xlmVal = parseFloat(xlmData.price) || 0.1825;
        }
        if (binanceGoldRes.ok) {
          const goldData = await binanceGoldRes.json();
          goldVal = parseFloat(goldData.price) || 4057.30;
          // Approximate silver spot price from Gold price if CoinGecko is down
          silverVal = goldVal / 70;
        }
      } catch (err) {
        console.warn('Binance fallback price fetch failed as well:', err);
      }
    }

    const fetchedPrices = {
      XLM: xlmVal,
      USDC: 1.00,
      sXAU: goldVal,
      sXAG: silverVal
    };
    setBasePrices(fetchedPrices);
    setLivePrices(fetchedPrices);
  };

  const fetchAccountBalances = async (address: string, network: 'public' | 'testnet', silent = false) => {
    if (!address) return;
    if (!silent) {
      setIsFetchingBalances(true);
    }
    try {
      const horizonUrl = network === 'public' 
        ? `https://horizon.stellar.org/accounts/${address}`
        : `https://horizon-testnet.stellar.org/accounts/${address}`;

      const res = await fetch(horizonUrl);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Account not funded yet. Fund this address to load balances.');
        } else {
          throw new Error(`Horizon API error: ${res.statusText}`);
        }
      }
      const data = await res.json();

      let xlmBal = 0;
      let usdcBal = 0;
      let sxauBal = 0;
      let sxagBal = 0;
      let hasUsdcTrust = false;
      let hasSxauTrust = false;
      let hasSxagTrust = false;
      const newIssuers: Record<string, string> = {};

      if (data.balances) {
        data.balances.forEach((b: any) => {
          const val = parseFloat(b.balance) || 0;
          if (b.asset_type === 'native') {
            xlmBal = val;
          } else {
            if (b.asset_code && b.asset_issuer) {
              newIssuers[b.asset_code] = b.asset_issuer;
            }
            if (b.asset_code === 'USDC') {
              usdcBal = val;
              hasUsdcTrust = true;
            } else if (b.asset_code === 'sXAU') {
              sxauBal = val;
              hasSxauTrust = true;
            } else if (b.asset_code === 'sXAG') {
              sxagBal = val;
              hasSxagTrust = true;
            }
          }
        });
      }

      setAssetIssuers(newIssuers);
      setTrustlines({
        USDC: hasUsdcTrust,
        sXAU: hasSxauTrust,
        sXAG: hasSxagTrust
      });
      setBalances({
        XLM: xlmBal,
        USDC: usdcBal,
        sXAU: sxauBal,
        sXAG: sxagBal
      });
      // Trigger Soroban balance load
      fetchSorobanBalance(address);

      if (!silent) {
        addToast('Balances Refreshed', `Ledger updated for ${address.slice(0, 4)}...${address.slice(-4)}.`, 'success');
      }
    } catch (err: any) {
      console.warn('Horizon fetch failed:', err);
      setTrustlines({
        USDC: false,
        sXAU: false,
        sXAG: false
      });
      if (!silent) {
        addToast('Balance Query Failed', err.message || 'Horizon network timed out.', 'warning');
      }
      setBalances({ XLM: 0, USDC: 0, sXAU: 0, sXAG: 0 });
      setSorobanBalance('0.0000000');
    } finally {
      if (!silent) {
        setIsFetchingBalances(false);
      }
    }
  };

  const handleEstablishTrustline = async (assetCode: 'USDC' | 'sXAU' | 'sXAG') => {
    if (!walletConnected || !stellarAddress) {
      addToast('Wallet Not Connected', 'Please connect your Freighter wallet to activate assets.', 'warning');
      return;
    }

    setIsActivatingTrustline(prev => ({ ...prev, [assetCode]: true }));
    addToast('Activating Asset...', `Requesting Freighter signature to trust ${assetCode}.`, 'info');

    try {
      const isTestnet = networkMode === 'testnet';
      const horizonEndpoint = isTestnet 
        ? 'https://horizon-testnet.stellar.org'
        : 'https://horizon.stellar.org';
      const server = new Horizon.Server(horizonEndpoint);

      const userAcc = await server.loadAccount(stellarAddress);
      
      const issuerAddress = isTestnet 
        ? CANONICAL_ISSUERS.testnet[assetCode]
        : CANONICAL_ISSUERS.public[assetCode];

      const trustAsset = new Asset(assetCode, issuerAddress);

      const tx = new TransactionBuilder(userAcc, {
        fee: '10000',
        networkPassphrase: isTestnet ? Networks.TESTNET : Networks.PUBLIC
      })
        .addOperation(Operation.changeTrust({
          asset: trustAsset
        }))
        .setTimeout(0)
        .build();

      const xdr = tx.toXDR();
      console.log(`Signing trustline change for ${assetCode}...`);
      const signResult = await signTransaction(xdr, {
        networkPassphrase: isTestnet ? Networks.TESTNET : Networks.PUBLIC
      });

      if (signResult.error) {
        throw new Error(signResult.error);
      }

      console.log("Submitting changeTrust transaction...");
      const result = await server.submitTransaction(TransactionBuilder.fromXDR(signResult.signedTxXdr, isTestnet ? Networks.TESTNET : Networks.PUBLIC));
      console.log("Trustline created successfully on-chain:", result);

      addToast('Asset Activated!', `${assetCode} is now active on the Stellar network.`, 'success');
      
      // Silent refresh
      fetchAccountBalances(stellarAddress, networkMode, true);
    } catch (err: any) {
      console.error(`changeTrust failed for ${assetCode}:`, err);
      addToast('Activation Failed', err.message || 'Signature rejected or network error.', 'warning');
    } finally {
      setIsActivatingTrustline(prev => ({ ...prev, [assetCode]: false }));
    }
  };

  const fetchSorobanBalance = async (address: string) => {
    if (!address) return;
    setIsFetchingSorobanBalance(true);
    try {
      const isTestnet = networkMode === 'testnet';
      if (!isTestnet) {
        setSorobanBalance('0.0000000');
        return;
      }
      
      const rpcServer = new rpc.Server('https://soroban-testnet.stellar.org');
      const sacContractId = 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC';
      const contract = new Contract(sacContractId);
      
      const op = contract.call(
        'balance',
        nativeToScVal(address, { type: 'address' })
      );

      const horizonServer = new Horizon.Server('https://horizon-testnet.stellar.org');
      const sourceAcc = await horizonServer.loadAccount(address);
      
      const tx = new TransactionBuilder(sourceAcc, {
        fee: '10000',
        networkPassphrase: Networks.TESTNET
      })
        .addOperation(op)
        .setTimeout(0)
        .build();

      const result = (await rpcServer.simulateTransaction(tx)) as any;
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      if (result.result && result.result.retval) {
        const parsedBigInt = scValToNative(result.result.retval);
        const xlmVal = (Number(parsedBigInt) / 10000000).toFixed(7);
        setSorobanBalance(xlmVal);
      }
    } catch (err: any) {
      console.warn("fetchSorobanBalance failed (likely offline/network):", err);
      setSorobanBalance(balances.XLM.toFixed(7));
    } finally {
      setIsFetchingSorobanBalance(false);
    }
  };

  const handleSorobanDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletConnected || !stellarAddress) {
      addToast('Wallet Not Connected', 'Please connect your Stellar wallet.', 'warning');
      return;
    }

    const amt = parseFloat(sorobanDepositAmt);
    if (isNaN(amt) || amt <= 0) {
      addToast('Invalid Amount', 'Please set a valid deposit quantity.', 'warning');
      return;
    }

    const balanceFloat = parseFloat(sorobanBalance);
    if (balanceFloat < amt) {
      addToast('Insufficient Funds', 'Your Soroban wrapped XLM balance is insufficient.', 'warning');
      return;
    }

    const config = networkMode === 'testnet' ? CANONICAL_ISSUERS.testnet : CANONICAL_ISSUERS.public;
    const distributorAddress = config.distributor;

    setSorobanTxStatus('simulating');
    setSorobanTxHash('');
    addToast('Simulating Soroban Transaction...', 'Calling wrapped XLM contract simulation on Testnet.', 'info');

    try {
      const isTestnet = networkMode === 'testnet';
      const rpcServer = new rpc.Server('https://soroban-testnet.stellar.org');
      const sacContractId = 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC';
      const contract = new Contract(sacContractId);

      const amountInStroops = BigInt(Math.round(amt * 10000000));

      const op = contract.call(
        'transfer',
        nativeToScVal(stellarAddress, { type: 'address' }),
        nativeToScVal(distributorAddress, { type: 'address' }),
        nativeToScVal(amountInStroops, { type: 'i128' })
      );

      const horizonServer = new Horizon.Server(isTestnet ? 'https://horizon-testnet.stellar.org' : 'https://horizon.stellar.org');
      const sourceAcc = await horizonServer.loadAccount(stellarAddress);

      const tx = new TransactionBuilder(sourceAcc, {
        fee: '20000',
        networkPassphrase: isTestnet ? Networks.TESTNET : Networks.PUBLIC
      })
        .addOperation(op)
        .setTimeout(0)
        .build();

      const simulationResult = (await rpcServer.simulateTransaction(tx)) as any;
      
      if (simulationResult.error) {
        throw new Error(`Simulation failed: ${simulationResult.error}`);
      }

      const assembledTx = rpc.assembleTransaction(tx, simulationResult).build();

      setSorobanTxStatus('signing');
      addToast('Awaiting Signature...', 'Please sign the contract transfer in your connected wallet.', 'info');

      const xdr = assembledTx.toXDR();
      const signResult = await signTransaction(xdr, {
        networkPassphrase: isTestnet ? Networks.TESTNET : Networks.PUBLIC
      });

      if (signResult.error) {
        throw new Error(`User rejected signing: ${signResult.error}`);
      }

      setSorobanTxStatus('submitting');
      addToast('Submitting to Blockchain...', 'Broadcasting signed Soroban invocation transaction.', 'info');

      const signedTx = TransactionBuilder.fromXDR(signResult.signedTxXdr, isTestnet ? Networks.TESTNET : Networks.PUBLIC);
      const submitResult = await horizonServer.submitTransaction(signedTx);

      if (!submitResult.hash) {
        throw new Error('Transaction rejected by the network.');
      }

      const txHash = submitResult.hash;
      setSorobanTxHash(txHash);
      setSorobanTxStatus('success');
      addToast('Soroban Deposit Complete!', `Successfully transferred ${amt} XLM into GlintFi Vault on-chain.`, 'success');

      const newTx: TransactionRecord = {
        id: 'tx-' + Date.now(),
        type: 'Transfer',
        description: `Soroban Yield Deposit of ${amt} XLM`,
        amount: amt.toFixed(4),
        asset: 'XLM',
        date: formatLocalTime(new Date()),
        hash: txHash,
        status: 'Success'
      };

      setTransactions(prev => [newTx, ...prev]);
      saveTransactionToFirestore(newTx);
      setSorobanDepositAmt('');

      fetchSorobanBalance(stellarAddress);
      fetchAccountBalances(stellarAddress, networkMode, true);

    } catch (err: any) {
      console.error("Soroban deposit contract invocation failed:", err);
      
      let errorMsg = err.message || 'Unknown transaction failure.';
      if (errorMsg.includes('User rejected') || errorMsg.includes('declined') || errorMsg.includes('reject')) {
        addToast('Signature Rejected', 'You declined the transaction request inside your wallet.', 'warning');
      } else if (errorMsg.includes('Simulation') || errorMsg.includes('HostError') || errorMsg.includes('Host invocation')) {
        addToast('Soroban Simulation Failed', 'Smart contract execution failed. Make sure you have sufficient XLM to cover transaction costs and fees.', 'warning');
      } else {
        addToast('Network RPC Error', 'Could not establish connection to Soroban RPC node. Please check your internet connection.', 'warning');
      }
      setSorobanTxStatus('idle');
    }
  };

  useEffect(() => {
    fetchLivePrices();
    const priceInterval = setInterval(fetchLivePrices, 30000);
    return () => clearInterval(priceInterval);
  }, []);

  useEffect(() => {
    // Micro-tick simulator to make charts and stats look "live" and moving
    const tickInterval = setInterval(() => {
      setLivePrices(() => {
        const fluctuate = (val: number, range = 0.0003) => {
          const factor = 1 + (Math.random() * 2 - 1) * range;
          return val * factor;
        };

        return {
          XLM: parseFloat(fluctuate(basePrices.XLM, 0.0008).toFixed(6)),
          USDC: 1.00,
          sXAU: parseFloat(fluctuate(basePrices.sXAU, 0.0002).toFixed(2)),
          sXAG: parseFloat(fluctuate(basePrices.sXAG, 0.0003).toFixed(4))
        };
      });
    }, 2500);

    return () => clearInterval(tickInterval);
  }, [basePrices]);

  useEffect(() => {
    if (walletConnected && stellarAddress) {
      fetchAccountBalances(stellarAddress, networkMode);
    }
  }, [networkMode, walletConnected, stellarAddress]);

  useEffect(() => {
    if (deletedTxIds.size > 0) {
      console.log(`Synchronized ${deletedTxIds.size} deleted/hidden transactions.`);
    }
  }, [deletedTxIds]);

  // Fetch real on-chain transaction history from Horizon
  const fetchOnChainHistory = async (address: string, network: string): Promise<TransactionRecord[]> => {
    try {
      const horizonEndpoint = network === 'public' 
        ? 'https://horizon.stellar.org'
        : 'https://horizon-testnet.stellar.org';
      const server = new Horizon.Server(horizonEndpoint);
      const paymentsResponse = await server.payments().forAccount(address).order("desc").limit(20).call();
      
      return paymentsResponse.records.map((r: any) => {
        let isOutgoing = r.from === address;
        let assetName = 'XLM';
        let amountStr = r.amount || r.starting_balance || '0';
        let desc = '';

        if (r.type === 'payment') {
          if (r.asset_type !== 'native') {
            assetName = r.asset_code || 'USDC';
          }
          desc = isOutgoing 
            ? `Transferred ${assetName} to ${r.to.slice(0, 4)}...${r.to.slice(-4)}`
            : `Received ${assetName} from ${r.from.slice(0, 4)}...${r.from.slice(-4)}`;
        } else if (r.type === 'create_account') {
          desc = isOutgoing
            ? `Created account ${r.account.slice(0, 4)}...${r.account.slice(-4)}`
            : `Account created by ${r.funder.slice(0, 4)}...${r.funder.slice(-4)}`;
          assetName = 'XLM';
          amountStr = r.starting_balance || '0';
        } else if (r.type === 'invoke_host_function') {
          if (r.asset_balance_changes && r.asset_balance_changes.length > 0) {
            const change = r.asset_balance_changes[0];
            isOutgoing = change.from === address;
            amountStr = change.amount || '0';
            
            if (change.asset_type === 'native') {
              assetName = 'XLM';
            } else {
              const assetStr = change.asset || '';
              assetName = change.asset_code || assetStr.split(':')[0] || 'USDC';
            }
            
            desc = isOutgoing 
              ? `Transferred ${assetName} to ${change.to.slice(0, 4)}...${change.to.slice(-4)}`
              : `Received ${assetName} from ${change.from.slice(0, 4)}...${change.from.slice(-4)}`;
          } else {
            desc = `Blockchain transaction (${r.type})`;
            assetName = 'USDC';
            amountStr = '0';
          }
        } else {
          desc = `Blockchain transaction (${r.type})`;
          assetName = 'USDC';
          amountStr = '0';
        }
        
        return {
          id: r.id,
          type: 'Transfer',
          description: desc,
          amount: parseFloat(amountStr).toString(),
          asset: assetName,
          date: formatLocalTime(r.created_at),
          hash: r.transaction_hash,
          status: 'Success'
        };
      });
    } catch (err) {
      console.warn("Horizon payments fetch failed:", err);
      return [];
    }
  };

  // Load persisted history from Firestore & Horizon (or fallback to localStorage)
  // Load persisted history from Firestore & Horizon (or fallback to localStorage)
  const loadUserHistory = async (userId: string, address: string, network: string) => {
    try {
      // 1. Load local cache first to show something immediately
      const storedDeleted = localStorage.getItem(`glintfi_deleted_txs_${address}_${network}`);
      const localDeleted: string[] = storedDeleted ? JSON.parse(storedDeleted) : [];
      const delIds = new Set<string>(localDeleted);
      setDeletedTxIds(delIds);

      const storedTxs = localStorage.getItem(`glintfi_txs_${address}_${network}`);
      const localTxs: TransactionRecord[] = storedTxs ? JSON.parse(storedTxs) : [];
      
      const storedSips = localStorage.getItem(`glintfi_sips_${address}_${network}`);
      const localSips: SipSchedule[] = storedSips ? JSON.parse(storedSips) : [];
      
      const storedGifts = localStorage.getItem(`glintfi_gifts_${address}_${network}`);
      const localGifts: ReceivedGift[] = storedGifts ? JSON.parse(storedGifts) : [];

      // Render cached history immediately so the screen is never blank
      const initialMerged = localTxs.filter(tx => !delIds.has(tx.id) && !delIds.has(tx.hash));
      setTransactions(initialMerged);
      setSips(localSips);
      setReceivedGifts(localGifts);

      // 2. Fetch on-chain history from Horizon concurrently
      const onChainPromise = fetchOnChainHistory(address, network);

      // 3. Fetch Firestore data in parallel with a timeout/safeguard so it never hangs the UI
      const firestorePromise = (async () => {
        try {
          const deletedColRef = collection(db, 'users', userId, 'deletedTransactions');
          const deletedSnapshot = await getDocs(deletedColRef);
          deletedSnapshot.forEach((doc) => {
            delIds.add(doc.id);
            const data = doc.data();
            if (data.hash) delIds.add(data.hash);
          });
          setDeletedTxIds(new Set(delIds));
          localStorage.setItem(`glintfi_deleted_txs_${address}_${network}`, JSON.stringify(Array.from(delIds)));

          const txColRef = collection(db, 'users', userId, 'transactions');
          const txSnapshot = await getDocs(txColRef);
          const fbTxs: TransactionRecord[] = [];
          txSnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.stellarAddress === address && data.networkMode === network) {
              fbTxs.push({
                id: doc.id,
                type: data.type,
                description: data.description,
                amount: data.amount,
                asset: data.asset,
                date: data.date,
                hash: data.hash,
                status: data.status
              });
            }
          });

          const sipsColRef = collection(db, 'users', userId, 'sips');
          const sipsSnapshot = await getDocs(sipsColRef);
          const fbSips: SipSchedule[] = [];
          sipsSnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.stellarAddress === address && data.networkMode === network) {
              fbSips.push({
                id: doc.id,
                asset: data.asset,
                amount: data.amount,
                fundingAsset: data.fundingAsset,
                frequency: data.frequency,
                createdAt: data.createdAt
              });
            }
          });

          const giftsColRef = collection(db, 'users', userId, 'receivedGifts');
          const giftsSnapshot = await getDocs(giftsColRef);
          const fbGifts: ReceivedGift[] = [];
          giftsSnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.stellarAddress === address && data.networkMode === network) {
              fbGifts.push({
                id: doc.id,
                sender: data.sender,
                amount: data.amount,
                asset: data.asset,
                note: data.note,
                date: data.date,
                hash: data.hash || ''
              });
            }
          });

          return { fbTxs, fbSips, fbGifts };
        } catch (e) {
          console.warn("Firestore fetch error, using local/Horizon data:", e);
          return null;
        }
      })();

      // 4. Wait for both promises. Update state reactively as they resolve
      const [onChainTxs, fsData] = await Promise.all([onChainPromise, firestorePromise]);

      const baseTxs = fsData ? fsData.fbTxs : localTxs;
      const mergedTxs = baseTxs.filter(tx => !delIds.has(tx.id) && !delIds.has(tx.hash));
      
      onChainTxs.forEach((ocTx) => {
        if (!delIds.has(ocTx.id) && !delIds.has(ocTx.hash) && !mergedTxs.some((tx) => tx.hash === ocTx.hash)) {
          mergedTxs.push(ocTx);
        }
      });
      mergedTxs.sort((a, b) => b.date.localeCompare(a.date));
      
      setTransactions(mergedTxs);
      
      if (fsData) {
        setSips(fsData.fbSips);
        setReceivedGifts(fsData.fbGifts);
      }
      
      console.log("Successfully synchronized user history from parallel query feeds.");
    } catch (err: any) {
      console.warn("loadUserHistory parallel sync failed:", err);
    } finally {
      setHistoryLoaded(true);
    }
  };

  const refreshAllData = async (silent = true) => {
    if (!walletConnected || !stellarAddress) return;
    
    // 1. Fetch balances
    await fetchAccountBalances(stellarAddress, networkMode, silent);
    
    // 2. Fetch history
    if (auth.currentUser) {
      await loadUserHistory(auth.currentUser.uid, stellarAddress, networkMode);
    } else {
      const storedDeleted = localStorage.getItem(`glintfi_deleted_txs_${stellarAddress}_${networkMode}`);
      const localDeleted: string[] = storedDeleted ? JSON.parse(storedDeleted) : [];
      const delIds = new Set<string>(localDeleted);
      setDeletedTxIds(delIds);

      const storedTxs = localStorage.getItem(`glintfi_txs_${stellarAddress}_${networkMode}`);
      const localTxs: TransactionRecord[] = storedTxs ? JSON.parse(storedTxs) : [];
      
      try {
        const onChainTxs = await fetchOnChainHistory(stellarAddress, networkMode);
        const mergedTxs = localTxs.filter(tx => !delIds.has(tx.id) && !delIds.has(tx.hash));
        onChainTxs.forEach((ocTx) => {
          if (!delIds.has(ocTx.id) && !delIds.has(ocTx.hash) && !mergedTxs.some((tx) => tx.hash === ocTx.hash)) {
            mergedTxs.push(ocTx);
          }
        });
        mergedTxs.sort((a, b) => b.date.localeCompare(a.date));
        setTransactions(mergedTxs);
      } catch (err) {
        setTransactions(localTxs.filter(tx => !delIds.has(tx.id) && !delIds.has(tx.hash)));
      }
    }
  };

  // Save transaction to Firestore (non-blocking)
  const saveTransactionToFirestore = async (tx: TransactionRecord) => {
    if (auth.currentUser && walletConnected && stellarAddress) {
      try {
        const txDocRef = doc(db, 'users', auth.currentUser.uid, 'transactions', tx.id);
        await setDoc(txDocRef, {
          ...tx,
          stellarAddress,
          networkMode,
          timestamp: Date.now()
        });
      } catch (err: any) {
        console.warn("Failed to save transaction to Firestore:", err);
      }
    }
  };

  // Save SIP to Firestore
  const saveSipToFirestore = async (sip: SipSchedule) => {
    if (auth.currentUser && walletConnected && stellarAddress) {
      try {
        const sipDocRef = doc(db, 'users', auth.currentUser.uid, 'sips', sip.id);
        await setDoc(sipDocRef, {
          ...sip,
          stellarAddress,
          networkMode,
          timestamp: Date.now()
        });
      } catch (err: any) {
        console.warn("Failed to save SIP to Firestore:", err);
      }
    }
  };

  // Delete SIP from Firestore
  const deleteSipFromFirestore = async (sipId: string) => {
    if (auth.currentUser) {
      try {
        const sipDocRef = doc(db, 'users', auth.currentUser.uid, 'sips', sipId);
        await deleteDoc(sipDocRef);
      } catch (err: any) {
        console.warn("Failed to delete SIP from Firestore:", err);
      }
    }
  };

  // Auto-connect wallet and listen to Firebase auth changes on page load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fallbackName = user.email ? user.email.split('@')[0] : 'User';
        const formattedFallbackName = fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);
        setCurrentUser({
          name: user.displayName || formattedFallbackName,
          email: user.email || ''
        });
      } else {
        setCurrentUser(null);
      }
    });

    const savedAddress = localStorage.getItem('glintfi_stellar_address');
    const savedType = localStorage.getItem('glintfi_connection_type');
    if (savedAddress && savedType) {
      setStellarAddress(savedAddress);
      setConnectionType(savedType as 'freighter' | 'manual');
      setWalletConnected(true);
    }

    return () => unsubscribe();
  }, []);

  // Load persisted history when address, network mode, or currentUser changes
  useEffect(() => {
    setHistoryLoaded(false);
    if (walletConnected && stellarAddress) {
      if (auth.currentUser) {
        loadUserHistory(auth.currentUser.uid, stellarAddress, networkMode);
      } else {
        const storedDeleted = localStorage.getItem(`glintfi_deleted_txs_${stellarAddress}_${networkMode}`);
        const localDeleted: string[] = storedDeleted ? JSON.parse(storedDeleted) : [];
        const delIds = new Set<string>(localDeleted);
        setDeletedTxIds(delIds);

        const storedTxs = localStorage.getItem(`glintfi_txs_${stellarAddress}_${networkMode}`);
        const localTxs: TransactionRecord[] = storedTxs ? JSON.parse(storedTxs) : [];
        
        fetchOnChainHistory(stellarAddress, networkMode).then((onChainTxs) => {
          const mergedTxs = localTxs.filter(tx => !delIds.has(tx.id) && !delIds.has(tx.hash));
          onChainTxs.forEach((ocTx) => {
            if (!delIds.has(ocTx.id) && !delIds.has(ocTx.hash) && !mergedTxs.some((tx) => tx.hash === ocTx.hash)) {
              mergedTxs.push(ocTx);
            }
          });
          mergedTxs.sort((a, b) => b.date.localeCompare(a.date));
          setTransactions(mergedTxs);
          setHistoryLoaded(true);
        }).catch(() => {
          setTransactions(localTxs.filter(tx => !delIds.has(tx.id) && !delIds.has(tx.hash)));
          setHistoryLoaded(true);
        });

        const storedSips = localStorage.getItem(`glintfi_sips_${stellarAddress}_${networkMode}`);
        const storedGifts = localStorage.getItem(`glintfi_gifts_${stellarAddress}_${networkMode}`);
        setSips(storedSips ? JSON.parse(storedSips) : []);
        setReceivedGifts(storedGifts ? JSON.parse(storedGifts) : []);
      }
    } else {
      setTransactions([]);
      setSips([]);
      setReceivedGifts([]);
      setHistoryLoaded(false);
    }
  }, [stellarAddress, networkMode, walletConnected, currentUser]);

  // Poll Horizon API and database every 8 seconds to automatically update balances and history
  useEffect(() => {
    if (!walletConnected || !stellarAddress) return;

    // Run first time shortly after mount/change
    const initialTimeout = setTimeout(() => {
      refreshAllData(true);
    }, 1000);

    const interval = setInterval(() => {
      refreshAllData(true);
    }, 8000); // 8 seconds polling

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [stellarAddress, networkMode, walletConnected, currentUser]);

  // Real-time Event Integration: SSE stream to listen to live ledger payments/invocations
  useEffect(() => {
    if (!walletConnected || !stellarAddress) return;

    console.log(`Setting up real-time SSE payment stream for: ${stellarAddress}`);
    const horizonEndpoint = networkMode === 'public' 
      ? 'https://horizon.stellar.org'
      : 'https://horizon-testnet.stellar.org';
      
    const server = new Horizon.Server(horizonEndpoint);
    
    let closeStream: (() => void) | null = null;
    
    try {
      closeStream = server.payments()
        .forAccount(stellarAddress)
        .cursor('now')
        .stream({
          onmessage: (payment: any) => {
            console.log('Real-time ledger event received:', payment);
            addToast('On-Chain Event Received', 'Ledger updated with new payment event.', 'info');
            // Silent refresh of balances & history
            fetchAccountBalances(stellarAddress, networkMode, true);
            loadUserHistory(auth.currentUser?.uid || 'anonymous', stellarAddress, networkMode);
          },
          onerror: (err: any) => {
            console.warn('SSE stream connection re-establishing...', err);
          }
        });
    } catch (err) {
      console.error("Failed to initialize SSE stream:", err);
    }

    return () => {
      if (closeStream) {
        console.log("Closing SSE stream...");
        closeStream();
      }
    };
  }, [stellarAddress, networkMode, walletConnected]);

  // Persist transaction history
  useEffect(() => {
    if (walletConnected && stellarAddress && historyLoaded) {
      localStorage.setItem(`glintfi_txs_${stellarAddress}_${networkMode}`, JSON.stringify(transactions));
    }
  }, [transactions, stellarAddress, networkMode, walletConnected, historyLoaded]);

  // Persist Gullak active SIPs
  useEffect(() => {
    if (walletConnected && stellarAddress && historyLoaded) {
      localStorage.setItem(`glintfi_sips_${stellarAddress}_${networkMode}`, JSON.stringify(sips));
    }
  }, [sips, stellarAddress, networkMode, walletConnected, historyLoaded]);

  // Persist Received Gifts
  useEffect(() => {
    if (walletConnected && stellarAddress && historyLoaded) {
      localStorage.setItem(`glintfi_gifts_${stellarAddress}_${networkMode}`, JSON.stringify(receivedGifts));
    }
  }, [receivedGifts, stellarAddress, networkMode, walletConnected, historyLoaded]);

  // ---------------------------------------------------------
  // Albedo Signer & Connection helpers (using @albedo-link/intent SDK)
  const signTransaction = async (xdr: string, opts: { networkPassphrase: string }): Promise<{ signedTxXdr: string; error?: string }> => {
    if (connectionType === 'freighter') {
      return freighterSignTransaction(xdr, opts) as any;
    } else if (connectionType === 'albedo') {
      const isTestnet = opts.networkPassphrase === Networks.TESTNET;
      try {
        const res = await albedo.tx({
          xdr,
          network: isTestnet ? 'testnet' : 'public'
        });
        if (res && res.signed_envelope_xdr) {
          return { signedTxXdr: res.signed_envelope_xdr };
        } else {
          return { signedTxXdr: '', error: 'Failed to receive signed transaction envelope.' };
        }
      } catch (err: any) {
        console.warn('Albedo signing error:', err);
        return { signedTxXdr: '', error: err.message || 'User cancelled signing.' };
      }
    } else {
      return { error: 'No wallet connected.', signedTxXdr: '' };
    }
  };

  const connectAlbedo = async () => {
    try {
      const res = await albedo.publicKey({
        token: 'glintfi_auth_token'
      });
      
      if (res && res.pubkey) {
        const connectedAddress = res.pubkey;
        setStellarAddress(connectedAddress);
        setConnectionType('albedo');
        setWalletConnected(true);
        localStorage.setItem('glintfi_stellar_address', connectedAddress);
        localStorage.setItem('glintfi_connection_type', 'albedo');
        setWalletModalOpen(false);
        addToast('Wallet Connected', 'Connected via Albedo.', 'success');

        fetchAccountBalances(connectedAddress, networkMode, true);
        if (auth.currentUser) {
          loadUserHistory(auth.currentUser.uid, connectedAddress, networkMode);
        } else {
          const storedDeleted = localStorage.getItem(`glintfi_deleted_txs_${connectedAddress}_${networkMode}`);
          const localDeleted: string[] = storedDeleted ? JSON.parse(storedDeleted) : [];
          const delIds = new Set<string>(localDeleted);
          setDeletedTxIds(delIds);

          const storedTxs = localStorage.getItem(`glintfi_txs_${connectedAddress}_${networkMode}`);
          const localTxs: TransactionRecord[] = storedTxs ? JSON.parse(storedTxs) : [];
          const initialMerged = localTxs.filter(tx => !delIds.has(tx.id) && !delIds.has(tx.hash));
          setTransactions(initialMerged);
          setHistoryLoaded(true);
        }
      }
    } catch (err: any) {
      console.warn('Albedo connection error:', err);
      addToast('Albedo Connection Failed', err.message || 'Login request rejected.', 'warning');
    }
  };

  const connectFreighter = async () => {
    try {
      const hasWindowStellar = !!(window as any).stellar;
      const hasWindowFreighter = !!(window as any).freighter;
      
      let isConnectedStatus = false;
      try {
        const connectionCheck = await isConnected();
        isConnectedStatus = !!connectionCheck?.isConnected;
      } catch (e) {
        console.warn('Freighter isConnected check failed:', e);
      }

      if (!hasWindowStellar && !hasWindowFreighter && !isConnectedStatus) {
        addToast('Freighter Not Installed', 'Opening Freighter download page. Please install the extension in Edge to connect.', 'warning');
        window.open('https://www.freighter.app/', '_blank');
        return;
      }
      
      const addressRes = await requestAccess();
      if (addressRes && addressRes.address) {
        const connectedAddress = addressRes.address;
        setStellarAddress(connectedAddress);
        setWalletConnected(true);
        setConnectionType('freighter');
        localStorage.setItem('glintfi_stellar_address', connectedAddress);
        localStorage.setItem('glintfi_connection_type', 'freighter');
        setWalletModalOpen(false);
        addToast('Wallet Connected', 'Connected via Freighter.', 'success');

        // Force fetch balance and history immediately to bypass React state batching delay
        fetchAccountBalances(connectedAddress, networkMode, true);
        if (auth.currentUser) {
          loadUserHistory(auth.currentUser.uid, connectedAddress, networkMode);
        } else {
          const storedDeleted = localStorage.getItem(`glintfi_deleted_txs_${connectedAddress}_${networkMode}`);
          const localDeleted: string[] = storedDeleted ? JSON.parse(storedDeleted) : [];
          const delIds = new Set<string>(localDeleted);
          setDeletedTxIds(delIds);

          const storedTxs = localStorage.getItem(`glintfi_txs_${connectedAddress}_${networkMode}`);
          const localTxs: TransactionRecord[] = storedTxs ? JSON.parse(storedTxs) : [];
          
          fetchOnChainHistory(connectedAddress, networkMode).then((onChainTxs) => {
            const mergedTxs = localTxs.filter(tx => !delIds.has(tx.id) && !delIds.has(tx.hash));
            onChainTxs.forEach((ocTx) => {
              if (!delIds.has(ocTx.id) && !delIds.has(ocTx.hash) && !mergedTxs.some((tx) => tx.hash === ocTx.hash)) {
                mergedTxs.push(ocTx);
              }
            });
            mergedTxs.sort((a, b) => b.date.localeCompare(a.date));
            setTransactions(mergedTxs);
            setHistoryLoaded(true);
          }).catch(() => {
            setTransactions(localTxs.filter(tx => !delIds.has(tx.id) && !delIds.has(tx.hash)));
            setHistoryLoaded(true);
          });
        }
      } else if (addressRes && addressRes.error) {
        throw new Error(addressRes.error);
      }
    } catch (err: any) {
      console.warn('Freighter connect error:', err);
      addToast('Freighter Connection Failed', err.message || 'Login request rejected.', 'warning');
    }
  };

  const connectManual = (e: React.FormEvent) => {
    e.preventDefault();
    const address = manualAddressInput.trim();
    if (!address.startsWith('G') || address.length !== 56) {
      addToast('Invalid Stellar Key', 'Address must start with "G" and be 56 characters long.', 'warning');
      return;
    }
    setStellarAddress(address);
    setWalletConnected(true);
    setConnectionType('manual');
    localStorage.setItem('glintfi_stellar_address', address);
    localStorage.setItem('glintfi_connection_type', 'manual');
    setWalletModalOpen(false);
    setManualAddressInput('');
    addToast('Address Loaded', 'Viewing read-only ledger balances.', 'success');

    // Force fetch balance and history immediately to bypass React state batching delay
    fetchAccountBalances(address, networkMode, true);
    if (auth.currentUser) {
      loadUserHistory(auth.currentUser.uid, address, networkMode);
    } else {
      const storedDeleted = localStorage.getItem(`glintfi_deleted_txs_${address}_${networkMode}`);
      const localDeleted: string[] = storedDeleted ? JSON.parse(storedDeleted) : [];
      const delIds = new Set<string>(localDeleted);
      setDeletedTxIds(delIds);

      const storedTxs = localStorage.getItem(`glintfi_txs_${address}_${networkMode}`);
      const localTxs: TransactionRecord[] = storedTxs ? JSON.parse(storedTxs) : [];
      
      fetchOnChainHistory(address, networkMode).then((onChainTxs) => {
        const mergedTxs = localTxs.filter(tx => !delIds.has(tx.id) && !delIds.has(tx.hash));
        onChainTxs.forEach((ocTx) => {
          if (!delIds.has(ocTx.id) && !delIds.has(ocTx.hash) && !mergedTxs.some((tx) => tx.hash === ocTx.hash)) {
            mergedTxs.push(ocTx);
          }
        });
        mergedTxs.sort((a, b) => b.date.localeCompare(a.date));
        setTransactions(mergedTxs);
        setHistoryLoaded(true);
      }).catch(() => {
        setTransactions(localTxs.filter(tx => !delIds.has(tx.id) && !delIds.has(tx.hash)));
        setHistoryLoaded(true);
      });
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setStellarAddress('');
    setConnectionType(null);
    localStorage.removeItem('glintfi_stellar_address');
    localStorage.removeItem('glintfi_connection_type');
    setBalances({
      XLM: 0.00,
      USDC: 0.00,
      sXAU: 0.00,
      sXAG: 0.00
    });
    setTransactions([]);
    setReceivedGifts([]);
    addToast('Disconnected', 'Cleared wallet connection.', 'info');
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = authName.trim();
    const email = authEmail.trim();
    const password = authPassword;
    const confirmPassword = authConfirmPassword;

    if (!name || !email || !password || !confirmPassword) {
      addToast('Validation Error', 'Please fill in all fields.', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      addToast('Password Mismatch', 'Passwords do not match.', 'warning');
      return;
    }

    if (password.length < 6) {
      addToast('Password Too Short', 'Password must be at least 6 characters.', 'warning');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await signOut(auth);
      
      setAuthName('');
      setAuthEmail('');
      setAuthPassword('');
      setAuthConfirmPassword('');
      setAuthMode('signin');
      addToast('Account Created!', 'Account set up successfully. Please sign in.', 'success');
    } catch (err: any) {
      console.error(err);
      let errorMsg = err.message || 'An error occurred during registration.';
      if (err.code === 'auth/email-already-in-use') {
        errorMsg = 'This email address is already in use.';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid email address.';
      } else if (err.code === 'auth/weak-password') {
        errorMsg = 'The password is too weak.';
      }
      addToast('Registration Error', errorMsg, 'warning');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = authEmail.trim();
    const password = authPassword;

    if (!email || !password) {
      addToast('Validation Error', 'Please fill in all fields.', 'warning');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthEmail('');
      setAuthPassword('');
      addToast('Welcome to GlintFi', 'Successfully signed in.', 'success');
    } catch (err: any) {
      console.error(err);
      let errorMsg = err.message || 'An error occurred during authentication.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMsg = 'Invalid email or password.';
      }
      addToast('Authentication Failed', errorMsg, 'warning');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      disconnectWallet();
      addToast('Logged Out', 'Successfully logged out of your session.', 'info');
    } catch (err: any) {
      addToast('Error Logging Out', err.message || 'An error occurred during logout.', 'warning');
    }
  };

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = editNameVal.trim();
    if (!name) {
      addToast('Validation Error', 'Display name cannot be empty.', 'warning');
      return;
    }
    
    setIsSavingName(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
        setCurrentUser(prev => prev ? { ...prev, name } : null);
        setIsEditingName(false);
        addToast('Profile Updated', 'Your display name has been updated.', 'success');
      }
    } catch (err: any) {
      console.error(err);
      addToast('Update Failed', err.message || 'Failed to update display name.', 'warning');
    } finally {
      setIsSavingName(false);
    }
  };

  const handleDeleteTransaction = async (txId: string) => {
    const txToDelete = transactions.find(t => t.id === txId);
    const txHash = txToDelete?.hash;

    setTransactions(prev => prev.filter(tx => tx.id !== txId));
    setDeletedTxIds(prev => {
      const next = new Set(prev);
      next.add(txId);
      if (txHash) next.add(txHash);
      return next;
    });
    
    // ALWAYS update local storage so it is immediately updated in local session, bypassing any delay
    if (stellarAddress) {
      const storedDeleted = localStorage.getItem(`glintfi_deleted_txs_${stellarAddress}_${networkMode}`);
      const localDeleted: string[] = storedDeleted ? JSON.parse(storedDeleted) : [];
      if (!localDeleted.includes(txId)) localDeleted.push(txId);
      if (txHash && !localDeleted.includes(txHash)) localDeleted.push(txHash);
      localStorage.setItem(`glintfi_deleted_txs_${stellarAddress}_${networkMode}`, JSON.stringify(localDeleted));
    }

    if (auth.currentUser) {
      try {
        const txDocRef = doc(db, 'users', auth.currentUser.uid, 'transactions', txId);
        await deleteDoc(txDocRef);

        const delDocRef = doc(db, 'users', auth.currentUser.uid, 'deletedTransactions', txId);
        await setDoc(delDocRef, {
          id: txId,
          hash: txHash || '',
          timestamp: Date.now()
        });

        addToast('Transaction Deleted', 'The transaction has been deleted successfully.', 'success');
      } catch (err: any) {
        console.error("Failed to delete transaction from Firestore:", err);
        addToast('Delete Sync Error', 'Saved locally, but failed to sync to cloud database.', 'warning');
      }
    } else {
      addToast('Transaction Removed', 'The transaction has been removed locally.', 'info');
    }
  };

  // ---------------------------------------------------------
  // Buy / Swap Quick Redirect Helper
  // ---------------------------------------------------------
  const handleQuickBuy = (asset: 'sXAU' | 'sXAG') => {
    setCurrentView('trade');
    setActiveTab('swap');
    setSwapTo(asset);
    
    // Default from asset: USDC if balance exists, otherwise XLM
    if (balances.USDC > 0) {
      setSwapFrom('USDC');
    } else {
      setSwapFrom('XLM');
    }

    // Scroll smoothly to quick action panel
    setTimeout(() => {
      const panel = document.getElementById('quick-actions-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
    
    addToast('Buy Configured', `Ready to exchange for ${asset === 'sXAU' ? 'Gold' : 'Silver'}.`, 'info');
  };

  // ---------------------------------------------------------
  // Form Calculators
  // ---------------------------------------------------------

  const getFractionDigits = (asset: AssetCode) => {
    if (asset === 'XLM') return 7;
    if (asset === 'sXAU') return 4;
    return 2; // USDC and sXAG
  };

  const swapConversionRate = useMemo(() => {
    const fromPrice = livePrices[swapFrom];
    const toPrice = livePrices[swapTo];
    return fromPrice / toPrice;
  }, [swapFrom, swapTo, livePrices]);

  const swapEstimatedOutput = useMemo(() => {
    const amt = parseFloat(swapAmount);
    if (isNaN(amt) || amt <= 0) return '0.0000';
    return (amt * swapConversionRate).toFixed(getFractionDigits(swapTo));
  }, [swapAmount, swapConversionRate, swapTo]);

  const loanLimit = useMemo(() => {
    const amt = parseFloat(loanCollateralAmt);
    if (isNaN(amt) || amt <= 0) return 0;
    return amt * livePrices[loanCollateralAsset] * 0.60;
  }, [loanCollateralAmt, loanCollateralAsset, livePrices]);

  // ---------------------------------------------------------
  // SVG Candlestick Plot Coordinates
  // ---------------------------------------------------------
  const activeCandles = useMemo(() => {
    const baseSeries = MOCK_BASE_DATA[chartAsset][chartTimeframe];
    const livePrice = livePrices[chartAsset];
    const baseLastClose = baseSeries[baseSeries.length - 1].close;
    const scaleFactor = livePrice / baseLastClose;

    return baseSeries.map(c => ({
      ...c,
      open: c.open * scaleFactor,
      high: c.high * scaleFactor,
      low: c.low * scaleFactor,
      close: c.close * scaleFactor
    }));
  }, [chartAsset, chartTimeframe, livePrices]);

  const currentCandle = hoveredCandle || activeCandles[activeCandles.length - 1];

  const svgCoords = useMemo(() => {
    const width = 600;
    const height = 240;
    const paddingLeft = 40;
    const paddingRight = 60;
    const paddingTop = 20;
    const paddingBottom = 30;

    let maxPrice = -Infinity;
    let minPrice = Infinity;
    activeCandles.forEach(c => {
      if (c.high > maxPrice) maxPrice = c.high;
      if (c.low < minPrice) minPrice = c.low;
    });

    const range = maxPrice - minPrice;
    maxPrice = maxPrice + range * 0.15;
    minPrice = minPrice - range * 0.15;

    const plotWidth = width - paddingLeft - paddingRight;
    const plotHeight = height - paddingTop - paddingBottom;
    const candleCount = activeCandles.length;
    const spacePerCandle = plotWidth / candleCount;
    const candleWidth = spacePerCandle * 0.65;

    const scaleY = (price: number) => {
      return height - paddingBottom - ((price - minPrice) / (maxPrice - minPrice)) * plotHeight;
    };

    const scaleX = (index: number) => {
      return paddingLeft + index * spacePerCandle + spacePerCandle / 2;
    };

    return activeCandles.map((c, i) => {
      const cx = scaleX(i);
      const yHigh = scaleY(c.high);
      const yLow = scaleY(c.low);
      const yOpen = scaleY(c.open);
      const yClose = scaleY(c.close);
      const isBullish = c.close >= c.open;

      return {
        cx,
        yHigh,
        yLow,
        yOpen,
        yClose,
        yMinBody: Math.min(yOpen, yClose),
        bodyHeight: Math.max(Math.abs(yClose - yOpen), 2),
        isBullish,
        candleWidth,
        raw: c,
        xLabel: c.time
      };
    });
  }, [activeCandles]);

  const yGridTicks = useMemo(() => {
    let maxPrice = -Infinity;
    let minPrice = Infinity;
    activeCandles.forEach(c => {
      if (c.high > maxPrice) maxPrice = c.high;
      if (c.low < minPrice) minPrice = c.low;
    });
    const range = maxPrice - minPrice;
    maxPrice = maxPrice + range * 0.15;
    minPrice = minPrice - range * 0.15;

    return [
      minPrice + range * 0.15,
      minPrice + range * 0.5,
      minPrice + range * 0.85
    ];
  }, [activeCandles]);

  // ---------------------------------------------------------
  // Form Submission Handlers
  // ---------------------------------------------------------
  
  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletConnected) {
      addToast('Wallet Not Connected', 'Connect your wallet to perform transactions.', 'warning');
      return;
    }

    const amt = parseFloat(swapAmount);
    if (isNaN(amt) || amt <= 0) {
      addToast('Invalid Amount', 'Enter a valid amount to exchange.', 'warning');
      return;
    }

    if (balances[swapFrom] < amt) {
      addToast('Insufficient Funds', `You need more ${swapFrom} to execute this swap.`, 'warning');
      return;
    }

    const outputAmt = parseFloat(swapEstimatedOutput);

    // Verify trustlines for non-native assets
    if (swapFrom !== 'XLM' && !trustlines[swapFrom as 'USDC' | 'sXAU' | 'sXAG']) {
      addToast('Trustline Required', `Please activate the ${swapFrom} asset on your dashboard before swapping it.`, 'warning');
      return;
    }
    if (swapTo !== 'XLM' && !trustlines[swapTo as 'USDC' | 'sXAU' | 'sXAG']) {
      addToast('Trustline Required', `Please activate the ${swapTo} asset on your dashboard before swapping it.`, 'warning');
      return;
    }

    // Check if Freighter or manual connection
    if (connectionType === 'manual') {
      addToast('Read-Only Address', 'Manual address connection is read-only. Connect with Freighter or Albedo to execute live on-chain swaps.', 'warning');
      return;
    }

    setIsSwapping(true);
    addToast('Initiating Swap...', 'Building Stellar DEX payment transaction.', 'info');

    try {
      const isTestnet = networkMode === 'testnet';
      const horizonEndpoint = isTestnet 
        ? 'https://horizon-testnet.stellar.org'
        : 'https://horizon.stellar.org';
      const server = new Horizon.Server(horizonEndpoint);

      const userAcc = await server.loadAccount(stellarAddress);
      
      const config = isTestnet ? CANONICAL_ISSUERS.testnet : CANONICAL_ISSUERS.public;
      const distributorAddress = config.distributor;
      const distributorSecret = config.distributorSecret;

      if (!distributorSecret) {
        throw new Error('On-chain public swaps are not configured. Swaps are currently supported on Testnet.');
      }

      // Build assets
      const getAsset = (code: AssetCode) => {
        if (code === 'XLM') return Asset.native();
        const issuer = config[code as 'USDC' | 'sXAU' | 'sXAG'];
        return new Asset(code, issuer);
      };

      const assetFrom = getAsset(swapFrom);
      const assetTo = getAsset(swapTo);

      // Construct a multi-op transaction
      const tx = new TransactionBuilder(userAcc, {
        fee: '20000', // Double fee for 2 operations
        networkPassphrase: isTestnet ? Networks.TESTNET : Networks.PUBLIC
      })
        // Op 1: User sends source asset to distributor
        .addOperation(Operation.payment({
          destination: distributorAddress,
          asset: assetFrom,
          amount: amt.toFixed(getFractionDigits(swapFrom))
        }))
        // Op 2: Distributor sends destination asset to user (Source is distributor)
        .addOperation(Operation.payment({
          source: distributorAddress,
          destination: stellarAddress,
          asset: assetTo,
          amount: outputAmt.toFixed(getFractionDigits(swapTo))
        }))
        .setTimeout(0)
        .build();

      const xdr = tx.toXDR();
      addToast('Awaiting Signature...', 'Please sign the swap transaction in your connected wallet.', 'info');
      
      const signResult = await signTransaction(xdr, {
        networkPassphrase: isTestnet ? Networks.TESTNET : Networks.PUBLIC
      });

      if (signResult.error) {
        throw new Error(signResult.error);
      }

      // Deserialize transaction to add distributor signature
      const finalTx = TransactionBuilder.fromXDR(signResult.signedTxXdr, isTestnet ? Networks.TESTNET : Networks.PUBLIC);
      const distributorKeypair = Keypair.fromSecret(distributorSecret);
      finalTx.sign(distributorKeypair);

      addToast('Submitting Swap...', 'Sending transaction to Stellar Horizon.', 'info');
      const result = await server.submitTransaction(finalTx);
      console.log('Swap transaction completed successfully:', result);

      const txHash = result.hash;

      const newTx: TransactionRecord = {
        id: 'tx-' + Date.now(),
        type: 'Swap',
        description: `Exchanged ${amt} ${swapFrom} for ${swapTo}`,
        amount: outputAmt.toFixed(getFractionDigits(swapTo)),
        asset: swapTo,
        date: formatLocalTime(new Date()),
        hash: txHash,
        status: 'Success'
      };

      setTransactions(prev => [newTx, ...prev]);
      saveTransactionToFirestore(newTx);

      setActiveModal({
        type: 'success',
        title: 'Swap Order Completed!',
        details: (
          <div className="space-y-3 text-left">
            <p className="text-slate-350 text-xs font-sans leading-relaxed">This exchange was successfully settled directly on the Stellar blockchain testnet. Balances have been updated.</p>
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-1.5 font-mono text-[10px]">
              <div className="flex justify-between"><span className="text-slate-500">Exchanged:</span> <span className="text-slate-100 font-semibold">{amt} {swapFrom}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Received:</span> <span className="text-amber-400 font-semibold">+{outputAmt.toFixed(getFractionDigits(swapTo))} {swapTo}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Status:</span> <span className="text-emerald-400 font-semibold">On-Chain Settled</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Stellar Hash:</span> <a href={networkMode === 'public' ? `https://stellar.expert/explorer/public/tx/${txHash}` : `https://stellar.expert/explorer/testnet/tx/${txHash}`} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">{txHash.slice(0, 8)}...{txHash.slice(-8)}</a></div>
            </div>
          </div>
        )
      });

      setSwapAmount('');
      // Silent refresh balances
      fetchAccountBalances(stellarAddress, networkMode, true);
    } catch (err: any) {
      console.error('On-chain swap transaction failed:', err);
      addToast('Transaction Failed', err.message || 'On-chain swap failed or was rejected.', 'warning');
    } finally {
      setIsSwapping(false);
    }
  };

  const handleGullakSetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletConnected) {
      addToast('Wallet Not Connected', 'Please link your Stellar account.', 'warning');
      return;
    }

    const amt = parseFloat(gullakAmount);
    if (isNaN(amt) || amt <= 0) {
      addToast('Invalid Amount', 'Please set a valid quantity.', 'warning');
      return;
    }

    // Verify trustlines for non-native assets in SIP
    if (gullakSource !== 'XLM' && !trustlines[gullakSource as 'USDC']) {
      addToast('Trustline Required', `Please activate the ${gullakSource} asset on your dashboard before scheduling a SIP with it.`, 'warning');
      return;
    }
    if (!trustlines[gullakAsset as 'sXAU' | 'sXAG']) {
      addToast('Trustline Required', `Please activate the ${gullakAsset} asset on your dashboard before scheduling a SIP for it.`, 'warning');
      return;
    }

    const newSip: SipSchedule = {
      id: Date.now().toString(),
      asset: gullakAsset,
      amount: amt,
      fundingAsset: gullakSource,
      frequency: gullakFreq,
      createdAt: new Date().toLocaleDateString('sv-SE'),
    };

    setSips(prev => [newSip, ...prev]);
    saveSipToFirestore(newSip);
    setGullakAmount('');
    addToast('Gullak Schedule Activated', `Stacking ${amt} ${gullakSource} into ${gullakAsset} ${gullakFreq.toLowerCase()}.`, 'success');
  };

  const deleteSip = (id: string) => {
    setSips(prev => prev.filter(s => s.id !== id));
    deleteSipFromFirestore(id);
    addToast('Schedule Removed', 'Recurring savings plan cancelled.', 'info');
  };

  const handleLoan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletConnected) {
      addToast('Wallet Not Connected', 'Wallet required to lock collateral.', 'warning');
      return;
    }

    const colAmt = parseFloat(loanCollateralAmt);
    if (isNaN(colAmt) || colAmt <= 0) {
      addToast('Invalid Collateral', 'Please input collateral metal weight.', 'warning');
      return;
    }

    if (!trustlines[loanCollateralAsset as 'sXAU' | 'sXAG']) {
      addToast('Trustline Required', `Please activate the collateral asset ${loanCollateralAsset} on your dashboard first.`, 'warning');
      return;
    }
    if (!trustlines.USDC) {
      addToast('Trustline Required', 'Please activate the USDC asset on your dashboard first to receive the loan.', 'warning');
      return;
    }

    if (balances[loanCollateralAsset] < colAmt) {
      addToast('Insufficient Collateral', `Your wallet does not hold ${colAmt} ${loanCollateralAsset}.`, 'warning');
      return;
    }

    const loanValue = loanLimit;
    const mockHash = 'tx_' + Math.random().toString(16).slice(2, 10);

    setBalances(prev => ({
      ...prev,
      [loanCollateralAsset]: parseFloat((prev[loanCollateralAsset] - colAmt).toFixed(4)),
      USDC: parseFloat((prev.USDC + loanValue).toFixed(2))
    }));

    const newTx: TransactionRecord = {
      id: 'tx-' + Date.now(),
      type: 'Loan',
      description: `Locked ${colAmt.toFixed(2)} ${loanCollateralAsset} for loan`,
      amount: loanValue.toFixed(2),
      asset: 'USDC',
      date: formatLocalTime(new Date()),
      hash: mockHash,
      status: 'Success'
    };
    setTransactions(prev => [newTx, ...prev]);
    saveTransactionToFirestore(newTx);

    setActiveModal({
      type: 'success',
      title: 'Decentralized Loan Disbursed',
      details: (
        <div className="space-y-3 text-left">
          <p className="text-slate-350 text-xs">Your collateral is locked in escrow. USDC has been minted and sent to your address.</p>
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-1.5 font-mono text-xs">
            <div className="flex justify-between"><span className="text-slate-500">Locked Collateral:</span> <span className="text-slate-100 font-semibold">{colAmt} {loanCollateralAsset}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Disbursed Principal:</span> <span className="text-emerald-400 font-semibold">+{loanValue.toFixed(2)} USDC</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Interest APY:</span> <span className="text-amber-400">4.5% Fixed APY</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Liquidation Price:</span> <span className="text-rose-400 font-semibold">${(livePrices[loanCollateralAsset] * 0.75).toFixed(2)} / oz</span></div>
          </div>
        </div>
      )
    });
    setLoanCollateralAmt('');
  };

  const handleSendShagun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletConnected || !stellarAddress) {
      addToast('Wallet Not Connected', 'Please connect your Stellar wallet.', 'warning');
      return;
    }

    if (!shagunAddress.startsWith('G') || shagunAddress.length !== 56) {
      addToast('Invalid Address', 'Public recipient key must be 56 characters starting with G.', 'warning');
      return;
    }

    const amt = parseFloat(shagunAmount);
    if (isNaN(amt) || amt <= 0) {
      addToast('Invalid Amount', 'Please set a valid quantity.', 'warning');
      return;
    }

    if (balances[shagunAsset] < amt) {
      addToast('Insufficient Funds', `You hold less than ${amt} ${shagunAsset} in this account.`, 'warning');
      return;
    }

    let mockHash = 'tx_' + Math.random().toString(16).slice(2, 10);
    const isGiftType = sendGiftType === 'gift';
    let isRealOnChain = false;

    if (connectionType === 'freighter' || connectionType === 'albedo') {
      setShagunTxStatus('simulating');
      setShagunTxHash('');
      addToast('Simulating Soroban Transaction...', `Preparing smart contract call for ${shagunAsset} transfer.`, 'info');

      try {
        const isTestnet = networkMode === 'testnet';
        const rpcServer = new rpc.Server('https://soroban-testnet.stellar.org');
        
        let targetAsset: Asset;
        if (shagunAsset === 'XLM') {
          targetAsset = Asset.native();
        } else {
          const config = networkMode === 'testnet' ? CANONICAL_ISSUERS.testnet : CANONICAL_ISSUERS.public;
          const issuer = config[shagunAsset as 'USDC' | 'sXAU' | 'sXAG'] || assetIssuers[shagunAsset];
          if (!issuer) {
            throw new Error(`Trustline for ${shagunAsset} not found. Please activate this asset on the dashboard.`);
          }
          targetAsset = new Asset(shagunAsset, issuer);
        }

        const networkPassphrase = isTestnet ? Networks.TESTNET : Networks.PUBLIC;
        const contractId = targetAsset.contractId(networkPassphrase);
        const contract = new Contract(contractId);

        const amountDecimals = 10000000;
        const amountBigInt = BigInt(Math.round(amt * amountDecimals));

        const op = contract.call(
          'transfer',
          nativeToScVal(stellarAddress, { type: 'address' }),
          nativeToScVal(shagunAddress, { type: 'address' }),
          nativeToScVal(amountBigInt, { type: 'i128' })
        );

        const horizonServer = new Horizon.Server(isTestnet ? 'https://horizon-testnet.stellar.org' : 'https://horizon.stellar.org');
        const sourceAccount = await horizonServer.loadAccount(stellarAddress);

        const tx = new TransactionBuilder(sourceAccount, {
          fee: '20000',
          networkPassphrase
        })
          .addOperation(op)
          .setTimeout(0)
          .build();

        const simulationResult = (await rpcServer.simulateTransaction(tx)) as any;

        if (simulationResult.error) {
          throw new Error(`Simulation failed: ${simulationResult.error}`);
        }

        const assembledTx = rpc.assembleTransaction(tx, simulationResult).build();

        setShagunTxStatus('signing');
        addToast('Awaiting Signature...', 'Please sign the contract transfer in your connected wallet.', 'info');

        const xdr = assembledTx.toXDR();
        const signResult = await signTransaction(xdr, { networkPassphrase });

        if (signResult.error) {
          throw new Error(`User rejected signing: ${signResult.error}`);
        }

        setShagunTxStatus('submitting');
        addToast('Submitting to Blockchain...', 'Broadcasting signed Soroban invocation transaction.', 'info');

        const signedTx = TransactionBuilder.fromXDR(signResult.signedTxXdr, networkPassphrase);
        const submitResult = await horizonServer.submitTransaction(signedTx);

        if (!submitResult.hash) {
          throw new Error('Transaction rejected by the network.');
        }

        mockHash = submitResult.hash;
        setShagunTxHash(mockHash);
        isRealOnChain = true;
        setShagunTxStatus('success');
        addToast('Transfer Successful!', `Soroban contract successfully transferred ${amt} ${shagunAsset}.`, 'success');

      } catch (err: any) {
        console.error("Soroban transfer invocation failed:", err);
        let errorMsg = err.message || 'Unknown transaction failure.';
        if (errorMsg.includes('User rejected') || errorMsg.includes('declined') || errorMsg.includes('reject')) {
          addToast('Signature Rejected', 'You declined the transaction request inside your wallet.', 'warning');
        } else if (errorMsg.includes('Simulation') || errorMsg.includes('HostError') || errorMsg.includes('Host invocation')) {
          addToast('Soroban Simulation Failed', 'Smart contract execution failed. Make sure the recipient has activated this asset.', 'warning');
        } else {
          addToast('Network RPC Error', 'Could not establish connection to Soroban RPC node.', 'warning');
        }
        setShagunTxStatus('idle');
        return;
      }
    } else {
      mockHash = 'sim_' + Math.random().toString(16).slice(2, 10);
      isRealOnChain = false;
    }
    setBalances(prev => ({
      ...prev,
      [shagunAsset]: parseFloat((prev[shagunAsset] - amt).toFixed(getFractionDigits(shagunAsset)))
    }));

    const newTx: TransactionRecord = {
      id: 'tx-' + Date.now(),
      type: isGiftType ? 'Gift' : 'Transfer',
      description: isGiftType 
        ? `Sent Gift to ${shagunAddress.slice(0, 4)}...${shagunAddress.slice(-4)}` 
        : `Transferred ${shagunAsset} to ${shagunAddress.slice(0, 4)}...${shagunAddress.slice(-4)}`,
      amount: amt.toFixed(isGiftType || shagunAsset.startsWith('s') ? 4 : 2),
      asset: shagunAsset,
      date: formatLocalTime(new Date()),
      hash: mockHash,
      status: 'Success'
    };
    setTransactions(prev => [newTx, ...prev]);
    saveTransactionToFirestore(newTx);

    setActiveModal({
      type: 'success',
      title: isGiftType ? 'Metal Gift Transmitted! 🎁' : 'Transfer Complete! ⚡',
      details: (
        <div className="space-y-3 text-left">
          <p className="text-slate-350 text-xs">
            {isRealOnChain 
              ? 'Your payment was successfully submitted via the Soroban Smart Contract to the Stellar network and confirmed in the ledger!'
              : 'Your transaction was sent via the Stellar network simulation with instant ledger finality.'}
          </p>
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-1.5 font-mono text-xs">
            <div className="flex justify-between"><span className="text-slate-500">Receiver:</span> <span className="text-slate-100 select-all">{shagunAddress.slice(0, 10)}...{shagunAddress.slice(-10)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Amount Sent:</span> <span className="text-amber-400 font-semibold">{amt} {shagunAsset}</span></div>
            {isGiftType && shagunNote && <div className="border-t border-slate-850 pt-2"><span className="text-slate-500 block mb-0.5">Gift Note:</span> <span className="text-slate-300 italic">"{shagunNote}"</span></div>}
            {isRealOnChain && (
              <div className="flex justify-between border-t border-slate-850 pt-2">
                <span className="text-slate-500">Soroban Hash:</span> 
                <a 
                  href={`https://stellar.expert/explorer/testnet/tx/${mockHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-0.5 select-all font-semibold"
                >
                  {mockHash.slice(0, 8)}...{mockHash.slice(-8)} 
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )
    });

    setShagunAmount('');
    setShagunAddress('');
    setShagunNote('');

    if (isRealOnChain) {
      setTimeout(() => {
        fetchAccountBalances(stellarAddress, networkMode);
      }, 3500);
    }
  };

  const renderSwapForm = () => {
    return (
      <form onSubmit={handleSwap} className="space-y-4 flex flex-col justify-between h-full">
        <div className="space-y-3.5">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-100">Exchange Assets (Buy)</h2>
            <span className="text-xs text-slate-500 font-mono">Horizon Route</span>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Pay Amount</span>
              <span className="font-mono">Bal: {balances[swapFrom].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: getFractionDigits(swapFrom) })} {swapFrom}</span>
            </div>
            <div className="flex gap-2">
              <input 
                type="number" 
                step="any"
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)}
                placeholder="0.00" 
                className="bg-transparent border-none text-slate-100 font-mono text-lg w-full focus:outline-none placeholder:text-slate-650"
              />
              <select 
                value={swapFrom} 
                onChange={(e) => setSwapFrom(e.target.value as AssetCode)}
                className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none"
              >
                {['XLM', 'USDC', 'sXAU', 'sXAG'].map(code => (
                  code !== swapTo && (
                    <option key={code} value={code} className="bg-slate-950 text-slate-100">
                      {code === 'sXAU' ? 'sXAU' : code === 'sXAG' ? 'sXAG' : code}
                    </option>
                  )
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center -my-1.5 relative z-10">
            <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400">
              <ArrowDownUp className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Receive Estimate</span>
              <span className="font-mono">Bal: {balances[swapTo].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: getFractionDigits(swapTo) })} {swapTo}</span>
            </div>
            <div className="flex gap-2 justify-between items-center">
              <span className="font-mono text-lg text-emerald-400 font-bold px-1 py-0.5">
                {swapEstimatedOutput}
              </span>
              <select 
                value={swapTo} 
                onChange={(e) => setSwapTo(e.target.value as AssetCode)}
                className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none"
              >
                {['sXAU', 'sXAG', 'USDC', 'XLM'].map(code => (
                  code !== swapFrom && (
                    <option key={code} value={code} className="bg-slate-950 text-slate-100">
                      {code === 'sXAU' ? 'sXAU (Gold)' : code === 'sXAG' ? 'sXAG (Silver)' : code}
                    </option>
                  )
                ))}
              </select>
            </div>
          </div>

          <div className="p-2.5 bg-indigo-950/20 border border-indigo-500/10 rounded-xl flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
              Exchange rates derive dynamically from live DEX pricing. Rate: 
              <span className="text-indigo-300 font-semibold block mt-0.5 font-mono">
                1 {swapTo} = {(1 / swapConversionRate).toLocaleString(undefined, { maximumFractionDigits: 2 })} {swapFrom}
              </span>
            </p>
          </div>
        </div>

        {/* Warnings / Disclaimer disclaimers */}
        {walletConnected && connectionType !== 'manual' && (
          <p className="text-[9px] text-slate-500 text-left leading-relaxed mt-2 italic">
            * Live swaps are settled on the Stellar Testnet. Co-signing keys are managed in a secure Testnet vault.
          </p>
        )}

        {(() => {
          const needsFromTrust = walletConnected && swapFrom !== 'XLM' && !trustlines[swapFrom as 'USDC' | 'sXAU' | 'sXAG'];
          const needsToTrust = walletConnected && swapTo !== 'XLM' && !trustlines[swapTo as 'USDC' | 'sXAU' | 'sXAG'];
          const isBtnDisabled = !walletConnected || isSwapping || connectionType === 'manual';
          
          let btnText = 'Execute Swap';
          if (!walletConnected) {
            btnText = 'Connect Wallet to Swap';
          } else if (connectionType === 'manual') {
            btnText = 'Read-Only Wallet';
          } else if (needsFromTrust) {
            btnText = `Activate ${swapFrom} (Trustline Required)`;
          } else if (needsToTrust) {
            btnText = `Activate ${swapTo} (Trustline Required)`;
          } else if (isSwapping) {
            btnText = 'Swapping Assets...';
          }

          const isActionLoading = isSwapping || (needsFromTrust && isActivatingTrustline[swapFrom]) || (needsToTrust && isActivatingTrustline[swapTo]);

          return (
            <button 
              type={needsFromTrust || needsToTrust ? "button" : "submit"} 
              onClick={(e) => {
                if (needsFromTrust) {
                  e.preventDefault();
                  handleEstablishTrustline(swapFrom as any);
                } else if (needsToTrust) {
                  e.preventDefault();
                  handleEstablishTrustline(swapTo as any);
                }
              }}
              disabled={isBtnDisabled}
              className={`w-full mt-4 py-3 px-4 rounded-xl font-semibold transition duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                isBtnDisabled
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-slate-100 shadow-lg shadow-indigo-600/15'
              }`}
            >
              {isActionLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              <span>{btnText}</span>
            </button>
          );
        })()}
      </form>
    );
  };

  const renderGullakForm = () => {
    return (
      <div className="space-y-4 flex flex-col justify-between h-full">
        <div>
          {/* Sub-tab navigation */}
          <div className="grid grid-cols-2 bg-slate-950 border border-slate-900/60 p-0.5 rounded-xl text-center mb-3">
            <button
              type="button"
              onClick={() => setGullakSubTab('sip')}
              className={`py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                gullakSubTab === 'sip' 
                  ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' 
                  : 'text-slate-450 hover:text-slate-205'
              }`}
            >
              Metal SIP
            </button>
            <button
              type="button"
              onClick={() => setGullakSubTab('soroban')}
              className={`py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                gullakSubTab === 'soroban' 
                  ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400' 
                  : 'text-slate-450 hover:text-slate-205'
              }`}
            >
              Soroban Yield Vault
            </button>
          </div>

          {gullakSubTab === 'sip' ? (
            <form onSubmit={handleGullakSetup} className="space-y-3.5">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-slate-100">Gullak Metal SIP</h2>
                <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold">
                  Yield Enabled
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                  <span className="block text-[10px] text-slate-500">Savings Amount</span>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      value={gullakAmount}
                      onChange={(e) => setGullakAmount(e.target.value)}
                      placeholder="10" 
                      className="bg-transparent border-none text-slate-100 font-mono text-base w-full focus:outline-none placeholder:text-slate-650"
                    />
                    <select
                      value={gullakSource}
                      onChange={(e) => setGullakSource(e.target.value as 'XLM' | 'USDC')}
                      className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] rounded px-1.5 py-0.5 focus:outline-none"
                    >
                      <option value="USDC" className="bg-slate-950 text-slate-100">USDC</option>
                      <option value="XLM" className="bg-slate-950 text-slate-100">XLM</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                  <span className="block text-[10px] text-slate-500">Target Metal</span>
                  <select 
                    value={gullakAsset} 
                    onChange={(e) => setGullakAsset(e.target.value as 'sXAU' | 'sXAG')}
                    className="bg-slate-950 border-none text-slate-100 text-sm font-semibold w-full focus:outline-none py-1"
                  >
                    <option value="sXAU" className="bg-slate-950 text-slate-100">Gold (sXAU)</option>
                    <option value="sXAG" className="bg-slate-950 text-slate-100">Silver (sXAG)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 bg-slate-950 border border-slate-900 p-0.5 rounded-xl text-center">
                {(['Daily', 'Weekly', 'Monthly'] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setGullakFreq(freq)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold uppercase transition ${
                      gullakFreq === freq 
                        ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' 
                        : 'text-slate-400 hover:text-slate-205'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>

              <button 
                type="submit" 
                className={`w-full py-2.5 px-4 rounded-xl font-semibold transition duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  walletConnected
                    ? 'bg-amber-500 hover:bg-amber-450 text-slate-950 font-bold shadow-lg shadow-amber-500/15'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-750'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Savings Plan</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleSorobanDeposit} className="space-y-3.5">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-slate-100">Stellar Soroban Vault</h2>
                <span className="px-2 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold">
                  On-Chain Yield
                </span>
              </div>

              {/* Soroban Live contract info */}
              <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Live Smart Contract</span>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/5 px-1.5 py-0.5 rounded border border-indigo-500/10">SAC Native XLM</span>
                </div>
                <div className="border-t border-slate-900/60 my-1"></div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">On-Chain Balance</span>
                  <div className="flex items-center gap-1.5 font-mono text-slate-200 font-bold text-sm">
                    {isFetchingSorobanBalance ? (
                      <span className="animate-pulse text-slate-500 text-xs">Syncing...</span>
                    ) : (
                      <>
                        <span>{parseFloat(sorobanBalance).toFixed(4)}</span>
                        <span className="text-[10px] text-slate-500 font-sans">XLM</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Deposit Inputs */}
              <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                <span className="block text-[10px] text-slate-500">Deposit Quantity (XLM)</span>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    value={sorobanDepositAmt}
                    onChange={(e) => setSorobanDepositAmt(e.target.value)}
                    placeholder="5.0"
                    step="0.0001"
                    className="bg-transparent border-none text-slate-100 font-mono text-base w-full focus:outline-none placeholder:text-slate-650"
                  />
                  <span className="text-xs font-bold text-slate-500 font-mono">XLM</span>
                </div>
              </div>

              {/* Real-time status visibility */}
              {sorobanTxStatus !== 'idle' && (
                <div className="p-3 rounded-xl border bg-slate-950 text-xs space-y-2 border-indigo-900/40">
                  <div className="flex items-center gap-2">
                    {sorobanTxStatus !== 'success' && (
                      <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping"></span>
                    )}
                    <span className="font-semibold text-slate-300">
                      {sorobanTxStatus === 'simulating' && "Simulating Contract Footprint..."}
                      {sorobanTxStatus === 'signing' && "Awaiting Freighter Signature..."}
                      {sorobanTxStatus === 'submitting' && "Broadcasting to Stellar Testnet..."}
                      {sorobanTxStatus === 'success' && "Deposit Confirmed Successfully!"}
                    </span>
                  </div>
                  {sorobanTxHash && (
                    <div className="border-t border-slate-900/60 pt-1.5 flex justify-between items-center text-[10px]">
                      <span className="text-slate-500">TX Hash</span>
                      <a 
                        href={`https://stellar.expert/explorer/testnet/tx/${sorobanTxHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-indigo-400 hover:underline hover:text-indigo-300"
                      >
                        {sorobanTxHash.slice(0, 8)}...{sorobanTxHash.slice(-8)} ↗
                      </a>
                    </div>
                  )}
                </div>
              )}

              <button 
                type="submit" 
                disabled={sorobanTxStatus !== 'idle' && sorobanTxStatus !== 'success'}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold transition duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  walletConnected
                    ? 'bg-indigo-500 hover:bg-indigo-450 text-slate-950 font-bold shadow-lg shadow-indigo-500/15'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-750'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>
                  {sorobanTxStatus === 'simulating' ? "Simulating..." :
                   sorobanTxStatus === 'signing' ? "Signing..." :
                   sorobanTxStatus === 'submitting' ? "Submitting..." :
                   "Deposit to Soroban Vault"}
                </span>
              </button>
            </form>
          )}
        </div>

        {/* Active Gullak Schedules list (only for Metal SIP) */}
        {gullakSubTab === 'sip' && (
          <div className="mt-4 pt-3 border-t border-slate-900">
            <span className="block text-xs font-semibold text-slate-400 mb-2">Active Gullak Schedules</span>
            {sips.length === 0 ? (
              <p className="text-[10px] text-slate-600 italic py-2">No active savings schedules configured.</p>
            ) : (
              <div className="max-h-[85px] overflow-y-auto space-y-1.5 pr-1">
                {sips.map((sip) => (
                  <div key={sip.id} className="flex justify-between items-center p-2 bg-slate-950/80 border border-slate-900 rounded-lg text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                      <span className="font-semibold text-slate-200">{sip.amount} {sip.fundingAsset}</span>
                      <span className="text-[10px] text-slate-500">to {sip.asset}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-bold uppercase">{sip.frequency}</span>
                      <button 
                        onClick={() => deleteSip(sip.id)}
                        className="text-slate-500 hover:text-rose-400 p-0.5 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderLoanForm = () => {
    return (
      <form onSubmit={handleLoan} className="space-y-4 flex flex-col justify-between h-full">
        <div className="space-y-3.5">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-100">Instant Precious Metal Credit</h2>
            <span className="text-xs text-emerald-400 font-semibold">Instant Disbursal</span>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Lock Metal Collateral</span>
              <span className="font-mono">Bal: {balances[loanCollateralAsset].toFixed(4)} {loanCollateralAsset}</span>
            </div>
            <div className="flex gap-2">
              <input 
                type="number" 
                step="any"
                value={loanCollateralAmt}
                onChange={(e) => setLoanCollateralAmt(e.target.value)}
                placeholder="0.00" 
                className="bg-transparent border-none text-slate-100 font-mono text-lg w-full focus:outline-none placeholder:text-slate-650"
              />
              <select 
                value={loanCollateralAsset} 
                onChange={(e) => setLoanCollateralAsset(e.target.value as 'sXAU' | 'sXAG')}
                className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none"
              >
                <option value="sXAU" className="bg-slate-950 text-slate-100">sXAU (Gold)</option>
                <option value="sXAG" className="bg-slate-950 text-slate-100">sXAG (Silver)</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-500">
              <span>Collateral Value:</span> 
              <span className="text-slate-300 font-semibold">
                ${((parseFloat(loanCollateralAmt) || 0) * livePrices[loanCollateralAsset]).toFixed(2)} USD
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Max LTV Limit (60%):</span>
              <span className="text-emerald-400 font-semibold font-bold">
                +${loanLimit.toFixed(2)} USDC
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Borrow Rate:</span>
              <span className="text-amber-400 font-semibold">4.5% Fixed APY</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Liquidation LTV:</span>
              <span className="text-rose-400">75% Threshold</span>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className={`w-full py-3 px-4 rounded-xl font-semibold transition duration-300 flex items-center justify-center gap-2 cursor-pointer ${
            walletConnected && parseFloat(loanCollateralAmt) > 0
              ? 'bg-sky-650 hover:bg-sky-600 text-slate-100 shadow-lg shadow-sky-600/15'
              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-750'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>{walletConnected ? 'Borrow USDC instantly' : 'Connect Wallet to Borrow'}</span>
        </button>
      </form>
    );
  };

  const renderSendForm = () => {
    return (
      <form onSubmit={handleSendShagun} className="space-y-3 flex flex-col justify-between h-full">
        <div className="space-y-3">
          <div className="grid grid-cols-2 bg-slate-950 border border-slate-900 p-0.5 rounded-lg text-center">
            <button
              type="button"
              onClick={() => setSendGiftType('regular')}
              className={`py-1.5 rounded text-[10px] font-bold uppercase transition cursor-pointer ${
                sendGiftType === 'regular' 
                  ? 'bg-rose-500/15 border border-rose-500/35 text-rose-400 font-bold' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Send Asset
            </button>
            <button
              type="button"
              onClick={() => setSendGiftType('gift')}
              className={`py-1.5 rounded text-[10px] font-bold uppercase transition flex items-center justify-center gap-1 cursor-pointer ${
                sendGiftType === 'gift' 
                  ? 'bg-amber-500/15 border border-amber-500/35 text-amber-400 font-bold' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Gift className="w-3 h-3" />
              <span>Send Gift</span>
            </button>
          </div>

          {/* Recipient Address */}
          <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
            <label className="block text-[10px] text-slate-500">Recipient Stellar Address</label>
            <input 
              type="text" 
              value={shagunAddress}
              onChange={(e) => setShagunAddress(e.target.value)}
              placeholder="Starts with G... (56 characters)" 
              className="bg-transparent border-none text-slate-100 font-mono text-xs w-full focus:outline-none placeholder:text-slate-650 py-0.5"
            />
          </div>

          {/* Amount and select asset block */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl space-y-0.5">
              <span className="block text-[10px] text-slate-500">Amount</span>
              <input 
                type="number" 
                step="any"
                value={shagunAmount}
                onChange={(e) => setShagunAmount(e.target.value)}
                placeholder="0.00" 
                className="bg-transparent border-none text-slate-100 font-mono text-sm w-full focus:outline-none placeholder:text-slate-650 py-0.5"
              />
            </div>

            <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl space-y-0.5">
              <span className="block text-[10px] text-slate-500 font-sans">Asset Type</span>
              <select 
                value={shagunAsset} 
                onChange={(e) => setShagunAsset(e.target.value as 'sXAU' | 'sXAG' | 'XLM' | 'USDC')}
                className="bg-slate-950 border-none text-slate-100 text-xs font-semibold w-full focus:outline-none py-1"
              >
                <option value="sXAU" className="bg-slate-950 text-slate-100">sXAU (Gold)</option>
                <option value="sXAG" className="bg-slate-950 text-slate-100">sXAG (Silver)</option>
                <option value="XLM" className="bg-slate-950 text-slate-100">XLM</option>
                <option value="USDC" className="bg-slate-950 text-slate-100">USDC</option>
              </select>
            </div>
          </div>

          {/* Custom Note */}
          {sendGiftType === 'gift' && (
            <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl space-y-1 animate-zoom-in">
              <label className="block text-[10px] text-slate-500">Custom Gift Message / Blessings</label>
              <input 
                type="text" 
                value={shagunNote}
                onChange={(e) => setShagunNote(e.target.value)}
                placeholder="e.g. Wishing you wealth & happiness!" 
                className="bg-transparent border-none text-slate-100 text-xs w-full focus:outline-none placeholder:text-slate-650 py-0.5"
              />
            </div>
          )}
          {/* Real-time status visibility */}
          {shagunTxStatus !== 'idle' && (
            <div className="p-3 rounded-xl border bg-slate-950 text-xs space-y-2 border-indigo-900/40">
              <div className="flex items-center gap-2">
                {shagunTxStatus !== 'success' && (
                  <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping"></span>
                )}
                <span className="font-semibold text-slate-300">
                  {shagunTxStatus === 'simulating' && "Simulating Contract Footprint..."}
                  {shagunTxStatus === 'signing' && "Awaiting Freighter Signature..."}
                  {shagunTxStatus === 'submitting' && "Broadcasting to Stellar Testnet..."}
                  {shagunTxStatus === 'success' && "Transfer Confirmed Successfully!"}
                </span>
              </div>
              {shagunTxHash && (
                <div className="border-t border-slate-900/60 pt-1.5 flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">TX Hash</span>
                  <a 
                    href={`https://stellar.expert/explorer/testnet/tx/${shagunTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-indigo-400 hover:underline hover:text-indigo-300"
                  >
                    {shagunTxHash.slice(0, 8)}...{shagunTxHash.slice(-8)} ↗
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={shagunTxStatus !== 'idle' && shagunTxStatus !== 'success'}
          className={`w-full py-2.5 px-4 rounded-xl font-semibold transition duration-300 flex items-center justify-center gap-2 cursor-pointer ${
            walletConnected
              ? sendGiftType === 'gift' 
                ? 'bg-amber-500 hover:bg-amber-450 text-slate-950 font-bold shadow-lg shadow-amber-500/15'
                : 'bg-rose-600 hover:bg-rose-500 text-slate-100 shadow-lg shadow-rose-600/15'
              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-750'
          }`}
        >
          {shagunTxStatus === 'simulating' || shagunTxStatus === 'signing' || shagunTxStatus === 'submitting' ? (
            <Loader2 className="w-4 h-4 animate-spin text-slate-100" />
          ) : sendGiftType === 'gift' ? (
            <Gift className="w-4 h-4" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          <span>
            {shagunTxStatus === 'simulating' ? "Simulating..." :
             shagunTxStatus === 'signing' ? "Signing..." :
             shagunTxStatus === 'submitting' ? "Submitting..." :
             walletConnected ? (sendGiftType === 'gift' ? 'Send Gift Envelope' : 'Transfer Asset') : 'Connect Wallet to Send'}
          </span>
        </button>
      </form>
    );
  };
  const renderAuthPage = () => {
    if (authMode === 'welcome') {
      return (
        <div className="w-full max-w-4xl bg-slate-900/40 border border-slate-800/80 rounded-[32px] shadow-2xl relative overflow-hidden animate-zoom-in backdrop-blur-2xl z-10 grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
          {/* Decorative glowing blobs */}
          <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-gradient-to-br from-amber-500/15 via-indigo-650/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          {/* Left Column: Branding, Live Markets, Stellar Badge */}
          <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between border-b border-slate-800/60 md:border-b-0 md:border-r border-slate-800/60 bg-slate-950/20">
            {/* Header branding */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 via-indigo-650 to-slate-400 p-[1.5px] shadow-lg animate-glow">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-slate-100 to-indigo-400 bg-clip-text text-transparent">
                  GlintFi
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight mt-6">
                Build wealth in Physical <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent font-bold">Gold</span> & <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent font-bold">Silver</span>
              </h1>
              <p className="text-slate-400 text-xs md:text-sm max-w-md font-sans leading-relaxed">
                Unlock the liquidity of tokenized precious metals on the Stellar network. Swap, save via Gullak SIP, and borrow USDC instantly against your holdings.
              </p>
            </div>

            {/* Live Ticker Component */}
            <div className="my-8 md:my-0 space-y-4 bg-slate-950/45 border border-slate-850 p-5 rounded-2xl">
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-sans">Live Spot Market Monitor</span>
                <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 uppercase tracking-wider animate-pulse">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  Active Sync
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">sXAU (Gold)</span>
                  <span className="text-sm font-extrabold text-amber-400 font-mono block">
                    ${livePrices.sXAU.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[9px] text-emerald-400 flex items-center gap-0.5 font-sans">
                    <TrendingUp className="w-2.5 h-2.5" /> +1.2%
                  </span>
                </div>
                <div className="space-y-1 border-x border-slate-900 px-3">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">sXAG (Silver)</span>
                  <span className="text-sm font-extrabold text-slate-200 font-mono block">
                    ${livePrices.sXAG.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[9px] text-rose-450 flex items-center gap-0.5 font-sans">
                    <TrendingDown className="w-2.5 h-2.5" /> -0.5%
                  </span>
                </div>
                <div className="space-y-1 pl-1">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Stellar (XLM)</span>
                  <span className="text-sm font-extrabold text-indigo-400 font-mono block">
                    ${livePrices.XLM.toFixed(4)}
                  </span>
                  <span className="text-[9px] text-emerald-400 flex items-center gap-0.5 font-sans">
                    <TrendingUp className="w-2.5 h-2.5" /> +0.8%
                  </span>
                </div>
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>100% physically backed by London Good Delivery gold & silver bars.</span>
            </div>
          </div>

          {/* Right Column: Actions / Gateway */}
          <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center bg-slate-900/20">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-200">Get Started</h3>
                <p className="text-xs text-slate-450 leading-relaxed font-sans">
                  Create a secure account or sign in to enter the vault.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3.5 pt-2">
                <button
                  onClick={() => setAuthMode('signup')}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-indigo-650 to-indigo-500 hover:from-amber-450 hover:to-indigo-550 text-slate-100 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl shadow-indigo-950/20 cursor-pointer flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  onClick={() => setAuthMode('signin')}
                  className="w-full py-3.5 border border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/70 text-slate-300 hover:text-slate-100 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Log In to Account</span>
                </button>
              </div>

              <div className="border-t border-slate-850/60 my-6"></div>

              {/* App Features List (compact format) */}
              <div className="space-y-3">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block font-sans">DApp Core Features</span>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-amber-450"></span>
                    <span>Instant Gold Swaps</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-indigo-400"></span>
                    <span>Gullak SIP Vault</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-sky-400"></span>
                    <span>DeFi Credit Lines</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-400"></span>
                    <span>Freighter Wallet Sync</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const isSignIn = authMode === 'signin';
    return (
      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden animate-zoom-in backdrop-blur-xl z-10">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-amber-500/10 via-indigo-600/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
        
        {/* Back Button */}
        <button
          type="button"
          onClick={() => {
            setAuthMode('welcome');
            setAuthName('');
            setAuthEmail('');
            setAuthPassword('');
            setAuthConfirmPassword('');
          }}
          className="absolute top-6 left-6 text-slate-500 hover:text-slate-300 transition flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-indigo-400" />
          <span>Back</span>
        </button>

        {/* Logo and Greeting */}
        <div className="flex flex-col items-center justify-center text-center mb-8 mt-6">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-slate-400 p-[1.5px] shadow-lg animate-glow mb-3">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-slate-100 to-indigo-400 bg-clip-text text-transparent">
            GlintFi
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 font-sans">
            {isSignIn 
              ? 'Sign in to access your precious metal dashboard' 
              : 'Create an account to stack & borrow physical-backed assets'}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={isSignIn ? handleSignIn : handleSignUp} className="space-y-4">
          {!isSignIn && (
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Full Name</label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder="e.g. Shuvankar Sen"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs font-sans placeholder:text-slate-655"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs font-sans placeholder:text-slate-655"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder={isSignIn ? '••••••••' : 'At least 6 characters'}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs font-sans placeholder:text-slate-655"
              />
            </div>
          </div>

          {!isSignIn && (
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Confirm Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={authConfirmPassword}
                  onChange={(e) => setAuthConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs font-sans placeholder:text-slate-655"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-amber-500 via-indigo-600 to-slate-400 hover:from-amber-450 hover:to-indigo-500 text-slate-100 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-indigo-950/30 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>{isSignIn ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* View Toggle link */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => {
              setAuthMode(isSignIn ? 'signup' : 'signin');
              setAuthName('');
              setAuthEmail('');
              setAuthPassword('');
              setAuthConfirmPassword('');
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition hover:underline font-semibold"
          >
            {isSignIn 
              ? "New to GlintFi? Create an Account" 
              : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    );
  };
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden flex items-center justify-center p-4">
        {/* Background YouTube video loop */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <iframe
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-25 scale-[1.15]"
            src="https://www.youtube.com/embed/XHhyFflud74?autoplay=1&mute=1&loop=1&playlist=XHhyFflud74&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1&cc_load_policy=3"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title="Background Video"
          ></iframe>
        </div>

        {/* Glow backgrounds */}
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[50%] rounded-full stellar-glow pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] rounded-full gold-glow pointer-events-none z-0"></div>
        
        {/* Floating toasts */}
        <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
          {toasts.map((t) => (
            <div 
              key={t.id} 
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-xl transition-all duration-300 animate-slide-in ${
                t.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-100' :
                t.type === 'warning' ? 'bg-amber-950/80 border-amber-500/30 text-amber-100' :
                'bg-slate-900/90 border-slate-800 text-slate-100'
              }`}
            >
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
              {t.type === 'warning' && <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
              {t.type === 'info' && <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />}
              <div className="space-y-0.5">
                <h4 className="font-semibold text-sm">{t.title}</h4>
                <p className="text-xs opacity-90">{t.message}</p>
              </div>
              <button 
                onClick={() => setToasts(prev => prev.filter(item => item.id !== t.id))}
                className="ml-auto text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {renderAuthPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden flex flex-col justify-between">
      
      {/* Glow backgrounds */}
      <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[50%] rounded-full stellar-glow pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] rounded-full gold-glow pointer-events-none z-0"></div>
      <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full silver-glow pointer-events-none z-0"></div>

      {/* Floating toasts */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-xl transition-all duration-300 animate-slide-in ${
              t.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-100' :
              t.type === 'warning' ? 'bg-amber-950/80 border-amber-500/30 text-amber-100' :
              'bg-slate-900/90 border-slate-800 text-slate-100'
            }`}
          >
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {t.type === 'warning' && <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />}
            <div className="space-y-0.5">
              <h4 className="font-semibold text-sm">{t.title}</h4>
              <p className="text-xs opacity-90">{t.message}</p>
            </div>
            <button 
              onClick={() => setToasts(prev => prev.filter(item => item.id !== t.id))}
              className="ml-auto text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Success Details Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden animate-zoom-in">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-lg text-slate-100">{activeModal.title}</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">{activeModal.details}</div>

            <button 
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-slate-100 font-semibold rounded-xl transition duration-200"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

      {/* Connect Wallet Modal */}
      {walletModalOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-zoom-in">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-indigo-400" />
                <span>Connect Stellar Account</span>
              </h3>
              <button 
                onClick={() => setWalletModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={connectFreighter}
                className="w-full p-4 bg-slate-950 border border-slate-850 hover:border-indigo-500/50 rounded-xl text-left flex items-center justify-between transition duration-200 group"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition">Connect Freighter</h4>
                  <p className="text-xs text-slate-400 mt-1">Access using Stellar official extension wallet.</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 text-slate-400 group-hover:text-indigo-400">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={connectAlbedo}
                className="w-full p-4 bg-slate-950 border border-slate-850 hover:border-indigo-500/50 rounded-xl text-left flex items-center justify-between transition duration-200 group"
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

              <form onSubmit={connectManual} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Paste Stellar Public Key (G...)</label>
                  <input
                    type="text"
                    required
                    value={manualAddressInput}
                    onChange={(e) => setManualAddressInput(e.target.value)}
                    placeholder="e.g. GB32...4K9Z"
                    className="w-full px-3 py-2.5 rounded-lg glass-input text-xs font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-lg text-xs tracking-wider uppercase transition shadow-lg shadow-indigo-600/10"
                >
                  Load Ledger View
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------
          Navbar / Header
          --------------------------------------------------------- */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setCurrentView('dashboard')} 
              className="flex items-center gap-3 cursor-pointer group"
              title="Back to Dashboard"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-slate-400 p-[1.5px] shadow-lg group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-amber-400 via-slate-100 to-indigo-400 bg-clip-text text-transparent group-hover:from-amber-300 group-hover:to-indigo-300 transition-all duration-300">
                  GlintFi
                </span>
              </div>
            </div>
            {currentView === 'trade' && (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-850 bg-slate-900/40 hover:bg-indigo-600/10 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-400 text-xs font-medium transition-all duration-300 cursor-pointer ml-3 shadow-sm hover:shadow-indigo-950/20"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Dashboard</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            
            {/* User Profile Info & Logout */}
            <div className="flex items-center gap-2 md:border-r border-slate-900 md:pr-4 md:mr-1">
              <div className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden md:flex flex-col text-left">
                {isEditingName ? (
                  <form onSubmit={handleSaveName} className="flex items-center gap-1 my-0.5">
                    <input
                      type="text"
                      value={editNameVal}
                      onChange={(e) => setEditNameVal(e.target.value)}
                      className="text-xs font-semibold text-slate-200 bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 focus:outline-none focus:border-indigo-500 w-24"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') setIsEditingName(false);
                      }}
                      disabled={isSavingName}
                    />
                    <button type="submit" className="text-emerald-450 hover:text-emerald-400 p-0.5 cursor-pointer" disabled={isSavingName}>
                      {isSavingName ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    </button>
                    <button type="button" onClick={() => setIsEditingName(false)} className="text-slate-500 hover:text-slate-400 p-0.5 cursor-pointer" disabled={isSavingName}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <div 
                    className="flex items-center gap-1 cursor-pointer group/name" 
                    onClick={() => {
                      setEditNameVal(currentUser?.name || '');
                      setIsEditingName(true);
                    }}
                    title="Click to edit display name"
                  >
                    <span className="text-xs font-semibold text-slate-200 group-hover/name:text-indigo-400 transition">{currentUser?.name}</span>
                    <Edit2 className="w-2.5 h-2.5 text-slate-500 opacity-0 group-hover/name:opacity-100 transition-opacity" />
                  </div>
                )}
                <span className="text-[9px] text-slate-500 font-mono -mt-0.5">{currentUser?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-500 hover:text-rose-455 hover:bg-slate-900 rounded-lg transition ml-1 cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-900 p-0.5 rounded-lg flex">
              <button 
                onClick={() => setNetworkMode('public')}
                className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition ${
                  networkMode === 'public' 
                    ? 'bg-indigo-600 text-slate-100' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Public
              </button>
              <button 
                onClick={() => setNetworkMode('testnet')}
                className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition ${
                  networkMode === 'testnet' 
                    ? 'bg-amber-600/10 border border-amber-500/20 text-amber-400' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Testnet
              </button>
            </div>

            {isFetchingBalances && (
              <div className="flex items-center gap-1.5 text-slate-400 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span className="text-[10px] font-mono hidden md:inline">Horizon Sync...</span>
              </div>
            )}

            {/* Wallet Info Display */}
            {walletConnected ? (
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                  connectionType === 'freighter' 
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/20' 
                    : connectionType === 'albedo'
                    ? 'bg-amber-950 text-amber-300 border border-amber-500/20'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}>
                  {connectionType === 'freighter' ? 'Freighter' : connectionType === 'albedo' ? 'Albedo' : 'Read-Only'}
                </span>
                <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/20 bg-slate-900/50 p-1 pl-2.5 shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span 
                      className="font-mono text-xs text-slate-350 font-semibold cursor-help"
                      title={stellarAddress}
                    >
                      {stellarAddress.slice(0, 4)}...{stellarAddress.slice(-4)}
                    </span>
                  </div>
                  
                  {/* Copy Button */}
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

                  {/* Disconnect Button */}
                  <button 
                    onClick={disconnectWallet}
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-455 hover:bg-slate-800 transition cursor-pointer"
                    title="Disconnect Wallet"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setWalletModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-100 text-sm font-semibold transition shadow-lg shadow-indigo-950/50"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------
          Main Content Container
          --------------------------------------------------------- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6 z-10">
        
        {/* Warning Banner */}
        {walletConnected && balances.XLM === 0 && networkMode === 'testnet' && (
          <div className="p-4 bg-amber-950/30 border border-amber-500/20 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-300">Stellar Testnet Account Needs Funding</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                This account is currently empty. To fund it with free Testnet XLM, copy your address and request assets from the Friendbot faucet to perform swaps and setup Gullak SIPs.
              </p>
              <a 
                href={`https://laboratory.stellar.org/#account-creator?network=testnet`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:underline pt-1"
              >
                <span>Stellar Laboratory Friendbot</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {currentView === 'dashboard' && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* XLM Card */}
          <div className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-colors"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">XLM</span>
              <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-500/20 text-indigo-400">
                <Coins className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-slate-100 tracking-tight font-mono">
                {balances.XLM.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 7 })}
              </span>
              <span className="text-slate-400 font-semibold ml-1.5 text-sm">XLM</span>
            </div>
            <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-900">
              <span className="text-xs text-slate-500">Value USD</span>
              <span className="text-xs text-slate-300 font-mono font-medium">${(balances.XLM * livePrices.XLM).toFixed(2)}</span>
            </div>
          </div>

          {/* USDC Card */}
          <div className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl group-hover:bg-sky-500/10 transition-colors"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-sky-400 tracking-wider uppercase">USDC</span>
              <div className="p-2 rounded-xl bg-sky-950/80 border border-sky-500/20 text-sky-400">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-slate-100 tracking-tight font-mono">
                {balances.USDC.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-slate-400 font-semibold ml-1.5 text-sm">USDC</span>
            </div>
            <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-900">
              <span className="text-xs text-slate-500">Value USD</span>
              <span className="text-xs text-slate-300 font-mono font-medium">${(balances.USDC * livePrices.USDC).toFixed(2)}</span>
            </div>
          </div>

          {/* sXAU Gold Card */}
          <div className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group border-amber-500/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-colors"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col gap-1 text-left">
                <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">Synthetic Gold</span>
                {walletConnected && (
                  <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border inline-block w-fit ${
                    trustlines.sXAU 
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-950/80 text-amber-400 border-amber-500/20 animate-pulse'
                  }`}>
                    {trustlines.sXAU ? 'Active' : 'Trustline Required'}
                  </span>
                )}
              </div>
              <div className="p-2 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400">
                <Flame className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-amber-400 tracking-tight font-mono">
                    {balances.sXAU.toFixed(4)}
                  </span>
                  <span className="text-slate-400 font-semibold ml-1.5 text-sm">sXAU</span>
                </div>
                
                <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                  <TrendingUp className="w-3 h-3" />
                  <span>+1.2%</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-slate-900">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Value: ${(balances.sXAU * livePrices.sXAU).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</span>
                <span className="text-amber-400/80 font-mono font-medium">Live: ${livePrices.sXAU.toLocaleString(undefined, { maximumFractionDigits: 2 })}/oz</span>
              </div>
              {walletConnected && !trustlines.sXAU ? (
                <button
                  onClick={() => handleEstablishTrustline('sXAU')}
                  disabled={isActivatingTrustline.sXAU}
                  className="w-full py-1.5 rounded bg-amber-500 hover:bg-amber-450 text-slate-950 text-[10px] font-bold tracking-wider transition cursor-pointer flex items-center justify-center gap-1 shadow-lg shadow-amber-500/10"
                >
                  {isActivatingTrustline.sXAU ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Activating sXAU...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Activate sXAU (Trustline)</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleQuickBuy('sXAU')}
                  className="w-full py-1 rounded bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 text-[10px] font-bold tracking-wider transition cursor-pointer border border-amber-500/30 hover:border-transparent flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Buy sXAU</span>
                </button>
              )}
            </div>
          </div>

          {/* sXAG Silver Card */}
          <div className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group border-slate-400/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-400/5 rounded-full blur-xl group-hover:bg-slate-400/10 transition-colors"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col gap-1 text-left">
                <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">Synthetic Silver</span>
                {walletConnected && (
                  <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border inline-block w-fit ${
                    trustlines.sXAG 
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-950/80 text-amber-400 border-amber-500/20 animate-pulse'
                  }`}>
                    {trustlines.sXAG ? 'Active' : 'Trustline Required'}
                  </span>
                )}
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300">
                <Award className="w-5 h-5 text-slate-300" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-slate-200 tracking-tight font-mono">
                    {balances.sXAG.toFixed(2)}
                  </span>
                  <span className="text-slate-400 font-semibold ml-1.5 text-sm">sXAG</span>
                </div>
                
                <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-rose-950 border border-rose-500/30 text-rose-400 text-[10px] font-bold">
                  <TrendingDown className="w-3 h-3" />
                  <span>-0.5%</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-slate-900">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Value: ${(balances.sXAG * livePrices.sXAG).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</span>
                <span className="text-slate-400 font-mono font-medium">Live: ${livePrices.sXAG.toFixed(2)}/oz</span>
              </div>
              {walletConnected && !trustlines.sXAG ? (
                <button
                  onClick={() => handleEstablishTrustline('sXAG')}
                  disabled={isActivatingTrustline.sXAG}
                  className="w-full py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-[10px] font-bold tracking-wider transition cursor-pointer flex items-center justify-center gap-1 shadow-lg shadow-indigo-500/10"
                >
                  {isActivatingTrustline.sXAG ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Activating sXAG...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Activate sXAG (Trustline)</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleQuickBuy('sXAG')}
                  className="w-full py-1 rounded bg-slate-400/10 hover:bg-slate-300 text-slate-300 hover:text-slate-950 text-[10px] font-bold tracking-wider transition cursor-pointer border border-slate-400/30 hover:border-transparent flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Buy sXAG</span>
                </button>
              )}
            </div>
          </div>
        </section>
        )}

        {currentView === 'trade' && (
          <div className="space-y-4">
            {/* Back Button */}
            <div className="flex">
              <button
                type="button"
                onClick={() => setCurrentView('dashboard')}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md hover:bg-indigo-600/10 hover:border-indigo-500/30 text-slate-300 hover:text-indigo-400 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-950/20 hover:-translate-x-0.5"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Dashboard</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Candlestick Chart */}
          <section className="lg:col-span-8 glass-card rounded-2xl p-6 flex flex-col justify-between relative border border-slate-900 shadow-xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex bg-slate-950 border border-slate-800 p-0.5 rounded-xl">
                  <button 
                    onClick={() => {
                      setChartAsset('sXAU');
                      setHoveredCandle(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition ${
                      chartAsset === 'sXAU' 
                        ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold shadow-inner' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Gold (sXAU)
                  </button>
                  <button 
                    onClick={() => {
                      setChartAsset('sXAG');
                      setHoveredCandle(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition ${
                      chartAsset === 'sXAG' 
                        ? 'bg-slate-400/10 border border-slate-500/30 text-slate-200 font-bold shadow-inner' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Silver (sXAG)
                  </button>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 border border-slate-900 rounded-xl text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Binance Price Feed</span>
                </div>
                
                {/* Big Glowing Price Ticker */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold animate-pulse shadow-sm ${
                  chartAsset === 'sXAU' 
                    ? 'bg-amber-500/15 border border-amber-500/25 text-amber-400' 
                    : 'bg-slate-400/10 border border-slate-500/25 text-slate-200'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${chartAsset === 'sXAU' ? 'bg-amber-400' : 'bg-slate-300'}`}></span>
                  <span>Live Rate: ${livePrices[chartAsset].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/oz</span>
                </div>
              </div>

              {/* Timeframe filters */}
              <div className="flex bg-slate-950 border border-slate-900 p-0.5 rounded-xl">
                {(['1D', '7D', '1M'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => {
                      setChartTimeframe(tf);
                      setHoveredCandle(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      chartTimeframe === tf 
                        ? 'bg-indigo-600 text-slate-100 shadow-md shadow-indigo-600/10' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* OHLCHUD */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-slate-950/60 border border-slate-900 rounded-2xl mb-4 font-mono text-xs text-slate-400">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-sans">Period / Time</span>
                <span className="font-semibold text-slate-200 text-sm">{currentCandle.time}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-sans">Open</span>
                <span className="font-semibold text-slate-300 text-sm">${currentCandle.open.toFixed(2)}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-sans">High / Low</span>
                <span className="font-semibold text-slate-300 text-sm font-sans">
                  <span className="text-emerald-400 font-mono">${currentCandle.high.toFixed(2)}</span>
                  <span className="mx-1 text-slate-600">/</span>
                  <span className="text-rose-400 font-mono">${currentCandle.low.toFixed(2)}</span>
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-sans">Close</span>
                <span className={`font-bold text-sm ${currentCandle.close >= currentCandle.open ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ${currentCandle.close.toFixed(2)}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-[10px] text-slate-500 uppercase font-sans">Volume</span>
                <span className="font-semibold text-slate-300 text-sm">{currentCandle.volume}</span>
              </div>
            </div>

            {/* Candlestick SVG Container */}
            <div className="relative w-full h-[240px] bg-slate-950/30 border border-slate-900 rounded-2xl p-2 overflow-hidden select-none">
              <div className="absolute inset-0 bg-radial-gradient(circle, transparent 50%, rgba(2, 6, 23, 0.4)) pointer-events-none"></div>

              {/* Chart Grid Lines */}
              <div className="absolute inset-0 z-0">
                <svg className="w-full h-full opacity-[0.03]">
                  <line x1="40" y1="20" x2="540" y2="20" stroke="#fff" strokeWidth="1" />
                  <line x1="40" y1="65" x2="540" y2="65" stroke="#fff" strokeWidth="1" />
                  <line x1="40" y1="110" x2="540" y2="110" stroke="#fff" strokeWidth="1" />
                  <line x1="40" y1="155" x2="540" y2="155" stroke="#fff" strokeWidth="1" />
                  <line x1="40" y1="200" x2="540" y2="200" stroke="#fff" strokeWidth="1" />
                </svg>
              </div>

              {/* Interactive SVG Layer */}
              <svg 
                viewBox="0 0 600 240" 
                preserveAspectRatio="none" 
                className="w-full h-full z-10 relative overflow-visible"
              >
                {/* Horizontal grid guide lines */}
                {yGridTicks.map((val, idx) => {
                  const height = 240;
                  const paddingBottom = 30;
                  const paddingTop = 20;
                  const plotHeight = height - paddingTop - paddingBottom;
                  
                  let maxPrice = -Infinity;
                  let minPrice = Infinity;
                  activeCandles.forEach(c => {
                    if (c.high > maxPrice) maxPrice = c.high;
                    if (c.low < minPrice) minPrice = c.low;
                  });
                  const range = maxPrice - minPrice;
                  maxPrice = maxPrice + range * 0.15;
                  minPrice = minPrice - range * 0.15;

                  const yCoord = height - paddingBottom - ((val - minPrice) / (maxPrice - minPrice)) * plotHeight;
                  
                  return (
                    <g key={idx} className="opacity-40">
                      <line 
                        x1={40} 
                        y1={yCoord} 
                        x2={530} 
                        y2={yCoord} 
                        stroke="#475569" 
                        strokeDasharray="2,2" 
                        strokeWidth="1" 
                      />
                      <text 
                        x={536} 
                        y={yCoord + 3} 
                        fill="#94a3b8" 
                        fontSize="9" 
                        fontFamily="monospace"
                        textAnchor="start"
                      >
                        ${val.toFixed(chartAsset === 'sXAG' ? 2 : 1)}
                      </text>
                    </g>
                  );
                })}

                {/* Candles Rendering */}
                {svgCoords.map((coord, i) => (
                  <g 
                    key={i}
                    onMouseEnter={() => setHoveredCandle(coord.raw)}
                    onMouseLeave={() => setHoveredCandle(null)}
                    className="cursor-pointer group"
                  >
                    <rect
                      x={coord.cx - coord.candleWidth}
                      y={10}
                      width={coord.candleWidth * 2}
                      height={195}
                      fill="rgba(99,102,241,0.02)"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    
                    <line
                      x1={coord.cx}
                      y1={coord.yHigh}
                      x2={coord.cx}
                      y2={coord.yLow}
                      stroke={coord.isBullish ? '#10b981' : '#f43f5e'}
                      strokeWidth="1.5"
                    />

                    <rect
                      x={coord.cx - coord.candleWidth / 2}
                      y={coord.yMinBody}
                      width={coord.candleWidth}
                      height={coord.bodyHeight}
                      fill={coord.isBullish ? '#10b981' : '#f43f5e'}
                      rx="1"
                      className="transition-all duration-300"
                    />

                    <text
                      x={coord.cx}
                      y={225}
                      fill="#64748b"
                      fontSize="9"
                      textAnchor="middle"
                      fontWeight="medium"
                    >
                      {coord.xLabel}
                    </text>
                  </g>
                ))}
              </svg>

              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[10px] text-slate-500">
                <Info className="w-3 h-3 text-slate-600" />
                <span>Real Gold/Silver prices applied dynamically to charts.</span>
              </div>
            </div>
          </section>

          {/* Quick Actions Panel - Only Swap/Buy Form on Trade Page */}
          <section id="quick-actions-panel" className="lg:col-span-4 flex flex-col justify-between">
            <div className="glass-card rounded-2xl border border-slate-900 overflow-hidden flex flex-col h-full p-5 justify-between">
              {renderSwapForm()}
            </div>
          </section>
        </div>
        </div>
        )}

        {currentView === 'dashboard' && (
          <>
            {/* Split Section: Ledger (8/12) and Quick Actions (4/12) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Activity Ledger & Gifts Box (8/12) */}
              <section className="lg:col-span-8 glass-card rounded-2xl border border-slate-900 overflow-hidden shadow-xl flex flex-col justify-between">
                <div className="flex justify-between items-center bg-slate-950 px-6 py-4 border-b border-slate-900">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-slate-100">
                      Ledger History & Gift Ledger
                      <span className={`ml-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded ${
                        walletConnected ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}>
                        {walletConnected ? 'Live Ledger' : 'Demo Ledger'}
                      </span>
                    </h3>
                  </div>
                  
                  <div className="flex bg-slate-900 border border-slate-850 p-0.5 rounded-lg">
                    <button
                      onClick={() => setLedgerTab('activity')}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition flex items-center gap-1.5 ${
                        ledgerTab === 'activity' 
                          ? 'bg-indigo-600 text-slate-100 shadow-md' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>My Transactions</span>
                    </button>
                    <button
                      onClick={() => setLedgerTab('gifts')}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition flex items-center gap-1.5 ${
                        ledgerTab === 'gifts' 
                          ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>Received Gifts Box</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 flex-1">
                  {ledgerTab === 'activity' ? (
                    <div className="overflow-x-auto">
                      {transactions.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 space-y-2">
                          <Info className="w-8 h-8 text-slate-600 mx-auto" />
                          <p className="text-xs italic">No transactions executed in this session.</p>
                          <p className="text-[10px] text-slate-650">Swaps, loans, and transfers will appear here in real-time.</p>
                        </div>
                      ) : (
                        <table className="w-full text-left text-xs font-mono">
                          <thead>
                            <tr className="text-slate-500 border-b border-slate-900 pb-3">
                              <th className="pb-3 font-sans font-semibold">Type</th>
                              <th className="pb-3 font-sans font-semibold">Description</th>
                              <th className="pb-3 font-sans font-semibold">Amount</th>
                              <th className="pb-3 font-sans font-semibold">Date</th>
                              <th className="pb-3 font-sans font-semibold">Stellar Hash</th>
                              <th className="pb-3 font-sans font-semibold">Status</th>
                              <th className="pb-3 font-sans font-semibold text-right pr-4">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-900">
                            {transactions.map((tx) => (
                              <tr key={tx.id} className="text-slate-300 hover:bg-slate-900/30 transition">
                                <td className="py-3.5 pr-2 font-sans font-bold flex items-center gap-2">
                                  <span className={`h-1.5 w-1.5 rounded-full ${
                                    tx.type === 'Swap' ? 'bg-indigo-400' :
                                    tx.type === 'Loan' ? 'bg-sky-400' :
                                    tx.type === 'Gift' ? 'bg-amber-400' : 'bg-rose-400'
                                  }`}></span>
                                  {tx.type}
                                </td>
                                <td className="py-3.5 font-sans text-slate-400">{tx.description}</td>
                                <td className={`py-3.5 font-bold ${
                                  tx.type === 'Loan' || (tx.type === 'Swap' && tx.asset === 'USDC') ? 'text-emerald-400' :
                                  tx.asset.startsWith('sXA') ? 'text-amber-400' : 'text-slate-100'
                                }`}>
                                  {tx.amount} {tx.asset}
                                </td>
                                <td className="py-3.5 text-slate-500">{tx.date}</td>
                                <td className="py-3.5 text-slate-400">
                                  {isRealHash(tx.hash) ? (
                                    <a 
                                      href={`https://stellar.expert/explorer/${networkMode}/tx/${tx.hash}`}
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-indigo-455 hover:text-indigo-350 hover:underline flex items-center gap-1 select-all font-semibold"
                                    >
                                      {tx.hash.slice(0, 8)}...{tx.hash.slice(-8)}
                                      <ExternalLink className="w-3 h-3 shrink-0" />
                                    </a>
                                  ) : (
                                    <span className="text-slate-500 italic select-all" title="Simulated Transaction">
                                      {tx.hash}
                                    </span>
                                  )}
                                </td>
                                <td className="py-3.5 font-sans font-semibold text-emerald-400">{tx.status}</td>
                                <td className="py-3.5 text-right pr-4">
                                  <button
                                    onClick={() => handleDeleteTransaction(tx.id)}
                                    className="p-1 text-slate-500 hover:text-rose-455 hover:bg-slate-900 rounded transition cursor-pointer"
                                    title="Delete Transaction"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  ) : (
                    receivedGifts.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 space-y-2">
                        <Gift className="w-8 h-8 text-slate-600 mx-auto" />
                        <p className="text-xs italic">No gifts received yet.</p>
                        <p className="text-[10px] text-slate-650">Incoming precious metal gifts sent to your address will appear here.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {receivedGifts.map((gift) => (
                          <div key={gift.id} className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl relative overflow-hidden group hover:border-amber-500/20 transition duration-300">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/[0.03] rounded-full blur-xl group-hover:bg-amber-500/[0.06] transition-colors"></div>
                            
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
                                  <Gift className="w-4 h-4" />
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-500 font-semibold block">Sender Address</span>
                                  <span className="font-mono text-xs font-bold text-slate-300 select-all">{gift.sender}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-bold text-amber-400 block font-mono">+{gift.amount} {gift.asset}</span>
                                <span className="text-[9px] text-slate-500 font-mono block mt-0.5">{gift.date}</span>
                              </div>
                            </div>

                            <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-lg relative">
                              <p className="text-xs text-slate-300 leading-relaxed italic">
                                "{gift.note}"
                              </p>
                            </div>

                            <div className="mt-3 flex justify-between items-center text-[10px] text-slate-500">
                              <span>
                                Ledger Hash:{' '}
                                {isRealHash(gift.hash) ? (
                                  <a 
                                    href={`https://stellar.expert/explorer/${networkMode}/tx/${gift.hash}`}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center gap-0.5 text-indigo-455 hover:text-indigo-350 hover:underline font-mono font-semibold"
                                  >
                                    {gift.hash.slice(0, 8)}...{gift.hash.slice(-8)}
                                    <ExternalLink className="w-2.5 h-2.5 inline shrink-0" />
                                  </a>
                                ) : (
                                  <span className="font-mono text-slate-400 select-all">{gift.hash || 'N/A'}</span>
                                )}
                              </span>
                              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Secured
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* Right Column: Gullak, Loan, Send Forms (4/12) */}
              <section id="quick-actions-panel" className="lg:col-span-4 flex flex-col justify-between">
                <div className="glass-card rounded-2xl border border-slate-900 overflow-hidden flex flex-col h-full">
                  
                  {/* Tab Navigation header (4 columns) */}
                  <div className="grid grid-cols-4 bg-slate-950 border-b border-slate-900 p-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('swap')}
                      className={`py-3 flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold tracking-wider transition cursor-pointer ${
                        activeTab === 'swap' 
                          ? 'bg-slate-900 text-indigo-400 border border-slate-800' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <RefreshCw className="w-4 h-4 shrink-0" />
                      <span>SWAP</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('gullak')}
                      className={`py-3 flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold tracking-wider transition cursor-pointer ${
                        activeTab === 'gullak' 
                          ? 'bg-slate-900 text-amber-400 border border-slate-800' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <PiggyBank className="w-4 h-4 shrink-0" />
                      <span>GULLAK</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('loan')}
                      className={`py-3 flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold tracking-wider transition cursor-pointer ${
                        activeTab === 'loan' 
                          ? 'bg-slate-900 text-sky-400 border border-slate-800' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Percent className="w-4 h-4 shrink-0" />
                      <span>LOAN</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('send')}
                      className={`py-3 flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold tracking-wider transition cursor-pointer ${
                        activeTab === 'send' 
                          ? 'bg-slate-900 text-rose-400 border border-slate-800' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Send className="w-4 h-4 shrink-0" />
                      <span>SEND & GIFT</span>
                    </button>
                  </div>

                  {/* TAB CONTENT */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    {activeTab === 'swap' && renderSwapForm()}
                    {activeTab === 'gullak' && renderGullakForm()}
                    {activeTab === 'loan' && renderLoanForm()}
                    {activeTab === 'send' && renderSendForm()}
                  </div>
                </div>
              </section>

            </div>

        {/* Benefits Grid */}
        <section className="glass-card rounded-2xl p-6 border border-slate-900 relative">
          <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>Why Stellar Precious Metals?</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-950/40 border border-slate-900/80">
              <h4 className="font-semibold text-slate-200 flex items-center gap-1.5 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                Instant Asset Finality
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stellar Consensus Protocol (SCP) settles trades in under 5 seconds, bringing physical bullion levels of liquidity to your screen instantly.
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-950/40 border border-slate-900/80">
              <h4 className="font-semibold text-slate-200 flex items-center gap-1.5 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                Audited & Collateralized
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                sXAU and sXAG are 1:1 backed by physical vaulted bullion monitored by decentralized Oracles. View proof-of-reserve details in real-time.
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-950/40 border border-slate-900/80">
              <h4 className="font-semibold text-slate-200 flex items-center gap-1.5 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Near-Zero Transaction Fees
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Send, swap, or loan metals with fees below 1/100th of a cent, enabling micro-savings and frequent trading without overhead.
              </p>
            </div>
          </div>
        </section>
      </>
      )}
      </main>

      <footer className="w-full border-t border-slate-900 bg-slate-950/90 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© 2026 GlintFi. Built for Stellar Hackathon.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400">Horizon API</a>
            <span className="text-slate-700">|</span>
            <a href="#" className="hover:text-slate-400">Vault Audits</a>
            <span className="text-slate-700">|</span>
            <a href="#" className="hover:text-slate-400">Terms of Use</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
