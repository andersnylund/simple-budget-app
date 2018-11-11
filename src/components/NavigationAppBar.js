import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import InfoIcon from '@material-ui/icons/Info';
import InputIcon from '@material-ui/icons/Input';
import CategoryIcon from '@material-ui/icons/Category';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PublishIcon from '@material-ui/icons/Publish';
import { connect } from 'react-redux';
import MobileMenuItem from './MobileMenuItem';
import { setPageIndex } from '../reducers/appReducer';

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

const styles = theme => ({
  active: {
    boxShadow: '0 0 0 0.1rem #ffffff'
  },
  activeMobile: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
});

export const LANDING = 0;
export const INFO = 1;
export const IMPORT = 2;
export const CATEGORIZE = 3;
export const VISUALIZE = 4;
export const EXPORT = 5;

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
    const { classes, onChangePage, activePage } = this.props;
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
          className={activePage === LANDING ? classes.activeMobile : ''}
        />
        <MobileMenuItem
          icon={<InfoIcon />}
          formattedMessageId="navigation.info"
          onClick={() => this.handleMenuClick(INFO)}
          className={activePage === INFO ? classes.activeMobile : ''}
        />
        <MobileMenuItem
          icon={<InputIcon />}
          formattedMessageId="navigation.import"
          onClick={() => this.handleMenuClick(IMPORT)}
          className={activePage === IMPORT ? classes.activeMobile : ''}
        />
        <MobileMenuItem
          icon={<CategoryIcon />}
          formattedMessageId="navigation.categorization"
          onClick={() => this.handleMenuClick(CATEGORIZE)}
          className={activePage === CATEGORIZE ? classes.activeMobile : ''}
        />
        <MobileMenuItem
          icon={<ShowChartIcon />}
          formattedMessageId="navigation.visualization"
          onClick={() => this.handleMenuClick(VISUALIZE)}
          className={activePage === VISUALIZE ? classes.activeMobile : ''}
        />
        <MobileMenuItem
          icon={<PublishIcon />}
          formattedMessageId="navigation.export"
          onClick={() => this.handleMenuClick(EXPORT)}
          className={activePage === EXPORT ? classes.activeMobile : ''}
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
              <Tooltip title={<FormattedMessage id="navigation.start" />}>
                <IconButton
                  color="inherit"
                  onClick={() => onChangePage(LANDING)}
                  className={activePage === LANDING ? classes.active : ''}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={<FormattedMessage id="navigation.info" />}>
                <IconButton
                  color="inherit"
                  onClick={() => onChangePage(INFO)}
                  className={activePage === INFO ? classes.active : ''}
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={<FormattedMessage id="navigation.import" />}>
                <IconButton
                  color="inherit"
                  onClick={() => onChangePage(IMPORT)}
                  className={activePage === IMPORT ? classes.active : ''}
                >
                  <InputIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={<FormattedMessage id="navigation.categorization" />}>
                <IconButton
                  color="inherit"
                  onClick={() => onChangePage(CATEGORIZE)}
                  className={activePage === CATEGORIZE ? classes.active : ''}
                >
                  <CategoryIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={<FormattedMessage id="navigation.visualization" />}>
                <IconButton
                  color="inherit"
                  onClick={() => onChangePage(VISUALIZE)}
                  className={activePage === VISUALIZE ? classes.active : ''}
                >
                  <ShowChartIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={<FormattedMessage id="navigation.export" />}>
                <IconButton
                  color="inherit"
                  onClick={() => onChangePage(EXPORT)}
                  className={activePage === EXPORT ? classes.active : ''}
                >
                  <PublishIcon />
                </IconButton>
              </Tooltip>
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
  classes: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  activePage: state.appReducer.activePageIndex
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {
      onChangePage: setPageIndex
    }
  )(NavigationAppBar)
);
