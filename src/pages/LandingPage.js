import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  text-align: center;
  h2 {
    margin: 3rem;
  }
`;

const LandingPage = () => (
  <Container>
    <Typography variant="h2">Simple Budgeting</Typography>
    <Typography variant="body2">Welcome to Simple Budgeting</Typography>
  </Container>
);

export default LandingPage;
