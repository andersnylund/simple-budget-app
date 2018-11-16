import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import PartyList from './PartyList';
import CategoryList from './CategoryList';
import { addPartyToCategory, removePartyFromCategory } from '../../reducers/userReducer';
import { updateAllAmounts as updateAllActionCreator } from '../../reducers/amountReducer';

const partyListId = 'uncategorized-parties';

export class Categorizer extends React.Component {
  throttledUpdate = throttle(() => {
    const { updateAllAmounts } = this.props;
    updateAllAmounts();
  }, 2000);

  componentWillUnmount() {
    const { updateAllAmounts } = this.props;
    updateAllAmounts();
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
    this.throttledUpdate();
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
  parties: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  addParty: PropTypes.func.isRequired,
  removeParty: PropTypes.func.isRequired,
  updateAllAmounts: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  {
    addParty: addPartyToCategory,
    removeParty: removePartyFromCategory,
    updateAllAmounts: updateAllActionCreator
  }
)(Categorizer);
