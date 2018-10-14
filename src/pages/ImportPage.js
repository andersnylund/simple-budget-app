import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CSVFileReader from '../components/CSVFileReader';
import BankSelector from '../components/BankSelector';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ImportPage = ({ setCSVString, selectedBank, setBank }) => (
  <Container>
    <CSVFileReader setCSVString={setCSVString} />
    <BankSelector selectedBank={selectedBank} setBank={setBank} />
  </Container>
);

ImportPage.propTypes = {
  setCSVString: PropTypes.func.isRequired,
  selectedBank: PropTypes.objectOf({}).isRequired,
  setBank: PropTypes.func.isRequired
};

export default ImportPage;
