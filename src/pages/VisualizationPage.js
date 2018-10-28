import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import BalanceHistory from '../charts/BalanceHistory';
import PartyGrouping from '../charts/PartyGrouping';
import CategoryGrouping from '../charts/CategoryGrouping';

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60rem;
  margin: 3rem auto;
`;

const Visualization = ({ initialTransactions, categories }) => (
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
);

Visualization.propTypes = {
  initialTransactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      parties: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export default Visualization;
