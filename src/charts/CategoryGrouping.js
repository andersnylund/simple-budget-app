import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { amountByCategory } from '../utils';

const CategoryGrouping = ({ transactions, categories }) => {
  const byCategory = amountByCategory(transactions, categories);

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

  return <Chart options={options} series={series} height={800} type="bar" />;
};

CategoryGrouping.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
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
