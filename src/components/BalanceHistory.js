import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import Typography from '@material-ui/core/Typography';

const BalanceHistory = ({ data }) => {
  let result = [];

  data.reduce((previous, current) => {
    const value = previous - parseInt(current.amount, 10);
    result = result.concat(value);
    return value;
  }, 0);

  const options = {
    markers: {
      style: 'inverted',
      size: 1
    }
  };

  const series = [
    {
      name: 'Balance',
      data: result
    }
  ];

  return (
    <div>
      <Typography variant="h4">Balance history</Typography>
      <Chart options={options} series={series} width={800} height={800} type="line" />
    </div>
  );
};

BalanceHistory.propTypes = {
  data: PropTypes.arrayOf({}).isRequired
};

export default BalanceHistory;
