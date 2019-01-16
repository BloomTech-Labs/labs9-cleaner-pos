import React from 'react';
import Stripecheckout, { Token } from 'react-stripe-checkout';
import axios from 'axios';

const key = process.env.REACT_APP_stripe_API || '';

class Stripe extends React.Component {
  public amount = 200;
  public onToken = async (token: Token) => {
    console.log(token);
    // try {
    //   // const response = await axios.get('/save-api-token');
    // } catch (e) {
    //   console.log(e);
    // }
    // tslint:disable-next-line:semicolon
  };
  public render() {
    console.log(this.onToken);
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
