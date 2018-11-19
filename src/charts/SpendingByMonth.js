import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, string, object } from 'prop-types';
import Chart from 'react-apexcharts';
import Paper from '@material-ui/core/Paper';

const SpendingByMonth = ({ spendingByMonth }) => {
  const months = new Set();
  let series = [];

  spendingByMonth.forEach(category => {
    const spending = category.spendingByMonth;
    Object.keys(spending).forEach(month => {
      months.add(month);
    });
  });

  spendingByMonth.forEach(category => {
    const spending = category.spendingByMonth;

    let data = [];

    months.forEach(month => {
      if (spending[month]) {
        data = [...data].concat(Math.abs(spending[month]));
      } else {
        data = [...data].concat(0);
      }
    });

    series = [...series].concat({ name: category.title, data });
  });

  const options = {
    chart: {
      stacked: true
    },
    dataLabels: {
      formatter: val => (val !== 0 ? val : '')
    },
    xaxis: {
      type: 'month',
      categories: [...months]
    }
  };

  return (
    <Paper>
      <Chart options={options} series={series} type="bar" />
    </Paper>
  );
};

SpendingByMonth.propTypes = {
  spendingByMonth: arrayOf(
    shape({
      title: string.isRequired,
      spendingByMonth: object.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  spendingByMonth: state.amountReducer.spendingByMonth
});

export default connect(mapStateToProps)(SpendingByMonth);
