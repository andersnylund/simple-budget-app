import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Categorizer from '../components/Categorizer';
import CategoriesOverview from '../components/CategoriesOverview';

const Container = styled.div`
  max-width: 30rem;
  margin: 0 auto;
`;

const CategorizationPage = ({ userState, updateCategories, removeCategory, addNewCategory }) => (
  <Container>
    <Grid container>
      <Typography variant="h2">Categorization</Typography>
      {/* <Typography variant="subtitle1">Good job with adding your transactions</Typography>
      <Typography variant="body2">Here are all the unique parties we have found!</Typography> */}

      <CategoriesOverview
        categories={userState.categories}
        addCategory={addNewCategory}
        removeCategory={removeCategory}
      />

      {!userState ? (
        <Typography variant="h4">Select a file and bank on import page</Typography>
      ) : (
        <Categorizer userState={userState} updateCategories={updateCategories} />
      )}
    </Grid>
  </Container>
);

CategorizationPage.propTypes = {
  userState: PropTypes.shape({
    uniqueParties: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        parties: PropTypes.arrayOf(PropTypes.string)
      })
    )
  }).isRequired,
  updateCategories: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired,
  addNewCategory: PropTypes.func.isRequired
};

export default CategorizationPage;
