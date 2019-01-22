import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
// Types
import { RouteComponentProps } from 'react-router';
import { GuestProps } from './types';
// Styled and Styled Components
import { GuestsDiv } from './Guests.styling';
// Assets
import defaultUser from '../../assets/default-user.jpg';

export const GuestDetailView = ({
  guest_name,
  house_id,
  house_address,
  default_ast,
  guest_guide,
  ast_guide,
  check_in,
  check_out,
}: GuestProps) => {
  return (
    <GuestsDiv>
      <div className='guest-header'>
        <img className='guest-header--img' src={defaultUser} alt='User Image' />
        <div className='guest-header--text'>
          <div className='main'>{guest_name}</div>
        </div>
        <div className='guest-header--checkdates'>Hello</div>
        <div className='guest-header--buttons'>Hello</div>
      </div>
      <div className='guest-info'>
        <div className='guest-info--checklist'>
          <div className='guest-info--checklist-top'>
            <div className='top-text'>Stay Information and Checklists</div>
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

export const GuestDetail = (props: RouteComponentProps) => {
  const [stay, setStay] = useState({} as GuestProps);
  const [errors, setErrors] = useState({ msg: '', error: false });

  useEffect(() => {
    const id = props.match.params.id;
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
      .get(`${url}/stay/${id}`)
      .then((response) => {
        const { data } = response;
        setStay(data);
      })
      .catch(axiosErrorHandler(setErrors));
  });

  return <GuestDetailView {...stay} />;
};
