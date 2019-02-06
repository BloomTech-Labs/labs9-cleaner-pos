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
  h3 {
    padding-left: 16px;
    color: white;
  }
`;

const Card = styled('div')`
  width: 100%;
  background: var(--color-bg-main);
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
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  border: ${(props: any) =>
    props.outline ? '1px solid var(--color-border)' : null};
  .fancy-button {
    width: 100%;
  }
  .;
`;
const LeftContainer = styled('div')`
  width: 30%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
`;

const RightContainer = styled('div')`
  width: 70%;
  /* padding: 20px; */
  margin: 0 0 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex_start;
  border: 1px solid var(--color-border);
  border-left: 0;
  background: var(--color-bg-secondary);
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
    margin: 5px;
    border-bottom: 1px solid var(--color-border);
  }
  span {
    width: 100px;
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
