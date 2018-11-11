import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { connect } from 'react-redux';
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

export class VisualizationPage extends React.Component {
  state = { activeTab: TRANSACTION_HISTORY };

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  getChart = () => {
    const { transactions, categories } = this.props;
    const { activeTab } = this.state;
    if (activeTab === TRANSACTION_HISTORY) {
      return <TransactionHistory transactions={transactions} />;
    }
    if (activeTab === BALANCE_HISTORY) {
      return <BalanceHistory transactions={transactions} />;
    }
    if (activeTab === PARTY_GROUPING) {
      return <PartyGrouping transactions={transactions} />;
    }
    if (activeTab === CATEGORY_GROUPING) {
      return <CategoryGrouping transactions={transactions} categories={categories} />;
    }
    return null;
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div>
        <TabContainer>
          <Tabs
            value={activeTab}
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

const mapStateToProps = state => ({
  transactions: state.appReducer.transactions,
  categories: state.userReducer.categories
});

export default connect(mapStateToProps)(VisualizationPage);
