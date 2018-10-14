import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import BalanceHistory from '../components/BalanceHistory';
import { parse } from '../utils';

const Container = styled.div`
  margin: 30px;
  text-align: center;
`;

const Visualization = ({ csvString, bank }) => {
  const data = parse(csvString, bank);

  return (
    <Container>
      <Typography variant="h2">Visualization</Typography>
      <BalanceHistory data={data} />
    </Container>
  );
};

Visualization.propTypes = {
  csvString: PropTypes.string.isRequired,
  bank: PropTypes.objectOf({}).isRequired
};

export default Visualization;
