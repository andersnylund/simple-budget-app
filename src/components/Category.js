import React from 'react';
import PropTypes from 'prop-types';

import { Droppable } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Party from './Party';

const Category = ({ title, parties }) => {
  const styles = {
    Card: {
      minHeight: '20rem',
      width: '100%'
    }
  };

  const grid = 8;

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: '80%',
    display: 'inline-block',
    overflow: 'hidden'
  });

  const partyList = parties.map((party, index) => (
    <Party party={party} index={index} key={party} />
  ));

  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          <Card style={styles.Card}>
            <CardContent>{title}</CardContent>
            <CardContent>{partyList}</CardContent>
            {provided.placeholder}
          </Card>
        </div>
      )}
    </Droppable>
  );
};

Category.propTypes = {
  title: PropTypes.string.isRequired,
  parties: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Category;
