import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
