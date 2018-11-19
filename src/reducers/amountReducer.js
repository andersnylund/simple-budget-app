export const initialState = {
  amountByParties: [],
  amountByCategories: []
};

const SET_AMOUNT_BY_PARTY = 'SET_AMOUNT_BY_PARTY';
const SET_AMOUNT_OF_CATEGORY = 'SET_AMOUNT_OF_CATEGORY';
const RESET_AMOUNT_STATE = 'RESET_AMOUNT_STATE';

const reducer = (state = initialState, action) => {
  if (action.type === SET_AMOUNT_BY_PARTY) {
    return {
      ...state,
      amountByParties: [...action.amountByParty]
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

  if (action.type === RESET_AMOUNT_STATE) {
    return {
      amountByParties: [],
      amountByCategories: []
    };
  }

  return state;
};

export const setAmountByParties = amountByParty => ({
  type: SET_AMOUNT_BY_PARTY,
  amountByParty
});

export const setAmountOfCategory = (amount, categoryTitle) => ({
  type: SET_AMOUNT_OF_CATEGORY,
  amount,
  categoryTitle
});

export const resetAmountState = () => ({
  type: RESET_AMOUNT_STATE
});

export default reducer;
