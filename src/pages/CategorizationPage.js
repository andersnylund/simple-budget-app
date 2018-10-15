import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Categorizer from '../components/Categorizer';
import Bank from '../Bank';

const Container = styled.div`
  display: flex;
  padding: 3rem;
  flex-direction: column;
  text-align: center;
`;

const Categorization = ({ csvString, bank }) => (
  <Container>
    <Typography variant="h2">Categorization</Typography>
    {!csvString || !bank ? (
      <Typography variant="h4">Select a file and bank on import page</Typography>
    ) : (
      <Categorizer />
    )}
  </Container>
);

Categorization.propTypes = {
  csvString: PropTypes.string.isRequired,
  bank: PropTypes.objectOf(Bank).isRequired
};

export default Categorization;
