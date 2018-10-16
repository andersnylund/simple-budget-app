import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { parse } from '../utils';
import Bank from '../Bank';

const StyledInput = styled.input`
  display: none;
`;

const handleChange = async (e, setInitialTransactions, selectedBank) => {
  const file = e.target.files[0];
  const csvString = await new Response(file).text();
  const parsed = parse(csvString, selectedBank);
  setInitialTransactions(parsed);
};

const CSVFileReader = ({ setInitialTransactions, selectedBank, ...rest }) => (
  <div {...rest}>
    <label htmlFor="contained-button-file">
      <StyledInput
        accept=".csv"
        id="contained-button-file"
        multiple={false}
        type="file"
        onChange={e => handleChange(e, setInitialTransactions, selectedBank)}
      />
      <Button variant="contained" component="span">
        Upload
      </Button>
    </label>
  </div>
);

CSVFileReader.propTypes = {
  setInitialTransactions: PropTypes.func.isRequired,
  selectedBank: PropTypes.objectOf(Bank).isRequired
};

export default CSVFileReader;
