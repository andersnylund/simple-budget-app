import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const PageItem = ({ item, helpText }) => (
  <Grid item>
    <Grid container spacing={40}>
      <Grid container alignItems="center" justify="center" item xs>
        <Grid item>{item}</Grid>
      </Grid>
      <Grid item xs>
        {helpText}
      </Grid>
    </Grid>
  </Grid>
);

PageItem.propTypes = {
  item: PropTypes.element.isRequired,
  helpText: PropTypes.string.isRequired
};

export default PageItem;
