import React from 'react';
import { shallow } from 'enzyme';
import ImportPage from '../pages/ImportPage';
import { danske } from '../Bank';
import CSVFileReader from '../components/CSVFileReader';
import BankSelector from '../components/BankSelector';

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

    expect(component.find(CSVFileReader).exists()).toBe(true);
    expect(component.find(BankSelector).exists()).toBe(true);
  });
});
