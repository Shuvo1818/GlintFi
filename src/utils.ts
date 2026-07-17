/**
 * Utility functions for GlintFi dashboard operations
 */

/**
 * Truncates a Stellar/Soroban address for UI display
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

/**
 * Calculates interest yields for Gullak DeFi Savings Vault
 */
export function calculateYield(deposit: number, apr: number, days: number): number {
  if (deposit <= 0 || apr <= 0 || days <= 0) return 0;
  const yieldAmt = deposit * (apr / 100) * (days / 365);
  return Math.round(yieldAmt * 10000) / 10000;
}

/**
 * Calculates interest for gold/silver collateralized loans
 */
export function calculateLoanInterest(principal: number, apr: number, months: number): number {
  if (principal <= 0 || apr <= 0 || months <= 0) return 0;
  const interest = principal * (apr / 100) * (months / 12);
  return Math.round(interest * 100) / 100;
}

/**
 * Scales base mock asset price to represent live market movements
 */
export function scalePrice(basePrice: number, changePercent: number): number {
  if (basePrice <= 0) return 0;
  const newPrice = basePrice * (1 + changePercent / 100);
  return Math.round(newPrice * 100) / 100;
}
