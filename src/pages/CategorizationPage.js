import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Categorizer from '../components/Categorizer';
import CategoriesOverview from '../components/CategoriesOverview';

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
    const { userState, addNewCategory, removeCategory, updateCategories } = this.props;

    if (index === 0) {
      // @TODO add transactions list here.
      return '';
    }
    if (index === 1) {
      return (
        <CategoriesOverview
          categories={userState.categories}
          addCategory={addNewCategory}
          removeCategory={removeCategory}
        />
      );
    }
    return !userState ? (
      <Typography variant="h4">Select a file and bank on import page</Typography>
    ) : (
      <Categorizer userState={userState} updateCategories={updateCategories} />
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
    return (
      <Container>
        <Grid container>
          <Typography variant="h3">Categorization</Typography>
          <Section>
            <ArrowBackIosIcon onClick={this.navigateBack} />
            <ArrowForwardIosIcon onClick={this.navigateForward} />

            {this.showSection(currentSection)}
          </Section>
        </Grid>
      </Container>
    );
  }
}

CategorizationPage.propTypes = {
  userState: PropTypes.shape({
    uniqueParties: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        parties: PropTypes.arrayOf(PropTypes.string)
      })
    )
  }).isRequired,
  updateCategories: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired,
  addNewCategory: PropTypes.func.isRequired
};

export default CategorizationPage;
