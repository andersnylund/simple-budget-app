import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Image from 'material-ui-image';
import InfoSteps from '../components/InfoSteps';
import Privacy from '../images/privacy.png';

const Container = styled.div`
  text-align: center;
  h2 {
    margin: 3rem;
  }
`;

const InfoPage = () => {
  // TODO: To be added once all the features are finalized
  const steps = [
    {
      id: 1,
      label: <FormattedMessage id="navigation.import" />,
      content: <Image src={Privacy} />
    },
    {
      id: 2,
      label: <FormattedMessage id="navigation.categorization" />,
      content: <Image src={Privacy} />
    },
    {
      id: 3,
      label: <FormattedMessage id="navigation.visualization" />,
      content: <Image src={Privacy} />
    },
    {
      id: 4,
      label: <FormattedMessage id="navigation.export" />,
      content: <Image src={Privacy} />
    }
  ];

  return (
    <Container>
      <Typography variant="h2">Info</Typography>
      <InfoSteps steps={steps} />
    </Container>
  );
};

export default InfoPage;
