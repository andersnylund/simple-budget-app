import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';

class PartyList extends React.Component {
  state = {};

  handleChange = name => event => {
    const { parties, updateSelectedParties } = this.props;

    this.setState({ [name]: event.target.checked }, () => {
      const selectedParties = parties.filter(party => this.state[party]);
      updateSelectedParties(selectedParties);
    });
  };

  render() {
    const { parties } = this.props;

    const partyList = parties.map(party => (
      <FormControlLabel
        key={party}
        control={
          <Checkbox
            onChange={this.handleChange(party)}
            name={party}
            value={party}
            checked={this.state[party] === true}
          />
        }
        label={party}
      />
    ));

    return (
      <FormControl component="fieldset">
        <FormGroup>{partyList}</FormGroup>
      </FormControl>
    );
  }
}

PartyList.propTypes = {
  parties: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateSelectedParties: PropTypes.func.isRequired
};

export default PartyList;
