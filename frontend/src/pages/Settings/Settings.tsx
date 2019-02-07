import React, { useEffect, useState, useContext } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { FileUploadHOF } from '../../components/FileUpload';
import { PostRegister } from '../../pages/';
import { useFetch, axiosFetch } from '../../helpers';
import { UserContext } from '../../App';
import { Container, Button } from '../../components/';
import {
  Card,
  Header,
  LeftContainer,
  Positioner,
  RightContainer,
  ThumbNail,
  UserCard,
} from './Settings.styling';
import { RouteComponentProps } from 'react-router';
import loadingIndicator from '../utils/loading.svg';
import defaultUser from '../../assets/default-user.jpg';

const url =
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

const clientId = process.env.REACT_APP_clientid;
const stripeOauthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=
${clientId}&scope=read_write`;

const Settings: React.SFC<RouteComponentProps> = (props) => {
  const userC = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [pic, setPic] = useState('');
  const [user, error, loading] = useFetch(`${url}/users`, fetch);
  const [paymentError, setPaymentError] = useState({ err: false, message: '' });
  const addressArray = user && user.address ? user.address.split('\n') : '';
  if (addressArray && addressArray.length < 6) {
    addressArray.splice(1, 0, '');
  }
  let subInfo = 'Not Subscribed';
  if (userC.subscription === 1) {
    subInfo = 'Basic';
  } else if (userC.subscription === 2) {
    subInfo = 'Professional';
  }
  useEffect(() => {
    const { search } = props.location;
    const params = search.match(/code=(.*)/);

    if (params !== null && params.length === 2) {
      const headers: AxiosRequestConfig = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const authorizationCode = params[1];
      axios
        .post(`${url}/connect`, { authorizationCode }, headers)
        .then((res) => {
          localStorage.setItem('connteced', 'true');
          userC.setConnect(true);
          props.history.replace('/settings');
        })
        .catch((e) => e);
    }
  }, []);

  const UrlFileUpload = FileUploadHOF(async (urls: string, type?: string) => {
    await axiosFetch('put', `${url}/users`, {
      photoUrl: urls,
    }).catch((e: any) => {
      console.error(e);
    });
    setFetch((prev) => !prev);
  });

  const userProps = { ...props, ...user };
  return (
    <Container>
      <Header>
        <h2>Account Settings</h2>
      </Header>
      <Card>
        {error.msg ? (
          <div>Something went wrong! Please refresh this page</div>
        ) : null}
        <LeftContainer>
          <Positioner className='left-mob'>
            <Positioner>
              {user ? <ThumbNail src={user.photoUrl || defaultUser} /> : null}
              <h3>{user ? user.full_name : null}</h3>
            </Positioner>
            <Positioner>
              <UrlFileUpload type='photo_url' text='Change Photo' />
            </Positioner>
            <Positioner>
              <Button text='Update Contact' onClick={() => setShow(!show)} />
            </Positioner>
          </Positioner>
        </LeftContainer>
        <RightContainer>
          {show ? (
            <>
              <Header>
                <h3>Update Contact Info</h3>
              </Header>
              <PostRegister
                className=''
                {...userProps}
                setShow={setShow}
                setFetch={setFetch}
              />
            </>
          ) : (
            <>
              <Header>
                <h3>Account Info</h3>
              </Header>
              <UserCard>
                {loading ? (
                  <img src={loadingIndicator} alt='animated loader' />
                ) : null}
                {user ? (
                  <>
                    <div className='line-item'>
                      <span>Role: </span>
                      <div className='line-info'>{user.role}</div>
                    </div>
                    {userC.role === 'manager' ? (
                      <>
                        <div className='line-item'>
                          <span>Subscription: </span>
                          <div>{subInfo}</div>
                        </div>
                        <div className='line-item'>
                          <span>Stripe: </span>
                          <div>
                            {userC.connected ? (
                              'Connected!'
                            ) : (
                              <a href={stripeOauthUrl}>
                                <Button
                                  className='small-button'
                                  text='Connect!'
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </>
                ) : null}
              </UserCard>
              <Header>
                <h3>Contact Info</h3>
              </Header>
              <UserCard>
                {loading ? (
                  <img src={loadingIndicator} alt='animated loader' />
                ) : null}
                {user ? (
                  <>
                    <div className='line-item'>
                      <span>Email: </span>
                      <div>{user.email}</div>
                    </div>
                    <div className='line-item'>
                      <span>Address: </span>
                      <div>{addressArray[0]}</div>
                    </div>
                    <div className='line-item'>
                      <span>Address (cont.): </span>
                      <div>{addressArray[1]}</div>
                    </div>
                    <div className='line-item'>
                      <span>City: </span>
                      <div>{addressArray[2]}</div>
                    </div>
                    <div className='line-item'>
                      <span>State: </span>
                      <div>{addressArray[3]}</div>
                    </div>
                    <div className='line-item'>
                      <span>Country: </span>
                      <div>{addressArray[4]}</div>
                    </div>
                    <div className='line-item'>
                      <span>Post Code: </span>
                      <div>{addressArray[5]}</div>
                    </div>
                    <div className='line-item'>
                      <span>Phone: </span>
                      <div>{user.phone}</div>
                    </div>
                  </>
                ) : null}
              </UserCard>
            </>
          )}
        </RightContainer>
      </Card>
    </Container>
  );
};

export default Settings;
