import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Category from './Category';

const Container = styled.div`
  width: 100%;
  overflow-y: auto;
  white-space: nowrap;
`;

const CategoryList = ({ data }) => {
  const categories = data.map(category => (
    <Category key={category.title} title={category.title} parties={category.parties} />
  ));

  return <Container>{categories}</Container>;
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
