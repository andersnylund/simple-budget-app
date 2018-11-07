import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import PartyList from './PartyList';
import CategoryList from './CategoryList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;
const Categorizer = ({ userState, updateCategories }) => {
  const partyListId = 'uncategorized-parties';

  const unCategorizedParties = () => {
    const { categories, uniqueParties } = userState;

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

    const unCategorizedPartiesList = uniqueParties.filter(
      party => !categorizedParties.includes(party)
    );

    return unCategorizedPartiesList;
  };

  const removeCategorizedParty = (categoryTitleToBeModified, partyToRemove) => {
    const currentCategories = userState.categories;

    const categoryToBeModified = currentCategories.find(
      category => category.title === categoryTitleToBeModified
    );

    const otherCategories = currentCategories.filter(
      category => category.title !== categoryTitleToBeModified
    );

    const filteredParties = categoryToBeModified.parties.filter(party => party !== partyToRemove);

    const modifiedCategory = {
      title: categoryTitleToBeModified,
      parties: [...filteredParties]
    };

    updateCategories([...otherCategories, modifiedCategory]);
  };

  const addPartyToCategory = (categoryTitleToBeModified, selectedParty) => {
    const currentCategories = userState.categories;
    const { uniqueParties } = userState;

    const categoryToBeModified = currentCategories.find(
      category => category.title === categoryTitleToBeModified
    );

    const otherCategories = currentCategories.filter(
      category => category.title !== categoryTitleToBeModified
    );

    const categorizedParty = uniqueParties.find(party => party === selectedParty);

    const newCategory = {
      title: categoryTitleToBeModified,
      parties: [...categoryToBeModified.parties, categorizedParty]
    };

    updateCategories([...otherCategories, newCategory]);
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
      addPartyToCategory(categoryTitleToBeModified, draggableId);
    } else if (destination.droppableId === partyListId && source.droppableId !== partyListId) {
      // removing a party from a category to the uncategorized list.
      const categoryTitleToBeModified = source.droppableId;
      removeCategorizedParty(categoryTitleToBeModified, draggableId);
    }
  };

  const availableParties = unCategorizedParties();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <div>
          <CategoryList data={userState.categories} />
          <PartyList parties={availableParties} id={partyListId} />
        </div>
      </Container>
    </DragDropContext>
  );
};

Categorizer.propTypes = {
  userState: PropTypes.shape({
    uniqueParties: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        parties: PropTypes.arrayOf(PropTypes.string)
      })
    )
  }).isRequired,
  updateCategories: PropTypes.func.isRequired
};

export default Categorizer;
