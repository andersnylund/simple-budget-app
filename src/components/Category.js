import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import SelectedParty from './SelectedParty';

const Category = ({ title, parties, checked, onSelect }) => {
  const selectedParties = parties.map(party => <SelectedParty party={party} />);

  return (
    <div>
      <FormControlLabel
        onChange={onSelect}
        control={<Radio checked={checked} name={title} value={title} />}
        label={title}
      />
      {selectedParties}
    </div>
  );
};

Category.propTypes = {
  title: PropTypes.string.isRequired,
  parties: PropTypes.arrayOf(PropTypes.string).isRequired,
  checked: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Category;
