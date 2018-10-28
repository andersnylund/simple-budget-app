import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const BalanceHistory = ({ initialTransactions }) => {
  let result = [];

  initialTransactions.reduce((previous, current) => {
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
    <div>
      <Typography variant="h4">Balance history</Typography>
      <Chart options={options} series={series} height={800} type="line" />
    </div>
  );
};

BalanceHistory.propTypes = {
  initialTransactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired
};

export default BalanceHistory;
