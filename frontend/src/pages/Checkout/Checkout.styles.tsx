import styled from '@emotion/styled';

export const CheckoutForm = styled('div')`
  border: 0.5px solid var(--color-border);
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
  background: var(--color-accent-background);
  border: 0.5px solid var(--color-border);
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
  justify-content: space-around;
  align-items: center;
  border: 0.5px solid var(--color-border);
  border-right,border-left: 0;
  height: 3rem;
`;
