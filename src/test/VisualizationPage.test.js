import React from 'react';
import { shallow } from 'enzyme';
import VisualizationPage from '../pages/VisualizationPage';
import BalanceHistory from '../components/BalanceHistory';
import PartyGrouping from '../components/PartyGrouping';

let initialTransactions;

describe('<VisualizationPage />', () => {
  beforeEach(() => {
    initialTransactions = [
      {
        date: new Date().toISOString(),
        party: 'test',
        amount: '10'
      }
    ];
  });

  it('renders charts when initialTransactions are given', () => {
    const component = shallow(<VisualizationPage initialTransactions={initialTransactions} />);

    expect(component.find(BalanceHistory).exists()).toBe(true);
    expect(component.find(PartyGrouping).exists()).toBe(true);
  });

  it('does not render charts when initialTransactions are undefined', () => {
    const component = shallow(<VisualizationPage />);

    expect(component.find(BalanceHistory).exists()).toBe(false);
    expect(component.find(PartyGrouping).exists()).toBe(false);

    expect(component.contains('Select a file and bank on import page')).toBe(true);
  });
});
