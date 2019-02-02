import styled from '@emotion/styled';
import Container from '../../components/Container';

export const CheckoutContainer = styled(Container)`
  .checkout-body {
    display: flex;
    justify-content: space-around;
  }

  .checkout-left {
    /* Box Model */
    width: 45%;
    /* Text */
    text-align: left;
    line-height: 2;
  }

  .checkout-field {
    /* Box Model */
    margin: 1rem 0;
    /* Flex */
    display: flex;
    justify-content: space-between;
  }

  .checkout-field input {
    border: 0px solid;
    border-bottom: 1px solid var(--color-main-black);
    background-color: var(--color-main-background);
  }

  .checkout-field input,
  .checkout-field span {
    font-size: 1.25rem;
    color: var(--color-text-accent);
    text-align: right;
  }
`;

export const CheckoutForm = styled('div')`
  border: var(--border);
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 0.67em;
`;

export const Invoice = styled('div')`
  width: 300px;
  display: flex;
  flex-direction: column;
  div {
    margin-bottom: 24px;
  }
  padding: 10px;
  border: var(--border);
  /* Color */
  background-color: var(--color-main-background);
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
  border: var(--border);
  border-right: 0;
  border-left: 0;
  padding: 0 0.5rem;
  height: 3rem;
  /* Color */
  color: var(--color-text-accent);
  background-color: var(--color-accent-background);
`;
