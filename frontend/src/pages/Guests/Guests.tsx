import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosErrorHandler } from '../utils';
// Types
import { GuestProps } from './types';
// Components
import { GuestCard } from './GuestCard';
// Styling & Styled Components
import Container from '../../components/Container';
import { GuestsDiv, StyledGuestCard } from './Guests.styling';
import styled from '@emotion/styled';

const Guests = () => {
  const [stays, setStays] = useState([] as GuestProps[]);
  const [errors, setErrors] = useState({ msg: '', error: false });

  useEffect(() => {
    const url =
      process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com/';
    axios
      .get(`${url}/stays?extit=1`)
      .then((response) => {
        const { data } = response;
        setStays(data);
      })
      .catch(axiosErrorHandler(setErrors));
  }, []);

  return (
    <GuestsDiv>
      {/* <div className='title'>
        <h2>Guests</h2>
      </div> */}
      {stays.map((stay) => (
        <StyledGuestCard {...stay} />
      ))}
      <div>{errors.msg}</div>
    </GuestsDiv>
  );
};

export default Guests;
