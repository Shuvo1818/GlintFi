# Building Decentralized Micro-Savings & Synthetic Metal Vaults on Stellar Soroban

> **Level 6 (Black Belt) Mandatory Ecosystem Contribution: Technical Workshop & Developer Tutorial**

---

## Abstract

This technical tutorial guides Web3 developers through building a production-grade decentralized micro-savings protocol (**GlintFi**) on the **Stellar Soroban** smart contract platform. You will learn how to create WASM smart contracts in Rust, connect frontend wallets (Freighter & Albedo), handle synthetic precious metal assets (`sXAU` & `sXAG`), and implement Stellar Fee Bump gasless transactions.

---

## Table of Contents

1. **Introduction to Soroban Smart Contracts**
2. **Architecture Overview**
3. **Writing the Soroban Gullak Vault Contract in Rust**
4. **Connecting Wallet Signers (Freighter & Albedo SDK)**
5. **Implementing Stellar Fee Bump Sponsorship (Gasless UX)**
6. **Deploying to Stellar Mainnet & Horizon RPC Integration**

---

## 1. Writing the Soroban Vault Contract in Rust

Below is the core WASM contract logic for managing systematic investment plan (SIP) vaults on Soroban:

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, Symbol, symbol_short};

#[contract]
pub struct GullakVault;

#[contractimpl]
impl GullakVault {
    pub fn deposit(env: Env, user: Address, amount: i128) {
        user.require_auth();
        let key = Symbol::new(&env, "bal");
        let current: i128 = env.storage().persistent().get(&user).unwrap_or(0);
        env.storage().persistent().set(&user, &(current + amount));
        env.events().publish((symbol_short!("deposit"), user), amount);
    }

    pub fn get_user_balance(env: Env, user: Address) -> i128 {
        env.storage().persistent().get(&user).unwrap_or(0)
    }
}
```

---

## 2. Connecting Wallet Signers in TypeScript

Connecting Freighter API in React:

```typescript
import { requestAccess, getAddress } from '@stellar/freighter-api';

export const connectFreighter = async (): Promise<string> => {
  const access = await requestAccess();
  if (access && access.address) {
    return access.address;
  }
  const res = await getAddress();
  return res.address;
};
```

---

## 3. Implementing Gasless Fee Bump Sponsorship

To sponsor transaction fees for onboarding users without requiring them to own XLM upfront:

```typescript
import { TransactionBuilder, FeeBumpTransaction } from '@stellar/stellar-sdk';

export const sponsorUserTx = (innerTxXdr: string, sponsorKeypair: any) => {
  const innerTx = TransactionBuilder.fromXDR(innerTxXdr, 'Test SDF Network ; September 2015');
  const feeBump = TransactionBuilder.buildFeeBumpTransaction(
    sponsorKeypair,
    '200', // maxFee in stroops
    innerTx,
    'Test SDF Network ; September 2015'
  );
  feeBump.sign(sponsorKeypair);
  return feeBump.toXDR();
};
```

---

## Conclusion & Resources

* **GitHub Repository**: [https://github.com/Shuvo1818/GlintFi](https://github.com/Shuvo1818/GlintFi)
* **Live App**: [https://glint-fi.vercel.app](https://glint-fi.vercel.app)
* **Stellar Soroban Docs**: [https://soroban.stellar.org](https://soroban.stellar.org)

---
*Created with ❤️ for the Stellar Developer Ecosystem.*
