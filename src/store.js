import { combineReducers, createStore } from 'redux';

import appReducer from './reducers/appReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  appReducer,
  userReducer
});

const store = createStore(reducer);

export default store;
