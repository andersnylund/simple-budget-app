import React from 'react';
import { shallow } from 'enzyme';
import { TransactionFileReader } from './TransactionFileReader';
import { danske } from '../../Bank';

let props;
let event;
const csvString = `date;party;amount\n01.01.2018;K-Market;-10,45\n02.01.2018;Pekka;+5,45`;

describe('<TransactionFileReader />', () => {
  beforeEach(() => {
    props = {
      selectedBank: danske,
      setInitialTransactions: jest.fn(),
      setParties: jest.fn()
    };
    event = {
      target: {
        files: [new File([...csvString], 'test.csv', { type: 'text/csv' })]
      }
    };
  });

  it('should set initial transactions correctly', async () => {
    const wrapper = shallow(<TransactionFileReader {...props} />);
    const input = wrapper.find('input');
    await input.props().onChange(event);

    expect(props.setInitialTransactions.mock.calls[0][0]).toEqual([
      { amount: -10.45, date: '2018-01-01T00:00:00.000Z', party: 'K-Market' },
      { amount: 5.45, date: '2018-01-02T00:00:00.000Z', party: 'Pekka' }
    ]);

    expect(props.setParties.mock.calls[0][0]).toEqual([
      { sum: 5.45, title: 'Pekka' },
      { sum: -10.45, title: 'K-Market' }
    ]);
  });
});
