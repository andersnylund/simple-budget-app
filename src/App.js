import React, { Component } from 'react';
import CSVFileReader from './components/CSVFileReader';
import CSVDataParser from './components/CSVDataParser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvString: null
    };
  }

  setCSVString = string => {
    this.setState({
      csvString: string
    });
  };

  render() {
    const { csvString } = this.state;

    return (
      <div className="App">
        <CSVFileReader setCSVString={this.setCSVString} />
        {csvString ? <CSVDataParser csvString={csvString} /> : <p>not loaded</p>}
      </div>
    );
  }
}

export default App;
