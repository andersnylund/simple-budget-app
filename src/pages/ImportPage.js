import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import TransactionFileReader from '../components/import/TransactionFileReader';
import PreviousDataReader from '../components/import/PreviousDataReader';
import Selector from '../components/import/BankSelector';
import Reset from '../components/import/Reset';
import Container from '../components/Container';
import PageItem from '../components/import/PageItem';

const StyledPaper = styled(Paper)`
  padding: 1rem;
`;

const ImportPage = () => (
  <Container>
    <StyledPaper>
      <Grid container spacing={40} direction="column">
        <PageItem item={<Selector />} helpText="Select your bank." />
        <PageItem
          item={<TransactionFileReader />}
          helpText="Select a CSV-file that contains you transactions."
        />
        <PageItem
          item={<PreviousDataReader />}
          helpText="Upload your previously exported data from Simple Budgeting."
        />
        <PageItem
          item={<Reset />}
          helpText="Reset the application state. Your unsaved categorizations will be lost."
        />
      </Grid>
    </StyledPaper>
  </Container>
);

export default ImportPage;
