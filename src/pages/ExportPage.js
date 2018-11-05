import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Context from '../Context';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .item {
    padding: 3rem;
  }
`;

const ExportPage = () => (
  <Context.Consumer>
    {({ userState }) => {
      const data = `data:application/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(userState)
      )}`;

      return (
        <Container>
          <Typography variant="h2" className="item">
            Export
          </Typography>
          <Button variant="contained" download="simple-budgeting.json" href={data}>
            Export
          </Button>
        </Container>
      );
    }}
  </Context.Consumer>
);

export default ExportPage;
