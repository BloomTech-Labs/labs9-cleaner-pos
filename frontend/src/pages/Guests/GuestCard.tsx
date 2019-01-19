import React from 'react';
// Components
import { InfoBox } from './InfoBox';
// Types
import { GuestProps } from './types';
// Styles
import { MainText, SecondaryText } from './Guests.styling';
// Assets
import defaultUser from '../../assets/default-user.jpg';

export const GuestCard = (props: GuestProps) => {
  const {
    check_in,
    check_out,
    house_name,
    guest_name,
    progress,
    className,
  } = props;

  return (
    <div className={`banner-card ${className}`}>
      <img
        className='user-image'
        src={defaultUser}
        alt='Default User Picture'
      />
      <div className='text-content'>
        <MainText>{guest_name}</MainText>
        <SecondaryText>Staying in {house_name}</SecondaryText>
      </div>
      <InfoBox className='info-check-in' main={check_in} secondary='Check-In' />
      <InfoBox
        className='info-check-out'
        main={check_out}
        secondary='Check-Out'
      />
      <InfoBox
        className='info-progress'
        main={`${progress}%`}
        secondary='Preparation Progress'
      />
    </div>
  );
};
