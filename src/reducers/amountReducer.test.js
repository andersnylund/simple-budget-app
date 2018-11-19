import deepFreeze from 'deep-freeze';
import reducer, {
  setSignificantParties,
  setSumOfCategory,
  resetAmountState,
  setSpendingOfCategory
} from './amountReducer';

describe('amountReducer', () => {
  it('should set the sum by party', () => {
    const sumByParty = [
      {
        title: 'Party1',
        sum: 123125
      },
      {
        title: 'Party2',
        sum: -234.123
      }
    ];
    const state = reducer(undefined, deepFreeze(setSignificantParties(sumByParty)));
    expect(state).toEqual({
      sumByCategories: [],
      significantParties: [{ sum: 123125, title: 'Party1' }, { sum: -234.123, title: 'Party2' }],
      spendingByCategories: [],
      spendingByMonth: []
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

  it('should set the sum of category', () => {
    const state1 = reducer(undefined, deepFreeze(setSumOfCategory(2134.234, 'category1')));
    expect(state1.sumByCategories).toEqual([{ sum: 2134.234, title: 'category1' }]);

    const state2 = reducer(deepFreeze(state1), deepFreeze(setSumOfCategory(1234, 'category2')));
    expect(state2.sumByCategories).toEqual([
      { sum: 2134.234, title: 'category1' },
      { sum: 1234, title: 'category2' }
    ]);

    const state3 = reducer(deepFreeze(state2), deepFreeze(setSumOfCategory(1, 'category1')));
    expect(state3.sumByCategories).toEqual([
      { sum: 1234, title: 'category2' },
      { sum: 1, title: 'category1' }
    ]);
  });

  it('should reset the state', () => {
    const state1 = reducer(undefined, deepFreeze(setSumOfCategory(2134.234, 'category1')));
    const state2 = reducer(deepFreeze(state1), deepFreeze(resetAmountState()));
    expect(state2).toEqual({
      sumByCategories: [],
      significantParties: [],
      spendingByCategories: [],
      spendingByMonth: []
    });
  });
});
