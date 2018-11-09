import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetUserState } from '../../reducers/userReducer';
import { resetAppState } from '../../reducers/appReducer';
import { resetAmountState } from '../../reducers/amountReducer';

const handleClick = (resetApp, resetUser, resetAmount) => {
  resetApp();
  resetUser();
  resetAmount();
};

export const Reset = ({ resetApp, resetUser, resetAmount, ...rest }) => (
  <div {...rest}>
    <Button
      onClick={() => handleClick(resetApp, resetUser, resetAmount)}
      color="secondary"
      variant="contained"
    >
      Reset all
    </Button>
  </div>
);

Reset.propTypes = {
  resetApp: PropTypes.func.isRequired,
  resetUser: PropTypes.func.isRequired,
  resetAmount: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    resetApp: resetAppState,
    resetUser: resetUserState,
    resetAmount: resetAmountState
  }
)(Reset);
