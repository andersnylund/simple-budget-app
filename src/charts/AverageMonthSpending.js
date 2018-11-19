import React from 'react';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { arrayOf, shape, string, number } from 'prop-types';
import { getMonthsFromTransactions } from '../utils';

const AverageMonthSpending = ({ spendingByCategories, transactions }) => {
  const numOfMonths = getMonthsFromTransactions(transactions).size;

  const series = spendingByCategories.map(s => ({
    name: s.title,
    data: [Math.abs(s.spending) / numOfMonths]
  }));

  const options = {
    chart: {
      stacked: true
    },
    dataLabels: {
      formatter: val => (val !== 0 ? val : '')
    },
    xaxis: {
      categories: ['Average']
    }
  };

  return (
    <Paper>
      <Chart series={series} options={options} type="bar" />
    </Paper>
  );
};

AverageMonthSpending.propTypes = {
  spendingByCategories: arrayOf(
    shape({
      title: string.isRequired,
      spending: number.isRequired
    })
  ).isRequired,
  transactions: arrayOf(
    shape({
      date: string.isRequired,
      amount: number.isRequired,
      party: string.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  spendingByCategories: state.amountReducer.spendingByCategories,
  transactions: state.appReducer.transactions
});

export default connect(mapStateToProps)(AverageMonthSpending);
