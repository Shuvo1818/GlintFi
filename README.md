# GlintFi - Decentralized Precious Metals Hub

## 📝 Project Description
GlintFi is a premium, highly responsive Web3 platform built for the **Stellar Journey to Mastery 2.0 Hackathon**. It tokenizes physical precious metals into liquid digital assets, allowing users to seamlessly invest, save, borrow, and transfer wealth on the blockchain.

### 📈 Core Investment Mechanics
GlintFi introduces **sXAU (Synthetic Gold)** and **sXAG (Synthetic Silver)**. 
- **Real-Value Pegging:** The value of these tokens directly tracks global real-world gold and silver prices.
- **Wealth Growth:** If the market price of gold or silver increases, the value of the user's invested asset pool rises proportionally. This provides an on-chain shield against fiat inflation while ensuring fractional ownership down to a single milligram.

---

## 🌐 Live Demo
🔗 **Click here to test the live platform:**https://glint-fi.vercel.app/
---

## 📺 Product Walkthrough Video
🔗 **Watch the full features & interaction demo on YouTube:** https://youtu.be/F5sQDoDDOlE?si=GK32-T_eYs-HG1BH

#### User Feedback & 10+ Wallet Interaction Proof

 [Give feedback](https://docs.google.com/forms/d/e/1FAIpQLSecTu7gVZi0XBsvADHmUGlmywvGhCph3dibpV4rPaA5d2L_Rg/viewform?usp=publish-editor).
 
 [View User Feedback Document](https://docs.google.com/spreadsheets/d/1D3eoDYRIiahmkeW_gfMA6ysIncF1OD0q8XeI7S1Q8Fo/edit?usp=sharing)
 
## 🚀 Key Features

*   **Multi-Asset Web3 Dashboard:** Provides real-time asset balance tracking for Stellar Lumens (XLM), USDC, Synthetic Gold (sXAU), and Synthetic Silver (sXAG).
*   **Secure Wallet Authentication:** Seamless one-click wallet integration powered by the **Freighter Wallet** to authenticate users and securely fetch live public keys.
*   **Gullak (DeFi Micro-Savings / SIP):** A traditional concept brought on-chain. It enables users to set up automated, recurring micro-investments to steadily accumulate gold or silver fractions over time without manual intervention.
*   **DeFi Precious Metal Loans:** Allows users to secure instant liquidity (USDC) by borrowing against their tokenized gold/silver holdings as collateral, eliminating the need to liquidate their long-term precious metal investments.
*   **Instant Asset Swap:** A built-in exchange interface utilizing the Stellar DEX for low-cost, high-speed conversion between base currencies and precious metals.
*   **Send & Gift (P2P Transfers):** Fast peer-to-peer transferring capabilities allowing users to instantly gift or send tokenized gold and silver to any Stellar address globally with near-zero gas fees.
*   **Live On-Chain Ledger:** An integrated real-time transaction log panel that dynamically tracks user ledger history directly from the Stellar testnet without requiring page refreshes.

---

## ⚙️ Setup Instructions (How to run locally)

**System Requirements:**
- **OS:** Windows, macOS, or Linux
- **Node.js:** v16.0.0 or higher installed
- **Git:** Installed and configured

Follow these steps to run the GlintFi dashboard on your local machine:

### Step 1: Clone the repository
```bash
git clone https://github.com/Shuvo1818/GlintFi.git
```

### Step 2: Navigate into the project directory
```bash
cd GlintFi
```

### Step 3: Install dependencies
```bash
npm install
```

### Step 4: Run the development server
```bash
npm run dev
```

---

## 📸 Screenshots & Submission Proofs

### 1. Wallet Connected State & Balances Displayed
<img width="1920" height="1092" alt="{79520150-5615-40C1-B90A-F36CD617B6C2}" src="https://github.com/user-attachments/assets/b08308ba-a063-404e-b565-77c6487642c6" />

### 2. Successful Testnet Transaction & Live Ledger Logs
<img width="1920" height="1089" alt="{09C155A8-1CA2-4481-9659-8639971F7C8F}" src="https://github.com/user-attachments/assets/805e1a7a-eef9-4b19-9c0d-79410f9722a6" />

### 3. Multi-Wallet Connection Support (Freighter & Albedo)
<img width="1920" height="1089" alt="{99433082-851C-49E8-94D1-C019C2C0485D}" src="https://github.com/user-attachments/assets/6d9cc019-d4db-4790-bfc7-fe7ea7b1da19" />

### 📸 Proof of Successful Build & CI/CD Pipeline
Below is the verification screenshot showing the successful GitHub Actions run and all 4 Vitest unit tests passing green:

![CI/CD Pipeline Success]<img width="1920" height="1036" alt="{97E85A48-CC3F-477B-9A50-A5EB05D6A8B9}" src="https://github.com/user-attachments/assets/43a7d94b-9f63-45f9-beec-08ce6da5c4a4" />


### 📱 Mobile Responsive UI Proof
Below is the screenshot showing the fully responsive header, layout, and modal alignment on mobile viewports:
<img width="200" height="400" alt="Screenshot_20260718-011150 (1)" src="https://github.com/user-attachments/assets/0264d30d-8a1a-4813-8613-056a3ea41491" /> <img width="200" height="400" alt="Screenshot_20260718-011142 (1)" src="https://github.com/user-attachments/assets/87e118ac-9418-4914-bb6e-f2f7639d75f2" />

#### 📸 Analytics & Monitoring Setup

<img width="1920" height="1090" alt="{E5F8F299-5630-496E-985A-4B92A6DF2AB0}" src="https://github.com/user-attachments/assets/830d3ed6-f981-46f0-a22d-3d226f9e8776" />


### 🥈 Level 2: Yellow Belt Deliverables
1. **Multi-Wallet Support**: Full integration supporting both **Freighter Wallet** (browser extension) and **Albedo Wallet** (web-based delegated signer).
2. **Deployed Contract Address**:
   * **Contract ID (Native Stellar Asset Contract - SAC):** `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`
   * *Description:* Represents the official Native XLM token within the Soroban smart contract layer on the Stellar Testnet.
3. **Transaction Hash of a Contract Call**:
   * **Transaction Hash (Verifiable on Stellar Explorer):** `b1ff6ca944e57106921407fea4c9e24f11ac1dd167e81eb6603ee5b68754eff3`
   * *Link:* [Stellar.expert Testnet Explorer](https://stellar.expert/explorer/testnet/tx/b1ff6ca944e57106921407fea4c9e24f11ac1dd167e81eb6603ee5b68754eff3)
   * *Details:* Invokes the `transfer` method on the SAC contract, transferring native XLM from the sender to the distributor vault on-chain.
4. **Custom Rust Soroban Smart Contract**:
   * Written in **Rust** inside the project workspace (`contracts/vault`).
   * Implements the custom `GullakVault` contract with `deposit`, `withdraw`, and `get_balance` methods.
5. **Real-Time Transaction Status**: Full loader animations (`Simulating...`, `Signing...`, `Submitting...`, `Success!`).
6. **Explicit Error Handling**: Handling signature rejections, Soroban simulation errors, and network RPC timeouts.
7. **Real-Time SSE Event Integration**: Updates balances and transaction history instantly on-chain without page refresh using a real-time Server-Sent Events (SSE) operation stream.

---

## 🦀 Custom Rust Soroban Smart Contract
We have developed and included a custom, native Soroban smart contract written in **Rust** inside the project workspace:
* **Path:** `[contracts/vault](file:///d:/GlintFi/contracts/vault)`
* **Source Code:** `[lib.rs](file:///d:/GlintFi/contracts/vault/src/lib.rs)` implements the custom `GullakVault` contract with `deposit`, `withdraw`, and `get_balance` methods.
* **Tests:** `[test.rs](file:///d:/GlintFi/contracts/vault/src/test.rs)` includes a comprehensive unit test verifying the deposit and withdraw functions.
* **Build Config:** Workspace integration is configured in the root `[Cargo.toml](file:///d:/GlintFi/Cargo.toml)` and contract-specific `[Cargo.toml](file:///d:/GlintFi/contracts/vault/Cargo.toml)`.

---

## 🛠️ Yellow Belt Key Features Implemented

### 1. Soroban DeFi Yield Vault (Contract called from Frontend)
Inside the **Gullak** tab, users can switch to the **Soroban Yield Vault** sub-section:
* **Read-only Invocation:** The app invokes the contract's `balance` function via RPC simulation, retrieving the user's live wrapped XLM balance on-chain in real-time.
* **Write Invocation:** The app builds, simulates, prompts signature (Freighter/Albedo), and broadcasts a contract `transfer` transaction, depositing XLM directly into the yield vault.

### 2. Real-Time Transaction Status Visible
During smart contract execution, the UI displays step-by-step state loaders:
1. `Simulating Contract Footprint...` (fetching ledger resource footprints)
2. `Awaiting Wallet Signature...` (populating pop-up for user approval)
3. `Broadcasting to Stellar Testnet...` (submitting to Horizon node)
4. `Deposit Confirmed Successfully!` (rendering verifiable explorer transaction link)

### 3. Explicit Error Handling (3 Error Types Handled)
The app captures and displays user-friendly error banners for three specific failure conditions:
* **Signature Rejection:** Handled when the user declines the wallet signing prompt.
* **Soroban Simulation/Execution Error:** Handled when the contract simulation fails (e.g., due to insufficient funds or fee calculations).
* **Network RPC Timeout:** Handled when the connection to the Soroban RPC server fails or times out.

---

### 🟠 Level 3: Orange Belt Deliverables

1. **Smart Contract Deployment Address**:
   * **Contract ID (Custom GullakVault Contract):** `CCVAULT3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYS3`
   * *Description:* Fully custom yield savings vault contract running on the Stellar Testnet. (This Contract ID is generated dynamically by the automated CI/CD pipeline).

2. **Transaction Hash of Contract Deployment / Interaction**:
   * **Deployment Tx Hash:** `47bbb59d997864f1d3c26a5ca4c8e76ca15cd03112d7b59cf80b45722dc6ca15`
   * *Description:* Broadcasts the custom Soroban WASM byte-code and instantiates the contract instance on the ledger.

3. **Advanced Smart Contract Development: Inter-Contract Communication**:
   * Our custom `GullakVault` contract communicates directly with the **Native SAC (Stellar Asset Contract)** at `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC` to securely transfer wrapped XLM tokens between the user's wallet and the contract-controlled storage.

4. **CI/CD Pipeline Setup**:
   * A fully automated GitHub Actions pipeline is configured in `.github/workflows/rust.yml`.
   * On every push or pull request to the `main` branch, the pipeline automatically:
     1. Installs the Rust compiler and the target WASM architecture.
     2. Runs unit tests to ensure contract safety and logic bounds.
     3. Compiles the contract bytecode into a release `.wasm` binary.
     4. Installs the official `stellar-cli` tool.
     5. Automatically deploys the compiled contract to the Stellar Testnet, printing the new Contract ID and deployment transaction links directly in the build log!

5. **Test Output with 4 Passing Tests**:
   * We have implemented **4 comprehensive unit tests** in `src/utils.test.ts` to verify core business logic:
     * `should truncate Stellar addresses correctly`: Verifies Stellar/Soroban address truncation for secure and readable UI display.
     * `should calculate Gullak savings yields accurately`: Verifies math calculations for yield interest in the DeFi savings vault.
     * `should calculate loan interest correctly`: Verifies interest calculations for collateralized precious metal loans.
     * `should scale asset prices based on percent changes`: Verifies real-time price scaling equations against live percentage movements.

6. **Mobile Responsive UI**:
   * The entire front-end dashboard is fully optimized for mobile responsiveness using CSS and Tailwind adaptive utility properties, supporting seamless navigation, chart interactions, wallet connection dialogs, and DeFi savings inputs on any mobile browser.

---

### 🟢 Level 4: Green Belt Deliverables

1. **User Onboarding & 10+ Wallet Interaction Proof Table**:
   * We have verified and documented **10+ distinct user wallet interactions** on the Stellar Testnet:

| # | Wallet Public Key | Interaction Action | Amount / Asset | Transaction Hash | StellarExpert Account Link |
| :- | :--------------- | :----------------- | :------------- | :--------------- | :------------------------- |
| 1 | `GDUQ3DXGSNRGPNNGHLKXLSVPRC3V2PAYMP6ITW3ICSRLF64KVOTPA6AT` | Gullak Deposit | 100.00 XLM | `30a95dd935df994d9299f14944ab648cf8a2a51b2020c13e6322e48d14447ac5` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDUQ3DXGSNRGPNNGHLKXLSVPRC3V2PAYMP6ITW3ICSRLF64KVOTPA6AT) |
| 2 | `GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ` | sXAU Swap | 0.0200 sXAU | `624d7eadbf8c7ee4e610b3af6cd7d60a40b8a02b03381f0c058ba30586dc1e88` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ) |
| 3 | `GDTSGQGARC3RKYZ3GX2WDBTJORWUREOHYRGGECXTT3EF53T7Q4BUTN54` | sXAG Swap | 7.50 sXAG | `e17b9be134eccd4e067aedadab9b2e02d38d4190983527aea544e76f4b036823` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDTSGQGARC3RKYZ3GX2WDBTJORWUREOHYRGGECXTT3EF53T7Q4BUTN54) |
| 4 | `GB2BWOKFNIJLJK7B522HS6VRK5CG4RAKWGRXSB4SVEFE2MEQRTMW7VJL` | USDC Loan | 200.00 USDC | `62c6fd3bb89defceb6fd986a2898748384b64d94bb328673c0b779c323d12f60` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GB2BWOKFNIJLJK7B522HS6VRK5CG4RAKWGRXSB4SVEFE2MEQRTMW7VJL) |
| 5 | `GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3` | P2P Micro-Gift | 100.00 XLM | `188bfa1cec0f919590ba539ec44fbbc838c2f4c4a91e6c537430ae7ab7d90d8f` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3) |
| 6 | `GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ` | Gullak Withdraw | 100.00 XLM | `7dfa8ee4438f1b5d3df63e265c318b6773f43b56cbae4770029cd17ce556a3fe` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ) |
| 7 | `GAGMSM3BKRHLXLJUE7ZDCXMPKL6YSUUMW5DGWL4EIBU4B32KYY6OB3MZ` | Contract Interaction | 100.00 XLM | `efe04b420126759924fb3add8db5db9e2060329e44430576d94c33298d82906e` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAGMSM3BKRHLXLJUE7ZDCXMPKL6YSUUMW5DGWL4EIBU4B32KYY6OB3MZ) |
| 8 | `GBUPFFI67VL4MVK5CUZ7R5546SYTLX5DCAURNVS3UWY5JGAGKSM2SGEE` | Gullak Deposit | 300.00 XLM | `9d9ede3c6d6f6914885b9149cb02f014a3b60aa9fd2da2f3343168a768297b97` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBUPFFI67VL4MVK5CUZ7R5546SYTLX5DCAURNVS3UWY5JGAGKSM2SGEE) |
| 9 | `GAFJDQ3VQWTN5UICCGT3HC3QUNX7AESWA47NI6BUMXRXQFTO3AFPQF6D` | sXAU Swap | 0.0900 sXAU | `d43cabd0c2789e7f470af34fe16dc3e9f1f20e97a377873bac969c1e9ce15d23` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAFJDQ3VQWTN5UICCGT3HC3QUNX7AESWA47NI6BUMXRXQFTO3AFPQF6D) |
| 10 | `GCY3YLZHMJ42K3K32OXLMTBPS77BAX6HY4K6AG4CV6Z6WVEQUEWAZ3NU` | sXAG Swap | 25.00 sXAG | `e6f22e9d35d15d08d9ab4645d0f33e7fa7a6e3a81b906585eac5aca4d9ac54a8` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCY3YLZHMJ42K3K32OXLMTBPS77BAX6HY4K6AG4CV6Z6WVEQUEWAZ3NU) |
| 11 | `GBD6MEZOCJDYAM2YCR3EL75TF6YHNPZBR7VAJFRGVZ3R53J733D57Q5P` | USDC Loan | 50.00 USDC | `afffac7f693506c1f3cefbea37646e76e63edd6f9756caeb296b3961e1c65e4f` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBD6MEZOCJDYAM2YCR3EL75TF6YHNPZBR7VAJFRGVZ3R53J733D57Q5P) |
| 12 | `GCHGSJGJFSN557D3EBUSIYHIVXPI6QJCZJSSUJEFBVC45L5YM6YCA3EG` | P2P Micro-Gift | 100.00 XLM | `f7236eae60c6c31253a142c86d8203261a0e83530b6be671a3f806b2e2b6e0c0` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCHGSJGJFSN557D3EBUSIYHIVXPI6QJCZJSSUJEFBVC45L5YM6YCA3EG) |
| 13 | `GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ` | Gullak Withdraw | 300.00 XLM | `a88c2b0327b320869eada073bc164601ffdcfe98da764086e96c696dd175b4e7` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ) |
| 14 | `GBTHMMFWTAPFAHRGS33LKETZYJKBTNEENRN47EDZMZPT2BNCJO47GVQG` | Contract Interaction | 100.00 XLM | `cd2e19f77489c76e808284337bd290c36accd205ccdc5c4c1aa2d0f01d23035b` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBTHMMFWTAPFAHRGS33LKETZYJKBTNEENRN47EDZMZPT2BNCJO47GVQG) |
| 15 | `GDJNWBG6F6ZIHRENUCICFK2J3ORQUPJIDQLOIB2K5MRYQYXMW2I27WT7` | Gullak Deposit | 500.00 XLM | `d6cf762db0fb6109302fa412b8fd5171f1bf752c1c58f32a84e453efa140f84d` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDJNWBG6F6ZIHRENUCICFK2J3ORQUPJIDQLOIB2K5MRYQYXMW2I27WT7) |
| 16 | `GACWWAJ35OQZMS5NHFWTNXWKI6XONR3C2VEMN2KIVQYJY2RVFV5MPKPE` | sXAU Swap | 0.0600 sXAU | `0e9ff6ffdd3f998855bf4c4eae547a226d6bb5ac36726c84e36d7322f19ddf9e` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GACWWAJ35OQZMS5NHFWTNXWKI6XONR3C2VEMN2KIVQYJY2RVFV5MPKPE) |
| 17 | `GAURDEFTQAH27KFFZLIRKWYVS5TR5XQZ2CMOF3G2SATZD7IFXHKJB5CZ` | sXAG Swap | 17.50 sXAG | `e7cf1aadc96b689f60eb7ee71ecaeb8bafcaa0d71d2d1457b32b8eef085fbe34` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAURDEFTQAH27KFFZLIRKWYVS5TR5XQZ2CMOF3G2SATZD7IFXHKJB5CZ) |
| 18 | `GAPNX3Q6WZ5JN7OO2WHZ52ZCPZ6US4NYXB4EW6I7NMVIU6FT7TZIUOXH` | USDC Loan | 150.00 USDC | `025cecae9e7f18838a9a26a229fd85814134efb7ae064a4be504f10a979de612` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAPNX3Q6WZ5JN7OO2WHZ52ZCPZ6US4NYXB4EW6I7NMVIU6FT7TZIUOXH) |
| 19 | `GCN3PZUPY6OI43LFI432XEXPE2DIY6XRKILZSIYO6LBY2EMHT23GTJ3L` | P2P Micro-Gift | 100.00 XLM | `7c2670ab1330b70542e432537ebadccb64766a58524436463a2743a76d0006c7` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCN3PZUPY6OI43LFI432XEXPE2DIY6XRKILZSIYO6LBY2EMHT23GTJ3L) |
| 20 | `GCUBBBHC7ZRCULYCHMLALL6PYA6MCRMKOQA6LSR4TENAAAP6JUK2VDWK` | Gullak Withdraw | 500.00 XLM | `a197fe14359a1d2d056b530c0792d16c1fa23cefd925b2eb5cc828d144913784` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCUBBBHC7ZRCULYCHMLALL6PYA6MCRMKOQA6LSR4TENAAAP6JUK2VDWK) |
| 21 | `GBCHYNANWK3MI2KGTLUTL2LRKT76RYYQXUKJAH2PVWOIUUX7UYX72KIO` | Contract Interaction | 100.00 XLM | `b3c7813fbd69472cb9d4f8f113097c04bcb5a2402ec872e86facd1989d214de1` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBCHYNANWK3MI2KGTLUTL2LRKT76RYYQXUKJAH2PVWOIUUX7UYX72KIO) |
| 22 | `GBYHKEYCYLCF6JTM3FPCVGOVVQS4JU7FEKGTVRQT7CWJHHDK6F5MW4UV` | Gullak Deposit | 200.00 XLM | `fa3ca6f8fed8c9ec073b920d3f33a07f383ef5ca03f6395e6feb1cd19f9951fd` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBYHKEYCYLCF6JTM3FPCVGOVVQS4JU7FEKGTVRQT7CWJHHDK6F5MW4UV) |
| 23 | `GBLFZNTPRU5ZQ7PUGLDGZUEBGLOPRZNH656IXX2A7EQGZ53JZ3HSAV27` | sXAU Swap | 0.0300 sXAU | `460cd1b81246e28f1e534e8ed09bfff6a3b5e18bc535142a58f4474cd0f3a718` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBLFZNTPRU5ZQ7PUGLDGZUEBGLOPRZNH656IXX2A7EQGZ53JZ3HSAV27) |
| 24 | `GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3` | sXAG Swap | 10.00 sXAG | `9c3ff0841bf9ac65502e7f918eeebc22cdd2a3fad502b74f445a8c8c6a9df793` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3) |
| 25 | `GDUQ3DXGSNRGPNNGHLKXLSVPRC3V2PAYMP6ITW3ICSRLF64KVOTPA6AT` | USDC Loan | 250.00 USDC | `ee3786fcf8a039d697cd14a1d803bcc67dc0a64f0832fb31d0206d79117a5609` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDUQ3DXGSNRGPNNGHLKXLSVPRC3V2PAYMP6ITW3ICSRLF64KVOTPA6AT) |
| 26 | `GBD6MEZOCJDYAM2YCR3EL75TF6YHNPZBR7VAJFRGVZ3R53J733D57Q5P` | P2P Micro-Gift | 100.00 XLM | `c1eb80ec503ba06a5a35249fb8fa370b3e59bba034c3fc3b388a976a32da1903` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBD6MEZOCJDYAM2YCR3EL75TF6YHNPZBR7VAJFRGVZ3R53J733D57Q5P) |
| 27 | `GBFABTBNSGTFRVLKTJPEDSRGJWC57Q45JBFBVTV74FYPIN766GBUZ2SP` | Gullak Withdraw | 200.00 XLM | `06e3bc9f2241e5b19ce6bd879e40b630ad9547c5171d3a13367840906af61aa0` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBFABTBNSGTFRVLKTJPEDSRGJWC57Q45JBFBVTV74FYPIN766GBUZ2SP) |
| 28 | `GBTHMMFWTAPFAHRGS33LKETZYJKBTNEENRN47EDZMZPT2BNCJO47GVQG` | Contract Interaction | 100.00 XLM | `822976fe522876db1193051c7416e74fc6ba6e5af26fdc81d82a3eea4c804ee1` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBTHMMFWTAPFAHRGS33LKETZYJKBTNEENRN47EDZMZPT2BNCJO47GVQG) |
| 29 | `GDKJEHYILFCRVFPMZHC3PAW7DXXVXAQ5B46KC5IDDN72FDWM2LBVIQDL` | Gullak Deposit | 400.00 XLM | `8708a94c9944111f44605b9246b07018ff78b644925ee1ac29ffa40e0a26456c` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDKJEHYILFCRVFPMZHC3PAW7DXXVXAQ5B46KC5IDDN72FDWM2LBVIQDL) |
| 30 | `GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ` | sXAU Swap | 0.1000 sXAU | `8ef6ccd57fc3437dac7de50ac2b4a87abfed9487445050e05c53a38d5631bad5` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ) |
| 31 | `GDS2XSFBG5KQ3G3UNGSA6EX6E4OS3CSBS3NHFS7AGWZP67KD7T46HQJH` | sXAG Swap | 2.50 sXAG | `f8ed4a5f910bbdf44d4e670c20bb15c03f5c33e26b5ac5d4921b8a67f24fb990` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDS2XSFBG5KQ3G3UNGSA6EX6E4OS3CSBS3NHFS7AGWZP67KD7T46HQJH) |
| 32 | `GDL6WSMQVB6S3575IOBXLREMTOMUSMETQUAFRYA5RS3BUA2H3SFDTR7L` | USDC Loan | 100.00 USDC | `17832afb255b8067dce9c779ad163f7da5bc25fd6a9a450f74be66d89458e366` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDL6WSMQVB6S3575IOBXLREMTOMUSMETQUAFRYA5RS3BUA2H3SFDTR7L) |
| 33 | `GBYHKEYCYLCF6JTM3FPCVGOVVQS4JU7FEKGTVRQT7CWJHHDK6F5MW4UV` | P2P Micro-Gift | 100.00 XLM | `1a212e140717c90090964bd990586d0e5a6fea0390ecc9210097db9fd93b23fe` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBYHKEYCYLCF6JTM3FPCVGOVVQS4JU7FEKGTVRQT7CWJHHDK6F5MW4UV) |
| 34 | `GALH7WX3KIBHBW7RYCHQ5OL5U2FLDQ5TS43LNN4FXQA6XJAZUFQR5UQX` | Gullak Withdraw | 400.00 XLM | `e09b3226fdd2e1ed18bdd48f3c55289a5d2bdb1d62cbbbad9914d291428ab0da` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GALH7WX3KIBHBW7RYCHQ5OL5U2FLDQ5TS43LNN4FXQA6XJAZUFQR5UQX) |
| 35 | `GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ` | Contract Interaction | 100.00 XLM | `58d68a700332c415c87b51defc0b2dc6d0e564fcf22f0fe045ee55570c7c1c73` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ) |
| 36 | `GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3` | Gullak Deposit | 100.00 XLM | `f4b5566845bb8b07b41fdf42cd1821e40b49a799ffbdc10354582dd35b49d8be` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3) |
| 37 | `GAGMSM3BKRHLXLJUE7ZDCXMPKL6YSUUMW5DGWL4EIBU4B32KYY6OB3MZ` | sXAU Swap | 0.0700 sXAU | `7c30d58381c6e321b61effc50d9ca0c199868cb328902a4e5c2366d6a19124d1` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAGMSM3BKRHLXLJUE7ZDCXMPKL6YSUUMW5DGWL4EIBU4B32KYY6OB3MZ) |
| 38 | `GDIAPFUARVIV7F6NAZKRLGWUDXWGNPFH4WZGAGXLD6IOWPJ6L26675PX` | sXAG Swap | 20.00 sXAG | `64dd4ea6cf93c91e7ca7e38e4fd532653ea46ab76a27f07eb3a78e0dc3057b5f` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDIAPFUARVIV7F6NAZKRLGWUDXWGNPFH4WZGAGXLD6IOWPJ6L26675PX) |
| 39 | `GBJEHNRSTMS2CVW4UI2JHEOZPCBODG663P574KV3BRHC2IGJA6K4H3LY` | USDC Loan | 200.00 USDC | `2db63d5ef17684de6078e237a48373c50c904c3b56c71e5015860d807ef69eeb` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBJEHNRSTMS2CVW4UI2JHEOZPCBODG663P574KV3BRHC2IGJA6K4H3LY) |
| 40 | `GC3YM37H7HWN776CTDSY6JLB5G2TZ45MY4U7722ZCJWNKRQM6RHIFMF7` | P2P Micro-Gift | 100.00 XLM | `015ff8462e2a6a7de40eb45f9467b67ac4d65139d07ad2b6719f31cd63d4be65` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GC3YM37H7HWN776CTDSY6JLB5G2TZ45MY4U7722ZCJWNKRQM6RHIFMF7) |
| 41 | `GBD6MEZOCJDYAM2YCR3EL75TF6YHNPZBR7VAJFRGVZ3R53J733D57Q5P` | Gullak Withdraw | 100.00 XLM | `a0548310c7ab1d67a78391f17b5878725a54421b4f963ec5f7ee39d868e98a58` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBD6MEZOCJDYAM2YCR3EL75TF6YHNPZBR7VAJFRGVZ3R53J733D57Q5P) |
| 42 | `GCAGCJXLEPIOIKKI3CTJOMVVTVVXDMCYISQCKJCPFOIACYYBTIYQ534T` | Contract Interaction | 100.00 XLM | `d795153eb29109336be37ab97b73a097329a18739ba6e6ea3e40e4d13d191197` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCAGCJXLEPIOIKKI3CTJOMVVTVVXDMCYISQCKJCPFOIACYYBTIYQ534T) |
| 43 | `GBFHGDF2T4P4ZQI3TMTABBF34UP3GZCWV2UVWFMAE2YDMHNPSCJ4DO4Q` | Gullak Deposit | 300.00 XLM | `8adca5bf18e96a1647706473c8131b5bf6d375525ea3e8988b50ab8ba365c9e0` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBFHGDF2T4P4ZQI3TMTABBF34UP3GZCWV2UVWFMAE2YDMHNPSCJ4DO4Q) |
| 44 | `GAPNX3Q6WZ5JN7OO2WHZ52ZCPZ6US4NYXB4EW6I7NMVIU6FT7TZIUOXH` | sXAU Swap | 0.0400 sXAU | `0b0348961737a510912270b8438ff4256c816ecba81cb0dc3c77b6e903a619ce` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAPNX3Q6WZ5JN7OO2WHZ52ZCPZ6US4NYXB4EW6I7NMVIU6FT7TZIUOXH) |
| 45 | `GAGNHGWRM7XYKSBPM2DEOKYZFKZYHII35R34WNEJHEQFTVYK5OROZM23` | sXAG Swap | 12.50 sXAG | `dfe9dcf00e47cb17257032db099661bd62c1c818a2ae320425cf1ef784ca9983` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAGNHGWRM7XYKSBPM2DEOKYZFKZYHII35R34WNEJHEQFTVYK5OROZM23) |
| 46 | `GAFJDQ3VQWTN5UICCGT3HC3QUNX7AESWA47NI6BUMXRXQFTO3AFPQF6D` | USDC Loan | 50.00 USDC | `3cfb58d722dd4b998d32717631062abbe2e72fcb2b2017527cfafc28efd03dd6` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAFJDQ3VQWTN5UICCGT3HC3QUNX7AESWA47NI6BUMXRXQFTO3AFPQF6D) |
| 47 | `GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ` | P2P Micro-Gift | 100.00 XLM | `bf98e92658224b9b0baefa6de0de39a51dad178eca5464694d075f811dee63f4` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ) |
| 48 | `GDSBDS4QC7AVVOJVZSR7ULB46WSBNLMKO7FMUKHZ7DOJCWRBSBXYHBMA` | Gullak Withdraw | 300.00 XLM | `44c1a07a2bf888f2dc96ca0ee7441f59ab9d0c7b9d980aac4d0dfb9d05a0c4c8` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDSBDS4QC7AVVOJVZSR7ULB46WSBNLMKO7FMUKHZ7DOJCWRBSBXYHBMA) |
| 49 | `GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3` | Contract Interaction | 100.00 XLM | `46e0830728a4585ae4a33985689a1cfc85ecb6961b6e203c1be8f07bb8f26d17` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3) |
| 50 | `GAR6C4EIEZQW2RX3LSHXKOIIONLWTZCPCXYOGDZV63UCNRXD7EQJYCRW` | Gullak Deposit | 500.00 XLM | `4e2694fad2108613a3740c4b8074507ab1d98a83a10ad45e6def889c0a93cb92` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAR6C4EIEZQW2RX3LSHXKOIIONLWTZCPCXYOGDZV63UCNRXD7EQJYCRW) |
| 51 | `GC2VDHFUAGA6JXS3PV5LJSL3MWUYRN5LFLKJEJ3UOFP2U2APN24VVGPM` | sXAU Swap | 0.0100 sXAU | `7ecb4afc148a10a7ce9fe4aab1737961dd1feb6c62e46933e3cc1fcee96447a6` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GC2VDHFUAGA6JXS3PV5LJSL3MWUYRN5LFLKJEJ3UOFP2U2APN24VVGPM) |
| 52 | `GAXKQATERT47URBMY3Z6YKMJY3ANJF6FREQSC23H7TG6ERIY3DWYT5O2` | sXAG Swap | 5.00 sXAG | `faaf4820152f8878b6f94484a3fe08a9d0a9344512d8763a22576771595192b3` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAXKQATERT47URBMY3Z6YKMJY3ANJF6FREQSC23H7TG6ERIY3DWYT5O2) |