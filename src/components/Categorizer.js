import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PartyList from './PartyList';
import CategoryList from './CategoryList';

class Categorizer extends React.Component {
  state = {
    selectedParties: [],
    activeCategory: undefined
  };

  updateActiveCategory = newCategory => {
    this.setState({
      activeCategory: newCategory
    });
  };

  updateSelectedParties = newSelectedParties => {
    this.setState({
      selectedParties: [...newSelectedParties]
    });
  };

  unCategorizedParties = (parties, categories) => {
    const categorizedParties = [];

    if (categories && categories.length > 0) {
      categories.forEach(category => {
        category.parties.forEach(p => {
          if (!categorizedParties.includes(p)) {
            categorizedParties.push(p);
          }
        });
      });
    }

    const unCategorizedParties = parties.filter(party => !categorizedParties.includes(party));

    return unCategorizedParties;
  };

  updateState = () => {
    const { updateCategories, userState } = this.props;
    const { activeCategory, selectedParties } = this.state;

    const currentCategories = userState.categories;
    const categoryOlderState = currentCategories.find(
      category => category.title === activeCategory
    );
    const categoriesWithoutActiveCategory = currentCategories.filter(
      category => category.title !== activeCategory
    );

    const newCategory = {
      title: activeCategory,
      parties: [...categoryOlderState.parties, ...selectedParties]
    };

    updateCategories([...categoriesWithoutActiveCategory, newCategory]);

    this.setState({
      selectedParties: []
    });
  };

  render() {
    const { userState } = this.props;

    const availableParties = this.unCategorizedParties(
      userState.uniqueParties,
      userState.categories
    );
    return (
      <Grid container spacing={24}>
        <Grid item md={6} xs={12}>
          <PartyList
            parties={availableParties}
            updateSelectedParties={this.updateSelectedParties}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CategoryList
            data={userState.categories}
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
  userState: PropTypes.shape({
    uniqueParties: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        parties: PropTypes.arrayOf(PropTypes.string)
      })
    )
  }).isRequired,
  updateCategories: PropTypes.func.isRequired
};

export default Categorizer;
