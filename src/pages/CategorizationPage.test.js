import React from 'react';
import { shallow } from 'enzyme';
import { CategorizationPage } from './CategorizationPage';
import { transactions } from '../testHelpers';
import Categorizer from '../components/Categorizer';
import TransactionsOverview from '../components/TransactionsOverview';
import CategoriesOverview from '../components/CategoriesOverview';

describe('<CategorizationPage />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CategorizationPage transactions={transactions} />);
    expect(wrapper.find(TransactionsOverview).exists()).toBe(true);
  });
  it('should show categories overview', () => {
    const wrapper = shallow(<CategorizationPage transactions={transactions} />);
    wrapper.instance().navigateForward();
    expect(wrapper.find(CategoriesOverview).exists()).toBe(true);
  });

  it('should show categorizers', () => {
    const wrapper = shallow(<CategorizationPage transactions={transactions} />);
    wrapper.instance().navigateForward();
    wrapper.instance().navigateForward();
    expect(wrapper.find(Categorizer).exists()).toBe(true);
  });

  it('should not render if transactions empty', () => {
    const wrapper = shallow(<CategorizationPage transactions={[]} />);
    expect(wrapper.find(Categorizer).exists()).toBe(false);
  });
});
