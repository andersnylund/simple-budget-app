import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import banks from '../banks';

const handleChange = (e, setBank) => {
  e.preventDefault();
  const bank = banks.find(b => b.name === e.target.value);
  setBank(bank);
};

const BankSelector = ({ selectedBank, setBank }) => {
  const bankArray = banks.map(bank => {
    if (selectedBank && _.isEqual(selectedBank.name, bank.name)) {
      return (
        <option selected key={bank.name}>
          {bank.name}
        </option>
      );
    }
    return <option key={bank.name}>{bank.name}</option>;
  });

  return (
    <div>
      <select onChange={e => handleChange(e, setBank)}>{bankArray}</select>
    </div>
  );
};

BankSelector.propTypes = {
  setBank: PropTypes.func.isRequired,
  selectedBank: PropTypes.objectOf({}).isRequired
};

export default BankSelector;
