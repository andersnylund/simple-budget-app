import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

const PartyGrouping = ({ byParty }) => {
  const array = byParty.map(party => ({
    x: party.title,
    y: party.amount
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
