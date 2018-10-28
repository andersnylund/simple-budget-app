import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';

import Category from './Category';

class CategoryList extends React.Component {
  state = {
    checkedCategory: 'Housing' // @TODO Add this dynamically.
  };

  componentDidMount() {
    const { updateActiveCategory } = this.props;
    const { checkedCategory } = this.state;

    updateActiveCategory(checkedCategory);
  }

  setCheckedCategory = event => {
    const { updateActiveCategory } = this.props;
    const newTitle = event.target.name;
    this.setState({
      checkedCategory: newTitle
    });
    updateActiveCategory(newTitle);
  };

  render() {
    const { data } = this.props;

    const categories = data
      ? data.map(category => (
        <Category
            key={category.title}
            title={category.title}
            parties={category.parties}
            checked={this.state.checkedCategory === category.title}
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
      title: PropTypes.string,
      parties: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  updateActiveCategory: PropTypes.func.isRequired
};

export default CategoryList;
