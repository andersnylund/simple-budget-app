import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { parse, significantParties } from '../utils';
import Bank from '../Bank';
import { setTransactions } from '../reducers/appReducer';
import { setSignificantParties } from '../reducers/amountReducer';

const StyledInput = styled.input`
  display: none;
`;

StyledInput.displayName = 'StyledInput';

const handleChange = async (e, setInitialTransactions, selectedBank, setParties) => {
  const file = e.target.files[0];
  const csvString = await new Response(file).text();
  const transactions = parse(csvString, selectedBank);
  setInitialTransactions(transactions);
  const byParty = significantParties(transactions);
  setParties(byParty);
};

export const TransactionFileReader = ({
  setInitialTransactions,
  selectedBank,
  setParties,
  ...rest
}) => (
  <div {...rest}>
    <label htmlFor="transactions-input">
      <StyledInput
        accept=".csv"
        id="transactions-input"
        multiple={false}
        type="file"
        onChange={e => handleChange(e, setInitialTransactions, selectedBank, setParties)}
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
  setParties: PropTypes.func.isRequired,
  setInitialTransactions: PropTypes.func.isRequired,
  selectedBank: PropTypes.objectOf(Bank).isRequired
};

export default connect(
  mapStateToProps,
  { setInitialTransactions: setTransactions, setParties: setSignificantParties }
)(TransactionFileReader);
