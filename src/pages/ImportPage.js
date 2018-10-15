import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import CSVFileReader from '../components/CSVFileReader';
import Selector from '../components/BankSelector';
import Bank from '../Bank';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .item {
    padding: 3rem;
  }
`;

const ImportPage = ({ setInitialTransactions, selectedBank, setBank }) => (
  <Container>
    <Typography variant="h2" className="item">
      Import
    </Typography>
    <CSVFileReader
      setInitialTransactions={setInitialTransactions}
      selectedBank={selectedBank}
      className="item"
    />
    <Selector selectedBank={selectedBank} setBank={setBank} className="item" />
  </Container>
);

ImportPage.propTypes = {
  setInitialTransactions: PropTypes.func.isRequired,
  selectedBank: PropTypes.objectOf(Bank).isRequired,
  setBank: PropTypes.func.isRequired
};

export default ImportPage;
