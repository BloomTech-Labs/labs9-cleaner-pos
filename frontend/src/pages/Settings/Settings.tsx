import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Link } from 'react-router-dom';

import { Container, Button } from '../../components/shared_components';

const url =
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

const Settings = () => {
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
      const { status, data } = e.response;
      setInfo({ msg: `${status}: ${data}`, error: true });
    } else if (e.request) {
      setInfo({
        msg: 'Connection unsuccessful. Please try again.',
        error: true,
      });
    } else {
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
      <Link to={{ pathname: '/updateinfo', state: contact }}>
        <Button text='Update Contact' />
      </Link>
      <input
        type='checkbox'
        name='setting_email'
        checked={settings.setting_email}
        onChange={handleInputChange}
      />{' '}
      I would like to receive updates via email.
      <br />
      <input
        type='checkbox'
        name='setting_text'
        checked={settings.setting_text}
        onChange={handleInputChange}
      />{' '}
      I would like to receive updates via text.
      <br />
      <Button text='Save' onClick={handleSubmit} />
      {info.msg && <div className='settings-status'>{info.msg}</div>}
    </Container>
  );
};

export default Settings;
