import React from 'react';
// Types
import { GuestsProps } from './types';
// Components
import { InfoBox } from './InfoBox';
// Styled Components
import { MainText, SecondaryText } from './Guests.styling';
// Assets
import defaultUser from '../../assets/default-user.jpg';

function separateDateString(dateString: string) {
  /*
  This function expects a date string input like this:
  '2019-01-27T08:00:00.000Z'
  returns {
      year: string,
      month: string,
      day: string;
  }
  */
  const [year, month, day, ...other] = dateString.split(/[-T]+/);

  return {
    year,
    month,
    day,
  };
}

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

  const generateDisplayDate = (dateString: string) => {
    const { month, day } = separateDateString(dateString);
    return `${month} / ${day}`;
  };

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
        main={`${progress}%`}
        secondary='Preparation Progress'
      />
    </div>
  );
};
