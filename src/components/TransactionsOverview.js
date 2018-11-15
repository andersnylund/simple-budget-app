import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  padding: 2rem 0;
`;

const Party = styled.div`
  padding: 0.5rem 0;
  width: 100%;
  text-align: center;
`;

const TransactionsOverview = ({ parties }) => {
  const partiesList = parties.map(party => <Party key={party}>{party}</Party>);

  return (
    <Container>
      <Typography variant="body2" gutterBottom>
        After analyzing all your transactions, these are all the unique parties we managed to find!
      </Typography>
      <Typography variant="body2" gutterBottom>
        A party refers to a vendor/company that has charged you money.
      </Typography>
      {partiesList}
    </Container>
  );
};

TransactionsOverview.propTypes = {
  parties: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TransactionsOverview;
