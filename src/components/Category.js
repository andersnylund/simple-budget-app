import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import SelectedTransaction from './SelectedTransaction';

const Category = ({ data, checked, onSelect }) => {
  const selectedTransactions = data.categoryParties.map(selectedTransaction => (
    <SelectedTransaction data={selectedTransaction} />
  ));

  return (
    <div>
      <FormControlLabel
        onChange={onSelect}
        control={<Radio checked={checked} name={data.categoryTitle} value={data.categoryTitle} />}
        label={data.categoryTitle}
      />
      {selectedTransactions}
    </div>
  );
};

Category.propTypes = {
  data: {
    categoryTitle: PropTypes.string,
    categoryParties: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
        party: PropTypes.string.isRequired
      })
    ).isRequired
  },
  checked: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Category;
