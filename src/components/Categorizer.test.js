import { Button } from '@material-ui/core';
import Context from '../Context';

let wrapper;

const getWrapper = () => {
  const component = (
    <Context.Provider value={props}>
      <Categorizer />
    </Context.Provider>
  );
};

describe('<Categorizer />', () => {
  beforeEach(() => {
    props = {
      userState: {
        uniqueParties: ['party1', 'party2'],
        categories: [
          {
            title: 'category1',
            parties: []
          },
          {
            title: 'category2',
            parties: []
          }
        ]
      },
      updateCategories: jest.fn()
    };

    wrapper = getWrapper();
  });

  it('should render correctly', () => {
    expect(wrapper.find(PartyList).exists()).toBe(true);
    expect(wrapper.find(CategoryList).exists()).toBe(true);
    expect(wrapper.find(Button).exists()).toBe(true);
  });

  it('should update selectedParties', () => {
    wrapper.instance().setSelectedParties(['party1']);
    expect(wrapper.state().selectedParties).toEqual(['party1']);
  });

  it('should update activeCategory', () => {
    wrapper.instance().setActiveCategory('category1');
    expect(wrapper.state().activeCategory).toEqual('category1');
  });

  it('should categorize parties', () => {
    const { userState, updateCategories } = props;

    expect(wrapper.state().selectedParties).toEqual([]);

    wrapper.instance().setSelectedParties(['party1']);
    wrapper.instance().setActiveCategory('category1');
    wrapper.instance().updateState(userState, updateCategories);

    expect(wrapper.state().selectedParties).toEqual([]);
    expect(wrapper.state().activeCategory).toEqual('category1');

    expect(updateCategories.mock.calls[0][0]).toEqual([
      {
        parties: [],
        title: 'category2'
      },
      {
        parties: ['party1'],
        title: 'category1'
      }
    ]);
  });

  it('unCategorizedParties() should return correct value', () => {
    props.userState.categories = [
      {
        title: 'category1',
        parties: ['party1']
      },
      {
        title: 'category2',
        parties: []
      }
    ];

    wrapper = getWrapper();

    expect(wrapper.instance().unCategorizedParties(props.userState)).toEqual(['party2']);
  });
});
