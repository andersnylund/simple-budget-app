import React, { Component } from 'react';
import LandingPage from './pages/LandingPage';
import ImportPage from './pages/ImportPage';
import InfoPage from './pages/InfoPage';
import BottomNavigation from './components/BottomNavigation';
import VisualizationPage from './pages/VisualizationPage';
import CategorizationPage from './pages/CategorizationPage';
import { saveStateToLocalStorage, hydrateStateWithLocalStorage } from './util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvString: null,
      selectedBank: null,
      activePage: 'LANDING'
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

  changePage = page => {
    this.setState({
      activePage: page
    });
  };

  showPage = key => {
    const { selectedBank, csvString } = this.state;

    if (key === 'LANDING') {
      return <LandingPage />;
    }
    if (key === 'INFO') {
      return <InfoPage />;
    }
    if (key === 'IMPORT') {
      return (
        <ImportPage
          setCSVString={this.setCSVString}
          selectedBank={selectedBank}
          setBank={this.setBank}
        />
      );
    }
    if (key === 'CATEGORIZATION') {
      return <CategorizationPage />;
    }
    if (key === 'VISUALIZATION') {
      return <VisualizationPage csvString={csvString} bank={selectedBank} />;
    }
    return <LandingPage />;
  };

  render() {
    const { activePage } = this.state;

    return (
      <div className="app">
        {this.showPage(activePage)}
        <BottomNavigation onChange={this.changePage} />
      </div>
    );
  }
}

export default App;
