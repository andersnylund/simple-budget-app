import React from 'react';
import { mount } from 'enzyme';
import PreviousDataReader from './PreviousDataReader';
import Context from '../Context';

let props;
let event;
let jsonData;

describe('<PreviousDataReader />', () => {
  beforeEach(() => {
    props = {
      setCategories: jest.fn(),
      setUniqueParties: jest.fn()
    };
    jsonData = {
      categories: [
        {
          title: 'Category 1',
          parties: []
        },
        {
          title: 'Category 2',
          parties: ['Party 1', 'Party 2']
        }
      ],
      uniqueParties: ['Party 1', 'Party 2']
    };
    event = {
      target: {
        files: [new File([...JSON.stringify(jsonData)], 'test.json', { type: 'application/json' })]
      }
    };
  });

  it('should set data correctly', async () => {
    const wrapper = mount(
      <Context.Provider value={props}>
        <PreviousDataReader />
      </Context.Provider>
    );

    const input = wrapper.find('StyledInput');
    await input.props().onChange(event);

    expect(props.setCategories.mock.calls[0][0]).toEqual(jsonData.categories);
    expect(props.setUniqueParties.mock.calls[0][0]).toEqual(jsonData.uniqueParties);
  });
});
