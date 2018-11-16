import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Paper, Tabs, Tab, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import BalanceHistory from '../charts/BalanceHistory';
import PartyGrouping from '../charts/PartyGrouping';
import CategoryGrouping from '../charts/CategoryGrouping';
import TransactionHistory from '../charts/TransactionHistory';
import SpendingByCategory from '../charts/SpendingByCategory';
import Container from '../components/Container';
import SpendingByMonth from '../charts/SpendingByMonth';

const TabContainer = styled(Paper)`
  flex-grow: 1;
  width: 100%;
`;

const TRANSACTION_HISTORY = 0;
const BALANCE_HISTORY = 1;
const PARTY_GROUPING = 2;
const CATEGORY_GROUPING = 3;
const SPENDING_BY_CATEGORY = 4;
const SPENDING_BY_MONTH = 5;

export class VisualizationPage extends React.Component {
  state = { activeTab: TRANSACTION_HISTORY };

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  getChart = () => {
    const { transactions, categories, spending } = this.props;
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
    if (activeTab === SPENDING_BY_CATEGORY) {
      return <SpendingByCategory spendingByCategories={spending} />;
    }
    if (activeTab === SPENDING_BY_MONTH) {
      return <SpendingByMonth />;
    }
    return null;
  };

  render() {
    const { transactions } = this.props;
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
            <Tab label="Spending" />
            <Tab label="Spending by month" />
          </Tabs>
        </TabContainer>
        <Container>
          {transactions.length !== 0 ? (
            <div>{this.getChart()}</div>
          ) : (
            <Typography variant="h4">
              <FormattedMessage id="error.transactionsEmpty" />
            </Typography>
          )}
        </Container>
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
  ).isRequired,
  spending: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      spending: PropTypes.number.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  transactions: state.appReducer.transactions,
  categories: state.userReducer.categories,
  spending: state.amountReducer.spendingByCategories
});

export default connect(mapStateToProps)(VisualizationPage);
