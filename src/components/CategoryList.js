import React from 'react';
import PropTypes from 'prop-types';

import Category from './Category';

const CategoryList = ({ data }) => {
  const categories = data.map(category => (
    <Category key={category.title} title={category.title} parties={category.parties} />
  ));

  return <div>{categories}</div>;
};

CategoryList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      parties: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export default CategoryList;
