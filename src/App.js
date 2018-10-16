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
      initialTransactions: undefined,
      selectedBank: undefined,
      activePageIndex: 0,
      userState: undefined
    };
  }

  componentDidMount() {
    hydrateStateWithLocalStorage(this);
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener('beforeunload', () => saveStateToLocalStorage(this));
    const userStateNotDefined = !this.state.userState;
    if (userStateNotDefined) {
      // @TODO Check if this should be moved this to constants file.
      const INITIAL_CATEGORIES = ['Housing', 'Food', 'Others', 'Entertainment', 'Monthly-bill'];
      this.setInitialUserState(INITIAL_CATEGORIES);
    }
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
    const uniquePartiesList = this.filterTransactionList(transactions);
    this.updateUniquePartiesList(uniquePartiesList);
  };

  /**
   * @desc filterTransactionList removes duplicate transactions from transactions list.
   * @param initialTransactionsList
   * @return list of unique transactions based on the party
   */
  filterTransactionList = initialTransactionsList => {
    const uniqueTransactionList = [];

    const addedTransactionParties = [];

    initialTransactionsList.map(transaction => {
      if (!addedTransactionParties.includes(transaction.party)) {
        uniqueTransactionList.push(transaction);
        addedTransactionParties.push(transaction.party);
      }
    });

    return uniqueTransactionList;
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

  updateCategories = categoriesUpdate => {
    this.setState({
      userState: {
        ...this.state.userState,
        categories: [...categoriesUpdate]
      }
    });
  };

  updateUniquePartiesList = newPartiesList => {
    this.setState({
      userState: {
        ...this.state.userState,
        transactions: {
          uniquePartiesList: [...newPartiesList]
        }
      }
    });
  };

  setInitialUserState = initialCategoryList => {
    const categoryList = [];

    initialCategoryList.map(categoryTitle =>
      categoryList.push({
        categoryTitle,
        categoryParties: []
      })
    );

    this.setState({
      userState: {
        transactions: {
          uniquePartiesList: []
        },
        categories: categoryList
      }
    });
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
          currentUserState={userState}
          updateCategories={this.updateCategories}
          updateUniquePartiesList={this.updateUniquePartiesList}
        />
      );
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
