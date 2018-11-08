import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LandingPage from './pages/LandingPage';
import ImportPage from './pages/ImportPage';
import InfoPage from './pages/InfoPage';
import VisualizationPage from './pages/VisualizationPage';
import CategorizationPage from './pages/CategorizationPage';
import ExportPage from './pages/ExportPage';
import NavigationAppBar from './components/NavigationAppBar';

class App extends Component {
  showPage = pageIndex => {
    if (pageIndex === 0) {
      return <LandingPage />;
    }
    if (pageIndex === 1) {
      return <InfoPage />;
    }
    if (pageIndex === 2) {
      return <ImportPage />;
    }
    if (pageIndex === 3) {
      return <CategorizationPage />;
    }
    if (pageIndex === 4) {
      return <VisualizationPage />;
    }
    if (pageIndex === 5) {
      return <ExportPage />;
    }
    return <LandingPage />;
  };

  render() {
    const { activePageIndex } = this.props;
    return (
      <div>
        <NavigationAppBar />
        <div>{this.showPage(activePageIndex)}</div>
      </div>
    );
  }
}

App.propTypes = {
  activePageIndex: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  activePageIndex: state.appReducer.activePageIndex
});

export default connect(mapStateToProps)(App);
