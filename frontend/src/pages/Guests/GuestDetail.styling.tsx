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

export const GuestDetailStyle = styled('div')`
  /* Sizing & Box Model */
  max-width: 1000px;
  width: 100%;
  margin: auto;

  /* Header CSS */
  .guest-header,
  .guest-info {
    /* Sizing & Box Model */
    margin: 1rem 1rem 1.5rem 1rem;
  }

  .guest-header--img {
    /* Sizing & Box Model */
    height: ${headerHeight};
    width: ${pxVw(213)};
    object-fit: cover;
  }

  .guest-header--text {
    /* Box Model & Sizing */
    height: ${pxRem(157)};
    /* margin: auto; */

    /* Flex */
    display: flex;
    flex-flow: column nowrap;
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
    /* Flex */
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .guest-header--buttons {
    /* Flex */
    display: flex;
    flex-flow: row wrap;
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

  /* Checklists */
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
    color: var(--colour-text-dark);
    background-color: var(--colour-button-background-alt);
  }

  .guest-info--checklist-bottom .active {
    color: var(--colour-button-text);
    background-color: var(--colour-button-background);
  }

  /* Checklist Boxes */
  .list-checkbox {
    display: block;
    margin-bottom: 0.5rem;
  }

  /* Checklist Sublist */
  .sublist {
    /* Sizing */
    /* Text */
    font-weight: bolder;
    margin-bottom: 0.5rem;
  }

  /* Sub Container Sizes */

  /* Commenting this for now
     It's ok for elements to over/under hang
  */
  /* .guest-info--checklist {
    height: 516px;

    .guest-info--checklist-bottom {
      height: 448px;
    }
  }
  .guest-info--resources {
    height: 250px;
    .guest-info--resources-bottom {
      height: 182px;
    }
  }

  .guest-info--checkout {
    height: 250px;
    .guest-info--checkout-bottom {
      height: 182px;
    }
  } */

  .guest-info--top,
  .guest-info--checklist-top,
  .guest-info--resources-top,
  .guest-info--checkout-top {
    /* Box Model & Sizing */
    padding: 0 1rem;
    border: 0.5px solid var(--colour-border);
    color: var(--colour-accent);
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
    background: var(--colour-accent);
    color: white;
  }

  .guest-info--checklist,
  .guest-info--resources,
  .guest-info--checkout {
    /* Box Model & Sizing */
    margin: 1rem;
  }

  @media only screen and (min-width: 700px) {
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
      /* Grid */
      grid-column: 1;
      grid-row: span 2;
    }

    .guest-header--text {
      /* Grid */
      grid-column: 2 / 4;
      grid-row: span 2;

      /* Text */
      text-align: left;
    }

    .guest-header--checkdates {
      /* Flex */
      flex-flow: row nowrap;

      /* Grid */
      grid-column: 4 / -1;
      grid-row: 1;
    }

    .guest-header--buttons {
      /* Grid */
      grid-column: 5 / 7;
      grid-row: 2;
      justify-self: end;
      align-self: flex-end;
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
  }
`;
