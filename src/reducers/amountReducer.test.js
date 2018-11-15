import deepFreeze from 'deep-freeze';
import reducer, {
  setSignificantParties,
  setAmountOfCategory,
  resetAmountState,
  setSpendingOfCategory
} from './amountReducer';

describe('amountReducer', () => {
  it('should set the amount by party', () => {
    const amountByParty = [
      {
        title: 'Party1',
        amount: 123125
      },
      {
        title: 'Party2',
        amount: -234.123
      }
    ];
    const state = reducer(undefined, deepFreeze(setSignificantParties(amountByParty)));
    expect(state).toEqual({
      amountByCategories: [],
      significantParties: [
        { amount: 123125, title: 'Party1' },
        { amount: -234.123, title: 'Party2' }
      ],
      spendingByCategories: []
    });
  });

  it('should set the spending of category', () => {
    const state1 = reducer(undefined, deepFreeze(setSpendingOfCategory(2134.234, 'category1')));
    expect(state1.spendingByCategories).toEqual([{ spending: 2134.234, title: 'category1' }]);

    const state2 = reducer(
      deepFreeze(state1),
      deepFreeze(setSpendingOfCategory(1234, 'category2'))
    );
    expect(state2.spendingByCategories).toEqual([
      { spending: 2134.234, title: 'category1' },
      { spending: 1234, title: 'category2' }
    ]);

    const state3 = reducer(deepFreeze(state2), deepFreeze(setSpendingOfCategory(1, 'category1')));
    expect(state3.spendingByCategories).toEqual([
      { spending: 1234, title: 'category2' },
      { spending: 1, title: 'category1' }
    ]);
  });

  it('should set the amount of category', () => {
    const state1 = reducer(undefined, deepFreeze(setAmountOfCategory(2134.234, 'category1')));
    expect(state1.amountByCategories).toEqual([{ amount: 2134.234, title: 'category1' }]);

    const state2 = reducer(deepFreeze(state1), deepFreeze(setAmountOfCategory(1234, 'category2')));
    expect(state2.amountByCategories).toEqual([
      { amount: 2134.234, title: 'category1' },
      { amount: 1234, title: 'category2' }
    ]);

    const state3 = reducer(deepFreeze(state2), deepFreeze(setAmountOfCategory(1, 'category1')));
    expect(state3.amountByCategories).toEqual([
      { amount: 1234, title: 'category2' },
      { amount: 1, title: 'category1' }
    ]);
  });

  it('should reset the state', () => {
    const state1 = reducer(undefined, deepFreeze(setAmountOfCategory(2134.234, 'category1')));
    const state2 = reducer(deepFreeze(state1), deepFreeze(resetAmountState()));
    expect(state2).toEqual({
      amountByCategories: [],
      significantParties: [],
      spendingByCategories: []
    });
  });
});
