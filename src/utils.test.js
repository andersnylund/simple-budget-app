import { significantParties, sumAndSpendingOfParties } from './utils';
import { transactions, categories } from './testHelpers';

describe('utils.js', () => {
  it(`should return correct value ${significantParties.name}`, () => {
    const result = significantParties(transactions);
    expect(result).toEqual([
      { sum: 121, title: 'party3' },
      { sum: 20.2, title: 'party1' },
      { sum: 10.6, title: 'party2' }
    ]);
  });

  it(`should only return 10 values from ${significantParties.name}`, () => {
    const manyTransactions = [...Array(11).keys()].map(key => ({
      date: new Date().toISOString(),
      party: `party${key}`,
      sum: 0
    }));

    expect(manyTransactions.length).toBe(11);

    const result = significantParties(manyTransactions);
    expect(result.length).toEqual(10);
  });

  it(`should return correct sum from ${sumAndSpendingOfParties.name}`, () => {
    const result = sumAndSpendingOfParties(transactions, categories[1].parties);
    expect(result.sum).toEqual(131.6);
  });

  it(`should return correct value from ${sumAndSpendingOfParties.name}`, () => {
    const transacts = [
      {
        date: new Date().toISOString(),
        party: 'party1',
        amount: -1
      },
      {
        date: new Date().toISOString(),
        party: 'party2',
        amount: -2.5
      },
      {
        date: new Date().toISOString(),
        party: 'party1',
        amount: 10
      },
      {
        date: new Date().toISOString(),
        party: 'party3',
        amount: 121
      }
    ];

    const result = sumAndSpendingOfParties(transacts, ['party1', 'party2', 'party3']);
    expect(result.spending).toBe(-3.5);
  });
});
