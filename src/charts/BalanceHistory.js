import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import moment from 'moment';
import ChartContainer from './ChartContainer';

const BalanceHistory = ({ transactions }) => {
  let result = [];

  transactions.reduce((previous, current) => {
    const balance = previous + current.amount;
    result = result.concat({
      x: moment(current.date).format('dddd, MMMM Do YYYY'),
      y: balance
    });
    return balance;
  }, 0);

  const options = {};

  const series = [
    {
      name: 'Balance',
      data: result
    }
  ];

  return (
    <ChartContainer>
      <Chart options={options} series={series} height={800} type="line" />
    </ChartContainer>
  );
};

BalanceHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired
};

export default BalanceHistory;
