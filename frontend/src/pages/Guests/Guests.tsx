import React, { useState } from 'react';
// Types
import { GuestsProps } from './types';
import { FilterArgs } from './types';
// Components
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
// Styling & Styled Components
import {
  GuestsDiv,
  StyledGuestCard,
  StyledGuestCardFiller,
} from './Guests.styling';
import { useFetch } from '../../helpers';
import loadingIndicator from '../utils/loading.svg';

const Guests = () => {
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';
  const [active, setActive] = useState('upcoming' as FilterArgs);
  const [stays, error, loading] = useFetch(`${url}/stays?filter=${active}`);

  const activeClass = (filter: FilterArgs) =>
    active === filter ? 'active' : '';

  return (
    <GuestsDiv>
      <div className='guests-header'>
        <h2>Guests</h2>
        <Link to='/guests/new'>
          <Button text='+ New Guest' color='var(--color-accent)' />
        </Link>
      </div>
      <div className='guests-buttons-filter'>
        <Button
          className={`button-filter upcoming ${activeClass('upcoming')}`}
          text='Upcoming'
          color='var(--color-text-accent)'
          onClick={() => setActive('upcoming')}
          datatestid='button-upcoming'
        />
        <Button
          className={`button-filter incomplete ${activeClass('incomplete')}`}
          text='Incomplete'
          color='var(--color-text-accent)'
          onClick={() => setActive('incomplete')}
          datatestid='button-incomplete'
        />
        <Button
          className={`button-filter complete ${activeClass('complete')}`}
          text='Complete'
          color='var(--color-text-accent)'
          onClick={() => setActive('complete')}
          datatestid='button-complete'
        />
      </div>
      {error.error ? error.msg : null}
      <div className='guests-errors'>{error.msg}</div>
      <div className='guests-cards'>
        {loading ? (
          <img src={loadingIndicator} alt='animated loading indicator' />
        ) : null}
        {stays
          ? stays.map((stay: any) => (
              <Link key={stay.stay_id} to={`/guests/${stay.stay_id}`}>
                <StyledGuestCard {...stay} />
              </Link>
            ))
          : null}
        {stays && stays.length === 0 ? (
          <StyledGuestCardFiller>
            <div className='text-content'>No {active} Guests</div>
          </StyledGuestCardFiller>
        ) : null}
        <div />
      </div>
    </GuestsDiv>
  );
};

export default Guests;
