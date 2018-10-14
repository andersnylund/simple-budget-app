import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Categorizer = ({ data, onCategory }) => {
  // const rows = data.map(row => <li>{`${row.date} ${row.party} ${row.amount}`}</li>);

  return (
    <div>
      <ul>coming soon</ul>
    </div>
  );
};

Categorizer.propTypes = {
  data: PropTypes.arrayOf({
    date: PropTypes.instanceOf(moment),
    party: PropTypes.string,
    amount: PropTypes.number
  }).isRequired,
  onCategory: PropTypes.func.isRequired
};

export default Categorizer;
