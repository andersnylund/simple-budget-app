import React from 'react';
import { shallow } from 'enzyme';
import BottomNavigation from '../components/BottomNavigation';
import App from '../App';
import LandingPage from '../pages/LandingPage';
import ImportPage from '../pages/ImportPage';
import InfoPage from '../pages/InfoPage';

let props;
let initialTransactions;

describe('<App />', () => {
  beforeEach(() => {
    props = {
      saveStateToLocalStorage: jest.fn(),
      hydrateStateWithLocalStorage: jest.fn()
    };

    initialTransactions = [
      {
        date: new Date().toISOString(),
        party: 'test',
        amount: '10'
      }
    ];
  });

  it('renders without crashing', () => {
    const app = shallow(<App {...props} />);

    expect(app.find(LandingPage).exists()).toBe(true);
    expect(app.find(BottomNavigation).exists()).toBe(true);
  });

  it('calls hydrateLocalStorage when mounted', () => {
    const app = shallow(<App {...props} />);
    app.instance().componentDidMount();
    expect(props.hydrateStateWithLocalStorage.mock.calls.length).toBeGreaterThan(0);
  });

  it('saves the state when unmounted', () => {
    const app = shallow(<App {...props} />);
    app.instance().componentWillUnmount();
    expect(props.saveStateToLocalStorage.mock.calls.length).toBeGreaterThan(0);
  });

  it('shows the landing page', () => {
    const app = shallow(<App {...props} />);

    expect(app.find(LandingPage).exists()).toBe(true);
    expect(app.find(ImportPage).exists()).toBe(false);
  });

  it('changes page', () => {
    const app = shallow(<App {...props} />);

    app.instance().changePage(1);
    expect(app.find(LandingPage).exists()).toBe(false);
    expect(app.find(InfoPage).exists()).toBe(true);
  });

  it('sets the initial transactions and calls "setUniqueParties()"', () => {
    const app = shallow(<App {...props} />);

    const spyOnSetUniqueParties = jest.spyOn(app.instance(), 'setUniqueParties');
    app.instance().setInitialTransactions(initialTransactions);
    expect(spyOnSetUniqueParties).toHaveBeenCalled();
  });
});
