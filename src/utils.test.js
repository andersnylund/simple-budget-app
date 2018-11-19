import { combinedAmountOfParties, significantParties } from './utils';
import { transactions, categories } from './testHelpers';

describe('utils.js', () => {
  it('should return correct value from amountByCategory', () => {
    const result = combinedAmountOfParties(transactions, categories[1].parties);
    expect(result).toEqual(131.6);
  });

  it('should return correct value significantParties', () => {
    const result = significantParties(transactions);
    expect(result).toEqual([
      { amount: 121, title: 'party3' },
      { amount: 20.2, title: 'party1' },
      { amount: 10.6, title: 'party2' }
    ]);
  });

  it('should only return 10 values from significant parties', () => {
    const manyTransactions = [...Array(11).keys()].map(key => ({
      date: new Date().toISOString(),
      party: `party${key}`,
      amount: 0
    }));

    expect(manyTransactions.length).toBe(11);

    const result = significantParties(manyTransactions);
    expect(result.length).toEqual(10);
  });
});
