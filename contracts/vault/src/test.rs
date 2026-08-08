#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Env};

#[test]
fn test_deposit_and_withdraw() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, GullakVault);
    let client = GullakVaultClient::new(&env, &contract_id);

    let user = Address::generate(&env);
    let token_admin = Address::generate(&env);

    // Register a mock token contract to use
    let token_contract_id = env.register_stellar_asset_contract(token_admin);
    let token_client = token::StellarAssetClient::new(&env, &token_contract_id);
    let token = token::Client::new(&env, &token_contract_id);

    // Mint some tokens to the user
    token_client.mint(&user, &1000);
    assert_eq!(token.balance(&user), 1000);

    // Deposit 400 tokens into the vault
    client.deposit(&user, &token_contract_id, &400);
    
    // Check balances
    assert_eq!(client.get_balance(&user), 400);
    assert_eq!(token.balance(&user), 600);
    assert_eq!(token.balance(&contract_id), 400);

    // Withdraw 150 tokens
    client.withdraw(&user, &token_contract_id, &150);

    // Check updated balances
    assert_eq!(client.get_balance(&user), 250);
    assert_eq!(token.balance(&user), 750);
    assert_eq!(token.balance(&contract_id), 250);
}
