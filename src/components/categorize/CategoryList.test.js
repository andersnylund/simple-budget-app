import React from 'react';
import { shallow } from 'enzyme';
import CategoryList from './CategoryList';
import { INITIAL_CATEGORIES } from '../../constants';
import Category from './Category';

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
  });

  it('should render all the categories', () => {
    const wrapper = shallow(<CategoryList {...props} />);
    const cats = wrapper.find(Category);
    expect(cats.length).toBe(5);
  });

  it('first category should be checked', () => {
    const wrapper = shallow(<CategoryList {...props} />);
    const cats = wrapper.find(Category);
    expect(cats.at(0).props().checked).toBe(true);
    expect(cats.at(1).props().checked).toBe(false);
  });

  it('should update active category', () => {
    const wrapper = shallow(<CategoryList {...props} />);
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
