// Components
import Container from '../../components/Container';
import { GuestCard } from './GuestCard';
// Styles
import styled from '@emotion/styled';

const height = 168;
const pxToRem = (px: number) => px / 16;
// In design file, image was 216px high
// For responsiveness, we want to use rems.
// Convert px to rem by dividing it by 16.
// ASSUMPTION: A rem is set to 16px in high level css.

export const GuestsDiv = styled(Container)`
  .guests-header {
    /* Sizing & Box Model */
    /* height: ${pxToRem(48)}rem; */
    width: 100%;
    /* Flexbox */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    @media only screen and (min-width: 720px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
  .guests-header h2 {
    /* Sizing & Box Model*/
    margin: 0 0 1.25rem 0;
    /* Text */
    font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
    font-weight: normal;
    font-size: ${pxToRem(36)}rem;
    @media only screen and (min-width: 720px) {
      margin: 0;
    }
  }
  .guests-header button {
    /* Text */
    font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
    font-weight: normal;
    font-size: ${pxToRem(20)}rem;
  }
  .guests-buttons-filter {
    display: block;
    margin: 2rem 0;
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
    border: var(--border);
    /* Text */
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-size: 1rem;
    /* Color */
    color: var(--color-text-dark);
    background-color: var(--color-button-background-alt);
  }
  .guests-buttons-filter .upcoming {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }
  .guests-buttons-filter .incomplete {
    border-radius: 0;
  }
  .guests-buttons-filter .complete {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }
  .guests-buttons-filter button.button-filter:hover,
  .guests-buttons-filter .active {
    /* Color */
    color: var(--color-button-text);
    background-color: var(--color-button-background);
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
    /* .guests-buttons-filter {
      margin: auto auto ${pxToRem(36)}rem 0;
    } */
  }
`;

export const StyledGuestCard = styled(GuestCard)`
  /* Sizing and Box Model */
  width: 95%;
  margin: 0 auto 2rem auto;
  padding: 1rem;
  box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  border-radius: var(--border-radius);
  /* Grid */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 3rem 1fr 1fr;
  gap: ${pxToRem(24)}rem;
  column-gap: ${pxToRem(36)}rem;
  grid-gap: ${pxToRem(24)}rem;
  grid-column-gap: ${pxToRem(36)}rem;
  /* Color */
  color: var(--color-text-dark);
  background-color: var(--color-bg-secondary);
  /* Hover Effects */
  /* transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.025);
  } */
  .user-image {
    border-radius: 100%;
    height: ${pxToRem(72)}rem;
    width: ${pxToRem(72)}rem;
    /* Grid */
    grid-column: span 2;
    grid-row: 1;
    justify-self: center;
  }
  .text-content {
    /* Grid */
    grid-column: span 2;
    grid-row: 2;
    justify-self: start;
  }
  div[class^='info-check'] {
    border-radius: var(--border-radius);
  }
  .info-progress {
    /* Grid */
    grid-column: span 2;
    border-radius: var(--border-radius);
  }
  @media only screen and (min-width: 720px) {
    /* Sizing and Box Model */
    width: 100%;
    padding: 0;
    height: ${pxToRem(height)}rem;
    border: var(--border-alt);
    margin: 0 0 2rem 0;
    /* Grid */
    display: grid;
    align-items: end;
    gap: ${pxToRem(30)}rem;
    grid-gap: ${pxToRem(30)}rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    .user-image {
      /* Sizing & Box Model*/
      border-radius: var(--border-radius) 0 0 var(--border-radius);
      width: 100%;
      height: ${pxToRem(height)}rem;
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
      border-radius: var(--border-radius);
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
      height: 80%;
      margin: 0 1rem 1rem 0;
      border-radius: var(--border-radius);
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
  }
`;

export const InfoDiv = styled.div`
  /* Sizing & Box Model */
  border: var(--border);
  /* Flexbox */
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  /* Color */
  background-color: var(--color-bg-secondary);
  div[class^='text-'] {
    display: block;
  }
  .text-main {
    font-family: 'Roboto Medium', Arial, sans-serif;
    font-size: ${24 / 16}rem;
    color: var(--color-text-accent);
  }
  .text-secondary {
    font-family: 'Roboto Light', Arial, sans-serif;
    font-size: ${16 / 16}rem;
    color: var(--color-text-dark);
  }
`;

export const MainText = styled.div`
  /* display: block; */
  font-family: 'Roboto Bold', Arial, sans-serif;
  text-align: left;
  font-weight: bolder;
  font-size: ${pxToRem(20)}rem;
  color: var(--color-text-accent);
`;

export const SecondaryText = styled.div`
  /* display: inline-block; */
  text-align: left;
  font-family: 'Roboto Light', Arial, sans-serif;
  font-size: ${pxToRem(16)}rem;
  color: var(--color-text-dark);
`;

export const StyledGuestCardFiller = styled('div')`
  /* Sizing and Box Model */
  width: 95vw;
  box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  border-radius: 5px;
  width: 100%;
  padding: ${pxToRem(36)}rem;
  height: ${pxToRem(height)};
  border: var(--border-alt);
  /* Grid */
  display: flex;
  /* Color */
  background-color: var(--color-bg-secondary);
  /* Hover Effects */

  .text-content {
    /* Grid */
    font-family: 'Roboto Bold', Arial, sans-serif;
    text-align: Center;
    font-weight: bolder;
    font-size: ${pxToRem(20)}rem;
    color: var(--color-text-accent);
    text-transform: capitalize;
  }
`;
