import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';

const PartyList = ({ parties, selectedParties, updateSelectedParties }) => {
  const handleChange = name => event => {
    if (name && event.target.checked) {
      const newSelectedParties = [...selectedParties, name];
      updateSelectedParties(newSelectedParties);
    }
  };

  const checkbox = party => (
    <Checkbox
      onChange={handleChange(party)}
      name={party}
      value={party}
      checked={selectedParties.includes(party)}
    />
  );

  const partyList = parties.map(party => (
    <FormControlLabel control={checkbox(party)} label={party} />
  ));

  return (
    <FormControl component="fieldset">
      <FormGroup>{partyList}</FormGroup>
    </FormControl>
  );
};

PartyList.propTypes = {
  parties: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedParties: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateSelectedParties: PropTypes.func.isRequired
};

export default PartyList;
