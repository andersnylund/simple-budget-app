import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { Reset } from './Reset';

let props;

describe('<Reset />', () => {
  beforeEach(() => {
    props = {
      resetUser: jest.fn(),
      resetApp: jest.fn(),
      resetAmount: jest.fn()
    };
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<Reset {...props} />);
    expect(wrapper.find(Button).exists()).toBe(true);
  });

  it('should call all reset on click', () => {
    const wrapper = shallow(<Reset {...props} />);
    const button = wrapper.find(Button);
    button.prop('onClick')();
    expect(props.resetUser.mock.calls.length).toBe(1);
    expect(props.resetApp.mock.calls.length).toBe(1);
    expect(props.resetAmount.mock.calls.length).toBe(1);
  });
});
