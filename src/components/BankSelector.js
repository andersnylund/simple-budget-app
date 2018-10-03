import React from 'react';
import PropTypes from 'prop-types';
import banks from '../banks';

const handleChange = (e, setBank) => {
  e.preventDefault();
  const bank = banks.find(b => b.name === e.target.value);
  setBank(bank);
};

const BankSelector = ({ setBank }) => {
  const bankArray = banks.map(bank => <option key={bank.name}>{bank.name}</option>);

  return (
    <div>
      <select onChange={e => handleChange(e, setBank)}>{bankArray}</select>
    </div>
  );
};

BankSelector.propTypes = {
  setBank: PropTypes.func.isRequired
};

export default BankSelector;
