import styled from '@emotion/styled';
import Container from '../../components/Container';

const bp = '700px';

export const CheckoutContainer = styled(Container)`
  .checkout-body {
    /* Box Model */
    margin-top: 1rem;
    /* Flex */
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    min-height: 633px;

    @media only screen and (max-width: 1000px) {
      margin: 0 1rem;
    }

    @media only screen and (max-width: ${bp}) {
      margin: 0;
      /* Flex */
      flex-flow: column nowrap;
      align-items: center;
    }
  }

  .checkout-left {
    /* Box Model */
    width: 45%;
    /* Text */
    text-align: left;
    line-height: 2;
    /* Color */
    background-color: white;
    /* Box Shadow */
    box-shadow: var(--box-shadow);

    @media only screen and (max-width: ${bp}) {
      width: 95%;
      margin-bottom: 2rem;
    }

    img {
      /* Box Model */
      width: 100%;
      height: 8rem;
      /* Image */
      object-fit: cover;
    }

    hr {
      border: var(--border);
      margin: 2rem 0;
    }
  }

  .checkout-left-inner {
    padding: 0 1rem 1rem 1rem;
  }

  .checkout-field {
    /* Box Model */
    margin: 1rem 0;
    /* Flex */
    display: flex;
    justify-content: space-between;
  }
`;

export const HeaderGroup = styled.div`
  /* Box Model */
  margin: 1rem 0;
  /* Text*/
  line-height: 1.125;

  h1,
  p {
    margin: 0;
  }

  h1 {
    color: var(--color-text-accent);
  }
  p {
    font-weight: lighter;
  }
`;

export const CheckoutRight = styled.div`
  width: 45%;

  @media only screen and (max-width: ${bp}) {
    width: 95%;
  }
`;

export const CheckoutForm = styled('div')`
  /* Box Model */
  margin-top: 0.67rem;
  border: 0px solid;
  /* Flex */
  /* Hide this component for now until functionality has been implemented */
  display: none;
  flex: 0 0 100%;
  flex-direction: column;

  input {
    /* Box Model */
    border: 0px solid;
    border-bottom: 1px solid var(--color-main-black);
    /* Color */
    background-color: var(--color-main-background);
    /* Text */
    font-size: 1.25rem;
    text-align: right;
  }
`;

export const Invoice = styled('div')`
  width: 100%;
  border: 0.5px solid var(--color-border);
  padding: 1rem 1rem 2rem 1rem;
  /* Flex */
  display: flex;
  flex-direction: column;
  /* Color */
  background-color: white;
  /* Text */
  text-align: left;
  /* Box Shadow */
  box-shadow: var(--box-shadow);

  div {
    margin-bottom: 24px;
  }

  h1 {
    color: var(--color-text-accent);
  }
  .submit-payment {
    background: var(--color-accent-alt);
    margin: 0 auto;
    margin-bottom: 24px;
  }
  .payment-button {
    background: var(--color-accent-alt);
    margin: 0 auto;
  }
  .connect-button {
    background: var(--color-accent-alt);
    margin-bottom: 24px;
  }
  .receipt-button {
    background: var(--color-accent-alt);
    margin-top: 12px;
    margin-bottom: 24px;
  }
`;

export const SVGContainer = styled('div')`
  display: flex;
  justify-content: center;
  .svg-success {
    margin: 0 auto;
    stroke-width: 2px;
    stroke: #8ec343;
    fill: none;
    & path {
      stroke-dasharray: 17px, 17px;
      stroke-dashoffset: 0px;
      -webkit-animation: checkmark 0.25s ease-in-out 0.7s backwards;
      animation: checkmark 0.25s ease-in-out 0.7s backwards;
    }
    & circle {
      stroke-dasharray: 76px, 76px;
      stroke-dashoffset: 0px;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      -webkit-animation: checkmark-circle 0.6s ease-in-out forwards;
      animation: checkmark-circle 0.6s ease-in-out forwards;
    }
  }

  @keyframes checkmark {
    0% {
      stroke-dashoffset: 17px;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes checkmark-circle {
    0% {
      stroke-dashoffset: 76px;
    }

    100% {
      stroke-dashoffset: 0px;
    }
  }
`;

export const InvoiceBox = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: var(--border);
  border-right: 0;
  border-left: 0;
  padding: 0 0.5rem;
  height: 3rem;
  /* Color */
  color: var(--color-text-accent);
  background-color: var(--color-accent-background);

  span:first-of-type {
    color: var(--color-text-dark);
  }
`;
