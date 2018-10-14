import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import CSVFileReader from '../components/CSVFileReader';
import Selector from '../components/Selector';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  justify-content: space-around;

  .item {
    padding: 30px;
  }
`;

const ImportPage = ({ setCSVString, selectedBank, setBank }) => (
  <Container>
    <Typography variant="h2" className="item">
      Import
    </Typography>
    <CSVFileReader setCSVString={setCSVString} className="item" />
    <Selector selectedBank={selectedBank} setBank={setBank} className="item" />
  </Container>
);

ImportPage.propTypes = {
  setCSVString: PropTypes.func.isRequired,
  selectedBank: PropTypes.objectOf({}).isRequired,
  setBank: PropTypes.func.isRequired
};

export default ImportPage;
