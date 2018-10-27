import React, { Component } from 'react';
import styled from 'styled-components';
import LandingPage from './pages/LandingPage';
import ImportPage from './pages/ImportPage';
import InfoPage from './pages/InfoPage';
import BottomNavigation from './components/BottomNavigation';
import VisualizationPage from './pages/VisualizationPage';
import CategorizationPage from './pages/CategorizationPage';
import ExportPage from './pages/ExportPage';
import { saveStateToLocalStorage, hydrateStateWithLocalStorage } from './utils';
import { INITIAL_CATEGORIES } from './constants';

const initialState = {
  initialTransactions: undefined,
  selectedBank: undefined,
  activePageIndex: 0,
  userState: {
    categories: INITIAL_CATEGORIES.map(c => ({ title: c, parties: [] })),
    uniqueParties: []
  }
};

const Container = styled.div`
  margin-bottom: 5em;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
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

  resetState = () => {
    this.setState({ ...initialState });
  };

  showPage = pageIndex => {
    const { selectedBank, initialTransactions, userState } = this.state;
    let page;

    if (pageIndex === 0) {
      page = <LandingPage />;
    } else if (pageIndex === 1) {
      page = <InfoPage />;
    } else if (pageIndex === 2) {
      page = (
        <ImportPage
          setInitialTransactions={this.setInitialTransactions}
          selectedBank={selectedBank}
          setBank={this.setBank}
          setCategories={this.setCategories}
          setUniqueParties={this.setUniqueParties}
          resetState={this.resetState}
        />
      );
    } else if (pageIndex === 3) {
      page = (
        <CategorizationPage
          userState={userState}
          updateCategories={this.setCategories}
          updateUniqueParties={this.setUniqueParties}
        />
      );
    } else if (pageIndex === 4) {
      page = <VisualizationPage initialTransactions={initialTransactions} />;
    } else {
      page = <LandingPage />;
    }
    if (pageIndex === 5) {
      page = <ExportPage userState={userState} />;
    }

    return <Container>{page}</Container>;
  };

  render() {
    const { activePageIndex } = this.state;

    return (
      <div>
        <div className="app">{this.showPage(activePageIndex)}</div>
        <BottomNavigation onChangePage={this.changePage} activePageIndex={activePageIndex} />
      </div>
    );
  }
}

export default App;
