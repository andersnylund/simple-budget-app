import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  text-align: center;
`;

const Categorization = () => (
  <Container>
    <Typography variant="h2">Categorization</Typography>
  </Container>
);

export default Categorization;
