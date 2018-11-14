import React from 'react';
import { shallow } from 'enzyme';
import CategoryList from './CategoryList';
import { INITIAL_CATEGORIES } from '../constants';
import Category from './Category';

let props;
const categories = INITIAL_CATEGORIES.map(c => ({
  title: c,
  parties: []
}));

describe('<CategoryList />', () => {
  beforeEach(() => {
    props = {
      data: categories
    };
  });

  it('should render all the categories', () => {
    const wrapper = shallow(<CategoryList {...props} />);
    const cats = wrapper.find(Category);
    expect(cats.length).toBe(5);
  });
});
