import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Context from '../Context';

const StyledInput = styled.input`
  display: none;
`;

StyledInput.displayName = 'StyledInput';

const handleChange = async (e, setCategories, setUniqueParties) => {
  const file = e.target.files[0];
  const jsonString = await new Response(file).text();
  const parsed = JSON.parse(jsonString);
  setCategories(parsed.categories);
  setUniqueParties(parsed.uniqueParties);
};

const PreviousDataReader = props => (
  <Context.Consumer>
    {({ setCategories, setUniqueParties }) => (
      <div {...props}>
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
    )}
  </Context.Consumer>
);

export default PreviousDataReader;
