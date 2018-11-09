import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChartContainer from './ChartContainer';

const CategoryGrouping = ({ byCategory }) => {
  const array = byCategory.map(category => ({
    x: category.title,
    y: category.amount
  }));

  const options = {};
  const series = [
    {
      name: 'Category',
      data: array
    }
  ];

  return (
    <ChartContainer>
      <Chart options={options} series={series} height={800} type="bar" />
    </ChartContainer>
  );
};

CategoryGrouping.propTypes = {
  byCategory: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  byCategory: state.amountReducer.amountByCategories
});

export default connect(mapStateToProps)(CategoryGrouping);
