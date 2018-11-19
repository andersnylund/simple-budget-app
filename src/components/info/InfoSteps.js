import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Slide from '@material-ui/core/Slide';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import styled from 'styled-components';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Root = styled.div`
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;
`;

const StyledStepper = styled(Stepper)`
  overflow: auto;
`;

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
    const { steps } = this.props;
    const { activeStep } = this.state;

    return (
      <Root>
        <StyledStepper alternativeLabel nonLinear activeStep={activeStep}>
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
            >
              <ArrowBackIosIcon />
            </IconButton>

            <IconButton size="small" variant="contained" color="primary" onClick={this.handleNext}>
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        </StyledStepper>

        <AutoPlaySwipeableViews axis="x" index={activeStep}>
          {steps.map((step, index) => (
            <Slide key={step.id} in timeout={{ enter: 500 }}>
              <div>{Math.abs(activeStep - index) <= 2 ? step.content : null}</div>
            </Slide>
          ))}
        </AutoPlaySwipeableViews>
      </Root>
    );
  }
}

InfoSteps.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.element.isRequired,
      content: PropTypes.element.isRequired
    })
  ).isRequired
};

export default InfoSteps;
