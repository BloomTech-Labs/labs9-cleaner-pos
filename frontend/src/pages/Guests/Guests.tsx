import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
      <div className='guests-header'>
        <h2>Guests</h2>
        <Button
          text='New Guest'
          colour='var(--colour-accent)'
        />
      </div>
      <div className='guests-buttons-filter'>
        <Button
          className='button-filter upcoming'
          text='Upcoming'
          colour='var(--colour-accent)'
        />
        <Button
          className='button-filter incomplete'
          text='Incomplete'
          colour='var(--colour-accent)'
        />
        <Button
          className='button-filter complete'
          text='Complete'
          colour='var(--colour-accent)'
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
