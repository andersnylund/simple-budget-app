import React from 'react';
import { mount } from 'enzyme';
import CategoryList from './CategoryList';
import { INITIAL_CATEGORIES } from '../constants';
import Category from './Category';
import Context from '../Context';

let wrapper;
let props;

const categories = INITIAL_CATEGORIES.map(c => ({
  title: c,
  parties: []
}));

describe('<CategoryList />', () => {
  beforeEach(() => {
    props = {
      data: categories,
      activeCategory: categories[0].title,
      updateActiveCategory: jest.fn(),
      removeCategorizedParty: jest.fn()
    };

    wrapper = mount(
      <Context.Provider value={props}>
        <CategoryList />
      </Context.Provider>
    );
  });

  it('should render all the categories', () => {
    const cats = wrapper.find(Category);
    expect(cats.length).toBe(5);
  });

  it('first category should be checked', () => {
    const cats = wrapper.find(Category);
    expect(cats.at(0).props().checked).toBe(true);
    expect(cats.at(1).props().checked).toBe(false);
  });

  it('should update active category', () => {
    const cat = wrapper.find(Category).at(1);

    cat.prop('onSelect')({
      target: {
        name: INITIAL_CATEGORIES[1]
      }
    });

    const { calls } = props.updateActiveCategory.mock;

    expect(calls[0][0]).toEqual(INITIAL_CATEGORIES[1]);
  });
});
