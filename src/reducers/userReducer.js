import { INITIAL_CATEGORIES } from '../constants';

export const initialState = {
  categories: INITIAL_CATEGORIES.map(c => ({ title: c, parties: [] }))
};

export const ADD_PARTY = 'ADD_PARTY';
export const REMOVE_PARTY = 'REMOVE_PARTY';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const RESET_USER_STATE = 'RESET_USER_STATE';

const reducer = (state = initialState, action) => {
  if (action.type === ADD_PARTY) {
    const prevValue = state.categories.find(c => c.title === action.category);
    if (prevValue) {
      const newCategory = { title: prevValue.title, parties: [...prevValue.parties, action.party] };
      return {
        ...state,
        categories: [...state.categories]
          .filter(c => c.title !== prevValue.title)
          .concat(newCategory)
      };
    }
    return state;
  }

  if (action.type === REMOVE_PARTY) {
    const prevValue = state.categories.find(c => c.title === action.category);
    if (prevValue) {
      const newCategory = {
        title: prevValue.title,
        parties: [...prevValue.parties].filter(p => p !== action.party)
      };
      return {
        ...state,
        categories: [...state.categories]
          .filter(c => c.title !== prevValue.title)
          .concat(newCategory)
      };
    }
  }

  if (action.type === SET_CATEGORIES) {
    return {
      ...state,
      categories: action.categories
    };
  }

  if (action.type === RESET_USER_STATE) {
    return {
      ...initialState
    };
  }

  return state;
};

export const addPartyToCategory = (party, category) => ({
  type: ADD_PARTY,
  category,
  party
});

export const removePartyFromCategory = (party, category) => ({
  type: REMOVE_PARTY,
  category,
  party
});

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
});

export const resetUserState = () => ({
  type: RESET_USER_STATE
});

export default reducer;
