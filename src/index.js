import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider, addLocaleData} from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import './index.css';
import App from './App';
import messages_en from "./translations/en.json";
import * as serviceWorker from './serviceWorker';

addLocaleData([...locale_en]);

const messages = {
    'en': messages_en
};

ReactDOM.render(
    <IntlProvider locale="en" messages={messages["en"]}>
        <App />
    </IntlProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
