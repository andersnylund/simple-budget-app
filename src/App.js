import React, { Component } from 'react';
import './App.css';
import Papa from 'papaparse';

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
    const parsed = Papa.parse(content);
    this.setState({
      data: parsed
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
            {this.state.data.data.map((row) => (<div>{row}</div>))}
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
