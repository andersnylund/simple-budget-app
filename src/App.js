import React, { Component } from 'react';
import LandingPage from './pages/LandingPage';
import ImportPage from './pages/ImportPage';
import InfoPage from './pages/InfoPage';
import BottomNavigation from './components/BottomNavigation';
import VisualizationPage from './pages/VisualizationPage';
import CategorizationPage from './pages/CategorizationPage';
import { saveStateToLocalStorage, hydrateStateWithLocalStorage } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialTransactions: null,
      selectedBank: null,
      activePageIndex: 0
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

  setInitialTransactions = transactions => {
    this.setState({
      initialTransactions: transactions
    });
  };

  setBank = bank => {
    this.setState({
      selectedBank: bank
    });
  };

  changePage = pageIndex => {
    this.setState({
      activePageIndex: pageIndex
    });
  };

  showPage = pageIndex => {
    const { selectedBank, initialTransactions } = this.state;

    if (pageIndex === 0) {
      return <LandingPage />;
    }
    if (pageIndex === 1) {
      return <InfoPage />;
    }
    if (pageIndex === 2) {
      return (
        <ImportPage
          setInitialTransactions={this.setInitialTransactions}
          selectedBank={selectedBank}
          setBank={this.setBank}
        />
      );
    }
    if (pageIndex === 3) {
      return <CategorizationPage initialTransactions={initialTransactions} />;
    }
    if (pageIndex === 4) {
      return <VisualizationPage initialTransactions={initialTransactions} />;
    }
    return <LandingPage />;
  };

  render() {
    const { activePageIndex } = this.state;

    return (
      <div className="app">
        {this.showPage(activePageIndex)}
        <BottomNavigation onChangePage={this.changePage} activePageIndex={activePageIndex} />
      </div>
    );
  }
}

export default App;
