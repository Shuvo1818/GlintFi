import { describe, it, expect } from 'vitest';
import { formatAddress, calculateYield, calculateLoanInterest, scalePrice } from './utils';

describe('GlintFi Frontend Unit Tests', () => {
  
  // Test 1: formatAddress
  it('should truncate Stellar addresses correctly', () => {
    const address = 'GDX2MP6ATXZYKLLEO4GKNEC4UNQKUPUSML7KYPYQU6OPL4XITUI52F3X';
    expect(formatAddress(address)).toBe('GDX2...2F3X');
    expect(formatAddress('short')).toBe('short');
    expect(formatAddress('')).toBe('');
  });

  // Test 2: calculateYield
  it('should calculate Gullak savings yields accurately', () => {
    // $1000 deposit at 5% APR for 365 days should return $50 yield
    expect(calculateYield(1000, 5, 365)).toBe(50);
    // Invalid values should return 0
    expect(calculateYield(-100, 5, 30)).toBe(0);
    expect(calculateYield(1000, 0, 365)).toBe(0);
  });

  // Test 3: calculateLoanInterest
  it('should calculate loan interest correctly', () => {
    // $1000 loan principal at 12% APR for 6 months should return $60 interest
    expect(calculateLoanInterest(1000, 12, 6)).toBe(60);
    // $500 loan principal at 8% APR for 12 months should return $40 interest
    expect(calculateLoanInterest(500, 8, 12)).toBe(40);
  });

  // Test 4: scalePrice
  it('should scale asset prices based on percent changes', () => {
    // Gold base price of $2000 scaled up by 5% should be $2100
    expect(scalePrice(2000, 5)).toBe(2100);
    // Silver base price of $30 scaled down by 10% should be $27
    expect(scalePrice(30, -10)).toBe(27);
  });

});
