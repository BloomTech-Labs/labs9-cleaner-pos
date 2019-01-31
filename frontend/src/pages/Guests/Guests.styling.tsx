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

export const GuestsDiv = styled(Container)`
  /* Sizing & Box Model */
  a:link {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline wavy gray;
  }

  a:active {
    text-decoration: underline wavy gray;
  }

  max-width: 1000px;
  width: 100%;

  .guests-header {
    /* Sizing & Box Model */
    height: ${pxToRem(48)}rem;
    width: 100%;
    margin: ${pxToRem(36)}rem 0;

    /* Flexbox */
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .guests-header h2 {
    /* Sizing & Box Model*/
    margin: 0;

    /* Text */
    font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
    font-weight: normal;
    font-size: ${pxToRem(36)}rem;
  }

  .guests-header button {
    /* Text */
    font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
    font-weight: normal;
    font-size: ${pxToRem(20)}rem;
  }

  .guests-buttons-filter {
    display: block;
    margin: auto;
  }

  .guests-cards {
    display: flex;
    flex-direction: column;
    margin: auto;
    min-height: 100px;
    width: 100%;
  }

  .guests-buttons-filter .button-filter {
    /* Sizing & Box Model */
    height: ${pxToRem(36)}rem;
    width: ${pxToRem(120)}rem;
    border: 1px solid rgba(238, 239, 245, 0.5);

    /* Text */
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-size: 1rem;
  }

  .guests-buttons-filter button.button-filter:hover,
  .guests-buttons-filter .active {
    /* Color */
    color: var(--colour-button-text-alt);
    background-color: var(--colour-button-background-alt);
  }

  @media only screen and (min-width: 720px) {
    /* Flexbox */
    display: flex;
    flex-flow: row wrap;

    .guests-header {
      /* Flexbox */
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .guests-buttons-filter {
      margin-bottom: ${pxToRem(36)}rem;
    }
  }
`;

export const StyledGuestCard = styled(GuestCard)`
  @media only screen and (min-width: 720px) {
    /* Sizing and Box Model */
    width: 100%;
    height: ${height}rem;
    border: 1px solid var(--colour-border);
    margin-bottom: ${pxToRem(36)}rem;

    /* Color */
    color: var(--colour-main-black);
    background-color: var(--colour-accent-background);

    /* Grid */
    display: grid;
    align-items: end;
    gap: ${pxToRem(30)}rem;
    grid-gap: ${pxToRem(30)}rem;
    grid-template-columns: repeat(4, 1fr);

    .user-image {
      /* Sizing & Box Model*/
      width: 100%;
      height: ${height}rem;
      object-fit: cover;

      /* Grid */
      grid-column: span 1;
      grid-row: span 2;
    }

    .text-content {
      /* Text */
      text-align: left;

      /* Grid */
      grid-column: 2 / 4;
      grid-row: 1;
    }

    div[class^='info-check'] {
      /*
      Above fancy selector courtesy of:
      https://stackoverflow.com/a/8588532
      */
      /* Sizing & Box Model */
      width: ${pxToRem(206)}rem;
      height: 100%;
      margin-bottom: 1rem;

      /* Color */
      background-color: var(--colour-main-background);
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

      /* Color */
      background-color: var(--colour-main-background);
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
  }
`;

export const InfoDiv = styled.div`
  /* Sizing & Box Model */
  border: 1px solid var(--colour-border);

  /* Flexbox */
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;

  /* Color */
  background-color: var(--colour-accent-background);

  div[class^='text-'] {
    display: block;
  }

  .text-main {
    font-family: 'Roboto Medium', Arial, sans-serif;
    font-size: ${36 / 16}rem;
    color: var(--colour-accent);
  }

  .text-secondary {
    font-family: 'Roboto Light', Arial, sans-serif;
    font-size: ${20 / 16}rem;
    color: var(--colour-main-black);
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
