import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Categorizer from '../components/Categorizer';

const Container = styled.div`
  max-width: 30rem;
  margin: 0 auto;
`;

const CategorizationPage = ({ userState, updateCategories }) => (
  <Container>
    <Grid container>
      <Typography variant="h2">Categorization</Typography>
      {!userState ? (
        <Typography variant="h4">Select a file and bank on import page</Typography>
      ) : (
        <Categorizer userState={userState} updateCategories={updateCategories} />
      )}
    </Grid>
  </Container>
);

CategorizationPage.defaultProps = {
  userState: undefined
};

CategorizationPage.propTypes = {
  userState: PropTypes.shape({
    uniqueParties: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        parties: PropTypes.arrayOf(PropTypes.string)
      })
    )
  }),
  updateCategories: PropTypes.func.isRequired
};

export default CategorizationPage;
