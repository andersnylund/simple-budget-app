import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Paper, Tabs, Tab } from '@material-ui/core';
import BalanceHistory from '../charts/BalanceHistory';
import PartyGrouping from '../charts/PartyGrouping';
import CategoryGrouping from '../charts/CategoryGrouping';
import TransactionHistory from '../charts/TransactionHistory';

const TabContainer = styled(Paper)`
  flex-grow: 1;
  width: 100%;
`;

const TRANSACTION_HISTORY = 0;
const BALANCE_HISTORY = 1;
const PARTY_GROUPING = 2;
const CATEGORY_GROUPING = 3;

class VisualizationPage extends React.Component {
  state = { value: TRANSACTION_HISTORY };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  getChart = () => {
    const { initialTransactions, categories } = this.props;
    const { value } = this.state;
    if (value === TRANSACTION_HISTORY) {
      return <TransactionHistory initialTransactions={initialTransactions} />;
    }
    if (value === BALANCE_HISTORY) {
      return <BalanceHistory initialTransactions={initialTransactions} />;
    }
    if (value === PARTY_GROUPING) {
      return <PartyGrouping initialTransactions={initialTransactions} />;
    }
    if (value === CATEGORY_GROUPING) {
      return <CategoryGrouping initialTransactions={initialTransactions} categories={categories} />;
    }
    return null;
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <TabContainer>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="on"
          >
            <Tab label="Transaction History" />
            <Tab label="Balance History" />
            <Tab label="Parties" />
            <Tab label="Categories" />
          </Tabs>
        </TabContainer>
        <div>{this.getChart()}</div>
      </div>
    );
  }
}

VisualizationPage.propTypes = {
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

export default VisualizationPage;
