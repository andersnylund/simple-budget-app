import papa from 'papaparse';
import moment from 'moment';
import _ from 'lodash';

export const fileToString = (file, onLoadEnd) => {
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    const { result } = fileReader;
    onLoadEnd(result);
  };
  fileReader.readAsText(file);
};

export const parse = (csvString, bank) => {
  const transactions = papa.parse(csvString).data.filter((_, i) => i !== 0); // remove first item
  const data = transactions.map(transaction => ({
    date: moment(transaction[bank.dateHeaderIndex], bank.dateHeaderFormat),
    amount: transaction[bank.amountIndex],
    party: transaction[bank.partyIndex]
  }));
  return data;
};

export const hydrateStateWithLocalStorage = component => {
  // for all items in state
  Object.keys(component.state).forEach(key => {
    // if the key exists in localStorage
    if (_.has(localStorage, key)) {
      // get the key's value from localStorage
      let value = localStorage.getItem(key);
      // parse the localStorage string and setState
      try {
        value = JSON.parse(value);
        component.setState({ [key]: value });
      } catch (e) {
        // handle empty string
        component.setState({ [key]: value });
      }
    }
  });
};

export const saveStateToLocalStorage = component => {
  // for every item in React state
  Object.keys(component.state).forEach(key => {
    // save to localStorage
    const { [key]: value } = component.state;
    localStorage.setItem(key, JSON.stringify(value));
  });
};

export default {
  fileToString,
  parse
};
