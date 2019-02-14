import styled from '@emotion/styled';
// Components
import DropDown from '../../components/DropDown';

const cardHeight = 168;
const desktopHeight = '80%';
const mobileWidth = '80%';

const pxToRem = (px: number): string => `${px / 16}rem`;
const bp = `900px`;

const PropContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .new-property__button {
    background: var(--color-accent);
    height: 40px;
    padding: 0.5rem 1rem;
    font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
    font-size: 1.25rem;
  }
  .properties-header {
    /* Box Model */
    width: 100%;
    /* Flex */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    h2 {
      margin: 0;
    }
    @media only screen and (max-width: ${bp}) {
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      h2 {
        margin: 0 0 1.25rem 0;
      }
    }
  }
`;

const HouseHeader = styled('h2')`
  font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-size: 2.25rem;
  /* margin-bottom: 1.5rem; */
  /* @media only screen and (max-width: ${bp}) {
    margin: 0 0 1.5rem 0;
    text-align: center;
  }
  @media only screen and (max-width: 500px) {
    margin: 0 0 1.5rem 0;
  } */
`;

const HouseItem = styled('div')`
  width: 100%;
  height: ${pxToRem(168)};
  margin-top: 2.25rem;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  border-radius: var(--border-radius);
  background-color: var(--color-bg-secondary);
  /* Hover Effects */
  /* transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.025);
  } */
  /* Grid */
  display: grid;
  column-gap: 1rem;
  row-gap: 0.5rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'thumbnail cardHeading cardHeading .'
    'thumbnail infoBox     dropDown    buttons';
  @media only screen and (max-width: ${bp}) {
    height: 100%;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, 1fr);
    grid-template-areas:
      'thumbnail   thumbnail'
      'cardHeading cardHeading'
      'infoBox     dropDown'
      'buttons     buttons';
  }
  @media only screen and (max-width: 600px) {
    grid-template-rows: repeat(5, 1fr);
    grid-template-areas:
      'thumbnail   thumbnail'
      'cardHeading cardHeading'
      'infoBox     infoBox'
      'dropDown    dropDown'
      'buttons     buttons'
      'buttons     buttons';
  }
`;

const ThumbNail = styled('img')`
  grid-area: thumbnail;
  width: 100%;
  height: ${pxToRem(168)};
  object-fit: cover;
  margin-right: 2rem;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  @media only screen and (max-width: ${bp}) {
    margin: 0;
    width: 100%;
    height: 6rem;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }
`;

const CardContent = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media only screen and (max-width: ${bp}) {
  }
`;

const CardHeading = styled('div')`
  grid-area: cardHeading;
  align-self: flex-end;
  height: ${desktopHeight};
  h4 {
    margin: 0;
    color: var(--color-text-accent);
    font-family: Roboto;
    font-weight: bold;
    font-size: 1.25rem;
  }
  p {
    font-weight: light;
    font-size: 1rem;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  @media only screen and (max-width: ${bp}) {
    justify-self: start;
    margin-left: 2rem;
    h4 {
      text-align: left;
    }
    p {
      text-align: left;
    }
  }
  @media only screen and (max-width: 600px) {
    h4 {
      font-size: 1rem;
    }
    p {
      font-size: 0.75rem;
    }
  }
`;

const CardBody = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 2rem;
  @media only screen and (max-width: ${bp}) {
    /* flex-direction: column;
    flex: 1; */
    margin: auto;
  }
`;

const InfoBox = styled('div')`
  grid-area: infoBox;
  /* Sizing */
  height: ${desktopHeight};
  width: 100%;
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
  @media only screen and (max-width: ${bp}) {
    height: 100%;
    width: ${mobileWidth};
    justify-self: start;
    margin-left: 2rem;
  }
  @media only screen and (max-width: 600px) {
    margin: 0;
    justify-self: center;
  }
`;

const Assistant = styled(DropDown)`
  grid-area: dropDown;
  height: ${desktopHeight};
  width: 100%;
  @media only screen and (max-width: ${bp}) {
    height: 100%;
    width: ${mobileWidth};
  }
`;

const ButtonContainer = styled('div')`
  grid-area: buttons;
  height: ${desktopHeight};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .property-button {
    width: ${pxToRem(166)};
    font-size: 1rem;
    padding: 0.25rem 1rem;
  }
  @media only screen and (max-width: ${bp}) {
    width: ${mobileWidth};
    height: 100%;
    margin-bottom: 2rem;
    justify-self: center;
    .property-button {
      width: 50vw;
      max-width: ${bp};
    }
  }
`;

const HouseItemF = styled('div')`
  width: 100%;
  height: ${pxToRem(168)};
  padding: 1rem;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 2.25rem;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  border-radius: var(--border-radius);
  background-color: var(--color-bg-secondary);
  font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-size: 2.25rem;
  color: var(--color-accent);
  .filler {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    color: var(--color-accent);
  }
  .logo-holder {
    height: 100%;
  }
  .filler-icon {
    margin: 0 5rem 0 5rem;
  }
  .fa-angle-double-up {
    color: var(--color-accent);
    font-size: 5rem;
  }
  @media only screen and (max-width: ${bp}) {
    width: 100%;
    flex-direction: column;
    padding: 0;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    .filler {
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
    }
    .logo-holder {
      height: 60%;
    }
    .filler-text {
      margin: 0 0 1.5rem 0;
      text-align: center;
      font-size: 1.5rem;
    }
    .filler-icon {
      width: 100%;
      margin: 0;
      padding-left: 20%;
    }
  }
`;

export {
  PropContainer,
  HouseHeader,
  HouseItem,
  HouseItemF,
  CardBody,
  InfoBox,
  ThumbNail,
  CardContent,
  ButtonContainer,
  CardHeading,
  Assistant,
};
