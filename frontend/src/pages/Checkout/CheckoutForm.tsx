import React, { FormEvent, useContext, useState } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { PaymentContext } from './Checkout';
import { Button } from '../../components/index';
import LoadingIndicator from '../utils/loading.svg';
import { SVGContainer } from './Checkout.styles';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const url =
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

const CheckoutForm = (props: any) => {
  const { sum, stay_id } = useContext(PaymentContext);
  const { subscription } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });
  const [success, setSuccess] = useState({
    success: false,
    receipt: '',
    msg: '',
  });
  const handleSubmit = async (ev: FormEvent) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    setLoading(true);
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
          subscription,
          stay_id,
        };
        const { data }: AxiosResponse = await axios.post(
          `${url}/connect/createpayment`,
          body,
          headers,
        );
        setLoading(false);
        setSuccess({ success: true, ...data });
      } catch (e) {
        setLoading(false);
        if (e.response.status === 401) {
          setError({
            error: true,
            message: e.response.data.message,
          });
        }
      }
    }
    triggerPayment();
  };

  return (
    <div style={{ width: '250px', margin: '0 auto' }}>
      {error && error.error ? (
        <>
          <p style={{ color: 'var(--color-error)', fontWeight: 'bold' }}>
            {error.message}
          </p>
          <Link to='/settings'>
            <Button
              text='Connect now'
              color='#0AA047'
              className='connect-button'
            />
          </Link>
        </>
      ) : null}
      {success.success ? (
        <div
          style={{
            color: 'var(--color-text-accent)',
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SVGContainer>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='128'
              height='128'
              viewBox='-263.5 236.5 26 26'
            >
              <g className='svg-success'>
                <circle cx='-250.5' cy='249.5' r='12' />
                <path d='M-256.46 249.65l3.9 3.74 8.02-7.8' />
              </g>
            </svg>
          </SVGContainer>
          <div
            style={{
              color: 'var(--color-text-accent)',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            Payment done successfully!
            <a href={success.receipt} rel='noopen noreferer' target='_blank'>
              <Button
                text='Receipt'
                color='#0AA047'
                className='receipt-button'
              />
            </a>
          </div>
        </div>
      ) : null}
      {!error.error && !success.success ? (
        <>
          <p>Pay Total ${sum}</p>
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: '350px',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            data-testid='checkout-form'
          >
            <label>
              Card details
              <CardElement />
            </label>
            <Button
              onClick={handleSubmit}
              className='submit-payment'
              text={loading ? '' : 'Confirm Payment'}
              datatestid='confirm-payment'
              color='#0AA047'
            >
              {loading ? (
                <img
                  style={{ color: 'white' }}
                  src={LoadingIndicator}
                  alt='animated loading indicator'
                />
              ) : null}
            </Button>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default injectStripe(CheckoutForm);
