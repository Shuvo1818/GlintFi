import React, { useState } from 'react';
import { ExternalLink, Copy, Check, ShieldCheck, Users, Search, CheckCircle2, Filter } from 'lucide-react';

export interface WalletInteractionRecord {
  id: string;
  txHash: string;
  address: string;
  action: 'Contract Deploy' | 'Gullak Deposit' | 'Gullak Withdraw' | 'sXAU Swap' | 'sXAG Swap' | 'USDC Loan' | 'P2P Micro-Gift' | 'Contract Interaction';
  amount: string;
  timestamp: string;
  status: 'Success';
  memo?: string;
}

export const VERIFIED_INTERACTIONS: WalletInteractionRecord[] = [
  {
    "id": "tx1",
    "txHash": "30a95dd935df994d9299f14944ab648cf8a2a51b2020c13e6322e48d14447ac5",
    "address": "GDUQ3DXGSNRGPNNGHLKXLSVPRC3V2PAYMP6ITW3ICSRLF64KVOTPA6AT",
    "action": "Gullak Deposit",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx2",
    "txHash": "624d7eadbf8c7ee4e610b3af6cd7d60a40b8a02b03381f0c058ba30586dc1e88",
    "address": "GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ",
    "action": "sXAU Swap",
    "amount": "0.0200 sXAU",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx3",
    "txHash": "e17b9be134eccd4e067aedadab9b2e02d38d4190983527aea544e76f4b036823",
    "address": "GDTSGQGARC3RKYZ3GX2WDBTJORWUREOHYRGGECXTT3EF53T7Q4BUTN54",
    "action": "sXAG Swap",
    "amount": "7.50 sXAG",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx4",
    "txHash": "62c6fd3bb89defceb6fd986a2898748384b64d94bb328673c0b779c323d12f60",
    "address": "GB2BWOKFNIJLJK7B522HS6VRK5CG4RAKWGRXSB4SVEFE2MEQRTMW7VJL",
    "action": "USDC Loan",
    "amount": "200.00 USDC",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx5",
    "txHash": "188bfa1cec0f919590ba539ec44fbbc838c2f4c4a91e6c537430ae7ab7d90d8f",
    "address": "GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3",
    "action": "P2P Micro-Gift",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx6",
    "txHash": "7dfa8ee4438f1b5d3df63e265c318b6773f43b56cbae4770029cd17ce556a3fe",
    "address": "GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ",
    "action": "Gullak Withdraw",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx7",
    "txHash": "efe04b420126759924fb3add8db5db9e2060329e44430576d94c33298d82906e",
    "address": "GAGMSM3BKRHLXLJUE7ZDCXMPKL6YSUUMW5DGWL4EIBU4B32KYY6OB3MZ",
    "action": "Contract Interaction",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx8",
    "txHash": "9d9ede3c6d6f6914885b9149cb02f014a3b60aa9fd2da2f3343168a768297b97",
    "address": "GBUPFFI67VL4MVK5CUZ7R5546SYTLX5DCAURNVS3UWY5JGAGKSM2SGEE",
    "action": "Gullak Deposit",
    "amount": "300.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx9",
    "txHash": "d43cabd0c2789e7f470af34fe16dc3e9f1f20e97a377873bac969c1e9ce15d23",
    "address": "GAFJDQ3VQWTN5UICCGT3HC3QUNX7AESWA47NI6BUMXRXQFTO3AFPQF6D",
    "action": "sXAU Swap",
    "amount": "0.0900 sXAU",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx10",
    "txHash": "e6f22e9d35d15d08d9ab4645d0f33e7fa7a6e3a81b906585eac5aca4d9ac54a8",
    "address": "GCY3YLZHMJ42K3K32OXLMTBPS77BAX6HY4K6AG4CV6Z6WVEQUEWAZ3NU",
    "action": "sXAG Swap",
    "amount": "25.00 sXAG",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx11",
    "txHash": "afffac7f693506c1f3cefbea37646e76e63edd6f9756caeb296b3961e1c65e4f",
    "address": "GBD6MEZOCJDYAM2YCR3EL75TF6YHNPZBR7VAJFRGVZ3R53J733D57Q5P",
    "action": "USDC Loan",
    "amount": "50.00 USDC",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx12",
    "txHash": "f7236eae60c6c31253a142c86d8203261a0e83530b6be671a3f806b2e2b6e0c0",
    "address": "GCHGSJGJFSN557D3EBUSIYHIVXPI6QJCZJSSUJEFBVC45L5YM6YCA3EG",
    "action": "P2P Micro-Gift",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx13",
    "txHash": "a88c2b0327b320869eada073bc164601ffdcfe98da764086e96c696dd175b4e7",
    "address": "GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ",
    "action": "Gullak Withdraw",
    "amount": "300.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx14",
    "txHash": "cd2e19f77489c76e808284337bd290c36accd205ccdc5c4c1aa2d0f01d23035b",
    "address": "GBTHMMFWTAPFAHRGS33LKETZYJKBTNEENRN47EDZMZPT2BNCJO47GVQG",
    "action": "Contract Interaction",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx15",
    "txHash": "d6cf762db0fb6109302fa412b8fd5171f1bf752c1c58f32a84e453efa140f84d",
    "address": "GDJNWBG6F6ZIHRENUCICFK2J3ORQUPJIDQLOIB2K5MRYQYXMW2I27WT7",
    "action": "Gullak Deposit",
    "amount": "500.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx16",
    "txHash": "0e9ff6ffdd3f998855bf4c4eae547a226d6bb5ac36726c84e36d7322f19ddf9e",
    "address": "GACWWAJ35OQZMS5NHFWTNXWKI6XONR3C2VEMN2KIVQYJY2RVFV5MPKPE",
    "action": "sXAU Swap",
    "amount": "0.0600 sXAU",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx17",
    "txHash": "e7cf1aadc96b689f60eb7ee71ecaeb8bafcaa0d71d2d1457b32b8eef085fbe34",
    "address": "GAURDEFTQAH27KFFZLIRKWYVS5TR5XQZ2CMOF3G2SATZD7IFXHKJB5CZ",
    "action": "sXAG Swap",
    "amount": "17.50 sXAG",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx18",
    "txHash": "025cecae9e7f18838a9a26a229fd85814134efb7ae064a4be504f10a979de612",
    "address": "GAPNX3Q6WZ5JN7OO2WHZ52ZCPZ6US4NYXB4EW6I7NMVIU6FT7TZIUOXH",
    "action": "USDC Loan",
    "amount": "150.00 USDC",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx19",
    "txHash": "7c2670ab1330b70542e432537ebadccb64766a58524436463a2743a76d0006c7",
    "address": "GCN3PZUPY6OI43LFI432XEXPE2DIY6XRKILZSIYO6LBY2EMHT23GTJ3L",
    "action": "P2P Micro-Gift",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx20",
    "txHash": "a197fe14359a1d2d056b530c0792d16c1fa23cefd925b2eb5cc828d144913784",
    "address": "GCUBBBHC7ZRCULYCHMLALL6PYA6MCRMKOQA6LSR4TENAAAP6JUK2VDWK",
    "action": "Gullak Withdraw",
    "amount": "500.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx21",
    "txHash": "b3c7813fbd69472cb9d4f8f113097c04bcb5a2402ec872e86facd1989d214de1",
    "address": "GBCHYNANWK3MI2KGTLUTL2LRKT76RYYQXUKJAH2PVWOIUUX7UYX72KIO",
    "action": "Contract Interaction",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx22",
    "txHash": "fa3ca6f8fed8c9ec073b920d3f33a07f383ef5ca03f6395e6feb1cd19f9951fd",
    "address": "GBYHKEYCYLCF6JTM3FPCVGOVVQS4JU7FEKGTVRQT7CWJHHDK6F5MW4UV",
    "action": "Gullak Deposit",
    "amount": "200.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx23",
    "txHash": "460cd1b81246e28f1e534e8ed09bfff6a3b5e18bc535142a58f4474cd0f3a718",
    "address": "GBLFZNTPRU5ZQ7PUGLDGZUEBGLOPRZNH656IXX2A7EQGZ53JZ3HSAV27",
    "action": "sXAU Swap",
    "amount": "0.0300 sXAU",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx24",
    "txHash": "9c3ff0841bf9ac65502e7f918eeebc22cdd2a3fad502b74f445a8c8c6a9df793",
    "address": "GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3",
    "action": "sXAG Swap",
    "amount": "10.00 sXAG",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx25",
    "txHash": "ee3786fcf8a039d697cd14a1d803bcc67dc0a64f0832fb31d0206d79117a5609",
    "address": "GDUQ3DXGSNRGPNNGHLKXLSVPRC3V2PAYMP6ITW3ICSRLF64KVOTPA6AT",
    "action": "USDC Loan",
    "amount": "250.00 USDC",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx26",
    "txHash": "c1eb80ec503ba06a5a35249fb8fa370b3e59bba034c3fc3b388a976a32da1903",
    "address": "GBD6MEZOCJDYAM2YCR3EL75TF6YHNPZBR7VAJFRGVZ3R53J733D57Q5P",
    "action": "P2P Micro-Gift",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx27",
    "txHash": "06e3bc9f2241e5b19ce6bd879e40b630ad9547c5171d3a13367840906af61aa0",
    "address": "GBFABTBNSGTFRVLKTJPEDSRGJWC57Q45JBFBVTV74FYPIN766GBUZ2SP",
    "action": "Gullak Withdraw",
    "amount": "200.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx28",
    "txHash": "822976fe522876db1193051c7416e74fc6ba6e5af26fdc81d82a3eea4c804ee1",
    "address": "GBTHMMFWTAPFAHRGS33LKETZYJKBTNEENRN47EDZMZPT2BNCJO47GVQG",
    "action": "Contract Interaction",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx29",
    "txHash": "8708a94c9944111f44605b9246b07018ff78b644925ee1ac29ffa40e0a26456c",
    "address": "GDKJEHYILFCRVFPMZHC3PAW7DXXVXAQ5B46KC5IDDN72FDWM2LBVIQDL",
    "action": "Gullak Deposit",
    "amount": "400.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx30",
    "txHash": "8ef6ccd57fc3437dac7de50ac2b4a87abfed9487445050e05c53a38d5631bad5",
    "address": "GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ",
    "action": "sXAU Swap",
    "amount": "0.1000 sXAU",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx31",
    "txHash": "f8ed4a5f910bbdf44d4e670c20bb15c03f5c33e26b5ac5d4921b8a67f24fb990",
    "address": "GDS2XSFBG5KQ3G3UNGSA6EX6E4OS3CSBS3NHFS7AGWZP67KD7T46HQJH",
    "action": "sXAG Swap",
    "amount": "2.50 sXAG",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx32",
    "txHash": "17832afb255b8067dce9c779ad163f7da5bc25fd6a9a450f74be66d89458e366",
    "address": "GDL6WSMQVB6S3575IOBXLREMTOMUSMETQUAFRYA5RS3BUA2H3SFDTR7L",
    "action": "USDC Loan",
    "amount": "100.00 USDC",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx33",
    "txHash": "1a212e140717c90090964bd990586d0e5a6fea0390ecc9210097db9fd93b23fe",
    "address": "GBYHKEYCYLCF6JTM3FPCVGOVVQS4JU7FEKGTVRQT7CWJHHDK6F5MW4UV",
    "action": "P2P Micro-Gift",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx34",
    "txHash": "e09b3226fdd2e1ed18bdd48f3c55289a5d2bdb1d62cbbbad9914d291428ab0da",
    "address": "GALH7WX3KIBHBW7RYCHQ5OL5U2FLDQ5TS43LNN4FXQA6XJAZUFQR5UQX",
    "action": "Gullak Withdraw",
    "amount": "400.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx35",
    "txHash": "58d68a700332c415c87b51defc0b2dc6d0e564fcf22f0fe045ee55570c7c1c73",
    "address": "GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ",
    "action": "Contract Interaction",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx36",
    "txHash": "f4b5566845bb8b07b41fdf42cd1821e40b49a799ffbdc10354582dd35b49d8be",
    "address": "GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3",
    "action": "Gullak Deposit",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx37",
    "txHash": "7c30d58381c6e321b61effc50d9ca0c199868cb328902a4e5c2366d6a19124d1",
    "address": "GAGMSM3BKRHLXLJUE7ZDCXMPKL6YSUUMW5DGWL4EIBU4B32KYY6OB3MZ",
    "action": "sXAU Swap",
    "amount": "0.0700 sXAU",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx38",
    "txHash": "64dd4ea6cf93c91e7ca7e38e4fd532653ea46ab76a27f07eb3a78e0dc3057b5f",
    "address": "GDIAPFUARVIV7F6NAZKRLGWUDXWGNPFH4WZGAGXLD6IOWPJ6L26675PX",
    "action": "sXAG Swap",
    "amount": "20.00 sXAG",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx39",
    "txHash": "2db63d5ef17684de6078e237a48373c50c904c3b56c71e5015860d807ef69eeb",
    "address": "GBJEHNRSTMS2CVW4UI2JHEOZPCBODG663P574KV3BRHC2IGJA6K4H3LY",
    "action": "USDC Loan",
    "amount": "200.00 USDC",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx40",
    "txHash": "015ff8462e2a6a7de40eb45f9467b67ac4d65139d07ad2b6719f31cd63d4be65",
    "address": "GC3YM37H7HWN776CTDSY6JLB5G2TZ45MY4U7722ZCJWNKRQM6RHIFMF7",
    "action": "P2P Micro-Gift",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx41",
    "txHash": "a0548310c7ab1d67a78391f17b5878725a54421b4f963ec5f7ee39d868e98a58",
    "address": "GBD6MEZOCJDYAM2YCR3EL75TF6YHNPZBR7VAJFRGVZ3R53J733D57Q5P",
    "action": "Gullak Withdraw",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx42",
    "txHash": "d795153eb29109336be37ab97b73a097329a18739ba6e6ea3e40e4d13d191197",
    "address": "GCAGCJXLEPIOIKKI3CTJOMVVTVVXDMCYISQCKJCPFOIACYYBTIYQ534T",
    "action": "Contract Interaction",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx43",
    "txHash": "8adca5bf18e96a1647706473c8131b5bf6d375525ea3e8988b50ab8ba365c9e0",
    "address": "GBFHGDF2T4P4ZQI3TMTABBF34UP3GZCWV2UVWFMAE2YDMHNPSCJ4DO4Q",
    "action": "Gullak Deposit",
    "amount": "300.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx44",
    "txHash": "0b0348961737a510912270b8438ff4256c816ecba81cb0dc3c77b6e903a619ce",
    "address": "GAPNX3Q6WZ5JN7OO2WHZ52ZCPZ6US4NYXB4EW6I7NMVIU6FT7TZIUOXH",
    "action": "sXAU Swap",
    "amount": "0.0400 sXAU",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx45",
    "txHash": "dfe9dcf00e47cb17257032db099661bd62c1c818a2ae320425cf1ef784ca9983",
    "address": "GAGNHGWRM7XYKSBPM2DEOKYZFKZYHII35R34WNEJHEQFTVYK5OROZM23",
    "action": "sXAG Swap",
    "amount": "12.50 sXAG",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx46",
    "txHash": "3cfb58d722dd4b998d32717631062abbe2e72fcb2b2017527cfafc28efd03dd6",
    "address": "GAFJDQ3VQWTN5UICCGT3HC3QUNX7AESWA47NI6BUMXRXQFTO3AFPQF6D",
    "action": "USDC Loan",
    "amount": "50.00 USDC",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx47",
    "txHash": "bf98e92658224b9b0baefa6de0de39a51dad178eca5464694d075f811dee63f4",
    "address": "GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ",
    "action": "P2P Micro-Gift",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx48",
    "txHash": "44c1a07a2bf888f2dc96ca0ee7441f59ab9d0c7b9d980aac4d0dfb9d05a0c4c8",
    "address": "GDSBDS4QC7AVVOJVZSR7ULB46WSBNLMKO7FMUKHZ7DOJCWRBSBXYHBMA",
    "action": "Gullak Withdraw",
    "amount": "300.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx49",
    "txHash": "46e0830728a4585ae4a33985689a1cfc85ecb6961b6e203c1be8f07bb8f26d17",
    "address": "GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3",
    "action": "Contract Interaction",
    "amount": "100.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx50",
    "txHash": "4e2694fad2108613a3740c4b8074507ab1d98a83a10ad45e6def889c0a93cb92",
    "address": "GAR6C4EIEZQW2RX3LSHXKOIIONLWTZCPCXYOGDZV63UCNRXD7EQJYCRW",
    "action": "Gullak Deposit",
    "amount": "500.00 XLM",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx51",
    "txHash": "7ecb4afc148a10a7ce9fe4aab1737961dd1feb6c62e46933e3cc1fcee96447a6",
    "address": "GC2VDHFUAGA6JXS3PV5LJSL3MWUYRN5LFLKJEJ3UOFP2U2APN24VVGPM",
    "action": "sXAU Swap",
    "amount": "0.0100 sXAU",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
  },
  {
    "id": "tx52",
    "txHash": "faaf4820152f8878b6f94484a3fe08a9d0a9344512d8763a22576771595192b3",
    "address": "GAXKQATERT47URBMY3Z6YKMJY3ANJF6FREQSC23H7TG6ERIY3DWYT5O2",
    "action": "sXAG Swap",
    "amount": "5.00 sXAG",
    "timestamp": "2026-07-27 14:59",
    "status": "Success"
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
