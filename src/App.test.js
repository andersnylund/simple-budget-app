import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import LandingPage from './pages/LandingPage';
import ImportPage from './pages/ImportPage';
import NavigationAppBar from './components/NavigationAppBar';
import InfoPage from './pages/InfoPage';

describe('<App />', () => {
  it('renders without crashing', () => {
    const app = shallow(<App activePageIndex={0} />);

    expect(app.find(LandingPage).exists()).toBe(true);
    expect(app.find(NavigationAppBar).exists()).toBe(true);
  });

  it('shows the landing page', () => {
    const app = shallow(<App activePageIndex={0} />);

    expect(app.find(LandingPage).exists()).toBe(true);
    expect(app.find(ImportPage).exists()).toBe(false);
  });

  it('changes page', () => {
    const app = shallow(<App activePageIndex={1} />);

    expect(app.find(LandingPage).exists()).toBe(false);
    expect(app.find(InfoPage).exists()).toBe(true);
  });
});
