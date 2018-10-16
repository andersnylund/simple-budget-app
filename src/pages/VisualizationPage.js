import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import BalanceHistory from '../components/BalanceHistory';
import PartyGrouping from '../components/PartyGrouping';

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60rem;
  margin: 3rem auto;
`;

const Visualization = ({ initialTransactions }) => (
  <Container>
    <Typography variant="h2">Visualization</Typography>
    <BalanceHistory initialTransactions={initialTransactions} />
    <PartyGrouping initialTransactions={initialTransactions} />
  </Container>
);

Visualization.propTypes = {
  initialTransactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Visualization;
