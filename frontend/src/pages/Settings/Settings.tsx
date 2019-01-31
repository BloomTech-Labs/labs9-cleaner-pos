import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { PostRegister } from '../../pages/';
import { useFetch } from '../../helpers';
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

const url =
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

const clientId = process.env.REACT_APP_clientid;
const stripeOauthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=
${clientId}&scope=read_write`;

const Settings: React.SFC<RouteComponentProps> = (props) => {
  const [user, error, loading] = useFetch(`${url}/users`);
  const [show, setShow] = useState(false);

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

  const userProps = { ...props, ...user };
  return (
    <Container>
      <Header>
        <h2>Account Settings</h2>
        <Card>
          {error.msg ? (
            <div>Something went wrong! Please refresh this page</div>
          ) : null}
          <LeftContainer>
            <Positioner>
              <p>Connect your stripe account:</p>
              <a href={stripeOauthUrl}>
                <Button className='fancy-button' text='Connect' />
              </a>
            </Positioner>
            <Positioner>
              <>
                <p>Update your profile:</p>
                <Button text='Update' onClick={() => setShow(!show)} />
              </>
            </Positioner>
          </LeftContainer>
          <RightContainer>
            {show ? (
              <PostRegister {...userProps} setShow={setShow} />
            ) : (
              <>
                <UserCard>
                  {loading ? (
                    <img src={loadingIndicator} alt='animated loader' />
                  ) : null}
                  {user ? (
                    <ThumbNail
                      src={
                        user.photoUrl ||
                        'https://avatars0.githubusercontent.com/u/37676385?s=460&v=4'
                      }
                    />
                  ) : null}
                  {user ? (
                    <>
                      <h3>{user ? user.full_name : null}</h3>
                      <p>Email: {user.email}</p>
                      <p>
                        Address:{' '}
                        {user.address
                          ? user.address
                              .split('\n')
                              .map((e: string, i: number) => {
                                return (
                                  <span style={{ marginRight: '5px' }} key={i}>
                                    {e}
                                  </span>
                                );
                              })
                          : null}
                      </p>
                    </>
                  ) : null}
                </UserCard>
              </>
            )}
          </RightContainer>
        </Card>
      </Header>
    </Container>
  );
};

export default Settings;
