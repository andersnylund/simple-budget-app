import React from 'react';
import { shallow } from 'enzyme';
import { Categorizer } from './Categorizer';
import PartyList from './PartyList';
import CategoryList from './CategoryList';
import { categories, transactions } from '../../testHelpers';

let props;

describe('<Categorizer />', () => {
  beforeEach(() => {
    const parties = ['party1'];
    props = {
      categories,
      transactions,
      parties,
      addParty: jest.fn(),
      removeParty: jest.fn(),
      updateAllAmounts: jest.fn()
    };
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Categorizer {...props} />);

    expect(wrapper.find(PartyList).exists()).toBe(true);
    expect(wrapper.find(CategoryList).exists()).toBe(true);
  });

  // @TODO add DragDropContext related tests to test categorization functionality.
});
