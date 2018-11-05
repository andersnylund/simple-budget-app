import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import BalanceHistory from '../charts/BalanceHistory';
import PartyGrouping from '../charts/PartyGrouping';
import CategoryGrouping from '../charts/CategoryGrouping';
import Context from '../Context';

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60rem;
  margin: 3rem auto;
`;

const Visualization = () => (
  <Context.Consumer>
    {({ initialTransactions, categories }) => (
      <Container>
        <Typography variant="h2">Visualization</Typography>
        {!initialTransactions ? (
          <Typography variant="h4">Select a file and bank on import page</Typography>
        ) : (
          <div>
            <BalanceHistory initialTransactions={initialTransactions} />
            <PartyGrouping initialTransactions={initialTransactions} />
            <CategoryGrouping initialTransactions={initialTransactions} categories={categories} />
          </div>
        )}
      </Container>
    )}
  </Context.Consumer>
);

export default Visualization;
