import React from 'react';
import { shallow } from 'enzyme';
import VisualizationPage from './VisualizationPage';
import BalanceHistory from '../charts/BalanceHistory';
import PartyGrouping from '../charts/PartyGrouping';
import { initialTransactions, categories } from '../testHelpers';

describe('<VisualizationPage />', () => {
  it('initializes the state', () => {
    const wrapper = shallow(
      <VisualizationPage initialTransactions={initialTransactions} categories={categories} />
    );

    expect(wrapper.state()).toEqual({ value: 0 });
  });

  it('renders the correct chart', () => {
    const wrapper = shallow(
      <VisualizationPage initialTransactions={initialTransactions} categories={categories} />
    );

    expect(wrapper.find(BalanceHistory).exists()).toBe(true);
  });

  it('can switch the chart', () => {
    const wrapper = shallow(
      <VisualizationPage initialTransactions={initialTransactions} categories={categories} />
    );

    wrapper.instance().handleChange(null, 1);
    wrapper.update();

    expect(wrapper.find(PartyGrouping).exists()).toBe(true);
  });
});
