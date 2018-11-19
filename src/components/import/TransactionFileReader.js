import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { parse, significantParties } from '../../utils';
import Bank from '../../Bank';
import { setSignificantParties } from '../../reducers/amountReducer';
import { setTransactions } from '../../reducers/appReducer';

const handleChange = async (e, setInitialTransactions, selectedBank, setParties) => {
  const file = e.target.files[0];
  const csvString = await new Response(file).text();
  const transactions = parse(csvString, selectedBank);
  setInitialTransactions(transactions);
  const byParty = significantParties(transactions);
  setParties(byParty);
};

export const TransactionFileReader = ({ setInitialTransactions, selectedBank, setParties }) => (
  <div>
    <label htmlFor="transactions-input">
      <input
        style={{ display: 'none' }}
        accept=".csv, .txt"
        id="transactions-input"
        multiple={false}
        type="file"
        onChange={e => handleChange(e, setInitialTransactions, selectedBank, setParties)}
      />
      <Button variant="contained" component="span">
        <FormattedMessage id="import.uploadTransactions" />
      </Button>
    </label>
  </div>
);

const mapStateToProps = state => ({
  selectedBank: state.appReducer.bank
});

TransactionFileReader.propTypes = {
  setParties: PropTypes.func.isRequired,
  setInitialTransactions: PropTypes.func.isRequired,
  selectedBank: PropTypes.shape(Bank).isRequired
};

export default connect(
  mapStateToProps,
  { setInitialTransactions: setTransactions, setParties: setSignificantParties }
)(TransactionFileReader);
