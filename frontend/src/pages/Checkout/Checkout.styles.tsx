import styled from '@emotion/styled';

export const CheckoutForm = styled('div')`
  border: 1px solid black;
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
  border: 0.5px solid black;
`;

export const InvoiceBox = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 0.5px solid black;
  height: 3rem;
`;
