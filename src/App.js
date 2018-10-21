import React, { Component } from 'react';
import LandingPage from './pages/LandingPage';
import ImportPage from './pages/ImportPage';
import InfoPage from './pages/InfoPage';
import BottomNavigation from './components/BottomNavigation';
import VisualizationPage from './pages/VisualizationPage';
import CategorizationPage from './pages/CategorizationPage';
import ExportPage from './pages/ExportPage';
import { saveStateToLocalStorage, hydrateStateWithLocalStorage } from './utils';
import { INITIAL_CATEGORIES } from './constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialTransactions: undefined,
      selectedBank: undefined,
      activePageIndex: 0,
      userState: {
        categories: INITIAL_CATEGORIES.map(c => ({ title: c, parties: [] })),
        uniqueParties: []
      }
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

    const uniqueParties = new Set(transactions.map(t => t.party));
    this.setUniqueParties(uniqueParties);
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

  setCategories = newCategories => {
    this.setState(prevState => ({
      userState: {
        ...prevState.userState,
        categories: [...newCategories]
      }
    }));
  };

  setUniqueParties = newParties => {
    this.setState(prevState => ({
      userState: {
        ...prevState.userState,
        uniqueParties: [...newParties]
      }
    }));
  };

  showPage = pageIndex => {
    const { selectedBank, initialTransactions, userState } = this.state;

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
      return (
        <CategorizationPage
          userState={userState}
          updateCategories={this.setCategories}
          updateUniqueParties={this.setUniqueParties}
        />
      );
    }
    if (pageIndex === 4) {
      return <VisualizationPage initialTransactions={initialTransactions} />;
    }
    if (pageIndex === 5) {
      return <ExportPage userState={userState} />;
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
