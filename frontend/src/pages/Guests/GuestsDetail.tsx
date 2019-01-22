import React from 'React';
// Styled and Styled Components
import { GuestsDiv } from './Guests.styling';
// Assets
import defaultUser from '../../assets/default-user.jpg';

export const GuestDetail = () => {
  return (
    <GuestsDiv>
      <div className='guest-header'>
        <img className='guest-header--img' src={defaultUser} alt='User Image' />
        <div className='guest-header--text'>Hello</div>
        <div className='guest-header--checkdates'>Hello</div>
        <div className='guest-header--buttons'>Hello</div>
      </div>
    </GuestsDiv>
  );
};
