import styled from '@emotion/styled';
const pxToRem = (px: number): string => `${px / 16}rem`;
const pxToVw = (px: number): string => `${(px / 1080) * 100}vw`;

const Header = styled('span')`
  width: 100%;
  background: var(--color-bg-accent);
  text-align: left;
  h2 {
    padding-left: 32px;
    color: white;
    margin: 0.5rem 0 0.5rem 0;
  }
  h3 {
    padding-left: 16px;
    color: white;
    margin: 0.5rem 0 0.5rem 0;
  }
`;

const Card = styled('div')`
  width: 100%;
  background: var(--color-bg-secondary);
  display: flex;
  border: var(--border);

  h3 {
    font-family: 'Roboto';
    font-weight: condensed;
  }
  min-height: ${pxToRem(800)};

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    padding: 0;
  }
`;

const Positioner = styled('div')`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  @media only screen and (max-width: 1000px) {
    button {
      width: 150px;
    }
  }
`;
const LeftContainer = styled('div')`
  width: 30%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-right: var(--border);

  @media only screen and (max-width: 700px) {
    width: 100%;
    margin: 0;

    .left-mob {
      flex-direction: row;
    }
  }
  @media only screen and (max-width: 500px) {
    .left-mob {
      flex-direction: column;
    }
  }
`;

const RightContainer = styled('div')`
  width: 70%;
  margin: 0 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .reg {
  }
  @media only screen and (max-width: 700px) {
    width: 100%;
    margin: 15px 0 0 0;
  }
`;

const Checkbox = styled('input')`
  color: #393534;
`;

const UserCard = styled('div')`
  width: 100%;
  text-align: left;

  .line-item {
    display: flex;
    flex-direction: row;
    margin: 0 10px 0 10px;
    padding: 7px;
    border-bottom: var(--border);
  }
  span {
    width: 120px;
  }
  .line-info {
    text-transform: capitalize;
  }
  .small-button {
    height: 20px;
    width: 75px;
    padding: 0;
    margin-bottom: 5px;
  }
  div {
  }
`;

const ThumbNail = styled('img')`
  max-width: 150px;
  width: ${pxToVw(125 * 0.9)};
  margin: 0 auto;
  height: auto;
  object-fit: cover;
  @media only screen and (max-width: 1000px) {
    width: 130px;
  }
`;

export {
  Card,
  Checkbox,
  Header,
  LeftContainer,
  Positioner,
  RightContainer,
  ThumbNail,
  UserCard,
};

// Git message test here
