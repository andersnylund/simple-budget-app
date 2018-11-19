import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, string, object, number } from 'prop-types';
import Chart from 'react-apexcharts';
import Paper from '@material-ui/core/Paper';
import { getMonthsFromTransactions } from '../utils';

const SpendingByMonth = ({ spendingByMonth, transactions }) => {
  const months = getMonthsFromTransactions(transactions);
  let series = [];

  spendingByMonth.forEach(category => {
    const spending = category.spendingByMonth;

    let data = [];

    months.forEach(month => {
      if (spending[month]) {
        data = [...data].concat(Math.abs(spending[month]));
      } else {
        data = [...data].concat(0);
      }
    });

    series = [...series].concat({ name: category.title, data });
  });

  const options = {
    chart: {
      stacked: true
    },
    dataLabels: {
      formatter: val => (val !== 0 ? val : '')
    },
    xaxis: {
      type: 'month',
      categories: [...months]
    }
  };

  console.log('series', series);

  return (
    <Paper>
      <Chart options={options} series={series} type="bar" />
    </Paper>
  );
};

SpendingByMonth.propTypes = {
  spendingByMonth: arrayOf(
    shape({
      title: string.isRequired,
      spendingByMonth: object.isRequired
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
  spendingByMonth: state.amountReducer.spendingByMonth,
  transactions: state.appReducer.transactions
});

export default connect(mapStateToProps)(SpendingByMonth);
