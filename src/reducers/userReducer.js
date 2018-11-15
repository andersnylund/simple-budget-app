import { INITIAL_CATEGORIES } from '../constants';

export const initialState = {
  categories: INITIAL_CATEGORIES.map(c => ({ title: c, parties: [] }))
};

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const ADD_PARTY = 'ADD_PARTY';
export const REMOVE_PARTY = 'REMOVE_PARTY';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const RESET_USER_STATE = 'RESET_USER_STATE';

const reducer = (state = initialState, action) => {
  if (action.type === ADD_CATEGORY) {
    const newCategory = {
      title: action.categoryTitle,
      parties: []
    };

    return {
      ...state,
      categories: [...state.categories, newCategory]
    };
  }

  if (action.type === REMOVE_CATEGORY) {
    const newCategories = state.categories.filter(
      category => category.title !== action.categoryTitle
    );

    return {
      ...state,
      categories: [...newCategories]
    };
  }

  if (action.type === ADD_PARTY) {
    const existingCategoryIndex = state.categories.findIndex(c => c.title === action.category);
    const existingCategory = state.categories[existingCategoryIndex];
    if (existingCategory) {
      const parties = existingCategory.parties.slice(0); // Clones the array.

      parties.splice(action.index, 0, action.party); // Adds the party to a specific index inside the parties array.
      const newCategory = {
        title: existingCategory.title,
        parties: [...parties]
      };

      const categoriesList = state.categories
        .filter(c => c.title !== existingCategory.title) // Removes existing category.
        .slice(0);

      categoriesList.splice(existingCategoryIndex, 0, newCategory); // Adds the new category at the same index of the removed category.

      return {
        ...state,
        categories: [...categoriesList]
      };
    }
    return state;
  }

  if (action.type === REMOVE_PARTY) {
    // @TODO Refactor REMOVE_PARTY && ADD_PARTY common logic into util Fns.

    const existingCategoryIndex = state.categories.findIndex(c => c.title === action.category);
    const existingCategory = state.categories[existingCategoryIndex];

    if (existingCategory) {
      const parties = existingCategory.parties.slice(0); // Clones the array.

      const newCategory = {
        title: existingCategory.title,
        parties: [...parties].filter(p => p !== action.party)
      };

      const categoriesList = state.categories
        .filter(c => c.title !== existingCategory.title) // Removes existing category.
        .slice(0);

      categoriesList.splice(existingCategoryIndex, 0, newCategory); // Adds the new category at the same index of the removed category.

      return {
        ...state,
        categories: [...categoriesList]
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

export const addCategory = categoryTitle => ({
  type: ADD_CATEGORY,
  categoryTitle
});

export const removeCategory = categoryTitle => ({
  type: REMOVE_CATEGORY,
  categoryTitle
});

export const addPartyToCategory = (party, category, index) => ({
  type: ADD_PARTY,
  category,
  party,
  index
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
