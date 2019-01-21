import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
// Types
import { GuestProps } from './types';
// Components
import Button from '../../components/Button';
// Styling & Styled Components
import { GuestsDiv, StyledGuestCard } from './Guests.styling';

const Guests = () => {
  const [stays, setStays] = useState([] as GuestProps[]);
  const [errors, setErrors] = useState({ msg: '', error: false });

  const getStays = (filter = 'all') => {
    const token = localStorage.getItem('token');

    if (!token) {
      setErrors({
        msg: 'Authentication error. Please try logging in again.',
        error: true,
      });
      return;
    }

    const headers: AxiosRequestConfig = {
      headers: { Authorization: token },
    };

    const url =
      process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com/';

    axios
      .get(`${url}/stays?${'filter=' + filter}&test=true`, headers)
      .then((response) => {
        const { data } = response;
        setStays(data);
      })
      .catch(axiosErrorHandler(setErrors));
  };

  useEffect(() => {
    getStays('upcoming');
  }, []);

  return (
    <GuestsDiv>
      <div className='guests-header'>
        <h2>Guests</h2>
        <Button text='New Guest' colour='var(--colour-accent)' />
      </div>
      <div className='guests-buttons-filter'>
        <Button
          className='button-filter upcoming'
          text='Upcoming'
          colour='var(--colour-accent)'
          onClick={() => getStays('upcoming')}
        />
        <Button
          className='button-filter incomplete'
          text='Incomplete'
          colour='var(--colour-accent)'
          onClick={() => getStays('incomplete')}
        />
        <Button
          className='button-filter complete'
          text='Complete'
          colour='var(--colour-accent)'
          onClick={() => getStays('complete')}
        />
      </div>
      <div className='guests-errors'>{errors.msg}</div>
      {stays.map((stay) => (
        <StyledGuestCard {...stay} />
      ))}
    </GuestsDiv>
  );
};

export default Guests;
