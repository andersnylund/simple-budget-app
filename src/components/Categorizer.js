import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import PartyList from './PartyList';
import CategoryList from './CategoryList';
import { addPartyToCategory, removePartyFromCategory } from '../reducers/userReducer';
import { setAmountOfCategory as setAmount } from '../reducers/amountReducer';
import { combinedAmountOfParties } from '../utils';

const partyListId = 'uncategorized-parties';

export class Categorizer extends React.Component {
  updateAmounts = throttle(() => {
    const { setAmountOfCategory, transactions, categories } = this.props;
    categories.forEach(category => {
      setAmountOfCategory(combinedAmountOfParties(transactions, category.parties), category.title);
    });
  }, 2000);

  componentWillUnmount() {
    this.updateAmounts();
  }

  unCategorizedParties = () => {
    const categorizedParties = [];
    const { categories, parties } = this.props;

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

    return parties ? parties.filter(party => !categorizedParties.includes(party)) : undefined;
  };

  onDragEnd = result => {
    const { source, destination, draggableId } = result;
    const { addParty, removeParty } = this.props;

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
    } else if (source.droppableId !== partyListId && destination.droppableId !== partyListId) {
      // moving a party from one category to another
      const categoryTitleToBeModified = source.droppableId;
      removeParty(draggableId, categoryTitleToBeModified);
      const categoryTitleToBeModified2 = destination.droppableId;
      addParty(draggableId, categoryTitleToBeModified2, destination.index);
    }
    this.updateAmounts();
  };

  render() {
    const availableParties = this.unCategorizedParties();
    const { categories } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <CategoryList data={categories} />
        <PartyList parties={availableParties} id={partyListId} />
      </DragDropContext>
    );
  }
}

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
  parties: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  addParty: PropTypes.func.isRequired,
  removeParty: PropTypes.func.isRequired,
  setAmountOfCategory: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  {
    addParty: addPartyToCategory,
    removeParty: removePartyFromCategory,
    setAmountOfCategory: setAmount
  }
)(Categorizer);
