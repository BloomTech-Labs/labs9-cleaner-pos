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
      <div className='guest-info'>
        <div className='guest-info--checklist'>
          <div className='guest-info--checklist-top'>
            <div className='top-text'>Checklist</div>
            <div className='progress'>50%</div>
          </div>
          <div className='guest-info--checklist-bottom'>hey</div>
        </div>
        <div className='guest-info-=resources'>
          <div className='guest-info--resources-top'>
            <div className='top-text'>Assistants and Resources</div>
          </div>
          <div className='guest-info--resources-bottom'>hey</div>
        </div>
        <div className='guest-info--checkout'>
          <div className='guest-info--checkout-top'>
            <div className='top-text'>Checkout and Invoice</div>
          </div>
          <div className='guest-info--checkout-bottom'>
            <div className='code'>AB47C</div>
            <div className='buttons'>Invoice</div>
          </div>
        </div>
      </div>
    </GuestsDiv>
  );
};
