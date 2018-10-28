import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Chart from 'react-apexcharts';
import _ from 'lodash';

const PartyGrouping = ({ initialTransactions }) => {
  // TODO Extract function to utils
  const result = initialTransactions.reduce((previous, current) => {
    const returnValue = _.cloneDeep(previous);

    if (_.has(previous, current.party)) {
      returnValue[current.party] += current.amount;
    } else {
      returnValue[current.party] = current.amount;
    }
    return returnValue;
  }, {});

  let array = [];

  Object.keys(result).forEach(key => {
    array = array.concat({ x: key, y: result[key] });
  });

  array = array.sort((a, b) => a.y < b.y);

  const options = {};
  const series = [
    {
      name: 'Party',
      data: array
    }
  ];

  return (
    <div>
      <Typography variant="h4">Parties</Typography>
      <Chart options={options} series={series} height={800} type="bar" />
    </div>
  );
};

PartyGrouping.propTypes = {
  initialTransactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired
};

export default PartyGrouping;
