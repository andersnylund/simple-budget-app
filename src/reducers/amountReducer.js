import cloneDeep from 'lodash/cloneDeep';

export const initialState = {
  significantParties: [],
  sumByCategories: [],
  spendingByCategories: [],
  spendingByMonth: []
};

const SET_SUM_OF_PARTIES = 'SET_SUM_OF_PARTIES';
const SET_SUM_OF_CATEGORY = 'SET_SUM_OF_CATEGORY';
const SET_SPENDING_OF_CATEGORY = 'SET_SPENDING_OF_CATEGORY';
const SET_SPENDING_BY_MONTH_OF_CATEGORY = 'SET_SPENDING_BY_MONTH_OF_CATEGORY';
export const UPDATE_ALL_AMOUNTS = 'UPDATE_ALL_AMOUNTS';
const RESET_AMOUNT_STATE = 'RESET_AMOUNT_STATE';

const reducer = (state = initialState, action) => {
  if (action.type === SET_SUM_OF_PARTIES) {
    return {
      ...state,
      significantParties: [...action.sumByParty]
    };
  }

  if (action.type === SET_SUM_OF_CATEGORY) {
    return {
      ...state,
      sumByCategories: [...state.sumByCategories]
        .filter(c => c.title !== action.categoryTitle)
        .concat({ sum: action.sum, title: action.categoryTitle })
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

  if (action.type === SET_SPENDING_BY_MONTH_OF_CATEGORY) {
    return {
      ...state,
      spendingByMonth: [...state.spendingByMonth]
        .filter(c => c.title !== action.categoryTitle)
        .concat({ spendingByMonth: action.spendingByMonth, title: action.categoryTitle })
    };
  }

  if (action.type === RESET_AMOUNT_STATE) {
    return {
      ...cloneDeep(initialState)
    };
  }

  return state;
};

export const setSignificantParties = sumByParty => ({
  type: SET_SUM_OF_PARTIES,
  sumByParty
});

export const setSumOfCategory = (sum, categoryTitle) => ({
  type: SET_SUM_OF_CATEGORY,
  sum,
  categoryTitle
});

export const setSpendingOfCategory = (spending, categoryTitle) => ({
  type: SET_SPENDING_OF_CATEGORY,
  spending,
  categoryTitle
});

export const setSpendingByMonthOfCategory = (spendingByMonth, categoryTitle) => ({
  type: SET_SPENDING_BY_MONTH_OF_CATEGORY,
  spendingByMonth,
  categoryTitle
});

export const updateAllAmounts = () => ({
  type: UPDATE_ALL_AMOUNTS
  // TODO add update amounts of specific categories with (...categories)
});

export const resetAmountState = () => ({
  type: RESET_AMOUNT_STATE
});

export default reducer;
