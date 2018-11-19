import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';

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

  return <Chart options={options} series={series} height={800} type="bar" />;
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
