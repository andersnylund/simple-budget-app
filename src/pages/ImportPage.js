import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import TransactionFileReader from '../components/TransactionFileReader';
import PreviousDataReader from '../components/PreviousDataReader';
import Selector from '../components/BankSelector';
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

const ImportPage = () => (
  <Container>
    <Typography variant="h2" className="item">
      Import
    </Typography>
    <Selector className="item" />
    <TransactionFileReader className="item" />
    <PreviousDataReader className="item" />
    <Reset className="item" />
  </Container>
);

export default ImportPage;
