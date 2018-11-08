import React from 'react';
import { shallow } from 'enzyme';
import { VisualizationPage } from './VisualizationPage';
import BalanceHistory from '../charts/BalanceHistory';
import TransactionHistory from '../charts/TransactionHistory';
import PartyGrouping from '../charts/PartyGrouping';
import { transactions, categories } from '../testHelpers';

describe('<VisualizationPage />', () => {
  it('initializes the state', () => {
    const wrapper = shallow(
      <VisualizationPage transactions={transactions} categories={categories} />
    );

    expect(wrapper.state()).toEqual({ activeTab: 0 });
  });

  it('renders the correct chart', () => {
    const wrapper = shallow(
      <VisualizationPage transactions={transactions} categories={categories} />
    );

    expect(wrapper.find(TransactionHistory).exists()).toBe(true);
  });

  it('can switch the chart', () => {
    const wrapper = shallow(
      <VisualizationPage transactions={transactions} categories={categories} />
    );

    wrapper.instance().handleChange(null, 1);
    wrapper.update();
    expect(wrapper.find(BalanceHistory).exists()).toBe(true);

    wrapper.instance().handleChange(null, 2);
    wrapper.update();
    expect(wrapper.find(PartyGrouping).exists()).toBe(true);
  });
});
