import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import messagesEn from './translations/en.json';
import * as serviceWorker from './serviceWorker';
import { saveStateToLocalStorage, hydrateStateWithLocalStorage } from './utils';

const props = { saveStateToLocalStorage, hydrateStateWithLocalStorage };

addLocaleData([...en]);

const messages = {
  en: messagesEn
};

ReactDOM.render(
  <CssBaseline>
    <IntlProvider locale="en" messages={messages.en}>
      <App {...props} />
    </IntlProvider>
  </CssBaseline>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
