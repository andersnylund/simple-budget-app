import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { setCategories } from '../reducers/userReducer';

const StyledInput = styled.input`
  display: none;
`;

StyledInput.displayName = 'StyledInput';

const handleChange = async (e, setCats) => {
  const file = e.target.files[0];
  const jsonString = await new Response(file).text();
  const parsed = JSON.parse(jsonString);
  setCats(parsed.categories);
};

const PreviousDataReader = ({ setCats, ...rest }) => (
  <div {...rest}>
    <label htmlFor="previous-input">
      <StyledInput
        accept=".json"
        id="previous-input"
        multiple={false}
        type="file"
        onChange={e => handleChange(e, setCats)}
      />
      <Button variant="contained" component="span">
        Upload previous data
      </Button>
    </label>
  </div>
);

PreviousDataReader.propTypes = {
  setCats: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    setCats: setCategories
  }
)(PreviousDataReader);
