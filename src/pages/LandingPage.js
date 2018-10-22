import React from 'react';
import styled from 'styled-components';

import IntroFeatures from '../components/IntroFeatures';
import {FormattedMessage} from 'react-intl';
import {ThreeSixty, SettingsEthernet, Language} from '@material-ui/icons';

const Container = styled.div`
  text-align: center;
  h2 {
    margin: 3rem;
  }
`;

const features = [
  {
    title: <Container><ThreeSixty/><FormattedMessage id="landingPage.features.1.header"/></Container>,
    description: <FormattedMessage id="landingPage.features.1.description"/>
  },
  {
    title: <Container><SettingsEthernet /><FormattedMessage id="landingPage.features.2.header"/></Container>,
    description: <FormattedMessage id="landingPage.features.2.description"/>
  },
  {
    title: <Container><Language /><FormattedMessage id="landingPage.features.3.header"/></Container>,
    description: <FormattedMessage id="landingPage.features.3.description"/>
  }
];

const LandingPage = () => (
  <Container>
    <IntroFeatures header={<FormattedMessage id="landingPage.header"/>} intro={<FormattedMessage id="landingPage.intro"/>} features={features}/>
  </Container>
);

export default LandingPage;
