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
  }
`;

const Card = styled('div')`
  width: 100%;
  background: var(--color-bg-gray);
  display: flex;
  padding: 20px;
  border: var(--border);
  h3 {
    font-family: 'Roboto';
    font-weight: condensed;
  }
  min-height: ${pxToRem(700)};
`;

const Positioner = styled('div')`
  width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  justify-content: space-around;
  .fancy-button {
    width: 100%;
  }
  /* border: 1px solid red; */
`;
const LeftContainer = styled('div')`
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  justify-content: center;
  border: var(--border);
  border-right: 0;
  background: var(--color-bg-light);
`;

const RightContainer = styled('div')`
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: var(--border);
  border-left: 0;
  background: var(--color-bg-light);
`;

const Checkbox = styled('input')`
  color: #393534;
`;

const UserCard = styled('div')`
  border: 1px solid var(--color-border);
`;

const ThumbNail = styled('img')`
  width: ${pxToVw(125 * 0.9)};
  margin: 0 auto;
  height: auto;
  object-fit: cover;
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
