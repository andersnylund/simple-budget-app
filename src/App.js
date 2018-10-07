import React, { Component } from 'react';
import CSVFileReader from './components/CSVFileReader';
import BankSelector from './components/BankSelector';
import banks from './banks';
import TransactionHistory from './components/TransactionHistory';
import { parse } from './util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvString: null,
      selectedBank: banks[0]
    };
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
    const showTransactionHistory = csvString && selectedBank;

    return (
      <div className="App">
        <CSVFileReader setCSVString={this.setCSVString} />
        <BankSelector setBank={this.setBank} />
        {showTransactionHistory ? (
          <TransactionHistory data={parse(csvString, selectedBank)} />
        ) : null}
      </div>
    );
  }
}

export default App;
