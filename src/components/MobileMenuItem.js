import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, IconButton } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const MobileMenuItem = ({ icon, formattedMessageId, onClick, ...other }) => (
  <MenuItem onClick={onClick} {...other}>
    <IconButton color="inherit">{icon}</IconButton>
    <p>{<FormattedMessage id={formattedMessageId} {...other} />}</p>
  </MenuItem>
);

MobileMenuItem.propTypes = {
  icon: PropTypes.element.isRequired,
  formattedMessageId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default MobileMenuItem;
