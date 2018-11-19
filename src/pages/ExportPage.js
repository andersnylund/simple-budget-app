import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

const ExportPage = ({ userState }) => {
  const data = `data:application/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(userState)
  )}`;

  return (
    <div>
      <Grid container spacing={40} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h6">
            Here you can export your categorizations as a file. Then when you come back to Simple
            Budgeting, you can reuse your previous categorizations!
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" download="simple-budgeting.json" href={data}>
            Export
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

ExportPage.propTypes = {
  userState: PropTypes.shape({
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        parties: PropTypes.arrayOf(PropTypes.string)
      })
    ).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  userState: state.userReducer
});

export default connect(mapStateToProps)(ExportPage);
