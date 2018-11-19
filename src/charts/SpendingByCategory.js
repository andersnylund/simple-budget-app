import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, string, number, shape } from 'prop-types';
import Chart from 'react-apexcharts';
import Paper from '@material-ui/core/Paper';

function SpendingByCategory({ spendingByCategories }) {
  const series = spendingByCategories.map(s => Math.abs(s.spending));
  const options = {
    labels: spendingByCategories.map(s => s.title)
  };

  return (
    <Paper>
      <Chart series={series} options={options} type="pie" />
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    spendingByCategories: state.amountReducer.spendingByCategories
  };
}

SpendingByCategory.propTypes = {
  spendingByCategories: arrayOf(
    shape({
      title: string.isRequired,
      spending: number.isRequired
    })
  ).isRequired
};

export default connect(mapStateToProps)(SpendingByCategory);
