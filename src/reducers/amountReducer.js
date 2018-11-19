import cloneDeep from 'lodash/cloneDeep';

export const initialState = {
  significantParties: [],
  amountByCategories: [],
  spendingByCategories: []
};

const SET_AMOUNT_BY_PARTY = 'SET_AMOUNT_BY_PARTY';
const SET_AMOUNT_OF_CATEGORY = 'SET_AMOUNT_OF_CATEGORY';
const SET_SPENDING_OF_CATEGORY = 'SET_SPENDING_OF_CATEGORY';
const RESET_AMOUNT_STATE = 'RESET_AMOUNT_STATE';

const reducer = (state = initialState, action) => {
  if (action.type === SET_AMOUNT_BY_PARTY) {
    return {
      ...state,
      significantParties: [...action.amountByParty]
    };
  }

  if (action.type === SET_AMOUNT_OF_CATEGORY) {
    return {
      ...state,
      amountByCategories: [...state.amountByCategories]
        .filter(c => c.title !== action.categoryTitle)
        .concat({ amount: action.amount, title: action.categoryTitle })
    };
  }

  if (action.type === SET_SPENDING_OF_CATEGORY) {
    return {
      ...state,
      spendingByCategories: [...state.spendingByCategories]
        .filter(c => c.title !== action.categoryTitle)
        .concat({ spending: action.spending, title: action.categoryTitle })
    };
  }

  if (action.type === RESET_AMOUNT_STATE) {
    return {
      ...cloneDeep(initialState)
    };
  }

  return state;
};

export const setSignificantParties = amountByParty => ({
  type: SET_AMOUNT_BY_PARTY,
  amountByParty
});

export const setAmountOfCategory = (amount, categoryTitle) => ({
  type: SET_AMOUNT_OF_CATEGORY,
  amount,
  categoryTitle
});

export const setSpendingOfCategory = (spending, categoryTitle) => ({
  type: SET_SPENDING_OF_CATEGORY,
  spending,
  categoryTitle
});

export const resetAmountState = () => ({
  type: RESET_AMOUNT_STATE
});

export default reducer;
