import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { Paper } from '@material-ui/core';

const BalanceHistory = ({ transactions }) => {
  let result = [];

  transactions.reduce((previous, current) => {
    const balance = previous + current.amount;
    result = result.concat({
      x: moment(current.date),
      y: balance
    });
    return balance;
  }, 0);

  const options = {
    xaxis: {
      type: 'datetime',
      labels: { show: false }
    },
    chart: {
      zoom: {
        enabled: true,
        type: 'x',
        zoomedArea: {
          fill: {
            color: '#90CAF9',
            opacity: 0.4
          },
          stroke: {
            color: '#0D47A1',
            opacity: 0.4,
            width: 1
          }
        }
      }
    }
  };

  const series = [
    {
      name: 'Balance',
      data: result
    }
  ];

  return (
    <Paper>
      <Chart options={options} series={series} height={800} type="line" />
    </Paper>
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
