import React from 'react';
import { shallow } from 'enzyme';
import CategoryList from '../components/CategoryList';
import { INITIAL_CATEGORIES } from '../constants';

let props;
let event;
const categories = INITIAL_CATEGORIES.map(c => ({
  title: c,
  parties: []
}));

describe('<CategoryList />', () => {
  beforeEach(() => {
    props = {
      data: categories,
      updateActiveCategory: jest.fn()
    };
    event = {
      target: {
        name: INITIAL_CATEGORIES[1]
      }
    };
  });
  it('should set the initial state', () => {
    const wrapper = shallow(<CategoryList {...props} />);
    expect(wrapper.state()).toEqual({ checkedCategory: INITIAL_CATEGORIES[0] });

    const { calls } = props.updateActiveCategory.mock;

    expect(calls.length).toBe(1);
    expect(calls[0][0]).toEqual(INITIAL_CATEGORIES[0]);
  });

  it('should change the active category', () => {
    const wrapper = shallow(<CategoryList {...props} />);
    wrapper.instance().setCheckedCategory(event);

    const { calls } = props.updateActiveCategory.mock;

    expect(calls.length).toBe(2);
    expect(calls[1][0]).toEqual(INITIAL_CATEGORIES[1]);
  });
});
