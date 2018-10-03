import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fileToString } from '../helpers';

const StyledDiv = styled.div`
  border: 5px solid lightblue;
  width: 200px;
  height: 100px;
`;

const handleDrop = (e, setCSVFile) => {
  e.preventDefault();
  fileToString(e.dataTransfer.files[0], setCSVFile);
};

const handleDragOver = e => {
  e.preventDefault();
};

const FileDrop = ({ setCSVFile }) => (
  <StyledDiv onDrop={e => handleDrop(e, setCSVFile)} onDragOver={handleDragOver} />
);

FileDrop.propTypes = {
  setCSVFile: PropTypes.func.isRequired
};

export default FileDrop;
