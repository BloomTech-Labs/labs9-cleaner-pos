import React from 'react';
import axios from 'axios';
// Styling
import Container from '../../components/Container';
import { GuestsDiv } from './Guests.styling';
import defaultUser from '../../assets/default-user.jpg';
import styled from '@emotion/styled';

interface GuestProps {
  stay_id: number;
  house_id: number;
  guest_name: string;
  house_name: string;
  check_in: string;
  check_out: string;
  progress: number;
  className?: string;
}

const MainText = styled.div`
  display: block;
  font-family: 'Roboto Bold', Arial, sans-serif;
  font-size: 30;
`;

const SecondaryText = styled.div`
  display: inline-block;
  font-family: 'Roboto Light', Arial, sans-serif;
  font-size: 16;
`;

const GuestCard = (props: GuestProps) => {
  const { house_name, guest_name, className } = props;

  return (
    <div className={`banner-card ${className}`}>
      <img
        className='user-image'
        src={defaultUser}
        alt='Default User Picture'
      />
      <MainText>{guest_name}</MainText>
      <SecondaryText>Staying in {house_name}</SecondaryText>
    </div>
  );
};

const Guests = () => {
  return (
    <GuestsDiv>
      {/* <div className='title'>
        <h2>Guests</h2>
      </div> */}
    </GuestsDiv>
  );
};

export default Guests;
