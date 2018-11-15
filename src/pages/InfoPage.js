import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Image from 'material-ui-image';
import InfoSteps from '../components/InfoSteps';
import InfoImport from '../images/infoImport.png';
import InfoCreateCategories from '../images/infoCreateCategories.png';
import InfoCategorization from '../images/infoCategorization.png';
import InfoVisualization from '../images/infoVisualization.png';
import InfoExport from '../images/infoExport.png';

const Container = styled.div`
  text-align: center;
  h2 {
    margin: 3rem;
  }
`;

const ImageStyle = { width: '100%', height: 'auto', 'object-fit': 'cover' };
const TypoStyle = { variant: 'h6', color: 'textSecondary' };

const InfoPage = () => {
  const steps = [
    {
      id: 1,
      label: <FormattedMessage id="navigation.import" />,
      content: (
        <Typography {...TypoStyle}>
          <FormattedMessage id="info.import" />
          <Image src={InfoImport} imageStyle={ImageStyle} />
        </Typography>
      )
    },
    {
      id: 2,
      label: <FormattedMessage id="info.createCategoriesHeader" />,
      content: (
        <Typography {...TypoStyle}>
          <FormattedMessage id="info.createCategories" />
          <Image src={InfoCreateCategories} imageStyle={ImageStyle} />
        </Typography>
      )
    },
    {
      id: 3,
      label: <FormattedMessage id="navigation.categorization" />,
      content: (
        <Typography {...TypoStyle}>
          <FormattedMessage id="info.categorization" />
          <Image src={InfoCategorization} imageStyle={ImageStyle} />
        </Typography>
      )
    },
    {
      id: 4,
      label: <FormattedMessage id="navigation.visualization" />,
      content: (
        <Typography {...TypoStyle}>
          <FormattedMessage id="info.visualization" />
          <Image src={InfoVisualization} imageStyle={ImageStyle} />
        </Typography>
      )
    },
    {
      id: 5,
      label: <FormattedMessage id="navigation.export" />,
      content: (
        <Typography {...TypoStyle}>
          <FormattedMessage id="info.export" />
          <Image src={InfoExport} imageStyle={ImageStyle} />
        </Typography>
      )
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
