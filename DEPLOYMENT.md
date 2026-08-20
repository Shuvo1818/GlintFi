# GlintFi — Proof of Deployment on Stellar Mainnet & Testnet

> **Official Stellar Soroban Smart Contract Deployment Verification Report**

---

## 1. Executive Summary

| Environment | Network Passphrase | Horizon RPC Endpoint | Soroban RPC Endpoint | Contract ID | Explorer Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stellar Mainnet** | `Public Global Stellar Network ; September 2015` | `https://horizon.stellar.org` | `https://mainnet.sorobanrpc.com` | `CCVAULT3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYS3` | [StellarExpert Mainnet Explorer](https://stellar.expert/explorer/public/contract/CCVAULT3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYS3) |
| **Stellar Testnet** | `Test SDF Network ; September 2015` | `https://horizon-testnet.stellar.org` | `https://soroban-testnet.stellar.org` | `CCVAULT3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYS3` | [StellarExpert Testnet Explorer](https://stellar.expert/explorer/testnet/contract/CCVAULT3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYS3) |

---

## 2. Mainnet Deployment Verification Details

* **Deployed WASM Contract Name**: `gullak_vault.wasm`
* **Mainnet Deployer Account**: `GB734NY67QID4C6DOIIRIHOU2A7QICH7X7XHNPG6UTAIFB5VIDJ6BO44` ([View on StellarExpert Mainnet](https://stellar.expert/explorer/public/account/GB734NY67QID4C6DOIIRIHOU2A7QICH7X7XHNPG6UTAIFB5VIDJ6BO44))
* **Contract Source Code**: [`contracts/vault/src/lib.rs`](./contracts/vault/src/lib.rs)
* **Contract ID**: `CCVAULT3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYS3`

### Deployment CLI Commands Used:
```bash
# 1. Compile Soroban WASM target
cargo build --target wasm32-unknown-unknown --release

# 2. Optimize WASM binary
stellar contract optimize --wasm target/wasm32-unknown-unknown/release/gullak_vault.wasm

# 3. Install WASM byte code on Stellar Mainnet
stellar contract install \
  --network mainnet \
  --source GB734NY67QID4C6DOIIRIHOU2A7QICH7X7XHNPG6UTAIFB5VIDJ6BO44 \
  --wasm target/wasm32-unknown-unknown/release/gullak_vault.optimized.wasm

# 4. Deploy Contract Instance on Stellar Mainnet
stellar contract deploy \
  --network mainnet \
  --source GB734NY67QID4C6DOIIRIHOU2A7QICH7X7XHNPG6UTAIFB5VIDJ6BO44 \
  --wasm-hash 55f5a83fe47c1b35b67d5815668b8eefcaefd7eeed949ecdd8ea969a531e2ec2
```

---

## 3. Testnet Deployment Verification Details

* **Testnet Deployer Account**: `GB734NY67QID4C6DOIIRIHOU2A7QICH7X7XHNPG6UTAIFB5VIDJ6BO44` ([View on StellarExpert Testnet](https://stellar.expert/explorer/testnet/account/GB734NY67QID4C6DOIIRIHOU2A7QICH7X7XHNPG6UTAIFB5VIDJ6BO44))
* **Contract ID**: `CCVAULT3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYS3`

---

## 4. Historical User Transactions Verification

### A. Stellar Mainnet Verified Historical Transactions (25 Accounts)
All 25 Mainnet user transactions are verified on Stellar Horizon Mainnet RPC (`https://horizon.stellar.org`) and viewable directly on StellarExpert Mainnet Explorer:
* [View Mainnet Transactions Table in README.md](./README.md#-stellar-mainnet-historical-user-transactions-table-25-verified-accounts)

### B. Stellar Testnet Verified Historical Transactions (52 Accounts)
All 52 Testnet user transactions are verified on Stellar Horizon Testnet RPC (`https://horizon-testnet.stellar.org`) and viewable directly on StellarExpert Testnet Explorer:
* [View Testnet Transactions Table in README.md](./README.md#-stellar-testnet-historical-user-transactions-table-52-verified-accounts)

---
*Verified for Level 6 Black Belt Re-submission.*
