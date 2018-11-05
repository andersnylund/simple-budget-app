import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import LandingPage from './pages/LandingPage';
import ImportPage from './pages/ImportPage';
import InfoPage from './pages/InfoPage';
import VisualizationPage from './pages/VisualizationPage';
import CategorizationPage from './pages/CategorizationPage';
import ExportPage from './pages/ExportPage';
import { danske } from './Bank';
import { INITIAL_CATEGORIES } from './constants';
import NavigationAppBar from './components/NavigationAppBar';

const initialState = {
  initialTransactions: [],
  selectedBank: danske,
  activePageIndex: 0,
  userState: {
    categories: INITIAL_CATEGORIES.map(c => ({ title: c, parties: [] })),
    uniqueParties: []
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidMount() {
    const { hydrateStateWithLocalStorage, saveStateToLocalStorage } = this.props;
    hydrateStateWithLocalStorage(this);
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener('beforeunload', () => saveStateToLocalStorage(this));
  }

  componentWillUnmount() {
    const { saveStateToLocalStorage } = this.props;
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
    const { userState, initialTransactions, selectedBank } = this.state;
    const { categories } = userState;
    let page;

    if (pageIndex === 0) {
      page = <LandingPage />;
    } else if (pageIndex === 1) {
      page = <InfoPage />;
    } else if (pageIndex === 2) {
      page = <ImportPage />;
    } else if (pageIndex === 3) {
      page = <CategorizationPage />;
    } else if (pageIndex === 4) {
      page = <VisualizationPage />;
    } else if (pageIndex === 5) {
      page = <ExportPage />;
    }

    const mainContextValue = {
      userState,
      categories,
      initialTransactions,
      selectedBank,
      setInitialTransactions: this.setInitialTransactions,
      setBank: this.setBank,
      setCategories: this.setCategories,
      setUniqueParties: this.setUniqueParties,
      resetState: this.resetState
    };

    return (
      <Context.Provider value={mainContextValue}>
        {page}
      </Context.Provider>
    );
  };

  render() {
    const { activePageIndex } = this.state;

    return (
      <div>
        <NavigationAppBar onChangePage={this.changePage} />
        <div>{this.showPage(activePageIndex)}</div>
      </div>
    );
  }
}

App.propTypes = {
  saveStateToLocalStorage: PropTypes.func.isRequired,
  hydrateStateWithLocalStorage: PropTypes.func.isRequired
};

export default App;
