import React, { useLayoutEffect, useState } from 'react';
import { Container } from '../../components';
import { RouteComponentProps } from 'react-router';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosErrorHandler } from '../utils';
import { number } from 'prop-types';
import { setupMaster } from 'cluster';

interface CheckoutProps extends RouteComponentProps {
  match: any;
}

const Checkout = (props: CheckoutProps) => {
  const [error, setError] = useState<any>({ msg: '', error: false });
  const [guest, setGuest] = useState({
    guest_name: '',
    house_id: 0,
    house_name: '',
    check_in: '',
    check_out: '',
  });
  console.log(props);
  console.log(guest);

  const token = localStorage.getItem('token');
  const headers: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com/';

  const { id } = props.match.params;

  async function fetchStay() {
    try {
      const { data }: AxiosResponse = await axios.get(`${url}/stays/${id}`);
      setGuest(data);
      console.log(data);
    } catch (e) {
      axiosErrorHandler(setError);
    }
  }
  useLayoutEffect(() => {
    fetchStay();
  }, []);
  const { guest_name, house_id, house_name, check_in, check_out } = guest;
  return (
    <Container>
      <h1>{guest_name}</h1>
    </Container>
  );
};

export default Checkout;
