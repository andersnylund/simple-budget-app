import React from 'react';
import PropTypes from 'prop-types';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines
} from 'react-vis';

const BalanceHistory = ({ data }) => {
  let result = [];

  data.reduce(
    (previous, current) => {
      const value = {
        x: current.date,
        y: previous.y - parseInt(current.amount, 10)
      };
      result = result.concat(value);
      return value;
    },
    { y: 0 }
  );

  return (
    <div>
      <XYPlot width={1200} height={1200}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <LineSeries data={result} />
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  );
};

BalanceHistory.propTypes = {
  data: PropTypes.arrayOf({}).isRequired
};

export default BalanceHistory;
