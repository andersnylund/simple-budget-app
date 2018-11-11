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
// import CategoriesOverview from '../components/CategoriesOverview';

const Container = styled.div`
  max-width: 30rem;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Section = styled.div`
  padding: 2rem 0;
`;

class CategorizationPage extends React.Component {
  maxSections = 2;

  state = {
    currentSection: 1
  };

  showSection = index => {
    const { transactions } = this.props;

    if (index === 0) {
      // @TODO add transactions list here.
      return '';
    }
    // if (index === 1) {
    //   return <CategoriesOverview />;
    // }

    return !transactions ? (
      <Typography variant="h4">Select a file and bank on import page</Typography>
    ) : (
      <Categorizer />
    );
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
    return (
      <Container>
        <Grid container>
          <Typography variant="h3">Categorization</Typography>
          {transactions.length !== 0 ? (
            <Section>
              <ArrowBackIosIcon onClick={this.navigateBack} />
              <ArrowForwardIosIcon onClick={this.navigateForward} />

              {this.showSection(currentSection)}
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
