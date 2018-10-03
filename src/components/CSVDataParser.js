import React from 'react';
import PropTypes from 'prop-types';
import papa from 'papaparse';
import { Bank } from '../banks';

class CSVDataParser extends React.Component {
  constructor(props) {
    super(props);
    const { csvString, selectedBank } = props;
    this.state = {
      csvData: papa.parse(csvString)
    };
  }

  render() {
    const { csvData } = this.state;

    return <div>{JSON.stringify(csvData)}</div>;
  }
}

CSVDataParser.propTypes = {
  csvString: PropTypes.string.isRequired,
  selectedBank: PropTypes.instanceof(Bank).isRequired
};

export default CSVDataParser;
