import React from 'react';
import Stripecheckout, { Token } from 'react-stripe-checkout';
import axios from 'axios';

// @ts-ignore
const key = process.env.REACT_APP_stripe_API || '';

class Stripe extends React.Component {
  public amount = 999;
  public onToken = async (token: Token) => {
    try {
      const response = await axios.post(
        'http://localhost:4500/payments',
        token,
      );
    } catch (e) {
      return e;
    }
    // tslint:disable-next-line:semicolon
  };
  public render() {
    return (
      <>
        <Stripecheckout
          name='Cleaner POS'
          description='Confirm your subscription'
          token={this.onToken}
          stripeKey={key}
          amount={this.amount}
        />
      </>
    );
  }
}

export default Stripe;
