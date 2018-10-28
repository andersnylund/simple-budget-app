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

  it('should set the state', () => {
    const wrapper = shallow(<PartyList {...props} />);
    expect(wrapper.state()).toEqual({});
  });

  it('should handle the check of first party', () => {
    const wrapper = shallow(<PartyList {...props} />);
    const formControl = wrapper.find(FormControlLabel).first();
    const { onChange } = formControl.props().control.props;
    onChange(event);
    expect(wrapper.state()).toEqual({ party1: true });
  });

  it('should update selected parties', () => {
    const wrapper = shallow(<PartyList {...props} />);
    const formControl = wrapper.find(FormControlLabel).first();
    const { onChange } = formControl.props().control.props;
    onChange(event);
    expect(props.updateSelectedParties.mock.calls[0][0]).toEqual(['party1']);
  });

  it('should handle the check of both parties', () => {
    const wrapper = shallow(<PartyList {...props} />);
    const formControl1 = wrapper.find(FormControlLabel).at(0);
    const formControl2 = wrapper.find(FormControlLabel).at(1);
    formControl1.props().control.props.onChange(event);
    formControl2.props().control.props.onChange(event);
    expect(wrapper.state()).toEqual({ party1: true, party2: true });
  });

  it('should handle the unchecking of party1', () => {
    const wrapper = shallow(<PartyList {...props} />);
    const formControl1 = wrapper.find(FormControlLabel).at(0);
    const formControl2 = wrapper.find(FormControlLabel).at(1);
    formControl1.props().control.props.onChange(event);
    formControl2.props().control.props.onChange(event);
    formControl1.props().control.props.onChange({ target: { checked: false } });
    expect(wrapper.state()).toEqual({ party1: false, party2: true });
  });
});
