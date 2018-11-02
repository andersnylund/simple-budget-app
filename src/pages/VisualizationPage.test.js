import React from 'react';
import { shallow } from 'enzyme';
import VisualizationPage from './VisualizationPage';
import BalanceHistory from '../charts/BalanceHistory';
import PartyGrouping from '../charts/PartyGrouping';
import { initialTransactions } from '../testHelpers';

describe('<VisualizationPage />', () => {
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
