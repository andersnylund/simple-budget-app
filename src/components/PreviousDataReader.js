import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const StyledInput = styled.input`
  display: none;
`;

const handleChange = async (e, setCategories, setUniqueParties) => {
  const file = e.target.files[0];
  const jsonString = await new Response(file).text();
  const parsed = JSON.parse(jsonString);
  setCategories(parsed.categories);
  setUniqueParties(parsed.uniqueParties);
};

const PreviousDataReader = ({ setCategories, setUniqueParties, ...rest }) => (
  <div {...rest}>
    <label htmlFor="previous-input">
      <StyledInput
        accept=".json"
        id="previous-input"
        multiple={false}
        type="file"
        onChange={e => handleChange(e, setCategories, setUniqueParties)}
      />
      <Button variant="contained" component="span">
        Upload previous data
      </Button>
    </label>
  </div>
);

PreviousDataReader.propTypes = {
  setCategories: PropTypes.func.isRequired,
  setUniqueParties: PropTypes.func.isRequired
};

export default PreviousDataReader;
