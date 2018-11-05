import React from 'react';
import Button from '@material-ui/core/Button';
import Context from '../Context';

const Reset = props => (
  <Context.Consumer>
    {({ resetState }) => (
      <div {...props}>
        <Button onClick={() => resetState()}>Reset all</Button>
      </div>
    )}
  </Context.Consumer>
);

export default Reset;
