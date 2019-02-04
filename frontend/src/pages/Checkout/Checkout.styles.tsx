import styled from '@emotion/styled';
import Container from '../../components/Container';

export const CheckoutContainer = styled(Container)`
  .checkout-body {
    /* Box Model */
    margin-top: 1rem;
    /* Flex */
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .checkout-left {
    /* Box Model */
    width: 45%;
    /* Text */
    text-align: left;
    line-height: 2;
    /* Color */
    background-color: white;

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
  /* Flex */
  display: flex;
  flex-direction: column;
  div {
    margin-bottom: 24px;
  }
  padding: 10px;
  border: 0.5px solid var(--color-border);
  /* Color */
  background-color: white;
  .submit-payment {
    margin-bottom: 24px;
  }
  .payment-button {
    margin: 0 auto;
  }
  .connect-button {
    margin-bottom: 24px;
  }
  .receipt-button {
    margin-top: 12px;
    margin-bottom: 24px;
  }
`;

export const InvoiceBox = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.5px solid var(--color-border);
  border-right: 0;
  border-left: 0;
  padding: 0 0.5rem;
  height: 3rem;
  /* Color */
  color: var(--color-text-accent);
  background-color: var(--color-accent-background);
`;
