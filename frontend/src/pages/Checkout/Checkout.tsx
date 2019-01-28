import React, { useContext, useState, useEffect, createContext } from 'react';
import { Container, Button } from '../../components/index';
import { RouteComponentProps } from 'react-router';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosErrorHandler } from '../utils';
import { CheckoutForm, Invoice, InvoiceBox } from './Checkout.styles';
import { UserContext } from '../../App';
import { StripeProvider } from 'react-stripe-elements';

import MyStoreCheckout from './Checkout.1';
import { useFetch } from '../../helpers';

interface CheckoutProps extends RouteComponentProps {
  match: any;
}
export const PaymentContext = createContext({ sum: 0 });

const Checkout = (props: CheckoutProps) => {
  // const [error, setError] = useState<any>({ msg: '', error: false });
  // TODO: change state to include no default values
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com/';
  const { id } = props.match.params;
  // const [stays, setStays] = useState([]);
  const [show, setShow] = useState(false);
  const [stays, staysError, staysLoading] = useFetch(`${url}stays?test=true`);
  const [stay, stayError, stayLoading] = useFetch(`${url}/stays/${id}`);
  const key = process.env.REACT_APP_stripe_API || '';

  const total = stay
    ? +stay.extra_guests * +stay.extra_fee +
      stay.diff * stay.price +
      +stay.cleaning_fee
    : null;

  console.log(stay, stayLoading);

  return (
    <Container>
      {stayLoading ? '...Loading data' : null}
      {stayError ? 'Error fetching your Guest' : null}
      {stay ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <h1 data-testid='guest-name'>{stay ? stay.guest_name : null}</h1>

            <div>
              Nights:{' '}
              <input
                value={stay.diff}
                onChange={(e) =>
                  // @ts-ignore
                  setStay({ ...stay, diff: e.target.value })
                }
              />
            </div>
            <div>Cleaning Fee: ${stay.cleaning_fee}</div>
            <div>
              Extra Guests:{' '}
              <input
                value={stay.extra_guests || ''}
                onChange={(e) =>
                  // @ts-ignore
                  setStay({ ...stay, extra_guests: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <CheckoutForm>
              {/* TODO: implement onChange to filter through stays */}
              <label htmlFor='stay-search' style={{ display: 'hidden' }}>
                Search for different Stay
              </label>
              <input
                id='stay-search'
                name='stay'
                placeholder='Search for different stay'
              />
            </CheckoutForm>
            <Invoice>
              <h3>Invoice</h3>
              {/* TODO: implement axios call to change stay to account for new inputs */}
              {show && (
                // @ts-ignore
                <PaymentContext.Provider value={{ sum: total }}>
                  <StripeProvider apiKey={key}>
                    <MyStoreCheckout sum={stay.total} />
                  </StripeProvider>
                </PaymentContext.Provider>
              )}
              <Button
                text={`Pay $${total}`}
                colour='#0aa047'
                onClick={() => {
                  setShow(true);
                }}
                datatestid='payment-button'
              />
              <InvoiceBox>
                <span>
                  {stay.diff} Nights x ${stay.price}
                </span>
                <span>${stay.price * stay.diff}</span>
              </InvoiceBox>
              <InvoiceBox>
                <span>Cleaning Fee:</span>
                <span>${stay.cleaning_fee}</span>
              </InvoiceBox>
              {stay.extra_guests && (
                <InvoiceBox data-testid='extra-guests'>
                  <span>
                    {stay.extra_guests} Extra Guests x ${stay.extra_fee}
                  </span>
                  <span>{stay.extra_fee * stay.extra_guests}</span>
                </InvoiceBox>
              )}
              <div data-testid='total-amount'>Total: ${total}</div>
            </Invoice>
          </div>
        </div>
      ) : null}
    </Container>
  );
};

export default Checkout;
