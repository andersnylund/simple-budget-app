import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  h2 {
    margin: 30px;
  }
`;

const InfoPage = () => (
  <Container>
    <Typography variant="h2">Info</Typography>
  </Container>
);

export default InfoPage;
