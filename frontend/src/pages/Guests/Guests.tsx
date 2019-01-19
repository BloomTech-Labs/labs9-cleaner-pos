import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosErrorHandler } from '../utils';
// Styling
import Container from '../../components/Container';
import { GuestsDiv } from './Guests.styling';
import defaultUser from '../../assets/default-user.jpg';
import styled from '@emotion/styled';

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

const InfoBox = (props: {
  main: string;
  secondary: string;
  className?: string;
}) => {
  const InfoDiv = styled.div`
    border: 1px solid rgba(22, 21, 20, 0.12);
    background-color: white;

    .main-text {
      font-family: 'Roboto Medium', Arial, sans-serif;
      font-size: ${36 / 16}rem;
    }

    .secondary-text {
      font-family: 'Roboto Light', Arial, sans-serif;
      font-size: ${20 / 16}rem;
    }
  `;

  const { main, secondary, className } = props;
  return (
    <InfoDiv className={className}>
      <div className='main-text'>{main}</div>
      <div className='secondary-text'>{secondary}</div>
    </InfoDiv>
  );
};

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

const GuestCard = (props: GuestProps) => {
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
      <InfoBox main={check_in} secondary='Check-In' />
      <InfoBox main={check_out} secondary='Check-Out' />
      <InfoBox main={`${progress}%`} secondary='Preparation Progress' />
    </div>
  );
};

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
      {/* <div className='title'>
        <h2>Guests</h2>
      </div> */}
      {stays.map((stay) => (
        <GuestCard {...stay} />
      ))}
      <div>{errors.msg}</div>
    </GuestsDiv>
  );
};

export default Guests;
