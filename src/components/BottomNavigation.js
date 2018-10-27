import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowForward from '@material-ui/icons/ArrowForward';
import InfoIcon from '@material-ui/icons/Info';
import InputIcon from '@material-ui/icons/Input';
import CategoryIcon from '@material-ui/icons/Category';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PublishIcon from '@material-ui/icons/Publish';
import { FormattedMessage } from 'react-intl';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

class FooterNavigation extends React.Component {
  handleChange = (event, value) => {
    const { onChangePage } = this.props;
    onChangePage(value);
  };

  render() {
    const { activePageIndex } = this.props;

    return (
      <Container>
        <BottomNavigation value={activePageIndex} onChange={this.handleChange} showLabels>
          <BottomNavigationAction
            label={<FormattedMessage id="navigation.Start" />}
            icon={<ArrowForward />}
          />
          <BottomNavigationAction
            label={<FormattedMessage id="navigation.Info" />}
            icon={<InfoIcon />}
          />
          <BottomNavigationAction
            label={<FormattedMessage id="navigation.Import" />}
            icon={<InputIcon />}
          />
          <BottomNavigationAction
            label={<FormattedMessage id="navigation.Categorization" />}
            icon={<CategoryIcon />}
          />
          <BottomNavigationAction
            label={<FormattedMessage id="navigation.Visualization" />}
            icon={<ShowChartIcon />}
          />
          <BottomNavigationAction
            label={<FormattedMessage id="navigation.Export" />}
            icon={<PublishIcon />}
          />
        </BottomNavigation>
      </Container>
    );
  }
}

FooterNavigation.propTypes = {
  onChangePage: PropTypes.func.isRequired,
  activePageIndex: PropTypes.number.isRequired
};

export default FooterNavigation;
