import React from 'react';
import { shallow } from 'enzyme';
import { CategorizationPage } from './CategorizationPage';
import { transactions } from '../testHelpers';
import Categorizer from '../components/Categorizer';

describe('<CategorizationPage />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CategorizationPage transactions={transactions} />);
    expect(wrapper.find(Categorizer).exists()).toBe(true);
  });

  it('should not render if transactions empty', () => {
    const wrapper = shallow(<CategorizationPage transactions={[]} />);
    expect(wrapper.find(Categorizer).exists()).toBe(false);
  });
});
