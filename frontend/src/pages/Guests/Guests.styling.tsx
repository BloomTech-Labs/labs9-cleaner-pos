// Components
import Container from '../../components/Container';
import { GuestCard } from './GuestCard';
// Styles
import styled from '@emotion/styled';

const height = 216 / 16;
const pxToRem = (px: number) => px / 16;
// In design file, image was 216px high
// For responsiveness, we want to use rems.
// Convert px to rem by dividing it by 16.
// ASSUMPTION: A rem is set to 16px in high level css.

export const StyledGuestCard = styled(GuestCard)`
  /* Sizing and Box Model */
  width: 100%;
  height: ${height + 0.25}rem;
  border: 1px solid var(--border-color);
  margin-bottom: ${pxToRem(36)}rem;

  /* Grid */
  display: grid;
  align-items: end;
  gap: ${pxToRem(30)}rem;
  grid-gap: ${pxToRem(30)}rem;
  grid-template-columns: repeat(4, 1fr);

  /* Color */
  color: var(--main-black-color);
  background-color: var(--accent-background-color);

  .user-image {
    /* Sizing & Box Model*/
    width: 100%;
    height: ${height + 0.15}rem;
    object-fit: cover;

    /* Grid */
    grid-column: span 1;
    grid-row: span 2;
  }

  .text-content {
    /* Grid */
    grid-column: 2 / 4;
    grid-row: 1;

    /* Text */
    text-align: left;
  }

  div[class^='info-check'] {
    /*
    Above fancy selector courtesy of:
    https://stackoverflow.com/a/8588532
    */
    /* Sizing & Box Model */
    height: ${pxToRem(108)}rem;
    margin-bottom: 1rem;
  }

  .info-check-in {
    /* Grid */
    grid-column: 2;
    grid-row: 2;
  }

  .info-check-out {
    /* Grid */
    grid-column: 3;
    grid-row: 2;
  }

  .info-progress {
    /* Sizing & Box Model */
    width: ${pxToRem(206)}rem;
    height: ${pxToRem(165)}rem;
    margin: 0 1rem 1rem 0;

    /* Grid */
    grid-column: 4;
    grid-row: span 2;
  }

  .info-progress .text-main {
    /* Sizing & Box Model */
    padding-top: 1rem;

    /* Text */
    font-size: ${pxToRem(48)}rem;
  }

  .info-progress .text-secondary {
    /* Sizing & Box Model */
    padding-bottom: 1rem;

    /* Text */
    font-size: ${pxToRem(16)}rem;
  }
`;

export const GuestsDiv = styled(Container)`
  /* Flexbox */
  display: flex;
  flex-flow: row wrap;

  h2 {
    display: inline;
  }

  .title {
    display: flex;
    text-align: left;
  }
`;

export const MainText = styled.div`
  padding-top: 0.5rem;
  display: block;
  text-align: left;
  font-family: 'Roboto Bold', Arial, sans-serif;
  font-size: ${pxToRem(30)}rem;
`;

export const SecondaryText = styled.div`
  display: inline-block;
  text-align: left;
  font-family: 'Roboto Light', Arial, sans-serif;
  font-size: ${pxToRem(16)}rem;
`;
