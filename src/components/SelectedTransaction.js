import React from 'react';
import PropTypes from 'prop-types';

const SelectedTransaction = ({ data }) => {
  return <div>{data.party}</div>;
};

SelectedTransaction.propTypes = {
  data: {
    party: PropTypes.string.isRequired
  }.isRequired
};

export default SelectedTransaction;
