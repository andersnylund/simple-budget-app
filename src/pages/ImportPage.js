import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TransactionFileReader from '../components/import/TransactionFileReader';
import PreviousDataReader from '../components/categorize/PreviousDataReader';
import Selector from '../components/import/BankSelector';
import Reset from '../components/import/Reset';
import Container from '../components/Container';

const ImportPage = () => (
  <Container>
    <Paper>
      <Grid container spacing={0}>
        <Selector />
        <TransactionFileReader />
        <PreviousDataReader />
        <Reset />
      </Grid>
    </Paper>
  </Container>
);

export default ImportPage;
