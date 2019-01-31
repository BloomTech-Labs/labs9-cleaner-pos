import React, { useState, useEffect } from 'react';
// Types
import { RouteComponentProps } from 'react-router';
import { IncomingGuestProps, GuestProps } from './types';
// Components
import { InfoBox } from './InfoBox';
import { Checklist } from './Checklist';
import { AstDropdown } from './AstDropdown';
import { FileUploadHOF } from '../../components/FileUpload';
import Button from '../../components/Button';
// Styled and Styled Components
import { GuestsDiv } from './Guests.styling';
import { GuestDetailStyle } from './GuestDetail.styling';
import { MainText, SecondaryText } from './Guests.styling';
// Utilities
import { generateDisplayDate } from '../utils';
import { axiosFetch, useFetch } from '../../helpers/';
import { Link } from 'react-router-dom';
// Assets
import defaultUser from '../../assets/default-user.jpg';
import loadingIndicator from '../utils/loading.svg';

const GuestDetail = (props: RouteComponentProps) => {
  // @ts-ignore
  const id = props.match.params.id;
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

  // const [stay, error, loading] = useFetch(`${url}/stays/${id}`);
  const [stay, setStay] = useState((null as unknown) as IncomingGuestProps);
  const [error, setError] = useState({ msg: '', error: false });

  const fetchData = () => {
    axiosFetch('get', `${url}/stays/${id}`).then(([data, exception]) => {
      if (exception.error) {
        setError(exception);
      } else {
        setStay(data);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const guideUpload = FileUploadHOF(
    async (uploadedUrl: string, type?: string) => {
      const { house_id } = stay;

      const body = type ? { [type]: uploadedUrl } : {};

      await axiosFetch('put', `${url}/houses/${house_id}`, body).catch(
        (e: any) => {
          console.error(e);
          setError(e);
        },
      );

      fetchData();
    },
  );

  const goBack = () => props.history.push('/guests');

  return (
    <>
      {stay ? (
        <GuestDetailView
          {...stay}
          Uppy={guideUpload}
          goBack={goBack}
          errors={error}
        />
      ) : (
        <img
          style={{ margin: 'auto' }}
          src={loadingIndicator}
          alt='animated loading indicator'
        />
      )}
    </>
  );
};

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
  Uppy,
  goBack,
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
            color='var(--color-accent)'
            datatestid='button-back'
            onClick={goBack}
          />
        </div>
      </div>
      <div className='guest-info'>
        <div className='guest-info--top'>
          <div className='top-text'>
            <h2>Stay Information and Checklists</h2>
          </div>
        </div>
        <div className='guest-info--bottom'>
          <div className='guest-info--bottom-left'>
            <div className='guest-info--checklist'>
              <div className='guest-info--checklist-top'>
                <div className='top-text'>
                  <h2>Checklists</h2>
                </div>
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
                <div className='top-text'>
                  <h2>Assistants and Resources</h2>
                </div>
              </div>
              <div className='guest-info--resources-bottom'>
                <AstDropdown className='left' houseId={house_id} />
                {ast_guide ? (
                  <div className='guide'>
                    <a href={ast_guide} target='_blank'>
                      <i className='fas fa-file' />
                    </a>
                    <br />
                    <label>Assistant Guide</label>
                  </div>
                ) : (
                  <div className='guide'>
                    {/* <i className='fas fa-question' /> */}
                    <Uppy type='ast_guide' text='Upload' />
                    <br />
                    <label>No Assistant Guide</label>
                  </div>
                )}
                {guest_guide ? (
                  <div className='guide'>
                    <a href={guest_guide} target='_blank'>
                      <i className='fas fa-file' />
                    </a>
                    <br />
                    <label>Guest Guide</label>
                  </div>
                ) : (
                  <div className='guide'>
                    {/* <i className='fas fa-question' /> */}
                    <Uppy type='guest_guide' text='Upload' />
                    <br />
                    <label>No Guest Guide</label>
                  </div>
                )}
              </div>
            </div>
            <div className='guest-info--checkout'>
              <div className='guest-info--checkout-top'>
                <div className='top-text'>
                  <h2>Checkout and Invoice</h2>
                </div>
              </div>
              <div className='guest-info--checkout-bottom'>
                <div className='stay-code'>
                  <MainText>47CLY</MainText>
                  <div style={{ margin: 'auto' }}>Guest Login Code</div>
                </div>
                <Button className='button-invoice' text='Invoice' />
                <Link className='link-checkout' to={`/checkout/${stay_id}`}>
                  <Button className='button-checkout' text='Checkout' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestDetailStyle>
  );
};

export default GuestDetail;
