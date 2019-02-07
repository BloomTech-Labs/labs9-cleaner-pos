// Components
import Container from '../../components/Container';
// Styles
import styled from '@emotion/styled';

const pxRem = (px: number) => `${px / 16}rem`;
const pxToVUnitMaker = (maxSizeInPx: number) => (px: number) =>
  `${(px / maxSizeInPx) * 100}vh`;
const pxVw = pxToVUnitMaker(1080);
const pxVh = pxToVUnitMaker(1920);

const headerHeight = pxRem(144);

export const GuestDetailStyle = styled(Container)`
  /* Sizing & Box Model */

  /* Header CSS */
  .guest-header {
    /* Sizing & Box Model */
    margin: 1rem 1rem 1.5rem 1rem;
  }

  .top-text h2 {
    margin: 0.5rem;
    text-align: left;
  }

  .guest-info--top {
    display: none;
  }

  .guest-header--img {
    /* Sizing & Box Model */
    width: ${pxRem(72)};
    height: ${pxRem(72)};
    border-radius: 100%;
    margin: auto;
    /* Fit and Aspect Ratio */
    object-fit: cover;
  }

  .guest-header--text {
    /* Box Model & Sizing */
    margin: 1rem 0;

    /* Flex */
    display: flex;
    flex-flow: column nowrap;

    /* Text */
    text-align: left;
  }

  .guest-header--text .main {
    display: block;
    margin-bottom: 0.5rem;
    /* Text */
    font-size: 1.5rem;
    font-weight: bolder;
  }

  .guest-header--text .sub-house,
  .guest-header--text .sub-address {
    /* Text */
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-size: 1rem;
  }

  .guest-header--checkdates {
    /* Flex */
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .checkin,
  .checkout {
    width: 45%;
    text-align: center;
  }

  .guest-header--buttons {
    /* Flex */
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 431px) {
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .back {
        margin-top: 1rem;
      }
    }
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
  .guest-info {
    border: none;
  }
  .guest-info--checklist,
  .guest-info--resources,
  .guest-info--checkout {
    /* border: 1px solid gray; */
    border: var(--border);
  }

  /* Checklists */

  .guest-info--checklist {
    max-width: 470px;

    @media only screen and (max-width: 900px) {
      width: 96%;
      max-width: none;
    }
  }
  /* Guest Checklist Buttons */
  .guest-info--checklist-bottom .guests-buttons-filter {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .guests-buttons-filter .button-filter {
    /* Box Model */
    width: 33%;
    padding: 0 0.5rem;
    border: var(--border);
    /* Text */
    font-size: 1rem;
    /* Color */
    color: var(--color-text-dark);
    background-color: var(--color-button-background-alt);
  }

  .guests-buttons-filter .before {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }

  .guests-buttons-filter .during {
    border-radius: 0;
  }

  .guests-buttons-filter .after {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }

  .guest-info--checklist-bottom .active {
    color: var(--color-button-text);
    background-color: var(--color-button-background);
  }

  /* Checklist Boxes */
  .list-checkbox {
    display: block;
    margin-bottom: 0.5rem;
    text-align: left;
    overflow: hidden;
  }

  /* Checklist Sublist */
  .sublist {
    /* Text */
    font-weight: bolder;
    margin-bottom: 0.5rem;
  }

  .progress-no {
    margin-bottom: 1rem;
    text-align: center;
  }

  .progress-no span {
    color: var(--color-text-accent);
    font-weight: bolder;
  }

  .guest-info--top,
  .guest-info--checklist-top,
  .guest-info--resources-top,
  .guest-info--checkout-top {
    /* Box Model & Sizing */
    padding: 0 0.5rem;
    border: var(--border);
    color: var(--color-text-accent);
  }

  .guest-info--checklist-bottom,
  .guest-info--resources-bottom,
  .guest-info--checkout-bottom {
    /* Box Model & Sizing */
    padding: 1.5rem 1rem;
    width: 100%;
    /* Color */
    background: white;
  }

  .guest-info--top {
    background: var(--color-bg-accent);
    color: white;
  }

  .guest-info--checklist,
  .guest-info--resources,
  .guest-info--checkout {
    /* Box Model & Sizing */
    margin: 1rem;
  }

  /* Grid for Assistants and Resources */
  .guest-info--resources-bottom,
  .guest-info--checkout-bottom {
    /* Grid */
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1.25rem;
    grid-gap: 1.25rem;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 432px) {
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
      align-items: center;

      .ast-dropdown,
      .guide {
        margin: 1rem 0;
      }
    }
  }

  .ast-dropdown {
    grid-row: span 2;
    grid-column: 1;
  }

  .guide {
    text-align: center;
  }

  .guide .fa-file {
    font-size: 2.5rem;
    color: var(--color-text-accent);
  }

  /* Grid for Checkout and Invoice */
  .stay-code {
    border: var(--border);
    padding: 0.75rem 0;
    /* Grid */
    grid-row: span 2;
    grid-column: 1;
    /* Color */
    background-color: var(--color-bg-main);
  }

  .guest-info--checkout-bottom .stay-code div {
    text-align: center;
  }

  .button-invoice {
    width: 100%;
    justify-self: center;
  }

  .button-checkout {
    width: 100%;
    background-color: var(--color-accent-alt);
  }

  @media only screen and (min-width: 900px) {
    .guest-info--top {
      display: block;
    }

    .guest-info {
      border: var(--border);
    }

    .guest-header,
    .guest-info {
      /* Sizing & Box Model */
      margin: 0 0 1.5rem 0;
    }

    .guest-header {
      /* Sizing & Box Model */
      height: ${headerHeight};
      width: auto;

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
      margin: 0;
      border-radius: 0%;
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

      /* Text */
      text-align: left;
    }

    .guest-header--checkdates {
      /* Box Model & Sizing */
      margin-bottom: 0;
      width: 100%;

      /* Flex */
      flex-flow: row nowrap;

      /* Grid */
      grid-column: 4 / -1;
      grid-row: 1;

      @media only screen and (max-width: 900px) {
        margin-bottom: 0;
      }
    }

    .checkin,
    .checkout {
      width: 45%;
      height: ${pxRem(64)};
    }

    .guest-header--buttons {
      width: 100%;
      margin: 1rem 0 0 0;
      padding: 1rem 0 !important;
      /* Grid */
      grid-column: 4 / 7;
      grid-row: 2;
      justify-self: end;
      align-self: flex-end;
      /* Flex */
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;

      a,
      button {
        margin: 0;
        padding: 1rem 0;
        height: ${37 / 16}rem;
      }

      .edit,
      .back {
        margin: 0;
        padding: 1rem;
      }

      @media only screen and (min-width: 900px) {
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;

        a,
        button {
          margin: 0;
          height: ${37 / 16}rem;
          padding: 0;
        }

        .edit,
        .back {
          margin: 0;
          padding: 0 !important;
        }
      }
    }

    .guest-info--bottom {
      /* Grid */
      display: grid;
      gap: 1.5rem;
      grid-gap: 1.5rem;
      grid-template-columns: 1fr 1fr;
      /* Text */
      text-align: left;
    }

    .guest-info--bottom-left {
      grid-column: 1;
    }

    .guest-info--bottom-right {
      grid-column: 2;
    }

    .stay-code div {
      text-align: center;
      justify-self: center;
    }
  }
`;
