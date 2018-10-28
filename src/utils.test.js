import { amountByCategory, categoryOfParty } from './utils';
import { initialTransactions, categories } from './testHelpers';

describe('utils.js', () => {
  it('should return correct value in spendingByCategory', () => {
    const result = amountByCategory(initialTransactions, categories);
    expect(result).toEqual([
      {
        title: 'category1',
        amount: 20.2
      },
      {
        title: 'category2',
        amount: 131.6
      }
    ]);
  });

  it('should return category of party', () => {
    const result = categoryOfParty('party1', categories);
    expect(result).toEqual('category1');
  });

  it('should return null when party is not categorized', () => {
    const result = categoryOfParty('party4', categories);
    expect(result).toEqual(null);
  });
});
