import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { parse, amountByEachParty } from '../utils';
import Bank from '../Bank';
import { setTransactions } from '../reducers/appReducer';
import { setAmountByParties } from '../reducers/amountReducer';

const StyledInput = styled.input`
  display: none;
`;

StyledInput.displayName = 'StyledInput';

const handleChange = async (e, setInitialTransactions, selectedBank, setAmount) => {
  const file = e.target.files[0];
  const csvString = await new Response(file).text();
  const transactions = parse(csvString, selectedBank);
  setInitialTransactions(transactions);
  const byParty = amountByEachParty(transactions);
  setAmount(byParty);
};

export const TransactionFileReader = ({
  setInitialTransactions,
  selectedBank,
  setAmount,
  ...rest
}) => (
  <div {...rest}>
    <label htmlFor="transactions-input">
      <StyledInput
        accept=".csv"
        id="transactions-input"
        multiple={false}
        type="file"
        onChange={e => handleChange(e, setInitialTransactions, selectedBank, setAmount)}
      />
      <Button variant="contained" component="span">
        Upload transactions
      </Button>
    </label>
  </div>
);

const mapStateToProps = state => ({
  selectedBank: state.appReducer.bank
});

TransactionFileReader.propTypes = {
  setAmount: PropTypes.func.isRequired,
  setInitialTransactions: PropTypes.func.isRequired,
  selectedBank: PropTypes.objectOf(Bank).isRequired
};

export default connect(
  mapStateToProps,
  { setInitialTransactions: setTransactions, setAmount: setAmountByParties }
)(TransactionFileReader);
