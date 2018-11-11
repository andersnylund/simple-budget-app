import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .item {
    padding: 3rem;
  }
`;

const ExportPage = ({ userState }) => {
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
};

ExportPage.propTypes = {
  userState: PropTypes.shape({
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        parties: PropTypes.arrayOf(PropTypes.string)
      })
    ).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  userState: state.userReducer
});

export default connect(mapStateToProps)(ExportPage);
