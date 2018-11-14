import React from 'react';
import { shallow } from 'enzyme';
import PartyList from './PartyList';

let props;

describe('<PartyList />', () => {
  beforeEach(() => {
    props = {
      parties: ['party1', 'party2'],
      id: 'id'
    };
  });

  it('should render parties', () => {
    const wrapper = shallow(<PartyList {...props} />);
    expect(wrapper).toBeTruthy();
  });
});
