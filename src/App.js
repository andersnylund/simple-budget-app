import React, { Component } from 'react';
import CSVFileReader from './components/CSVFileReader';
import CSVDataParser from './components/CSVDataParser';
import BankSelector from './components/BankSelector';
import banks from './banks';

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

    return (
      <div className="App">
        <CSVFileReader setCSVString={this.setCSVString} />
        <BankSelector setBank={this.setBank} />
        {csvString ? (
          <CSVDataParser csvString={csvString} selectedBank={selectedBank} />
        ) : (
          <p>not loaded</p>
        )}
      </div>
    );
  }
}

export default App;
