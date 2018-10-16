import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Chart from 'react-apexcharts';
import _ from 'lodash';

const PartyGrouping = ({ initialTransactions }) => {
  // TODO make immutable!
  const result = initialTransactions.reduce((previous, current) => {
    if (_.has(previous, current.party)) {
      previous[current.party] = previous[current.party] + parseInt(current.amount);
    } else {
      previous[current.party] = parseInt(current.amount, 10);
    }
    return previous;
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
      <Typography variant="h4">Grouped by party</Typography>
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
