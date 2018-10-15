import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import BalanceHistory from '../components/BalanceHistory';

const Container = styled.div`
  margin: 3rem;
  text-align: center;
`;

const Visualization = ({ initialTransactions }) => (
  <Container>
    <Typography variant="h2">Visualization</Typography>
    <BalanceHistory initialTransactions={initialTransactions} />
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
