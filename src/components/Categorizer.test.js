import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';
import { Categorizer } from './Categorizer';
import PartyList from './PartyList';
import CategoryList from './CategoryList';
import { categories, transactions } from '../testHelpers';

let props;

describe('<Categorizer />', () => {
  beforeEach(() => {
    props = {
      categories,
      transactions,
      addParty: jest.fn(),
      removeParty: jest.fn()
    };
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Categorizer {...props} />);

    expect(wrapper.find(PartyList).exists()).toBe(true);
    expect(wrapper.find(CategoryList).exists()).toBe(true);
    expect(wrapper.find(Button).exists()).toBe(true);
  });

  it('should update selectedParties', () => {
    const wrapper = shallow(<Categorizer {...props} />);

    wrapper.instance().setSelectedParties(['party1']);
    expect(wrapper.state().selectedParties).toEqual(['party1']);
  });

  it('should update activeCategory', () => {
    const wrapper = shallow(<Categorizer {...props} />);

    wrapper.instance().setActiveCategory('category1');
    expect(wrapper.state().activeCategory).toEqual('category1');
  });

  it('should categorize parties', () => {
    const wrapper = shallow(<Categorizer {...props} />);

    expect(wrapper.state().selectedParties).toEqual([]);

    wrapper.instance().setSelectedParties(['party1']);
    wrapper.instance().setActiveCategory('category1');
    wrapper.instance().updateState();

    expect(wrapper.state().selectedParties).toEqual([]);
    expect(wrapper.state().activeCategory).toEqual('category1');

    expect(props.addParty.mock.calls[0]).toEqual(['party1', 'category1']);
  });

  it('unCategorizedParties() should return correct value', () => {
    props.categories = [
      {
        title: 'category1',
        parties: ['party1']
      },
      {
        title: 'category2',
        parties: []
      }
    ];

    const wrapper = shallow(<Categorizer {...props} />);

    expect(wrapper.instance().unCategorizedParties()).toEqual(['party2', 'party3']);
  });
});
