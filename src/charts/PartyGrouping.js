import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

const PartyGrouping = ({ significantParties }) => {
  const array = significantParties.map(party => ({
    x: party.title,
    y: party.sum
  }));

  const options = {};
  const series = [
    {
      name: 'Amount',
      data: array
    }
  ];

  return (
    <Paper>
      <Chart options={options} series={series} height={800} type="bar" />
    </Paper>
  );
};

PartyGrouping.propTypes = {
  significantParties: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      sum: PropTypes.number.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  significantParties: state.amountReducer.significantParties
});

export default connect(mapStateToProps)(PartyGrouping);
