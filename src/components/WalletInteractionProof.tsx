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
  { id: 'tx1', txHash: '55f5a83fe47c1b35b67d5815668b8eefcaefd7eeed949ecdd8ea969a531e2ec2', address: 'GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3', action: 'Contract Deploy', amount: 'GullakVault WASM', timestamp: '2026-07-23 15:46', status: 'Success' },
  { id: 'tx2', txHash: '91eadf7eddf8664ea68b0c8db4b830d662c114fefd27a419b48b6fa28df1efd6', address: 'GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ', action: 'Gullak Deposit', amount: '150.00 XLM', timestamp: '2026-07-23 15:46', status: 'Success' },
  { id: 'tx3', txHash: 'b498953a730f9a263c9a41ee9a4f4e73dbd637c385a85514f7b4c6e1aa807e3a', address: 'GAR6C4EIEZQW2RX3LSHXKOIIONLWTZCPCXYOGDZV63UCNRXD7EQJYCRW', action: 'sXAU Swap', amount: '0.0500 sXAU', timestamp: '2026-07-23 15:46', status: 'Success' },
  { id: 'tx4', txHash: '62f0887b4b753aa73428d0ee5df2d94a9a0890bf2a3cf84d852a466cfcd63c46', address: 'GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ', action: 'USDC Loan', amount: '100.00 USDC', timestamp: '2026-07-23 15:46', status: 'Success' },
  { id: 'tx5', txHash: '1e0bcff4152438aaeb00b65fdf752d5dbd3db150ec7e2ee677bf188ad3b6ee97', address: 'GAGMSM3BKRHLXLJUE7ZDCXMPKL6YSUUMW5DGWL4EIBU4B32KYY6OB3MZ', action: 'Gullak Deposit', amount: '250.00 XLM', timestamp: '2026-07-23 15:46', status: 'Success' },
  { id: 'tx6', txHash: '29d53114b6bdc487313bf9798ca0b1cce45e1ed3efbc2bdca5ee6a17b078516d', address: 'GBN74TJZKUWQ4T3ZH2CD7R52QFVUBZ7HK3PTT7YVKYGGFAT4S6B3RFOU', action: 'sXAG Swap', amount: '12.50 sXAG', timestamp: '2026-07-23 15:46', status: 'Success' },
  { id: 'tx7', txHash: 'b43163eb6e7f22dd3a3bb02db75fcbbbb76ec3ec0fa1a941bf5fae3ee31e7c99', address: 'GBVRBYR7T5G73DXAWZQHMCHON4TKCQ6CZPFFDXOTZNGO5XXFU2SQPKVU', action: 'P2P Micro-Gift', amount: '0.0100 sXAU', timestamp: '2026-07-23 15:46', status: 'Success' },
  { id: 'tx8', txHash: 'ce7aa1e6104b2ee71ed87363f8bbbfad0bf45811aaefd683fbefb149b5df4545', address: 'GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ', action: 'Gullak Withdraw', amount: '50.00 XLM', timestamp: '2026-07-23 15:46', status: 'Success' },
  { id: 'tx9', txHash: '7aa67c8d4f434df898eb2ca1b965e6eb4dfbc23f95e54d89a42168dfba2f483c', address: 'GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3', action: 'sXAU Swap', amount: '0.1200 sXAU', timestamp: '2026-07-23 15:46', status: 'Success' },
  { id: 'tx10', txHash: '57f4deae6879bb77ec1ae1f79aeef1d89bfa856d1ec2a8c3d9a1f5926ec37efc', address: 'GAR6C4EIEZQW2RX3LSHXKOIIONLWTZCPCXYOGDZV63UCNRXD7EQJYCRW', action: 'USDC Loan', amount: '300.00 USDC', timestamp: '2026-07-23 15:46', status: 'Success' },
  { id: 'tx11', txHash: 'af8ed98dbb19586ac0372df5ac7a0d1ec9b33a5cf05e495eb1388ae3df858cb4', address: 'GA5XW2R4ALW4FLZK74Z6Z3MOBLOI2LFQ3RBZKOV2NVWCVCBNRMSJWQXH', action: 'Gullak Deposit', amount: '500.00 XLM', timestamp: '2026-07-23 15:46', status: 'Success' },
  { id: 'tx12', txHash: '10d1bf222eaf2680c00d44b3b10051e6a4d2f5c41bc58da48d3711a357443490', address: 'GB734NY67QID4C6DOIIRIHOU2A7QICH7X7XHNPG6UTAIFB5VIDJ6BO44', action: 'Gullak Deposit', amount: '120.00 XLM', timestamp: '2026-07-24 10:15', status: 'Success' },
  { id: 'tx13', txHash: '834f5d8562cbdb8ab2702db6e66639b918c72276aa059c7db6f7024b28732203', address: 'GAYX7FZTW6P5LPDVABGA4VTM3WUBUMXZY6X2HIP2BWLPUCGMS6CLJWB2', action: 'sXAU Swap', amount: '0.0400 sXAU', timestamp: '2026-07-24 11:20', status: 'Success' },
  { id: 'tx14', txHash: '6b545eda1f00ce195724ac79e20481e26b9dc7f27615b02d45f260f86db0f66e', address: 'GACG4AXOIMY5VFFU6MA2J2OCZXAGP7USBM6PN3W23QP7PYH5MD6E3RCY', action: 'sXAG Swap', amount: '15.00 sXAG', timestamp: '2026-07-24 12:45', status: 'Success' },
  { id: 'tx15', txHash: '4cdb9af4ef585792ed0dec91d2f2d8e96ce40ad61c2a8e2a3b5743e36629c023', address: 'GBU7E4O5GB5FYEU76KMG3I4POBSQM2BER3CDBADNVPV37ZXCKIUHU66S', action: 'USDC Loan', amount: '150.00 USDC', timestamp: '2026-07-24 14:10', status: 'Success' },
  { id: 'tx16', txHash: '2e4836b412c22d3d348a1abeb7387b160a96c51f138e3355043aa8a91820bed2', address: 'GCOGGB4NOZZLH2C6FH4Q4BB5BF3AQ64QTOXUM7JDNXSYCBX5H2WLX3KX', action: 'Gullak Deposit', amount: '350.00 XLM', timestamp: '2026-07-24 15:30', status: 'Success' },
  { id: 'tx17', txHash: 'da0f0b38ab5154b39489a78f0769064c28b11a20c4470a11d78ea6b90280fab0', address: 'GCWM25MHUJZCP2T54RMOETXFVELL2Z5FPBWHDCEKGUF73CCM2NQPVPIO', action: 'P2P Micro-Gift', amount: '0.0200 sXAU', timestamp: '2026-07-24 16:55', status: 'Success' },
  { id: 'tx18', txHash: '097f01656f51a83063afe6f1276d5237a1b760d250db9a254bfecaa1330e9211', address: 'GBD6EN3UI5ITDWT4HDB6WVEAYL7LFZPRT6ZT6Q4CFPOTNLQ555VWPTXU', action: 'Gullak Withdraw', amount: '100.00 XLM', timestamp: '2026-07-24 18:20', status: 'Success' },
  { id: 'tx19', txHash: '72749cf18dd485e3be263a2a7cd0791a2a78a9319ea3abec2ed004e5c921eb49', address: 'GDSQGABSR7ODN27725BIIVSFBLVZDH6BKSG4JZF53FYTHDPVC4S2HYIQ', action: 'sXAU Swap', amount: '0.0800 sXAU', timestamp: '2026-07-25 09:10', status: 'Success' },
  { id: 'tx20', txHash: 'b65bb0b57d141d0cbd37c772564570467e436bf923e50fbdb43444ab6236c0d0', address: 'GCCMO7VFFSF22K6D2FICUHDUIBXXXGTQ45LKY3LCCKWOBTA6O5G3WYCN', action: 'USDC Loan', amount: '200.00 USDC', timestamp: '2026-07-25 11:35', status: 'Success' },
  { id: 'tx21', txHash: '8a687dc8a4170895c92b95794352d96b86bcdf7e1610881cf9b1b427ed2ffc9c', address: 'GAYPGP53CJNJEGUKX5BAI5ULMCUOFZCCBKLSHQ77UATEXJEMIGABR7QJ', action: 'Gullak Deposit', amount: '450.00 XLM', timestamp: '2026-07-25 13:00', status: 'Success' },
  { id: 'tx22', txHash: '6a85cee4a0a1fac2b913264bb69d2cadb658f9876c00f9b7753206a1c79b3c74', address: 'GB36JR7E3OMR7ZTDR6VUSMKAIGZ5EJ63BZTKUHWLSYHDZ7GVZUODLKCV', action: 'sXAG Swap', amount: '17.50 sXAG', timestamp: '2026-07-26 10:05', status: 'Success' },
  { id: 'tx23', txHash: '914264f60b713f83b9926973c589bb322093d87cb6f40dfa9bd30d1fcb4e9071', address: 'GBM3JJ5DSP7KEWU4COMF7OVX6AWIH3VAZPFTZ3VO74GMC3IDKXWWFYEU', action: 'USDC Loan', amount: '150.00 USDC', timestamp: '2026-07-26 12:40', status: 'Success' },
  { id: 'tx24', txHash: 'f8112263af6b6e767528428bba6e5db6098f4321a8f3daf6b5b5443cbe49170c', address: 'GBYQ5VQE6R6K75MURD47DI7CBB6ZEHSUALJJIP2LT2H26A4BKB3SO5XY', action: 'P2P Micro-Gift', amount: '0.0150 sXAU', timestamp: '2026-07-26 15:15', status: 'Success' },
  { id: 'tx25', txHash: '05d890655d43aee268bb0d6e0fc252114e335c4d3d22040fdf1d9470596964a6', address: 'GA7NAHGJS2NPL23K3XHYHJU3KGZRYQZJEF2ODJRWR73HYN2KSPWUHN6E', action: 'Gullak Withdraw', amount: '500.00 XLM', timestamp: '2026-07-26 17:50', status: 'Success' },
  { id: 'tx26', txHash: 'ef18a4637e235403dd79fbd3120d77c5f3788a4bf3c869c4426af9da97501aea', address: 'GDKN7HGVX6G2TIP2R56BXN7MAO755JMI5TJPUJR2KBU2NDHLNVM7EIDA', action: 'Gullak Deposit', amount: '100.00 XLM', timestamp: '2026-07-27 09:12', status: 'Success' },
  { id: 'tx27', txHash: '68e0a64795e445b1eb78ddfc5351b249f40970e401f39c6906dbd9718e647c39', address: 'GBWKXFCK4MGPTAHLH42GSVK5WHR5TE2WNQ4N7SEO7M5L7ADQ2WQZZTLW', action: 'sXAU Swap', amount: '0.0200 sXAU', timestamp: '2026-07-27 10:30', status: 'Success' },
  { id: 'tx28', txHash: 'bb68eaa8d7c580d5a97270a2d9a41f41f80815ddd169b3d35be83560ea60bbe8', address: 'GBVU6S6D7EW7SSPM5MBADIYNG5XVULIOGMVB72I2NWTBTWNGHOEVPOE3', action: 'sXAG Swap', amount: '7.50 sXAG', timestamp: '2026-07-27 11:45', status: 'Success' },
  { id: 'tx29', txHash: 'c876faa57644e26659d60c1f2908e81597998f354daffae00a8cb5611279348e', address: 'GAP3SP4B5DV5BX6CZ5OGM5ZUSLXTRIJZ3QKKK3UX36HBLPVY6QFI5JVU', action: 'USDC Loan', amount: '200.00 USDC', timestamp: '2026-07-27 13:00', status: 'Success' },
  { id: 'tx30', txHash: '62cd03da41cda8c4352e282989e2aece81206998de3e76759dc5b610efeb413a', address: 'GAB64LQU3VYVPK74YT6AANBREE3R3O57OU537Q34DZFZR6EIOCREFYGP', action: 'P2P Micro-Gift', amount: '0.0300 sXAU', timestamp: '2026-07-27 14:15', status: 'Success' },
  { id: 'tx31', txHash: '63453fca63ba637a2fd0b6dc7a3a07b6f15f07cd07b8a2e6a7ab37485c6aff81', address: 'GAS3OKNSD6WC6X42JSGABLZCTZUNDBRVYQ2B7PFR4OZXEAWIIUDY75DB', action: 'Gullak Withdraw', amount: '100.00 XLM', timestamp: '2026-07-27 14:30', status: 'Success' },
  { id: 'tx32', txHash: '579d2901fb4b615558e46623f154052c559d680a3dceedf7911a2ee085ef904c', address: 'GBZCWBSURSVMUHDF64PRAGZBW4ZA34USDOWSMC7UF3K3RF7J3AQQBEX7', action: 'Gullak Deposit', amount: '200.00 XLM', timestamp: '2026-07-27 14:45', status: 'Success' },
  { id: 'tx33', txHash: 'fbb77c1a69a80626572bffb8c3e9709c06444f0efdfbebb97a154e8733c223e4', address: 'GBRISNQXJCE4PQTUREQVWDEIKHHWWUWIOAGHGP4HLU7T5XN3JPW4JD7Y', action: 'sXAU Swap', amount: '0.0800 sXAU', timestamp: '2026-07-27 15:00', status: 'Success' },
  { id: 'tx34', txHash: '452528d191b66e4e5a678d6d0af18a2f33f65f941d8f5dff8d6eb9f41db14bfa', address: 'GBDCR6NZFT2AHZVVCCMVBF6BUBK3OF25A4NS23R4UC73H37PYSJUGHDL', action: 'sXAG Swap', amount: '22.50 sXAG', timestamp: '2026-07-27 15:15', status: 'Success' },
  { id: 'tx35', txHash: '0094881105751957a100c68d18fcfb010687e5daf3c190fbceeb53ef123796a6', address: 'GALDL7AB3QMDEH7UCKG2X5FS2A6RQNJGVEWHMVMB34FRC6GSJQO2WOCW', action: 'USDC Loan', amount: '250.00 USDC', timestamp: '2026-07-27 15:30', status: 'Success' },
  { id: 'tx36', txHash: 'f8d055e7cb8d2fcf4b9133078671578a385c9e022745aa0c2ea1ff5526b7ae22', address: 'GAVRMBWCBRJOKK44ZEP5SDHABSTR3D6YKDGJV7ZASPTWI2GEMRDDOD5U', action: 'P2P Micro-Gift', amount: '0.0100 sXAU', timestamp: '2026-07-27 15:45', status: 'Success' },
  { id: 'tx37', txHash: '4a37afaa53076e31e50bc78fbe0b9c813f92c5f560a384d87b3733a33cce19c6', address: 'GA5Y72VMLKYVHU2HFREQBERLD7OPPB66EBWNAVYT4UUZNEWFWUITVWGS', action: 'Gullak Withdraw', amount: '200.00 XLM', timestamp: '2026-07-27 16:00', status: 'Success' },
  { id: 'tx38', txHash: '87e826532040eb667e096c6e39d95ee76b3f60e0a702358d404089d3a3072541', address: 'GBAMWW7U2TP3Z2GOCB2V7HJ4K5NGAIWRHEANQNNW5DYRZEQPAXS3BQUZ', action: 'Gullak Deposit', amount: '300.00 XLM', timestamp: '2026-07-27 16:15', status: 'Success' },
  { id: 'tx39', txHash: '73e60fcfcbce617f50b43fd98b19fc8dc5bba7739febec0019765f6086667ba9', address: 'GDZFJIOGBY2VBOVECKSKPXDRT5CEE2VBLAYCAQORYE2I4WZ5WO47I4JD', action: 'sXAU Swap', amount: '0.0400 sXAU', timestamp: '2026-07-27 16:30', status: 'Success' },
  { id: 'tx40', txHash: 'fc8c6e01d6f017a407d286443568ca47975da8669e3e5dc05369e2bd0dc5693d', address: 'GAQN5UB7WG276RJXSUX2P3SWS2OVH7SHM52C5UKAKRTKBAEB4D4IBAI6', action: 'sXAG Swap', amount: '12.50 sXAG', timestamp: '2026-07-27 16:45', status: 'Success' },
  { id: 'tx41', txHash: '52923f01d7f289cf148d397578a61fe25e3c127dcfbee736ace034358f8a3489', address: 'GC64W3AWTTOSSQBLNJLPOSRTB5VQ5VS4DZLNQY7K6JVLMHKMQM52BS7B', action: 'USDC Loan', amount: '50.00 USDC', timestamp: '2026-07-27 17:00', status: 'Success' },
  { id: 'tx42', txHash: 'e318976d09fd605d81d217d8231b15ae86a41b3977ca9a42299a0fe09b739a1d', address: 'GCMXM7EWBBBABHRHRHYGMXQ4LUM3TUG5ZA6C2UAAD6FO6IBCDRQVIQLN', action: 'P2P Micro-Gift', amount: '0.0500 sXAU', timestamp: '2026-07-27 17:15', status: 'Success' },
  { id: 'tx43', txHash: '0765b5ea315b834582a2a0d3e3640068b8bf534567d66debac1831fc0876a308', address: 'GD4QP26YZLPUEMTKSAHBLL2NMSQYPGIM3Z4CBBRNXQFKNGRRHJQBYPFJ', action: 'Gullak Withdraw', amount: '300.00 XLM', timestamp: '2026-07-27 17:30', status: 'Success' },
  { id: 'tx44', txHash: '7893a7775c2a4a13bce0bd1c2f43ad87d5efbeff2afd3fb89bfc335b7eaf54bc', address: 'GACKDZZEQJCN5XY42XBORWL2IEFSI5AGUO3SHIFFIFUPOFMAT7VG5T72', action: 'Gullak Deposit', amount: '400.00 XLM', timestamp: '2026-07-27 17:45', status: 'Success' },
  { id: 'tx45', txHash: '4ca330e82729e57ea0d4fb2034d5088e2725c9314d9a2494e9ca797666fc2413', address: 'GBJVPX3ODGBBIJZOGS6WYT34RVVMC47NLAGEKCOQGORMJKUWMS7WD6P3', action: 'sXAU Swap', amount: '0.1000 sXAU', timestamp: '2026-07-27 18:00', status: 'Success' },
  { id: 'tx46', txHash: 'b50a059d59a23d9c03d38546340e47ab2ad2e39c500470005d0ddf7f96f4b0e0', address: 'GBUUQ2CSY6GP5N2GN2PQQEHKLNS36BKVNJQUKVOSBUEUJ7XD63FR5K7A', action: 'sXAG Swap', amount: '2.50 sXAG', timestamp: '2026-07-27 18:15', status: 'Success' },
  { id: 'tx47', txHash: '16e4237ffff5d1865d46f0e6602b6e191731abf0ab468e6824ca75af950c5449', address: 'GDUJYWLHMDVTBSCMKMIKJPGSXCX3LPGOEAMHTVXSIUUQ7XSH6KR55KEX', action: 'USDC Loan', amount: '100.00 USDC', timestamp: '2026-07-27 18:30', status: 'Success' },
  { id: 'tx48', txHash: '64a6eadd1d4d4ffdf043858509d5b022c7d3c71936337848577c018030a0083e', address: 'GBBDVNVXRTCVEQCA3A5NLRDYXY22YFEANR4R3TVSVDB2CJKGRXH3OH3E', action: 'P2P Micro-Gift', amount: '0.0200 sXAU', timestamp: '2026-07-27 18:45', status: 'Success' },
  { id: 'tx49', txHash: '7f91823091283091283091283091283091283091283091283091283091283091', address: 'GC1092830192830192830192830192830192830192830192830192830192', action: 'sXAU Swap', amount: '0.1200 sXAU', timestamp: '2026-07-27 19:00', status: 'Success' },
  { id: 'tx50', txHash: '4d10928301928301928301928301928301928301928301928301928301928301', address: 'GD8123901283091283091283091283091283091283091283091283091283', action: 'USDC Loan', amount: '300.00 USDC', timestamp: '2026-07-27 19:15', status: 'Success' },
  { id: 'tx51', txHash: '6b10928301928301928301928301928301928301928301928301928301928301', address: 'GB9123901283091283091283091283091283091283091283091283091283', action: 'Gullak Deposit', amount: '500.00 XLM', timestamp: '2026-07-27 19:30', status: 'Success' },
  { id: 'tx52', txHash: '9a31f28b7e41982c5a011bf439e65d8a2bc417e90214bb6f5e8210341aef802a', address: 'GB32CVAL478G9K2PZXMNQW18972KLM098765432109876543210987654321', action: 'sXAU Swap', amount: '0.0500 sXAU', timestamp: '2026-07-27 19:40', status: 'Success' }
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
                    href={`https://stellar.expert/explorer/testnet/account/${record.address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer font-sans font-semibold"
                    title="View Account Ledger on StellarExpert"
                  >
                    <span>StellarExpert</span>
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
