// index.js
import React from 'react';
import { StripeProvider } from 'react-stripe-elements';

import MyStoreCheckout from './Checkout';

// @ts-ignore
const key = process.env.REACT_APP_stripe_API || '';
const Stripe = () => {
  return (
    <StripeProvider apiKey={key}>
      <MyStoreCheckout />
    </StripeProvider>
  );
};
export default Stripe;
