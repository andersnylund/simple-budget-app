import reducer, {
  initialState,
  setBank,
  setTransactions,
  setPageIndex,
  resetAppState
} from './appReducer';
import { initialTransactions } from '../testHelpers';
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
    Object.freeze(initialState);
    const state = reducer(initialState, setBank(op));
    expect(state.bank).toEqual({
      amountIndex: 2,
      dateHeaderFormat: 'DD.MM.YYYY',
      dateHeaderIndex: 0,
      name: 'Osuuspankki',
      partyIndex: 5
    });
  });

  it('should set the transactions', () => {
    Object.freeze(initialState);
    const state = reducer(initialState, setTransactions(initialTransactions));
    expect(state.transactions.length).toEqual(4);
  });

  it('should set the page index', () => {
    Object.freeze(initialState);
    const state = reducer(initialState, setPageIndex(2));
    expect(state.activePageIndex).toEqual(2);
  });

  it('should reset the state', () => {
    Object.freeze(initialState);
    const state = reducer(initialState, setTransactions(initialTransactions));
    expect(state.transactions.length).toEqual(4);
    const resetted = reducer(state, resetAppState());
    expect(resetted.transactions.length).toEqual(0);
  });
});
