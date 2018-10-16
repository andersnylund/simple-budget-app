import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';

class TransactionList extends React.Component {
  state = {};

  handleChange = name => event => {
    const { data, updateSelectedTransactions } = this.props;

    this.setState({ [name]: event.target.checked }, () => {
      const selectedTransactions = data.filter(transaction => this.state[transaction.party]);
      updateSelectedTransactions(selectedTransactions);
    });
  };

  render() {
    const { data } = this.props;

    const transactions = data.map(transaction => (
      <FormControlLabel
        control={
          <Checkbox
            onChange={this.handleChange(transaction.party)}
            name={transaction.party}
            value={transaction.party}
            checked={this.state[transaction.party]}
          />
        }
        label={transaction.party}
      />
    ));

    return (
      <FormControl component="fieldset">
        <FormGroup>{transactions}</FormGroup>
      </FormControl>
    );
  }
}

TransactionList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired,
  updateSelectedTransactions: PropTypes.func.isRequired
};

export default TransactionList;
