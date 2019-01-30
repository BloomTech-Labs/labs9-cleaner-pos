import React from 'react';
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
import { MainText, SecondaryText } from './Guests.styling';
// Utilities
import { generateDisplayDate } from '../utils';
import { useFetch } from '../../helpers/';
import { Link } from 'react-router-dom';
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
                    <i className='fas fa-question' />
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
                    <i className='fas fa-question' />
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

const GuestDetail = (props: RouteComponentProps) => {
  // @ts-ignore
  const id = props.match.params.id;
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

  const [stay, error, loading] = useFetch(`${url}/stays/${id}`);

  return <>{stay ? <GuestDetailView {...stay} errors={error} /> : null}</>;
};

export default GuestDetail;
