import React, { FormEvent, useContext } from 'react';
import {
  ReactStripeElements,
  injectStripe,
  CardElement,
} from 'react-stripe-elements';
import { Button } from '../../components/index';
import axios, { AxiosRequestConfig } from 'axios';
import { BillingContext } from './Billing';

const url =
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

const headers: AxiosRequestConfig = {
  headers: { Authorization: localStorage.getItem('token') },
};

const CheckoutForm = (props: ReactStripeElements.InjectedStripeProps) => {
  const { setConfirm } = useContext(BillingContext);
  const handleSubmit = async (ev: FormEvent) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    try {
      // @ts-ignore
      const { token } = await props.stripe.createToken({});
      const response = await axios.post(`${url}/payments`, token, headers);
      console.log(response.data);
      setConfirm({confirm: response.data});
    } catch (e) {
      console.log(e.response);
      return e;
    }
    /* tslint:disable-next-line */
  };

  return (
    <div>
      {/* !TODO: Build accordion component */}
      <p>Baseplan: 9.99$ / house / month</p>
      <p>Advanced: 50$ / month</p>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '350px', margin: 'auto' }}
        data-testid='checkout-form'
      >
        <label>
          Card details
          <br />
          <CardElement />
        </label>
        <div style={{ marginBottom: '24px' }} />
        <Button
          onClick={handleSubmit}
          text='Subscribe!'
          datatestid='confirm-payment'
          color='#0AA047'
        />
      </form>
    </div>
  );
};

export default injectStripe(CheckoutForm);
