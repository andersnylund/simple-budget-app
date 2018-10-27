import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const Reset = ({ resetState, ...rest }) => (
  <div {...rest}>
    <Button onClick={() => resetState()}>Reset all</Button>
  </div>
);

Reset.propTypes = {
  resetState: PropTypes.func.isRequired
};

export default Reset;
