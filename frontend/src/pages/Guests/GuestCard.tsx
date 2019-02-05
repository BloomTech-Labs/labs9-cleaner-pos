import React from 'react';
// Types
import { GuestsProps } from './types';
// Components
import { InfoBox } from './InfoBox';
// Styled Components
import { MainText, SecondaryText } from './Guests.styling';
// Utils
import { generateDisplayDate } from '../utils';
// Assets
import defaultUser from '../../assets/default-user.jpg';

export const GuestCard = (props: GuestsProps) => {
  const {
    stay_id,
    check_in,
    check_out,
    house_name,
    guest_name,
    progress,
    className,
  } = props;

  return (
    <div className={`banner-card ${className}`} data-testid='guest-card'>
      <img
        className='user-image'
        src={defaultUser}
        alt='Default User Picture'
      />
      <div className='text-content'>
        <MainText>{guest_name}</MainText>
        <SecondaryText>Staying in {house_name}</SecondaryText>
      </div>
      <InfoBox
        className='info-check-in'
        main={generateDisplayDate(check_in)}
        secondary='Check-In'
      />
      <InfoBox
        className='info-check-out'
        main={generateDisplayDate(check_out)}
        secondary='Check-Out'
      />

      <InfoBox
        className='info-progress'
        main={
          progress !== null ? `${progress}%` : <i className='fas fa-question' />
        }
        secondary={
          progress !== null ? 'Preparation Progress' : 'No lists found'
        }
      />
    </div>
  );
};
