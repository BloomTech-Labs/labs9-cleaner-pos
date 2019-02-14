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
  background: var(--color-bg-secondary);
  color: var(--color-text-dark);
  box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  border-radius: var(--border-radius);
  margin-bottom: 2.25rem;
  /* Sizing */
  height: ${pxToRem(168)};
  border: var(--border-alt);
  /* Flex */
  display: flex;
  /* Text */
  text-align: left;
  /* Hover Effects */
  /* transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.025);
  } */
  .button__see-more {
    width: 100%;
  }
  h1 {
    margin: 1rem 0;
  }
  .check-boxes {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  @media only screen and (max-width: ${bp}) {
    width: 100%;
    height: 100%;
    /* Flex */
    flex-direction: column;
    align-items: flex-start;
    .check-boxes {
      flex-flow: row wrap;
      margin-bottom: 1rem;
    }
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
  .new-ast__button {
    background: var(--color-accent);
    width: 200px;
    height: 40px;
    padding: 0.5rem 1rem;
    font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
    font-size: 1.25rem;
  }
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
  width: 18.75rem;
  height: 100%;
  object-fit: cover;
  border-radius: 5px 0 0 5px;
`;

const CardHeading = styled('div')`
  width: 100%;
  line-height: 0.5;
  margin-bottom: 0.5rem;
  h1 {
    font-size: 1.25rem;
    color: var(--color-text-accent);
  }
  p {
    font-size: 1rem;
  }
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

const InfoBox = styled('div')`
  /* Sizing */
  height: ${boxHeight};
  width: ${boxWidth};
  border: var(--border);
  border-radius: var(--border-radius);
  /* Text */
  text-align: center;
  font-size: 1.5rem;
  font-weight: light;
  line-height: 1.25;
  /* Flex */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  /* Color */
  background-color: var(--color-bg-secondary);
  p {
    margin: 0;
    font-size: 1rem;
    font-weight: normal;
  }
  .secondary {
    color: var(--color-text-accent);
  }
  @media screen and (max-width: 550px) {
    width: 45%;
  }
`;

const AssistantHeader = styled('span')`
  font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-size: 2.25rem;
  top: 0;
  left: 0;
  text-align: left;
  align-items: flex-start;
`;

const AssistantDetailContainer = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  .container-map {
    width: 65%;
    height: 75vh;
  }
  .my-leaflet-map-container img {
    max-height: none;
  }
  .leaflet-pane {
    img {
      position: absolute;
    }
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
    /* line-height: 1; */
  }
  .detail-txt h3 {
    font-family: 'Roboto Light', Arial, Helvetica, sans-serif;
    font-weight: lighter;
  }
  @media screen and (max-width: 700px) {
    /* In smaller screens, make page columnar.
       Have map and AsstDetail swap places */
    flex-direction: column;
    .container-map {
      /* Flex */
      order: -1;
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
  }
`;

const AssistantBar = styled('div')`
  /* Size */
  padding-right: 0.5rem;
  width: 35%;
  max-width: 21rem;
  /* Flex */
  display: flex;
  flex-direction: column;
  /* background: var(--color-bg-secondary); */

  .button-group {
    /* Sizing */
    /* Flex */
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    .deleteButton {
      margin-top: 5px;
    }
  }
  @media screen and (max-width: 700px) {
    margin-top: ${pxToRem(10)};
    width: 100%;
    max-width: 100%;
    padding: 0;
    img {
      height: 100%;
    }
    .button-group {
      flex-direction: row;
      justify-content: space-around;
      margin-bottom: 1rem;
    }
  }
  @media only screen and (max-width: 430px) {
    .button-group {
      flex-direction: column;
      align-items: center;
      button {
        margin-bottom: 5px;
      }
    }
  }
`;

const AsstDetail = styled('div')`
  height: 6rem;
  color: var(--color-text-dark);
  background: var(--color-bg-secondary);
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 700px) {
    /* margin-left: 2rem; */
    border-radius: var(--border-radius);
  }
`;

const AsstProperty = styled('div')`
  /* Sizing */
  width: 100%;
  /* Flex */
  display: flex;
  flex-direction: column;
  .deleteButton {
    background-color: var(--color-error);
    margin-bottom: ${pxToRem(5)};
  }
  @media screen and (max-width: 700px) {
    .deleteButton {
      margin-bottom: ${pxToRem(1)};
    }
  }
`;

const PropertyContainer = styled('div')`
  /* Size */
  border: var(--border);
  margin-top: 1rem;
  padding-left: 2rem;
  box-shadow: var(--box-shadow);
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
    width: ${pxToRem(75)};
    /* Text */
    font-size: 1rem;
    /* Color */
    color: var(--color-accent);
    background-color: var(--color-bg-secondary);
  }
  @media only screen and (max-width: 700px) {
  }
`;

const PropertyHeading = styled('div')`
  /* Size */
  border-radius: var(--border-radius);
  /* Flex */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  /* Color */
  color: var(--color-text-accent);
  /* Text */
  text-align: left;
  h2 {
    font-size: 1rem;
    margin: 0.5rem 0 0.5rem 0;
  }
`;

const PropertyList = styled.div`
  /* Sizing */
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
  &:hover .pointer {
    cursor: pointer;
  }
`;

const ModalStyle = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  outline: none;
  padding: 0 0 2rem 0;
  .modalButton {
    position: absolute;
    bottom: 5%;
    right: 10%;
  }
`;

export {
  AssistantItem,
  AssistantDetailContainer,
  ButtonContainer,
  ThumbNail,
  CardHeading,
  CardBody,
  InfoBox,
  AssistantHeader,
  HeaderWrapper,
  AssistantBar,
  AsstDetail,
  AsstProperty,
  PropertyContainer,
  PropertyHeading,
  PropertyList,
  HouseItem,
  ModalStyle,
};
