import React from 'react';
import { shallow } from 'enzyme';
import { FormControlLabel } from '@material-ui/core';
import PartyList from './PartyList';

let props;
let event;

describe('<PartyList />', () => {
  beforeEach(() => {
    props = {
      parties: ['party1', 'party2'],
      selectedParties: ['party1'],
      updateSelectedParties: jest.fn()
    };
    event = {
      target: {
        checked: true
      }
    };
  });

  it('should render 2 form controls', () => {
    const wrapper = shallow(<PartyList {...props} />);
    const formControls = wrapper.find(FormControlLabel);
    expect(formControls.length).toBe(2);
  });

  it('should set party2 to checked', () => {
    const wrapper = shallow(<PartyList {...props} />);
    const formControl = wrapper.find(FormControlLabel).at(1);
    const { onChange } = formControl.props().control.props;
    onChange(event);
    expect(props.updateSelectedParties.mock.calls[0][0]).toEqual(['party1', 'party2']);
  });

  it('should show party1 checked', async () => {
    const wrapper = shallow(<PartyList {...props} />);
    const formControl = wrapper.find(FormControlLabel).first();
    expect(formControl.props().control.props.checked).toBe(true);
  });

  it('should uncheck a party', async () => {
    const wrapper = shallow(<PartyList {...props} />);
    const formControl = wrapper.find(FormControlLabel).first();
    const { onChange } = formControl.props().control.props;
    onChange({ target: { checked: false } });
    expect(props.updateSelectedParties.mock.calls[0][0]).toEqual([]);
  });
});
