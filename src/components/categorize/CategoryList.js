import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';

import Category from './Category';

const CategoryList = ({ data, activeCategory, updateActiveCategory, removeCategorizedParty }) => {
  const setCheckedCategory = event => {
    const newTitle = event.target.name;
    updateActiveCategory(newTitle);
  };

  const categories = data.map(category => (
    <Category
      key={category.title}
      title={category.title}
      parties={category.parties}
      checked={activeCategory === category.title}
      onSelect={setCheckedCategory}
      onRemoveCategorizedParty={removeCategorizedParty}
    />
  ));

  return (
    <FormControl component="fieldset">
      <FormGroup>{categories}</FormGroup>
    </FormControl>
  );
};

CategoryList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      parties: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  activeCategory: PropTypes.string.isRequired,
  updateActiveCategory: PropTypes.func.isRequired,
  removeCategorizedParty: PropTypes.func.isRequired
};

export default CategoryList;
