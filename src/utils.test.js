import { combinedAmountOfParties, amountByEachParty } from './utils';
import { transactions, categories } from './testHelpers';

describe('utils.js', () => {
  it('should return correct value from amountByCategory', () => {
    const result = combinedAmountOfParties(transactions, categories[1].parties);
    expect(result).toEqual(131.6);
  });

  it('should return correct value from amountByParty', () => {
    const result = amountByEachParty(transactions);
    expect(result).toEqual([
      { amount: 121, title: 'party3' },
      { amount: 20.2, title: 'party1' },
      { amount: 10.6, title: 'party2' }
    ]);
  });
});
