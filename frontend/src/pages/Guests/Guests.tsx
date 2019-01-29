import React, { useState } from 'react';
// Types
import { GuestsProps } from './types';
import { FilterArgs } from './types';
// Components
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
// Styling & Styled Components
import { GuestsDiv, StyledGuestCard } from './Guests.styling';
import { useFetch } from '../../helpers';

const Guests = () => {
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';
  const [errors, setErrors] = useState({ msg: '', error: false });
  const [active, setActive] = useState('upcoming' as FilterArgs);
  const [stays, error, loading] = useFetch(
    `${url}/stays?filter=${active}&test=true`,
  );

  // TODO: Add loading animation

  const activeClass = (filter: FilterArgs) =>
    active === filter ? 'active' : '';

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
          onClick={() => setActive('upcoming')}
          datatestid='button-upcoming'
        />
        <Button
          className={`button-filter incomplete ${activeClass('incomplete')}`}
          text='Incomplete'
          colour='var(--colour-accent)'
          onClick={() => setActive('incomplete')}
          datatestid='button-incomplete'
        />
        <Button
          className={`button-filter complete ${activeClass('complete')}`}
          text='Complete'
          colour='var(--colour-accent)'
          onClick={() => setActive('complete')}
          datatestid='button-complete'
        />
      </div>
      {error.error ? error.msg : null}
      {loading ? '...Loading' : null}
      {stays ? (
        <>
          <div className='guests-errors'>{errors.msg}</div>
          <div className='guests-cards'>
            {stays.map((stay: any) => (
              <Link key={stay.stay_id} to={`/guests/${stay.stay_id}`}>
                <StyledGuestCard {...stay} />
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </GuestsDiv>
  );
};

export default Guests;
