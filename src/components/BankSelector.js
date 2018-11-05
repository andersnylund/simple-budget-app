import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FormattedMessage } from 'react-intl';
import { banks } from '../Bank';
import Context from '../Context';

class BankSelector extends React.Component {
  state = {
    open: false
  };

  handleChange = (e, setBank) => {
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
    return (
      <Context.Consumer>
        {({ selectedBank, setBank }) => {
          const { open } = this.state;
          const value = selectedBank ? selectedBank.name : 'Other';
          const bankArray = banks.map(bank => (
            <MenuItem key={bank.name} value={bank.name}>
              {bank.name}
            </MenuItem>
          ));

          return (
            <form autoComplete="off">
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  <FormattedMessage id="bank" />
                </InputLabel>
                <Select
                  open={open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={value}
                  onChange={e => this.handleChange(e, setBank)}
                  inputProps={{
                    name: 'bank',
                    id: 'demo-controlled-open-select'
                  }}
                >
                  {bankArray}
                </Select>
              </FormControl>
            </form>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default BankSelector;
