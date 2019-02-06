import React, { useEffect, useState, useContext } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { FileUploadHOF } from '../../components/FileUpload';
import { PostRegister } from '../../pages/';
import { useFetch } from '../../helpers';
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
  const [user, error, loading] = useFetch(`${url}/users`);
  const [show, setShow] = useState(false);
  const [paymentError, setPaymentError] = useState({ err: false, message: '' });
  console.log(user);
  console.log(userC);
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
          props.history.replace('/settings');
        })
        .catch((e) => e);
    }
  }, []);
  const UrlFileUpload = FileUploadHOF((urls: string, type?: string) => {
    if (type) {
      console.log(urls);
    }
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
          <Positioner outline>
            <div>
              {user ? <ThumbNail src={user.photoUrl || defaultUser} /> : null}
              <h3>{user ? user.full_name : null}</h3>
            </div>
            <Positioner>
              <UrlFileUpload type='photo_url' text='Change Photo' />
            </Positioner>
            <Positioner>
              <Button text='Update Contact' onClick={() => setShow(!show)} />
            </Positioner>
          </Positioner>
          <Positioner>
            <p>Connect your stripe account:</p>
            <a href={stripeOauthUrl}>
              <Button text='Connect' />
            </a>
          </Positioner>
        </LeftContainer>
        <RightContainer>
          {show ? (
            <>
              <Header>
                <h3>Update Contact Info</h3>
              </Header>
              <PostRegister {...userProps} setShow={setShow} />
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
                            {user.stripeUID ? (
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
                      {user.address
                        ? user.address
                            .split('\n')
                            .map((e: string, i: number) => {
                              return (
                                <div style={{ marginRight: '5px' }} key={i}>
                                  {e}
                                </div>
                              );
                            })
                        : null}
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
  // return (
  //   <Container>
  //     <Header>
  //       <h2>Account Settings</h2>
  //       <Card>
  //         {error.msg ? (
  //           <div>Something went wrong! Please refresh this page</div>
  //         ) : null}
  //         <LeftContainer>
  //           <Positioner>
  //             <p>Connect your stripe account:</p>
  //             <a href={stripeOauthUrl}>
  //               <Button className='fancy-button' text='Connect' />
  //             </a>
  //           </Positioner>
  //           <Positioner>
  //             <>
  //               <p>Update your profile:</p>
  //               <Button text='Update' onClick={() => setShow(!show)} />
  //             </>
  //           </Positioner>
  //         </LeftContainer>
  //         <RightContainer>
  //           {show ? (
  //             <PostRegister {...userProps} setShow={setShow} />
  //           ) : (
  //             <>
  //               <UserCard>
  //                 {loading ? (
  //                   <img src={loadingIndicator} alt='animated loader' />
  //                 ) : null}
  //                 {user ? (
  //                   <ThumbNail src={user.photoUrl || defaultUser} />
  //                 ) : null}
  //                 {user ? (
  //                   <>
  //                     <h3>{user ? user.full_name : null}</h3>
  //                     <p>Email: {user.email}</p>
  //                     <p>
  //                       Address:{' '}
  //                       {user.address
  //                         ? user.address
  //                             .split('\n')
  //                             .map((e: string, i: number) => {
  //                               return (
  //                                 <span style={{ marginRight: '5px' }} key={i}>
  //                                   {e}
  //                                 </span>
  //                               );
  //                             })
  //                         : null}
  //                     </p>
  //                   </>
  //                 ) : null}
  //               </UserCard>
  //             </>
  //           )}
  //         </RightContainer>
  //       </Card>
  //     </Header>
  //   </Container>
  // );
};

export default Settings;
