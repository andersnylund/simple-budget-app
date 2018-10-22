import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardIntroFeatures: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  }
});

class IntroFeatures extends Component{
  render() {
    const { classes } = this.props;
    return (    
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            {this.props.header}
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" component="p">
            {this.props.intro}
            </Typography>
          </div>
          <Grid container spacing={40} alignItems="flex-end">
            {this.props.features.map(tier => (
              <Grid item key={tier.title} xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" align="center" key={tier.description}>
                      {tier.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
      </React.Fragment>
    );
}
}

IntroFeatures.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntroFeatures);