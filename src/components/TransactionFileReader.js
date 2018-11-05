import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { parse } from '../utils';
import Context from '../Context';

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

const TransactionFileReader = props => (
  <Context.Consumer>
    {({ setInitialTransactions, selectedBank }) => (
      <div {...props}>
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
    )}
  </Context.Consumer>
);

export default TransactionFileReader;
