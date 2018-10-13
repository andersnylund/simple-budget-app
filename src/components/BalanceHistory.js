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
import styled from 'styled-components';

const StyledXYPlot = styled(XYPlot)`
  margin: 50px;
`;

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
      <StyledXYPlot width={800} height={800}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <LineSeries data={result} />
        <XAxis />
        <YAxis />
      </StyledXYPlot>
    </div>
  );
};

BalanceHistory.propTypes = {
  data: PropTypes.arrayOf({}).isRequired
};

export default BalanceHistory;
