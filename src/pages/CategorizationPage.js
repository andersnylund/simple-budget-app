import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Categorizer from '../components/Categorizer';

const Container = styled.div`
  display: flex;
  padding: 3rem;
  flex-direction: column;
  text-align: center;
`;

const CategorizationPage = ({ initialTransactions }) => (
  <Container>
    <Typography variant="h2">Categorization</Typography>
    {!initialTransactions ? (
      <Typography variant="h4">Select a file and bank on import page</Typography>
    ) : (
      <Categorizer />
    )}
  </Container>
);

CategorizationPage.propTypes = {
  initialTransactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CategorizationPage;
