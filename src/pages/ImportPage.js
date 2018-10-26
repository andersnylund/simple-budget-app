import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import TransactionFileReader from '../components/TransactionFileReader';
import PreviousDataReader from '../components/PreviousDataReader';
import Selector from '../components/BankSelector';
import Bank from '../Bank';
import Reset from '../components/Reset';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .item {
    padding: 3rem;
  }
`;

const ImportPage = ({
  setInitialTransactions,
  selectedBank,
  setBank,
  setCategories,
  setUniqueParties,
  resetState
}) => (
  <Container>
    <Typography variant="h2" className="item">
      Import
    </Typography>
    <Selector selectedBank={selectedBank} setBank={setBank} className="item" />
    <TransactionFileReader
      setInitialTransactions={setInitialTransactions}
      selectedBank={selectedBank}
      className="item"
    />
    <PreviousDataReader
      setCategories={setCategories}
      setUniqueParties={setUniqueParties}
      className="item"
    />
    <Reset resetState={resetState} className="item" />
  </Container>
);

ImportPage.propTypes = {
  setInitialTransactions: PropTypes.func.isRequired,
  selectedBank: PropTypes.objectOf(Bank).isRequired,
  setBank: PropTypes.func.isRequired,
  setUniqueParties: PropTypes.func.isRequired,
  setCategories: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired
};

export default ImportPage;
