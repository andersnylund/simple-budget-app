import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import throttle from 'lodash/throttle';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from './reducers/appReducer';
import userReducer from './reducers/userReducer';
import amountReducer from './reducers/amountReducer';
import App from './App';
import messagesEn from './translations/en.json';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(
  combineReducers({
    appReducer,
    userReducer,
    amountReducer
  }),
  persistedState,
  composeWithDevTools()
);

// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

addLocaleData([...en]);

const messages = {
  en: messagesEn
};

ReactDOM.render(
  <CssBaseline>
    <IntlProvider locale="en" messages={messages.en}>
      <Provider store={store}>
        <App />
      </Provider>
    </IntlProvider>
  </CssBaseline>,
  document.getElementById('root')
);
