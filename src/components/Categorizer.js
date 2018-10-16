import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TransactionList from './TransactionList';
import CategoryList from './CategoryList';
import Button from '@material-ui/core/Button';

class Categorizer extends React.Component {
  state = {
    selectedTransactions: [],
    activeCategory: undefined
  };

  updateActiveCategory = newCategory => {
    this.setState({
      activeCategory: newCategory
    });
  };

  updateSelectedTransactions = newSelectedTransactions => {
    this.setState({
      selectedTransactions: [...newSelectedTransactions]
    });
  };

  availableTransactions = (transactionsList, categories) => {
    const transactionsFoundInCategories = [];

    if (categories && categories.length > 0) {
      categories.map(category => {
        if (category.categoryParties) {
          category.categoryParties.forEach(parties => {
            if (!transactionsFoundInCategories.includes(parties)) {
              transactionsFoundInCategories.push(parties);
            }
          });
        }
      });
    }

    const availableTransactions = transactionsList.filter(
      transaction => !transactionsFoundInCategories.includes(transaction)
    );

    return availableTransactions;
  };

  updateState = () => {
    const { updateCategories, currentUserState } = this.props;

    const currentCategories = currentUserState.categories;
    const categoryOlderState = currentCategories.find(
      category => category.categoryTitle === this.state.activeCategory
    );
    const categoriesWithoutActiveCategory = currentCategories.filter(
      category => category.categoryTitle !== this.state.activeCategory
    );

    const newCategory = {
      categoryTitle: this.state.activeCategory,
      categoryParties: [...categoryOlderState.categoryParties, ...this.state.selectedTransactions]
    };

    updateCategories([...categoriesWithoutActiveCategory, newCategory]);

    this.setState({
      selectedTransactions: undefined
    });
  };

  render() {
    const { currentUserState } = this.props;

    const availableTransactions = this.availableTransactions(
      currentUserState.transactions.uniquePartiesList,
      currentUserState.categories
    );
    return (
      <Grid container spacing={24}>
        <Grid item md={6} xs={12}>
          <TransactionList
            data={availableTransactions}
            updateSelectedTransactions={this.updateSelectedTransactions}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CategoryList
            data={currentUserState.categories}
            updateActiveCategory={this.updateActiveCategory}
          />
        </Grid>
        <Button onClick={this.updateState} variant="contained" component="span">
          Update
        </Button>
      </Grid>
    );
  }
}

Categorizer.propTypes = {
  currentUserState: PropTypes.shape({
    transactions: PropTypes.shape({
      uniquePartiesList: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string.isRequired,
          amount: PropTypes.string.isRequired,
          party: PropTypes.string.isRequired
        })
      )
    }),
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        categoryTitle: PropTypes.string,
        categoryParties: PropTypes.arrayOf(
          PropTypes.shape({
            date: PropTypes.string,
            amount: PropTypes.string,
            party: PropTypes.string.isRequired
          })
        )
      })
    )
  }).isRequired,
  updateCategories: PropTypes.func.isRequired
};

export default Categorizer;
