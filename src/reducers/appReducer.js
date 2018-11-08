import { danske } from '../Bank';

export const initialState = {
  transactions: [],
  bank: danske,
  activePageIndex: 0
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_TRANSACTIONS') {
    return {
      ...state,
      transactions: action.transactions
    };
  }
  if (action.type === 'SET_BANK') {
    return {
      ...state,
      bank: action.bank
    };
  }
  if (action.type === 'SET_PAGE_INDEX') {
    return {
      ...state,
      activePageIndex: action.pageIndex
    };
  }
  if (action.type === 'RESET_APP_STATE') {
    return {
      ...initialState
    };
  }
  return state;
};

export const setTransactions = transactions => ({
  type: 'SET_TRANSACTIONS',
  transactions
});

export const setBank = bank => ({
  type: 'SET_BANK',
  bank
});

export const setPageIndex = pageIndex => ({
  type: 'SET_PAGE_INDEX',
  pageIndex
});

export const resetAppState = () => ({
  type: 'RESET_APP_STATE'
});

export default reducer;
