import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Div = styled.div`
  margin: 6rem auto;
  width: 60rem;
`;

const ChartContainer = ({ children }) => <Div>{children}</Div>;

ChartContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default ChartContainer;
