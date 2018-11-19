import deepFreeze from 'deep-freeze';
import reducer, {
  initialState,
  setBank,
  setTransactions,
  setPageIndex,
  resetAppState
} from './appReducer';
import { transactions } from '../testHelpers';
import { op } from '../Bank';

describe('userReducer', () => {
  it('should set the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({
      activePageIndex: 0,
      bank: {
        amountIndex: 2,
        dateHeaderFormat: 'DD.MM.YYYY',
        dateHeaderIndex: 0,
        name: 'Danske Bank',
        partyIndex: 1
      },
      transactions: []
    });
  });

  it('should set the bank', () => {
    deepFreeze(initialState);
    const action = deepFreeze(setBank(op));
    const state = reducer(initialState, action);
    expect(state.bank).toEqual({
      amountIndex: 2,
      dateHeaderFormat: 'DD.MM.YYYY',
      dateHeaderIndex: 0,
      name: 'Osuuspankki',
      partyIndex: 5
    });
  });

  it('should set the transactions', () => {
    deepFreeze(initialState);
    const action = deepFreeze(setTransactions(transactions));
    const state = reducer(initialState, action);
    expect(state.transactions.length).toEqual(4);
  });

  it('should set the page index', () => {
    Object.freeze(initialState);
    const action = deepFreeze(setPageIndex(2));
    const state = reducer(initialState, action);
    expect(state.activePageIndex).toEqual(2);
  });

  it('should reset the state', () => {
    deepFreeze(initialState);
    const action = deepFreeze(setTransactions(transactions));
    const state = reducer(initialState, action);
    expect(state.transactions.length).toEqual(4);
    const resetted = reducer(deepFreeze(state), resetAppState());
    expect(resetted.transactions.length).toEqual(0);
  });
});
