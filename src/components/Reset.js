import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetUserState } from '../reducers/userReducer';
import { resetAppState } from '../reducers/appReducer';
import { resetAmountState } from '../reducers/amountReducer';

const handleClick = (resetApp, resetUser, resetAmount) => {
  resetApp();
  resetUser();
  resetAmount();
};

const Reset = ({ resetApp, resetUser, ...rest }) => (
  <div {...rest}>
    <Button onClick={() => handleClick(resetApp, resetUser)}>Reset all</Button>
  </div>
);

Reset.propTypes = {
  resetApp: PropTypes.func.isRequired,
  resetUser: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    resetApp: resetAppState,
    resetUser: resetUserState,
    resetAmount: resetAmountState
  }
)(Reset);
