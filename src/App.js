import React, { Component } from 'react';
import CSVFileReader from './components/CSVFileReader';
import BankSelector from './components/BankSelector';
import BalanceHistory from './components/BalanceHistory';
import { parse, saveStateToLocalStorage, hydrateStateWithLocalStorage } from './util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvString: null,
      selectedBank: null
    };
  }

  componentDidMount() {
    hydrateStateWithLocalStorage(this);
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener('beforeunload', () => saveStateToLocalStorage(this));
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', () => saveStateToLocalStorage(this));
    // saves if component has a chance to unmount
    saveStateToLocalStorage(this);
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

  render() {
    const { csvString, selectedBank } = this.state;
    const showBalanceHistory = csvString && selectedBank;

    let data;
    if (showBalanceHistory) {
      data = parse(csvString, selectedBank);
    }

    return (
      <div className="App">
        <CSVFileReader setCSVString={this.setCSVString} />
        <BankSelector selectedBank={selectedBank} setBank={this.setBank} />
        {showBalanceHistory ? <BalanceHistory data={data} /> : null}
      </div>
    );
  }
}

export default App;
