import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import InfoIcon from '@material-ui/icons/Info';
import InputIcon from '@material-ui/icons/Input';
import CategoryIcon from '@material-ui/icons/Category';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PublishIcon from '@material-ui/icons/Publish';
import styled from 'styled-components';
import MobileMenuItem from './MobileMenuItem';

const Root = styled.div`
  width: 100%;
`;

const Grow = styled.div`
  flex-grow: 1;
`;

const SectionDesktop = styled.div`
  display: none;
  /* @TODO find out how to utilize breakpoints https://material-ui.com/layout/breakpoints/#breakpoints */
  @media (min-width: 60rem) {
    display: flex;
  }
`;

const SectionMobile = styled.div`
  display: flex;
  @media (min-width: 60rem) {
    display: none;
  }
`;

const LANDING = 0;
const INFO = 1;
const IMPORT = 2;
const CATEGORIZE = 3;
const VISUALIZE = 4;
const EXPORT = 5;

class NavigationAppBar extends React.Component {
  state = {
    mobileMoreAnchorEl: null
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMenuClick = pageIndex => {
    const { onChangePage } = this.props;
    this.handleMobileMenuClose();
    onChangePage(pageIndex);
  };

  render() {
    const { mobileMoreAnchorEl } = this.state;
    const { onChangePage } = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MobileMenuItem
          icon={<ArrowForwardIcon />}
          formattedMessageId="navigation.start"
          onClick={() => this.handleMenuClick(LANDING)}
        />
        <MobileMenuItem
          icon={<InfoIcon />}
          formattedMessageId="navigation.info"
          onClick={() => this.handleMenuClick(INFO)}
        />
        <MobileMenuItem
          icon={<InputIcon />}
          formattedMessageId="navigation.import"
          onClick={() => this.handleMenuClick(IMPORT)}
        />
        <MobileMenuItem
          icon={<CategoryIcon />}
          formattedMessageId="navigation.categorization"
          onClick={() => this.handleMenuClick(CATEGORIZE)}
        />
        <MobileMenuItem
          icon={<ShowChartIcon />}
          formattedMessageId="navigation.visualization"
          onClick={() => this.handleMenuClick(VISUALIZE)}
        />
        <MobileMenuItem
          icon={<PublishIcon />}
          formattedMessageId="navigation.export"
          onClick={() => this.handleMenuClick(EXPORT)}
        />
      </Menu>
    );

    return (
      <Root>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Simple Budgeting
            </Typography>
            <Grow />
            <SectionDesktop>
              {/* TODO add highlight for selected page */}
              {/* TODO add tooltip for each menu item */}
              <IconButton color="inherit" onClick={() => onChangePage(LANDING)}>
                <ArrowForwardIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => onChangePage(INFO)}>
                <InfoIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => onChangePage(IMPORT)}>
                <InputIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => onChangePage(CATEGORIZE)}>
                <CategoryIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => onChangePage(VISUALIZE)}>
                <ShowChartIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => onChangePage(EXPORT)}>
                <PublishIcon />
              </IconButton>
            </SectionDesktop>
            <SectionMobile>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </SectionMobile>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Root>
    );
  }
}

NavigationAppBar.propTypes = {
  onChangePage: PropTypes.func.isRequired
};

export default NavigationAppBar;
