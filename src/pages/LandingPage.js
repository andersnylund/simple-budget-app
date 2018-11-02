import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { ThreeSixty, SettingsEthernet, Language } from '@material-ui/icons';
import Image from 'material-ui-image';
import IntroFeatures from '../components/IntroFeatures';
import Graph from '../images/graph.png';
import Privacy from '../images/privacy.png';
import Localize from '../images/localize.png';

const Container = styled.div`
  text-align: center;
  padding: 1rem;
`;

const features = [
  {
    id: 1,
    title: (
      <Container>
        <ThreeSixty />
        <FormattedMessage id="landingPage.features.1.header" />
      </Container>
    ),
    description: (
      <Container>
        <Container>
          <Image src={Graph} />
        </Container>
        <FormattedMessage id="landingPage.features.1.description" />
      </Container>
    )
  },
  {
    id: 2,
    title: (
      <Container>
        <SettingsEthernet />
        <FormattedMessage id="landingPage.features.2.header" />
      </Container>
    ),
    description: (
      <Container>
        <Container>
          <Image src={Privacy} />
        </Container>
        <FormattedMessage id="landingPage.features.2.description" />
      </Container>
    )
  },
  {
    id: 3,
    title: (
      <Container>
        <Language />
        <FormattedMessage id="landingPage.features.3.header" />
      </Container>
    ),
    description: (
      <Container>
        <Container>
          <Image src={Localize} />
        </Container>
        <FormattedMessage id="landingPage.features.3.description" />
      </Container>
    )
  }
];

const LandingPage = () => (
  <Container>
    <IntroFeatures
      header={<FormattedMessage id="landingPage.header" />}
      intro={<FormattedMessage id="landingPage.intro" />}
      features={features}
    />
  </Container>
);

export default LandingPage;
