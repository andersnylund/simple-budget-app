import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  setNewCategory = newCategortyTitle => {
    const newCategory = {
      title: newCategortyTitle,
      parties: []
    };
    this.setState(prevState => ({
      userState: {
        ...prevState.userState,
        categories: [...prevState.userState.categories, newCategory]
      }
    }));
  };

  removeCategory = categoryTitle => {
    const { userState } = this.state;
    const categoryToBeRemoved = userState.categories.find(
      category => category.title === categoryTitle
    );
    const filteredCategoriesList = userState.categories.filter(
      category => category.title !== categoryTitle
    );
    this.setState(prevState => ({
      userState: {
        ...prevState.userState,
        uniqueParties: [...prevState.userState.uniqueParties, ...categoryToBeRemoved.parties],
        categories: [...filteredCategoriesList]
      }
    }));
  };

  resetState = () => {
    this.setState({ ...initialState });
  };

  showPage = pageIndex => {
    const { selectedBank, initialTransactions, userState } = this.state;
    const { categories } = userState;
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
          removeCategory={this.removeCategory}
          addNewCategory={this.setNewCategory}
        />
      );
    } else if (pageIndex === 4) {
      page = (
        <VisualizationPage initialTransactions={initialTransactions} categories={categories} />
      );
    } else if (pageIndex === 5) {
      page = <ExportPage userState={userState} />;
    }

    return page;
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
