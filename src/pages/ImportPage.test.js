import React from 'react';
import { shallow } from 'enzyme';
import ImportPage from './ImportPage';
import { danske } from '../Bank';
import PageItem from '../components/import/PageItem';

let props;

describe('<ImportPage />', () => {
  beforeEach(() => {
    props = {
      setInitialTransactions: jest.fn(),
      selectedBank: danske,
      setBank: jest.fn()
    };
  });

  it('renders correctly', () => {
    const component = shallow(<ImportPage {...props} />);

    expect(component.find(PageItem).length).toBe(4);
  });
});
