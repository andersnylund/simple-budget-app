import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Categorizer from '../components/Categorizer';

const Container = styled.div`
  max-width: 30rem;
  margin: 0 auto;
`;

const CategorizationPage = () => (
  <Container>
    <Grid container>
      <Typography variant="h2">Categorization</Typography>
      <Categorizer />
    </Grid>
  </Container>
);

export default CategorizationPage;
