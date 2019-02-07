import styled from '@emotion/styled';
// Components
import DropDown from '../../components/DropDown';

const cardHeight = 168;
const pxToRem = (px: number): string => `${px / 16}rem`;
const bp = `816px`;

const PropContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .new-property__button {
    background: var(--color-accent);
  }

  .properties-header {
    /* Box Model */
    width: 100%;
    /* Flex */
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-end;
  }

  @media only screen and (max-width: ${bp}) {
    .properties-header {
      flex-flow: column nowrap;
      align-items: flex-start;
    }
  }
`;

const HouseItem = styled('div')`
  max-width: ${1136 * 0.9}px;
  height: ${cardHeight}px;
  width: 100%;
  padding-left: 1px;
  margin-top: 2.25rem;
  display: flex;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  border-radius: var(--border-radius);
  background-color: var(--color-bg-secondary);

  /* Hover Effects */
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.025);
  }

  @media only screen and (max-width: ${bp}) {
    flex-direction: column;
    flex: 1;
    width: 85%;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  @media only screen and (max-width: 625px) {
    width: 95%;
  }
`;

const ButtonContainer = styled('div')`
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .property-button {
    width: ${pxToRem(166)};
    font-size: 1.25rem;
    padding: 0.25rem 1rem;
  }
  @media only screen and (max-width: ${bp}) {
    /* padding: 10px 0 10px 0; */
    grid-row: 2;
    grid-column: span 2;
    margin: 0 auto 2rem auto;

    .property-button {
      width: 50vw;
      max-width: ${bp};
    }
  }
`;

const ThumbNail = styled('img')`
  object-fit: cover;
  width: 35%;
  height: ${pxToRem(cardHeight - 1)};
  margin-right: 2rem;
  border-radius: var(--border-radius) 0 0 var(--border-radius);

  @media only screen and (max-width: ${bp}) {
    margin: 0;
    width: 100%;
    height: 6rem;
  }
`;

const CardHeading = styled('div')`
  margin-top: 12px;

  h4 {
    margin: 0;
    color: var(--color-text-accent);
    font-family: Roboto;
    font-weight: bold;
    font-size: 1.5rem;
  }

  p {
    font-weight: light;
    font-size: 1rem;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  @media only screen and (max-width: ${bp}) {
    grid-column: span 2;
    grid-row: 1;
    padding-left: 1rem;
    margin-bottom: 1rem;
    h4 {
      text-align: left;
    }
    p {
      text-align: left;
    }
  }
`;
const CardContent = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media only screen and (max-width: ${bp}) {
    justify-content: space-around;
    align-items: flex-start;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1.5rem;
    grid-gap: 1.5rem;
    justify-items: center;
  }
`;

const InfoBox = styled('div')`
  /* Sizing */
  height: 5rem;
  width: 30%;
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
    min-width: 80px;
  }
`;

const Assistant = styled(DropDown)`
  width: 30%;

  @media only screen and (max-width: ${bp}) {
    width: ${pxToRem(160)};
    padding: 1.25rem;
    grid-row: 1;
    grid-column: 2;
  }
`;

const HouseHeader = styled('h2')`
  font-size: 2.25rem;
  font-weight: normal;
  text-align: left;
  max-width: 290px;
  /* margin-bottom: 1.5rem; */
  @media only screen and (max-width: 500px) {
    margin: 0 0 1.5rem 0;
  }
  @media only screen and (max-width: ${bp}) {
    margin: 0 0 1.5rem 0;
    text-align: center;
  }
`;

export {
  PropContainer,
  HouseHeader,
  HouseItem,
  CardBody,
  InfoBox,
  ThumbNail,
  CardContent,
  ButtonContainer,
  CardHeading,
  Assistant,
};
