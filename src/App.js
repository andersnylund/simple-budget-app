import React, { Component } from 'react';
import Papa from 'papaparse';
import {
  XYPlot,
  MarkSeries,
  HorizontalGridLines,
  VerticalGridLines,
  YAxis,
  XAxis
} from 'react-vis';
import moment from 'moment';
import FileDrop from './components/FileDrop';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  handleFileLoaded = fileReader => {
    const content = fileReader.result;
    const parsed = Papa.parse(content, {
      header: true
    });

    const manipulated = parsed.data.map(row => ({
      x: moment(row.Pvm, 'DD.MM.YYYY'),
      y: parseInt(row.Saldo.replace(',', '.'), 10)
    }));

    console.log('manipulated', manipulated);

    this.setState({
      data: manipulated
    });
  };

  hanleFileChange = e => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => this.handleFileLoaded(fileReader);
    fileReader.readAsText(file);
  };

  // https://medium.com/@ilonacodes/front-end-shorts-how-to-read-content-from-the-file-input-in-react-17f49b293909

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        {data ? (
          <div>
            <h1>Done!</h1>
            <div>
              <XYPlot height={1200} width={1200}>
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title="X Axis" position="start" />
                <YAxis title="Y Axis" />
                <MarkSeries data={data} />
              </XYPlot>
            </div>
          </div>
        ) : (
          <div>
            <h1>Drag n Drop your CSV-file here</h1>
            <FileDrop />
            <p>or upload it</p>
            <input type="file" accept=".csv" onChange={this.hanleFileChange} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
