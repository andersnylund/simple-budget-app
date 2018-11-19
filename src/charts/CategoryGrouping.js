import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

const CategoryGrouping = ({ byCategory }) => {
  const array = byCategory.map(category => ({
    x: category.title,
    y: category.sum
  }));

  const options = {};
  const series = [
    {
      name: 'Category',
      data: array
    }
  ];

  return (
    <Paper>
      <Chart options={options} series={series} height={800} type="bar" />
    </Paper>
  );
};

CategoryGrouping.propTypes = {
  byCategory: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      sum: PropTypes.number.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  byCategory: state.amountReducer.sumByCategories
});

export default connect(mapStateToProps)(CategoryGrouping);
