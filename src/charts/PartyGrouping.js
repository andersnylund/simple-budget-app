import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import ChartContainer from './ChartContainer';

const PartyGrouping = ({ byParty }) => {
  const array = byParty.map(party => ({
    x: party.title,
    y: party.amount
  }));

  const options = {};
  const series = [
    {
      name: 'Party',
      data: array
    }
  ];

  return (
    <ChartContainer>
      <Chart options={options} series={series} height={800} type="bar" />
    </ChartContainer>
  );
};

PartyGrouping.propTypes = {
  byParty: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  byParty: state.amountReducer.amountByParties
});

export default connect(mapStateToProps)(PartyGrouping);
