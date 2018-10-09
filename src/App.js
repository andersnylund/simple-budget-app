import React, { Component } from 'react';
import _ from 'lodash';
import CSVFileReader from './components/CSVFileReader';
import BankSelector from './components/BankSelector';
import TransactionHistory from './components/TransactionHistory';
import { parse } from './util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvString: null,
      selectedBank: null
    };
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener('beforeunload', () => this.saveStateToLocalStorage());
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', () => this.saveStateToLocalStorage());
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  setCSVString = string => {
    this.setState({
      csvString: string
    });
  };

  setBank = bank => {
    this.setState({
      selectedBank: bank
    });
  };

  hydrateStateWithLocalStorage() {
    // for all items in state
    Object.keys(this.state).forEach(key => {
      // if the key exists in localStorage
      if (_.has(localStorage, key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    });
  }

  saveStateToLocalStorage() {
    // for every item in React state
    Object.keys(this.state).forEach(key => {
      // save to localStorage
      const { [key]: value } = this.state;
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  render() {
    const { csvString, selectedBank } = this.state;
    const showTransactionHistory = csvString && selectedBank;

    let data;
    if (showTransactionHistory) {
      data = parse(csvString, selectedBank);
    }

    return (
      <div className="App">
        <CSVFileReader setCSVString={this.setCSVString} />
        <BankSelector selectedBank={selectedBank} setBank={this.setBank} />
        {showTransactionHistory ? <TransactionHistory data={data} /> : null}
      </div>
    );
  }
}

export default App;
