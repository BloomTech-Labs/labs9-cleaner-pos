import styled from '@emotion/styled';

const cardHeight = 168;
const pxToRem = (px: number): string => `${px / 16}rem`;
const bp = `816px`;

const PropContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .new-property__button {
    background: var(--color-accent-alt);
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
  border-radius: 5px;
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
  border-radius: 5px 0 0 5px;

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
    color: var(--color-text-accent-dark);
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

const CheckList = styled('div')`
  background-color: var(--color-bg-main);
  padding: 0.5rem 1rem;
  text-align: center;
  border: var(--border);
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
    color: var(--color-text-accent);
    font-size: 1rem;
    font-weight: 400;
  }

  @media only screen and (max-width: ${bp}) {
    padding: 0.75rem;
    margin: 0;
    grid-column: 1;
    grid-row: 1;
  }
`;

const Assistant = styled('div')`
  width: ${pxToRem(184)};
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: var(--border);
  padding: 1rem;
  /* Color */
  background-color: var(--color-bg-main);
  /* Text */
  font-weight: bolder;

  label {
    /* Color */
    color: var(--color-text-accent);
    /* Text */
    font-size: 1rem;
  }

  select {
    width: 100%;
    margin-top: 0.5rem;
    border: none;
    border-bottom: 1px solid var(--color-border-strong);
    /* Color */
    background-color: var(--color-bg-accent-light);
    /* Text */
    font-size: 1rem;
  }

  @media only screen and (max-width: ${bp}) {
    width: ${pxToRem(160)};
    padding: 20px 0 20px 0;
    grid-row: 1;
    grid-column: 2;
  }
`;

const HouseHeader = styled('span')`
  font-size: 2rem;
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
  ThumbNail,
  CardContent,
  ButtonContainer,
  CardHeading,
  Assistant,
  CheckList,
};
