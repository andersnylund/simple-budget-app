import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import TransactionFileReader from '../components/TransactionFileReader';
import PreviousDataReader from '../components/PreviousDataReader';
import Selector from '../components/BankSelector';
import Context from '../Context';
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
  <Context.Consumer>
    {({
      selectedBank,
      setBank,
      setInitialTransactions,
      setCategories,
      setUniqueParties,
      resetState
    }) => (
      <Container>
        <Typography variant="h2" className="item">
          <FormattedMessage id="navigation.import" />
        </Typography>
        <Selector className="item" />
        <TransactionFileReader className="item" />
        <PreviousDataReader className="item" />
        <Reset className="item" />
      </Container>
    )}
  </Context.Consumer>
);

export default ImportPage;
