import React, { Component } from 'react';
import './App.css';
import Papa from 'papaparse';
import { XYPlot, MarkSeries, HorizontalGridLines, VerticalGridLines, YAxis, XAxis } from 'react-vis';
import moment from 'moment';

moment.locale('fi');

class App extends Component {

  fileReader;

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  handleFileLoaded = () => {
    const content = this.fileReader.result;
    const parsed = Papa.parse(content, {
      header: true
    });

    const manipulated = parsed.data.map(row => {
      return {
        x: moment(row['Pvm'], 'DD.MM.YYYY'),
        y: parseInt(row['Saldo'].replace(',', '.')),
      };
    });

    console.log('manipulated', manipulated);

    this.setState({
      data: manipulated
    });
  }

  hanleFileChange = (e) => {
    const file = e.target.files[0];
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileLoaded;
    this.fileReader.readAsText(file);
  }

  // https://medium.com/@ilonacodes/front-end-shorts-how-to-read-content-from-the-file-input-in-react-17f49b293909

  render() {
    return (
      <div className="App">
        {this.state.data ?
        <div>
          <h1>Done!</h1>
          <div>
          <XYPlot height={1200} width={1200}>
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis title="X Axis" position="start" />
            <YAxis title="Y Axis" />
            <MarkSeries data={this.state.data} />
          </XYPlot>
          </div>
        </div> 
        :
          <div>
            <h1>Upload yor CSV-file here</h1>
            <input type='file' accept='.csv' onChange={this.hanleFileChange}></input>  
          </div>
        }
      </div>
    );
  }
}

export default App;
