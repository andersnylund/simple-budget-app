import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { arrayOf, shape, string, number } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Categorizer from '../components/categorize/Categorizer';

const Container = styled.div`
  max-width: 30rem;
  margin: 0 auto;
`;

export const CategorizationPage = ({ transactions }) => (
  <Container>
    <Grid container>
      <Typography variant="h2">Categorization</Typography>
      {transactions.length !== 0 ? (
        <Categorizer />
      ) : (
        <Typography variant="h4">
          <FormattedMessage id="error.transactionsEmpty" />
        </Typography>
      )}
    </Grid>
  </Container>
);

CategorizationPage.propTypes = {
  transactions: arrayOf(
    shape({
      date: string.isRequired,
      amount: number.isRequired,
      party: string.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  transactions: state.appReducer.transactions
});

export default connect(mapStateToProps)(CategorizationPage);
