import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { FormattedMessage } from 'react-intl';
import Categorizer from '../components/Categorizer';
import CategoriesOverview from '../components/CategoriesOverview';
import TransactionsOverview from '../components/TransactionsOverview';

const Container = styled.div`
  max-width: 30rem;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Section = styled.div`
  padding: 2rem 0;
  width: 100%;
`;

const SectionNavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 2rem 0;
`;

class CategorizationPage extends React.Component {
  maxSections = 2;

  sectionTitleMapper = {
    0: 'Transactions',
    1: 'Categories',
    2: 'Grouping'
  };

  state = {
    currentSection: 0
  };

  showSection = (index, uniqueParties) => {
    if (index === 0) {
      return <TransactionsOverview parties={uniqueParties} />;
    }

    if (index === 1) {
      return <CategoriesOverview />;
    }

    return <Categorizer parties={uniqueParties} />;
  };

  navigateBack = () => {
    const { currentSection } = this.state;
    if (currentSection > 0) {
      this.setState(prevState => ({
        currentSection: prevState.currentSection - 1
      }));
    }
  };

  navigateForward = () => {
    const { currentSection } = this.state;
    if (currentSection < this.maxSections) {
      this.setState(prevState => ({
        currentSection: prevState.currentSection + 1
      }));
    }
  };

  render() {
    const { currentSection } = this.state;
    const { transactions } = this.props;
    const uniqueParties = [...new Set(transactions.map(t => t.party))];

    return (
      <Container>
        <Grid container>
          <Typography variant="h3" gutterBottom>
            Categorization
          </Typography>
          {transactions.length !== 0 ? (
            <Section>
              <SectionNavigationContainer>
                <ArrowBackIosIcon onClick={this.navigateBack} />
                <Typography variant="h4">{this.sectionTitleMapper[currentSection]}</Typography>
                <ArrowForwardIosIcon onClick={this.navigateForward} />
              </SectionNavigationContainer>
              {this.showSection(currentSection, uniqueParties)}
            </Section>
          ) : (
            <Typography variant="h4">
              <FormattedMessage id="error.transactionsEmpty" />
            </Typography>
          )}
        </Grid>
      </Container>
    );
  }
}

CategorizationPage.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  transactions: state.appReducer.transactions
});

export default connect(mapStateToProps)(CategorizationPage);
