import React from 'react';
import { shallow } from 'enzyme';
import CategorizationPage from '../pages/CategorizationPage';
import Categorizer from '../components/Categorizer';

let props;

describe('<CategorizationPage />', () => {
  beforeEach(() => {
    props = {
      updateCategories: jest.fn(),
      userState: {
        uniqueParties: []
      }
    };
  });

  it('renders when userState is given', () => {
    const component = shallow(<CategorizationPage {...props} />);

    expect(component.find(Categorizer).exists()).toBe(true);
    expect(component.contains('Select a file and bank on import page')).toBe(false);
  });

  it('does not render when userState is undefined', () => {
    props.userState = undefined;
    const component = shallow(<CategorizationPage {...props} />);

    expect(component.find(Categorizer).exists()).toBe(false);
    expect(component.contains('Select a file and bank on import page')).toBe(true);
  });
});
