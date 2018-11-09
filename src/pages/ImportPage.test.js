import React from 'react';
import { shallow } from 'enzyme';
import ImportPage from './ImportPage';
import { danske } from '../Bank';
import TransactionFileReader from '../components/import/TransactionFileReader';
import BankSelector from '../components/import/BankSelector';

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

    expect(component.find(TransactionFileReader).exists()).toBe(true);
    expect(component.find(BankSelector).exists()).toBe(true);
  });
});
