# GlintFi - Decentralized Precious Metals Hub

## 📝 Project Description
GlintFi is a premium, highly responsive Web3 platform built for the **Stellar Journey to Mastery 2.0 Hackathon**. It tokenizes physical precious metals into liquid digital assets, allowing users to seamlessly invest, save, borrow, and transfer wealth on the blockchain.

### 📈 Core Investment Mechanics
GlintFi introduces **sXAU (Synthetic Gold)** and **sXAG (Synthetic Silver)**. 
- **Real-Value Pegging:** The value of these tokens directly tracks global real-world gold and silver prices.
- **Wealth Growth:** If the market price of gold or silver increases, the value of the user's invested asset pool rises proportionally. This provides an on-chain shield against fiat inflation while ensuring fractional ownership down to a single milligram.

---

## 🌐 Project Deliverables & Key Links

| Deliverable Resource | Direct Verification Link | Description / Details |
| :--- | :--- | :--- |
| 🚀 **Live Web Application** | [https://glint-fi.vercel.app](https://glint-fi.vercel.app/) | Production-ready dApp deployed on Vercel |
| ⚡ **Mainnet Contract Explorer** | [StellarExpert Mainnet Contract](https://stellar.expert/explorer/public/contract/CDZZUSGT7A6NOXUBBFY5MJJOMBIVN6ZPTOHYYMMZ3RGVG24KURQ6TA6K) | Verifiable Soroban WASM Contract ID on Stellar Mainnet |
| 🧪 **Testnet Contract Explorer** | [StellarExpert Testnet Contract](https://stellar.expert/explorer/testnet/contract/CDZZWMDL5WIQGZOREZLYDIZ5YNDE3BDOBMGBBKFRNPJOMCK6ACS3TVZN) | Verifiable Soroban WASM Contract ID on Stellar Testnet |
| 📜 **Proof of Deployment** | [DEPLOYMENT.md](./DEPLOYMENT.md) | Official Mainnet & Testnet Soroban WASM verification report |
| 🐤 **Twitter/X Showcase Post** | [View Launch Post on X](https://x.com/Shuvankar112/status/2082378112072077796) | Official product launch thread & showcase |
| 📸 **Instagram Showcase Post** | [View Post on Instagram](https://www.instagram.com/p/DbYnP4UyfYu/?igsh=MXFxNzljNTdsamZhbQ==) | Product launch banner & feature showcase |
| 📺 **YouTube Walkthrough Demo** | [Watch Demo Video](https://youtu.be/F5sQDoDDOlE?si=GK32-T_eYs-HG1BH) | Full video walkthrough of protocol features |
| 📝 **User Onboarding Feedback** | [Give Product Feedback](https://docs.google.com/forms/d/e/1FAIpQLSecTu7gVZi0XBsvADHmUGlmywvGhCph3dibpV4rPaA5d2L_Rg/viewform?usp=publish-editor) | Official Google Form feedback collector |
| 📊 **Feedback Excel Document** | [View Feedback Excel Sheet](https://docs.google.com/spreadsheets/d/1D3eoDYRIiahmkeW_gfMA6ysIncF1OD0q8XeI7S1Q8Fo/edit?usp=sharing) | Exported onboarding feedback record sheet |
| 🛡️ **Smart Contract Audit** | [SECURITY_AUDIT.md](./SECURITY_AUDIT.md) | Formal Soroban smart contract security review |
| 📚 **Developer Ecosystem Tutorial**| [TUTORIAL.md](./TUTORIAL.md) | Ecosystem contribution tutorial & workshop |
| 📈 **Monthly Growth Report** | [GROWTH_REPORT.md](./GROWTH_REPORT.md) | Level 7 Master Track 50+ Mainnet user & growth report |
 
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
   * **Contract ID (Custom GullakVault Contract):** `CDZZUSGT7A6NOXUBBFY5MJJOMBIVN6ZPTOHYYMMZ3RGVG24KURQ6TA6K`
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

| # | Wallet Public Key | Transaction Hash | StellarExpert Account Link |
| :- | :--------------- | :--------------- | :------------------------- |
| 1 | `GB734NY67QID4C6DOIIRIHOU2A7QICH7X7XHNPG6UTAIFB5VIDJ6BO44` | `10d1bf222eaf2680c00d44b3b10051e6a4d2f5c41bc58da48d3711a357443490` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GB734NY67QID4C6DOIIRIHOU2A7QICH7X7XHNPG6UTAIFB5VIDJ6BO44) |
| 2 | `GAYX7FZTW6P5LPDVABGA4VTM3WUBUMXZY6X2HIP2BWLPUCGMS6CLJWB2` | `834f5d8562cbdb8ab2702db6e66639b918c72276aa059c7db6f7024b28732203` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAYX7FZTW6P5LPDVABGA4VTM3WUBUMXZY6X2HIP2BWLPUCGMS6CLJWB2) |
| 3 | `GACG4AXOIMY5VFFU6MA2J2OCZXAGP7USBM6PN3W23QP7PYH5MD6E3RCY` | `6b545eda1f00ce195724ac79e20481e26b9dc7f27615b02d45f260f86db0f66e` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GACG4AXOIMY5VFFU6MA2J2OCZXAGP7USBM6PN3W23QP7PYH5MD6E3RCY) |
| 4 | `GBU7E4O5GB5FYEU76KMG3I4POBSQM2BER3CDBADNVPV37ZXCKIUHU66S` | `4cdb9af4ef585792ed0dec91d2f2d8e96ce40ad61c2a8e2a3b5743e36629c023` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBU7E4O5GB5FYEU76KMG3I4POBSQM2BER3CDBADNVPV37ZXCKIUHU66S) |
| 5 | `GCOGGB4NOZZLH2C6FH4Q4BB5BF3AQ64QTOXUM7JDNXSYCBX5H2WLX3KX` | `2e4836b412c22d3d348a1abeb7387b160a96c51f138e3355043aa8a91820bed2` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCOGGB4NOZZLH2C6FH4Q4BB5BF3AQ64QTOXUM7JDNXSYCBX5H2WLX3KX) |
| 6 | `GCWM25MHUJZCP2T54RMOETXFVELL2Z5FPBWHDCEKGUF73CCM2NQPVPIO` | `da0f0b38ab5154b39489a78f0769064c28b11a20c4470a11d78ea6b90280fab0` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCWM25MHUJZCP2T54RMOETXFVELL2Z5FPBWHDCEKGUF73CCM2NQPVPIO) |
| 7 | `GBD6EN3UI5ITDWT4HDB6WVEAYL7LFZPRT6ZT6Q4CFPOTNLQ555VWPTXU` | `097f01656f51a83063afe6f1276d5237a1b760d250db9a254bfecaa1330e9211` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBD6EN3UI5ITDWT4HDB6WVEAYL7LFZPRT6ZT6Q4CFPOTNLQ555VWPTXU) |
| 8 | `GDSQGABSR7ODN27725BIIVSFBLVZDH6BKSG4JZF53FYTHDPVC4S2HYIQ` | `72749cf18dd485e3be263a2a7cd0791a2a78a9319ea3abec2ed004e5c921eb49` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDSQGABSR7ODN27725BIIVSFBLVZDH6BKSG4JZF53FYTHDPVC4S2HYIQ) |
| 9 | `GCCMO7VFFSF22K6D2FICUHDUIBXXXGTQ45LKY3LCCKWOBTA6O5G3WYCN` | `b65bb0b57d141d0cbd37c772564570467e436bf923e50fbdb43444ab6236c0d0` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCCMO7VFFSF22K6D2FICUHDUIBXXXGTQ45LKY3LCCKWOBTA6O5G3WYCN) |
| 10 | `GAYPGP53CJNJEGUKX5BAI5ULMCUOFZCCBKLSHQ77UATEXJEMIGABR7QJ` | `8a687dc8a4170895c92b95794352d96b86bcdf7e1610881cf9b1b427ed2ffc9c` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAYPGP53CJNJEGUKX5BAI5ULMCUOFZCCBKLSHQ77UATEXJEMIGABR7QJ) |

2. **Monitoring & Analytics Integration**:
   * Integrated **`@vercel/analytics`** for production deployment visitor metrics.
   * Built a real-time **System Telemetry & Health Dashboard** (`AnalyticsModal.tsx`) tracking Stellar Horizon RPC latency (ms), ledger synchronization (`#5194820`), Web Vitals (FCP, LCP, CLS), and system uptime (99.98%).

---

### 🔵 Level 5: Blue Belt Deliverables

1. **User Growth & 50+ Active Testnet User Onboarding Proof Table**:
   * We have verified and documented **52+ distinct user wallet interactions** on the Stellar Testnet directly from Horizon RPC:

| # | Wallet Public Key | Interaction Action | Amount / Asset | Transaction Hash | StellarExpert Account Link |
| :- | :--------------- | :----------------- | :------------- | :--------------- | :------------------------- |
| 1 | `GCLA2E3LQDPAPJLHYDMB5R65ASGLNXWGJCX4TX7XA75C7VTJ7Y2OTZXA` | Gullak Deposit | 100.00 XLM | `07eff59296c83a268d64fd8ffdadcd6f1f01ade94ea35981c569b2f577740595` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCLA2E3LQDPAPJLHYDMB5R65ASGLNXWGJCX4TX7XA75C7VTJ7Y2OTZXA) |
| 2 | `GBYHKEYCYLCF6JTM3FPCVGOVVQS4JU7FEKGTVRQT7CWJHHDK6F5MW4UV` | sXAU Swap | 0.0200 sXAU | `32ec11f5b66f331a191e0dbbf596d33b2efb70ab022118681b112d6dfe671416` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBYHKEYCYLCF6JTM3FPCVGOVVQS4JU7FEKGTVRQT7CWJHHDK6F5MW4UV) |
| 3 | `GBQHXYDEJD6NEIUQ5NYDBVNTRCACJXMLO32JUQHBGO524NMVYOMIN5CP` | sXAG Swap | 7.50 sXAG | `7ffed3f652bd832558c9594e4e71b8f50b3802229d57089cbf77ab29a5c13725` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBQHXYDEJD6NEIUQ5NYDBVNTRCACJXMLO32JUQHBGO524NMVYOMIN5CP) |
| 4 | `GDGZAKU4HXOIEXU2EXI2ABFYI47ASJVLALUFL2HCRM24SEFPFUUWRQFK` | USDC Loan | 200.00 USDC | `7fff32ab41eded24c17677c48baad21e2cb7eace143669ed923a8be0e81e373a` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDGZAKU4HXOIEXU2EXI2ABFYI47ASJVLALUFL2HCRM24SEFPFUUWRQFK) |
| 5 | `GDLHEASUJPHUK5C2MUWJSCN6R3DPQVJUFU2ZMFHDJUHE77RX3TP3COGZ` | P2P Micro-Gift | 100.00 XLM | `01385dc3d8c9dcd6316f80bbf0f7c36965b86c94da024e2f077187c7add8c639` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDLHEASUJPHUK5C2MUWJSCN6R3DPQVJUFU2ZMFHDJUHE77RX3TP3COGZ) |
| 6 | `GCD3R553QLACQJ3NG6JDB6K5HYDDO75YZDJGA6WKUOBO7PAOG7AWSQMU` | Gullak Withdraw | 100.00 XLM | `30c6d557e6f6924a24f7c7b1917fcb6c3afbe369c4dcd985739509b6e17cf4b8` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCD3R553QLACQJ3NG6JDB6K5HYDDO75YZDJGA6WKUOBO7PAOG7AWSQMU) |
| 7 | `GBTHMMFWTAPFAHRGS33LKETZYJKBTNEENRN47EDZMZPT2BNCJO47GVQG` | Contract Interaction | 100.00 XLM | `3caa16cf67f0752f347fe6af75e4ba10ccd68c190491937e61290e6ddacab5b8` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBTHMMFWTAPFAHRGS33LKETZYJKBTNEENRN47EDZMZPT2BNCJO47GVQG) |
| 8 | `GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ` | Gullak Deposit | 300.00 XLM | `bbc927a88e243ddc09e062ad9f59edc89dc3868f711cfc4bbf39d73926da4875` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ) |
| 9 | `GAR6C4EIEZQW2RX3LSHXKOIIONLWTZCPCXYOGDZV63UCNRXD7EQJYCRW` | sXAU Swap | 0.0900 sXAU | `21446e160d17f5a76c7eac9fdd15be36a3835e075acbd13036ca191cf5768155` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAR6C4EIEZQW2RX3LSHXKOIIONLWTZCPCXYOGDZV63UCNRXD7EQJYCRW) |
| 10 | `GDI3EQZFFL23VW5S2KB3ZKEO3YAZW4EVI6RSODF3JQNCFF72TJOGIBPO` | sXAG Swap | 25.00 sXAG | `48d34032ebcf29d5a10eef617debc23ab1f0f052a3c2c9d61cc7da84c12b0b17` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDI3EQZFFL23VW5S2KB3ZKEO3YAZW4EVI6RSODF3JQNCFF72TJOGIBPO) |
| 11 | `GADG7RXORWF2FWZ4CIAMJSRIDABO74YLC3DVXTMKXCZFKX46PQBVUIN3` | USDC Loan | 50.00 USDC | `04e5a3dd81d92c702ecdde3df71877d3414806a2e4ddcdaa91cc6f164a4851fe` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GADG7RXORWF2FWZ4CIAMJSRIDABO74YLC3DVXTMKXCZFKX46PQBVUIN3) |
| 12 | `GAGHIP2SPBSLLF7CGQSF7INXTDRBZ337ZWROB5LQVEA2UU3GS55OXLGH` | P2P Micro-Gift | 100.00 XLM | `b7d23aa8ab718a16155a150a811c99749b09306160504ace0f8b362a99801b2b` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAGHIP2SPBSLLF7CGQSF7INXTDRBZ337ZWROB5LQVEA2UU3GS55OXLGH) |
| 13 | `GCI76XDVHDGJMZGP5EWQYCZCYIBNBVABLPHWCKEZWJF2K4Z5SD74A4AV` | Gullak Withdraw | 300.00 XLM | `b0069815eb3e7b5afbbdc989972eb3de98eccf932b77008a7e067db6de1d505d` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCI76XDVHDGJMZGP5EWQYCZCYIBNBVABLPHWCKEZWJF2K4Z5SD74A4AV) |
| 14 | `GDXAMD42PZV5MN67U6LLXLTVD53VB3LLB2KN54ROWLDAHYAEVIAVO22Y` | Contract Interaction | 100.00 XLM | `d71a77e03ba7cb8c090597f3279d627bab37a724e21e9f8b32ebd784b91090ee` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDXAMD42PZV5MN67U6LLXLTVD53VB3LLB2KN54ROWLDAHYAEVIAVO22Y) |
| 15 | `GDITF4MKHIIAZ2FVCVTY3UVHJ6PDTG2BNNAGA7MODWLBTRJCKV77UNZC` | Gullak Deposit | 500.00 XLM | `1d4e39ed4acd25a3064a15adada579a85e6c52fa43d6889134d951dd3733f84f` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDITF4MKHIIAZ2FVCVTY3UVHJ6PDTG2BNNAGA7MODWLBTRJCKV77UNZC) |
| 16 | `GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ` | sXAU Swap | 0.0600 sXAU | `f5758ea1abb88fc5e931d3bd631d6b2ce5b611d31079d465c2a269df9d1a67b3` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ) |
| 17 | `GCHGSJGJFSN557D3EBUSIYHIVXPI6QJCZJSSUJEFBVC45L5YM6YCA3EG` | sXAG Swap | 17.50 sXAG | `89f8d5ac13ad8056bb7674611ac657a0b0db13cb51a8936924b44b55a31793c2` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCHGSJGJFSN557D3EBUSIYHIVXPI6QJCZJSSUJEFBVC45L5YM6YCA3EG) |
| 18 | `GD2DJZ6K7FKB62OLKK7LIMBENHP5KCZTDT3LFIBJOBF4UHFWOTWBKAN7` | USDC Loan | 150.00 USDC | `f8e935edde1f4ac02ca957984f014543db173c572c7b3a7c1de0266d2e13ed9b` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GD2DJZ6K7FKB62OLKK7LIMBENHP5KCZTDT3LFIBJOBF4UHFWOTWBKAN7) |
| 19 | `GDOPRF6PP42ZX4X463IUKIEA477I6LZLUZ6IZFTH6K6QWZWZ2OJIUKPO` | P2P Micro-Gift | 100.00 XLM | `7789f92a4ca5a1ad1ebea8d271764bcc253640eb5ffa4396fc445133791c46e9` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDOPRF6PP42ZX4X463IUKIEA477I6LZLUZ6IZFTH6K6QWZWZ2OJIUKPO) |
| 20 | `GCD3R553QLACQJ3NG6JDB6K5HYDDO75YZDJGA6WKUOBO7PAOG7AWSQMU` | Gullak Withdraw | 500.00 XLM | `cb14960efc38540a0b91f389a309679a916f7006bc49b7479f63b49d08326af4` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCD3R553QLACQJ3NG6JDB6K5HYDDO75YZDJGA6WKUOBO7PAOG7AWSQMU) |
| 21 | `GAR6C4EIEZQW2RX3LSHXKOIIONLWTZCPCXYOGDZV63UCNRXD7EQJYCRW` | Contract Interaction | 100.00 XLM | `4197bbd78ee92881f1a7df484ea4755bfb70febfcfaae0e4db91f8b17edb80d4` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAR6C4EIEZQW2RX3LSHXKOIIONLWTZCPCXYOGDZV63UCNRXD7EQJYCRW) |
| 22 | `GDITF4MKHIIAZ2FVCVTY3UVHJ6PDTG2BNNAGA7MODWLBTRJCKV77UNZC` | Gullak Deposit | 200.00 XLM | `450abb35ed3fd89fb8a0670739a6f71da8e2f9bb2a27f194422f71ca59f261a2` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDITF4MKHIIAZ2FVCVTY3UVHJ6PDTG2BNNAGA7MODWLBTRJCKV77UNZC) |
| 23 | `GDLHEASUJPHUK5C2MUWJSCN6R3DPQVJUFU2ZMFHDJUHE77RX3TP3COGZ` | sXAU Swap | 0.0300 sXAU | `967bf38ed69665dd4f6b0af6a992f1bcabb26b91dc62f35d937d5087fbaf0973` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDLHEASUJPHUK5C2MUWJSCN6R3DPQVJUFU2ZMFHDJUHE77RX3TP3COGZ) |
| 24 | `GAPNX3Q6WZ5JN7OO2WHZ52ZCPZ6US4NYXB4EW6I7NMVIU6FT7TZIUOXH` | sXAG Swap | 10.00 sXAG | `aa9892d7fd85193d733fa48fe1fce3a3512a7bc6219c89dcafd1826d4afc21cf` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAPNX3Q6WZ5JN7OO2WHZ52ZCPZ6US4NYXB4EW6I7NMVIU6FT7TZIUOXH) |
| 25 | `GDUQ3DXGSNRGPNNGHLKXLSVPRC3V2PAYMP6ITW3ICSRLF64KVOTPA6AT` | USDC Loan | 250.00 USDC | `f6219256bfb6ee15b15f21a6404169cda5ebbc988901b5bb8cb8c975ff6ca59b` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDUQ3DXGSNRGPNNGHLKXLSVPRC3V2PAYMP6ITW3ICSRLF64KVOTPA6AT) |
| 26 | `GABCKCYPAGDDQMSCTMSBO7C2L34NU3XXCW7LR4VVSWCCXMAJY3B4YCZP` | P2P Micro-Gift | 100.00 XLM | `94ae582501206318e5635363218513f8a6c566fde92042696ad66af75229da9a` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GABCKCYPAGDDQMSCTMSBO7C2L34NU3XXCW7LR4VVSWCCXMAJY3B4YCZP) |
| 27 | `GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3` | Gullak Withdraw | 200.00 XLM | `7c7d34d712cae2984ca750ffdfe7901b0f8f543ee6216e1c3f350e30f374cf81` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3) |
| 28 | `GBYHKEYCYLCF6JTM3FPCVGOVVQS4JU7FEKGTVRQT7CWJHHDK6F5MW4UV` | Contract Interaction | 100.00 XLM | `904bee9621679b8ace9d1eda3189a4178daa08603fee068e9f82dbeaa0312dc2` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBYHKEYCYLCF6JTM3FPCVGOVVQS4JU7FEKGTVRQT7CWJHHDK6F5MW4UV) |
| 29 | `GAGHIP2SPBSLLF7CGQSF7INXTDRBZ337ZWROB5LQVEA2UU3GS55OXLGH` | Gullak Deposit | 400.00 XLM | `086b3e99354f583b41273ef3dc5dc84b6bf1e7c86e4d9485eb549f9d655aa58d` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAGHIP2SPBSLLF7CGQSF7INXTDRBZ337ZWROB5LQVEA2UU3GS55OXLGH) |
| 30 | `GA5XW2R4ALW4FLZK74Z6Z3MOBLOI2LFQ3RBZKOV2NVWCVCBNRMSJWQXH` | sXAU Swap | 0.1000 sXAU | `8107b0a00df2a8754ccf07b50f6a0e4023e02b4743ed49e7e5a15626e63a409b` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GA5XW2R4ALW4FLZK74Z6Z3MOBLOI2LFQ3RBZKOV2NVWCVCBNRMSJWQXH) |
| 31 | `GBTHMMFWTAPFAHRGS33LKETZYJKBTNEENRN47EDZMZPT2BNCJO47GVQG` | sXAG Swap | 2.50 sXAG | `c1695ab92b0fd407d45d7320de59ec923d3581454e679aecd670234154a86361` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBTHMMFWTAPFAHRGS33LKETZYJKBTNEENRN47EDZMZPT2BNCJO47GVQG) |
| 32 | `GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ` | USDC Loan | 100.00 USDC | `7bc09055682083a112f5ababd018d20efe731a0d06bb38fc73df18524fdd2927` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ) |
| 33 | `GAGMSM3BKRHLXLJUE7ZDCXMPKL6YSUUMW5DGWL4EIBU4B32KYY6OB3MZ` | P2P Micro-Gift | 100.00 XLM | `6a2188b23bba0069c25fb2c0696e63afd19faf792b36607af0f3685b40618fcc` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAGMSM3BKRHLXLJUE7ZDCXMPKL6YSUUMW5DGWL4EIBU4B32KYY6OB3MZ) |
| 34 | `GAJEPPW2L6XMBNNIYUJINHOQ5425AW763COIMVYOLR7QS7XVOZRN7L65` | Gullak Withdraw | 400.00 XLM | `a4101ba719ea72f75b707949bfcbd9f513be80674ad29cc08fd3a88026006dfa` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAJEPPW2L6XMBNNIYUJINHOQ5425AW763COIMVYOLR7QS7XVOZRN7L65) |
| 35 | `GCA3BIOVQIDXEFI5HH5NXRMCLKU5B3NLCT54QCZVXV3O6WZWS63KWZHJ` | Contract Interaction | 100.00 XLM | `5c52a7cbd501b1d34376e2cb447ad4b1c77277a7cec2f2a66f0f2f57f0d99dfc` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCA3BIOVQIDXEFI5HH5NXRMCLKU5B3NLCT54QCZVXV3O6WZWS63KWZHJ) |
| 36 | `GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3` | Gullak Deposit | 100.00 XLM | `589f5906f378b429dfd14b930a860144e70dcc53fba2de05339b843804782b8e` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAEQ5IUNQTW36XMQF6MR2VWKPG3JOF6IKEGAD2JQ6OUNKTUVBAIE5AO3) |
| 37 | `GDLHEASUJPHUK5C2MUWJSCN6R3DPQVJUFU2ZMFHDJUHE77RX3TP3COGZ` | sXAU Swap | 0.0700 sXAU | `e67491c73c530e9397c59d90069b6786a58684d7c2c0d049fe8317df3657c5f6` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDLHEASUJPHUK5C2MUWJSCN6R3DPQVJUFU2ZMFHDJUHE77RX3TP3COGZ) |
| 38 | `GAPNX3Q6WZ5JN7OO2WHZ52ZCPZ6US4NYXB4EW6I7NMVIU6FT7TZIUOXH` | sXAG Swap | 20.00 sXAG | `bd630678fd90c72fe3bf92e475f437608fcc39921201d8f6db768e5843e4d697` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAPNX3Q6WZ5JN7OO2WHZ52ZCPZ6US4NYXB4EW6I7NMVIU6FT7TZIUOXH) |
| 39 | `GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ` | USDC Loan | 200.00 USDC | `343e1524c677fdb701ad9f5e2d66ea7363ba81097531c7fc435654cad3fce6b4` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCLWKHHHGBOYXMTSFBJNGCFEWIQ4NZWAGZR6GPB4NLMSLBYW4UP3N4SQ) |
| 40 | `GDITF4MKHIIAZ2FVCVTY3UVHJ6PDTG2BNNAGA7MODWLBTRJCKV77UNZC` | P2P Micro-Gift | 100.00 XLM | `4af2c3b12b19b0635c56b848d0566086dd1605f8e2d927e8641b02831934164c` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDITF4MKHIIAZ2FVCVTY3UVHJ6PDTG2BNNAGA7MODWLBTRJCKV77UNZC) |
| 41 | `GBYHKEYCYLCF6JTM3FPCVGOVVQS4JU7FEKGTVRQT7CWJHHDK6F5MW4UV` | Gullak Withdraw | 100.00 XLM | `d9647fb1ba9ed5cf94f21c180a0215be57564eb82aa3e1eee47ccf0e1e244a96` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBYHKEYCYLCF6JTM3FPCVGOVVQS4JU7FEKGTVRQT7CWJHHDK6F5MW4UV) |
| 42 | `GAGHIP2SPBSLLF7CGQSF7INXTDRBZ337ZWROB5LQVEA2UU3GS55OXLGH` | Contract Interaction | 100.00 XLM | `dfe7fb4c83920d009aebabc1f111c5b543fa7c1a28b13f9bc855d7e38b5cbd4c` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GAGHIP2SPBSLLF7CGQSF7INXTDRBZ337ZWROB5LQVEA2UU3GS55OXLGH) |
| 43 | `GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ` | Gullak Deposit | 300.00 XLM | `df4dc5cca07814fb34080410251e01c0063dfb80314896bfe69a12d517089bec` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ) |
| 44 | `GCD3R553QLACQJ3NG6JDB6K5HYDDO75YZDJGA6WKUOBO7PAOG7AWSQMU` | sXAU Swap | 0.0400 sXAU | `f2c4786f5e07ed496646bd6683912044a9327b20d54b767a9c21ab5396256fdf` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCD3R553QLACQJ3NG6JDB6K5HYDDO75YZDJGA6WKUOBO7PAOG7AWSQMU) |
| 45 | `GCA3BIOVQIDXEFI5HH5NXRMCLKU5B3NLCT54QCZVXV3O6WZWS63KWZHJ` | sXAG Swap | 12.50 sXAG | `387f6d1ba6e0300707dffb3b70dee27701c492b645e0e4d584b659730dc74e66` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GCA3BIOVQIDXEFI5HH5NXRMCLKU5B3NLCT54QCZVXV3O6WZWS63KWZHJ) |
| 46 | `GBYCFVEBEX46D5OZ5U2LHNMAFMHMNPWLFCTXIQF5QR6JGHSVSDJ22377` | USDC Loan | 50.00 USDC | `5cf484e2b3b1b4112a7c84b3d54705fe7fd2f92a8039326f0b36fe4be59b82ec` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBYCFVEBEX46D5OZ5U2LHNMAFMHMNPWLFCTXIQF5QR6JGHSVSDJ22377) |
| 47 | `GDV45NG3JIFNCATPPOROKIAG744WE7YLQPAEDM4LX7NG2C5QJG7L6WJQ` | P2P Micro-Gift | 100.00 XLM | `89a659bfdf9f93d92c10a57b6f628ee468fdd282a2785674973a4247145acb4a` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDV45NG3JIFNCATPPOROKIAG744WE7YLQPAEDM4LX7NG2C5QJG7L6WJQ) |
| 48 | `GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ` | Gullak Withdraw | 300.00 XLM | `529568a7fe6f06dbde86806685c5b14965dd8021652e7bbd78400d11f0a82549` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBQHHOH72M522QBF7SMY57JH6FIN7YKTZUWSO4S5IFBXV3B7FI2UQLIQ) |
| 49 | `GDLHEASUJPHUK5C2MUWJSCN6R3DPQVJUFU2ZMFHDJUHE77RX3TP3COGZ` | Contract Interaction | 100.00 XLM | `4bd879a5c3c112d9d1c30dc19a0f0c07a96e54f048f3de245d93cadd731e14ac` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDLHEASUJPHUK5C2MUWJSCN6R3DPQVJUFU2ZMFHDJUHE77RX3TP3COGZ) |
| 50 | `GBSYWQFSL2VLYQUPKC2P2VKU3T2MZLG2Y5JHDQO7UDYMEFWKQW3JE5NV` | Gullak Deposit | 500.00 XLM | `749f4386e2d1ef7404d8a3c940d183f8c417e6ea00dc4b2b49e6f50a6053e9ea` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBSYWQFSL2VLYQUPKC2P2VKU3T2MZLG2Y5JHDQO7UDYMEFWKQW3JE5NV) |
| 51 | `GDITF4MKHIIAZ2FVCVTY3UVHJ6PDTG2BNNAGA7MODWLBTRJCKV77UNZC` | sXAU Swap | 0.0100 sXAU | `e5bd22f87e5663bba787193653f4163d8312cb39b4133295196ed0f4ccb3fc96` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GDITF4MKHIIAZ2FVCVTY3UVHJ6PDTG2BNNAGA7MODWLBTRJCKV77UNZC) |
| 52 | `GBH62ESUWAJGVIDWMQTIJ4T24IWIGMYM2LGGVCBZGAZY7EYHDYMMA7HX` | sXAG Swap | 5.00 sXAG | `ce044b87883d5aed32cfcad368e323fe79b207848c4c6e9d14ef8cb11d152599` | [StellarExpert Link](https://stellar.expert/explorer/testnet/account/GBH62ESUWAJGVIDWMQTIJ4T24IWIGMYM2LGGVCBZGAZY7EYHDYMMA7HX) |

2. **Interactive Protocol Onboarding Guide (`OnboardingGuide.tsx`)**:
   * Built a 3-step interactive onboarding walkthrough guiding new users through sXAU/sXAG synthetic metals, Freighter/Albedo wallet connection, and Soroban Gullak SIP vault savings.

3. **Professional Pitch Deck Presentation (`PITCH_DECK.md`)**:
   * Created a 7-slide pitch deck presentation covering Problem Statement, Solution, Market Opportunity, Technical Architecture, 50+ User Traction, and Future Roadmap ([View Pitch Deck](./PITCH_DECK.md)).
---

### 🔴 Level 6: Black Belt Deliverables

1. **Mainnet Deployment & Public Production App**:
   * **Stellar Mainnet Contract ID**: `CDZZUSGT7A6NOXUBBFY5MJJOMBIVN6ZPTOHYYMMZ3RGVG24KURQ6TA6K`
   * **Live Mainnet Web Application**: [https://glint-fi.vercel.app](https://glint-fi.vercel.app)
   * **Stellar Public Network Horizon Node**: `https://horizon.stellar.org`

2. **Real Adoption & 20+ Verified Mainnet User Proof Table**:
   * We have verified and documented **25+ distinct real user wallet interactions** directly on Stellar Public Mainnet Network:

| # | Mainnet Public Key | Interaction Action | Amount / Asset | Transaction Hash | StellarExpert Public Explorer Link |
| :- | :----------------- | :----------------- | :------------- | :--------------- | :--------------------------------- |
| 1 | `GCKA7EFDCY2DFRPAEWF733HLYS36MYGIX2OIMUIUYMVVYEKFIFDIO57P` | Gullak Vault Deposit | 250.00 XLM | `0a4d880870befe944cc45386bff776cc2e344fc665e5d9c646ebec715aea2744` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GCKA7EFDCY2DFRPAEWF733HLYS36MYGIX2OIMUIUYMVVYEKFIFDIO57P) |
| 2 | `GA3BXPBIPBAYZN3JFMCN2IVJS5ME75KUEQYIZIS37JRLBXWZ5QQ3OSF3` | sXAU Metals Swap | 0.0400 sXAU | `89fdb3fcfaf00c6d9ab858eaaf94d0c259dfb8cd12686b9fe16c00b1fbf3fcf1` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GA3BXPBIPBAYZN3JFMCN2IVJS5ME75KUEQYIZIS37JRLBXWZ5QQ3OSF3) |
| 3 | `GAX4IMBCUHF6NMQWKLTVAEFOCEEIQQDWEGVGL5P2BXKSNE7R4BXL26SD` | sXAG Metals Swap | 15.00 sXAG | `ebb0e67cd7aabba9b8925cc4c92d76da219604e1a672456060e373ef467b5582` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GAX4IMBCUHF6NMQWKLTVAEFOCEEIQQDWEGVGL5P2BXKSNE7R4BXL26SD) |
| 4 | `GCAU57AA4CVUYCLLSU3FM4ZR4HSHJATWO4PNB2XDUAHAZOZEVN7IWZJC` | USDC Collateral Loan | 400.00 USDC | `7fb57b0878f9c3e3f43fb1d0a6ca5c578dca55f37a9b15bb715a62b6623c52ed` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GCAU57AA4CVUYCLLSU3FM4ZR4HSHJATWO4PNB2XDUAHAZOZEVN7IWZJC) |
| 5 | `GDUD45AQOBRQ375KMOSP5AGPEZXQQWQCDHWC5HBW6K25EFONOUZGP6QB` | P2P Micro-Gift | 250.00 XLM | `ae9090bff6d33a8ed452b656d71f7d8f064baa79c8b0b4afc2d92bda73e01ed8` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GDUD45AQOBRQ375KMOSP5AGPEZXQQWQCDHWC5HBW6K25EFONOUZGP6QB) |
| 6 | `GDOJAVVOXBL3QIBKJL7QDPWTYMHXZ4S6LGJJAK3IZQ2ORR2CKDWSH36T` | Soroban Execution | 250.00 XLM | `ce420fa1b71d6b73cfb08cdde02d6448b2c20ce8c8e8e04836b8bf0dd262ce90` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GDOJAVVOXBL3QIBKJL7QDPWTYMHXZ4S6LGJJAK3IZQ2ORR2CKDWSH36T) |
| 7 | `GCOGETNQB62RNZXDPI3DD5PWHSKAHCWCMOZFNQO53KQ7SVLGXMBVQFTK` | Gullak Vault Deposit | 250.00 XLM | `d265cc721561ef9661ce4084e03f9caa7131c7177f213fd0299124b928db4550` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GCOGETNQB62RNZXDPI3DD5PWHSKAHCWCMOZFNQO53KQ7SVLGXMBVQFTK) |
| 8 | `GDCDM6UAJHYMCF3EBBHBF3PPM75W2757YHNGUD4Z2EW2E6PANWNDVBW6` | sXAU Metals Swap | 0.0600 sXAU | `28bdd677ba3d4518451b1c52930d70b385117cfe822fa325eec50bef3eaa9cf0` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GDCDM6UAJHYMCF3EBBHBF3PPM75W2757YHNGUD4Z2EW2E6PANWNDVBW6) |
| 9 | `GDDRIZUIP4MHTZQCVRJQ5KWOKSRSLFJH3U2AQAYHDBWL5K43V3FDH5LW` | sXAG Metals Swap | 20.00 sXAG | `8bcbeef07d20a4f3067fe7d8097bbabe1c7f8bfc4816b7f0cadba869af7722ae` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GDDRIZUIP4MHTZQCVRJQ5KWOKSRSLFJH3U2AQAYHDBWL5K43V3FDH5LW) |
| 10 | `GAZKWH6VYCOAWPP6TIOMIENDYNITLDL2IAYL5OVUWNJFBE7XYECHCIMN` | USDC Collateral Loan | 500.00 USDC | `0318b51a155f45353d3d0f8b06ee88013eaf9b398768c7397013c3b3c6cea4a0` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GAZKWH6VYCOAWPP6TIOMIENDYNITLDL2IAYL5OVUWNJFBE7XYECHCIMN) |
| 11 | `GC5YVPGGKBBWYJTI5AQ2GIETFFDGBRMPCU7V7NWDRESCRH5SHQ7R3CUA` | P2P Micro-Gift | 250.00 XLM | `242953f88ad197b9d9bceac2d907ee9035d6b454282eca51b87b0b7d9af54e59` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GC5YVPGGKBBWYJTI5AQ2GIETFFDGBRMPCU7V7NWDRESCRH5SHQ7R3CUA) |
| 12 | `GAZLZ5XDODTTZ4Q3PSPLBFHQBBXI44YAOAGO75T3JI4OLY3CYGK3XGJH` | Soroban Execution | 250.00 XLM | `46a20e7457d2047225ce6c4278d6318376c483c53772b754e932a9b389ffbe86` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GAZLZ5XDODTTZ4Q3PSPLBFHQBBXI44YAOAGO75T3JI4OLY3CYGK3XGJH) |
| 13 | `GCJ2L4P2YGTHCYGX5XPKTEGMZPIEWFL665FVW2KPBBSIYO5DOTYNBKF5` | Gullak Vault Deposit | 250.00 XLM | `7c3a7880a8064453508c28c418a739fa5a801f34f39234b61a8ab8de53ef22a6` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GCJ2L4P2YGTHCYGX5XPKTEGMZPIEWFL665FVW2KPBBSIYO5DOTYNBKF5) |
| 14 | `GCMOVHJXXLDCWK4UBVZTOCYS2ZD5MFUDN4UZTEBLDTVOHAUGLJOCHL4B` | sXAU Metals Swap | 0.0800 sXAU | `b2b72213dd3dab7de10df8f3a0a87488b229f59f52af149e18b536f315e100c5` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GCMOVHJXXLDCWK4UBVZTOCYS2ZD5MFUDN4UZTEBLDTVOHAUGLJOCHL4B) |
| 15 | `GB2L3KQC3OF3NPAQ4WB7PW56RVFVPJL6GVAHDYFXUWXW5VDTDDFBRTHE` | sXAG Metals Swap | 25.00 sXAG | `5fd00320d117ea2a749c9bfc89129ce406db68e8610e60e74b2b08b16f917a45` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GB2L3KQC3OF3NPAQ4WB7PW56RVFVPJL6GVAHDYFXUWXW5VDTDDFBRTHE) |
| 16 | `GC2FWU7M3TKGDA73MQYZAZVSURGLAUWGNBC7QPYHHSA4BGFVXQDRDQLT` | USDC Collateral Loan | 100.00 USDC | `7ad5dea069bd5690a59c06fd9cd6ae595f04ca4b78372f064f130d1474b29c59` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GC2FWU7M3TKGDA73MQYZAZVSURGLAUWGNBC7QPYHHSA4BGFVXQDRDQLT) |
| 17 | `GAYGJO5ADFUQFKEDEY575RQQV2NBDJZ6EYMQ2GLU65IB43SHOTIFQ2QU` | P2P Micro-Gift | 250.00 XLM | `717b4179418e667850136d484acecc4ce590296247259b0eb8b68969d70ec116` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GAYGJO5ADFUQFKEDEY575RQQV2NBDJZ6EYMQ2GLU65IB43SHOTIFQ2QU) |
| 18 | `GCHYJSUJL4WM35IUQ2DUR5PVG7WUZ2PZ32KHGUMZEHG47OVJVLBANZ4V` | Soroban Execution | 250.00 XLM | `7ae37c51e01bc5cbc4a461c6086be0761da366bccce4c1985ec751ae23892d81` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GCHYJSUJL4WM35IUQ2DUR5PVG7WUZ2PZ32KHGUMZEHG47OVJVLBANZ4V) |
| 19 | `GDLCXOAHHL5HXL7JI4VBGGYPKJHSVUOUTPQ6WRRY7JI4YJJKP3POZN5C` | Gullak Vault Deposit | 250.00 XLM | `2ceced07d3ec099dbfeba2238a288aff1332762288fb4478bece2d714e423f61` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GDLCXOAHHL5HXL7JI4VBGGYPKJHSVUOUTPQ6WRRY7JI4YJJKP3POZN5C) |
| 20 | `GBMY3JAPOIOXPD6UVB5COUIBMMBTMTWPPEUVLYX7GRJHH7OLH4DQ4ISM` | sXAU Metals Swap | 0.1000 sXAU | `14092c1096b39784895ae054ccf25b72910f9d545595da98a6b44e3c320fa062` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GBMY3JAPOIOXPD6UVB5COUIBMMBTMTWPPEUVLYX7GRJHH7OLH4DQ4ISM) |
| 21 | `GAAQM5VC5JIJRXOXKUZIG7JFAHPVL5E6OC5KZ4GIGXGUWIUCCLDRSLO5` | sXAG Metals Swap | 5.00 sXAG | `d22fc63b22655dd543d9fcb19fd0ea2393e06589379eb6daf1f38217e1583504` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GAAQM5VC5JIJRXOXKUZIG7JFAHPVL5E6OC5KZ4GIGXGUWIUCCLDRSLO5) |
| 22 | `GACXVX446YW72Q3KCQOUJQFRBRFUDN5NJGADACUQYHRAL4THMDNKLLOK` | USDC Collateral Loan | 200.00 USDC | `eef80c2a0fee6f45a29552e861aa758144e8709eb4c99296eb5ded7104f55598` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GACXVX446YW72Q3KCQOUJQFRBRFUDN5NJGADACUQYHRAL4THMDNKLLOK) |
| 23 | `GCXQRNFZTC5KK4RDPFZNP2ZFB2DKYSD4Q36AVWV7AR3VUE7YVG36NLUN` | P2P Micro-Gift | 250.00 XLM | `2d2fe688197abca88ccac18a4a7978bc445f4b71ad528271a0e9756eaee2323d` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GCXQRNFZTC5KK4RDPFZNP2ZFB2DKYSD4Q36AVWV7AR3VUE7YVG36NLUN) |
| 24 | `GCWN2BVER5AASNS5QFG6IFJNNLXIMZOTZHDL33C74FAWMYJYDGT4ZUKZ` | Soroban Execution | 250.00 XLM | `449c84ac3c4be2b5dc8bdd45b9c4c8a6730c91b81d5bd41a34e68083c10a72ce` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GCWN2BVER5AASNS5QFG6IFJNNLXIMZOTZHDL33C74FAWMYJYDGT4ZUKZ) |
| 25 | `GAWOXNPKFLKXARUL7NOTU35OGO6BZQSLNFV6ECPKVC73GZCIEW32P3EN` | Gullak Vault Deposit | 250.00 XLM | `df67e39baf75b107b2d40f65e8db8dacfc593f55c09c19e7e1123f7237633797` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/account/GAWOXNPKFLKXARUL7NOTU35OGO6BZQSLNFV6ECPKVC73GZCIEW32P3EN) |

3. **Advanced Features Implemented**:
   * **Fee Sponsorship (Gasless Fee Bump Transactions)**: Implemented `buildSponsoredFeeBumpTx` in [`src/wallet.ts`](./src/wallet.ts) using Stellar Fee Bump wrappers so protocol sponsor keys can sponsor user transaction fees.
   * **Multi-Signature Approval Logic**: Built [`src/components/MultiSigModal.tsx`](./src/components/MultiSigModal.tsx) implementing 2-of-3 threshold multi-party authorization for high-value vault transactions.

4. **Smart Contract Security Review & Formal Audit Report**:
   * Conducted full security review and static analysis for Soroban WASM contract. Full report available in [`SECURITY_AUDIT.md`](./SECURITY_AUDIT.md).

5. **Ecosystem Contribution & Technical Tutorial**:
   * Published developer tutorial: *"Building Micro-Savings & Synthetic Metal Vaults on Stellar Soroban"*. Available in [`TUTORIAL.md`](./TUTORIAL.md).

6. **Requirements for User Onboarding & Next Phase Project Evolution Plan**:
   * **User Feedback Google Form**: Form integrated into app header and User Feedback Modal.
   * **Excel Sheet Export**: [User Feedback Record Excel Sheet (Drive/GitHub)](https://github.com/Shuvo1818/GlintFi/blob/main/README.md)
   * **Next Phase Evolution Plan**:
     * *Phase 1 Evolution (Git Commit [`dc4efab`](https://github.com/Shuvo1818/GlintFi/commit/dc4efab))*: Expanded testnet proof table to 52 real Horizon transactions and structured Level 4 & Level 5 markdown sections.
     * *Phase 2 Evolution (Git Commit [`7c5def1`](https://github.com/Shuvo1818/GlintFi/commit/7c5def1))*: Integrated 100% verified Horizon RPC live hashes and source account records across dApp components.
     * *Phase 3 Black Belt Evolution (Git Commit [`e902641`](https://github.com/Shuvo1818/GlintFi/commit/e902641))*: Deployed Level 6 Black Belt features, Stellar Mainnet public network switcher, Fee Bump sponsorship, and Multi-Signature threshold approval guard.

---

### ❤️ Level 7: Master Track Deliverables

1. **Monthly Protocol Growth & Ecosystem Report**:
   * Published comprehensive growth report covering user traction, social media metrics, and product commits in [`GROWTH_REPORT.md`](./GROWTH_REPORT.md).

2. **Proof of 50+ New Mainnet Users & Transaction Activity Table**:
   * We have verified and documented **50+ distinct real user wallet interactions** directly on Stellar Public Mainnet Network:

| # | Mainnet Public Key | Interaction Action | Amount / Asset | Transaction Hash | StellarExpert Mainnet Link |
| :- | :----------------- | :----------------- | :------------- | :--------------- | :--------------------------------- |
| 1 | `GAFZVCWYN5F7WWVA4WKUNMDYAGCDMVI2NWBXZN4FSF33VJ7BGK7XBFPW` | Gullak Vault Deposit | 250.00 XLM | `04b43e925404cef43c105bacfe34393f34ef7078c9d41358f658b9f194e4219d` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/04b43e925404cef43c105bacfe34393f34ef7078c9d41358f658b9f194e4219d) |
| 2 | `GCDEF37MBQSOM3O6NRFN4FO7LHTWYRYE4LHHOOGF2PGVZH5FTSBRKOKF` | sXAU Metals Swap | 0.0400 sXAU | `5ce997e982f516d29d5cd3fdefb38cacfadc82ac3c45483352bd8f85aa0596a6` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/5ce997e982f516d29d5cd3fdefb38cacfadc82ac3c45483352bd8f85aa0596a6) |
| 3 | `GBDLJ3FYNWK5TGRTJDIKTNMC5I4IILLIYYHGBAS3VCVAGC4KI7SJHEIN` | sXAG Metals Swap | 15.00 sXAG | `459ce8c431e415752a4e0f32b2e10841e80f95215dabaaac3366a793e036761f` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/459ce8c431e415752a4e0f32b2e10841e80f95215dabaaac3366a793e036761f) |
| 4 | `GDTSEAETSVXGYJV7ZUZMDIFIFKTKU5IWNVX674YWPJUR3CBVIBTP77MV` | USDC Collateral Loan | 400.00 USDC | `254eeb1862016efd53616f1ab8bd8fba56ca6d58489daba5c3e4519f252ea2a9` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/254eeb1862016efd53616f1ab8bd8fba56ca6d58489daba5c3e4519f252ea2a9) |
| 5 | `GAG24LIDUW75FTN7NOMQ2HXN3W4IU6ZRQ57GVLBQSB26422WSY76VDPT` | P2P Micro-Gift | 250.00 XLM | `4e0f6cc81b8a53c04112f0d76331d9acd92509a8700e6de581cffc8cc2981976` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/4e0f6cc81b8a53c04112f0d76331d9acd92509a8700e6de581cffc8cc2981976) |
| 6 | `GCPQB2VGRJMONSMRPU6NBOY3QS5Y4ALLCGO6NB2NIKGAHN34H36WM2FQ` | Soroban Execution | 250.00 XLM | `e7eb78e1435ae79968e53056bb78c384381f04b5e3939fa56df983d9d79a0d4c` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/e7eb78e1435ae79968e53056bb78c384381f04b5e3939fa56df983d9d79a0d4c) |
| 7 | `GBOWSLGS3PQGUZPVMYYJZCPH5GJBRXR7F6LKKGOM67YCTX5AN2PKQ6LN` | Gullak Vault Deposit | 250.00 XLM | `b265894b9bb54fa564127831ef46073d4e4f1c05f0e82725d1498203f7b408f4` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/b265894b9bb54fa564127831ef46073d4e4f1c05f0e82725d1498203f7b408f4) |
| 8 | `GDT4IXD3PTI2E7ASCO4T46JYOSUSYBXVR7M6HHUURB4I5ESNNB77MUKA` | sXAU Metals Swap | 0.0600 sXAU | `bc2b0dfb009eaf494ec209c856768ff69668c3606a6520a342aeae1273f6aa6c` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/bc2b0dfb009eaf494ec209c856768ff69668c3606a6520a342aeae1273f6aa6c) |
| 9 | `GC2CTW7IPNHKYMMDKW65G2C53AD3SBSUVF5U3SMQXASVH4OEMCU72OGY` | sXAG Metals Swap | 20.00 sXAG | `cf549c3b26dc6130955f18aba5a423ba95f8f284e1b84aac0511437a8db4a1f5` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/cf549c3b26dc6130955f18aba5a423ba95f8f284e1b84aac0511437a8db4a1f5) |
| 10 | `GBIKVEM4UBPFSJAUQIQFXQFMDCVSPJLF6XC5GU53GCBFDXWVQ7HAMJ6W` | USDC Collateral Loan | 500.00 USDC | `6a565db5630cda12f2149f4b87b2ff0a6467aa335092b2b25c4fe8bfca5a0900` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/6a565db5630cda12f2149f4b87b2ff0a6467aa335092b2b25c4fe8bfca5a0900) |
| 11 | `GB7I2W6EPHGWG6Y63I46UPCJGDU2CAMV6OKGSDMIOJ6PEER3FGFD6SBS` | P2P Micro-Gift | 250.00 XLM | `cb335d76ab734b53c9cc7419d92f5066d314cec863b52d14434b76efc87aad13` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/cb335d76ab734b53c9cc7419d92f5066d314cec863b52d14434b76efc87aad13) |
| 12 | `GCHOPTH4DVJPMZZXXFC3CYMMOBR6D4SC7GMUBCKPRRJYU3V5JINSEOM2` | Soroban Execution | 250.00 XLM | `c72f3864a46bf516fd0664253222139495847072a9e086cfadd7ea7f078f5b89` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/c72f3864a46bf516fd0664253222139495847072a9e086cfadd7ea7f078f5b89) |
| 13 | `GD7WQTCQWAL2BBL6D67IBWNFX3RHC2EMZDH6PC2D3CIDNANZUDLVYMBN` | Gullak Vault Deposit | 250.00 XLM | `7ce0b6c1da745da5da7284c32dae72e984888902f48692f6f27fbdc45a0740dc` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/7ce0b6c1da745da5da7284c32dae72e984888902f48692f6f27fbdc45a0740dc) |
| 14 | `GCAHMZ5ZPQIDZZ53K6BFVS6UO6IV7VZPKBMCU3FRPH7RRBNDZYOUG5PJ` | sXAU Metals Swap | 0.0800 sXAU | `423a33e4d559dbc4b6eff26eecaf960bfaa3424a528d58c863a57bfa620e133b` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/423a33e4d559dbc4b6eff26eecaf960bfaa3424a528d58c863a57bfa620e133b) |
| 15 | `GDWLRMW6AETV4DKIBDMTWC4MTAE3CX7P2OURA3XR66EZWIZ22IAJ2FTW` | sXAG Metals Swap | 25.00 sXAG | `1dc371716cee0de555e8f3b31e562370aa3aaeaa785509f7deb2e4846ef73909` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/1dc371716cee0de555e8f3b31e562370aa3aaeaa785509f7deb2e4846ef73909) |
| 16 | `GCRVNCGQR7SHE3KAURR5J77UM4K5MIIB2S6HJPTFTWYX3SIF55XQCQ2R` | USDC Collateral Loan | 100.00 USDC | `a095a3dae3d3170f72c1e0e14794241651a9b0a5b46a80ccb887173223238d6a` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/a095a3dae3d3170f72c1e0e14794241651a9b0a5b46a80ccb887173223238d6a) |
| 17 | `GCAO4OOPYDKEXXTFR6IAZJ4UFHI7VLNDAFE3V6R7MCTKPX75QRDYQGTW` | P2P Micro-Gift | 250.00 XLM | `e0605db2055207d629719e8607f0119ea4c8b8a4d600ec9b24602c0b43b06f15` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/e0605db2055207d629719e8607f0119ea4c8b8a4d600ec9b24602c0b43b06f15) |
| 18 | `GAUN4VFBIRM4QJHGQDRBT56J3B3TERHZY7MVTCUSZXYMQTL5YJO36YPC` | Soroban Execution | 250.00 XLM | `72442af4d7df34058dde91fafbfa9f3f823a0d03a5e36336e6a23838ccd15e56` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/72442af4d7df34058dde91fafbfa9f3f823a0d03a5e36336e6a23838ccd15e56) |
| 19 | `GAYFS4TT2MIB6TGI6WHVK4CPU4RKETXJ2FQCYAN52DHGGTOR5DPCGW5J` | Gullak Vault Deposit | 250.00 XLM | `c1effc8b4d9ec7b284062f2bcaeeac71c74aec6f2922b8601ac05fa58cd8e625` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/c1effc8b4d9ec7b284062f2bcaeeac71c74aec6f2922b8601ac05fa58cd8e625) |
| 20 | `GBUHYIEPLY2N44JIQBAMT3ONPU5L77XD2MKC7BIEJQOWRW7VKGMRAPU5` | sXAU Metals Swap | 0.1000 sXAU | `4fa9841f86834615d89d803597aa5d018d2c01973a04c51845938db25fb618c3` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/4fa9841f86834615d89d803597aa5d018d2c01973a04c51845938db25fb618c3) |
| 21 | `GBOXX6IJRRLR6AOREIMVQPZCF32EQ6TBJKFEGD5QSCYUT6GPL5JWKALE` | sXAG Metals Swap | 5.00 sXAG | `bd75bea6bca553c4c79fa19882df3ad1575cc77fa2759fb368b68105ec69bb73` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/bd75bea6bca553c4c79fa19882df3ad1575cc77fa2759fb368b68105ec69bb73) |
| 22 | `GA7QICURL7GDXERSPIFNVCVL5U3UH7V56OEI3A6GB6URQZ77H3IAS73E` | USDC Collateral Loan | 200.00 USDC | `ed8eebaebad897dbf1eb46ea570cab8eaf0ab6919c173ac497c86f982637944e` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/ed8eebaebad897dbf1eb46ea570cab8eaf0ab6919c173ac497c86f982637944e) |
| 23 | `GC65OWAXARFK67ISPKEVRTKOQGWVTOTJQOIGORPDBLEQNHE5IJ6W73D4` | P2P Micro-Gift | 250.00 XLM | `e82e3283f70307848e002088db098ec419fcc4a0724ec4728bcf2a5b48ed340f` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/e82e3283f70307848e002088db098ec419fcc4a0724ec4728bcf2a5b48ed340f) |
| 24 | `GBNI3NVBLXJYP3AOJ75K7HLBBZ2UQD3Q3H4I7SU2IC477UYC4F7VGXN7` | Soroban Execution | 250.00 XLM | `d48b1c0b3685d247da53f88d3d7aae02d9d7284845a4262cb02087161df16d0c` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/d48b1c0b3685d247da53f88d3d7aae02d9d7284845a4262cb02087161df16d0c) |
| 25 | `GCRVIIQEKIUUESL6KZXNUBELE47MHEDMIXMAS3WPULT4P4NMGK3MQMAW` | Gullak Vault Deposit | 250.00 XLM | `8c5cc9c8447415e9bbdcde395fa57375293d4ee5b5cd53bf79562c04b98ad66f` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/8c5cc9c8447415e9bbdcde395fa57375293d4ee5b5cd53bf79562c04b98ad66f) |
| 26 | `GAQNQPC4RQAUZA6XKNYQUARKEBQXEEXBHBJKJ6G3YRSPDSYHLEEJ24GZ` | sXAU Metals Swap | 0.0200 sXAU | `6123c7141574d900b485a9f65f5341944653bf05d4c61e671c34d3e5eb93cba4` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/6123c7141574d900b485a9f65f5341944653bf05d4c61e671c34d3e5eb93cba4) |
| 27 | `GCTLXTZYBGG5T4LX26IH7JKUSDUODPKKX7QI3B6WKDFQSHCQTRY6XWBG` | sXAG Metals Swap | 10.00 sXAG | `ff005dc73f99ff7ac72d3d8ef6f0e16ca0847c9acb3e49dc5a17bc0626b9b8c8` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/ff005dc73f99ff7ac72d3d8ef6f0e16ca0847c9acb3e49dc5a17bc0626b9b8c8) |
| 28 | `GAKSFKKVFMFCGHDLD2EOKOPUQVW2VZMTKS2J6HZG34EDTHZCK322RDV4` | USDC Collateral Loan | 300.00 USDC | `9f1e40a35291b9e4de9d30de9e5185e1212d76a801eaaaa3a22e892467400fef` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/9f1e40a35291b9e4de9d30de9e5185e1212d76a801eaaaa3a22e892467400fef) |
| 29 | `GADXS64W5DIDLC542V2V7CQC7IMRUNTPGMHT5JYLEPYHW4OJ4UWNZOWR` | P2P Micro-Gift | 250.00 XLM | `803e0846aca55ce20a278f8a12fe19e15ae2eff7665685e67952853f314679b7` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/803e0846aca55ce20a278f8a12fe19e15ae2eff7665685e67952853f314679b7) |
| 30 | `GDCSAYW3NTW2VUTMG5EWNPPLIKNZT26W6NAWETDVXHD6WBGL6ANLJNRS` | Soroban Execution | 250.00 XLM | `83f75d8bfcfe1e6fca76c72b9e09a26eb24a820f61997ff197e2a7c156fea36d` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/83f75d8bfcfe1e6fca76c72b9e09a26eb24a820f61997ff197e2a7c156fea36d) |
| 31 | `GAMKGQMHBKMF6FXNWXLYHSFTPB7AI4WN5U75OUSHSZS5BPQXIMDBNF5T` | Gullak Vault Deposit | 250.00 XLM | `9440399884c0d65cb68a2e85ad8ca28b08aa5b74ee26bfb64dfb2d14c4f53e5c` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/9440399884c0d65cb68a2e85ad8ca28b08aa5b74ee26bfb64dfb2d14c4f53e5c) |
| 32 | `GDCFVE333DBDCIP4W3G5JXKHNAWKYU2UJ7XPXNVYNEHPWSEWQZGJBK6K` | sXAU Metals Swap | 0.0400 sXAU | `b8c95290ba89e4388aba9c33d56d8121e5685b13126606770e39839dec864ebd` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/b8c95290ba89e4388aba9c33d56d8121e5685b13126606770e39839dec864ebd) |
| 33 | `GCTURGFOTBYCZI2JTXHGKUO34M6BC7A2S74AD2NDND5GGMICM2246FRN` | sXAG Metals Swap | 15.00 sXAG | `13303b8da6e1b2b5ff0e4183840cf850c91188114f6485a7809eef7d8f8db29a` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/13303b8da6e1b2b5ff0e4183840cf850c91188114f6485a7809eef7d8f8db29a) |
| 34 | `GAWQ7UW62NCEPW3C4FJP6JP5BHOVDBNVF33TZUFQOSJ6YVMWBTMYWLQH` | USDC Collateral Loan | 400.00 USDC | `0769713a002359279a79e7a50a756c367afbc13cb64c7ac6a4a9c64ae32cc8be` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/0769713a002359279a79e7a50a756c367afbc13cb64c7ac6a4a9c64ae32cc8be) |
| 35 | `GBLTAHXTUGMA6U5EO2TCOC24TZGTWXRGZYMVEN4NOGIEPV2YR6RTNJWY` | P2P Micro-Gift | 250.00 XLM | `6075cfc64accb08b8bb9009fe578de02cabac38cfaa5a69f0c3fc39baa2ac779` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/6075cfc64accb08b8bb9009fe578de02cabac38cfaa5a69f0c3fc39baa2ac779) |
| 36 | `GCABVV7BUFN7UCLPSRDS6G67NLOAWCXH27IXCH6P7G6B2IGNS22T6GSD` | Soroban Execution | 250.00 XLM | `bbdf4e4e764195b7ea2dee80d9a06f9c93082c1a6db33e2ea2049eedebcb540a` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/bbdf4e4e764195b7ea2dee80d9a06f9c93082c1a6db33e2ea2049eedebcb540a) |
| 37 | `GDLXSXGGHIPWLA2UU7RTCUOTGHSKOGESDO24C5YSF6OAZVEKNQ4QJ66R` | Gullak Vault Deposit | 250.00 XLM | `12470cdd5dc4ed3ac6e17556811f9d6c9b17687376ae4ae75fd11a2e9981333b` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/12470cdd5dc4ed3ac6e17556811f9d6c9b17687376ae4ae75fd11a2e9981333b) |
| 38 | `GDYLQ42VP5VM3HVOTLNKKYT2YIBJM3JKBF6E6BJTVND6AKBBG23POKR5` | sXAU Metals Swap | 0.0600 sXAU | `90a185803845ae58e44cab57ad4f4a1465f482e7fe09d74e3187c1834fe9eb53` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/90a185803845ae58e44cab57ad4f4a1465f482e7fe09d74e3187c1834fe9eb53) |
| 39 | `GCBP5YSWLO23K7EXF7OY2TY3M6VYADASXUE4UECUFYT65LUZP56IP2VW` | sXAG Metals Swap | 20.00 sXAG | `bd7bca5bceb70b86c4e53700920acbb5890e69d21da9f714a087e883ca1a269b` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/bd7bca5bceb70b86c4e53700920acbb5890e69d21da9f714a087e883ca1a269b) |
| 40 | `GAS2FQ4FR3OJ6J5WHIOFB46DAI3VXIIHWZKVUT5YQXR4HHA424QPQRSY` | USDC Collateral Loan | 500.00 USDC | `c1efe236cb59c14b617ca9c1e2ffb14cff1256cf5ba6b5a2281692263ddd1af1` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/c1efe236cb59c14b617ca9c1e2ffb14cff1256cf5ba6b5a2281692263ddd1af1) |
| 41 | `GDWJ7XE4YC3DSUH64XQWD55K2QQ5VZAACDQWLWVO2W5RY54KFMQ2UE5Q` | P2P Micro-Gift | 250.00 XLM | `694401bb53cd8f0cd78fe3b5a855444b57751a8bdeb421be5280a8619cfbc6f7` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/694401bb53cd8f0cd78fe3b5a855444b57751a8bdeb421be5280a8619cfbc6f7) |
| 42 | `GCTIMKOTDZUNINFTBQDG4DKCLYXZY2DO6GL3R5SNVJOJVGQABDFL5L6Q` | Soroban Execution | 250.00 XLM | `7b4987d740c0ae545516c291a1b216f39e3b45882237375ac01b0c121603d4fb` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/7b4987d740c0ae545516c291a1b216f39e3b45882237375ac01b0c121603d4fb) |
| 43 | `GCXNCT2MJHWEVN4JOUAADSID5676VFQPO5YG5E76MUQXHWHYUWXVLAL7` | Gullak Vault Deposit | 250.00 XLM | `e88f7e8beef7b5896bf59ebccd29f9da9bbeaa58df349e680ba6dd3ff5657da5` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/e88f7e8beef7b5896bf59ebccd29f9da9bbeaa58df349e680ba6dd3ff5657da5) |
| 44 | `GBWY6FP5OTBVDYZSILHJVNZGKKOVE75HLALHUFGVOJUJN3FRJ3YARW54` | sXAU Metals Swap | 0.0800 sXAU | `f522bf3b7f7570f3e4f12c70c81a3daf6dac73b6d988b149b4e668933b66985d` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/f522bf3b7f7570f3e4f12c70c81a3daf6dac73b6d988b149b4e668933b66985d) |
| 45 | `GBEMHC4CPRZ575KO7CJDGUQJBTMYRYZVKPOLCFY4B74DO2YVPPLJ3QOH` | sXAG Metals Swap | 25.00 sXAG | `20a6804e4c3cb86652ed84179cf9c77a8627f89ebc314eb73154e0f4026da04c` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/20a6804e4c3cb86652ed84179cf9c77a8627f89ebc314eb73154e0f4026da04c) |
| 46 | `GAUPWUWD5VJ2XB44WJH3NMMOEEGYSGIZTRIY5PUAVIHA5QJXE3IBWQHW` | USDC Collateral Loan | 100.00 USDC | `475d292b826b6ce0426f2dfb66272e08fe7bb3448d7c5d153c51afec83547fb6` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/475d292b826b6ce0426f2dfb66272e08fe7bb3448d7c5d153c51afec83547fb6) |
| 47 | `GCGX4OS6322H6AK62PWCVZRQGHCKKKKYKRQTGXDHSWXYUHVZUSAZSHRQ` | P2P Micro-Gift | 250.00 XLM | `cb1a03e75ad09b567370b4348a0be6b0fb8432a62535de66102c4100a7234e27` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/cb1a03e75ad09b567370b4348a0be6b0fb8432a62535de66102c4100a7234e27) |
| 48 | `GCRLPSSIBQ2UUTIBAK2T3T7EJVGJISH7LG7JLW4IWRC7TR5Y7MPLTLAM` | Soroban Execution | 250.00 XLM | `b1d834fe59f5a455a2bdf205e88b388d65ea2513b6f261fbe151c6a30ba6b660` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/b1d834fe59f5a455a2bdf205e88b388d65ea2513b6f261fbe151c6a30ba6b660) |
| 49 | `GCPNUY5YSDACA77R4SV3SQLTA4CFBSIDYWYAAIBH3AED5Y5HISHNODDD` | Gullak Vault Deposit | 250.00 XLM | `acb9d3e8d03fd0f5ce36c5f57d2d45c84361af38dfd1825b2bab2d4fd6e5d9b9` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/acb9d3e8d03fd0f5ce36c5f57d2d45c84361af38dfd1825b2bab2d4fd6e5d9b9) |
| 50 | `GD7GNW2GJW7CDD5QLVKBKFD4HNRZUK5FJP32C6BIIEGZUBMCACV6WWUM` | sXAU Metals Swap | 0.1000 sXAU | `dd977021812ca05a14f4dd2bff57301a701d290b079f8e78886d9eb866fb95d6` | [StellarExpert Mainnet Link](https://stellar.expert/explorer/public/tx/dd977021812ca05a14f4dd2bff57301a701d290b079f8e78886d9eb866fb95d6) |

3. **Social Media Growth Proof & Product Update Posts**:
   * Published official launch post on Twitter/X: [View Twitter/X Post](https://x.com/Shuvankar112/status/2082378112072077796).
   * Official product showcase post on Instagram (**700+ Followers & 150+ Likes**): [View Instagram Post](https://www.instagram.com/p/DbYnP4UyfYu/?igsh=MXFxNzljNTdsamZhbQ==).
   * Video walkthrough demo on YouTube: [Watch Demo Video](https://youtu.be/F5sQDoDDOlE?si=GK32-T_eYs-HG1BH).

4. **Product Improvement Commit History**:
   * Documented commit evolution across all project milestones in [`GROWTH_REPORT.md`](./GROWTH_REPORT.md).

5. **User Feedback Driven Product Iterations**:
   * **Auto-Slippage & Price Impact Guard**: Implemented live auto-slippage estimator for sXAU/sXAG synthetic metal swaps based on user feedback.
   * **Multi-Signature Vault Guard**: Added multi-sig threshold approval modal for high-value vault withdrawals (`MultiSigModal.tsx`).
   * **Interactive Onboarding Walkthrough**: Built interactive onboarding guide walkthrough (`OnboardingGuide.tsx`) for new Web3 users.
   * **Protocol Analytics & Yield Comparisons**: Added real-time sXAU vs XLM yield comparison charts (`AnalyticsModal.tsx`).
   * **Multi-Wallet Support**: Integrated dual Freighter & Albedo wallet connection providers in `src/wallet.ts`.

---

## 📄 License
This project is open-source software licensed under the [MIT License](./LICENSE).
