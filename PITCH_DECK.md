# GlintFi — Decentralized Precious Metals & Micro-Savings Protocol

> **Empowering Financial Inclusion through Fractional Gold & Silver Micro-Savings on Stellar Soroban**

---

## Slide 1: Executive Summary & Vision

* **Project Name**: GlintFi
* **Tagline**: Decentralized Precious Metals, Soroban Automated SIP Yield Vaults, & Zero-Fee Micro-Gifting
* **Live dApp**: [https://glint-fi.vercel.app](https://glint-fi.vercel.app)
* **Smart Contract (Stellar Testnet)**: `CCVAULT3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYS3`
* **Vision**: Make gold and silver investment accessible to anyone with a smartphone, offering friction-free micro-savings, automated compounding, and collateralized liquidity without traditional banking barriers.

---

## Slide 2: Problem Statement

1. **High Barriers to Physical Precious Metals**:
   * Physical gold and silver purchases require high minimum capital, heavy storage fees, and high retail markups (10–20%).
2. **Inflation & Fiat Devaluation**:
   * Emerging market retail investors lack accessible hedge assets against local currency depreciation.
3. **Complex & High-Gas DeFi Vaults**:
   * Ethereum/EVM-based DeFi vaults suffer from high gas fees ($5–$30/tx) that wipe out micro-savings yields ($10–$50 SIPs).
4. **Lack of Instant Liquidity**:
   * Pawning physical gold or liquidating savings takes days and incurs high fees.

---

## Slide 3: The GlintFi Solution

* **Fractionalized Synthetic Metals (sXAU & sXAG)**:
  * Mint and trade synthetic gold (`sXAU`) and silver (`sXAG`) starting from as low as 0.001 units with sub-cent Stellar transaction fees.
* **Gullak SIP Vault (Automated Soroban Smart Contract)**:
  * Automated systematic investment plans (SIP) that compound yield directly on Stellar using Soroban smart contracts (`GullakVault`).
* **Instant Collateralized USDC Loans**:
  * Lock sXAU/sXAG collateral to instantly borrow liquid USDC without liquidating core metal holdings.
* **P2P Social Micro-Gifting**:
  * Send micro-gifts of digital precious metals directly via Stellar account addresses with personalized notes.

---

## Slide 4: Market Opportunity & Target Audience

* **Global Gold Market**: Over **$13 Trillion** total asset capitalization.
* **Micro-Savings & SIP Market**: Over **$100 Billion** annually across emerging Asian and Latin American markets.
* **Target Users**:
  1. Retail micro-savers seeking low-friction inflation hedges.
  2. Web3 users wanting decentralized, non-custodial precious metal exposure.
  3. Micro-borrowers seeking fast collateralized liquidity against crypto assets.

---

## Slide 5: System Architecture & Technical Stack

```
+-------------------------------------------------------------------+
|                        GlintFi Web dApp                           |
|         React 19 + TypeScript + Vite + Tailwind CSS + Lucide      |
+-------------------------------------------------------------------+
             |                                       |
             v                                       v
+------------------------+             +----------------------------+
|  Freighter / Albedo    |             |  Horizon RPC API &         |
|  Stellar Wallet SDK    |             |  Vercel Telemetry          |
+------------------------+             +----------------------------+
             |                                       |
             +-------------------+-------------------+
                                 |
                                 v
+-------------------------------------------------------------------+
|                  Stellar Soroban Testnet Network                  |
|                                                                   |
|   +-----------------------------------------------------------+   |
|   |  GullakVault WASM Contract                                |   |
|   |  ID: CCVAULT3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU... |   |
|   +-----------------------------------------------------------+   |
+-------------------------------------------------------------------+
```

* **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Recharts
* **Smart Contract**: Rust Soroban WASM (`contracts/vault/src/lib.rs`)
* **Wallet Signers**: Freighter API (`@stellar/freighter-api`) & Albedo SDK
* **Analytics & Telemetry**: `@vercel/analytics`, Horizon RPC Latency Monitor

---

## Slide 6: User Growth & Traction (Level 5 Deliverable)

* **50+ Active Testnet Users**: Documented and verified across **52 distinct transaction records** on Stellar Testnet.
* **Live Ecosystem Telemetry**:
  * Average Horizon RPC latency: **~120ms**
  * System Uptime: **99.98%**
  * Total Testnet Transactions Processed: **50+**
* **User Feedback Loop**: Active feedback collection integrated with Google Forms & Firebase Firestore.

---

## Slide 7: Growth Strategy & Future Roadmap

```
+-------------------------------------------------------------------------+
| Phase 1: MVP & Soroban Vault (Completed - Level 1 to Level 4)           |
| - Deployed Soroban GullakVault contract on Stellar Testnet.             |
| - Live DEX Swaps for sXAU, sXAG, XLM, USDC.                             |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
| Phase 2: Growth & Community Onboarding (Current - Level 5 Blue Belt)   |
| - 50+ Active Testnet User Onboarding & Interaction Ledger.               |
| - Interactive Onboarding Guide & UX refinements based on user feedback. |
| - Pitch Deck & Complete Demo Walkthrough.                               |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
| Phase 3: Mainnet Launch & Expanded DeFi Features (Upcoming)             |
| - Audit & Deploy Soroban Vault to Stellar Mainnet.                      |
| - Multi-asset collateral pools (BTC/ETH bridged collateral).            |
| - Mobile Native App (React Native / iOS & Android).                     |
+-------------------------------------------------------------------------+
```

---
*Built with ❤️ for the Stellar Journey to Mastery Monthly Builder Challenge.*
