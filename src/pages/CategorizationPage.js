import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Categorizer from '../components/Categorizer';
import Context from '../Context';

const Container = styled.div`
  max-width: 30rem;
  margin: 0 auto;
`;

const CategorizationPage = () => (
  <Context.Consumer>
    {({ userState }) => (
      <Container>
        <Grid container>
          <Typography variant="h2">Categorization</Typography>
          {!userState ? (
            <Typography variant="h4">Select a file and bank on import page</Typography>
          ) : (
            <Categorizer />
          )}
        </Grid>
      </Container>
    )}
  </Context.Consumer>
);

export default CategorizationPage;
