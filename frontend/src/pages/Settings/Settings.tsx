import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Link } from 'react-router-dom';
import { PostRegister } from '../../pages/';
import { useFetch } from '../../helpers';
import { Container, Button } from '../../components/';
import { Card, Positioner, Header } from './Settings.styling';
import { RouteComponentProps } from 'react-router';
import img from '../utils/loading.svg';

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

  console.log(user);

  const userProps = { ...props, ...user };
  return (
    <Container>
      <Header>
        <h2>Account Settings</h2>
        <Card>
          {loading ? <img src={img} alt='animated loader' /> : null}
          {error.msg ? (
            <div>Something went wrong! Please refresh this page</div>
          ) : null}
          <Positioner>
            {user ? (
              <>
                <h3>{user ? user.full_name : null}</h3>
              </>
            ) : null}
            <p>Connect your stripe account:</p>
            <a href={stripeOauthUrl}>
              <Button text='Connect' />
            </a>
          </Positioner>
          <Positioner>
            <>
              <p>Update your profile:</p>
              <Button text='Update' onClick={() => setShow(!show)} />
            </>
          </Positioner>
          {show ? <PostRegister {...userProps} /> : null}
        </Card>
      </Header>
    </Container>
  );
};

export default Settings;
