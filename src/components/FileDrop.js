import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 5px solid lightblue;
  width: 200px;
  height: 100px;
`;

const handleDrop = e => {
  e.preventDefault();
  console.log(e.dataTransfer.files[0]);
};

const handleDragOver = e => {
  e.preventDefault();
};

const FileDrop = () => <StyledDiv onDrop={handleDrop} onDragOver={handleDragOver} />;

export default FileDrop;
