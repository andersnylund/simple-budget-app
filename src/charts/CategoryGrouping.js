import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { amountByCategory } from '../utils';
import ChartContainer from './ChartContainer';

const CategoryGrouping = ({ initialTransactions, categories }) => {
  const byCategory = amountByCategory(initialTransactions, categories);

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
  initialTransactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      parties: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export default CategoryGrouping;
