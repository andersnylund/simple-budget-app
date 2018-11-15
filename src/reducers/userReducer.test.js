import deepFreeze from 'deep-freeze';
import reducer, {
  addPartyToCategory,
  removePartyFromCategory,
  resetUserState,
  initialState
} from './userReducer';

describe('userReducer', () => {
  it('should set the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({
      categories: [
        { parties: [], title: 'Housing' },
        { parties: [], title: 'Food' },
        { parties: [], title: 'Others' },
        { parties: [], title: 'Entertainment' },
        { parties: [], title: 'Monthly-bill' }
      ]
    });
  });

  it('should add a party to category', () => {
    const state = reducer(undefined, addPartyToCategory('Party1', 'Housing', 0));
    const category = state.categories.find(c => c.title === 'Housing');
    expect(category).toEqual({
      title: 'Housing',
      parties: ['Party1']
    });
  });

  it('should remove a party from category', () => {
    const action = deepFreeze(addPartyToCategory('Party1', 'Housing'));
    const state = reducer(undefined, action);
    const category = state.categories.find(c => c.title === 'Housing');
    expect(category).toEqual({
      title: 'Housing',
      parties: ['Party1']
    });

    const newState = deepFreeze(
      reducer(state, deepFreeze(removePartyFromCategory('Party1', 'Housing')))
    );
    const newCategory = newState.categories.find(c => c.title === 'Housing');
    expect(newCategory).toEqual({
      title: 'Housing',
      parties: []
    });
  });

  it('should reset the user state', () => {
    const state = reducer(undefined, addPartyToCategory('Party1', 'Housing', 0));
    const resetted = reducer(state, resetUserState());
    expect(resetted).toEqual(initialState);
  });
});
