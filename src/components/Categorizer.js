import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import moment from 'moment';
import { categories } from '../Category';

const Categorizer = ({ data, onCategory }) => {
  const list = categories.map(category => (
    <li key={category.name}>
      <Chip color="primary" icon={category.icon} label={category.name} />
    </li>
  ));

  return (
    <div>
      <ul>{list}</ul>
    </div>
  );
};

Categorizer.propTypes = {
  data: PropTypes.arrayOf({
    date: PropTypes.instanceOf(moment),
    party: PropTypes.string,
    amount: PropTypes.number
  }).isRequired,
  onCategory: PropTypes.func.isRequired
};

export default Categorizer;
