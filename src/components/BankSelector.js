import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { banks } from '../Bank';

class ControlledOpenSelect extends React.Component {
  state = {
    open: false
  };

  handleChange = e => {
    const { setBank } = this.props;
    const bank = banks.find(b => b.name === e.target.value);
    setBank(bank);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { selectedBank, ...rest } = this.props;
    const { open } = this.state;

    const value = selectedBank ? selectedBank.name : 'None';

    const bankArray = banks.map(bank => (
      <MenuItem key={bank.name} value={bank.name}>
        {bank.name}
      </MenuItem>
    ));

    return (
      <form autoComplete="off" {...rest}>
        <FormControl>
          <InputLabel htmlFor="demo-controlled-open-select">Bank</InputLabel>
          <Select
            open={open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={value}
            onChange={this.handleChange}
            inputProps={{
              name: 'bank',
              id: 'demo-controlled-open-select'
            }}
          >
            <MenuItem key="None" value="None">
              None
            </MenuItem>
            {bankArray}
          </Select>
        </FormControl>
      </form>
    );
  }
}

ControlledOpenSelect.propTypes = {
  selectedBank: PropTypes.objectOf({}).isRequired,
  setBank: PropTypes.func.isRequired
};

export default ControlledOpenSelect;
