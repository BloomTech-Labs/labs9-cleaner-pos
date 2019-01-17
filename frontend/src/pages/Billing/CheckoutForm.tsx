import React, { FormEvent } from 'react';
import {
  ReactStripeElements,
  injectStripe,
  CardElement,
} from 'react-stripe-elements';
import { Button } from '../../components/index';
import axios from 'axios';

const url =
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com/';

const CheckoutForm = (props: ReactStripeElements.InjectedStripeProps) => {
  const handleSubmit = async (ev: FormEvent) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    try {
      // @ts-ignore
      const { token } = await props.stripe.createToken({});
      const response = await axios.post(`${url}/payments`, token);
    } catch (e) {
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
          <CardElement />
        </label>
        <div style={{ marginBottom: '24px' }} />
        <Button
          onClick={handleSubmit}
          text='Subscribe!'
          datatestid='confirm-payment'
          colour='#0AA047'
        />
      </form>
    </div>
  );
};

export default injectStripe(CheckoutForm);
