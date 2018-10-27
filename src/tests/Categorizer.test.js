import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';
import Categorizer from '../components/Categorizer';
import PartyList from '../components/PartyList';
import CategoryList from '../components/CategoryList';

let props;

describe('<Categorizer />', () => {
  beforeEach(() => {
    props = {
      userState: {
        uniqueParties: ['party1', 'party2'],
        categories: [
          {
            title: 'category1',
            parties: []
          },
          {
            title: 'category2',
            parties: []
          }
        ]
      },
      updateCategories: jest.fn()
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

    const { updateCategories } = props;

    expect(wrapper.state().selectedParties).toEqual([]);

    wrapper.instance().setSelectedParties(['party1']);
    wrapper.instance().setActiveCategory('category1');
    wrapper.instance().updateState();

    expect(wrapper.state().selectedParties).toEqual([]);
    expect(wrapper.state().activeCategory).toEqual('category1');

    expect(updateCategories.mock.calls[0][0]).toEqual([
      {
        parties: [],
        title: 'category2'
      },
      {
        parties: ['party1'],
        title: 'category1'
      }
    ]);
  });

  it('unCategorizedParties() should return correct value', () => {
    props.userState.categories = [
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

    expect(wrapper.instance().unCategorizedParties()).toEqual(['party2']);
  });
});
