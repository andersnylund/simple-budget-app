import React from 'react';
import { shallow } from 'enzyme';
import { VisualizationPage } from './VisualizationPage';
import BalanceHistory from '../charts/BalanceHistory';
import TransactionHistory from '../charts/TransactionHistory';
import PartyGrouping from '../charts/PartyGrouping';
import { transactions, categories, spending } from '../testHelpers';

let props;

describe('<VisualizationPage />', () => {
  beforeEach(() => {
    props = {
      transactions,
      categories,
      spending
    };
  });

  it('initializes the state', () => {
    const wrapper = shallow(<VisualizationPage {...props} />);

    expect(wrapper.state()).toEqual({ activeTab: 0 });
  });

  it('renders the correct chart', () => {
    const wrapper = shallow(<VisualizationPage {...props} />);

    expect(wrapper.find(TransactionHistory).exists()).toBe(true);
  });

  it('can switch the chart', () => {
    const wrapper = shallow(<VisualizationPage {...props} />);

    wrapper.instance().handleChange(null, 1);
    wrapper.update();
    expect(wrapper.find(BalanceHistory).exists()).toBe(true);

    wrapper.instance().handleChange(null, 2);
    wrapper.update();
    expect(wrapper.find(PartyGrouping).exists()).toBe(true);
  });

  it('should not show the charts if there is no transactions', () => {
    const wrapper = shallow(<VisualizationPage transactions={[]} categories={[]} spending={[]} />);
    expect(wrapper.find(TransactionHistory).exists()).toBe(false);
  });
});
