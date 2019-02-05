import React, { FormEvent, useContext, useState } from 'react';
import {
  ReactStripeElements,
  injectStripe,
  CardElement,
} from 'react-stripe-elements';
import { Button } from '../../components/index';
import axios, { AxiosRequestConfig } from 'axios';
import { BillingContext } from './Billing';
import loadingIndicator from '../utils/loading.svg';

const url =
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

const headers: AxiosRequestConfig = {
  headers: { Authorization: localStorage.getItem('token') },
};

const CheckoutForm = (props: ReactStripeElements.InjectedStripeProps) => {
  const { setConfirm, setShowItem } = useContext(BillingContext);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(0);
  const handleSubmit = async (ev: FormEvent) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    setLoading(true);
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    try {
      // @ts-ignore
      const { token } = await props.stripe.createToken({});
      const response = await axios.post(
        `${url}/payments`,
        // @ts-ignore
        { token: token.id, plan_id: plan },
        headers,
      );
      localStorage.setItem('subscription', response.data.plan);
      setConfirm({ confirm: response.data });
      setLoading(false);
      setShowItem(false);
    } catch (e) {
      return e;
    }
    /* tslint:disable-next-line */
  };

  return (
    <div>
      {/* !TODO: Build accordion component */}
      <input type='radio' name='plan' onChange={(e) => setPlan(1)} />
      Baseplan: 9.99$ / house / month
      <br />
      <br />
      <input
        type='radio'
        name='plan'
        onChange={(e) => setPlan(process.env.REACT_APP_stripe_plan)}
      />
      Advanced: 50$ / month
      <br />
      <br />
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '350px', margin: 'auto' }}
        data-testid='checkout-form'
      >
        <label>
          Card details
          <br />
          <br />
          <CardElement />
        </label>
        <div style={{ marginBottom: '24px' }} />
        <Button
          onClick={handleSubmit}
          text={loading ? '' : 'Subscribe!'}
          datatestid='confirm-payment'
          // color='#0AA047'
        >
          <div
            role='alert'
            aria-live='assertive'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {loading ? (
              <img src={loadingIndicator} alt='animated loading indicator' />
            ) : null}
            <p style={{ display: 'none' }}>Content is loading...</p>
          </div>
        </Button>
      </form>
    </div>
  );
};

export default injectStripe(CheckoutForm);
