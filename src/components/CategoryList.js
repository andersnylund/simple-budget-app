import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';

import Category from './Category';

class CategoryList extends React.Component {
  state = {
    checkedCategory: 'Housing' // @TODO Add this dynamically.
  };

  setCheckedCategory = event => {
    const { updateActiveCategory } = this.props;
    const newCategoryTitle = event.target.name;
    this.setState(
      {
        checkedCategory: newCategoryTitle
      },
      () => {
        updateActiveCategory(this.state.checkedCategory);
      }
    );
  };

  componentDidMount() {
    const { updateActiveCategory } = this.props;

    updateActiveCategory(this.state.checkedCategory);
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { data } = this.props;

    const categories = data
      ? data.map((category, index) => (
          <Category
            data={category}
            checked={this.state.checkedCategory === category.categoryTitle}
            onSelect={this.setCheckedCategory}
          />
        ))
      : undefined;
    return (
      <FormControl component="fieldset">
        <FormGroup>{categories}</FormGroup>
      </FormControl>
    );
  }
}

CategoryList.propTypes = {
  data: PropTypes.arrayOf(
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
  ).isRequired,
  updateActiveCategory: PropTypes.func.isRequired
};

export default CategoryList;
