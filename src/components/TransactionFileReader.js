import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { parse } from '../utils';
import Bank from '../Bank';

const StyledInput = styled.input`
  display: none;
`;

StyledInput.displayName = 'StyledInput';

const handleChange = async (e, setInitialTransactions, selectedBank) => {
  const file = e.target.files[0];
  const csvString = await new Response(file).text();
  const parsed = parse(csvString, selectedBank);
  setInitialTransactions(parsed);
};

const TransactionFileReader = ({ setInitialTransactions, selectedBank, ...rest }) => (
  <div {...rest}>
    <label htmlFor="transactions-input">
      <StyledInput
        accept=".csv"
        id="transactions-input"
        multiple={false}
        type="file"
        onChange={e => handleChange(e, setInitialTransactions, selectedBank)}
      />
      <Button variant="contained" component="span">
        Upload transactions
      </Button>
    </label>
  </div>
);

TransactionFileReader.propTypes = {
  setInitialTransactions: PropTypes.func.isRequired,
  selectedBank: PropTypes.objectOf(Bank).isRequired
};

export default TransactionFileReader;
