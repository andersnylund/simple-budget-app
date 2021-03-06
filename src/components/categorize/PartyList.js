import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import Typography from '@material-ui/core/Typography';
import Party from './Party';

const PartyList = ({ parties, id }) => {
  const grid = 8;

  // @TODO replace the styles object with a styled component.
  // for reference check: https://www.styled-components.com/docs/basics#adapting-based-on-props
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid
  });

  const partyList = parties.map((party, index) => (
    <Party party={party} index={index} key={party} />
  ));

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Uncategorized Parties
      </Typography>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            <div>{partyList}</div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

PartyList.propTypes = {
  parties: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired
};

export default PartyList;
