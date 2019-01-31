import styled from '@emotion/styled';
import { Container } from '../../components/';

const pxToRem = (px: number): string => `${px / 16}rem`;
const pxToVw = (px: number): string => `${(px / 1080) * 100}vw`;
// Some size constants
const boxHeight = '5rem';
const boxWidth: string = `30%`;
const bp = `650px`;

const AssistantItem = styled('div')`
  /* Color */
  background: white;
  color: var(--color-main-black);

  /* Sizing */
  height: ${pxToRem(188)};
  border: 0.5px solid var(--color-border);

  /* Flex */
  display: flex;

  /* Text */
  text-align: left;

  .check-boxes {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  @media screen and (max-width: ${bp}) {
    width: 100%;
    height: 100%;
    /* Flex */
    flex-direction: column;
    align-items: flex-start;

    .check-boxes {
      flex-flow: row wrap;
      margin-bottom: 1rem;
    }
  }

  @media only screen and (max-width: ${bp}) {
    .list-img {
      margin: 1rem auto 0 auto;
      width: 4.5rem;
      border-radius: 100%;
      object-fit: cover;
    }
  }
`;

const HeaderWrapper = styled('div')`
  /* Flex */
  display: flex;
  justify-content: space-between;

  /* Sizing */
  margin-bottom: 2.25rem;

  @media only screen and (max-width: ${bp}) {
    flex-direction: column;
    align-items: center;
    button {
      margin-top: 1.125rem;
    }
  }
`;

const ButtonContainer = styled('div')`
  /* Sizing */
  margin: 0 0 0 0.75rem;
  width: ${boxWidth};
  height: ${pxToRem(42)};
  /* Flex */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* Text */
  font-size: ${pxToRem(20)};

  @media screen and (max-width: 550px) {
    margin: auto;
    margin: 1rem 0;
    flex-basis: 100%;
    width: 100%;

    button {
      width: 100%;
      max-width: 550px;
    }
  }
`;

const ThumbNail = styled('img')`
  width: ${pxToVw(254 * 0.9)};
  height: auto;
  object-fit: cover;
`;

const CardHeading = styled('div')`
  width: 100%;
  line-height: 0.5;
  margin-bottom: 1rem;
  @media only screen and (max-width: ${bp}) {
    text-align: center;
  }
`;

const CardBody = styled('div')`
  padding: 0 2.25rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  @media only screen and (max-width: ${bp}) {
    margin: 0;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const CheckList = styled('div')`
  /* Sizing */
  height: ${boxHeight};
  width: ${boxWidth};
  border: 0.5px solid var(--color-border);
  /* Text */
  text-align: center;
  font-size: 1.5rem;
  font-weight: light;
  /* Flex */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  p {
    margin: 0;
    font-weight: bold;
  }
  .secondary {
    color: var(--color-accent);
  }
  @media screen and (max-width: 550px) {
    width: 45%;
  }
`;

const Asst = styled('div')`
  /* Sizing */
  width: ${boxWidth};
  height: ${boxHeight};
  border: var(--border);
  /* Text */
  text-align: center;
  font-size: 1.5rem;
  font-weight: light;
  /* Flex */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .secondary {
    color: var(--color-accent);
  }
  p {
    margin: 0;
    font-weight: bold;
  }
  @media screen and (max-width: 550px) {
    width: 45%;
  }
`;

const AssistantHeader = styled('span')`
  font-size: 1.8rem;
  top: 0;
  left: 0;
  text-align: left;
  align-items: flex-start;
  max-width: 18.125rem;
`;

const AssistantDetailContainer = styled(Container)`
  display: flex;
  flex-direction: row;

  .container-map {
    width: 70%;
  }

  .detail-img {
    width: 96px;
    height: 96px;
  }

  .detail-txt {
    /* Sizing */
    padding-left: 1rem;
    /* Text */
    text-align: left;
    line-height: 0.5;
  }

  .detail-txt h3 {
    font-family: 'Roboto Light', Arial, Helvetica, sans-serif;
    font-weight: lighter;
  }

  .button-group {
    /* Sizing */
    margin: 1rem 0;
    /* Flex */
    display: flex;
    justify-content: space-between;
  }

  .button-group button {
    font-size: 1rem;
  }

  @media screen and (max-width: 700px) {
    /* In smaller screens, make page columnar.
       Have map and AsstDetail swap places */
    flex-direction: column;

    .container-map {
      /* Flex */
      order: 1;
      /* Sizing */
      width: 100%;
      height: 40vh;
      /* Sticky */
      /* Note to self:
         TEST THIS, as support is shaky across browsers
         !important used to override position: relative
         in Leaflet's own CSS
      */
      position: -webkit-sticky !important; /* Safari */
      position: sticky !important;
      top: 0 !important;
    }

    .assistant-card {
      /* Flex */
      order: 2;
      /* Sizing */
      width: 100%;
    }

    .detail-img {
      width: 72px;
      height: 72px;
    }

    .button-group {
      margin: 0;
    }
  }
`;

const AssistantBar = styled('div')`
  /* Size */
  padding-right: 0.5rem;
  height: 54rem;
  width: 21rem;
  /* Flex */
  display: flex;
  flex-direction: column;
`;

const AsstDetail = styled('div')`
  height: 6rem;
  color: var(--color-text-dark);
  background: var(--color-main-background);
  display: flex;
  flex-direction: row;
`;

const AsstProperty = styled('div')`
  /* Sizing */
  width: 100%;

  /* Flex */
  display: flex;
  flex-direction: column;
`;

const PropertyContainer = styled('div')`
  /* Size */
  border: 0.5px solid var(--color-border);
  margin: 1rem 0;
  /* Flex */
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  /* Color */
  background: white;

  .button-new {
    /* Sizing */
    padding: 0.25rem 0.5rem;
    margin-right: 1rem;
    /* Text */
    font-size: 1rem;
    /* Color */
    color: var(--color-button-text-alt);
    background-color: var(--color-button-background-alt);
  }
`;

const PropertyHeading = styled('div')`
  /* Size */
  border-bottom: 1px solid var(--color-border);
  padding-left: 1rem;
  /* Flex */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  /* Color */
  color: var(--color-text-light);
  background: var(--color-accent);
  /* Text */
  text-align: left;

  h2 {
    font-size: 1rem;
  }
`;

const PropertyList = styled.div`
  /* Sizing */
  padding: 0.75rem 0 0.75rem 0.75rem;
  /* Text */
  text-align: left;
`;

const HouseItem = styled.p`
  .hide {
    display: none;
  }

  &:hover .hide {
    display: inline-block;
    margin-left: 1rem;
  }
`;

export {
  AssistantItem,
  AssistantDetailContainer,
  ButtonContainer,
  ThumbNail,
  CardHeading,
  CardBody,
  CheckList,
  Asst,
  AssistantHeader,
  HeaderWrapper,
  AssistantBar,
  AsstDetail,
  AsstProperty,
  PropertyContainer,
  PropertyHeading,
  PropertyList,
  HouseItem,
};
