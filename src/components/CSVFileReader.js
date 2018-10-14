import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { fileToString } from '../util';

const StyledInput = styled.input`
  display: none;
`;

const handleChange = (e, setCSVString) => {
  const file = e.target.files[0];
  fileToString(file, setCSVString);
};

const CSVFileReader = ({ setCSVString, ...rest }) => (
  <div {...rest}>
    <label htmlFor="contained-button-file">
      <StyledInput
        accept=".csv"
        id="contained-button-file"
        multiple={false}
        type="file"
        onChange={e => handleChange(e, setCSVString)}
      />
      <Button variant="contained" component="span">
        Upload
      </Button>
    </label>
  </div>
);

CSVFileReader.propTypes = {
  setCSVString: PropTypes.func.isRequired
};

export default CSVFileReader;
