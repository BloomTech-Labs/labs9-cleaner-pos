import React, { FormEvent, useContext } from 'react';
import {
  ReactStripeElements,
  injectStripe,
  CardElement,
} from 'react-stripe-elements';
import { UserContext } from '../../App';
import { PaymentContext } from './Checkout';
import { Button } from '../../components/index';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const url =
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

const CheckoutForm = (props: any) => {
  const { sum } = useContext(PaymentContext);
  const handleSubmit = async (ev: FormEvent) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    async function triggerPayment() {
      // return;

      const headers: AxiosRequestConfig = {
        headers: { Authorization: localStorage.getItem('token') },
      };
      try {
        // @ts-ignore
        const { token } = await props.stripe.createToken({});
        const body = {
          token: token.id,
          amount: sum,
        };
        const { data }: AxiosResponse = await axios.post(
          `${url}/connect/createpayment`,
          body,
          headers,
        );
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
    triggerPayment();
  };

  return (
    <div>
      {/* !TODO: Build accordion component */}
      <p>Pay Total</p>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '350px', margin: 'auto' }}
        data-testid='checkout-form'
      >
        <label>
          Card details
          <CardElement />
        </label>
        <div style={{ marginBottom: '24px' }} />
        <Button
          onClick={handleSubmit}
          text='Pay with Credit Card'
          datatestid='confirm-payment'
          color='#0AA047'
        />
      </form>
    </div>
  );
};

export default injectStripe(CheckoutForm);
