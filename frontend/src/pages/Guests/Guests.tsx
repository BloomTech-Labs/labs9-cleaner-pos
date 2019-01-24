import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
// Types
import { GuestsProps } from './types';
import { FilterArgs } from './types';
// Components
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
// Styling & Styled Components
import { GuestsDiv, StyledGuestCard } from './Guests.styling';

const Guests = () => {
  const [stays, setStays] = useState([] as GuestsProps[]);
  const [errors, setErrors] = useState({ msg: '', error: false });
  const [active, setActive] = useState('upcoming' as FilterArgs);

  // TODO: Add loading animation

  const getStays = (filter: FilterArgs = 'all') => {
    /*
    Retrieves stay information from server
    Accepts a string 'filter', which would set the appropriate
    filter query in the request.
    */
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
        setActive(filter);
      })
      .catch(axiosErrorHandler(setErrors));
  };

  const activeClass = (filter: FilterArgs) =>
    active === filter ? 'active' : '';

  useEffect(() => {
    getStays('upcoming');
  }, []);

  return (
    <GuestsDiv>
      <div className='guests-header'>
        <h2>Guests</h2>
        <Link to='/guests/new'>
          <Button text='New Guest' colour='var(--colour-accent)' />
        </Link>
      </div>
      <div className='guests-buttons-filter'>
        <Button
          className={`button-filter upcoming ${activeClass('upcoming')}`}
          text='Upcoming'
          colour='var(--colour-accent)'
          onClick={() => getStays('upcoming')}
          datatestid='button-upcoming'
        />
        <Button
          className={`button-filter incomplete ${activeClass('incomplete')}`}
          text='Incomplete'
          colour='var(--colour-accent)'
          onClick={() => getStays('incomplete')}
          datatestid='button-incomplete'
        />
        <Button
          className={`button-filter complete ${activeClass('complete')}`}
          text='Complete'
          colour='var(--colour-accent)'
          onClick={() => getStays('complete')}
          datatestid='button-complete'
        />
      </div>
      <div className='guests-errors'>{errors.msg}</div>
      {stays.map((stay) => (
        <StyledGuestCard key={stay.stay_id} {...stay} />
      ))}
    </GuestsDiv>
  );
};

export default Guests;
