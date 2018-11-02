import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import InfoIcon from '@material-ui/icons/Info';
import InputIcon from '@material-ui/icons/Input';
import CategoryIcon from '@material-ui/icons/Category';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PublishIcon from '@material-ui/icons/Publish';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
`;

const Grow = styled.div`
  flex-grow: 1;
`;

const SectionDesktop = styled.div`
  display: none;
  /* @TODO define what width mobile is */
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

const Title = styled.div`
  display: none;
  @media (min-width: 37.5rem) {
    display: block;
  }
`;

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
        <MenuItem onClick={() => this.handleMenuClick(0)}>
          <IconButton color="inherit">
            <ArrowForwardIcon />
          </IconButton>
          <p>{<FormattedMessage id="navigation.start" />}</p>
        </MenuItem>
        <MenuItem onClick={() => this.handleMenuClick(1)}>
          <IconButton color="inherit">
            <InfoIcon />
          </IconButton>
          <p>{<FormattedMessage id="navigation.info" />}</p>
        </MenuItem>
        <MenuItem onClick={() => this.handleMenuClick(2)}>
          <IconButton color="inherit">
            <InputIcon />
          </IconButton>
          <p>{<FormattedMessage id="navigation.import" />}</p>
        </MenuItem>
        <MenuItem onClick={() => this.handleMenuClick(3)}>
          <IconButton color="inherit">
            <CategoryIcon />
          </IconButton>
          <p>{<FormattedMessage id="navigation.categorization" />}</p>
        </MenuItem>
        <MenuItem onClick={() => this.handleMenuClick(4)}>
          <IconButton color="inherit">
            <ShowChartIcon />
          </IconButton>
          <p>{<FormattedMessage id="navigation.visualization" />}</p>
        </MenuItem>
        <MenuItem onClick={() => this.handleMenuClick(5)}>
          <IconButton color="inherit">
            <PublishIcon />
          </IconButton>
          <p>{<FormattedMessage id="navigation.export" />}</p>
        </MenuItem>
      </Menu>
    );

    return (
      <Root>
        <AppBar position="static">
          <Toolbar>
            <Title>
              <Typography variant="h6" color="inherit" noWrap>
                Simple Budgeting
              </Typography>
            </Title>
            <Grow />
            <SectionDesktop>
              <IconButton color="inherit" onClick={() => onChangePage(0)}>
                <ArrowForwardIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => onChangePage(1)}>
                <InfoIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => onChangePage(2)}>
                <InputIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => onChangePage(3)}>
                <CategoryIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => onChangePage(4)}>
                <ShowChartIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => onChangePage(5)}>
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
