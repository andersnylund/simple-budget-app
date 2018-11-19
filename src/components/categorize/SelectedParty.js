import React from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  &:hover {
    cursor: pointer;
  }
`;

const SelectedParty = ({ party, removeParty }) => (
  <Container onClick={e => removeParty(party)}>
    {party} 
{' '}
<ClearIcon />
  </Container>
);

SelectedParty.propTypes = {
  party: PropTypes.string.isRequired,
  removeParty: PropTypes.func.isRequired
};

export default SelectedParty;
