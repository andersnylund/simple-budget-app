import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Categorizer from '../components/Categorizer';
import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  max-width: 30rem;
  margin: 0 auto;
`;

const CategorizationPage = ({ currentUserState, updateCategories }) => (
  <Container>
    <Grid container>
      <Typography variant="h2">Categorization</Typography>
      {!currentUserState ? (
        <Typography variant="h4">Select a file and bank on import page</Typography>
      ) : (
        <Categorizer currentUserState={currentUserState} updateCategories={updateCategories} />
      )}
    </Grid>
  </Container>
);

CategorizationPage.propTypes = {
  currentUserState: PropTypes.shape({
    transactions: PropTypes.shape({
      uniquePartiesList: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string.isRequired,
          amount: PropTypes.string.isRequired,
          party: PropTypes.string.isRequired
        })
      )
    }),
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        categoryTitle: PropTypes.string,
        categoryParties: PropTypes.arrayOf(
          PropTypes.shape({
            date: PropTypes.string,
            amount: PropTypes.string,
            party: PropTypes.string.isRequired
          })
        )
      })
    )
  }),
  updateCategories: PropTypes.func.isRequired
};

export default CategorizationPage;
