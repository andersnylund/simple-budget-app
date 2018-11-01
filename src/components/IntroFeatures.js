import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
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
      marginRight: 'auto'
    }
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardIntroFeatures: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2
  }
});

const IntroFeatures = ({ classes, header, intro, features }) => (
  <React.Fragment>
    <main className={classes.layout}>
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {header}
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" component="p">
          {intro}
        </Typography>
      </div>
      <Grid container spacing={40} alignItems="flex-end">
        {features.map(({id, title, description}) => (
          <Grid item key={id} xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                key="{id}.title"
                title={title}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                className={classes.cardHeader}
              />
              <CardContent>
                <Typography variant="subtitle1" align="center" key="{id}.description">
                  {description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  </React.Fragment>
);

IntroFeatures.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.element.isRequired,
  intro: PropTypes.element.isRequired,
  features: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(IntroFeatures);
