import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowForward from '@material-ui/icons/ArrowForward';
import InfoIcon from '@material-ui/icons/Info';
import InputIcon from '@material-ui/icons/Input';
import CategoryIcon from '@material-ui/icons/Category';
import ShowChartIcon from '@material-ui/icons/ShowChart';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { onChange } = this.props;

    return (
      <Container>
        <BottomNavigation value={value} onChange={this.handleChange} showLabels>
          <BottomNavigationAction
            label="Start"
            icon={<ArrowForward />}
            onClick={() => onChange('LANDING')}
          />
          <BottomNavigationAction
            label="Info"
            icon={<InfoIcon />}
            onClick={() => {
              onChange('INFO');
            }}
          />
          <BottomNavigationAction
            label="Import"
            icon={<InputIcon />}
            onClick={() => {
              onChange('IMPORT');
            }}
          />
          <BottomNavigationAction
            label="Categorization"
            icon={<CategoryIcon />}
            onClick={() => {
              onChange('CATEGORIZATION');
            }}
          />
          <BottomNavigationAction
            label="Visualization"
            icon={<ShowChartIcon />}
            onClick={() => {
              onChange('VISUALIZATION');
            }}
          />
        </BottomNavigation>
      </Container>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default SimpleBottomNavigation;
