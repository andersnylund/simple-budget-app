import React from 'react';
import PropTypes from 'prop-types';

const SelectedParty = ({ party }) => <div>{party}</div>;

SelectedParty.propTypes = {
  party: PropTypes.string.isRequired
};

export default SelectedParty;
