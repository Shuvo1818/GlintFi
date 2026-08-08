#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env, log};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Balance(Address),
    Admin,
}

#[contract]
pub struct GullakVault;

#[contractimpl]
impl GullakVault {
    // Deposit tokens into the vault
    pub fn deposit(env: Env, from: Address, token_addr: Address, amount: i128) {
        from.require_auth();
        
        if amount <= 0 {
            panic!("Deposit amount must be positive");
        }

        let balance_key = DataKey::Balance(from.clone());
        let current_balance: i128 = env
            .storage()
            .persistent()
            .get(&balance_key)
            .unwrap_or(0);

        let new_balance = current_balance + amount;
        env.storage().persistent().set(&balance_key, &new_balance);

        let token_client = token::Client::new(&env, &token_addr);
        token_client.transfer(&from, &env.current_contract_address(), &amount);

        log!(&env, "Deposit successful. User: {}, New Balance: {}", from, new_balance);
    }

    // Withdraw tokens from the vault
    pub fn withdraw(env: Env, to: Address, token_addr: Address, amount: i128) {
        to.require_auth();

        if amount <= 0 {
            panic!("Withdrawal amount must be positive");
        }

        let balance_key = DataKey::Balance(to.clone());
        let current_balance: i128 = env
            .storage()
            .persistent()
            .get(&balance_key)
            .unwrap_or(0);

        if current_balance < amount {
            panic!("Insufficient vault deposit balance");
        }

        let new_balance = current_balance - amount;
        env.storage().persistent().set(&balance_key, &new_balance);

        let token_client = token::Client::new(&env, &token_addr);
        token_client.transfer(&env.current_contract_address(), &to, &amount);

        log!(&env, "Withdrawal successful. Recipient: {}, New Balance: {}", to, new_balance);
    }

    // Get current deposited balance in the vault
    pub fn get_balance(env: Env, address: Address) -> i128 {
        let balance_key = DataKey::Balance(address);
        env.storage()
            .persistent()
            .get(&balance_key)
            .unwrap_or(0)
    }
}

mod test;
