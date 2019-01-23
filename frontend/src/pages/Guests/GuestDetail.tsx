import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
// Types
import { RouteComponentProps } from 'react-router';
import { GuestProps } from './types';
// Components
import { InfoBox } from './InfoBox';
import { Checklist } from './Checklist';
import { AstDropdown } from './AstDropdown';
import Button from '../../components/Button';
// Styled and Styled Components
import { GuestsDiv } from './Guests.styling';
import { GuestDetailStyle } from './GuestDetail.styling';
// Utilities
import { generateDisplayDate } from '../utils';
// Assets
import defaultUser from '../../assets/default-user.jpg';

export const GuestDetailView = ({
  stay_id,
  guest_name,
  house_id,
  house_name,
  house_address,
  default_ast,
  guest_guide,
  ast_guide,
  check_in,
  check_out,
  errors,
}: GuestProps) => {
  return (
    <GuestDetailStyle>
      {errors.error && <div>{errors.msg}</div>}
      <div className='guest-header'>
        <img className='guest-header--img' src={defaultUser} alt='User Image' />
        <div className='guest-header--text'>
          <div className='main'>{guest_name}</div>
          <div className='sub-house'>Staying at {house_name}</div>
          <div className='sub-address'>{house_address}</div>
        </div>
        <div className='guest-header--checkdates'>
          <InfoBox
            className='checkin'
            main={generateDisplayDate(check_in)}
            secondary='Check-In'
          />
          <InfoBox
            className='checkout'
            main={generateDisplayDate(check_out)}
            secondary='Check-Out'
          />
        </div>
        <div className='guest-header--buttons'>
          <Button
            className='back'
            text='Go Back ↩'
            colour='var(--colour-accent)'
            datatestid='button-back'
          />
        </div>
      </div>
      <div className='guest-info'>
        <div className='guest-info--top'>
          <div className='top-text'>Stay Information and Checklists</div>
        </div>
        <div className='guest-info--bottom'>
          <div className='guest-info--bottom-left'>
            <div className='guest-info--checklist'>
              <div className='guest-info--checklist-top'>
                <div className='top-text'>Checklists</div>
              </div>
              <Checklist
                className='guest-info--checklist-bottom'
                stayId={stay_id}
              />
            </div>
          </div>
          <div className='guest-info--bottom-right'>
            <div className='guest-info--resources'>
              <div className='guest-info--resources-top'>
                <div className='top-text'>Assistants and Resources</div>
              </div>
              <div className='guest-info--resources-bottom'>
                <AstDropdown className='left' houseId={house_id} />
                <div className='right'>
                  {ast_guide ? (
                    <div className='ast-guide'>
                      <a href={ast_guide} target='_blank'>
                        <i className='fas fa-file' />
                      </a>
                      <br />
                      <label>Assistant Guide</label>
                    </div>
                  ) : (
                    <div className='ast-guide'>
                      <i className='fas fa-question' />
                      <br />
                      <label>No Assistant Guide</label>
                    </div>
                  )}
                  {guest_guide ? (
                    <div className='guest-guide'>
                      <a href={guest_guide} target='_blank'>
                        <i className='fas fa-file' />
                      </a>
                      <br />
                      <label>Guest Guide</label>
                    </div>
                  ) : (
                    <div className='guest-guide'>
                      <i className='fas fa-question' />
                      <br />
                      <label>No Guest Guide</label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='guest-info--checkout'>
              <div className='guest-info--checkout-top'>
                <div className='top-text'>Checkout and Invoice</div>
              </div>
              <div className='guest-info--checkout-bottom'>
                <div className='buttons'>
                  <Button className='button-invoice' text='Invoice' />
                  <Button className='button-checkout' text='Checkout' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestDetailStyle>
  );
};

const GuestDetail = (props: RouteComponentProps) => {
  const [stay, setStay] = useState({} as GuestProps);
  const [errors, setErrors] = useState({ msg: '', error: false });

  useEffect(() => {
    // TODO: Figure out how to extend RouteComponentPros with params.id
    // @ts-ignore
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
      .get(`${url}/stays/${id}`, headers)
      .then((response) => {
        const { data } = response;
        setStay({ ...data, stay_id: id });
      })
      .catch(axiosErrorHandler(setErrors));
  }, []);

  return <GuestDetailView {...stay} errors={errors} />;
};

export default GuestDetail;
