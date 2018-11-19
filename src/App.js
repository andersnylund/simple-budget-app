import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import LandingPage from './pages/LandingPage';
import ImportPage from './pages/ImportPage';
import InfoPage from './pages/InfoPage';
import VisualizationPage from './pages/VisualizationPage';
import CategorizationPage from './pages/CategorizationPage';
import ExportPage from './pages/ExportPage';
import NavigationAppBar, {
  LANDING,
  INFO,
  IMPORT,
  CATEGORIZE,
  VISUALIZE,
  EXPORT
} from './components/NavigationAppBar';
import { setPageIndex } from './reducers/appReducer';

const Container = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  padding: 2rem;
`;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 14rem;
  padding: 2rem 0;
  margin: 0 auto;
`;

// @TODO replace the styles object with a styled component.
// for reference check: https://www.styled-components.com/docs/basics#adapting-based-on-props
const getNavButtonStyle = isHidden => ({
  visibility: isHidden ? 'hidden' : 'visible'
});

export class App extends Component {
  showPage = pageIndex => {
    if (pageIndex === LANDING) {
      return <LandingPage />;
    }
    if (pageIndex === INFO) {
      return <InfoPage />;
    }
    if (pageIndex === IMPORT) {
      return <ImportPage />;
    }
    if (pageIndex === CATEGORIZE) {
      return <CategorizationPage />;
    }
    if (pageIndex === VISUALIZE) {
      return <VisualizationPage />;
    }
    if (pageIndex === EXPORT) {
      return <ExportPage />;
    }
    return <LandingPage />;
  };

  handleBackClick = () => {
    const { changePageIndex, activePageIndex } = this.props;
    if (activePageIndex > LANDING) {
      changePageIndex(activePageIndex - 1);
    }
  };

  handleForwardClick = () => {
    const { changePageIndex, activePageIndex } = this.props;
    if (activePageIndex < EXPORT) {
      changePageIndex(activePageIndex + 1);
    }
  };

  render() {
    const { activePageIndex } = this.props;
    return (
      <div>
        <NavigationAppBar />
        <Container>
          {this.showPage(activePageIndex)}
          <NavigationContainer>
            <Button
              onClick={this.handleBackClick}
              variant="contained"
              component="span"
              style={getNavButtonStyle(activePageIndex === LANDING)}
            >
              Back
            </Button>
            <Button
              onClick={this.handleForwardClick}
              variant="contained"
              component="span"
              style={getNavButtonStyle(activePageIndex === EXPORT)}
            >
              Next
            </Button>
          </NavigationContainer>
        </Container>
      </div>
    );
  }
}

App.propTypes = {
  activePageIndex: PropTypes.number.isRequired,
  changePageIndex: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activePageIndex: state.appReducer.activePageIndex
});

export default connect(
  mapStateToProps,
  {
    changePageIndex: setPageIndex
  }
)(App);
