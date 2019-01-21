import React, { useState, useEffect } from 'react';
import { Container, LeafletMap } from '../../components/index';
import axios from 'axios';
import { axiosErrorHandler } from '../utils';

const HouseDetails = (props: any) => {
  const [house, setHouse] = useState(props.location.state);
  const [errors, setErrors] = useState({ msg: '', error: false });
  let shouldFetch = house ? false : true;
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com/';
  async function fetchHouse(id: number) {
    try {
      const res = await axios.get(`${url}/houses/${id}`);
      setHouse(res.data);
      shouldFetch = false;
      console.log('test');
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }
  if (shouldFetch) {
    fetchHouse(props.match.params.id);
  }

  return (
    <Container>
      <LeafletMap />
      <h1>Hello World!2</h1>
      <p>More awesome details to come!</p>
    </Container>
  );
};

export default HouseDetails;
