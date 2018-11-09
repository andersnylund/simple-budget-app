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

const handleChange = async (e, categorize) => {
  const file = e.target.files[0];
  const jsonString = await new Response(file).text();
  const parsed = JSON.parse(jsonString);
  categorize(parsed.categories);
};

export const PreviousDataReader = ({ categorize, ...rest }) => (
  <div {...rest}>
    <label htmlFor="previous-input">
      <StyledInput
        accept=".json"
        id="previous-input"
        multiple={false}
        type="file"
        onChange={e => handleChange(e, categorize)}
      />
      <Button variant="contained" component="span">
        Upload previous data
      </Button>
    </label>
  </div>
);

PreviousDataReader.propTypes = {
  categorize: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    categorize: setCategories
  }
)(PreviousDataReader);
