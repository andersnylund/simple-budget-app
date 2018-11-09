import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import _ from 'lodash';

const PartyGrouping = ({ transactions }) => {
  // TODO Extract function to utils
  const result = transactions.reduce((previous, current) => {
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

  return <Chart options={options} series={series} height={800} type="bar" />;
};

PartyGrouping.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired
};

export default PartyGrouping;
