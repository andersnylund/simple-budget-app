import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PartyList from './PartyList';
import CategoryList from './CategoryList';
import { addPartyToCategory, removePartyFromCategory } from '../reducers/userReducer';

class Categorizer extends React.Component {
  state = {
    selectedParties: [],
    activeCategory: 'Housing' // @TODO Add this dynamically.
  };

  setActiveCategory = newCategory => {
    this.setState({
      activeCategory: newCategory
    });
  };

  setSelectedParties = newSelectedParties => {
    this.setState({
      selectedParties: [...newSelectedParties]
    });
  };

  unCategorizedParties = () => {
    const { categories, transactions } = this.props;

    const categorizedParties = [];

    if (categories && categories.length > 0) {
      categories.forEach(category => {
        if (category.parties) {
          category.parties.forEach(p => {
            if (!categorizedParties.includes(p)) {
              categorizedParties.push(p);
            }
          });
        }
      });
    }

    const uniqueParties = [...new Set(transactions.map(t => t.party))];
    const unCategorizedParties = uniqueParties.filter(party => !categorizedParties.includes(party));

    return unCategorizedParties;
  };

  removeCategorizedParty = (party, category) => {
    const { removeParty } = this.props;
    removeParty(party, category);
  };

  updateState = () => {
    const { addParty } = this.props;
    const { activeCategory, selectedParties } = this.state;

    selectedParties.forEach(p => {
      addParty(p, activeCategory);
    });

    this.setState({
      selectedParties: []
    });
  };

  render() {
    const { categories } = this.props;
    const { selectedParties, activeCategory } = this.state;

    const availableParties = this.unCategorizedParties();

    return (
      <Grid container spacing={24}>
        <Grid item md={6} xs={12}>
          <PartyList
            parties={availableParties}
            selectedParties={selectedParties}
            updateSelectedParties={this.setSelectedParties}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CategoryList
            activeCategory={activeCategory}
            data={categories}
            updateActiveCategory={this.setActiveCategory}
            removeCategorizedParty={this.removeCategorizedParty}
          />
        </Grid>
        <Button onClick={this.updateState} variant="contained" component="span">
          Update
        </Button>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.userReducer.categories,
  transactions: state.appReducer.transactions
});

Categorizer.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      parties: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired,
  addParty: PropTypes.func.isRequired,
  removeParty: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  {
    addParty: addPartyToCategory,
    removeParty: removePartyFromCategory
  }
)(Categorizer);
