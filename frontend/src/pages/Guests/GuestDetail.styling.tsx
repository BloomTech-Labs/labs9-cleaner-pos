// Components
import Container from '../../components/Container';
// Styles
import styled from '@emotion/styled';

const pxRem = (px: number) => `${px / 16}rem`;
const pxToVUnitMaker = (maxSizeInPx: number) => (px: number) =>
  `${(px / maxSizeInPx) * 100}vh`;
const pxVw = pxToVUnitMaker(1920);
const pxVh = pxToVUnitMaker(1080);

const headerHeight = pxRem(144);

export const GuestDetailStyle = styled('div')`
  /* Sizing & Box Model */
  max-width: 1000px;
  width: 100%;
  margin: auto;

  /* Header CSS */
  .guest-header {
    /* Sizing & Box Model */
    height: ${headerHeight};
    width: auto;
    margin-bottom: 1.5rem;

    /* Grid */
    display: grid;
    gap: ${pxRem(16)};
    grid-gap: ${pxRem(16)};
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr 1fr;
  }

  .guest-header--img {
    /* Sizing & Box Model */
    height: ${headerHeight};
    width: ${pxVw(213)};
    object-fit: cover;

    /* Grid */
    grid-column: 1;
    grid-row: span 2;
  }

  .guest-header--text {
    /* Box Model & Sizing */
    height: ${pxRem(157)};

    /* Grid */
    grid-column: 2 / 4;
    grid-row: span 2;

    /* Flex */
    display: flex;
    flex-flow: column nowrap;

    text-align: left;
  }

  .guest-header--text .main {
    display: block;
    margin-bottom: 0.5rem;
    /* Text */
    font-size: 2rem;
  }

  .guest-header--text .sub-house,
  .guest-header--text .sub-address {
    /* Text */
    font-size: 1rem;
  }

  .guest-header--checkdates {
    /* Grid */
    grid-column: 4 / -1;
    grid-row: 1;

    /* Flex */
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .guest-header--buttons {
    /* Grid */
    grid-column: 5 / 7;
    grid-row: 2;
    justify-self: end;
    align-self: flex-end;

    /* Flex */
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .checkin,
  .checkout {
    width: ${pxRem(206)};
    height: ${pxRem(64)};
  }

  .guest-header--checkdates .text-main {
    /* Resource: https://css-tricks.com/snippets/css/fluid-typography */
    /* font-size: calc(1rem + (1.5 - 1) * ((100vw - 300px) / (1000 - 300))); */
    font-size: 1.5rem;
  }

  .guest-header--checkdates .text-secondary {
    /* font-size: calc(0.75rem + (1 - 0.75) * ((100vw - 300px) / (1000 - 300))); */
    font-size: 1rem;
  }

  /* Guest-Info CSS */
  .guest-info,
  .guest-info--checklist,
  .guest-info--resources,
  .guest-info--checkout {
    border: 1px solid gray;
  }

  .guest-info--top,
  .guest-info--checklist-top,
  .guest-info--resources-top,
  .guest-info--checkout-top {
    /* Box Model & Sizing */
    padding: 0.25rem;
    margin-bottom: 0.5rem;
    border: 2px solid black;
  }

  .guest-info--checklist,
  .guest-info--resources,
  .guest-info--checkout {
    /* Box Model & Sizing */
    margin: 1rem;
  }

  @media only screen and (min-width: 600px) {
    .guest-info--bottom {
      display: grid;
      gap: 1.5rem;
      grid-gap: 1.5rem;
      grid-template-columns: 1fr 1fr;
    }

    .guest-info--bottom-left {
      grid-column: 1;
    }

    .guest-info--bottom-right {
      grid-column: 2;
    }
  }
`;
