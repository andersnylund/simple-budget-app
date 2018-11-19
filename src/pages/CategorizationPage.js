import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { FormattedMessage } from 'react-intl';
import Categorizer from '../components/categorize/Categorizer';
import CategoriesOverview from '../components/categorize/CategoriesOverview';
import TransactionsOverview from '../components/categorize/TransactionsOverview';

const Section = styled.div`
  width: 100%;
`;

const SectionNavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

// @TODO replace the styles object with a styled component.
// for reference check: https://www.styled-components.com/docs/basics#adapting-based-on-props
const getIconStyle = isHidden => ({
  visibility: isHidden ? 'hidden' : 'visible'
});

export class CategorizationPage extends React.Component {
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
      <div>
        <Grid container>
          {transactions.length !== 0 ? (
            <Section>
              <SectionNavigationContainer>
                <ArrowBackIosIcon
                  onClick={this.navigateBack}
                  style={getIconStyle(currentSection === 0)}
                />
                <Typography variant="h4">{this.sectionTitleMapper[currentSection]}</Typography>
                <ArrowForwardIosIcon
                  onClick={this.navigateForward}
                  style={getIconStyle(currentSection === this.maxSections)}
                />
              </SectionNavigationContainer>
              {this.showSection(currentSection, uniqueParties)}
            </Section>
          ) : (
            <Typography variant="h4">
              <FormattedMessage id="error.transactionsEmpty" />
            </Typography>
          )}
        </Grid>
      </div>
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
