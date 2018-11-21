import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, string, object } from 'prop-types';
import Chart from 'react-apexcharts';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  max-width: 100%;
  padding: 2rem;
`;

const getInputStyle = () => ({
  margin: '1rem'
});

class ModifiableBudget extends React.Component {
  state = { avgSpending: {} };

  componentDidMount() {
    this.initChartData();
  }

  handleChange = name => event => {
    const { avgSpending } = this.state;

    this.setState({
      avgSpending: {
        ...avgSpending,
        [name]: +event.target.value
      }
    });
  };

  handleClick = () => {
    this.updateChartData();
  };

  initChartData() {
    const { spendingByMonth } = this.props;
    const avgSpendingPerCategory = new Set();

    spendingByMonth.forEach(category => {
      const spending = Object.keys(category.spendingByMonth);
      let totalSpending = 0;

      spending.forEach(month => {
        const monthSpending = category.spendingByMonth[month];
        totalSpending += monthSpending;
      });

      const monthsCount = spending.length;
      const avgSpending = Math.abs(totalSpending / monthsCount);

      if (!Number.isNaN(avgSpending)) {
        avgSpendingPerCategory.add({
          title: category.title,
          avgSpending
        });
      }
    });

    const avgSpending = {};
    avgSpendingPerCategory.forEach(category => {
      avgSpending[category.title] = Math.floor(category.avgSpending);
    });
    this.setState({ avgSpending });
  }

  render() {
    const { avgSpending } = this.state;
    const categories = Object.keys(avgSpending);

    const series = [];

    const options = {
      labels: []
    };

    categories.forEach(categoryTitle => {
      options.labels.push(categoryTitle);
      series.push(avgSpending[categoryTitle]);
    });

    const budgetInputs = categories.map(inputName => (
      <TextField
        id={`budget-modifier-${inputName}`}
        key={`budget-modifier-${inputName}`}
        name={inputName}
        label={inputName}
        value={avgSpending[inputName]}
        style={getInputStyle()}
        onChange={this.handleChange(inputName)}
      />
    ));

    return (
      <Paper>
        <Chart series={series} options={options} type="pie" />
        <InputContainer>{budgetInputs}</InputContainer>
      </Paper>
    );
  }
}

ModifiableBudget.propTypes = {
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

export default connect(mapStateToProps)(ModifiableBudget);
