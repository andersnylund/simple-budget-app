import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PartyList from './PartyList';
import CategoryList from './CategoryList';
import { addPartyToCategory, removePartyFromCategory } from '../reducers/userReducer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;
export const Categorizer = ({ categories, removeParty, parties, addParty }) => {
  const partyListId = 'uncategorized-parties';

  const unCategorizedParties = () => {
    const categorizedParties = [];

    if (categories && categories.length > 0) {
      categories.forEach(category => {
        if (category.parties) {
          category.parties.forEach(p => {
            if (!categorizedParties.includes(p)) {
              categorizedParties.push(p);
            }
          });
        }
      });
    }

    return parties.filter(party => !categorizedParties.includes(party));
  };

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }
    // @TODO handle case of reordering items in the same list.

    if (source.droppableId === partyListId && destination.droppableId !== partyListId) {
      // moving a party from uncategorized parties to a category.
      const categoryTitleToBeModified = destination.droppableId;
      addParty(draggableId, categoryTitleToBeModified, destination.index);
    } else if (destination.droppableId === partyListId && source.droppableId !== partyListId) {
      // removing a party from a category to the uncategorized list.
      const categoryTitleToBeModified = source.droppableId;
      removeParty(draggableId, categoryTitleToBeModified);
    }
  };

  const availableParties = unCategorizedParties();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <CategoryList data={categories} />
        <PartyList parties={availableParties} id={partyListId} />
      </Container>
    </DragDropContext>
  );
};

const mapStateToProps = state => ({
  categories: state.userReducer.categories
});

Categorizer.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      parties: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  parties: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  addParty: PropTypes.func.isRequired,
  removeParty: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  {
    addParty: addPartyToCategory,
    removeParty: removePartyFromCategory
  }
)(Categorizer);
