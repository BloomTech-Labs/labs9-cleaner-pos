import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Link } from 'react-router-dom';

// adding this for testing
import { FileUpload } from '../../components/index';

import { Container, Button } from '../../components/';
import {
  Card,
  Positioner,
  Header,
  ButtonText,
  Checkbox,
} from './Settings.styling';
import { RouteComponentProps } from 'react-router';

const url =
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

const Settings: React.SFC<RouteComponentProps> = (props) => {
  const clientId = process.env.REACT_APP_clientid;
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
      .then((res) => res)
      .catch((e) => e);
  }
  // useState returns an array. first element is the value, second element is a setState function
  const [contact, setContact] = useState({
    address: '',
    email: '',
    ext_it: '',
    full_name: '',
    phone: '',
  });
  const [settings, setSettings] = useState({
    setting_email: false,
    setting_text: false,
  });
  const [info, setInfo] = useState({ msg: '', error: false });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setSettings((prev) => ({ ...prev, [target.name]: target.checked }));
  };

  const handleSubmit = () => {
    const headers: AxiosRequestConfig = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    axios
      .put(`${url}/users`, settings, headers)
      .then(() => {
        setInfo({ msg: 'Settings successfully saved.', error: false });
      })
      .catch(errorHandler);
  };

  const errorHandler = (e: any) => {
    if (e.response) {
      // Error response from server
      const { status, data } = e.response;
      setInfo({ msg: `${status}: ${data.message}`, error: true });
    } else if (e.request) {
      // This means that the server could not be reached
      setInfo({
        msg: 'Connection unsuccessful. Please try again.',
        error: true,
      });
    } else {
      // This means there is an error at the application level
      setInfo({
        msg: 'Request could not be processed. Please refresh the page.',
        error: true,
      });
    }
  };

  useEffect(() => {
    const headers: AxiosRequestConfig = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    axios
      .get(`${url}/users`, headers)
      .then(({ data }) => {
        const {
          address,
          email,
          ext_it,
          full_name,
          phone,
          setting_email,
          setting_text,
        } = data;
        setSettings({
          setting_email,
          setting_text,
        });
        setContact({ address, email, ext_it, full_name, phone });
      })
      .catch(errorHandler);
  }, []);

  return (
    <Container>
      <Header>
        <h2>Account Settings</h2>
        <Card>
          <Positioner>
            <a
              /* tslint:disable-next-line */
              href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write`}
            >
              <span>Connect with stripe</span>
            </a>
            <h3>Notification Settings</h3>
            <ButtonText>
              <Checkbox
                type='checkbox'
                name='setting_email'
                checked={settings.setting_email}
                onChange={handleInputChange}
                data-testid={'checkbox'}
              />{' '}
              I would like to receive updates via email.
              <br />
            </ButtonText>
            <ButtonText>
              <Checkbox
                type='checkbox'
                name='setting_text'
                checked={settings.setting_text}
                onChange={handleInputChange}
                data-testid={'checkbox'}
              />{' '}
              I would like to receive updates via text.
              <br />
            </ButtonText>
            <Button text='Save Settings' onClick={handleSubmit} />
          </Positioner>
          <Positioner>
            <h3>Contact Information</h3>
            <Link to={{ pathname: '/updateinfo', state: contact }}>
              <Button text='Update Contact Info' />
            </Link>
            {info.msg && <div className='settings-status'>{info.msg}</div>}
          </Positioner>
          <Positioner>
            <FileUpload text='upload a file' />
          </Positioner>
        </Card>
      </Header>
    </Container>
  );
};

export default Settings;
