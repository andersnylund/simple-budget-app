import React from 'react';
import PropTypes from 'prop-types';
import FileDrop from './FileDrop';
import { fileToString } from '../util';

const handleChange = (e, setCSVString) => {
  const file = e.target.files[0];
  fileToString(file, setCSVString);
};

const CSVFileReader = ({ setCSVString }) => (
  <div>
    <FileDrop setCSVFile={setCSVString} />
    <input type="file" accept=".csv" onChange={e => handleChange(e, setCSVString)} />
  </div>
);

CSVFileReader.propTypes = {
  setCSVString: PropTypes.func.isRequired
};

export default CSVFileReader;
