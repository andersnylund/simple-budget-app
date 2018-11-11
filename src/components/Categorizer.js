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
export const Categorizer = ({ categories, removeParty, transactions, addParty }) => {
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

    const uniqueParties = [...new Set(transactions.map(t => t.party))];
    return uniqueParties.filter(party => !categorizedParties.includes(party));
    // return unCategorizedParties;
  };

  // const removeCategorizedParty = (party, category) => {
  //   removeParty(party, category);
  //   // const currentCategories = categories;

  //   // const categoryToBeModified = currentCategories.find(
  //   //   category => category.title === categoryTitleToBeModified
  //   // );

  //   // const otherCategories = currentCategories.filter(
  //   //   category => category.title !== categoryTitleToBeModified
  //   // );

  //   // const filteredParties = categoryToBeModified.parties.filter(party => party !== partyToRemove);

  //   // const modifiedCategory = {
  //   //   title: categoryTitleToBeModified,
  //   //   parties: [...filteredParties]
  //   // };

  //   // updateCategories([...otherCategories, modifiedCategory]);
  // };

  // removeCategorizedParty = (party, category) => {
  //   const { removeParty } = this.props;
  //   removeParty(party, category);
  // };

  // const addPartyToCategory = (party, category) => {
  //   addParty(party, category);
  // };

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }
    // @TODO handle case of reordering items in the same list.

    if (source.droppableId === partyListId && destination.droppableId !== partyListId) {
      // moving a party from uncategorized parties to a category.
      const categoryTitleToBeModified = destination.droppableId;
      addParty(draggableId, categoryTitleToBeModified);
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
        <div>
          <CategoryList data={categories} />
          <PartyList parties={availableParties} id={partyListId} />
        </div>
      </Container>
    </DragDropContext>
  );
};

const mapStateToProps = state => ({
  categories: state.userReducer.categories,
  transactions: state.appReducer.transactions
});

Categorizer.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      parties: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired,
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
