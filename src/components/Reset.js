import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetUserState } from '../reducers/userReducer';
import { resetAppState } from '../reducers/appReducer';

const handleClick = (resetApp, resetUser) => {
  resetApp();
  resetUser();
};

const Reset = ({ resetApp, resetUser, ...rest }) => (
  <div {...rest}>
    <Button onClick={() => handleClick(resetApp, resetUser)}>Reset all</Button>
  </div>
);

Reset.propTypes = {
  resetState: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    resetApp: resetAppState,
    resetUser: resetUserState
  }
)(Reset);
