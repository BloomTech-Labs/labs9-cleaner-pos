import React, { useContext, useState, useEffect, createContext } from 'react';
import { Container, Button } from '../../components/index';
import { RouteComponentProps } from 'react-router';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosErrorHandler } from '../utils';
import {
  CheckoutContainer,
  CheckoutForm,
  Invoice,
  InvoiceBox,
  CheckoutRight,
  HeaderGroup,
} from './Checkout.styles';
import { StripeProvider } from 'react-stripe-elements';
import loadingIndicator from '../utils/loading.svg';

import MyStoreCheckout from './Checkout.1';
import { useFetch } from '../../helpers';

import { NumberSelector } from './NumberSelector';

interface CheckoutProps extends RouteComponentProps {
  match: any;
}
export const PaymentContext = createContext({ sum: 0, stay_id: 0 });

const Checkout = (props: CheckoutProps) => {
  // const [error, setError] = useState<any>({ msg: '', error: false });
  // TODO: change state to include no default values
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';
  const { id } = props.match.params;
  const [stay, setStay] = useState<any>(null);
  const [stayError, setStayError] = useState({ error: false, message: '' });
  const [stayLoading, setStayLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [stays, staysError, staysLoading] = useFetch(`${url}/stays?test=true`);

  async function fetchStay() {
    setStayLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setStayError({
        message: 'Authentication error. Please try logging in again.',
        error: true,
      });
      setStayLoading(false);
      return;
    }

    const headers: AxiosRequestConfig = {
      headers: { Authorization: token },
    };
    try {
      const { data } = await axios.get(`${url}/stays/${id}`, headers);
      setStay(data);
      setStayLoading(false);
    } catch (e) {
      setStayError({ error: true, message: e.response.data.message });
    }
  }

  useEffect(() => {
    fetchStay();
  }, []);

  const key = process.env.REACT_APP_stripe_API || '';

  const total = stay
    ? +stay.extra_guests * +stay.extra_fee +
      stay.diff * stay.price +
      +stay.cleaning_fee
    : 0;

  const numberHandler = (property: string) => (num: number) => {
    /* Handler function to pass to NumberSelector components.

       In -> Accepts a property string denoting which property in the stay object
       you wish to update.
       Out -> Returns a function to pass as a callback to NumberSelector
       The callback function accepts a number, which is the new value NumberSelector
       will supply as an argument.

       Won't update value if new value will be less than 0.
    */
    if (stay.hasOwnProperty(property)) {
      if (num >= 1) {
        setStay({ ...stay, [property]: num });
      }
    } else {
      console.error(
        'Checkout -> numberHandler: Property does not exist in object',
      );
    }
  };

  const stringifyCost = (amt: number): string =>
    /* Converts number into a currency string based on user's locale
       Thanks to https://stackoverflow.com/a/31581206
    */
    amt.toLocaleString(undefined, { minimumFractionDigits: 2 });
  return (
    <CheckoutContainer>
      {stayLoading ? (
        <img src={loadingIndicator} alt='animated loading indicator' />
      ) : null}
      {stayError.error ? 'Error fetching your Guest' : null}
      {stay ? (
        <div className='checkout-body'>
          <CheckoutForm>
            {/* TODO: implement onChange to filter through stays */}
            <input
              id='stay-search'
              name='stay'
              placeholder='Search for different stay'
            />
          </CheckoutForm>
          <div className='checkout-left'>
            {stay.photo_url ? (
              <img src={stay.photo_url} alt='Property Image' />
            ) : null}
            <div className='checkout-left-inner'>
              <HeaderGroup>
                <h1 data-testid='guest-name'>{stay.guest_name}</h1>
                <p>Guest</p>
              </HeaderGroup>
              <HeaderGroup>
                <h1>{stay.house_name}</h1>
                <p>Property</p>
              </HeaderGroup>
              <hr />
              <h3>Please select and confirm:</h3>
              <div className='checkout-field'>
                Nights
                <NumberSelector
                  value={stay.diff || 0}
                  disabled={show}
                  onClick={numberHandler('diff')}
                />
              </div>
              <div className='checkout-field'>
                Extra Guests
                <NumberSelector
                  value={stay.extra_guests || 0}
                  disabled={show}
                  onClick={numberHandler('extra_guests')}
                />
              </div>
            </div>
          </div>
          <CheckoutRight>
            <Invoice>
              <h1>Invoice</h1>
              {/* TODO: implement axios call to change stay to account for new inputs */}
              <InvoiceBox>
                <span>
                  {stay.diff} Nights x ${stay.price}
                </span>
                <span>${stringifyCost(stay.price * stay.diff)}</span>
              </InvoiceBox>
              <InvoiceBox>
                <span>Cleaning Fee:</span>
                <span>${stay.cleaning_fee}</span>
              </InvoiceBox>
              {stay.extra_guests ? (
                <InvoiceBox data-testid='extra-guests'>
                  <span>
                    {stay.extra_guests} Extra Guests x ${stay.extra_fee}
                  </span>
                  <span>
                    ${stringifyCost(stay.extra_fee * stay.extra_guests)}
                  </span>
                </InvoiceBox>
              ) : null}
              {show && (
                // @ts-ignore
                <PaymentContext.Provider
                  value={{ sum: total, stay_id: stay.stay_id }}
                >
                  <StripeProvider apiKey={key}>
                    <MyStoreCheckout sum={stay.total} />
                  </StripeProvider>
                </PaymentContext.Provider>
              )}
              {stay.stay_receipt ? (
                <div
                  style={{
                    margin: 'auto',
                    color: 'var(--color-accent-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  This invoice has already been paid
                  <a
                    href={stay.stripe_receipt}
                    rel='noopen noreferer'
                    target='_blank'
                  >
                    <Button
                      text='Receipt'
                      color='#0AA047'
                      className='receipt-button'
                    />
                  </a>
                </div>
              ) : show ? null : (
                <Button
                  className='payment-button'
                  text={stay.diff ? `Pay $ ${stringifyCost(total)}` : `Pay`}
                  color={stay.diff ? 'var(--color-accent-alt)' : '#736f6c'}
                  onClick={() => {
                    setShow(true);
                  }}
                  disabled={!stay.diff}
                  datatestid='payment-button'
                />
              )}
            </Invoice>
          </CheckoutRight>
        </div>
      ) : null}
    </CheckoutContainer>
  );
};

export default Checkout;
