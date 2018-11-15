import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  stepContent: {
    width: '70%',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  button: {
    marginRight: theme.spacing.unit
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  completed: {
    display: 'inline-block'
  },
  instructions: {
    width: '100%',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  contentRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class InfoSteps extends React.Component {
  state = {
    activeStep: 0,
    completed: new Set(),
    skipped: new Set()
  };

  getSteps = () => {
    const { steps } = this.props;
    return steps;
  };

  getStep = step => this.getSteps()[step];

  getStepContent = step => this.getStep(step).content;

  getStepLabel = step => this.getStep(step).label;

  totalSteps = () => this.getSteps().length;

  handleNext = () => {
    const { activeStep, completed } = this.state;
    let newStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      const steps = this.getSteps();
      newStep = steps.findIndex((step, i) => !completed.has(i));
    } else {
      newStep = activeStep + 1;
    }

    this.setState({
      activeStep: newStep
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step
    });
  };

  skippedSteps() {
    const { skipped } = this.state;
    return skipped.size;
  }

  isStepSkipped(step) {
    const { skipped } = this.state;
    return skipped.has(step);
  }

  isStepComplete(step) {
    const { completed } = this.state;

    return completed.has(step);
  }

  completedSteps() {
    const { completed } = this.state;

    return completed;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  isLastStep() {
    const { activeStep } = this.state;

    return activeStep === this.totalSteps() - 1;
  }

  render() {
    const { classes, steps } = this.props;
    const { activeStep } = this.state;

    return (
      <div>
        <div className={classes.root}>
          <Stepper alternativeLabel nonLinear activeStep={activeStep}>
            {steps.map((step, index) => {
              const props = {};
              const buttonProps = {};
              if (this.isStepSkipped(index)) {
                props.completed = false;
              }
              return (
                <Step key={step.id} {...props}>
                  <StepButton
                    onClick={this.handleStep(index)}
                    completed={this.isStepComplete(index)}
                    {...buttonProps}
                  >
                    {step.label}
                  </StepButton>
                </Step>
              );
            })}

            <div>
              <IconButton
                size="small"
                color="primary"
                disabled={activeStep === 0}
                onClick={this.handleBack}
                className={classes.button}
              >
                <ArrowBackIosIcon />
              </IconButton>

              <IconButton
                size="small"
                variant="contained"
                color="primary"
                onClick={this.handleNext}
                className={classes.button}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          </Stepper>
        </div>

        <div className={classes.instructions}>
          <AutoPlaySwipeableViews axis="x" index={activeStep}>
            {steps.map((step, index) => (
              <div className={classes.stepContent} key={step.id}>
                {Math.abs(activeStep - index) <= 2 ? step.content : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
        </div>
      </div>
    );
  }
}

InfoSteps.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.element.isRequired,
      content: PropTypes.element.isRequired
    })
  ).isRequired
};

export default withStyles(styles)(InfoSteps);
