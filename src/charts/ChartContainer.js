import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Div = styled.div`
  margin: 3rem auto;
  max-width: 60rem;
  width: 100%;
`;

const ChartContainer = ({ children }) => <Div>{children}</Div>;

ChartContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default ChartContainer;
